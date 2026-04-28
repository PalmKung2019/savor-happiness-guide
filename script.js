/* ============================================================
   SAVOR HAPPINESS — CORE SCRIPT
   ============================================================ */

const CONFIG = {
  IMAGE_BASE_PATH: "img/20ResCafe/",
  LOGO_LIGHT: "img/logo/savorhappiness-1.png",
  LOGO_DARK: "img/logo/savorhappiness-2.png",
  AUTO_SLIDE_INTERVAL: 3000,
  SEARCH_DEBOUNCE_MS: 300,
  MAX_SEARCH_RESULTS: 6,
  LIGHTBOX_ZOOM_SCALE: 2.5,
};

function getStorage(key, defaultVal) {
  try {
    return localStorage.getItem(key) || defaultVal;
  } catch (e) {
    return defaultVal;
  }
}
function setStorage(key, val) {
  try {
    localStorage.setItem(key, val);
  } catch (e) {
    console.warn("LocalStorage access denied");
  }
}

const AppState = {
  ui: {
    currentLang: getStorage("preferredLang", "th"),
    isDarkMode: getStorage("theme", "light") === "dark",
  },
  lightbox: {
    isZoomed: false,
    currentGallery: [],
    currentImgIdx: 0,
  },
  autoSlideIntervals: [],
  searchTimeout: null,
};

