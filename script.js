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
  },
  AppState = {
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
  },
  translations = {
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
  },
  realShops = [
    {
      name: "The Lobby Boy Coffee",
      nameTH: "เดอะ ล็อบบี้ บอย คอฟฟี่",
      zone: "minburi",
      folder: "LobbyBoy",
      file: "lobby",
      descTH:
        "คาเฟ่สายดริปที่เท่จัดแต่จริงใจด้วยหมูกรอบคั่วพริกเกลือระดับตำนาน",
      descEN:
        "A seriously cool drip coffee spot serving up unexpectedly legendary crispy pork with chili and salt.",
    },
    {
      name: "De Wila Cat Hotel & Caf\xe9",
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
      name: "Rim Lagoon Caf\xe9",
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
      name: "Wang Wela Caf\xe9",
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
  ],
  NAV_ITEMS = [
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
  ((e.lbImg = getElement("lightboxImg")),
    (e.lbContainer = getElement("simpleLightbox")),
    (e.searchInput = getElement("shopSearchInput")),
    (e.suggestionBox = getElement("searchSuggestions")),
    (e.hamBtn = getElement("hamburgerBtn")),
    (e.navMenu = getElement("navLinks")),
    (e.logoImg = getElement("mainLogo")),
    (e.themeBtns = getElements(".theme-btn")));
}
function initializeTheme() {
  AppState.ui.isDarkMode && applyDarkTheme();
}
function applyDarkTheme() {
  let { domElements: e } = AppState;
  (document.documentElement.setAttribute("data-theme", "dark"),
    e.logoImg && (e.logoImg.src = CONFIG.LOGO_DARK),
    e.themeBtns.forEach((e) => {
      ((e.innerText = "DARK"), e.classList.add("active-dark"));
    }),
    localStorage.setItem("theme", "dark"),
    (AppState.ui.isDarkMode = !0));
}
function applyLightTheme() {
  let { domElements: e } = AppState;
  (document.documentElement.removeAttribute("data-theme"),
    e.logoImg && (e.logoImg.src = CONFIG.LOGO_LIGHT),
    e.themeBtns.forEach((e) => {
      ((e.innerText = "LIGHT"), e.classList.remove("active-dark"));
    }),
    localStorage.setItem("theme", "light"),
    (AppState.ui.isDarkMode = !1));
}
function applyLanguage(e) {
  getElements("[data-key]").forEach((t) => {
    let a = t.getAttribute("data-key");
    translations[e]?.[a] && (t.innerHTML = translations[e][a]);
  });
  let t = AppState.domElements.searchInput;
  (t &&
    (t.placeholder =
      "th" === e ? "ค้นหาร้านค้าที่นี่..." : "Search shops here..."),
    getElements(".lang-btn").forEach((t) => {
      t.innerText = e.toUpperCase();
    }));
  let a = getElements(".filter-btn");
  (a.length >= 3 &&
    ((a[0].innerText = translations[e]["filter-all"]),
    (a[1].innerText = translations[e]["filter-min"]),
    (a[2].innerText = translations[e]["filter-nong"])),
    getElements(".shop-tag").forEach((t) => {
      let a = "minburi" === t.getAttribute("data-zone");
      t.innerText = translations[e][a ? "zone-minburi" : "zone-nongchok"];
    }));
}
function renderShops() {
  let e = getElement("minburi-list"),
    t = getElement("nongchok-list");
  e &&
    t &&
    ((e.innerHTML = ""),
    (t.innerHTML = ""),
    realShops.forEach((a, n) => {
      let firstImg = `
        <img 
          class="photo-item active" 
          src="${CONFIG.IMAGE_BASE_PATH}${a.folder}/${a.file}0.webp" 
          alt="${a.name} - Photo 1"
          data-shop-idx="${n}"
          data-img-idx="0"
          loading="lazy"
          onerror="this.style.display='none';">
      `;

      let o = `
      <div class="shop-card" data-aos="fade-up">
        <div class="photo-gallery" id="gallery-${n}" title="คลิกเพื่อดูรูปขยาย">
            ${firstImg}
        </div>
        <div class="shop-info shop-info-clickable" onclick="openCafeModal(${n})" title="คลิกเพื่อดูข้อมูลร้าน">
          <div class="shop-name">${a.name}</div>
          <div class="shop-tag" data-zone="${a.zone}"></div>
          <div class="click-more-hint"><i class="fas fa-arrow-right"></i> <span class="read-more-text">อ่านรายละเอียด</span></div>
        </div>
      </div>
    `;
      "minburi" === a.zone
        ? e.insertAdjacentHTML("beforeend", o)
        : t.insertAdjacentHTML("beforeend", o);
    }),
    [e, t].forEach((e) => {
      e.addEventListener("click", (e) => {
        if (e.target.classList.contains("photo-item")) {
          let t = parseInt(e.target.getAttribute("data-shop-idx")),
            a = parseInt(e.target.getAttribute("data-img-idx"));
          window.openSimpleLightbox(a, t);
        }
      });
    }),
    "undefined" != typeof AOS &&
      setTimeout(() => {
        AOS.refresh();
      }, 200),
    setTimeout(() => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadRemainingImagesAndSlide);
      } else {
        setTimeout(loadRemainingImagesAndSlide, 1500);
      }
    }, 500));
}

