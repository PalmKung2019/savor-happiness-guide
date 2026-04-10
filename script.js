/* ============================================================
    SAVOR HAPPINESS - TOTAL INTEGRATED ENGINE (JS)
    Consolidated UI Logic | Lightbox | Search | Multi-Lang
    Author: Pran (Palm) - Graphic Design SPU
    ============================================================ */

// --- [CONFIG CONSTANTS] ---
const CONFIG = {
  LIGHTBOX_ZOOM_SCALE: 2.5,
  TRANSITION_DURATION: "0.3s",
  AUTO_SLIDE_INTERVAL: 3000,
  IMAGE_BASE_PATH: "img/20ResCafe/",
  LOGO_LIGHT: "img/logo/savorhappiness-1.png",
  LOGO_DARK: "img/logo/savorhappiness-2.png",
  SEARCH_DEBOUNCE_MS: 300,
  MAX_SEARCH_RESULTS: 6,
  THEME_TRANSITION_MS: 2000,
  AOS_DELAY_MS: 100
};

// --- [1. App State Management] ---
const AppState = {
  lightbox: {
    isZoomed: false,
    isDragging: false,
    translateX: 0,
    translateY: 0,
    lastX: 0,
    lastY: 0,
    startX: 0,
    startY: 0,
    currentGallery: [],
    currentImgIdx: 0
  },
  ui: {
    currentLang: localStorage.getItem("preferredLang") || "th",
    isDarkMode: localStorage.getItem("theme") === "dark"
  },
  autoSlideIntervals: [],
  searchTimeout: null,
  domElements: {
    lbImg: null,
    lbContainer: null,
    searchInput: null,
    suggestionBox: null,
    hamBtn: null,
    navMenu: null,
    hamIcon: null,
    logoImg: null,
    themeBtns: null
  }
};

// --- [2. Translation Object] ---
const translations = {
  th: {
    "nav-home": "หน้าแรก",
    "nav-book": "หนังสือ",
    "nav-highlights": "ร้านแนะนำ",
    "nav-merch": "ของที่ระลึก",
    "nav-creator": "ผู้จัดทำ",
    "hero-subtitle": "DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS",
    "hero-title": "SAVOR HAPPINESS",
    "hero-vibe": "สัมผัส มุมมอง รสชาติ.",
    "hero-desc": "ไกด์บุ๊คที่จะพาคุณตกหลุมรักชานเมือง",
    "book-title": "THE GUIDEBOOK",
    "book-desc": "Savor Happiness: 20 ร้านเด็ดย่านมีนบุรี–หนองจอก ผ่านภาพและดีไซน์",
    "btn-read": "อ่านออนไลน์ (PDF)",
    "btn-gallery": "ดูรูปเล่มเพิ่มเติม",
    "btn-start": "กดเริ่มเพื่อลิ้มรสความสุข",
    "btn-pdf": "อ่านตัวอย่างไฟล์ PDF",
    "author-name": "ปรา��ต์ แถวอินทร์ (ปาล์ม)",
    "author-info": "นักออกแบบกราฟิก | คณะดิจิทัลมีเดีย มหาวิทยาลัยศรีปทุม #67",
    "merch-section-title": "ของที่ระลึก",
    "merch-min-title": "สติ๊กเกอร์ ชุดดื่มด่ำกับความสุข",
    "zone-minburi": "ย่านมีนบุรี",
    "zone-nongchok": "ย่านหนองจอก",
    "creator-title": "ผู้จัดทำ",
    "qr-title": "อุดหนุนผลงาน",
    "qr-subtitle": "ขอบคุณที่ร่วมเป็นส่วนหนึ่งในการสนับสนุน Thesis Project: Savor Happiness",
    "qr-thanks": "ขอบคุณทุกการสนับสนุนครับ ✨",
    "btn-support": "แสดง QR Code สำหรับอุดหนุน"
  },
  en: {
    "nav-home": "Home",
    "nav-book": "The Book",
    "nav-highlights": "Highlights",
    "nav-merch": "Merchandise",
    "nav-creator": "Creator",
    "hero-subtitle": "DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS",
    "hero-title": "SAVOR HAPPINESS",
    "hero-vibe": "VIBE. VISUAL. FLAVOR.",
    "hero-desc": "A guidebook that lets you fall in love with the suburbs.",
    "book-title": "THE GUIDEBOOK",
    "book-desc": "Savor Happiness: 20 Must-Visit Spots in Minburi-Nong Chok Through Photography and Design",
    "btn-read": "Read Online (PDF)",
    "btn-gallery": "View Book Details",
    "btn-start": "Press Start to Savor Happiness",
    "btn-pdf": "Preview PDF",
    "author-name": "Pran Taewin (Palm)",
    "author-info": "Graphic Designer | School of Digital Media, SPU #67",
    "merch-section-title": "Merchandise",
    "merch-min-title": "Savor Happiness Sticker set",
    "zone-minburi": "Min Buri District",
    "zone-nongchok": "Nong Chok District",
    "creator-title": "Creator",
    "qr-title": "Support My Work",
    "qr-subtitle": "Thank you for being a part of Savor Happiness Thesis Project.",
    "qr-thanks": "Thank you for your support! ✨",
    "btn-support": "Show Support QR Code"
  }
};

