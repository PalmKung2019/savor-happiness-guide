const CONFIG = {
  LIGHTBOX_ZOOM_SCALE: 2.5,
  TRANSITION_DURATION: "0.3s",
  AUTO_SLIDE_INTERVAL: 3e3,
  IMAGE_BASE_PATH: "img/20ResCafe/",
  LOGO_LIGHT: "img/logo/savorhappiness-1.png",
  LOGO_DARK: "img/logo/savorhappiness-2.png",
  SEARCH_DEBOUNCE_MS: 300,
  MAX_SEARCH_RESULTS: 6,
  THEME_TRANSITION_MS: 2e3,
};

const AppState = {
  lightbox: {
    isZoomed: !1,
    isDragging: !1,
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
    isDarkMode: "dark" === localStorage.getItem("theme"),
  },
  autoSlideIntervals: [],
  searchTimeout: null,
  domElements: {},
};

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

const realShops = [
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

function getElement(e) {
  return document.getElementById(e);
}
function getElements(e) {
  return document.querySelectorAll(e);
}

function cacheDOMElements() {
  let { domElements: e } = AppState;
  e.lbImg = getElement("lightboxImg");
  e.lbContainer = getElement("simpleLightbox");
  e.searchInput = getElement("shopSearchInput");
  e.suggestionBox = getElement("searchSuggestions");
  e.hamBtn = getElement("hamburgerBtn");
  e.navMenu = getElement("navLinks");
  e.logoImg = getElement("mainLogo");
  e.themeBtns = getElements(".theme-btn");
}

function initializeTheme() {
  AppState.ui.isDarkMode && applyDarkTheme();
}

function applyDarkTheme() {
  let { domElements: e } = AppState;
  document.documentElement.setAttribute("data-theme", "dark");
  e.logoImg && (e.logoImg.src = CONFIG.LOGO_DARK);
  e.themeBtns.forEach((btn) => {
    btn.innerText = "DARK";
    btn.classList.add("active-dark");
  });
  localStorage.setItem("theme", "dark");
  AppState.ui.isDarkMode = !0;
}

function applyLightTheme() {
  let { domElements: e } = AppState;
  document.documentElement.removeAttribute("data-theme");
  e.logoImg && (e.logoImg.src = CONFIG.LOGO_LIGHT);
  e.themeBtns.forEach((btn) => {
    btn.innerText = "LIGHT";
    btn.classList.remove("active-dark");
  });
  localStorage.setItem("theme", "light");
  AppState.ui.isDarkMode = !1;
}

function applyLanguage(e) {
  getElements("[data-key]").forEach((t) => {
    let a = t.getAttribute("data-key");
    translations[e]?.[a] && (t.innerHTML = translations[e][a]);
  });
  let t = AppState.domElements.searchInput;
  if (t) {
    t.placeholder =
      "th" === e ? "ค้นหาร้านค้าที่นี่..." : "Search shops here...";
  }
  getElements(".lang-btn").forEach((btn) => {
    btn.innerText = e.toUpperCase();
  });
  let a = getElements(".filter-btn");
  if (a.length >= 3) {
    a[0].innerText = translations[e]["filter-all"];
    a[1].innerText = translations[e]["filter-min"];
    a[2].innerText = translations[e]["filter-nong"];
  }
  getElements(".shop-tag").forEach((t) => {
    let isMinburi = "minburi" === t.getAttribute("data-zone");
    t.innerText = translations[e][isMinburi ? "zone-minburi" : "zone-nongchok"];
  });
}

function renderShops() {
  let minList = getElement("minburi-list"),
    nongList = getElement("nongchok-list");
  if (!minList || !nongList) return;
  minList.innerHTML = "";
  nongList.innerHTML = "";

  realShops.forEach((shop, idx) => {
    let firstImg = `
      <img class="photo-item active" 
           src="${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}0.webp" 
           alt="${shop.name} - Photo 1"
           data-shop-idx="${idx}"
           data-img-idx="0"
           loading="lazy"
           onerror="this.style.display='none';">`;

    let cardHTML = `
      <div class="shop-card" data-aos="fade-up">
        <div class="photo-gallery" id="gallery-${idx}" title="คลิกเพื่อดูรูปขยาย">
            ${firstImg}
        </div>
        <div class="shop-info shop-info-clickable" onclick="openCafeModal(${idx})" title="คลิกเพื่อดูข้อมูลร้าน">
          <div class="shop-name">${shop.name}</div>
          <div class="shop-tag" data-zone="${shop.zone}"></div>
          <div class="click-more-hint"><i class="fas fa-arrow-right"></i> <span class="read-more-text">อ่านรายละเอียด</span></div>
        </div>
      </div>`;

    "minburi" === shop.zone
      ? minList.insertAdjacentHTML("beforeend", cardHTML)
      : nongList.insertAdjacentHTML("beforeend", cardHTML);
  });

  [minList, nongList].forEach((list) => {
    list.addEventListener("click", (e) => {
      if (e.target.classList.contains("photo-item")) {
        let shopIdx = parseInt(e.target.getAttribute("data-shop-idx"));
        let imgIdx = parseInt(e.target.getAttribute("data-img-idx"));
        window.openSimpleLightbox(imgIdx, shopIdx);
      }
    });
  });

  if (typeof AOS !== "undefined") {
    setTimeout(() => {
      AOS.refresh();
    }, 200);
  }

  setTimeout(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadRemainingImagesAndSlide);
    } else {
      setTimeout(loadRemainingImagesAndSlide, 1500);
    }
  }, 500);
}