function loadRemainingImagesAndSlide() {
  realShops.forEach((a, n) => {
    let gallery = document.getElementById(`gallery-${n}`);
    if (!gallery) return;

    let extraImages = "";
    for (let t = 1; t < 8; t++) {
      let imgPath = `${CONFIG.IMAGE_BASE_PATH}${a.folder}/${a.file}${t}.webp`;
      extraImages += `
            <img 
              class="photo-item" 
              src="${imgPath}" 
              alt="${a.name} - Photo ${t + 1}"
              data-shop-idx="${n}"
              data-img-idx="${t}"
              loading="lazy"
              onerror="this.style.display='none';">
            `;
    }
    gallery.insertAdjacentHTML("beforeend", extraImages);
  });

  startAutoSlide();
}

function startAutoSlide() {
  getElements(".photo-gallery").forEach((e) => {
    let t = e.querySelectorAll(".photo-item");
    if (t.length <= 1) return;
    let a = 0,
      n = setInterval(() => {
        (t[a].classList.remove("active"),
          t[(a = (a + 1) % t.length)].classList.add("active"));
      }, CONFIG.AUTO_SLIDE_INTERVAL);
    AppState.autoSlideIntervals.push(n);
  });
}
function renderTicker() {
  let e = getElement("shopTickerInner"),
    t = getElement("shopTickerInnerDup");
  if (!e || !t) return;
  let a = realShops
    .map(
      (e) =>
        `<div class="ticker-item">${e.name}</div><div class="ticker-sep">SAVOR HAPPINESS 🍴</div>`,
    )
    .join("");
  ((e.innerHTML = a), (t.innerHTML = a));
}
function initializeSearch() {
  let { searchInput: e, suggestionBox: t } = AppState.domElements;
  e &&
    (e.addEventListener("input", handleSearchInput),
    e.addEventListener("keydown", (a) => {
      "Enter" === a.key &&
        (executeSearch(), e.blur(), t && (t.style.display = "none"));
    }),
    document.addEventListener("click", (a) => {
      e.contains(a.target) ||
        t?.contains(a.target) ||
        !t ||
        (t.style.display = "none");
    }));
}
function handleSearchInput(e) {
  let { suggestionBox: t } = AppState.domElements,
    a = e.target.value.toLowerCase().trim();
  if ((AppState.searchTimeout && clearTimeout(AppState.searchTimeout), t)) {
    if ("" === a) {
      t.style.display = "none";
      return;
    }
    AppState.searchTimeout = setTimeout(() => {
      displaySearchSuggestions(a);
    }, CONFIG.SEARCH_DEBOUNCE_MS);
  }
}
function displaySearchSuggestions(e) {
  let { suggestionBox: t, searchInput: a } = AppState.domElements;
  t.innerHTML = "";
  let n = NAV_ITEMS.filter(
      (t) =>
        t.keywords.some((t) => t.includes(e)) ||
        t.name.toLowerCase().includes(e),
    ),
    i = realShops
      .filter(
        (t) =>
          t.name.toLowerCase().includes(e) ||
          t.nameTH?.toLowerCase().includes(e),
      )
      .slice(0, CONFIG.MAX_SEARCH_RESULTS),
    o = [...n, ...i];
  if (0 === o.length) {
    t.style.display = "none";
    return;
  }
  (o.forEach((e) => {
    let n = document.createElement("div");
    ((n.className = "suggestion-item"),
      e.target
        ? ((n.innerHTML = `<i class="fas ${e.icon}"></i> <span><b>เมนู:</b> ${e.name}</span>`),
          n.addEventListener("click", () => {
            (document
              .querySelector(e.target)
              ?.scrollIntoView({ behavior: "smooth" }),
              (t.style.display = "none"),
              (a.value = ""));
          }))
        : ((n.innerHTML = `<i class="fas fa-search"></i> <span>${e.name} <small>(${e.nameTH})</small></span>`),
          n.addEventListener("click", () => {
            ((a.value = e.name), (t.style.display = "none"), executeSearch());
          })),
      t.appendChild(n));
  }),
    (t.style.display = "block"));
}
function executeSearch() {
  let { searchInput: e } = AppState.domElements;
  if (!e) return;
  let t = e.value.toLowerCase().trim(),
    a = getElements(".shop-card");
  if ("" === t) {
    a.forEach((e) => {
      ((e.style.display = ""), (e.style.opacity = "1"));
    });
    return;
  }
  let n = NAV_ITEMS.find((e) => e.keywords.some((e) => t.includes(e))),
    i = null;
  (a.forEach((e) => {
    let a = e.querySelector(".shop-name")?.innerText.toLowerCase() || "",
      n =
        a.includes(t) ||
        realShops.some(
          (e) =>
            e.name.toLowerCase() === a && e.nameTH?.toLowerCase().includes(t),
        );
    n
      ? ((e.style.display = ""), (e.style.opacity = "1"), i || (i = e))
      : (e.style.display = "none");
  }),
    n
      ? document.querySelector(n.target)?.scrollIntoView({ behavior: "smooth" })
      : i && i.scrollIntoView({ behavior: "smooth", block: "center" }));
}
function initializeLightbox() {
  let { lbImg: e, lbContainer: t } = AppState.domElements;
  e &&
    t &&
    (e.addEventListener("click", (e) => {
      (e.stopPropagation(), toggleLightboxZoom());
    }),
    e.addEventListener("mousedown", startLightboxDrag),
    e.addEventListener("touchstart", startLightboxDrag, { passive: !1 }),
    window.addEventListener("mousemove", moveLightboxDrag),
    window.addEventListener("touchmove", moveLightboxDrag, { passive: !1 }),
    window.addEventListener("mouseup", stopLightboxDrag),
    window.addEventListener("touchend", stopLightboxDrag));
}
function toggleLightboxZoom() {
  let { lbImg: e } = AppState.domElements,
    { lightbox: t } = AppState;
  ((t.isZoomed = !t.isZoomed),
    t.isZoomed
      ? (e.style.transform = `translate(0px, 0px) scale(${CONFIG.LIGHTBOX_ZOOM_SCALE})`)
      : resetLightboxPosition());
}
function resetLightboxPosition() {
  let { lbImg: e } = AppState.domElements,
    { lightbox: t } = AppState;
  ((t.translateX = 0),
    (t.translateY = 0),
    (t.lastX = 0),
    (t.lastY = 0),
    (e.style.transform = "translate(0px, 0px) scale(1)"));
}
function startLightboxDrag(e) {
  let { lbImg: t } = AppState.domElements,
    { lightbox: a } = AppState;
  if (!a.isZoomed) return;
  ((a.isDragging = !0), (t.style.cursor = "grabbing"));
  let n = e.pageX || (e.touches?.[0].pageX ?? 0),
    i = e.pageY || (e.touches?.[0].pageY ?? 0);
  ((a.startX = n - a.lastX),
    (a.startY = i - a.lastY),
    (t.style.transition = "none"));
}
function moveLightboxDrag(e) {
  let { lbImg: t } = AppState.domElements,
    { lightbox: a } = AppState;
  if (!a.isDragging) return;
  let n = e.pageX || (e.touches?.[0].pageX ?? 0),
    i = e.pageY || (e.touches?.[0].pageY ?? 0);
  ((a.translateX = n - a.startX),
    (a.translateY = i - a.startY),
    (t.style.transform = `translate(${a.translateX}px, ${a.translateY}px) scale(${CONFIG.LIGHTBOX_ZOOM_SCALE})`));
}
function stopLightboxDrag() {
  let { lbImg: e } = AppState.domElements,
    { lightbox: t } = AppState;
  t.isDragging &&
    ((t.isDragging = !1),
    (t.lastX = t.translateX),
    (t.lastY = t.translateY),
    (e.style.cursor = "grab"),
    (e.style.transition = `transform ${CONFIG.TRANSITION_DURATION} ease-out`));
}
function initializeNavigation() {
  let { hamBtn: e, navMenu: t } = AppState.domElements,
    a = getElement("navCloseBtn");
  (e &&
    e.addEventListener("click", (e) => {
      (e.stopPropagation(), openNavMenu());
    }),
    a &&
      a.addEventListener("click", (e) => {
        (e.stopPropagation(), closeNavMenu());
      }),
    document.addEventListener("click", (a) => {
      t &&
        t.classList.contains("active") &&
        !t.contains(a.target) &&
        !e.contains(a.target) &&
        closeNavMenu();
    }),
    t &&
      t.querySelectorAll("a, .lang-btn, .theme-btn").forEach((e) => {
        e.addEventListener("click", closeNavMenu);
      }),
    window.addEventListener("resize", () => {
      window.innerWidth > 1024 && closeNavMenu();
    }));
}
function openNavMenu() {
  let { navMenu: e, hamBtn: t } = AppState.domElements,
    a = getElement("navBackdrop");
  (e && e.classList.add("active"),
    a && a.classList.add("active"),
    t && ((t.style.opacity = "0"), (t.style.pointerEvents = "none")),
    (document.body.style.overflow = "hidden"));
}
function closeNavMenu() {
  let { navMenu: e, hamBtn: t } = AppState.domElements,
    a = getElement("navBackdrop");
  (e && e.classList.remove("active"),
    a && a.classList.remove("active"),
    t && ((t.style.opacity = "1"), (t.style.pointerEvents = "auto")),
    (document.body.style.overflow = ""));
}
function initializeFilters() {
  let e = getElements(".filter-btn");
  e.length > 0 &&
    e.forEach((t) => {
      t.addEventListener("click", () => {
        (e.forEach((e) => e.classList.remove("active")),
          t.classList.add("active"));
        let a = t.getAttribute("data-filter"),
          n = getElement("minburi-section"),
          i = getElement("nongchok-section");
        ("all" === a
          ? ((n.style.display = "block"), (i.style.display = "block"))
          : "minburi" === a
            ? ((n.style.display = "block"), (i.style.display = "none"))
            : ((n.style.display = "none"), (i.style.display = "block")),
          "undefined" != typeof AOS && AOS.refresh());
      });
    });
}
(document.addEventListener("DOMContentLoaded", () => {
  (history.scrollRestoration && (history.scrollRestoration = "manual"),
    window.scrollTo(0, 0),
    cacheDOMElements(),
    initializeTheme(),
    renderShops(),
    renderTicker(),
    applyLanguage(AppState.ui.currentLang),
    initializeLightbox(),
    initializeSearch(),
    initializeNavigation(),
    initializeFilters(),
    window.addEventListener("beforeunload", () => {
      (AppState.autoSlideIntervals.forEach(clearInterval),
        AppState.searchTimeout && clearTimeout(AppState.searchTimeout));
    }));
}),
  (window.toggleTheme = function () {
    AppState.ui.isDarkMode ? applyLightTheme() : applyDarkTheme();
  }),
  (window.toggleLang = function () {
    ((AppState.ui.currentLang = "th" === AppState.ui.currentLang ? "en" : "th"),
      localStorage.setItem("preferredLang", AppState.ui.currentLang),
      applyLanguage(AppState.ui.currentLang));
  }),
  (window.openSimpleLightbox = function (e, t) {
    let { lbImg: a, lbContainer: n } = AppState.domElements,
      { lightbox: i } = AppState;
    if ("string" == typeof e && void 0 === t)
      ((i.currentGallery = [e]), (i.currentImgIdx = 0));
    else {
      let o = realShops[t];
      if (!o) return;
      ((i.currentGallery = Array.from(
        { length: 8 },
        (e, t) => `${CONFIG.IMAGE_BASE_PATH}${o.folder}/${o.file}${t}.webp`,
      )),
        (i.currentImgIdx = e));
    }
    a &&
      n &&
      ((a.src = i.currentGallery[i.currentImgIdx]),
      resetLightboxPosition(),
      (i.isZoomed = !1),
      (n.style.display = "flex"),
      (document.body.style.overflow = "hidden"));
  }),
  (window.closeSimpleLightbox = function () {
    let { lbContainer: e } = AppState.domElements;
    e && ((e.style.display = "none"), (document.body.style.overflow = "auto"));
  }),
  (window.changeImg = function (e) {
    let { lbImg: t } = AppState.domElements,
      { lightbox: a } = AppState;
    a.currentGallery.length &&
      ((a.currentImgIdx =
        (a.currentImgIdx + e + a.currentGallery.length) %
        a.currentGallery.length),
      t && (t.src = a.currentGallery[a.currentImgIdx]));
  }),
  (window.openCafeModal = function (e) {
    let t = realShops[e],
      a = AppState.ui.currentLang,
      n = `${CONFIG.IMAGE_BASE_PATH}${t.folder}/${t.file}0.webp`;
    ((getElement("modalImg").src = n),
      (getElement("modalTitle").innerText = "th" === a ? t.nameTH : t.name),
      (getElement("modalDesc").innerText = "th" === a ? t.descTH : t.descEN));
    let i = document.querySelector("#cafeModal .btn-primary");
    (i && (i.innerHTML = translations[a]["btn-modal-book"]),
      (getElement("cafeModal").style.display = "flex"),
      (document.body.style.overflow = "hidden"));
  }),
  (window.closeModal = function () {
    ((getElement("cafeModal").style.display = "none"),
      (document.body.style.overflow = ""));
  }),
  window.addEventListener("click", (e) => {
    "cafeModal" === e.target.id && window.closeModal();
  }),
  (window.copyContact = function () {
    navigator.clipboard.writeText("palmy1983ch@gmail.com").then(() => {
      let e = document.querySelector(".copy-btn");
      if (e) {
        let t = e.innerHTML;
        ((e.innerHTML = '<i class="fas fa-check"></i>'),
          setTimeout(() => {
            e.innerHTML = t;
          }, CONFIG.THEME_TRANSITION_MS));
      }
    });
  }),
  (window.changeBookView = function (e, t) {
    let a = getElement("mainBookImg");
    a &&
      ((a.src = e),
      getElements(".thumb-item").forEach((e) => e.classList.remove("active")),
      t.classList.add("active"));
  }));