// --- [3. Shop Data] ---
const realShops = [
  {
    name: "The Lobby Boy Coffee",
    nameTH: "เดอะ ล็อบบี้ บอย คอฟฟี่",
    zone: "minburi",
    folder: "LobbyBoy",
    file: "lobby"
  },
  {
    name: "De Wila Cat Hotel & Café",
    nameTH: "เดอ วิลา แคท โฮเทล แอนด์ คาเฟ่ (มีนบุรี)",
    zone: "minburi",
    folder: "DeWila",
    file: "dewila"
  },
  {
    name: "Chomna Bar & Terrace",
    nameTH: "ชมนา บาร์ แอนด์ เทอร์เรซ (มีนบุรี)",
    zone: "minburi",
    folder: "Chomna",
    file: "chomna"
  },
  {
    name: "Prakai Cafe & Cuisine",
    nameTH: "ประกาย คาเฟ่ แอน คูซีน (มีนบุรี)",
    zone: "minburi",
    folder: "Prakai",
    file: "prakai"
  },
  {
    name: "Trees & Co.",
    nameTH: "ทรี แอนด์ โค (มีนบุรี)",
    zone: "minburi",
    folder: "TreesCo",
    file: "trees"
  },
  {
    name: "Rim Lagoon Café",
    nameTH: "ริม ลากูน คาเฟ่ (มีนบุรี)",
    zone: "minburi",
    folder: "RimLagoon",
    file: "rim"
  },
  {
    name: "James 500 City Camp",
    nameTH: "เจมส์ 500 ซิตี้ แคมป์ (มีนบุรี)",
    zone: "minburi",
    folder: "James500",
    file: "james"
  },
  {
    name: "Cat's Eye Cafe",
    nameTH: "แคท อาย คาเฟ่ (มีนบุรี)",
    zone: "minburi",
    folder: "CatsEye",
    file: "cat"
  },
  {
    name: "Daylight",
    nameTH: "เดย์ไลท์ (มีนบุรี)",
    zone: "minburi",
    folder: "Daylight",
    file: "day"
  },
  {
    name: "Wild Duck Cafe",
    nameTH: "ไวล์ด ดัค คาเฟ่ (มีนบุรี)",
    zone: "minburi",
    folder: "WildDuck",
    file: "duck"
  },
  {
    name: "Voodoo Cafe",
    nameTH: "วูดู คาเฟ่ (หนองจอก)",
    zone: "nongchok",
    folder: "Voodoo",
    file: "voodoo"
  },
  {
    name: "All of Me Home Cafe",
    nameTH: "ออล ออฟ มี โฮม คาเฟ่ (หนองจอก)",
    zone: "nongchok",
    folder: "AllOfMe",
    file: "all"
  },
  {
    name: "Barakat Lunla Land",
    nameTH: "บารอกัต ลัลลา แลนด์ (หนองจอก)",
    zone: "nongchok",
    folder: "Barakat",
    file: "barakat"
  },
  {
    name: "Chill Out Farm & Cafe",
    nameTH: "ชิลล์ เอาท์ ฟาร์ม แอนด์ คาเฟ่ (หนองจอก)",
    zone: "nongchok",
    folder: "ChillOut",
    file: "chill"
  },
  {
    name: "Nine Than Cafe",
    nameTH: "นายท่าน คาเฟ่ (หนองจอก)",
    zone: "nongchok",
    folder: "NineThan",
    file: "nine"
  },
  {
    name: "Fairy Tale Cafe",
    nameTH: "แฟรี่ เทล คาเฟ่ (หนองจอก)",
    zone: "nongchok",
    folder: "FairyTale",
    file: "fairy"
  },
  {
    name: "Again Please",
    nameTH: "อะเกน พลีส (หนองจอก)",
    zone: "nongchok",
    folder: "AgainPlease",
    file: "again"
  },
  {
    name: "Wang Wela Café",
    nameTH: "วางเวลา คาเฟ่ (หนองจอก)",
    zone: "nongchok",
    folder: "WangWela",
    file: "wang"
  },
  {
    name: "Minna Cafe",
    nameTH: "มินนา คาเฟ่ (หนองจอก)",
    zone: "nongchok",
    folder: "Minna",
    file: "minna"
  },
  {
    name: "Home Vintage Cafe",
    nameTH: "โฮม วินเทจ คาเฟ่ (หนองจอก)",
    zone: "nongchok",
    folder: "HomeVintage",
    file: "home"
  }
];