function loadRemainingImagesAndSlide() {
  realShops.forEach((shop, idx) => {
    let gallery = document.getElementById(`gallery-${idx}`);
    if (!gallery) return;
    let extraImages = "";
    for (let i = 1; i < 8; i++) {
      let imgPath = `${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}${i}.webp`;
      extraImages += `
        <img class="photo-item" 
             src="${imgPath}" 
             alt="${shop.name} - Photo ${i + 1}"
             data-shop-idx="${idx}"
             data-img-idx="${i}"
             loading="lazy"
             onerror="this.style.display='none';">`;
    }
    gallery.insertAdjacentHTML("beforeend", extraImages);
  });
  startAutoSlide();
}

function startAutoSlide() {
  getElements(".photo-gallery").forEach((gallery) => {
    let items = gallery.querySelectorAll(".photo-item");
    if (items.length <= 1) return;
    let currentIdx = 0;
    let interval = setInterval(() => {
      items[currentIdx].classList.remove("active");
      currentIdx = (currentIdx + 1) % items.length;
      items[currentIdx].classList.add("active");
    }, CONFIG.AUTO_SLIDE_INTERVAL);
    AppState.autoSlideIntervals.push(interval);
  });
}

function renderTicker() {
  let inner1 = getElement("shopTickerInner"),
    inner2 = getElement("shopTickerInnerDup");
  if (!inner1 || !inner2) return;
  let html = realShops
    .map(
      (s) =>
        `<div class="ticker-item">${s.name}</div><div class="ticker-sep">SAVOR HAPPINESS 🍴</div>`,
    )
    .join("");
  inner1.innerHTML = html;
  inner2.innerHTML = html;
}

function initializeSearch() {
  let { searchInput: e, suggestionBox: t } = AppState.domElements;
  if (!e) return;
  e.addEventListener("input", handleSearchInput);
  e.addEventListener("keydown", (a) => {
    if ("Enter" === a.key) {
      executeSearch();
      e.blur();
      if (t) t.style.display = "none";
    }
  });
  document.addEventListener("click", (a) => {
    if (!e.contains(a.target) && t && !t.contains(a.target)) {
      t.style.display = "none";
    }
  });
}

