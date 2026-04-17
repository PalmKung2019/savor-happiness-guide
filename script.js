/* ============================================================
   SAVOR HAPPINESS - TOTAL INTEGRATED ENGINE (JS)
   Consolidated UI Logic | Lightbox | Search | Multi-Lang | Filters
   ============================================================ */

// --- [1. CONFIG CONSTANTS] ---
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
};

// --- [2. APP STATE MANAGEMENT] ---
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
    currentImgIdx: 0,
  },
  ui: {
    currentLang: localStorage.getItem("preferredLang") || "th",
    isDarkMode: localStorage.getItem("theme") === "dark",
  },
  autoSlideIntervals: [],
  searchTimeout: null,
  domElements: {},
};

// --- [3. TRANSLATION DICTIONARY (TH/EN)] ---
const translations = {
  th: {
    "nav-home": "หน้าแรก",
    "nav-book": "หนังสือ",
    "nav-merch": "ของที่ระลึก",
    "nav-highlights": "ร้านแนะนำ",
    "nav-creator": "ผู้จัดทำ",
    "hero-subtitle": "DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS",
    "hero-title": "SAVOR HAPPINESS",
    "hero-vibe": "VIBE. VISUAL. VACATION.",
    "hero-desc": "ไกด์บุ๊คที่จะทำให้คุณตกหลุมรักชานเมือง",
    "btn-start": "กดเริ่มเพื่อลิ้มรสความสุข",
    "book-title": "THE GUIDEBOOK",
    "book-desc":
      "Savor Happiness: ถ่ายทอดเสน่ห์ย่านมีนบุรี–หนองจอก ผ่าน Visual Storytelling ผสมผสานภาพถ่ายบรรยากาศจริงเข้ากับงานกราฟิกสีสันสดใส จัดวางแบบ Dynamic Layout ให้อ่านง่าย พร้อมแผนที่ Postcard ที่พกพาสะดวก",
    "btn-pdf": '<i class="fas fa-file-pdf"></i> เปิดอ่านตัวอย่าง PDF',
    "merch-min-title": "Savor Happiness Sticker set",
    "zone-minburi": "ย่านมีนบุรี",
    "zone-nongchok": "ย่านหนองจอก",
    "author-title": "ผู้จัดทำ",
    "btn-modal-book": '<i class="fas fa-book-open"></i> ดูรูปเต็มในไกด์บุ๊ค',
    "filter-all": "ทั้งหมด",
    "filter-min": "ย่านมีนบุรี",
    "filter-nong": "ย่านหนองจอก",
  },
  en: {
    "nav-home": "Home",
    "nav-book": "Guidebook",
    "nav-merch": "Merchandise",
    "nav-highlights": "Highlights",
    "nav-creator": "Creator",
    "hero-subtitle": "DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS",
    "hero-title": "SAVOR HAPPINESS",
    "hero-vibe": "VIBE. VISUAL. VACATION.",
    "hero-desc":
      "A guidebook that will make you fall in love with the suburbs.",
    "btn-start": "Press Start to Savor Happiness",
    "book-title": "THE GUIDEBOOK",
    "book-desc":
      "Savor Happiness: Conveying the charm of Minburi-Nong Chok through Visual Storytelling. Combining real atmosphere photography with colorful graphics in a dynamic, easy-to-read layout, complete with a handy Postcard map.",
    "btn-pdf": '<i class="fas fa-file-pdf"></i> Preview PDF File',
    "merch-min-title": "Savor Happiness Sticker set",
    "zone-minburi": "Minburi Zone",
    "zone-nongchok": "Nong Chok Zone",
    "author-title": "Creator",
    "btn-modal-book": '<i class="fas fa-book-open"></i> View in Guidebook',
    "filter-all": "All",
    "filter-min": "Minburi",
    "filter-nong": "Nong Chok",
  },
};

