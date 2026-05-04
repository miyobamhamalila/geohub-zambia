/**
 * GeoHub Zambia – Authentication & Role Management
 * Supports: admin | standard roles
 * Storage: localStorage (simulates backend session)
 */

const GeoHubAuth = (() => {

  // ── Registered users (seeded – in production replace with API) ──────────
  const USERS_KEY = 'ghz_users';
  const SESSION_KEY = 'ghz_session';
  const AUDIT_KEY = 'ghz_audit';

  const SEED_USERS = [
    {
      id: 'usr_001',
      name: 'System Administrator',
      email: 'admin@geohub.zm',
      password: 'Admin@2025',
      role: 'admin',
      org: 'GeoHub Zambia',
      title: 'System Administrator',
      avatar: 'SA',
      status: 'active',
      created: '2024-01-01',
      lastLogin: null,
      permissions: ['view_map','upload_data','manage_users','view_analytics','export_data','manage_layers','view_audit']
    },
    {
      id: 'usr_002',
      name: 'John Banda',
      email: 'john.banda@zema.gov.zm',
      password: 'User@2025',
      role: 'standard',
      org: 'Zambia Environmental Management Agency',
      title: 'GIS Analyst',
      avatar: 'JB',
      status: 'active',
      created: '2024-03-15',
      lastLogin: null,
      permissions: ['view_map','upload_data','view_analytics','export_data']
    },
    {
      id: 'usr_003',
      name: 'Mary Phiri',
      email: 'mary.phiri@znla.gov.zm',
      password: 'User@2025',
      role: 'standard',
      org: 'Zambia National Land Alliance',
      title: 'Land Surveyor',
      avatar: 'MP',
      status: 'active',
      created: '2024-04-10',
      lastLogin: null,
      permissions: ['view_map','view_analytics']
    },
    {
      id: 'usr_004',
      name: 'David Mwale',
      email: 'david.mwale@forestry.gov.zm',
      password: 'User@2025',
      role: 'standard',
      org: 'Zambia Forestry Department',
      title: 'Forest Officer',
      avatar: 'DM',
      status: 'active',
      created: '2024-05-20',
      lastLogin: null,
      permissions: ['view_map','upload_data','view_analytics','export_data']
    },
    {
      id: 'usr_005',
      name: 'Sarah Tembo',
      email: 'sarah.tembo@nsdi.gov.zm',
      password: 'User@2025',
      role: 'standard',
      org: 'NSDI Zambia',
      title: 'Data Manager',
      avatar: 'ST',
      status: 'inactive',
      created: '2024-06-01',
      lastLogin: null,
      permissions: ['view_map','view_analytics']
    }
  ];

  // ── Initialize users on first load ─────────────────────────────────────
  function init() {
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
    }
    if (!localStorage.getItem(AUDIT_KEY)) {
      localStorage.setItem(AUDIT_KEY, JSON.stringify([]));
    }
  }

  // ── Get all users ──────────────────────────────────────────────────────
  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  // ── Save users ─────────────────────────────────────────────────────────
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // ── Login ──────────────────────────────────────────────────────────────
  function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) return { success: false, error: 'No account found with this email address.' };
    if (user.password !== password) return { success: false, error: 'Incorrect password. Please try again.' };
    if (user.status === 'inactive') return { success: false, error: 'Your account has been deactivated. Contact your administrator.' };

    // Update lastLogin
    user.lastLogin = new Date().toISOString();
    saveUsers(users);

    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      org: user.org,
      title: user.title,
      avatar: user.avatar,
      permissions: user.permissions,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    addAuditLog('LOGIN', `User logged in: ${user.name} (${user.role})`, user.id);
    return { success: true, user: session };
  }

  // ── Logout ─────────────────────────────────────────────────────────────
  function logout() {
    const session = getSession();
    if (session) addAuditLog('LOGOUT', `User logged out: ${session.name}`, session.id);
    localStorage.removeItem(SESSION_KEY);
  }

  // ── Get current session ────────────────────────────────────────────────
  function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  }

  // ── Check if logged in ─────────────────────────────────────────────────
  function requireAuth(redirectTo = 'index.html') {
    const session = getSession();
    if (!session) { window.location.href = redirectTo; return null; }
    return session;
  }

  // ── Check role ─────────────────────────────────────────────────────────
  function requireAdmin() {
    const session = requireAuth();
    if (!session) return null;
    if (session.role !== 'admin') {
      window.location.href = 'dashboard.html';
      return null;
    }
    return session;
  }

  // ── Check permission ───────────────────────────────────────────────────
  function hasPermission(perm) {
    const session = getSession();
    if (!session) return false;
    return session.permissions.includes(perm);
  }

  // ── Add user (admin only) ──────────────────────────────────────────────
  function addUser(userData) {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, error: 'A user with this email already exists.' };
    }
    const newUser = {
      id: 'usr_' + Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password || 'User@2025',
      role: userData.role || 'standard',
      org: userData.org || '',
      title: userData.title || '',
      avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2),
      status: 'active',
      created: new Date().toISOString().split('T')[0],
      lastLogin: null,
      permissions: userData.role === 'admin'
        ? ['view_map','upload_data','manage_users','view_analytics','export_data','manage_layers','view_audit']
        : ['view_map','upload_data','view_analytics','export_data']
    };
    users.push(newUser);
    saveUsers(users);
    addAuditLog('USER_CREATE', `New user created: ${newUser.name} (${newUser.role})`, getSession()?.id);
    return { success: true, user: newUser };
  }

  // ── Update user ────────────────────────────────────────────────────────
  function updateUser(userId, updates) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return { success: false, error: 'User not found.' };
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
    addAuditLog('USER_UPDATE', `User updated: ${users[idx].name}`, getSession()?.id);
    return { success: true, user: users[idx] };
  }

  // ── Delete user ────────────────────────────────────────────────────────
  function deleteUser(userId) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return { success: false, error: 'User not found.' };
    const filtered = users.filter(u => u.id !== userId);
    saveUsers(filtered);
    addAuditLog('USER_DELETE', `User deleted: ${user.name}`, getSession()?.id);
    return { success: true };
  }

  // ── Toggle user status ─────────────────────────────────────────────────
  function toggleUserStatus(userId) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return { success: false };
    users[idx].status = users[idx].status === 'active' ? 'inactive' : 'active';
    saveUsers(users);
    addAuditLog('USER_STATUS', `User ${users[idx].status}: ${users[idx].name}`, getSession()?.id);
    return { success: true, status: users[idx].status };
  }

  // ── Audit log ──────────────────────────────────────────────────────────
  function addAuditLog(action, detail, userId) {
    const logs = JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
    logs.unshift({
      id: 'log_' + Date.now(),
      action,
      detail,
      userId: userId || 'system',
      timestamp: new Date().toISOString()
    });
    // Keep last 200 entries
    localStorage.setItem(AUDIT_KEY, JSON.stringify(logs.slice(0, 200)));
  }

  function getAuditLogs() {
    return JSON.parse(localStorage.getItem(AUDIT_KEY) || '[]');
  }

  // ── Register public API ────────────────────────────────────────────────
  return { init, login, logout, getSession, requireAuth, requireAdmin,
           hasPermission, getUsers, addUser, updateUser, deleteUser,
           toggleUserStatus, addAuditLog, getAuditLogs };

})();

// Auto-init
GeoHubAuth.init();
