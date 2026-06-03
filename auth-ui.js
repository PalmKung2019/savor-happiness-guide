/* ============================================================
   SAVOR HAPPINESS — AUTH UI + UX IMPROVEMENTS v1.0.0
   Depends on: auth.js (window.Auth), script.js (window.Toast)
   ============================================================ */

/* =========================================================
   1. TOAST SYSTEM
   ========================================================= */
const Toast = (() => {
  const container = () => document.getElementById("toastContainer");

  function show(msg, type = "success", duration = 3000) {
    const iconMap = {
      success: "fas fa-check-circle",
      error: "fas fa-times-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
    };
    const el = document.createElement("div");
    el.className = `toast toast-${type}`;
    el.setAttribute("role", "status");
    el.innerHTML = `<i class="${iconMap[type] || iconMap.info}" aria-hidden="true"></i><span>${msg}</span>`;
    container()?.appendChild(el);

    const dismiss = () => {
      el.classList.add("toast-exit");
      el.addEventListener("animationend", () => el.remove(), { once: true });
    };
    const timer = setTimeout(dismiss, duration);
    el.addEventListener("click", () => { clearTimeout(timer); dismiss(); });
  }

  return { show };
})();

window.Toast = Toast;

/* =========================================================
   2. AUTH MODAL & NAV STATE
   ========================================================= */