// --- [4. COMPLETE SHOP DATA (20 CAFES WITH DESCRIPTIONS)] ---
const realShops = [
  // MINBURI ZONE (10)
  {
    name: "The Lobby Boy Coffee",
    nameTH: "เดอะ ล็อบบี้ บอย คอฟฟี่",
    zone: "minburi",
    folder: "LobbyBoy",
    file: "lobby",
    descTH:
      "คาเฟ่สไตล์วินเทจคลาสสิกที่ได้รับแรงบันดาลใจจากภาพยนตร์ โดดเด่นด้วยเมนูกาแฟสเปเชียลตี้และมุมถ่ายรูปสุดเก๋",
    descEN:
      "A classic vintage cafe inspired by movies. Known for its specialty coffee and aesthetic photo spots.",
  },
  {
    name: "De Wila Cat Hotel & Café",
    nameTH: "เดอ วิลา แคท โฮเทล แอนด์ คาเฟ่",
    zone: "minburi",
    folder: "DeWila",
    file: "dewila",
    descTH:
      "พื้นที่แห่งความสุขสำหรับคนรักแมว บริการคาเฟ่พร้อมโรงแรมแมว บรรยากาศอบอุ่นเป็นกันเอง",
    descEN:
      "A paradise for cat lovers featuring a cozy cafe and professional cat hotel services.",
  },
  {
    name: "Chomna Bar & Terrace",
    nameTH: "ชมนา บาร์ แอนด์ เทอร์เรซ",
    zone: "minburi",
    folder: "Chomna",
    file: "chomna",
    descTH:
      "ร้านอาหารบรรยากาศริมทุ่งนาสุดชิล เหมาะสำหรับนั่งรับลมเย็นๆ พร้อมทานอาหารไทยรสจัดจ้าน",
    descEN:
      "A relaxing bar and terrace overlooking lush paddy fields, serving authentic and spicy Thai cuisine.",
  },
  {
    name: "Prakai Cafe & Cuisine",
    nameTH: "ประกาย คาเฟ่ แอน คูซีน",
    zone: "minburi",
    folder: "Prakai",
    file: "prakai",
    descTH:
      "คาเฟ่ริมน้ำบรรยากาศร่มรื่น ตกแต่งสไตล์แคมป์ปิ้งธรรมชาติ มีน้ำตกจำลองและจุดถ่ายรูปมากมาย",
    descEN:
      "A nature-inspired riverside cafe with camping-style decor, an artificial waterfall, and plenty of photo angles.",
  },
  {
    name: "Trees & Co.",
    nameTH: "ทรี แอนด์ โค",
    zone: "minburi",
    folder: "TreesCo",
    file: "trees",
    descTH:
      "โอเอซิสใจกลางมีนบุรี ร่มรื่นด้วยต้นไม้ใหญ่ โดดเด่นเรื่องเบเกอรี่โฮมเมดและเครื่องดื่มสูตรพิเศษ",
    descEN:
      "An oasis in Minburi surrounded by large trees, highlighting homemade bakeries and signature drinks.",
  },
  {
    name: "Rim Lagoon Café",
    nameTH: "ริม ลากูน คาเฟ่",
    zone: "minburi",
    folder: "RimLagoon",
    file: "rim",
    descTH:
      "พักผ่อนริมทะเลสาบส่วนตัว ท่ามกลางธรรมชาติที่เงียบสงบ เหมาะกับการหลีกหนีความวุ่นวาย",
    descEN:
      "Relax by a private lagoon. A peaceful retreat surrounded by nature to escape the city's hustle.",
  },
  {
    name: "James 500 City Camp",
    nameTH: "เจมส์ 500 ซิตี้ แคมป์",
    zone: "minburi",
    folder: "James500",
    file: "james",
    descTH:
      "ยกแคมป์ปิ้งมาไว้ในเมือง! คาเฟ่สไตล์ Outdoor ให้กลิ่นอายการผจญภัยพร้อมอาหารฟิวชั่น",
    descEN:
      "Bringing camping to the city! An outdoor-style cafe offering adventurous vibes and fusion food.",
  },
  {
    name: "Cat's Eye Cafe",
    nameTH: "แคท อาย คาเฟ่",
    zone: "minburi",
    folder: "CatsEye",
    file: "cat",
    descTH:
      "คาเฟ่ลับที่ซ่อนตัวอยู่เงียบๆ บรรยากาศสบายๆ เหมาะสำหรับการนั่งทำงานหรือจิบกาแฟยามบ่าย",
    descEN:
      "A hidden cafe with a cozy atmosphere, perfect for working or enjoying an afternoon coffee.",
  },
  {
    name: "Daylight",
    nameTH: "เดย์ไลท์",
    zone: "minburi",
    folder: "Daylight",
    file: "day",
    descTH:
      "แสงแดดส่องถึงทุกมุม คาเฟ่สไตล์เกาหลีมินิมอล โทนสีขาวสะอาดตา ถ่ายรูปสวยทุกมุม",
    descEN:
      "Filled with natural daylight. A Korean-minimalist cafe with clean white tones and perfect lighting.",
  },
  {
    name: "Wild Duck Cafe",
    nameTH: "ไวล์ด ดัค คาเฟ่",
    zone: "minburi",
    folder: "WildDuck",
    file: "duck",
    descTH:
      "บรรยากาศริมน้ำที่เต็มไปด้วยเป็ดว่ายน้ำเพลินๆ ร่มรื่นและเป็นมิตรกับครอบครัว",
    descEN:
      "A family-friendly riverside cafe where you can watch wild ducks swimming peacefully.",
  },

  // NONGCHOK ZONE (10)
  {
    name: "Voodoo Cafe",
    nameTH: "วูดู คาเฟ่",
    zone: "nongchok",
    folder: "Voodoo",
    file: "voodoo",
    descTH:
      "ตกแต่งสไตล์สวนยุโรปคลาสสิก หรูหรากว้างขวาง โดดเด่นด้วยสถาปัตยกรรมและของสะสมวินเทจ",
    descEN:
      "Decorated in a classic European garden style, spacious and luxurious with vintage architecture.",
  },
  {
    name: "All of Me Home Cafe",
    nameTH: "ออล ออฟ มี โฮม คาเฟ่",
    zone: "nongchok",
    folder: "AllOfMe",
    file: "all",
    descTH:
      "คาเฟ่สไตล์โฮมมี่ อบอุ่นเหมือนนั่งเล่นบ้านเพื่อน เสิร์ฟขนมอบใหม่ๆ หอมกรุ่นทุกวัน",
    descEN:
      "A homey cafe that feels like visiting a friend's house. Serving freshly baked goods every day.",
  },
  {
    name: "Barakat Lunla Land",
    nameTH: "บารอกัต ลัลลา แลนด์",
    zone: "nongchok",
    folder: "Barakat",
    file: "barakat",
    descTH:
      "จุดเช็คอินสไตล์ทุ่งหญ้าและฟาร์มสัตว์ ให้อารมณ์เหมือนไปเที่ยวพักผ่อนต่างจังหวัด",
    descEN:
      "A meadow and farm-style check-in spot, giving you the feeling of a provincial getaway.",
  },
  {
    name: "Chill Out Farm & Cafe",
    nameTH: "ชิลล์ เอาท์ ฟาร์ม แอนด์ คาเฟ่",
    zone: "nongchok",
    folder: "ChillOut",
    file: "chill",
    descTH:
      "คาเฟ่และฟาร์มมินิซู มีสัตว์น่ารักๆ มากมาย เหมาะสำหรับพาเด็กๆ มาทำกิจกรรม",
    descEN:
      "A cafe and mini-zoo farm featuring cute animals. A perfect destination for family activities.",
  },
  {
    name: "Nine Than Cafe",
    nameTH: "นายท่าน คาเฟ่",
    zone: "nongchok",
    folder: "NineThan",
    file: "nine",
    descTH:
      "ร้านกาแฟสไตล์ญี่ปุ่นมินิมอล โดดเด่นด้วยงานไม้และความเรียบง่าย สงบและผ่อนคลาย",
    descEN:
      "A Japanese minimalist coffee shop highlighted by wooden elements, simplicity, and calmness.",
  },
  {
    name: "Fairy Tale Cafe",
    nameTH: "แฟรี่ เทล คาเฟ่",
    zone: "nongchok",
    folder: "FairyTale",
    file: "fairy",
    descTH:
      "คาเฟ่เหมือนหลุดเข้าไปในโลกนิทาน ตกแต่งน่ารัก เหมาะกับสายหวานที่ชอบถ่ายรูป",
    descEN:
      "A cafe that feels like a fairy tale. Adorably decorated and perfect for sweet photo ops.",
  },
  {
    name: "Again Please",
    nameTH: "อะเกน พลีส",
    zone: "nongchok",
    folder: "AgainPlease",
    file: "again",
    descTH:
      "คาเฟ่โปร่งโล่งสบายตา เครื่องดื่มอร่อยจนต้องขอเบิ้ลอีกแก้วสมชื่อร้าน",
    descEN:
      "A bright and airy cafe. The drinks are so good you'll be saying 'Again Please'!",
  },
  {
    name: "Wang Wela Café",
    nameTH: "วางเวลา คาเฟ่",
    zone: "nongchok",
    folder: "WangWela",
    file: "wang",
    descTH:
      "วางเวลาและความวุ่นวายทิ้งไว้ แล้วมานั่งพักผ่อนชิลๆ ริมน้ำ รับลมเย็นสบาย",
    descEN:
      "Leave time and chaos behind. Come sit, relax by the water, and enjoy the cool breeze.",
  },
  {
    name: "Minna Cafe",
    nameTH: "มินนา คาเฟ่",
    zone: "nongchok",
    folder: "Minna",
    file: "minna",
    descTH:
      "คาเฟ่สไตล์บ้านสวนผสมผสานความโมเดิร์น โอบล้อมด้วยสีเขียวของธรรมชาติแบบเต็มพิกัด",
    descEN:
      "A garden house cafe mixed with modern style, fully surrounded by the green of nature.",
  },
  {
    name: "Home Vintage Cafe",
    nameTH: "โฮม วินเทจ คาเฟ่",
    zone: "nongchok",
    folder: "HomeVintage",
    file: "home",
    descTH:
      "คาเฟ่ในบ้านไม้สไตล์วินเทจแท้ๆ ให้ความรู้สึกย้อนยุค อบอุ่น และคลาสสิก",
    descEN:
      "A cafe set in an authentic vintage wooden house, providing a nostalgic, warm, and classic feel.",
  },
];

