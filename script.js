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
    descTH: "คาเฟ่สายดริปที่เท่จัดแต่จริงใจด้วยหมูกรอบคั่วพริกเกลือระดับตำนาน",
    descEN:
      "A seriously cool drip coffee spot serving up unexpectedly legendary crispy pork with chili and salt.",
  },
  {
    name: "De Wila Cat Hotel & Café",
    nameTH: "เดอ วิลา แคท โฮเทล แอนด์ คาเฟ่",
    zone: "minburi",
    folder: "DeWila",
    file: "dewila",
    descTH:
      "หลบมานั่งนิ่งๆ ปล่อยใจไปกับฝูงแมวนุ่มฟูในบ้านที่อบอวลด้วยความอบอุ่น",
    descEN:
      "Escape the rush and unwind in a cozy house surrounded by a fluffy feline family.",
  },
  {
    name: "Chomna Bar & Terrace",
    nameTH: "ชมนา บาร์ แอนด์ เทอร์เรซ",
    zone: "minburi",
    folder: "Chomna",
    file: "chomna",
    descTH:
      "ทิ้งความวุ่นวายมานั่งรับลมริมนา จบด้วยมื้อไทย รสจัดจ้านที่เติมพลังให้ชีวิต",
    descEN:
      "Leave the chaos behind for relaxing rice field breezes and bold, energizing Thai dishes.",
  },
  {
    name: "Prakai Cafe & Cuisine",
    nameTH: "ประกาย คาเฟ่ แอน คูซีน",
    zone: "minburi",
    folder: "Prakai",
    file: "prakai",
    descTH:
      "สัมผัสละอองน้ำคลายร้อนในป่ากลางเมือง พื้นที่ชาร์จแบตที่เย็นสบายตั้งแต่ก้าวแรก",
    descEN:
      "A refreshing urban forest oasis where cool mist recharges your soul from the very first step.",
  },
  {
    name: "Trees & Co.",
    nameTH: "ทรี แอนด์ โค",
    zone: "minburi",
    folder: "TreesCo",
    file: "trees",
    descTH:
      "พักสายตาไปกับความเขียวขจีของแมกไม้ ในพื้นที่เงียบสงบที่ชวนให้หยุดเวลาไว้ช้าๆ",
    descEN:
      "Rest your eyes on lush greenery in a tranquil space that makes time stand still.",
  },
  {
    name: "Rim Lagoon Café",
    nameTH: "ริม ลากูน คาเฟ่",
    zone: "minburi",
    folder: "RimLagoon",
    file: "rim",
    descTH:
      "ทิ้งตัวพักผ่อนริมบึงกว้าง ในบ้านไม้หลังใหญ่ที่ต้อนรับเราด้วยความอบอุ่นเหมือนแวะมาหาเพื่อน",
    descEN:
      "Unwind by a wide lagoon in a large, welcoming wooden house that feels like visiting a good friend.",
  },
  {
    name: "James 500 City Camp",
    nameTH: "เจมส์ 500 ซิตี้ แคมป์",
    zone: "minburi",
    folder: "James500",
    file: "james",
    descTH:
      "วาร์ปมาแคมป์ปิ้งริมน้ำให้หายเหนื่อย เปลี่ยนวันว่างให้เป็นทริปพักใจที่เรียบง่ายแต่โคตรชิลล์",
    descEN:
      "Transport yourself to a riverside campsite for a simple, incredibly chill getaway right in the city.",
  },
  {
    name: "Cat's Eye Cafe",
    nameTH: "แคท อาย คาเฟ่",
    zone: "minburi",
    folder: "CatsEye",
    file: "cat",
    descTH:
      "แวะทักทายเจ้าถิ่นตัวนุ่มในคาเฟ่มินิมอลขนาดกะทัดรัด ที่เติมเต็มความสุขด้วยขนมโฮมเมดและรอยยิ้ม",
    descEN:
      "Say hi to the fluffy locals in this compact, minimalist cafe filled with homemade treats and smiles.",
  },
  {
    name: "Daylight",
    nameTH: "เดย์ไลท์",
    zone: "minburi",
    folder: "Daylight",
    file: "day",
    descTH:
      "ชาร์จพลังบวกด้วยแสงธรรมชาติ ในคาเฟ่สีขาวมินิมอลที่เรียบง่ายแต่แสนละมุนตา",
    descEN:
      "Recharge your positive energy in a soothing, white minimalist cafe bathed in natural light.",
  },
  {
    name: "Wild Duck Cafe",
    nameTH: "ไวล์ด ดัค คาเฟ่",
    zone: "minburi",
    folder: "WildDuck",
    file: "duck",
    descTH:
      "สูดอากาศบริสุทธิ์ ชมเป็ดเล่นน้ำ พร้อมลิ้มรสอาหารไทยรสจัดจ้าน ท่ามกลางความเป็นส่วนตัวที่เงียบสงบ",
    descEN:
      "Breathe in the fresh air, watch ducks glide by, and enjoy bold Thai flavors in a perfectly peaceful setting.",
  },

  // NONGCHOK ZONE (10)
  {
    name: "Voodoo Cafe",
    nameTH: "วูดู คาเฟ่",
    zone: "nongchok",
    folder: "Voodoo",
    file: "voodoo",
    descTH:
      "เสน่ห์สไตล์ยุโรปวินเทจ ท่ามกลางสวนสวยที่เนรมิตความสุขให้ทุกย่างก้าว",
    descEN:
      "Step into vintage European charm surrounded by a breathtakingly beautiful garden.",
  },
  {
    name: "All of Me Home Cafe",
    nameTH: "ออล ออฟ มี โฮม คาเฟ่",
    zone: "nongchok",
    folder: "AllOfMe",
    file: "all",
    descTH:
      "โฮมคาเฟ่ที่ต้อนรับคุณด้วยความรัก เหมือนได้กลับมาทานขนมฝีมือคนในครอบครัว",
    descEN:
      "A homey cafe welcoming you with love, serving baked goods that taste just like family recipes.",
  },
  {
    name: "Barakat Lunla Land",
    nameTH: "บารอกัต ลัลลา แลนด์",
    zone: "nongchok",
    folder: "Barakat",
    file: "barakat",
    descTH:
      "พื้นที่ความสุขริมทุ่งนา ลั้นลากับกิจกรรมขี่ม้า ขับรถ ATV และบรรยากาศของครอบครัว",
    descEN:
      "A joyful space by the rice fields offering horseback riding, ATVs, and a fun family atmosphere.",
  },
  {
    name: "Chill Out Farm & Cafe",
    nameTH: "ชิลล์ เอาท์ ฟาร์ม แอนด์ คาเฟ่",
    zone: "nongchok",
    folder: "ChillOut",
    file: "chill",
    descTH:
      "สูดลมหายใจให้เต็มปอดในมินิฟาร์ม สัมผัสวิถีชีวิตที่แสนเรียบง่ายและเป็นกันเอง",
    descEN:
      "Take a deep breath of fresh air at this mini-farm offering a simple, friendly lifestyle.",
  },
  {
    name: "Nine Than Cafe",
    nameTH: "นายท่าน คาเฟ่",
    zone: "nongchok",
    folder: "NineThan",
    file: "nine",
    descTH: "สัมผัสกลิ่นอายเขาใหญ่ใกล้กรุง จิบกาแฟรับลมหนาวกลางทุ่งนากว้าง",
    descEN:
      "Experience a mountain-getaway vibe right near the city, sipping coffee with a cool breeze over vast rice fields.",
  },
  {
    name: "Fairy Tale Cafe",
    nameTH: "แฟรี่ เทล คาเฟ่",
    zone: "nongchok",
    folder: "FairyTale",
    file: "fairy",
    descTH:
      "หลุดเข้าไปในเทพนิยาย กับคาเฟ่สุดน่ารักที่ทำให้คุณรู้สึกเหมือนเป็นเจ้าหญิง",
    descEN:
      "Step into a storybook at this incredibly cute cafe that makes you feel like royalty.",
  },
  {
    name: "Again Please",
    nameTH: "อะเกน พลีส",
    zone: "nongchok",
    folder: "AgainPlease",
    file: "again",
    descTH:
      "จิบมัทฉะแท้ท่ามกลางสวนสวยสไตล์อังกฤษ พื้นที่ลับย่านหนองจอกที่อบอุ่นเหมือนบ้านเพื่อน",
    descEN:
      "Sip authentic matcha in an English garden—a cozy, hidden gem that feels just like a friend's home.",
  },
  {
    name: "Wang Wela Café",
    nameTH: "วางเวลา คาเฟ่",
    zone: "nongchok",
    folder: "WangWela",
    file: "wang",
    descTH:
      "เพราะเวลาคือของขวัญ... มาปล่อยใจให้ไหลไปช้าๆ ในพื้นที่แห่งการพักผ่อน",
    descEN:
      '"Because time is a gift." Let your worries drift away slowly in this ultimate relaxation space.',
  },
  {
    name: "Minna Cafe",
    nameTH: "มินนา คาเฟ่",
    zone: "nongchok",
    folder: "Minna",
    file: "minna",
    descTH:
      "คาเฟ่สไตล์มินิมอลที่น้อยแต่มากด้วยความสุข อบอวลด้วยกลิ่นอายญี่ปุ่น",
    descEN:
      'A Japanese-inspired minimalist cafe where "less is more" brings true everyday happiness.',
  },
  {
    name: "Home Vintage Cafe",
    nameTH: "โฮม วินเทจ คาเฟ่",
    zone: "nongchok",
    folder: "HomeVintage",
    file: "home",
    descTH:
      "ย้อนวันวานไปกับของสะสมสุดคลาสสิก ในบ้านหลังเก่าที่เต็มไปด้วยความทรงจำ",
    descEN:
      "Travel back in time among classic collectibles in an old house full of beautiful memories.",
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