// ==========================================
// 1. DATA
// ==========================================
const translations = {
  th: {
    "nav-home": "หน้าแรก",
    "nav-book": "หนังสือ",
    "nav-merch": "ของที่ระลึก",
    "nav-highlights": "ร้านแนะนำ",
    "nav-creator": "ผู้จัดทำ",
    "hero-subtitle": "DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS",
    "hero-title": 'FLAVOR <br><span class="highlight">FIRST</span>',
    "hero-vibe": "20 คาเฟ่ลับย่านมีนบุรี-หนองจอก ที่คุณไม่ควรพลาด",
    "hero-desc":
      "ไกด์บุ๊คฉบับสมบูรณ์ที่รวบรวมเสน่ห์ของชานเมือง<br />บันทึกทุกความรู้สึกผ่านงานออกแบบที่ลิ้มรสความสุขได้จริง",
    "btn-start": '<i class="fas fa-book-open"></i> สำรวจไกด์บุ๊ค',
    "btn-view-shop": '<i class="fas fa-map-marker-alt"></i> ดูรายชื่อร้าน',
    "video-desc":
      "สัมผัสความสงบในมุมโปรดที่คุณอาจไม่เคยค้นพบ<br />บันทึกความทรงจำผ่านเลนส์และรสชาติที่ลงตัว",
    "book-title": "THE GUIDEBOOK",
    "book-spec": "รวม 20 คาเฟ่และร้านอาหาร",
    "book-desc":
      "Savor Happiness: ถ่ายทอดเสน่ห์ย่านมีนบุรี–หนองจอก ผ่าน Visual Storytelling ผสมผสานภาพถ่ายบรรยากาศจริงเข้ากับงานกราฟิกสีสันสดใส จัดวางแบบ Dynamic Layout ให้อ่านง่าย พร้อมแผนที่ Postcard ที่พกพาสะดวก",
    "btn-pdf": '<i class="fas fa-book-open"></i> เปิดอ่านตัวอย่าง',
    "merch-postcard-title":
      '<i class="fas fa-map-marked-alt"></i> Postcard Map | โปสการ์ดแผนที่',
    "merch-min-title": "Savor Happiness Sticker set",
    "merch-bookmark-title": "Savor Happiness Bookmarks",
    "btn-more-merch": '<i class="fas fa-images"></i> ของที่ระลึกเพิ่มเติม',
    "zone-minburi": "ย่านมีนบุรี",
    "zone-nongchok": "ย่านหนองจอก",
    "author-title": "ผู้จัดทำ",
    "author-name": "ปรานต์ แถวอินทร์ (Pran Taewin)",
    "author-role": "นักออกแบบกราฟิก | คณะดิจิทัลมีเดีย มหาวิทยาลัยศรีปทุม #67",
    "support-title": '<i class="fas fa-heart"></i> อุดหนุนผลงาน',
    "support-desc":
      "ทุกการสนับสนุนของคุณคือแรงผลักดันสำคัญสำหรับโปรเจกต์จบของเรา<br />ขอบคุณที่ร่วมเดินทางและลิ้มรสความสุขของชานเมืองไปด้วยกันครับ ✨",
    "support-creator": "โดย ปรานต์ แถวอินทร์ (ปาล์ม)",
    "support-qr-hint": "สแกนเพื่อสนับสนุน",
    "filter-all": "ทั้งหมด",
    "filter-min": "ย่านมีนบุรี",
    "filter-nong": "ย่านหนองจอก",
    "modal-btn-guide": '<i class="fas fa-book-open"></i> ดูรูปเต็มในไกด์บุ๊ค',
    "pdf-preview-title": "ทดลองอ่านบางส่วน",
    "footer-desc": "บันทึกความทรงจำผ่านเลนส์<br />ย่านมีนบุรี–หนองจอก",
    "footer-support": '<i class="fas fa-qrcode"></i> อุดหนุนผลงาน',
    "read-more": "อ่านรายละเอียดร้าน",
  },
  en: {
    "nav-home": "Home",
    "nav-book": "Guidebook",
    "nav-merch": "Merchandise",
    "nav-highlights": "Highlights",
    "nav-creator": "Creator",
    "hero-subtitle": "DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS",
    "hero-title": 'FLAVOR <br><span class="highlight">FIRST</span>',
    "hero-vibe": "20 Hidden Cafes in Minburi-Nong Chok You Shouldn't Miss",
    "hero-desc":
      "A complete guidebook gathering the charm of the suburbs.<br />Capturing every feeling through design to truly savor happiness.",
    "btn-start": '<i class="fas fa-book-open"></i> Explore Guidebook',
    "btn-view-shop": '<i class="fas fa-map-marker-alt"></i> View Shops',
    "video-desc":
      "Experience tranquility in your new favorite spot.<br />Capture memories through the lens and perfect flavors.",
    "book-title": "THE GUIDEBOOK",
    "book-spec": "FEATURING 20 CAFES & RESTAURANTS",
    "book-desc":
      "Savor Happiness: Conveying the charm of Minburi-Nong Chok through Visual Storytelling. Combining real atmosphere photography with colorful graphics in a dynamic layout, complete with a handy Postcard map.",
    "btn-pdf": '<i class="fas fa-book-open"></i> Preview Sample',
    "merch-postcard-title":
      '<i class="fas fa-map-marked-alt"></i> Postcard Map',
    "merch-min-title": "Savor Happiness Sticker set",
    "merch-bookmark-title": "Savor Happiness Bookmarks",
    "btn-more-merch": '<i class="fas fa-images"></i> More Merchandise',
    "zone-minburi": "Minburi Zone",
    "zone-nongchok": "Nong Chok Zone",
    "author-title": "Creator",
    "author-name": "Pran Taewin (Palm)",
    "author-role": "Graphic Designer | School of Digital Media, SPU #67",
    "support-title": '<i class="fas fa-heart"></i> Support My Work',
    "support-desc":
      "Every support is a major driving force for my thesis project.<br />Thank you for joining this journey and savoring happiness with us ✨",
    "support-creator": "By Pran Taewin (Palm)",
    "support-qr-hint": "Scan to support",
    "filter-all": "All",
    "filter-min": "Minburi",
    "filter-nong": "Nong Chok",
    "modal-btn-guide": '<i class="fas fa-book-open"></i> View Full Guidebook',
    "pdf-preview-title": "Preview Sample Pages",
    "footer-desc":
      "Capturing memories through the lens<br />in Minburi & Nongchok",
    "footer-support": '<i class="fas fa-qrcode"></i> Support',
    "read-more": "Read Details",
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
      "A seriously cool drip coffee spot serving unexpectedly legendary crispy pork.",
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
      "Leave the chaos behind for relaxing rice field breezes and bold Thai dishes.",
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
      "A refreshing urban forest oasis where cool mist recharges your soul.",
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
    descEN: "Unwind by a wide lagoon in a large, welcoming wooden house.",
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
      "Transport yourself to a riverside campsite for a simple, incredibly chill getaway.",
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
      "Say hi to the fluffy locals in this compact, minimalist cafe filled with homemade treats.",
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
      "Recharge your positive energy in a soothing, white minimalist cafe.",
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
      "Breathe in fresh air, watch ducks, and enjoy bold Thai flavors in a peaceful setting.",
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
      "A homey cafe welcoming you with love, serving treats tasting like family recipes.",
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
      "A joyful space by the rice fields offering horseback riding and ATVs.",
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
      "Take a deep breath of fresh air at this mini-farm offering a simple lifestyle.",
  },
  {
    name: "Nine Than Cafe",
    nameTH: "นายท่าน คาเฟ่",
    zone: "nongchok",
    folder: "NineThan",
    file: "nine",
    descTH: "สัมผัสกลิ่นอายเขาใหญ่ใกล้กรุง จิบกาแฟรับลมหนาวกลางทุ่งนากว้าง",
    descEN: "Experience a mountain-getaway vibe right near the city.",
  },
  {
    name: "Fairy Tale Cafe",
    nameTH: "แฟรี่ เทล คาเฟ่",
    zone: "nongchok",
    folder: "FairyTale",
    file: "fairy",
    descTH:
      "หลุดเข้าไปในเทพนิยาย กับคาเฟ่สุดน่ารักที่ทำให้คุณรู้สึกเหมือนเป็นเจ้าหญิง",
    descEN: "Step into a storybook at this incredibly cute cafe.",
  },
  {
    name: "Again Please",
    nameTH: "อะเกน พลีส",
    zone: "nongchok",
    folder: "AgainPlease",
    file: "again",
    descTH:
      "จิบมัทฉะแท้ท่ามกลางสวนสวยสไตล์อังกฤษ พื้นที่ลับย่านหนองจอกที่อบอุ่นเหมือนบ้านเพื่อน",
    descEN: "Sip authentic matcha in an English garden—a cozy, hidden gem.",
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
      "Let your worries drift away slowly in this ultimate relaxation space.",
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
      "A Japanese-inspired minimalist cafe where 'less is more' brings true happiness.",
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
      "Travel back in time among classic collectibles in an old house full of memories.",
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

// ==========================================
// 2. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(AppState.ui.isDarkMode);
  renderShops(); // Render shop elements first so language can be applied
  applyLanguage(AppState.ui.currentLang); // Apply translation to all elements
  renderTicker();
  setupScrollProgress();
  setupMobileNav();
  setupFilters();
  setupSearch();
  setupModals();

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: "ease-out-cubic",
    });
  }
});