// --- [5. NAVIGATION ITEMS (For Search)] ---
const NAV_ITEMS = [
  {
    name: "หน้าแรก (Home)",
    target: "#home",
    icon: "fa-home",
    keywords: ["หน้าแรก", "home"],
  },
  {
    name: "หนังสือ (The Guidebook)",
    target: "#book-feature",
    icon: "fa-book",
    keywords: ["หนังสือ", "book", "guidebook"],
  },
  {
    name: "ของที่ระลึก (Merchandise)",
    target: "#merch",
    icon: "fa-gift",
    keywords: ["ของที่ระลึก", "merch", "sticker", "postcard"],
  },
  {
    name: "ร้านแนะนำ (Highlights)",
    target: "#highlights",
    icon: "fa-star",
    keywords: ["ร้านแนะนำ", "คาเฟ่", "cafe", "restaurant"],
  },
  {
    name: "ผู้จัดทำ (Creator)",
    target: "#author",
    icon: "fa-user",
    keywords: ["ผู้จัดทำ", "ปาล์ม", "creator", "author"],
  },
];

// --- [6. INITIALIZATION & DOM MANAGEMENT] ---
function getElement(id) {
  return document.getElementById(id);
}
function getElements(selector) {
  return document.querySelectorAll(selector);
}

function cacheDOMElements() {
  const { domElements } = AppState;
  domElements.lbImg = getElement("lightboxImg");
  domElements.lbContainer = getElement("simpleLightbox");
  domElements.searchInput = getElement("shopSearchInput");
  domElements.suggestionBox = getElement("searchSuggestions");
  domElements.hamBtn = getElement("hamburgerBtn");
  domElements.navMenu = getElement("navLinks");
  domElements.logoImg = getElement("mainLogo");
  domElements.themeBtns = getElements(".theme-btn");
}

