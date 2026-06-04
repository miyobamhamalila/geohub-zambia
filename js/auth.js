/**
 * GeoHub Zambia – Firebase Authentication & Role Management
 * Firebase compat SDK v10 | Email/Password + Google | Firestore profiles + audit
 *
 * REQUIRES these CDN scripts loaded BEFORE this file in every HTML page:
 *   <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
 *   <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
 *   <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
 */

const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyCRxovGIFlgQu5gwu5mi3rr1WNNlk0QnzQ',
  authDomain:        'zambia-geohub.firebaseapp.com',
  databaseURL:       'https://zambia-geohub-default-rtdb.firebaseio.com',
  projectId:         'zambia-geohub',
  storageBucket:     'zambia-geohub.firebasestorage.app',
  messagingSenderId: '255552643755',
  appId:             '1:255552643755:web:3b9187a609412fe151cdee',
  measurementId:     'G-N9C0J711KH'
};

const GeoHubAuth = (() => {
  const SESSION_KEY = 'ghz_session';

  let _auth   = null;
  let _db     = null;
  let _ready  = false;
  let _readyCbs = [];

  // ── Internals ────────────────────────────────────────────────────────────
  function _whenReady(cb) {
    if (_ready) cb();
    else _readyCbs.push(cb);
  }

  function _initials(str) {
    if (!str) return 'U';
    return str.split(' ').map(n => n[0] || '').join('').toUpperCase().slice(0, 2) || 'U';
  }

  function _defaultPerms(role) {
    return role === 'admin'
      ? ['view_map','upload_data','manage_users','view_analytics','export_data','manage_layers','view_audit']
      : ['view_map','upload_data','view_analytics','export_data'];
  }

  function _friendlyError(code, message) {
    const map = {
      'auth/user-not-found':        'No account found with this email address.',
      'auth/wrong-password':        'Incorrect password. Please try again.',
      'auth/invalid-email':         'Invalid email address.',
      'auth/user-disabled':         'This account has been disabled.',
      'auth/too-many-requests':     'Too many attempts. Try again later.',
      'auth/network-request-failed':'Network error. Check your connection.',
      'auth/popup-closed-by-user':  'Google sign-in was cancelled.',
      'auth/invalid-credential':    'Invalid credentials. Please check your email and password.',
      'auth/email-already-in-use':  'An account with this email already exists.',
      'auth/weak-password':         'Password must be at least 6 characters.',
      'auth/requires-recent-login': 'Please log out and log back in before changing your password.',
      'auth/operation-not-supported-in-this-environment': 'Google sign-in is not supported in this browser environment.',
      'auth/unauthorized-domain':   'This app is not authorized for Google sign-in from this origin.',
    };

    if (code && map[code]) return map[code];
    if (message) {
      if (message.includes('file://') || message.includes('operation-not-supported-in-this-environment')) {
        return 'Google sign-in does not work from a local file URL. Serve the site over http://localhost or a real web host.';
      }
      if (message.includes('unauthorized-domain')) {
        return 'Google sign-in is blocked because this origin is not authorized in Firebase. Add your domain in the Firebase console.';
      }
    }
    return map[code] || 'An error occurred. Please try again.';
  }

  async function _getProfile(uid) {
    try {
      const doc = await _db.collection('users').doc(uid).get();
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    } catch (e) { return null; }
  }

  function _buildSession(uid, profile, email) {
    return {
      id:          uid,
      name:        profile.name  || email,
      email:       email,
      role:        profile.role  || 'standard',
      org:         profile.org   || '',
      title:       profile.title || '',
      avatar:      profile.avatar || _initials(profile.name || email),
      permissions: profile.permissions || _defaultPerms(profile.role || 'standard'),
      loginTime:   new Date().toISOString()
    };
  }

  // ── Initialise Firebase ───────────────────────────────────────────────────
  async function init() {
    try { firebase.app(); } catch (e) { firebase.initializeApp(FIREBASE_CONFIG); }
    _auth = firebase.auth();
    _db   = firebase.firestore();

    _auth.onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        let profile = await _getProfile(fbUser.uid);

        if (!profile) {
          // Auto-create Firestore profile for Google / new users
          profile = {
            name:        fbUser.displayName || fbUser.email.split('@')[0],
            email:       fbUser.email,
            role:        'standard',
            org:         '',
            title:       '',
            avatar:      _initials(fbUser.displayName || fbUser.email),
            status:      'active',
            permissions: _defaultPerms('standard'),
            created:     firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin:   firebase.firestore.FieldValue.serverTimestamp(),
          };
          await _db.collection('users').doc(fbUser.uid).set(profile);
        }

        if (profile.status === 'inactive') {
          await _auth.signOut();
          localStorage.removeItem(SESSION_KEY);
        } else {
          localStorage.setItem(SESSION_KEY, JSON.stringify(_buildSession(fbUser.uid, profile, fbUser.email)));
          _db.collection('users').doc(fbUser.uid)
            .update({ lastLogin: firebase.firestore.FieldValue.serverTimestamp() })
            .catch(() => {});
        }
      } else {
        localStorage.removeItem(SESSION_KEY);
      }

      if (!_ready) {
        _ready = true;
        _readyCbs.forEach(cb => cb());
        _readyCbs = [];
      }
    });
  }

  // ── Public: fire callback once Firebase auth state is resolved ────────────
  function onReady(cb) { _whenReady(cb); }

  // ── Login (email/password) ─────────────────────────────────────────────
  async function signup(email, password) {
    try {
      const cred = await _auth.createUserWithEmailAndPassword(email, password);
      const uid = cred.user.uid;

      // Create standard Firestore profile for the new user
      const profile = {
        name:        cred.user.displayName || email.split('@')[0],
        email:       cred.user.email,
        role:        'standard',
        org:         '',
        title:       '',
        avatar:      _initials(cred.user.displayName || email),
        status:      'active',
        permissions: _defaultPerms('standard'),
        created:     firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin:   firebase.firestore.FieldValue.serverTimestamp(),
      };

      // If somehow the doc exists, just set/overwrite with standard defaults.
      await _db.collection('users').doc(uid).set(profile, { merge: true });

      const session = _buildSession(uid, profile, cred.user.email);
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, user: session };
    } catch (e) {
      return { success: false, error: _friendlyError(e.code) };
    }
  }

  async function login(email, password) {
    try {
      let cred;

      try {
        cred = await _auth.signInWithEmailAndPassword(email, password);
      } catch (e) {
        // Do NOT auto-create users on wrong password.
        return { success: false, error: _friendlyError(e.code) };
      }

      let profile = await _getProfile(cred.user.uid);
      if (!profile) {
        // First login for this Firebase Auth user: create a standard profile.
        profile = {
          name:        cred.user.displayName || email.split('@')[0],
          email:       cred.user.email,
          role:        'standard',
          org:         '',
          title:       '',
          avatar:      _initials(cred.user.displayName || email),
          status:      'active',
          permissions: _defaultPerms('standard'),
          created:     firebase.firestore.FieldValue.serverTimestamp(),
          lastLogin:   firebase.firestore.FieldValue.serverTimestamp(),
        };
        await _db.collection('users').doc(cred.user.uid).set(profile);
      }

      const session = _buildSession(cred.user.uid, profile, cred.user.email);
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, user: session };
    } catch (e) {
      return { success: false, error: _friendlyError(e.code) };
    }
  }


  // ── Google sign-in ────────────────────────────────────────────────────────
  async function loginWithGoogle() {
    if (window.location.protocol === 'file:') {
      return {
        success: false,
        error: 'Google sign-in is not supported from file:// pages. Please run the app through http://localhost or a hosted web URL.',
      };
    }

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await _auth.signInWithPopup(provider);
      // Wait for onAuthStateChanged to set the session
      await new Promise(resolve => {
        const check = setInterval(() => {
          if (getSession()) { clearInterval(check); resolve(); }
        }, 100);
        setTimeout(() => { clearInterval(check); resolve(); }, 5000);
      });
      const session = getSession();
      if (session) addAuditLog('LOGIN', `Google sign-in: ${session.name}`, session.id);
      return { success: true, user: session };
    } catch (e) {
      console.error('loginWithGoogle failed:', e);
      return { success: false, error: _friendlyError(e.code, e.message) };
    }
  }

  // ── Reset password (sends email) ─────────────────────────────────────────
  async function resetPassword(email) {
    try {
      await _auth.sendPasswordResetEmail(email);
      return { success: true };
    } catch (e) {
      return { success: false, error: _friendlyError(e.code) };
    }
  }

  // ── Change password (requires recent login) ───────────────────────────────
  async function changePassword(newPassword) {
    try {
      await _auth.currentUser.updatePassword(newPassword);
      addAuditLog('PASSWORD_CHANGE', 'User changed password', getSession()?.id);
      return { success: true };
    } catch (e) {
      return { success: false, error: _friendlyError(e.code) };
    }
  }

  // ── Logout ─────────────────────────────────────────────────────────────────
  async function logout() {
    const s = getSession();
    if (s) addAuditLog('LOGOUT', `User logged out: ${s.name}`, s.id);
    localStorage.removeItem(SESSION_KEY);
    try { await _auth.signOut(); } catch (e) {}
  }

  // ── Session (sync — reads localStorage cache) ──────────────────────────────
  function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  }

  // ── requireAuth — sync cache check + async Firebase fallback ───────────────
  function requireAuth(redirectTo = 'index.html') {
    const session = getSession();
    if (!session) {
      // Hide page while Firebase confirms auth state
      document.documentElement.style.visibility = 'hidden';
      _whenReady(() => {
        if (!getSession()) {
          window.location.href = redirectTo;
        } else {
          // Session now in localStorage — reload so all init code runs with it
          window.location.reload();
        }
      });
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

  // ── User management (Firestore) ───────────────────────────────────────────
  async function getUsers() {
    try {
      const snap = await _db.collection('users').get();
      return snap.docs.map(doc => {
        const d = doc.data();
        return {
          id:        doc.id,
          ...d,
          lastLogin: d.lastLogin?.toDate?.()?.toISOString() || d.lastLogin || null,
          created:   d.created?.toDate?.()?.toISOString()   || d.created   || null,
        };
      });
    } catch (e) { console.error('getUsers:', e); return []; }
  }

  async function addUser(userData) {
    try {
      // Check for duplicate email in Firestore
      const existing = await _db.collection('users').where('email', '==', userData.email.toLowerCase()).get();
      if (!existing.empty) return { success: false, error: 'A user with this email already exists.' };

      // Create Firebase Auth user using a secondary app instance (doesn't disturb current session)
      const secondaryApp  = firebase.initializeApp(FIREBASE_CONFIG, 'GeoHubSecondary_' + Date.now());
      const secondaryAuth = secondaryApp.auth();
      const cred = await secondaryAuth.createUserWithEmailAndPassword(
        userData.email, userData.password || 'TempPass@2025!'
      );
      const uid = cred.user.uid;
      await secondaryAuth.signOut();
      await secondaryApp.delete();

      // Create Firestore profile
      const avatar  = _initials(userData.name);
      const role    = userData.role || 'standard';
      const profile = {
        name:        userData.name,
        email:       userData.email.toLowerCase(),
        role,
        org:         userData.org   || '',
        title:       userData.title || '',
        avatar,
        status:      'active',
        permissions: _defaultPerms(role),
        created:     firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin:   null,
      };
      await _db.collection('users').doc(uid).set(profile);

      addAuditLog('USER_CREATE', `New user: ${userData.name} (${role})`, getSession()?.id);
      return { success: true, user: { id: uid, ...profile } };
    } catch (e) {
      return { success: false, error: _friendlyError(e.code) || e.message };
    }
  }

  async function seedDefaultUsers() {
    try {
      const snap = await _db.collection('users').get();
      if (!snap.empty) return;

      const defaults = [
        {
          name:     'GeoHub Admin',
          email:    'admin@geohub.zm',
          password: 'Admin@2025',
          role:     'admin',
          org:      'GeoHub Zambia',
          title:    'Administrator',
        },
        {
          name:     'John Banda',
          email:    'john.banda@zema.gov.zm',
          password: 'User@2025',
          role:     'standard',
          org:      'ZEMA',
          title:    'GIS Analyst',
        }
      ];

      for (const user of defaults) {
        const existing = await _db.collection('users').where('email', '==', user.email.toLowerCase()).get();
        if (!existing.empty) continue;

        const secondaryApp  = firebase.initializeApp(FIREBASE_CONFIG, 'GeoHubSecondary_' + Date.now());
        const secondaryAuth = secondaryApp.auth();
        try {
          const cred = await secondaryAuth.createUserWithEmailAndPassword(user.email, user.password);
          const uid  = cred.user.uid;
          const profile = {
            name:        user.name,
            email:       user.email.toLowerCase(),
            role:        user.role,
            org:         user.org,
            title:       user.title,
            avatar:      _initials(user.name),
            status:      'active',
            permissions: _defaultPerms(user.role),
            created:     firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin:   null,
          };
          await _db.collection('users').doc(uid).set(profile);
        } catch (e) {
          // If the auth account already exists, ignore the create error.
          if (e.code !== 'auth/email-already-in-use') {
            console.error('seedDefaultUsers:', e.code, e.message);
          }
        } finally {
          try { await secondaryAuth.signOut(); } catch (e) {}
          try { await secondaryApp.delete(); } catch (e) {}
        }
      }
    } catch (e) {
      console.error('seedDefaultUsers:', e);
    }
  }

  async function updateUser(userId, updates) {
    try {
      // Never store passwords in Firestore — silently drop if passed
      const { password, ...safeUpdates } = updates;
      await _db.collection('users').doc(userId).update(safeUpdates);
      // Keep local session in sync if self-update
      const s = getSession();
      if (s && s.id === userId) {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ ...s, ...safeUpdates }));
      }
      addAuditLog('USER_UPDATE', `User updated: ${safeUpdates.name || userId}`, getSession()?.id);
      return { success: true };
    } catch (e) { return { success: false, error: e.message }; }
  }

  async function deleteUser(userId) {
    try {
      const doc  = await _db.collection('users').doc(userId).get();
      const name = doc.data()?.name || userId;
      // Soft-delete: set inactive (hard-delete requires backend Firebase Admin)
      await _db.collection('users').doc(userId).update({ status: 'inactive' });
      addAuditLog('USER_DELETE', `User deactivated: ${name}`, getSession()?.id);
      return { success: true };
    } catch (e) { return { success: false, error: e.message }; }
  }

  async function toggleUserStatus(userId) {
    try {
      const doc     = await _db.collection('users').doc(userId).get();
      const current = doc.data()?.status || 'active';
      const next    = current === 'active' ? 'inactive' : 'active';
      await _db.collection('users').doc(userId).update({ status: next });
      addAuditLog('USER_STATUS', `User ${next}: ${doc.data()?.name || userId}`, getSession()?.id);
      return { success: true, status: next };
    } catch (e) { return { success: false }; }
  }

  // ── Audit log (Firestore) ─────────────────────────────────────────────────
  function addAuditLog(action, detail, userId) {
    if (!_db) return;
    _db.collection('audit').add({
      action,
      detail,
      userId:    userId || 'system',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(() => {});
  }

  async function getAuditLogs() {
    try {
      const snap = await _db.collection('audit').orderBy('timestamp', 'desc').limit(200).get();
      return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
      }));
    } catch (e) { return []; }
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    init, onReady,
    signup, login, loginWithGoogle, resetPassword, changePassword, logout,
    getSession, requireAuth, requireAdmin, hasPermission,
    getUsers, addUser, updateUser, deleteUser, toggleUserStatus,
    seedDefaultUsers,
    addAuditLog, getAuditLogs,
  };
})();

// Auto-initialise on script load
GeoHubAuth.init();