function handleSearchInput(e) {
  let { suggestionBox: t } = AppState.domElements;
  let val = e.target.value.toLowerCase().trim();
  if (AppState.searchTimeout) clearTimeout(AppState.searchTimeout);
  if (t) {
    if ("" === val) {
      t.style.display = "none";
      return;
    }
    AppState.searchTimeout = setTimeout(() => {
      displaySearchSuggestions(val);
    }, CONFIG.SEARCH_DEBOUNCE_MS);
  }
}

function displaySearchSuggestions(val) {
  let { suggestionBox: t, searchInput: a } = AppState.domElements;
  t.innerHTML = "";
  let navMatches = NAV_ITEMS.filter(
    (item) =>
      item.keywords.some((k) => k.includes(val)) ||
      item.name.toLowerCase().includes(val),
  );
  let shopMatches = realShops
    .filter(
      (s) =>
        s.name.toLowerCase().includes(val) ||
        s.nameTH?.toLowerCase().includes(val),
    )
    .slice(0, CONFIG.MAX_SEARCH_RESULTS);
  let combined = [...navMatches, ...shopMatches];

  if (combined.length === 0) {
    t.style.display = "none";
    return;
  }

  combined.forEach((item) => {
    let div = document.createElement("div");
    div.className = "suggestion-item";
    if (item.target) {
      div.innerHTML = `<i class="fas ${item.icon}"></i> <span><b>เมนู:</b> ${item.name}</span>`;
      div.addEventListener("click", () => {
        document
          .querySelector(item.target)
          ?.scrollIntoView({ behavior: "smooth" });
        t.style.display = "none";
        a.value = "";
      });
    } else {
      div.innerHTML = `<i class="fas fa-search"></i> <span>${item.name} <small>(${item.nameTH})</small></span>`;
      div.addEventListener("click", () => {
        a.value = item.name;
        t.style.display = "none";
        executeSearch();
      });
    }
    t.appendChild(div);
  });
  t.style.display = "block";
}