document.addEventListener("DOMContentLoaded", () => {
  if (history.scrollRestoration) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  cacheDOMElements();
  initializeTheme();

  // Render Data
  renderShops();
  renderTicker();

  // Set Initial Language
  applyLanguage(AppState.ui.currentLang);

  // Initializers
  initializeLightbox();
  initializeSearch();
  initializeNavigation();
  initializeFilters();

  window.addEventListener("beforeunload", () => {
    AppState.autoSlideIntervals.forEach(clearInterval);
    if (AppState.searchTimeout) clearTimeout(AppState.searchTimeout);
  });
});

// --- [7. THEME MANAGEMENT] ---
function initializeTheme() {
  if (AppState.ui.isDarkMode) applyDarkTheme();
}

function applyDarkTheme() {
  const { domElements } = AppState;
  document.documentElement.setAttribute("data-theme", "dark");
  if (domElements.logoImg) domElements.logoImg.src = CONFIG.LOGO_DARK;
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
  if (domElements.logoImg) domElements.logoImg.src = CONFIG.LOGO_LIGHT;
  domElements.themeBtns.forEach((btn) => {
    btn.innerText = "LIGHT";
    btn.classList.remove("active-dark");
  });
  localStorage.setItem("theme", "light");
  AppState.ui.isDarkMode = false;
}