// --- [4. Navigation Items] ---
const NAV_ITEMS = [
  {
    name: "หน้าแรก (Home)",
    target: "#home",
    icon: "fa-home",
    keywords: ["หน้าแรก", "home"]
  },
  {
    name: "หนังสือ (The Guidebook)",
    target: "#book-feature",
    icon: "fa-book",
    keywords: ["หนังสือ", "book"]
  },
  {
    name: "ของที่ระลึก (Merchandise)",
    target: "#merch",
    icon: "fa-gift",
    keywords: ["ของที่ระลึก", "merch"]
  },
  {
    name: "ร้านแนะนำ (Highlights)",
    target: "#highlights",
    icon: "fa-star",
    keywords: ["ร้านแนะนำ", "คาเฟ่"]
  },
  {
    name: "ผู้จัดทำ (Creator)",
    target: "#author",
    icon: "fa-user",
    keywords: ["ผู้จัดทำ", "ปาล์ม"]
  }
];

// --- [5. Utilities: DOM Management] ---
function cacheDOMElements() {
  const { domElements } = AppState;
  domElements.lbImg = document.getElementById("lightboxImg");
  domElements.lbContainer = document.getElementById("simpleLightbox");
  domElements.searchInput = document.getElementById("shopSearchInput");
  domElements.suggestionBox = document.getElementById("searchSuggestions");
  domElements.hamBtn = document.getElementById("hamburgerBtn");
  domElements.navMenu = document.getElementById("navLinks");
  domElements.hamIcon = document.querySelector("#hamburgerBtn i");
  domElements.logoImg = document.getElementById("mainLogo");
  domElements.themeBtns = document.querySelectorAll(".theme-btn");
}

function getElement(id) {
  return document.getElementById(id);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}

// --- [6. Initialization] ---
document.addEventListener("DOMContentLoaded", () => {
  // Reset scroll position
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  // Cache DOM elements
  cacheDOMElements();

  // Initialize theme
  initializeTheme();

  // Render content
  renderShops();
  renderTicker();

  // Initialize lightbox
  initializeLightbox();

  // Initialize search
  initializeSearch();

  // Initialize navigation
  initializeNavigation();

  // Initialize AOS
  if (typeof AOS !== "undefined") {
    setTimeout(() => {
      AOS.init({ duration: 1000, once: true });
    }, CONFIG.AOS_DELAY_MS);
  }

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    AppState.autoSlideIntervals.forEach(clearInterval);
    if (AppState.searchTimeout) clearTimeout(AppState.searchTimeout);
  });
});