function executeSearch() {
  let { searchInput: e } = AppState.domElements;
  if (!e) return;
  let val = e.value.toLowerCase().trim();
  let cards = getElements(".shop-card");

  if ("" === val) {
    cards.forEach((c) => {
      c.style.display = "";
      c.style.opacity = "1";
    });
    return;
  }

  let navMatch = NAV_ITEMS.find((item) =>
    item.keywords.some((k) => val.includes(k)),
  );
  let firstFound = null;

  cards.forEach((card) => {
    let nameEl = card.querySelector(".shop-name");
    let name = nameEl ? nameEl.innerText.toLowerCase() : "";
    let isMatch =
      name.includes(val) ||
      realShops.some(
        (s) =>
          s.name.toLowerCase() === name &&
          s.nameTH?.toLowerCase().includes(val),
      );
    if (isMatch) {
      card.style.display = "";
      card.style.opacity = "1";
      if (!firstFound) firstFound = card;
    } else {
      card.style.display = "none";
    }
  });

  if (navMatch) {
    document
      .querySelector(navMatch.target)
      ?.scrollIntoView({ behavior: "smooth" });
  } else if (firstFound) {
    firstFound.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function initializeLightbox() {
  let { lbImg: e, lbContainer: t } = AppState.domElements;
  if (!e || !t) return;
  e.addEventListener("click", (evt) => {
    evt.stopPropagation();
    toggleLightboxZoom();
  });
  e.addEventListener("mousedown", startLightboxDrag);
  e.addEventListener("touchstart", startLightboxDrag, { passive: !1 });
  window.addEventListener("mousemove", moveLightboxDrag);
  window.addEventListener("touchmove", moveLightboxDrag, { passive: !1 });
  window.addEventListener("mouseup", stopLightboxDrag);
  window.addEventListener("touchend", stopLightboxDrag);
}

function toggleLightboxZoom() {
  let { lbImg: e } = AppState.domElements;
  let t = AppState.lightbox;
  t.isZoomed = !t.isZoomed;
  if (t.isZoomed) {
    e.style.transform = `translate(0px, 0px) scale(${CONFIG.LIGHTBOX_ZOOM_SCALE})`;
  } else {
    resetLightboxPosition();
  }
}

function resetLightboxPosition() {
  let { lbImg: e } = AppState.domElements;
  let t = AppState.lightbox;
  t.translateX = 0;
  t.translateY = 0;
  t.lastX = 0;
  t.lastY = 0;
  e.style.transform = "translate(0px, 0px) scale(1)";
}

function startLightboxDrag(e) {
  let { lbImg: t } = AppState.domElements;
  let a = AppState.lightbox;
  if (!a.isZoomed) return;
  a.isDragging = !0;
  t.style.cursor = "grabbing";
  let n = e.pageX || (e.touches?.[0].pageX ?? 0);
  let i = e.pageY || (e.touches?.[0].pageY ?? 0);
  a.startX = n - a.lastX;
  a.startY = i - a.lastY;
  t.style.transition = "none";
}

function moveLightboxDrag(e) {
  let { lbImg: t } = AppState.domElements;
  let a = AppState.lightbox;
  if (!a.isDragging) return;
  let n = e.pageX || (e.touches?.[0].pageX ?? 0);
  let i = e.pageY || (e.touches?.[0].pageY ?? 0);
  a.translateX = n - a.startX;
  a.translateY = i - a.startY;
  t.style.transform = `translate(${a.translateX}px, ${a.translateY}px) scale(${CONFIG.LIGHTBOX_ZOOM_SCALE})`;
}

function stopLightboxDrag() {
  let { lbImg: e } = AppState.domElements;
  let t = AppState.lightbox;
  if (t.isDragging) {
    t.isDragging = !1;
    t.lastX = t.translateX;
    t.lastY = t.translateY;
    e.style.cursor = "grab";
    e.style.transition = `transform ${CONFIG.TRANSITION_DURATION} ease-out`;
  }
}

function initializeNavigation() {
  let { hamBtn: e, navMenu: t } = AppState.domElements;
  let a = getElement("navCloseBtn");
  if (e) {
    e.addEventListener("click", (evt) => {
      evt.stopPropagation();
      openNavMenu();
    });
  }
  if (a) {
    a.addEventListener("click", (evt) => {
      evt.stopPropagation();
      closeNavMenu();
    });
  }
  document.addEventListener("click", (evt) => {
    if (
      t &&
      t.classList.contains("active") &&
      !t.contains(evt.target) &&
      !e.contains(evt.target)
    ) {
      closeNavMenu();
    }
  });
  if (t) {
    t.querySelectorAll("a, .lang-btn, .theme-btn").forEach((btn) => {
      btn.addEventListener("click", closeNavMenu);
    });
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeNavMenu();
  });
}

function openNavMenu() {
  let { navMenu: e, hamBtn: t } = AppState.domElements;
  let a = getElement("navBackdrop");
  if (e) e.classList.add("active");
  if (a) a.classList.add("active");
  if (t) {
    t.style.opacity = "0";
    t.style.pointerEvents = "none";
  }
  // [LOCK SCROLL] ล็อกหน้าเว็บตอนเปิดเมนูมือถือ
  document.body.style.overflow = "hidden";
}

function closeNavMenu() {
  let { navMenu: e, hamBtn: t } = AppState.domElements;
  let a = getElement("navBackdrop");
  if (e) e.classList.remove("active");
  if (a) a.classList.remove("active");
  if (t) {
    t.style.opacity = "1";
    t.style.pointerEvents = "auto";
  }
  // [UNLOCK SCROLL] ปลดล็อกหน้าเว็บ
  document.body.style.overflow = "";
}

function initializeFilters() {
  let btns = getElements(".filter-btn");
  if (btns.length > 0) {
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        let filter = btn.getAttribute("data-filter");
        let minSection = getElement("minburi-section");
        let nongSection = getElement("nongchok-section");
        if ("all" === filter) {
          minSection.style.display = "block";
          nongSection.style.display = "block";
        } else if ("minburi" === filter) {
          minSection.style.display = "block";
          nongSection.style.display = "none";
        } else {
          minSection.style.display = "none";
          nongSection.style.display = "block";
        }
        if (typeof AOS !== "undefined") AOS.refresh();
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  cacheDOMElements();
  initializeTheme();
  renderShops();
  renderTicker();
  applyLanguage(AppState.ui.currentLang);
  initializeLightbox();
  initializeSearch();
  initializeNavigation();
  initializeFilters();

  window.addEventListener("beforeunload", () => {
    AppState.autoSlideIntervals.forEach(clearInterval);
    if (AppState.searchTimeout) clearTimeout(AppState.searchTimeout);
  });
});

window.toggleTheme = function () {
  AppState.ui.isDarkMode ? applyLightTheme() : applyDarkTheme();
};

window.toggleLang = function () {
  AppState.ui.currentLang = "th" === AppState.ui.currentLang ? "en" : "th";
  localStorage.setItem("preferredLang", AppState.ui.currentLang);
  applyLanguage(AppState.ui.currentLang);
};

// ==========================================
// ควบคุม Modal ทั่วไป (Global Functions)
// ==========================================

window.openSimpleLightbox = function (e, t) {
  let { lbImg: a, lbContainer: n } = AppState.domElements;
  let { lightbox: i } = AppState;

  if ("string" == typeof e && void 0 === t) {
    i.currentGallery = [e];
    i.currentImgIdx = 0;
  } else {
    let o = realShops[t];
    if (!o) return;
    i.currentGallery = Array.from(
      { length: 8 },
      (_, idx) => `${CONFIG.IMAGE_BASE_PATH}${o.folder}/${o.file}${idx}.webp`,
    );
    i.currentImgIdx = e;
  }

  if (a && n) {
    a.src = i.currentGallery[i.currentImgIdx];
    resetLightboxPosition();
    i.isZoomed = !1;
    n.style.display = "flex";
    // [LOCK SCROLL] ล็อกหน้าเว็บตอนเปิด Lightbox รูปภาพ
    document.body.style.overflow = "hidden";
  }
};

window.closeSimpleLightbox = function () {
  let { lbContainer: e } = AppState.domElements;
  if (e) {
    e.style.display = "none";
    // [UNLOCK SCROLL] ปลดล็อกหน้าเว็บตอนปิด Lightbox
    document.body.style.overflow = "";
  }
};

window.changeImg = function (e) {
  let { lbImg: t } = AppState.domElements;
  let a = AppState.lightbox;
  if (a.currentGallery.length) {
    a.currentImgIdx =
      (a.currentImgIdx + e + a.currentGallery.length) % a.currentGallery.length;
    if (t) t.src = a.currentGallery[a.currentImgIdx];
  }
};

window.openCafeModal = function (e) {
  let t = realShops[e];
  let lang = AppState.ui.currentLang;
  let imgSrc = `${CONFIG.IMAGE_BASE_PATH}${t.folder}/${t.file}0.webp`;

  getElement("modalImg").src = imgSrc;
  getElement("modalTitle").innerText = "th" === lang ? t.nameTH : t.name;
  getElement("modalDesc").innerText = "th" === lang ? t.descTH : t.descEN;

  let btn = document.querySelector("#cafeModal .btn-primary");
  if (btn) btn.innerHTML = translations[lang]["btn-modal-book"];

  getElement("cafeModal").style.display = "flex";
  // [LOCK SCROLL] ล็อกหน้าเว็บตอนเปิด Modal คาเฟ่
  document.body.style.overflow = "hidden";
};

window.closeModal = function () {
  getElement("cafeModal").style.display = "none";
  // [UNLOCK SCROLL] ปลดล็อกหน้าเว็บตอนปิด Modal คาเฟ่
  document.body.style.overflow = "";
};

window.addEventListener("click", (e) => {
  if (e.target.id === "cafeModal") {
    window.closeModal();
  }
});

window.copyContact = function () {
  navigator.clipboard.writeText("palmy1983ch@gmail.com").then(() => {
    let btn = document.querySelector(".copy-btn");
    if (btn) {
      let originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, CONFIG.THEME_TRANSITION_MS);
    }
  });
};