window.toggleTheme = function () {
  AppState.ui.isDarkMode ? applyLightTheme() : applyDarkTheme();
};

// --- [8. LANGUAGE MANAGEMENT (Real-time)] ---
function applyLanguage(lang) {
  // 1. Translate Data-Key elements
  getElements("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[lang]?.[key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // 2. Translate Search Placeholder
  const searchInput = AppState.domElements.searchInput;
  if (searchInput) {
    searchInput.placeholder =
      lang === "th" ? "ค้นหาร้านค้าที่นี่..." : "Search shops here...";
  }

  // 3. Update Language Buttons text
  getElements(".lang-btn").forEach((btn) => {
    btn.innerText = lang.toUpperCase();
  });

  // 4. Update Filter Buttons
  const filterBtns = getElements(".filter-btn");
  if (filterBtns.length >= 3) {
    filterBtns[0].innerText = translations[lang]["filter-all"];
    filterBtns[1].innerText = translations[lang]["filter-min"];
    filterBtns[2].innerText = translations[lang]["filter-nong"];
  }

  // 5. Update Shop Cards zone tags dynamically
  getElements(".shop-tag").forEach((tag) => {
    const isMinburi = tag.getAttribute("data-zone") === "minburi";
    tag.innerText =
      translations[lang][isMinburi ? "zone-minburi" : "zone-nongchok"];
  });
}

window.toggleLang = function () {
  AppState.ui.currentLang = AppState.ui.currentLang === "th" ? "en" : "th";
  localStorage.setItem("preferredLang", AppState.ui.currentLang);
  applyLanguage(AppState.ui.currentLang);
};

// --- [9. CONTENT RENDERING (Injecting Shops)] ---
function renderShops() {
  const minGrid = getElement("minburi-list");
  const nongGrid = getElement("nongchok-list");

  if (!minGrid || !nongGrid) return;

  minGrid.innerHTML = "";
  nongGrid.innerHTML = "";

  realShops.forEach((shop, shopIdx) => {
    // Generate 8 images for auto-slide gallery
    const imgHtml = Array.from({ length: 8 }, (_, i) => {
      const fullPath = `${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}${i}.webp`;
      return `
        <img 
          class="photo-item ${i === 0 ? "active" : ""}" 
          src="${fullPath}" 
          alt="${shop.name} - Photo ${i + 1}"
          data-shop-idx="${shopIdx}"
          data-img-idx="${i}"
          loading="lazy"
          onerror="this.style.display='none';">
      `;
    }).join("");

    // Generate Card HTML
    const cardHtml = `
      <div class="shop-card" data-aos="fade-up">
        <div class="photo-gallery" title="คลิกเพื่อดูรูปขยาย">
            ${imgHtml}
        </div>
        <div class="shop-info shop-info-clickable" onclick="openCafeModal(${shopIdx})" title="คลิกเพื่อดูข้อมูลร้าน">
          <div class="shop-name">${shop.name}</div>
          <div class="shop-tag" data-zone="${shop.zone}"></div>
          <div class="click-more-hint"><i class="fas fa-arrow-right"></i> <span class="read-more-text">อ่านรายละเอียด</span></div>
        </div>
      </div>
    `;

    if (shop.zone === "minburi") {
      minGrid.insertAdjacentHTML("beforeend", cardHtml);
    } else {
      nongGrid.insertAdjacentHTML("beforeend", cardHtml);
    }
  });

  // Attach Lightbox clicks to images
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
        `<div class="ticker-item">${shop.name}</div><div class="ticker-sep">SAVOR HAPPINESS 🍴</div>`,
    )
    .join("");

  t1.innerHTML = content;
  t2.innerHTML = content;
}

