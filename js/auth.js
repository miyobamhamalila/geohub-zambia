/**
 * GeoHub Zambia – Authentication
 * Email/Password auth via localStorage
 */

const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyBDQPZB1_QQluhiZ3DUWoK3lEHCDtJLpWs',
  authDomain:        'geohub-zambia-cb18f.firebaseapp.com',
  projectId:         'geohub-zambia-cb18f',
  storageBucket:     'geohub-zambia-cb18f.firebasestorage.app',
  messagingSenderId: '188435108246',
  appId:             '1:188435108246:web:401716a9dd307f826c8db7'
};

const GeoHubAuth = (() => {
    const SESSION_KEY = 'ghz_session';
    const USERS_KEY = 'ghz_users';
    const AUDIT_KEY = 'ghz_audit';

    function _whenReady(cb) { cb(); }

    function _initials(str) {
        if (!str) return 'U';
        return str.split(' ').map(n => n[0] || '').join('').toUpperCase().slice(0, 2) || 'U';
    }

    function _defaultPerms(role) {
        return role === 'admin'
            ? ['view_map','upload_data','manage_users','view_analytics','export_data','manage_layers','view_audit']
            : ['view_map','upload_data','view_analytics','export_data'];
    }

    function _hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }

    function _getUsers() {
        try {
            const stored = localStorage.getItem(USERS_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch { return {}; }
    }

    function _setUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    function _addUser(email, password, name, role) {
        const users = _getUsers();
        if (users[email.toLowerCase()]) {
            return { success: false, error: 'User already exists' };
        }
        users[email.toLowerCase()] = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name, email: email.toLowerCase(), password: _hashPassword(password),
            role: role || 'standard', org: '', title: '', avatar: _initials(name),
            status: 'active', permissions: _defaultPerms(role || 'standard'),
            created: new Date().toISOString(), lastLogin: null
        };
        _setUsers(users);
        return { success: true };
    }

    function _verifyUser(email, password) {
        const users = _getUsers();
        const user = users[email.toLowerCase()];
        if (!user) return null;
        if (user.password !== _hashPassword(password)) return null;
        return user;
    }

    function validatePassword(email, password) {
        return !!_verifyUser(email, password);
    }

    function _buildSession(user) {
        return {
            id: user.id, name: user.name, email: user.email, role: user.role,
            org: user.org, title: user.title, avatar: user.avatar,
            permissions: user.permissions, loginTime: new Date().toISOString()
        };
    }

    function init() {
        if (!_getUsers()['admin@geohub.zm']) {
            _addUser('admin@geohub.zm', 'Admin@2025', 'GeoHub Admin', 'admin');
            _addUser('john.banda@zema.gov.zm', 'User@2025', 'John Banda', 'standard');
        }
        if (!_getUsers()['miyobamhamalila@gmail.com']) {
            _addUser('miyobamhamalila@gmail.com', 'miyoba2019', 'Miyoba Mhamalila', 'admin');
        }
    }

    function onReady(cb) { _whenReady(cb); }

    async function signup(email, password) {
        const users = _getUsers();
        if (users[email.toLowerCase()]) {
            return { success: false, error: 'An account with this email already exists.' };
        }
        const name = email.split('@')[0];
        const user = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name, email: email.toLowerCase(), password: _hashPassword(password),
            role: 'standard', org: '', title: '', avatar: _initials(name),
            status: 'active', permissions: _defaultPerms('standard'),
            created: new Date().toISOString(), lastLogin: null
        };
        users[email.toLowerCase()] = user;
        _setUsers(users);
        const session = _buildSession(user);
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        addAuditLog('SIGNUP', `New user signed up (Local): ${name}`, session.id);
        return { success: true, user: session };
    }

    async function login(email, password) {
        const user = _verifyUser(email, password);
        if (!user) {
            return { success: false, error: 'No account found with this email or incorrect password.' };
        }
        if (user.status === 'inactive') {
            return { success: false, error: 'This account has been disabled.' };
        }
        user.lastLogin = new Date().toISOString();
        const users = _getUsers();
        users[email.toLowerCase()] = user;
        _setUsers(users);
        const session = _buildSession(user);
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        addAuditLog('LOGIN', `User logged in (Local): ${user.name}`, session.id);
        return { success: true, user: session };
    }

    async function loginWithGoogle() {
        return { success: false, error: 'Google sign-in is not available.' };
    }

    async function resetPassword(email) {
        return { success: false, error: 'Password reset not available. Contact administrator.' };
    }

    async function changePassword(newPassword) {
        const session = getSession();
        if (!session) return { success: false, error: 'Not logged in' };
        const users = _getUsers();
        const user = users[session.email];
        if (user) {
            user.password = _hashPassword(newPassword);
            _setUsers(users);
        }
        addAuditLog('PASSWORD_CHANGE', 'User changed password', session.id);
        return { success: true };
    }

    async function logout() {
        const s = getSession();
        if (s) addAuditLog('LOGOUT', `User logged out: ${s.name}`, s.id);
        localStorage.removeItem(SESSION_KEY);
    }

    function getSession() {
        return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    }

    function requireAuth(redirectTo = 'index.html') {
        const session = getSession();
        if (!session) {
            window.location.href = redirectTo;
            return null;
        }
        return session;
    }

    function requireAdmin() {
        const session = requireAuth('index.html');
        if (!session) return null;
        if (session.role !== 'admin') { window.location.href = 'dashboard.html'; return null; }
        return session;
    }

    function hasPermission(perm) {
        const s = getSession();
        return s ? (s.permissions || []).includes(perm) : false;
    }

    function getUsers() {
        const users = Object.values(_getUsers());
        return users;
    }

    function addUser(userData) {
        const result = _addUser(userData.email, userData.password || 'TempPass@2025!', userData.name, userData.role);
        if (!result.success) return { success: false, error: result.error };
        const users = _getUsers();
        const newUser = users[userData.email.toLowerCase()];
        addAuditLog('USER_CREATE', `New user: ${userData.name} (${userData.role})`, getSession()?.id);
        return { success: true, user: newUser };
    }

    function seedDefaultUsers() {
        init();
    }

    function updateUser(userId, updates) {
        const users = _getUsers();
        const email = Object.keys(users).find(e => users[e].id === userId);
        if (!email) return { success: false, error: 'User not found' };
        const { password, ...safeUpdates } = updates;
        if (password) {
            users[email].password = _hashPassword(password);
        }
        Object.assign(users[email], safeUpdates);
        _setUsers(users);
        const s = getSession();
        if (s && s.id === userId) {
            const updatedSession = { ...s, ...safeUpdates };
            if (users[email].avatar) updatedSession.avatar = users[email].avatar;
            localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
        }
        addAuditLog('USER_UPDATE', `User updated: ${safeUpdates.name || userId}`, getSession()?.id);
        return { success: true, user: users[email] };
    }

    function deleteUser(userId) {
        const users = _getUsers();
        const email = Object.keys(users).find(e => users[e].id === userId);
        if (!email) return { success: false, error: 'User not found' };
        const name = users[email].name;
        users[email].status = 'inactive';
        _setUsers(users);
        addAuditLog('USER_DELETE', `User deactivated: ${name}`, getSession()?.id);
        return { success: true };
    }

    function toggleUserStatus(userId) {
        const users = _getUsers();
        const email = Object.keys(users).find(e => users[e].id === userId);
        if (!email) return { success: false };
        users[email].status = users[email].status === 'active' ? 'inactive' : 'active';
        _setUsers(users);
        addAuditLog('USER_STATUS', `User ${users[email].status}: ${users[email].name || userId}`, getSession()?.id);
        return { success: true, status: users[email].status };
    }

    function addAuditLog(action, detail, userId) {
        const logs = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
        logs.unshift({ action, detail, userId: userId || 'system', timestamp: new Date().toISOString() });
        localStorage.setItem(AUDIT_KEY, JSON.stringify(logs.slice(0, 500)));
    }

    function getAuditLogs() {
        return JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
    }

    return {
        init, onReady, signup, login, loginWithGoogle, resetPassword, changePassword, logout,
        getSession, requireAuth, requireAdmin, hasPermission, getUsers, addUser, updateUser,
        deleteUser, toggleUserStatus, seedDefaultUsers, validatePassword, addAuditLog, getAuditLogs
    };
})();

GeoHubAuth.init();