// ==========================================
// 3. CORE LOGIC
// ==========================================
function renderShops() {
  const minList = document.getElementById("minburi-list");
  const nongList = document.getElementById("nongchok-list");
  if (!minList || !nongList) return;

  minList.innerHTML = "";
  nongList.innerHTML = "";

  realShops.forEach((shop, idx) => {
    const firstImg = `<img class="photo-item active" src="${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}0.webp" alt="${shop.name}" data-shop-idx="${idx}" data-img-idx="0" width="600" height="400" loading="lazy" decoding="async" onerror="this.style.display='none';">`;
    const cardHTML = `
      <div class="shop-card fadeInSlideUp" style="animation-delay: ${idx * 0.05}s;">
        <div class="photo-gallery" id="gallery-${idx}" title="คลิกรูปเพื่อดูแบบเต็มจอ">
            ${firstImg}
        </div>
        <div class="shop-info" onclick="openCafeModal(${idx})" title="คลิกเพื่อดูรายละเอียดร้าน">
          <div class="shop-name">${shop.name}</div>
          <div class="shop-tag" data-zone="${shop.zone}">${shop.zone === "minburi" ? "ย่านมีนบุรี" : "ย่านหนองจอก"}</div>
          <div class="click-more-hint"><i class="fas fa-arrow-right"></i> <span class="read-more-text lang-text" data-key="read-more">อ่านรายละเอียดร้าน</span></div>
        </div>
      </div>
    `;
    if (shop.zone === "minburi")
      minList.insertAdjacentHTML("beforeend", cardHTML);
    else nongList.insertAdjacentHTML("beforeend", cardHTML);
  });

  [minList, nongList].forEach((list) => {
    list.addEventListener("click", (e) => {
      if (e.target.classList.contains("photo-item")) {
        const shopIdx = parseInt(e.target.getAttribute("data-shop-idx"));
        const imgIdx = parseInt(e.target.getAttribute("data-img-idx"));
        window.openGalleryLightbox(shopIdx, imgIdx);
      }
    });
  });

  setTimeout(loadRemainingImagesAndSlide, 1000);
}

function loadRemainingImagesAndSlide() {
  realShops.forEach((shop, idx) => {
    const gallery = document.getElementById(`gallery-${idx}`);
    if (!gallery) return;
    let extraImages = "";
    for (let i = 1; i < 8; i++) {
      extraImages += `<img class="photo-item" src="${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}${i}.webp" alt="${shop.name}" data-shop-idx="${idx}" data-img-idx="${i}" width="600" height="400" loading="lazy" decoding="async" onerror="this.style.display='none';">`;
    }
    gallery.insertAdjacentHTML("beforeend", extraImages);
  });
  startAutoSlide();
}