// --- [10. SEARCH MANAGEMENT] ---
function initializeSearch() {
  const { searchInput, suggestionBox } = AppState.domElements;
  if (!searchInput) return;

  searchInput.addEventListener("input", handleSearchInput);

  // FIX: User hits Enter -> Execute Search, Blur Keyboard, Hide Suggestions
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      executeSearch();
      searchInput.blur();
      if (suggestionBox) suggestionBox.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionBox?.contains(e.target)) {
      if (suggestionBox) suggestionBox.style.display = "none";
    }
  });
}

function handleSearchInput(e) {
  const { suggestionBox } = AppState.domElements;
  const query = e.target.value.toLowerCase().trim();

  if (AppState.searchTimeout) clearTimeout(AppState.searchTimeout);
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
      item.name.toLowerCase().includes(query),
  );

  const matchedShops = realShops
    .filter(
      (shop) =>
        shop.name.toLowerCase().includes(query) ||
        shop.nameTH?.toLowerCase().includes(query),
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

    if (item.target) {
      div.innerHTML = `<i class="fas ${item.icon}"></i> <span><b>เมนู:</b> ${item.name}</span>`;
      div.addEventListener("click", () => {
        document
          .querySelector(item.target)
          ?.scrollIntoView({ behavior: "smooth" });
        suggestionBox.style.display = "none";
        searchInput.value = "";
      });
    } else {
      div.innerHTML = `<i class="fas fa-search"></i> <span>${item.name} <small>(${item.nameTH})</small></span>`;
      div.addEventListener("click", () => {
        searchInput.value = item.name;
        suggestionBox.style.display = "none";
        executeSearch();
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

  const navMatch = NAV_ITEMS.find((item) =>
    item.keywords.some((key) => query.includes(key)),
  );
  let firstMatch = null;

  shopCards.forEach((card) => {
    const nameText =
      card.querySelector(".shop-name")?.innerText.toLowerCase() || "";
    const matches =
      nameText.includes(query) ||
      realShops.some(
        (shop) =>
          shop.name.toLowerCase() === nameText &&
          shop.nameTH?.toLowerCase().includes(query),
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

// --- [11. LIGHTBOX MANAGEMENT] ---
function initializeLightbox() {
  const { lbImg, lbContainer } = AppState.domElements;
  if (!lbImg || !lbContainer) return;

  lbImg.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLightboxZoom();
  });

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
    // Open single image (e.g. Map, Book cover)
    lightbox.currentGallery = [indexOrSrc];
    lightbox.currentImgIdx = 0;
  } else {
    // Open gallery for a specific shop
    const shop = realShops[shopIdx];
    if (!shop) return;

    lightbox.currentGallery = Array.from(
      { length: 8 },
      (_, i) => `${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}${i}.webp`,
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

// --- [12. NAVIGATION & FILTERS] ---
function initializeNavigation() {
  const { hamBtn, navMenu } = AppState.domElements;
  const navCloseBtn = getElement("navCloseBtn");

  if (hamBtn) {
    hamBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openNavMenu();
    });
  }

  if (navCloseBtn) {
    navCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeNavMenu();
    });
  }

  document.addEventListener("click", (e) => {
    if (
      navMenu &&
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !hamBtn.contains(e.target)
    ) {
      closeNavMenu();
    }
  });

  if (navMenu) {
    navMenu.querySelectorAll("a, .lang-btn, .theme-btn").forEach((item) => {
      item.addEventListener("click", closeNavMenu);
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeNavMenu();
  });
}

function openNavMenu() {
  const { navMenu, hamBtn } = AppState.domElements;
  const navBackdrop = getElement("navBackdrop");

  if (navMenu) navMenu.classList.add("active");
  if (navBackdrop) navBackdrop.classList.add("active");
  if (hamBtn) {
    hamBtn.style.opacity = "0";
    hamBtn.style.pointerEvents = "none";
  }
  document.body.style.overflow = "hidden";
}

function closeNavMenu() {
  const { navMenu, hamBtn } = AppState.domElements;
  const navBackdrop = getElement("navBackdrop");

  if (navMenu) navMenu.classList.remove("active");
  if (navBackdrop) navBackdrop.classList.remove("active");
  if (hamBtn) {
    hamBtn.style.opacity = "1";
    hamBtn.style.pointerEvents = "auto";
  }
  document.body.style.overflow = "";
}

function initializeFilters() {
  const filterBtns = getElements(".filter-btn");
  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");
        const minSection = getElement("minburi-section");
        const nongSection = getElement("nongchok-section");

        if (filter === "all") {
          minSection.style.display = "block";
          nongSection.style.display = "block";
        } else if (filter === "minburi") {
          minSection.style.display = "block";
          nongSection.style.display = "none";
        } else {
          minSection.style.display = "none";
          nongSection.style.display = "block";
        }

        // Refresh AOS if exists to prevent layout breaking
        if (typeof AOS !== "undefined") AOS.refresh();
      });
    });
  }
}