// --- [7. Theme Management] ---
function initializeTheme() {
  const { ui, domElements } = AppState;
  
  if (ui.isDarkMode) {
    applyDarkTheme();
  }
}

function applyDarkTheme() {
  const { domElements } = AppState;
  document.documentElement.setAttribute("data-theme", "dark");
  if (domElements.logoImg) {
    domElements.logoImg.src = CONFIG.LOGO_DARK;
  }
  domElements.themeBtns.forEach((btn) => {
    btn.innerText = "DARK";
    btn.classList.add("active-dark");
  });
  localStorage.setItem("theme", "dark");
  AppState.ui.isDarkMode = true;
}

function applyLightTheme() {
  const { domElements } = AppState;
  document.documentElement.removeAttribute("data-theme");
  if (domElements.logoImg) {
    domElements.logoImg.src = CONFIG.LOGO_LIGHT;
  }
  domElements.themeBtns.forEach((btn) => {
    btn.innerText = "LIGHT";
    btn.classList.remove("active-dark");
  });
  localStorage.setItem("theme", "light");
  AppState.ui.isDarkMode = false;
}

function toggleTheme() {
  AppState.ui.isDarkMode ? applyLightTheme() : applyDarkTheme();
}

// --- [8. Language Management] ---
function toggleLang() {
  const { ui, domElements } = AppState;
  ui.currentLang = ui.currentLang === "th" ? "en" : "th";
  
  // Update all translated elements
  getElements("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[ui.currentLang]?.[key]) {
      el.innerHTML = translations[ui.currentLang][key];
    }
  });

  // Update search placeholder
  if (domElements.searchInput) {
    domElements.searchInput.placeholder =
      ui.currentLang === "th"
        ? "ค้นหาร้านค้า หรือเมนู..."
        : "Search shops or menu...";
  }

  // Update language buttons
  getElements(".lang-btn").forEach((btn) => {
    btn.innerText = ui.currentLang.toUpperCase();
  });

  localStorage.setItem("preferredLang", ui.currentLang);
}

// --- [9. Lightbox Management] ---
function initializeLightbox() {
  const { lbImg, lbContainer } = AppState.domElements;
  if (!lbImg || !lbContainer) return;

  // Zoom functionality
  lbImg.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLightboxZoom();
  });

  // Drag functionality
  lbImg.addEventListener("mousedown", startLightboxDrag);
  lbImg.addEventListener("touchstart", startLightboxDrag, { passive: false });
  window.addEventListener("mousemove", moveLightboxDrag);
  window.addEventListener("touchmove", moveLightboxDrag, { passive: false });
  window.addEventListener("mouseup", stopLightboxDrag);
  window.addEventListener("touchend", stopLightboxDrag);
}

function toggleLightboxZoom() {
  const { lbImg } = AppState.domElements;
  const { lightbox } = AppState;
  
  lightbox.isZoomed = !lightbox.isZoomed;

  if (!lightbox.isZoomed) {
    resetLightboxPosition();
  } else {
    lbImg.style.transform = `translate(0px, 0px) scale(${CONFIG.LIGHTBOX_ZOOM_SCALE})`;
  }
}

function resetLightboxPosition() {
  const { lbImg } = AppState.domElements;
  const { lightbox } = AppState;

  lightbox.translateX = 0;
  lightbox.translateY = 0;
  lightbox.lastX = 0;
  lightbox.lastY = 0;
  lbImg.style.transform = `translate(0px, 0px) scale(1)`;
}

function startLightboxDrag(e) {
  const { lbImg } = AppState.domElements;
  const { lightbox } = AppState;

  if (!lightbox.isZoomed) return;

  lightbox.isDragging = true;
  lbImg.style.cursor = "grabbing";

  const pageX = e.pageX || (e.touches?.[0].pageX ?? 0);
  const pageY = e.pageY || (e.touches?.[0].pageY ?? 0);

  lightbox.startX = pageX - lightbox.lastX;
  lightbox.startY = pageY - lightbox.lastY;
  lbImg.style.transition = "none";
}