function startAutoSlide() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const gallery = entry.target;
        const items = gallery.querySelectorAll(".photo-item");
        if (items.length <= 1) return;

        if (entry.isIntersecting) {
          let currentIdx = parseInt(gallery.dataset.currentIdx || "0");

          const interval = setInterval(
            () => {
              items[currentIdx].classList.remove("active");
              currentIdx = (currentIdx + 1) % items.length;
              items[currentIdx].classList.add("active");
              gallery.dataset.currentIdx = currentIdx;
            },
            CONFIG.AUTO_SLIDE_INTERVAL + Math.random() * 1000,
          );
          gallery.dataset.intervalId = interval;
        } else {
          if (gallery.dataset.intervalId) {
            clearInterval(gallery.dataset.intervalId);
            gallery.dataset.intervalId = "";
          }
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".photo-gallery").forEach((gallery) => {
    observer.observe(gallery);
  });
}

function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      document.getElementById("minburi-section").style.display =
        filter === "all" || filter === "minburi" ? "block" : "none";
      document.getElementById("nongchok-section").style.display =
        filter === "all" || filter === "nongchok" ? "block" : "none";
      if (typeof AOS !== "undefined") AOS.refresh();
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById("shopSearchInput");
  const searchSuggestions = document.getElementById("searchSuggestions");
  const searchBtn = document.getElementById("searchBtn");
  if (!searchInput || !searchSuggestions) return;

  const performSearch = () => {
    const val = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".shop-card");
    if (val === "") {
      cards.forEach((c) => (c.style.display = ""));
      return;
    }

    let navMatch = NAV_ITEMS.find((item) =>
      item.keywords.some((k) => val.includes(k)),
    );
    let firstFound = null;

    cards.forEach((card) => {
      const name = card.querySelector(".shop-name").innerText.toLowerCase();
      const isMatch =
        name.includes(val) ||
        realShops.some(
          (s) =>
            s.name.toLowerCase() === name &&
            s.nameTH &&
            s.nameTH.toLowerCase().includes(val),
        );
      if (isMatch) {
        card.style.display = "";
        if (!firstFound) firstFound = card;
      } else {
        card.style.display = "none";
      }
    });

    if (navMatch)
      document
        .querySelector(navMatch.target)
        ?.scrollIntoView({ behavior: "smooth" });
    else if (firstFound)
      firstFound.scrollIntoView({ behavior: "smooth", block: "center" });
    searchSuggestions.style.display = "none";
  };

  searchInput.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    if (AppState.searchTimeout) clearTimeout(AppState.searchTimeout);
    if (val === "") {
      searchSuggestions.style.display = "none";
      return;
    }

    AppState.searchTimeout = setTimeout(() => {
      searchSuggestions.innerHTML = "";
      const navMatches = NAV_ITEMS.filter(
        (item) =>
          item.keywords.some((k) => k.includes(val)) ||
          item.name.toLowerCase().includes(val),
      );
      const shopMatches = realShops
        .filter(
          (s) =>
            s.name.toLowerCase().includes(val) ||
            (s.nameTH && s.nameTH.toLowerCase().includes(val)),
        )
        .slice(0, CONFIG.MAX_SEARCH_RESULTS);
      const combined = [...navMatches, ...shopMatches];

      if (combined.length === 0) {
        searchSuggestions.style.display = "none";
        return;
      }

      combined.forEach((item) => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        if (item.target) {
          div.innerHTML = `<i class="fas ${item.icon}"></i> <span><b>เมนู:</b> ${item.name}</span>`;
          div.addEventListener("click", () => {
            document
              .querySelector(item.target)
              ?.scrollIntoView({ behavior: "smooth" });
            searchSuggestions.style.display = "none";
            searchInput.value = "";
          });
        } else {
          div.innerHTML = `<i class="fas fa-search"></i> <span>${item.name} <small>(${item.nameTH})</small></span>`;
          div.addEventListener("click", () => {
            searchInput.value = item.name;
            searchSuggestions.style.display = "none";
            performSearch();
          });
        }
        searchSuggestions.appendChild(div);
      });
      searchSuggestions.style.display = "block";
    }, CONFIG.SEARCH_DEBOUNCE_MS);
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performSearch();
  });
  searchBtn.addEventListener("click", performSearch);
  document.addEventListener("click", (e) => {
    if (
      !searchInput.contains(e.target) &&
      !searchSuggestions.contains(e.target)
    )
      searchSuggestions.style.display = "none";
  });
}

