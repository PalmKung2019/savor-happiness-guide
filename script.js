/* ============================================================
   SAVOR HAPPINESS — CORE SCRIPT (PERFORMANCE OPTIMIZED)
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
    // NAV
    "nav-home": "หน้าแรก",
    "nav-book": "ไกด์บุ๊ค",
    "nav-merch": "ของที่ระลึก",
    "nav-highlights": "ร้านแนะนำ",
    "nav-creator": "ผู้จัดทำ",

    // HERO
    "hero-thesis-tag": "นิทรรศการวิทยานิพนธ์ | การออกแบบกราฟิก",
    "hero-title": 'FLAVOR <br><span class="highlight">FIRST</span>',
    "hero-vibe": "20 คาเฟ่และร้านอาหารลับ ย่านมีนบุรี–หนองจอก ที่คุณไม่ควรพลาด",
    "hero-desc":
      "ไกด์บุ๊คฉบับสมบูรณ์ที่รวบรวมเสน่ห์ชานเมือง<br />บันทึกทุกความรู้สึกผ่านงานออกแบบที่ลิ้มรสความสุขได้จริง",
    "btn-start": '<i class="fas fa-book-open"></i> สำรวจไกด์บุ๊ค',
    "btn-view-shop": '<i class="fas fa-map-marker-alt"></i> ดูรายชื่อร้าน',

    // VIDEO SECTION
    "video-tag": "บรรยากาศ",
    "video-title": "สัมผัสความสงบ",
    "video-desc":
      "ค้นพบมุมโปรดที่คุณอาจไม่เคยรู้จัก<br />บันทึกความทรงจำผ่านเลนส์และรสชาติที่ลงตัว",

    // BOOK SECTION
    "book-title": "ไกด์บุ๊ค",
    "book-badge-size": "สมุดภาพขนาด A5",
    "book-badge-pages": "126 หน้า",
    "book-badge-district": "มีนบุรี & หนองจอก",
    "book-spec": "รวม 20 คาเฟ่และร้านอาหาร",
    "book-desc":
      "Savor Happiness ถ่ายทอดเสน่ห์ย่านมีนบุรี–หนองจอก ผ่าน Visual Storytelling ผสมผสานภาพถ่ายบรรยากาศจริงเข้ากับงานกราฟิกสีสันสดใส จัดวางแบบ Dynamic Layout ให้อ่านง่าย พร้อมแผนที่โปสการ์ดที่พกพาสะดวก",
    "btn-pdf": '<i class="fas fa-book-open"></i> เปิดอ่านตัวอย่าง',

    // MERCH SECTION
    "scroll-hint":
      '<i class="fas fa-arrows-alt-h"></i> ปัดซ้าย–ขวา เพื่อดูเพิ่มเติม',
    "merch-postcard-minburi": "โปสการ์ดแผนที่ มีนบุรี",
    "merch-postcard-nongchok": "โปสการ์ดแผนที่ หนองจอก",
    "merch-sticker": "สติ๊กเกอร์ตัดรูป",
    "merch-bookmarks": "ที่คั่นหนังสือพิเศษ",
    "merch-fashion": "เสื้อและกระเป๋าคอลเลกชัน",
    "merch-mug": "แก้วมัค Savor Happiness",
    "merch-full": "คอลเลกชันทั้งหมด",

    // HIGHLIGHTS SECTION
    "district-minburi": "มีนบุรี",
    "district-nongchok": "หนองจอก",
    "zone-minburi": "ย่านมีนบุรี",
    "zone-nongchok": "ย่านหนองจอก",
    "filter-all": "ทั้งหมด",
    "filter-min": "ย่านมีนบุรี",
    "filter-nong": "ย่านหนองจอก",
    "read-more": "อ่านรายละเอียด",

    // AUTHOR SECTION
    "author-title": "ผู้จัดทำ",
    "author-name": "ปรานต์ แถวอินทร์ (Pran Taewin)",
    "author-role": "นักออกแบบกราฟิก | คณะดิจิทัลมีเดีย มหาวิทยาลัยศรีปทุม #67",
    "support-title": '<i class="fas fa-heart"></i> อุดหนุนผลงาน',
    "support-sub": "โปรเจกต์วิทยานิพนธ์ Savor Happiness",
    "support-desc":
      "ทุกการสนับสนุนคือแรงผลักดันสำคัญสำหรับโปรเจกต์จบของเรา<br />ขอบคุณที่ร่วมเดินทางและลิ้มรสความสุขไปด้วยกันครับ ✨",
    "support-creator": "โดย ปรานต์ แถวอินทร์ (ปาล์ม)",
    "support-qr-hint": "สแกนเพื่อสนับสนุน",

    // MODALS
    "modal-btn-guide": '<i class="fas fa-book-open"></i> ดูรูปเต็มในไกด์บุ๊ค',
    "modal-btn-map": '<i class="fas fa-map-marker-alt"></i> แผนที่ Google Maps',
    "pdf-preview-title": "ทดลองอ่านบางส่วน",

    // FOOTER
    "footer-tagline": "DIGITAL MEDIA · GRAPHIC DESIGN · SPU THESIS",
    "footer-nav-title": "เมนู",
    "footer-nav-book": "ไกด์บุ๊ค",
    "footer-connect-title": "ติดต่อ",
    "footer-desc": "บันทึกความทรงจำผ่านเลนส์<br />ย่านมีนบุรี–หนองจอก",
    "footer-support": '<i class="fas fa-qrcode"></i> อุดหนุนผลงาน',
    "footer-copyright":
      "©2026 SAVOR HAPPINESS | ขอบคุณที่เป็นส่วนหนึ่งของเรื่องราวนี้",

    // MISC
    "merch-postcard-title":
      '<i class="fas fa-map-marked-alt"></i> Postcard Map | โปสการ์ดแผนที่',
    "merch-min-title": "Savor Happiness Sticker set",
    "merch-bookmark-title": "Savor Happiness Bookmarks",
    "btn-more-merch": '<i class="fas fa-images"></i> ของที่ระลึกเพิ่มเติม',
    "hero-subtitle": "DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS",
    "support-creator-label": "โดย ปรานต์ แถวอินทร์ (ปาล์ม)",
  },
  en: {
    // NAV
    "nav-home": "Home",
    "nav-book": "Guidebook",
    "nav-merch": "Merchandise",
    "nav-highlights": "Highlights",
    "nav-creator": "Creator",

    // HERO
    "hero-thesis-tag": "GRAPHIC DESIGN THESIS EXHIBITION",
    "hero-title": 'FLAVOR <br><span class="highlight">FIRST</span>',
    "hero-vibe":
      "20 Hidden Cafés & Restaurants in Minburi–Nong Chok You Shouldn't Miss",
    "hero-desc":
      "A complete guidebook capturing the charm of Bangkok's suburbs.<br />Every feeling, every flavor — beautifully designed to savor happiness.",
    "btn-start": '<i class="fas fa-book-open"></i> Explore Guidebook',
    "btn-view-shop": '<i class="fas fa-map-marker-alt"></i> Browse Venues',

    // VIDEO SECTION
    "video-tag": "Atmosphere",
    "video-title": "Savor the Serenity",
    "video-desc":
      "Discover your new favorite hideaway in the city's quieter side.<br />Capture memories through the lens and flavors that linger.",

    // BOOK SECTION
    "book-title": "The Guidebook",
    "book-badge-size": "A5 Photobook",
    "book-badge-pages": "126 Pages",
    "book-badge-district": "Minburi & Nongchok",
    "book-spec": "Featuring 20 Cafés & Restaurants",
    "book-desc":
      "Savor Happiness conveys the soul of Minburi–Nong Chok through Visual Storytelling — blending real atmosphere photography with vibrant graphic design in a dynamic layout, complete with a handy postcard map.",
    "btn-pdf": '<i class="fas fa-book-open"></i> Preview Sample Pages',

    // MERCH SECTION
    "scroll-hint":
      '<i class="fas fa-arrows-alt-h"></i> Swipe left or right to explore',
    "merch-postcard-minburi": "Minburi Postcard Map",
    "merch-postcard-nongchok": "Nong Chok Postcard Map",
    "merch-sticker": "Die-cut Sticker Set",
    "merch-bookmarks": "Exclusive Bookmarks",
    "merch-fashion": "T-Shirt & Tote Bag Collection",
    "merch-mug": "Savor Happiness Mug",
    "merch-full": "The Full Collection",

    // HIGHLIGHTS SECTION
    "district-minburi": "MINBURI",
    "district-nongchok": "NONGCHOK",
    "zone-minburi": "Minburi District",
    "zone-nongchok": "Nong Chok District",
    "filter-all": "All Venues",
    "filter-min": "Minburi",
    "filter-nong": "Nong Chok",
    "read-more": "View Details",

    // AUTHOR SECTION
    "author-title": "About the Creator",
    "author-name": "Pran Taewin (Palm)",
    "author-role":
      "Graphic Designer | School of Digital Media, Sripatum University #67",
    "support-title": '<i class="fas fa-heart"></i> Support This Project',
    "support-sub": "Savor Happiness Thesis Project",
    "support-desc":
      "Every contribution means the world to this thesis project.<br />Thank you for joining this journey and savoring happiness with us. ✨",
    "support-creator": "By Pran Taewin (Palm)",
    "support-qr-hint": "Scan to support",

    // MODALS
    "modal-btn-guide": '<i class="fas fa-book-open"></i> View Full Guidebook',
    "modal-btn-map": '<i class="fas fa-map-marker-alt"></i> Google Maps',
    "pdf-preview-title": "Preview Sample Pages",

    // FOOTER
    "footer-tagline": "DIGITAL MEDIA · GRAPHIC DESIGN · SPU THESIS",
    "footer-nav-title": "Navigate",
    "footer-nav-book": "The Guidebook",
    "footer-connect-title": "Connect",
    "footer-desc":
      "Capturing memories through the lens<br />in Minburi &amp; Nong Chok",
    "footer-support": '<i class="fas fa-qrcode"></i> Support Us',
    "footer-copyright":
      "©2026 SAVOR HAPPINESS | Thank you for being part of our story.",

    // MISC
    "merch-postcard-title":
      '<i class="fas fa-map-marked-alt"></i> Postcard Map',
    "merch-min-title": "Savor Happiness Sticker Set",
    "merch-bookmark-title": "Savor Happiness Bookmarks",
    "btn-more-merch": '<i class="fas fa-images"></i> More Merchandise',
    "hero-subtitle": "DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS",
    "support-creator-label": "By Pran Taewin (Palm)",
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
      'เสน่ห์สไตล์ยุโรปวินเทจ ท่ามกลางสวนสวยที่เนรมิตความสุขให้ทุกย่างก้าว<br><span class="closed-notice"><i class="fas fa-info-circle"></i> ปัจจุบันปิดบริการถาวรแล้ว (บันทึกไว้ในความทรงจำแสนพิเศษ)</span>',
    descEN:
      'Step into vintage European charm surrounded by a breathtakingly beautiful garden.<br><span class="closed-notice"><i class="fas fa-info-circle"></i> Permanently Closed (Preserved in our special memories)</span>',
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
    target: "/",
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
  renderShops();
  applyLanguage(AppState.ui.currentLang);
  renderTicker();
  setupScrollProgress();
  setupMobileNav();
  setupFilters();
  setupSearch();
  setupModals();
  setupMerchSlider();
  setupLazyVideo();

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: "ease-out-cubic",
    });
  }
});

// Lazy-load the background video when it enters viewport
function setupLazyVideo() {
  const video = document.getElementById("myVideo");
  if (!video) return;
  const src = video.getAttribute("data-src");
  if (!src) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const source = video.querySelector("source[data-src]");
          if (source) {
            source.src = source.getAttribute("data-src");
            source.removeAttribute("data-src");
          }
          video.src = src;
          video.removeAttribute("data-src");
          video.load();
          video.play().catch(() => {});
          observer.disconnect();
        }
      });
    },
    { rootMargin: "200px" },
  );
  observer.observe(video);
}

// ==========================================
// 3. CORE LOGIC (ปรับแก้เพื่อลดภาระ DOM)
// ==========================================
function renderShops() {
  const minList = document.getElementById("minburi-list");
  const nongList = document.getElementById("nongchok-list");
  if (!minList || !nongList) return;

  minList.innerHTML = "";
  nongList.innerHTML = "";

  realShops.forEach((shop, idx) => {
    const staggerDelay = (idx % 5) * 80;

    const imgA = `<img class="photo-item active" id="shop-img-a-${idx}" src="${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}0.webp" alt="${shop.name}" data-shop-idx="${idx}" data-img-idx="0" width="600" height="400" loading="lazy" decoding="async" onerror="this.style.display='none';">`;
    const imgB = `<img class="photo-item" id="shop-img-b-${idx}" src="" alt="${shop.name}" data-shop-idx="${idx}" data-img-idx="1" width="600" height="400" loading="lazy" decoding="async" onerror="this.style.display='none';">`;

    const cardHTML = `
      <div class="shop-card fadeInSlideUp" data-aos="fade-up" data-aos-delay="${staggerDelay}" style="animation-delay: ${idx * 0.05}s;">
        <div class="photo-gallery" id="gallery-${idx}" data-shop-idx="${idx}" title="คลิกรูปเพื่อดูแบบเต็มจอ">
            ${imgA}
            ${imgB}
        </div>
        <div class="shop-info" onclick="openCafeModal(${idx})" title="คลิกเพื่อดูรายละเอียดร้าน">
          <div class="shop-name">${AppState.ui.currentLang === "th" ? shop.nameTH : shop.name}</div>
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

  startAutoSlide();
}

function startAutoSlide() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const gallery = entry.target;
        const shopIdx = gallery.getAttribute("data-shop-idx");
        const shop = realShops[shopIdx];
        const imgA = document.getElementById(`shop-img-a-${shopIdx}`);
        const imgB = document.getElementById(`shop-img-b-${shopIdx}`);

        if (entry.isIntersecting) {
          let currentImgIdx = parseInt(
            gallery.getAttribute("data-current-img-idx") || "0",
          );
          let useImgA = gallery.getAttribute("data-use-imga") !== "false";

          const interval = setInterval(
            () => {
              currentImgIdx = (currentImgIdx + 1) % 8;
              const newSrc = `${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}${currentImgIdx}.webp`;

              if (useImgA) {
                imgB.onload = () => {
                  imgB.classList.add("active");
                  imgA.classList.remove("active");
                  imgB.onload = null;
                };
                imgB.src = newSrc;
                imgB.setAttribute("data-img-idx", currentImgIdx);
              } else {
                imgA.onload = () => {
                  imgA.classList.add("active");
                  imgB.classList.remove("active");
                  imgA.onload = null;
                };
                imgA.src = newSrc;
                imgA.setAttribute("data-img-idx", currentImgIdx);
              }

              useImgA = !useImgA;
              gallery.setAttribute("data-current-img-idx", currentImgIdx);
              gallery.setAttribute("data-use-imga", useImgA);
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
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      const filter = btn.getAttribute("data-filter");
      document.getElementById("minburi-section").style.display =
        filter === "all" || filter === "minburi" ? "flex" : "none";
      document.getElementById("nongchok-section").style.display =
        filter === "all" || filter === "nongchok" ? "flex" : "none";
      if (typeof AOS !== "undefined") AOS.refresh();

      // Smoothly scroll to highlights section with an offset for the sticky header
      const highlightsSec = document.getElementById("highlights");
      if (highlightsSec) {
        const headerOffset = 80; // Height of the sticky navbar
        const elementPosition = highlightsSec.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
  filterBtns.forEach((btn) => {
    btn.setAttribute(
      "aria-pressed",
      btn.classList.contains("active") ? "true" : "false",
    );
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
function lockScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

window.openCafeModal = function (idx) {
  const shop = realShops[idx];
  const lang = AppState.ui.currentLang;
  document.getElementById("modalImg").src =
    `${CONFIG.IMAGE_BASE_PATH}${shop.folder}/${shop.file}0.webp`;
  document.getElementById("modalTitle").innerText =
    lang === "th" ? shop.nameTH : shop.name;
  document.getElementById("modalDesc").innerHTML =
    lang === "th" ? shop.descTH : shop.descEN;

  // Set Google Maps link dynamically
  const mapLink = document.getElementById("modalMapLink");
  if (mapLink) {
    const searchQuery = `${shop.name} ${shop.zone === "minburi" ? "มีนบุรี" : "หนองจอก"} Bangkok`;
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
  }

  // Translate modal buttons
  const btnGuide = document.getElementById("modalBtnGuide");
  if (btnGuide && translations[lang]["modal-btn-guide"]) {
    btnGuide.innerHTML = translations[lang]["modal-btn-guide"];
  }
  if (mapLink && translations[lang]["modal-btn-map"]) {
    mapLink.innerHTML = translations[lang]["modal-btn-map"];
  }

  document.getElementById("cafeModal").style.display = "flex";
  lockScroll();
};

window.openSimpleLightbox = function (src) {
  const lb = document.getElementById("simpleLightbox");
  const lbImg = document.getElementById("lightboxImg");
  lbImg.src = src;
  lbImg.style.transform = "scale(1)";

  const bookGallery = [
    "img/SavorHappiness-Cover.webp",
    "img/SavorHappiness-Back.webp",
    "img/SavorHappiness-Inside1.webp",
    "img/SavorHappiness-Inside2.webp",
  ];

  const merchGallery = [
    "img/Postcards.webp",
    "img/Sticker1.webp",
    "img/Mockup_Bookmarks.webp",
    "img/Fashion.webp",
    "img/Mug_Mockup_1.webp",
    "img/AllMerch.webp",
  ];

  // Find if src matches book gallery or merch gallery
  let matchBookIdx = bookGallery.findIndex((item) => src.endsWith(item));
  let matchMerchIdx = merchGallery.findIndex((item) => src.endsWith(item));

  if (matchBookIdx !== -1) {
    AppState.lightbox.currentGallery = bookGallery;
    AppState.lightbox.currentImgIdx = matchBookIdx;
    document
      .querySelectorAll("#simpleLightbox .nav-btn")
      .forEach((btn) => (btn.style.display = "flex"));
  } else if (matchMerchIdx !== -1) {
    AppState.lightbox.currentGallery = merchGallery;
    AppState.lightbox.currentImgIdx = matchMerchIdx;
    document
      .querySelectorAll("#simpleLightbox .nav-btn")
      .forEach((btn) => (btn.style.display = "flex"));
  } else {
    AppState.lightbox.currentGallery = [];
    AppState.lightbox.currentImgIdx = 0;
    document
      .querySelectorAll("#simpleLightbox .nav-btn")
      .forEach((btn) => (btn.style.display = "none"));
  }

  lb.classList.add("is-open");
  lockScroll();
  AppState.lightbox.isZoomed = false;
  updateLightboxCounter();
};

window.openGalleryLightbox = function (shopIdx, imgIdx) {
  const shop = realShops[shopIdx];
  const lb = document.getElementById("simpleLightbox");
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
  lb.classList.add("is-open");
  lockScroll();
  AppState.lightbox.isZoomed = false;
  updateLightboxCounter();
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
    updateLightboxCounter();
  }
};

function updateLightboxCounter() {
  const counterEl = document.getElementById("lightboxCounter");
  if (!counterEl) return;
  const gallery = AppState.lightbox.currentGallery;
  const idx = AppState.lightbox.currentImgIdx;
  if (gallery && gallery.length > 1) {
    counterEl.innerText = `${idx + 1} / ${gallery.length}`;
    counterEl.style.display = "block";
  } else {
    counterEl.style.display = "none";
  }
}

function setupModals() {
  const closeLightbox = () => {
    document.getElementById("simpleLightbox").classList.remove("is-open");
    unlockScroll();
  };

  document.getElementById("closeCafeModal").addEventListener("click", () => {
    document.getElementById("cafeModal").style.display = "none";
    unlockScroll();
  });
  document.getElementById("closePdfModal").addEventListener("click", () => {
    document.getElementById("pdfModal").style.display = "none";
    unlockScroll();
  });
  document
    .getElementById("closeLightboxBtn")
    .addEventListener("click", closeLightbox);
  document.getElementById("previewBtn").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("pdfModal").style.display = "flex";
    lockScroll();
  });
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.style.display = "none";
      unlockScroll();
    }
    if (e.target.classList.contains("lightbox-overlay")) {
      closeLightbox();
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay").forEach((m) => {
        m.style.display = "none";
      });
      closeLightbox();
      unlockScroll();
    }
    if (
      document.getElementById("simpleLightbox").classList.contains("is-open")
    ) {
      if (e.key === "ArrowLeft") {
        changeImg(-1);
      } else if (e.key === "ArrowRight") {
        changeImg(1);
      }
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
  document.documentElement.lang = lang;
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
  document.querySelectorAll(".shop-name").forEach((el, idx) => {
    const shop = realShops[idx];
    if (shop) {
      el.innerText = lang === "th" ? shop.nameTH : shop.name;
    }
  });
  document.querySelectorAll(".read-more-text").forEach((el) => {
    el.innerText = translations[lang]["read-more"];
  });
  const searchInput = document.getElementById("shopSearchInput");
  if (searchInput)
    searchInput.placeholder =
      lang === "th" ? "ค้นหาร้านค้าที่นี่..." : "Search venues here...";
  const muteBtn = document.getElementById("muteBtn");
  if (muteBtn)
    muteBtn.setAttribute(
      "aria-label",
      lang === "th" ? "ปิด/เปิดเสียง" : "Toggle sound",
    );
  const navCloseBtn = document.getElementById("navCloseBtn");
  if (navCloseBtn)
    navCloseBtn.setAttribute(
      "aria-label",
      lang === "th" ? "ปิดเมนู" : "Close menu",
    );
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  if (hamburgerBtn)
    hamburgerBtn.setAttribute(
      "aria-label",
      lang === "th" ? "เปิดเมนู" : "Open menu",
    );
  renderTicker();
}

function renderTicker() {
  const lang = AppState.ui.currentLang;
  const html = realShops
    .map(
      (s) =>
        `<div class="ticker-item"><i class="fas fa-star" style="color: var(--ci-yellow); margin-right: 8px;"></i>${lang === "th" ? s.nameTH : s.name}</div><div class="ticker-sep">SAVOR HAPPINESS 🍴</div>`,
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

// ==========================================
// 6. MERCH SLIDER & MOBILE NAV
// ==========================================
function setupMobileNav() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navCloseBtn = document.getElementById("navCloseBtn");
  const navLinks = document.getElementById("navLinks");
  const navBackdrop = document.getElementById("navBackdrop");
  if (!hamburgerBtn || !navLinks) return;

  const toggleNav = (show) => {
    navLinks.classList.toggle("active", show);
    if (navBackdrop) navBackdrop.classList.toggle("active", show);
    if (show) lockScroll();
    else unlockScroll();
  };

  hamburgerBtn.addEventListener("click", () => toggleNav(true));
  if (navCloseBtn)
    navCloseBtn.addEventListener("click", () => toggleNav(false));
  if (navBackdrop)
    navBackdrop.addEventListener("click", () => toggleNav(false));

  const navItems = navLinks.querySelectorAll("a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 1200) {
        toggleNav(false);
      }
    });
  });
}

function setupMerchSlider() {
  const slider = document.querySelector(".merch-slider-wrapper");
  if (!slider) return;

  const progressBar = document.querySelector(".merch-scroll-progress-bar");

  const updateProgress = () => {
    if (!progressBar) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) {
      progressBar.style.width = "0%";
      return;
    }
    const scrolledPercentage = (slider.scrollLeft / maxScroll) * 100;
    progressBar.style.width = `${scrolledPercentage}%`;
  };

  slider.addEventListener("scroll", updateProgress);
  updateProgress();

  let isDown = false;
  let isDragging = false;
  let startX;
  let scrollLeft;
  let autoScrollInterval;

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
      slider.scrollLeft += 1.5;
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollLeft = 0;
      }
    }, 30);
  };

  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  startAutoScroll();

  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("touchstart", stopAutoScroll, { passive: true });
  slider.addEventListener("touchend", startAutoScroll);

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    isDragging = false;
    slider.style.cursor = "grabbing";
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    stopAutoScroll();
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.style.cursor = "grab";
    startAutoScroll();
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.style.cursor = "grab";
    startAutoScroll();
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;

    if (Math.abs(walk) > 5) {
      isDragging = true;
    }

    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener(
    "click",
    (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true,
  );
}