function moveLightboxDrag(e) {
  const { lbImg } = AppState.domElements;
  const { lightbox } = AppState;

  if (!lightbox.isDragging) return;

  const pageX = e.pageX || (e.touches?.[0].pageX ?? 0);
  const pageY = e.pageY || (e.touches?.[0].pageY ?? 0);

  lightbox.translateX = pageX - lightbox.startX;
  lightbox.translateY = pageY - lightbox.startY;
  lbImg.style.transform = `translate(${lightbox.translateX}px, ${lightbox.translateY}px) scale(${CONFIG.LIGHTBOX_ZOOM_SCALE})`;
}

function stopLightboxDrag() {
  const { lbImg } = AppState.domElements;
  const { lightbox } = AppState;

  if (!lightbox.isDragging) return;

  lightbox.isDragging = false;
  lightbox.lastX = lightbox.translateX;
  lightbox.lastY = lightbox.translateY;
  lbImg.style.cursor = "grab";
  lbImg.style.transition = `transform ${CONFIG.TRANSITION_DURATION} ease-out`;
}

window.openSimpleLightbox = function (indexOrSrc, shopIdx) {
  const { lbImg, lbContainer } = AppState.domElements;
  const { lightbox } = AppState;

  if (typeof indexOrSrc === "string" && shopIdx === undefined) {
    lightbox.currentGallery = [indexOrSrc];
    lightbox.currentImgIdx = 0;
  } else {
    const shop = realShops[shopIdx];
    if (!shop) return;

    lightbox.currentGallery = Array.from({ length: 8 }, (_, i) =>
      `${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}${i}.jpg`
    );
    lightbox.currentImgIdx = indexOrSrc;
  }

  if (lbImg && lbContainer) {
    lbImg.src = lightbox.currentGallery[lightbox.currentImgIdx];
    resetLightboxPosition();
    lightbox.isZoomed = false;
    lbContainer.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
};

window.closeSimpleLightbox = function () {
  const { lbContainer } = AppState.domElements;
  if (lbContainer) {
    lbContainer.style.display = "none";
    document.body.style.overflow = "auto";
  }
};

window.changeImg = function (step) {
  const { lbImg } = AppState.domElements;
  const { lightbox } = AppState;

  if (!lightbox.currentGallery.length) return;

  lightbox.currentImgIdx =
    (lightbox.currentImgIdx + step + lightbox.currentGallery.length) %
    lightbox.currentGallery.length;

  if (lbImg) {
    lbImg.src = lightbox.currentGallery[lightbox.currentImgIdx];
  }
};

// --- [10. Search Management] ---
function initializeSearch() {
  const { searchInput, suggestionBox } = AppState.domElements;

  if (!searchInput) return;

  searchInput.addEventListener("input", handleSearchInput);
  document.addEventListener("click", (e) => {
    if (
      !searchInput.contains(e.target) &&
      !suggestionBox?.contains(e.target)
    ) {
      if (suggestionBox) suggestionBox.style.display = "none";
    }
  });
}

function handleSearchInput(e) {
  const { ui } = AppState;
  const { searchInput, suggestionBox } = AppState.domElements;
  const query = e.target.value.toLowerCase().trim();

  // Clear previous timeout
  if (AppState.searchTimeout) {
    clearTimeout(AppState.searchTimeout);
  }

  if (!suggestionBox) return;

  if (query === "") {
    suggestionBox.style.display = "none";
    return;
  }

  AppState.searchTimeout = setTimeout(() => {
    displaySearchSuggestions(query);
  }, CONFIG.SEARCH_DEBOUNCE_MS);
}

function displaySearchSuggestions(query) {
  const { suggestionBox, searchInput } = AppState.domElements;

  suggestionBox.innerHTML = "";

  const matchedNav = NAV_ITEMS.filter(
    (item) =>
      item.keywords.some((key) => key.includes(query)) ||
      item.name.toLowerCase().includes(query)
  );

  const matchedShops = realShops
    .filter(
      (shop) =>
        shop.name.toLowerCase().includes(query) ||
        shop.nameTH?.toLowerCase().includes(query)
    )
    .slice(0, CONFIG.MAX_SEARCH_RESULTS);

  const allResults = [...matchedNav, ...matchedShops];

  if (allResults.length === 0) {
    suggestionBox.style.display = "none";
    return;
  }

  allResults.forEach((item) => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");

    if (item.target) {
      // Navigation item
      div.innerHTML = `<i class="fas ${item.icon}"></i> <span><b>เมนู:</b> ${item.name}</span>`;
      div.addEventListener("click", () => {
        document.querySelector(item.target)?.scrollIntoView({ behavior: "smooth" });
        suggestionBox.style.display = "none";
        searchInput.value = "";
      });
      div.addEventListener("keydown", (e) => {
        if (e.key === "Enter") div.click();
      });
    } else {
      // Shop item
      div.innerHTML = `<i class="fas fa-search"></i> <span>${item.name} <small>(${item.nameTH})</small></span>`;
      div.addEventListener("click", () => {
        searchInput.value = item.name;
        suggestionBox.style.display = "none";
        executeSearch();
      });
      div.addEventListener("keydown", (e) => {
        if (e.key === "Enter") div.click();
      });
    }

    suggestionBox.appendChild(div);
  });

  suggestionBox.style.display = "block";
}