window.changeBookView = function (e, t) {
  let mainImg = getElement("mainBookImg");
  if (mainImg) {
    mainImg.src = e;
    getElements(".thumb-item").forEach((thumb) =>
      thumb.classList.remove("active"),
    );
    t.classList.add("active");
  }
};

let isScrolling = !1;
window.addEventListener(
  "scroll",
  () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        let scrollPos =
          document.body.scrollTop || document.documentElement.scrollTop;
        let totalHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        let percent = (scrollPos / totalHeight) * 100;
        let bar = getElement("myBar");
        if (bar) bar.style.width = percent + "%";
        isScrolling = !1;
      });
      isScrolling = !0;
    }
  },
  { passive: !0 },
);

// ==========================================
// [PERFORMANCE TWEAK] ระบบเสริมต่างๆ
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 500,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });

    document.querySelectorAll("h1, h2, h3, img").forEach((el) => {
      if (!el.hasAttribute("data-aos")) {
        el.setAttribute("data-aos", "fade-up");
      }
    });
  }

  const allImages = document.getElementsByTagName("img");
  for (let i = 0; i < allImages.length; i++) {
    allImages[i].setAttribute("draggable", "false");
    allImages[i].oncontextmenu = function () {
      return false;
    };
    allImages[i].ondragstart = function () {
      return false;
    };
  }
});