// --- [13. MODAL LOGIC (CAFE DETAILS)] ---
window.openCafeModal = function (shopIdx) {
  const shop = realShops[shopIdx];
  const currentLang = AppState.ui.currentLang;
  const imgPath = `${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}0.webp`;

  getElement("modalImg").src = imgPath;

  // Support Thai & English based on current state
  getElement("modalTitle").innerText =
    currentLang === "th" ? shop.nameTH : shop.name;
  getElement("modalDesc").innerText =
    currentLang === "th" ? shop.descTH : shop.descEN;

  // Update button text language
  const modalBtn = document.querySelector("#cafeModal .btn-primary");
  if (modalBtn) {
    modalBtn.innerHTML = translations[currentLang]["btn-modal-book"];
  }

  getElement("cafeModal").style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.closeModal = function () {
  getElement("cafeModal").style.display = "none";
  document.body.style.overflow = "";
};

window.addEventListener("click", (e) => {
  if (e.target.id === "cafeModal") window.closeModal();
});

// --- [14. MISCELLANEOUS UTILITIES] ---
window.copyContact = function () {
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
};

window.changeBookView = function (src, thumb) {
  const mainImg = getElement("mainBookImg");
  if (mainImg) {
    mainImg.src = src;
    getElements(".thumb-item").forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
  }
};

window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const myBar = getElement("myBar");
  if (myBar) myBar.style.width = scrolled + "%";
});