function executeSearch() {
  const { searchInput } = AppState.domElements;
  if (!searchInput) return;

  const query = searchInput.value.toLowerCase().trim();
  const shopCards = getElements(".shop-card");

  if (query === "") {
    shopCards.forEach((card) => {
      card.style.display = "";
      card.style.opacity = "1";
    });
    return;
  }

  const navMap = [
    { keywords: ["หนังสือ", "book", "guidebook"], target: "#book-feature" },
    { keywords: ["ของที่ระลึก", "merch", "sticker"], target: "#merch" },
    { keywords: ["ร้านแนะนำ", "highlights", "cafe"], target: "#highlights" },
    { keywords: ["ผู้จัดทำ", "creator", "author"], target: "#author" },
    { keywords: ["หน้าแรก", "home"], target: "#home" }
  ];

  const navMatch = navMap.find((item) =>
    item.keywords.some((key) => query.includes(key))
  );

  let firstMatch = null;

  shopCards.forEach((card) => {
    const nameText = card.querySelector(".shop-name")?.innerText.toLowerCase() || "";
    const matches =
      nameText.includes(query) ||
      realShops.some(
        (shop) =>
          shop.name.toLowerCase() === nameText &&
          shop.nameTH?.toLowerCase().includes(query)
      );

    if (matches) {
      card.style.display = "";
      card.style.opacity = "1";
      if (!firstMatch) firstMatch = card;
    } else {
      card.style.display = "none";
    }
  });

  if (navMatch) {
    document
      .querySelector(navMatch.target)
      ?.scrollIntoView({ behavior: "smooth" });
  } else if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// --- [11. Navigation Management] ---
function initializeNavigation() {
  const { hamBtn, navMenu, hamIcon } = AppState.domElements;
  const backdrop = getElement("navBackdrop");
  const navCloseBtn = getElement("navCloseBtn");

  if (hamBtn) {
    hamBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleNavMenu();
    });
  }

  if (navCloseBtn) {
    navCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeNavMenu();
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeNavMenu);
  }

  if (navMenu) {
    navMenu.querySelectorAll("a, .lang-btn, .theme-btn").forEach((item) => {
      item.addEventListener("click", closeNavMenu);
    });
  }
}

function toggleNavMenu() {
  const { navMenu } = AppState.domElements;
  navMenu?.classList.contains("active") ? closeNavMenu() : openNavMenu();
}

function openNavMenu() {
  const { navMenu, hamIcon } = AppState.domElements;
  const backdrop = getElement("navBackdrop");

  navMenu?.classList.add("active");
  backdrop?.classList.add("active");

  if (hamIcon) {
    hamIcon.classList.remove("fa-bars");
    hamIcon.classList.add("fa-times");
  }

  document.body.style.overflow = "hidden";
}