function setupAuthUI() {
  const modal = document.getElementById("authModal");
  const closeBtn = document.getElementById("closeAuthModal");
  const navLoginBtn = document.getElementById("navLoginBtn");
  const authUserMenu = document.getElementById("authUserMenu");
  const authAvatarBtn = document.getElementById("authAvatarBtn");
  const authDropdown = document.getElementById("authDropdown");
  const authAvatar = document.getElementById("authAvatar");
  const authDropdownName = document.getElementById("authDropdownName");
  const authDropdownEmail = document.getElementById("authDropdownEmail");
  const authLogoutBtn = document.getElementById("authLogoutBtn");
  const bookmarkCountBadge = document.getElementById("bookmarkCountBadge");
  const bookmarksLink = document.getElementById("authBookmarksLink");

  if (!modal) return;

  /* ── open/close modal ── */
  function openAuthModal(tab = "login") {
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    switchTab(tab);
    // focus first input after animation
    setTimeout(() => {
      const firstInput = modal.querySelector(".auth-panel:not([style*='none']) input");
      firstInput?.focus();
    }, 80);
  }
  function closeAuthModal() {
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  if (navLoginBtn) navLoginBtn.addEventListener("click", () => openAuthModal("login"));
  if (closeBtn) closeBtn.addEventListener("click", closeAuthModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeAuthModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hasAttribute("hidden")) {
      // stopPropagation ป้องกัน script.js จับ Escape event เดียวกัน
      e.stopPropagation();
      closeAuthModal();
    }
  });

  /* ── focus trap inside modal ── */
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || modal.hasAttribute("hidden")) return;
    const focusable = [...modal.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    )].filter(el => !el.closest('[hidden]') && !el.closest('[style*="display: none"]'));
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  });

  /* ── tabs ── */
  function switchTab(which) {
    const loginPanel = document.getElementById("panelLogin");
    const regPanel = document.getElementById("panelRegister");
    const tabLogin = document.getElementById("tabLogin");
    const tabReg = document.getElementById("tabRegister");
    const isLogin = which === "login";

    loginPanel.style.display = isLogin ? "" : "none";
    regPanel.style.display = isLogin ? "none" : "";
    tabLogin.classList.toggle("active", isLogin);
    tabReg.classList.toggle("active", !isLogin);
    tabLogin.setAttribute("aria-selected", String(isLogin));
    tabReg.setAttribute("aria-selected", String(!isLogin));

    // clear errors
    ["loginError", "registerError"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.setAttribute("hidden", ""); el.textContent = ""; }
    });
  }

  document.getElementById("tabLogin")?.addEventListener("click", () => switchTab("login"));
  document.getElementById("tabRegister")?.addEventListener("click", () => switchTab("register"));
  document.getElementById("switchToRegister")?.addEventListener("click", () => switchTab("register"));
  document.getElementById("switchToLogin")?.addEventListener("click", () => switchTab("login"));

  /* ── toggle password visibility ── */
  document.querySelectorAll(".auth-toggle-pass").forEach((btn) => {
    btn.addEventListener("click", () => {
      const inp = document.getElementById(btn.dataset.target);
      if (!inp) return;
      inp.type = inp.type === "password" ? "text" : "password";
      btn.querySelector("i").className = inp.type === "password"
        ? "fas fa-eye" : "fas fa-eye-slash";
    });
  });

  /* ── login form ── */
  document.getElementById("loginSubmitBtn")?.addEventListener("click", () => {
    const email = document.getElementById("loginEmail")?.value.trim();
    const pass = document.getElementById("loginPassword")?.value;
    const errEl = document.getElementById("loginError");

    if (!email || !pass) {
      showFieldError(errEl, "กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
    const result = Auth.login(email, pass);
    if (!result.ok) { showFieldError(errEl, result.msg); return; }
    closeAuthModal();
    Toast.show(`ยินดีต้อนรับกลับ, ${result.user.name} 👋`, "success");
  });
  document.getElementById("loginPassword")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("loginSubmitBtn")?.click();
  });

  /* ── register form ── */
  document.getElementById("registerSubmitBtn")?.addEventListener("click", () => {
    const name = document.getElementById("regName")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim();
    const pass = document.getElementById("regPassword")?.value;
    const errEl = document.getElementById("registerError");

    if (!name || !email || !pass) {
      showFieldError(errEl, "กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if (pass.length < 6) {
      showFieldError(errEl, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }
    const result = Auth.register(name, email, pass);
    if (!result.ok) { showFieldError(errEl, result.msg); return; }
    closeAuthModal();
    Toast.show(`ลงทะเบียนสำเร็จ! ยินดีต้อนรับ, ${result.user.name} 🎉`, "success", 4000);
  });

  /* ── avatar dropdown ── */
  if (authAvatarBtn) {
    authAvatarBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !authDropdown.hasAttribute("hidden");
      if (isOpen) {
        authDropdown.setAttribute("hidden", "");
        authAvatarBtn.setAttribute("aria-expanded", "false");
      } else {
        authDropdown.removeAttribute("hidden");
        authAvatarBtn.setAttribute("aria-expanded", "true");
      }
    });
    document.addEventListener("click", (e) => {
      if (!authAvatarBtn.contains(e.target) && !authDropdown?.contains(e.target)) {
        authDropdown?.setAttribute("hidden", "");
        authAvatarBtn?.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ── logout ── */
  authLogoutBtn?.addEventListener("click", () => {
    Auth.logout();
    Toast.show("ออกจากระบบแล้ว", "info");
    authDropdown?.setAttribute("hidden", "");
  });

  /* ── bookmarks link — scroll to filtered view ── */
  bookmarksLink?.addEventListener("click", () => {
    authDropdown?.setAttribute("hidden", "");
  });

  /* ── update nav on auth change ── */
  function updateNav(user) {
    if (!navLoginBtn || !authUserMenu) return;
    if (user) {
      navLoginBtn.style.display = "none";
      authUserMenu.removeAttribute("hidden");
      if (authAvatar) authAvatar.textContent = user.name.charAt(0).toUpperCase();
      if (authDropdownName) authDropdownName.textContent = user.name;
      if (authDropdownEmail) authDropdownEmail.textContent = user.email;
      updateBookmarkBadge(user.id);
    } else {
      navLoginBtn.style.display = "";
      authUserMenu.setAttribute("hidden", "");
    }
  }

  function updateBookmarkBadge(userId) {
    if (!bookmarkCountBadge) return;
    const count = Auth.getBookmarks(userId).length;
    if (count > 0) {
      bookmarkCountBadge.textContent = count;
      bookmarkCountBadge.removeAttribute("hidden");
    } else {
      bookmarkCountBadge.setAttribute("hidden", "");
    }
  }

  window.addEventListener("sh:authchange", (e) => updateNav(e.detail.user));
  window.addEventListener("sh:bookmarkchange", (e) => {
    const user = Auth.getCurrentUser();
    if (user) updateBookmarkBadge(user.id);
  });

  // init on page load
  updateNav(Auth.getCurrentUser());

  /* helper */
  function showFieldError(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.removeAttribute("hidden");
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* expose openAuthModal globally for shop card bookmark prompt */
  window.openAuthModal = openAuthModal;
}

/* =========================================================
   3. BOOKMARK BUTTONS on shop cards
   ========================================================= */
function setupBookmarkButtons() {
  // Called after renderShops; we observe DOM changes via MutationObserver
  function attachBookmarks() {
    document.querySelectorAll(".photo-gallery").forEach((gallery) => {
      if (gallery.querySelector(".bookmark-btn")) return; // already attached

      const shopIdx = gallery.dataset.shopIdx;
      if (shopIdx === undefined) return;

      const btn = document.createElement("button");
      btn.className = "bookmark-btn";
      btn.setAttribute("aria-label", "บันทึกร้านนี้");
      btn.dataset.shopIdx = shopIdx;
      btn.innerHTML = '<i class="far fa-bookmark" aria-hidden="true"></i>';

      // set initial state
      const user = Auth.getCurrentUser();
      if (user) {
        const shop = window._realShops?.[shopIdx];
        if (shop && Auth.isBookmarked(user.id, shop.name)) {
          btn.classList.add("bookmarked");
          btn.querySelector("i").className = "fas fa-bookmark";
          btn.setAttribute("aria-label", "ยกเลิกการบันทึก");
        }
      }

      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent opening modal
        const u = Auth.getCurrentUser();
        if (!u) {
          Toast.show("กรุณาเข้าสู่ระบบก่อนบันทึกร้าน", "info");
          window.openAuthModal?.("login");
          return;
        }
        const s = window._realShops?.[btn.dataset.shopIdx];
        if (!s) return;
        const saved = Auth.toggleBookmark(u.id, s.name);
        btn.classList.toggle("bookmarked", saved);
        btn.querySelector("i").className = saved ? "fas fa-bookmark" : "far fa-bookmark";
        btn.setAttribute("aria-label", saved ? "ยกเลิกการบันทึก" : "บันทึกร้านนี้");
        Toast.show(saved ? `บันทึก "${s.nameTH || s.name}" แล้ว ❤️` : `ยกเลิกการบันทึก "${s.nameTH || s.name}"`, saved ? "success" : "info", 2200);
        window.dispatchEvent(new CustomEvent("sh:bookmarkchange"));
      });

      gallery.appendChild(btn);
    });
  }

  // Run once after shops render, then watch for dynamic changes
  setTimeout(attachBookmarks, 600);
  const obs = new MutationObserver(attachBookmarks);
  const minList = document.getElementById("minburi-list");
  const nongList = document.getElementById("nongchok-list");
  if (minList) obs.observe(minList, { childList: true });
  if (nongList) obs.observe(nongList, { childList: true });

  // Re-attach on auth change to update bookmark states
  window.addEventListener("sh:authchange", () => {
    document.querySelectorAll(".bookmark-btn").forEach(btn => btn.remove());
    setTimeout(attachBookmarks, 100);
  });
}

/* =========================================================
   4. SCROLL-TO-TOP BUTTON
   ========================================================= */
function setupScrollToTop() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  const onScroll = () => {
    if (window.scrollY > 400) {
      btn.removeAttribute("hidden");
    } else {
      btn.setAttribute("hidden", "");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* =========================================================
   5. SEARCH SUGGESTIONS KEYBOARD NAVIGATION
   ========================================================= */
function enhanceSearchKeyNav() {
  const input = document.getElementById("shopSearchInput");
  const suggestions = document.getElementById("searchSuggestions");
  if (!input || !suggestions) return;

  input.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const items = [...suggestions.querySelectorAll(".suggestion-item")];
    if (!items.length) return;
    const focused = suggestions.querySelector(".keyboard-focus");
    const idx = focused ? items.indexOf(focused) : -1;
    items.forEach(i => i.classList.remove("keyboard-focus"));

    let next;
    if (e.key === "ArrowDown") next = idx < items.length - 1 ? idx + 1 : 0;
    else next = idx > 0 ? idx - 1 : items.length - 1;
    items[next].classList.add("keyboard-focus");
    items[next].scrollIntoView({ block: "nearest" });
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const kf = suggestions.querySelector(".keyboard-focus");
      if (kf) { e.preventDefault(); kf.click(); }
    }
  });
}

/* =========================================================
   6. EXPOSE realShops to window for bookmark module
   ========================================================= */
function exposeShopsGlobal() {
  // script.js defines realShops locally; we retrieve from DOM data
  // and expose them for the bookmark module
  const interval = setInterval(() => {
    if (document.querySelectorAll(".shop-card").length > 0) {
      clearInterval(interval);
      setupBookmarkButtons();
    }
  }, 200);
  setTimeout(() => clearInterval(interval), 5000);
}

/* =========================================================
   7. INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  setupAuthUI();
  setupScrollToTop();
  enhanceSearchKeyNav();
  exposeShopsGlobal();
});