// ==========================================
// 4. MODALS & LIGHTBOXES
// ==========================================
window.openCafeModal = function (idx) {
  const shop = realShops[idx];
  const lang = AppState.ui.currentLang;
  document.getElementById("modalImg").src =
    `${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}0.webp`;

  // บังคับให้ชื่อร้านคงความออริจินัลเสมอ (ห้ามแปล)
  document.getElementById("modalTitle").innerText = shop.name;

  document.getElementById("modalDesc").innerText =
    lang === "th" ? shop.descTH : shop.descEN;
  document.getElementById("cafeModal").style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.openSimpleLightbox = function (src) {
  const lbImg = document.getElementById("lightboxImg");
  lbImg.src = src;
  lbImg.style.transform = "scale(1)";
  document
    .querySelectorAll("#simpleLightbox .nav-btn")
    .forEach((btn) => (btn.style.display = "none"));
  document.getElementById("simpleLightbox").style.display = "flex";
  document.body.style.overflow = "hidden";
  AppState.lightbox.isZoomed = false;
};

window.openGalleryLightbox = function (shopIdx, imgIdx) {
  const shop = realShops[shopIdx];
  AppState.lightbox.currentGallery = Array.from(
    { length: 8 },
    (_, i) => `${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}${i}.webp`,
  );
  AppState.lightbox.currentImgIdx = imgIdx;
  const lbImg = document.getElementById("lightboxImg");
  lbImg.src = AppState.lightbox.currentGallery[imgIdx];
  lbImg.style.transform = "scale(1)";
  document
    .querySelectorAll("#simpleLightbox .nav-btn")
    .forEach((btn) => (btn.style.display = "flex"));
  document.getElementById("simpleLightbox").style.display = "flex";
  document.body.style.overflow = "hidden";
  AppState.lightbox.isZoomed = false;
};

window.changeImg = function (dir) {
  if (AppState.lightbox.currentGallery.length > 0) {
    AppState.lightbox.currentImgIdx =
      (AppState.lightbox.currentImgIdx +
        dir +
        AppState.lightbox.currentGallery.length) %
      AppState.lightbox.currentGallery.length;
    document.getElementById("lightboxImg").src =
      AppState.lightbox.currentGallery[AppState.lightbox.currentImgIdx];
  }
};

function setupModals() {
  document.getElementById("closeCafeModal").addEventListener("click", () => {
    document.getElementById("cafeModal").style.display = "none";
    document.body.style.overflow = "";
  });
  document.getElementById("closePdfModal").addEventListener("click", () => {
    document.getElementById("pdfModal").style.display = "none";
    document.body.style.overflow = "";
  });
  document.getElementById("closeLightboxBtn").addEventListener("click", () => {
    document.getElementById("simpleLightbox").style.display = "none";
    document.body.style.overflow = "";
  });
  document.getElementById("previewBtn").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("pdfModal").style.display = "flex";
    document.body.style.overflow = "hidden";
  });
  window.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal-overlay") ||
      e.target.classList.contains("lightbox-overlay")
    ) {
      e.target.style.display = "none";
      document.body.style.overflow = "";
    }
  });
  const lbImg = document.getElementById("lightboxImg");
  lbImg.addEventListener("click", (e) => {
    e.stopPropagation();
    AppState.lightbox.isZoomed = !AppState.lightbox.isZoomed;
    lbImg.style.transform = AppState.lightbox.isZoomed
      ? `scale(${CONFIG.LIGHTBOX_ZOOM_SCALE})`
      : "scale(1)";
    lbImg.style.cursor = AppState.lightbox.isZoomed ? "zoom-out" : "zoom-in";
  });
}

window.changeBookView = function (src, element) {
  const mainImg = document.getElementById("mainBookImg");
  mainImg.style.opacity = "0";
  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.opacity = "1";
  }, 200);
  document
    .querySelectorAll(".thumb-item")
    .forEach((t) => t.classList.remove("active"));
  element.classList.add("active");
};

window.changeBookSlide = function (dir) {
  const thumbs = Array.from(document.querySelectorAll(".thumb-item"));
  const activeIdx = thumbs.findIndex((t) => t.classList.contains("active"));
  if (activeIdx !== -1) {
    let nextIdx = (activeIdx + dir + thumbs.length) % thumbs.length;
    thumbs[nextIdx].click();
  }
};