let isScrolling = !1;
window.addEventListener(
  "scroll",
  () => {
    isScrolling ||
      (window.requestAnimationFrame(() => {
        let e = document.body.scrollTop || document.documentElement.scrollTop,
          t =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight,
          a = (e / t) * 100,
          n = getElement("myBar");
        (n && (n.style.width = a + "%"), (isScrolling = !1));
      }),
      (isScrolling = !0));
  },
  { passive: !0 },
);

// ==========================================
// [PERFORMANCE TWEAK] ย้ายจาก index.html
// มารวมไว้ที่นี่เพื่อลด Render-blocking
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. ตรวจสอบว่ามี AOS หรือไม่ แล้ว Init
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 500,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });

    // บังคับให้ส่วนข้อความต่างๆ ที่ไม่มี data-aos ทำอนิเมชั่น
    document.querySelectorAll("h1, h2, h3, img").forEach((el) => {
      if (!el.hasAttribute("data-aos")) {
        el.setAttribute("data-aos", "fade-up");
      }
    });
  }

  // 2. ป้องกันการคลิกขวา ลากรูป
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

// 3. ปุ่มกด Speed Dial
window.toggleSpeedDial = function (e) {
  if (e) e.stopPropagation();
  const dial = document.getElementById("speedDialContainer");
  if (dial) dial.classList.toggle("active");
};

// 4. จัดการคลิกเพื่อซ่อนปุ่ม Speed Dial และปรับเสียง Video
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

// 5. ป้องกันการ Capture หน้าจอและการสั่งปริ้น
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