function closeNavMenu() {
  const { navMenu, hamIcon } = AppState.domElements;
  const backdrop = getElement("navBackdrop");

  navMenu?.classList.remove("active");
  backdrop?.classList.remove("active");

  if (hamIcon) {
    hamIcon.classList.add("fa-bars");
    hamIcon.classList.remove("fa-times");
  }

  document.body.style.overflow = "";
}

// --- [12. Content Rendering] ---
function renderShops() {
  const minGrid = getElement("minburi-list");
  const nongGrid = getElement("nongchok-list");

  if (!minGrid || !nongGrid) return;

  minGrid.innerHTML = "";
  nongGrid.innerHTML = "";

  realShops.forEach((shop, shopIdx) => {
    const imgHtml = Array.from({ length: 8 }, (_, i) => {
      const fullPath = `${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}${i}.jpg`;
      return `
        <img 
          class="photo-item ${i === 0 ? "active" : ""}" 
          src="${fullPath}" 
          alt="${shop.name} - Photo ${i + 1}"
          data-shop-idx="${shopIdx}"
          data-img-idx="${i}"
          loading="lazy"
          onerror="this.src = this.src.replace('.jpg', '.JPG'); this.onerror = () => { this.style.display='none'; };">
      `;
    }).join("");

    const zoneDisplay = shop.zone === "minburi" 
      ? "ย่านมีนบุรี" 
      : "ย่านหนองจอก";

    const cardHtml = `
      <div class="shop-card" data-aos="fade-up">
        <div class="photo-gallery">${imgHtml}</div>
        <div class="shop-info">
          <div class="shop-name">${shop.name}</div>
          <div class="shop-tag">${zoneDisplay}</div>
        </div>
      </div>
    `;

    if (shop.zone === "minburi") {
      minGrid.insertAdjacentHTML("beforeend", cardHtml);
    } else {
      nongGrid.insertAdjacentHTML("beforeend", cardHtml);
    }
  });

  // Add event delegation for image clicks
  [minGrid, nongGrid].forEach((grid) => {
    grid.addEventListener("click", (e) => {
      if (e.target.classList.contains("photo-item")) {
        const shopIdx = parseInt(e.target.getAttribute("data-shop-idx"));
        const imgIdx = parseInt(e.target.getAttribute("data-img-idx"));
        window.openSimpleLightbox(imgIdx, shopIdx);
      }
    });
  });

  setTimeout(startAutoSlide, 300);
}

function startAutoSlide() {
  getElements(".photo-gallery").forEach((gallery) => {
    const images = gallery.querySelectorAll(".photo-item");
    if (images.length <= 1) return;

    let idx = 0;
    const intervalId = setInterval(() => {
      images[idx].classList.remove("active");
      idx = (idx + 1) % images.length;
      images[idx].classList.add("active");
    }, CONFIG.AUTO_SLIDE_INTERVAL);

    AppState.autoSlideIntervals.push(intervalId);
  });
}

function renderTicker() {
  const t1 = getElement("shopTickerInner");
  const t2 = getElement("shopTickerInnerDup");

  if (!t1 || !t2) return;

  const content = realShops
    .map(
      (shop) =>
        `<div class="ticker-item">${shop.name}</div><div class="ticker-sep">SAVOR HAPPINESS 🍴</div>`
    )
    .join("");

  t1.innerHTML = content;
  t2.innerHTML = content;
}

// --- [13. Utility Functions] ---
function copyContact() {
  navigator.clipboard.writeText("palmy1983ch@gmail.com").then(() => {
    const btn = document.querySelector(".copy-btn");
    if (btn) {
      const old = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        btn.innerHTML = old;
      }, CONFIG.THEME_TRANSITION_MS);
    }
  });
}

window.changeBookView = function (src, thumb) {
  const mainImg = getElement("mainBookImg");
  if (mainImg) {
    mainImg.src = src;
    getElements(".thumb-item").forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
  }
};

window.openQRModal = function () {
  const modal = getElement("qrModal");
  if (modal) modal.style.display = "flex";
};

window.closeQRModal = function () {
  const modal = getElement("qrModal");
  if (modal) modal.style.display = "none";
};

// Scroll progress bar
window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const myBar = getElement("myBar");
  if (myBar) myBar.style.width = scrolled + "%";
});
