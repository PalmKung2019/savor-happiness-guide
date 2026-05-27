/* ============================================================
   SAVOR HAPPINESS — AUTH MODULE v1.0.0
   localStorage-based auth (ready to swap with real API)
   ============================================================ */

const Auth = (() => {
  const STORAGE_KEYS = {
    USERS: "sh_users",
    CURRENT: "sh_current_user",
    BOOKMARKS: "sh_bookmarks",
  };

  /* ── helpers ── */
  function loadUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    } catch {
      return [];
    }
  }
  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
  function hashPass(pass) {
    // simple deterministic obfuscation (not crypto — swap with bcrypt on a real server)
    let h = 0;
    for (let i = 0; i < pass.length; i++) {
      h = (Math.imul(31, h) + pass.charCodeAt(i)) | 0;
    }
    return "sh_" + Math.abs(h).toString(36);
  }

  /* ── public API ── */
  function register(name, email, password) {
    const users = loadUsers();
    if (users.find((u) => u.email === email.toLowerCase())) {
      return { ok: false, msg: "อีเมลนี้ถูกใช้งานแล้ว" };
    }
    const user = {
      id: Date.now().toString(36),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      pass: hashPass(password),
      createdAt: Date.now(),
    };
    users.push(user);
    saveUsers(users);
    setCurrentUser(user);
    return { ok: true, user };
  }

  function login(email, password) {
    const users = loadUsers();
    const user = users.find(
      (u) => u.email === email.toLowerCase().trim() && u.pass === hashPass(password)
    );
    if (!user) return { ok: false, msg: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
    setCurrentUser(user);
    return { ok: true, user };
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT);
    window.dispatchEvent(new CustomEvent("sh:authchange", { detail: { user: null } }));
  }

  function setCurrentUser(user) {
    const safe = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(STORAGE_KEYS.CURRENT, JSON.stringify(safe));
    window.dispatchEvent(new CustomEvent("sh:authchange", { detail: { user: safe } }));
  }

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT) || "null");
    } catch {
      return null;
    }
  }

  /* ── bookmarks ── */
  function getBookmarks(userId) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || "{}");
      return all[userId] || [];
    } catch {
      return [];
    }
  }
  function toggleBookmark(userId, shopName) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || "{}");
      const list = all[userId] || [];
      const idx = list.indexOf(shopName);
      if (idx === -1) list.push(shopName);
      else list.splice(idx, 1);
      all[userId] = list;
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(all));
      return list.includes(shopName);
    } catch {
      return false;
    }
  }
  function isBookmarked(userId, shopName) {
    return getBookmarks(userId).includes(shopName);
  }

  return { register, login, logout, getCurrentUser, getBookmarks, toggleBookmark, isBookmarked };
})();

window.Auth = Auth;