// ==========================================
// 5. UTILITIES
// ==========================================
window.toggleTheme = function () {
  AppState.ui.isDarkMode = !AppState.ui.isDarkMode;
  setStorage("theme", AppState.ui.isDarkMode ? "dark" : "light");
  applyTheme(AppState.ui.isDarkMode);
};

function applyTheme(isDark) {
  const logo = document.getElementById("mainLogo");
  if (isDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    if (logo) logo.src = CONFIG.LOGO_DARK;
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (logo) logo.src = CONFIG.LOGO_LIGHT;
  }
  document
    .querySelectorAll(".theme-btn")
    .forEach((btn) => (btn.innerText = isDark ? "DARK" : "LIGHT"));
}

window.toggleLang = function () {
  AppState.ui.currentLang = AppState.ui.currentLang === "th" ? "en" : "th";
  setStorage("preferredLang", AppState.ui.currentLang);
  applyLanguage(AppState.ui.currentLang);
};

function applyLanguage(lang) {
  document.querySelectorAll(".lang-text").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[lang] && translations[lang][key])
      el.innerHTML = translations[lang][key];
  });
  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => (btn.innerText = lang.toUpperCase()));
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (filterBtns.length >= 3) {
    filterBtns[0].innerText = translations[lang]["filter-all"];
    filterBtns[1].innerText = translations[lang]["filter-min"];
    filterBtns[2].innerText = translations[lang]["filter-nong"];
  }
  document.querySelectorAll(".shop-tag").forEach((tag) => {
    const zone = tag.getAttribute("data-zone");
    tag.innerText =
      zone === "minburi"
        ? translations[lang]["zone-minburi"]
        : translations[lang]["zone-nongchok"];
  });
  const searchInput = document.getElementById("shopSearchInput");
  if (searchInput)
    searchInput.placeholder =
      lang === "th" ? "ค้นหาร้านค้าที่นี่..." : "Search shops here...";
}

function renderTicker() {
  const html = realShops
    .map(
      (s) =>
        `<div class="ticker-item"><i class="fas fa-star" style="color: var(--ci-yellow); margin-right: 8px;"></i>${s.name}</div><div class="ticker-sep">SAVOR HAPPINESS 🍴</div>`,
    )
    .join("");
  document.getElementById("shopTickerInner").innerHTML = html;
  document.getElementById("shopTickerInnerDup").innerHTML = html;
}

function setupScrollProgress() {
  window.addEventListener(
    "scroll",
    () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      document.getElementById("myBar").style.width =
        (winScroll / height) * 100 + "%";
    },
    { passive: true },
  );
}

function setupMobileNav() {
  const ham = document.getElementById("hamburgerBtn"),
    nav = document.getElementById("navLinks"),
    close = document.getElementById("navCloseBtn"),
    drop = document.getElementById("navBackdrop");
  const toggle = (show) => {
    nav.classList.toggle("active", show);
    drop.classList.toggle("active", show);
    document.body.style.overflow = show ? "hidden" : "";
  };
  ham.addEventListener("click", () => toggle(true));
  close.addEventListener("click", () => toggle(false));
  drop.addEventListener("click", () => toggle(false));
  document
    .querySelectorAll(".nav-links a")
    .forEach((a) => a.addEventListener("click", () => toggle(false)));
}

window.toggleSpeedDial = function () {
  const cont = document.getElementById("speedDialContainer");
  const btn = document.querySelector(".speed-dial-main-btn");
  cont.classList.toggle("active");
  btn.classList.toggle("active");
};

window.copyContact = function () {
  navigator.clipboard.writeText("097-946-5925").then(() => {
    const btn = document.querySelector(".copy-btn");
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => (btn.innerHTML = orig), 2000);
  });
};

const video = document.getElementById("myVideo"),
  muteBtn = document.getElementById("muteBtn"),
  muteIcon = document.getElementById("muteIcon");
if (muteBtn && video) {
  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteIcon.className = video.muted
      ? "fas fa-volume-mute"
      : "fas fa-volume-up";
  });
}

document.querySelectorAll("img").forEach((img) => {
  img.setAttribute("draggable", false);
  img.oncontextmenu = () => false;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "PrintScreen") {
    navigator.clipboard.writeText("");
    alert("ไม่อนุญาตให้แคปภาพลิขสิทธิ์ครับ");
  }
});