window.toggleSpeedDial = function (e) {
  if (e) e.stopPropagation();
  const dial = document.getElementById("speedDialContainer");
  if (dial) dial.classList.toggle("active");
};

document.addEventListener("click", function (e) {
  const dial = document.getElementById("speedDialContainer");
  const muteBtn = document.getElementById("muteBtn");
  const video = document.getElementById("myVideo");

  if (muteBtn && muteBtn.contains(e.target) && video) {
    const muteIcon = muteBtn.querySelector("i");
    video.muted = !video.muted;
    muteIcon.classList.toggle("fa-volume-mute", video.muted);
    muteIcon.classList.toggle("fa-volume-up", !video.muted);
  }

  if (dial && dial.classList.contains("active") && !dial.contains(e.target)) {
    dial.classList.remove("active");
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "PrintScreen") {
    navigator.clipboard.writeText("ไม่อนุญาตให้แคปภาพลิขสิทธิ์ครับ");
    alert("ระบบความปลอดภัย: ตรวจพบการแคปหน้าจอ เนื้อหาถูกล็อค");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "p") {
    alert("ไม่อนุญาตให้สั่งพิมพ์หน้าเว็บนี้ครับ");
    e.preventDefault();
  }
});

// ==========================================
// Script สำหรับเปิด-ปิด PDF Popup Modal
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const previewBtn = document.getElementById("previewBtn");
  const pdfModal = document.getElementById("pdfModal");
  // เปลี่ยนชื่อตัวแปรกันซ้ำกับฟังก์ชัน closeModal()
  const btnClosePdf = document.getElementById("closeModal");

  if (previewBtn && pdfModal) {
    previewBtn.addEventListener("click", (e) => {
      e.preventDefault();
      pdfModal.style.display = "flex";
      // [LOCK SCROLL] ล็อกหน้าเว็บตอนเปิด PDF
      document.body.style.overflow = "hidden";
    });
  }

  if (btnClosePdf) {
    btnClosePdf.addEventListener("click", () => {
      pdfModal.style.display = "none";
      // [UNLOCK SCROLL] ปลดล็อกหน้าเว็บตอนปิด PDF
      document.body.style.overflow = "";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === pdfModal) {
      pdfModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});
