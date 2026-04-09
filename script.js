/* ============================================================
    SAVOR HAPPINESS - TOTAL INTEGRATED ENGINE (JS)
    Consolidated UI Logic | Lightbox | Search | Multi-Lang
    Author: Pran (Palm) - Graphic Design SPU
    ============================================================ */

// --- [1. Configuration & Data] ---

/**
 * [1.1] Translations Data
 * เก็บชุดข้อมูลการแปลภาษาทั้งหมด (Dictionary)
 */
const TRANSLATIONS = {
    'th': {
        'nav-home': 'หน้าแรก', 'nav-book': 'หนังสือ', 'nav-highlights': 'ร้านแนะนำ', 'nav-merch': 'ของที่ระลึก', 'nav-creator': 'ผู้จัดทำ',
        'hero-subtitle': 'DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS',
        'hero-title': 'SAVOR HAPPINESS',
        'hero-vibe': 'สัมผัส มุมมอง รสชาติ.',
        'hero-desc': 'ไกด์บุ๊คที่จะพาคุณตกหลุมรักชานเมือง',
        'book-title': 'THE GUIDEBOOK',
        'book-desc': 'Savor Happiness: 20 ร้านเด็ดย่านมีนบุรี–หนอกจอก ผ่านภาพและดีไซน์',
        'btn-read': 'อ่านออนไลน์ (PDF)', 'btn-gallery': 'ดูรูปเล่มเพิ่มเติม', 'btn-start': 'กดเริ่มเพื่อลิ้มรสความสุข', 'btn-pdf': 'อ่านตัวอย่างไฟล์ PDF',
        'author-name': 'ปรานต์ แถวอินทร์ (ปาล์ม)', 'author-info': 'นักออกแบบกราฟิก | คณะดิจิทัลมีเดีย มหาวิทยาลัยศรีปทุม #67',
        'merch-section-title': 'ของที่ระลึก',
        'merch-min-title': 'สติ๊กเกอร์ ชุดดื่มด่ำกับความสุข',
        'zone-minburi': 'ย่านมีนบุรี', 'zone-nongchok': 'ย่านหนองจอก',
        'creator-title': 'ผู้จัดทำ',
        'qr-title': 'อุดหนุนผลงาน', 'qr-subtitle': 'ขอบคุณที่ร่วมเป็นส่วนหนึ่งในการสนับสนุน Thesis Project: Savor Happiness',
        'qr-thanks': 'ขอบคุณทุกการสนับสนุนครับ ✨', 'btn-support': 'แสดง QR Code สำหรับอุดหนุน'
    },
    'en': {
        'nav-home': 'Home', 'nav-book': 'The Book', 'nav-highlights': 'Highlights', 'nav-merch': 'Merchandise', 'nav-creator': 'Creator',
        'hero-subtitle': 'DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS',
        'hero-title': 'SAVOR HAPPINESS',
        'hero-vibe': 'VIBE. VISUAL. FLAVOR.',
        'hero-desc': 'A guidebook that lets you fall in love with the suburbs.',
        'book-title': 'THE GUIDEBOOK',
        'book-desc': 'Savor Happiness: 20 Must-Visit Spots in Minburi-Nong Chok Through Photography and Design',
        'btn-read': 'Read Online (PDF)', 'btn-gallery': 'View Book Details', 'btn-start': 'Press Start to Savor Happiness', 'btn-pdf': 'Preview PDF',
        'author-name': 'Pran Taewin (Palm)', 'author-info': 'Graphic Designer | School of Digital Media, SPU #67',
        'merch-section-title': 'Merchandise',
        'merch-min-title': 'Savor Happiness Sticker set',
        'zone-minburi': 'Min Buri District', 'zone-nongchok': 'Nong Chok District',
        'creator-title': 'Creator',
        'qr-title': 'Support My Work', 'qr-subtitle': 'Thank you for being a part of Savor Happiness Thesis Project.',
        'qr-thanks': 'Thank you for your support! ✨', 'btn-support': 'Show Support QR Code'
    }
};

/**
 * [1.2] Real Shops Data
 * ชุดข้อมูลร้านค้าและคาเฟ่ทั้งหมด 20 แห่ง
 */
const REAL_SHOPS = [
    { name: "The Lobby Boy Coffee", nameTH: "เดอะ ล็อบบี้ บอย คอฟฟี่", zone: "minburi", folder: "LobbyBoy", file: "lobby" },
    { name: "De Wila Cat Hotel & Café", nameTH: "เดอ วิลา แคท โฮเทล แอนด์ คาเฟ่ (มีนบุรี)", zone: "minburi", folder: "DeWila", file: "dewila" },
    { name: "Chomna Bar & Terrace", nameTH: "ชมนา บาร์ แอนด์ เทอร์เรซ (มีนบุรี)", zone: "minburi", folder: "Chomna", file: "chomna" },
    { name: "Prakai Cafe & Cuisine", nameTH: "ประกาย คาเฟ่ แอน คูซีน (มีนบุรี)", zone: "minburi", folder: "Prakai", file: "prakai" },
    { name: "Trees & Co.", nameTH: "ทรี แอนด์ โค (มีนบุรี)", zone: "minburi", folder: "TreesCo", file: "trees" },
    { name: "Rim Lagoon Café", nameTH: "ริม ลากูน คาเฟ่ (มีนบุรี)", zone: "minburi", folder: "RimLagoon", file: "rim" },
    { name: "James 500 City Camp", nameTH: "เจมส์ 500 ซิตี้ แคมป์ (มีนบุรี)", zone: "minburi", folder: "James500", file: "james" },
    { name: "Cat's Eye Cafe", nameTH: "แคท อาย คาเฟ่ (มีนบุรี)", zone: "minburi", folder: "CatsEye", file: "cat" },
    { name: "Daylight", nameTH: "เดย์ไลท์ (มีนบุรี)", zone: "minburi", folder: "Daylight", file: "day" },
    { name: "Wild Duck Cafe", nameTH: "ไวล์ด ดัค คาเฟ่ (มีนบุรี)", zone: "minburi", folder: "WildDuck", file: "duck" },
    { name: "Voodoo Cafe", nameTH: "วูดู คาเฟ่ (หนองจอก)", zone: "nongchok", folder: "Voodoo", file: "voodoo" },
    { name: "All of Me Home Cafe", nameTH: "ออล ออฟ มี โฮม คาเฟ่ (หนองจอก)", zone: "nongchok", folder: "AllOfMe", file: "all" },
    { name: "Barakat Lunla Land", nameTH: "บารอกัต ลัลลา แลนด์ (หนองจอก)", zone: "nongchok", folder: "Barakat", file: "barakat" },
    { name: "Chill Out Farm & Cafe", nameTH: "ชิลล์ เอาท์ ฟาร์ม แอนด์ คาเฟ่ (หนองจอก)", zone: "nongchok", folder: "ChillOut", file: "chill" },
    { name: "Nine Than Cafe", nameTH: "นายท่าน คาเฟ่ (หนองจอก)", zone: "nongchok", folder: "NineThan", file: "nine" },
    { name: "Fairy Tale Cafe", nameTH: "แฟรี่ เทล คาเฟ่ (หนองจอก)", zone: "nongchok", folder: "FairyTale", file: "fairy" },
    { name: "Again Please", nameTH: "อะเกน พลีส (หนองจอก)", zone: "nongchok", folder: "AgainPlease", file: "again" },
    { name: "Wang Wela Café", nameTH: "วางเวลา คาเฟ่ (หนองจอก)", zone: "nongchok", folder: "WangWela", file: "wang" },
    { name: "Minna Cafe", nameTH: "มินนา คาเฟ่ (หนองจอก)", zone: "nongchok", folder: "Minna", file: "minna" },
    { name: "Home Vintage Cafe", nameTH: "โฮม วินเทจ คาเฟ่ (หนองจอก)", zone: "nongchok", folder: "HomeVintage", file: "home" }
];

// --- [2. System Managers] ---

/**
 * [2.1] LocalizationManager
 * จัดการระบบภาษาและการอัปเดตข้อความในหน้าเว็บ
 */
const LocalizationManager = {
    currentLanguage: 'th',

    /**
     * เริ่มต้นระบบภาษา (ดึงค่าจาก LocalStorage)
     */
    init() {
        this.currentLanguage = localStorage.getItem('preferredLang') || 'th';
        this.apply();
    },

    /**
     * สลับภาษาไปมา (TH <-> EN)
     */
    toggle() {
        this.currentLanguage = (this.currentLanguage === 'th') ? 'en' : 'th';
        localStorage.setItem('preferredLang', this.currentLanguage);
        this.apply();
        ThemeManager.syncBrandedUI(); // ซิงค์ UI อื่นๆ ที่เกี่ยวข้อง
    },

    /**
     * อัปเดตข้อความทั้งหมดที่มี attribute [data-key]
     */
    apply() {
        document.querySelectorAll('[data-key]').forEach(element => {
            const translationKey = element.getAttribute('data-key');
            if (TRANSLATIONS[this.currentLanguage][translationKey]) {
                element.innerHTML = TRANSLATIONS[this.currentLanguage][translationKey];
            }
        });

        // อัปเดต Placeholder ของ Search Input
        const searchInput = document.getElementById('shopSearchInput');
        if (searchInput) {
            searchInput.placeholder = (this.currentLanguage === 'th')
                ? 'ค้นหาร้านค้า หรือเมนู...'
                : 'Search shops or menu...';
        }
    }
};

/**
 * [2.2] ThemeManager
 * จัดการระบบธีม (Light/Dark) และการปรับแต่ง UI ตามแบรนด์
 */
const ThemeManager = {
    /**
     * เริ่มต้นระบบธีม
     */
    init() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        this.syncBrandedUI();
    },

    /**
     * สลับโหมด Light/Dark
     */
    toggle() {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';

        if (!isDark) {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
        this.syncBrandedUI();
    },

    /**
     * ซิงค์องค์ประกอบ UI ของแบรนด์ (เช่น โลโก้, สถานะปุ่ม)
     */
    syncBrandedUI() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const logoImg = document.getElementById('mainLogo') || document.querySelector('.nav-logo-container img');
        const langBtns = document.querySelectorAll('.lang-btn');
        const themeBtns = document.querySelectorAll('.theme-btn');

        // [Logic] สลับภาพโลโก้ตามสภาพแสงของธีม
        if (logoImg) {
            logoImg.src = isDark ? "img/logo/savorhappiness-2.png" : "img/logo/savorhappiness-1.png";
        }

        // อัปเดตข้อความบนปุ่มสถานะ
        langBtns.forEach(btn => {
            btn.innerText = LocalizationManager.currentLanguage.toUpperCase();
            btn.classList.add('active');
        });

        themeBtns.forEach(btn => {
            if (isDark) {
                btn.innerText = "DARK";
                btn.classList.add('active');
            } else {
                btn.innerText = "LIGHT";
                btn.classList.remove('active');
            }
        });
    }
};

/**
 * [2.3] Public Wrappers (สำหรับเรียกใช้ใน HTML)
 * ฟังก์ชันเหล่านี้ทำหน้าที่เป็นสะพานเชื่อมระหว่าง HTML และ System Managers
 */
function toggleLang() {
    LocalizationManager.toggle();
}

function toggleTheme() {
    ThemeManager.toggle();
}

// --- [3. Global State & DOM References] ---
let lbImg, lbContainer;
let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0, lastX = 0, lastY = 0;
let currentGallery = [];
let currentImgIdx = 0;

// --- [4. Lifecycle: Initialization] ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Reset Scroll (เพื่อประสบการณ์แบบรีโหลดใหม่คลีนๆ)
    if (history.scrollRestoration) { history.scrollRestoration = 'manual'; }
    window.scrollTo(0, 0);

    // 2. Fetch UI Elements
    lbImg = document.getElementById('lightboxImg');
    lbContainer = document.getElementById('simpleLightbox');
    const searchInput = document.getElementById('shopSearchInput');
    const suggestionBox = document.getElementById('searchSuggestions');
    const hamBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navLinks');
    const hamIcon = document.querySelector('#hamburgerBtn i');

    // 3. Initialize Domain Managers (Clean Init)
    LocalizationManager.init();
    ThemeManager.init();

    // 4. Content Rendering
    renderShops();
    renderTicker();

    // 5. Lightbox Engine (Zoom & Drag)
    if (lbImg && lbContainer) {
        lbImg.onclick = (e) => {
            e.stopPropagation();
            const isZoomed = lbImg.classList.toggle('zoomed');
            if (!isZoomed) {
                translateX = 0; translateY = 0; lastX = 0; lastY = 0;
                lbImg.style.transform = `translate(0px, 0px) scale(1)`;
            } else {
                lbImg.style.transform = `translate(0px, 0px) scale(2.5)`;
            }
        };

        const startDragging = (e) => {
            if (!lbImg.classList.contains('zoomed')) return;
            isDragging = true;
            lbImg.style.cursor = 'grabbing';
            const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
            const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
            startX = pageX - lastX;
            startY = pageY - lastY;
            lbImg.style.transition = 'none';
        };

        const move = (e) => {
            if (!isDragging) return;
            const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
            const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
            translateX = pageX - startX;
            translateY = pageY - startY;
            lbImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(2.5)`;
        };

        const stopDragging = () => {
            if (isDragging) {
                isDragging = false;
                lastX = translateX; lastY = translateY;
                lbImg.style.cursor = 'grab';
                lbImg.style.transition = 'transform 0.3s ease-out';
            }
        };

        lbImg.addEventListener('mousedown', startDragging);
        lbImg.addEventListener('touchstart', startDragging, { passive: false });
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move, { passive: false });
        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('touchend', stopDragging);
    }

    // 6. Search Suggestion Logic
    const navItems = [
        { name: 'หน้าแรก (Home)', target: '#home', icon: 'fa-home', keywords: ['หน้าแรก', 'home'] },
        { name: 'หนังสือ (The Guidebook)', target: '#book-feature', icon: 'fa-book', keywords: ['หนังสือ', 'book'] },
        { name: 'ของที่ระลึก (Merchandise)', target: '#merch', icon: 'fa-gift', keywords: ['ของที่ระลึก', 'merch'] },
        { name: 'ร้านแนะนำ (Highlights)', target: '#highlights', icon: 'fa-star', keywords: ['ร้านแนะนำ', 'คาเฟ่'] },
        { name: 'ผู้จัดทำ (Creator)', target: '#author', icon: 'fa-user', keywords: ['ผู้จัดทำ', 'ปาล์ม'] }
    ];

    searchInput?.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        if (!suggestionBox) return;
        suggestionBox.innerHTML = "";
        if (query === "") { suggestionBox.style.display = "none"; return; }
        const matchedNav = navItems.filter(item => item.keywords.some(key => key.includes(query)) || item.name.toLowerCase().includes(query));
        const matchedShops = realShops.filter(shop => shop.name.toLowerCase().includes(query) || (shop.nameTH && shop.nameTH.includes(query))).slice(0, 6);
        const allResults = [...matchedNav, ...matchedShops];

        if (allResults.length > 0) {
            allResults.forEach((item) => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                if (item.target) {
                    div.innerHTML = `<i class="fas ${item.icon}"></i> <span><b>เมนู:</b> ${item.name}</span>`;
                    div.onclick = () => { document.querySelector(item.target)?.scrollIntoView({ behavior: 'smooth' }); suggestionBox.style.display = "none"; searchInput.value = ""; };
                } else {
                    div.innerHTML = `<i class="fas fa-search"></i> <span>${item.name} <small>(${item.nameTH})</small></span>`;
                    div.onclick = () => { searchInput.value = item.name; suggestionBox.style.display = "none"; executeSearch(); };
                }
                suggestionBox.appendChild(div);
            });
            suggestionBox.style.display = "block";
        } else { suggestionBox.style.display = "none"; }
    });

    // 7. Hamburger Menu Logic
    if (hamBtn && navMenu) {
        hamBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('active');
            if (hamIcon) hamIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        });

        navMenu.querySelectorAll('a, .lang-btn, .theme-btn').forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (hamIcon) hamIcon.className = 'fas fa-bars';
            });
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                if (hamIcon) hamIcon.className = 'fas fa-bars';
            }
        });

        // Resize protection for infinite scaling
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamIcon) hamIcon.className = 'fas fa-bars';
            }
        });
    }

    // 8. AOS Init
    if (typeof AOS !== 'undefined') {
        setTimeout(() => { AOS.init({ duration: 1000, once: true }); }, 100);
    }
});

// --- [3. Core Functions] ---

function renderShops() {
    const minburiGrid = document.getElementById('minburi-list');
    const nongchokGrid = document.getElementById('nongchok-list');
    if (!minburiGrid || !nongchokGrid) return;

    minburiGrid.innerHTML = "";
    nongchokGrid.innerHTML = "";

    REAL_SHOPS.forEach((shop, shopIndex) => {
        let galleryHtml = "";
        for (let i = 0; i < 8; i++) {
            const imagePath = `img/20ResCafe/${shop.folder}/${shop.file}${i}.jpg`;
            galleryHtml += `
                <img class="photo-item ${i === 0 ? 'active' : ''}" 
                     src="${imagePath}" 
                     loading="lazy"
                     onclick="window.openSimpleLightbox(${i}, ${shopIndex})" 
                     onerror="if (this.src.endsWith('.jpg')) { this.src = this.src.replace('.jpg', '.JPG'); } else { this.style.display='none'; }">
            `;
        }
        const shopCardHtml = `
            <div class="shop-card" data-aos="fade-up">
                <div class="photo-gallery">${galleryHtml}</div>
                <div class="shop-info">
                    <div class="shop-name">${shop.name}</div>
                    <div class="shop-tag">${shop.zone === 'minburi' ? 'Min Buri' : 'Nong Chok'}</div>
                </div>
            </div>`;

        if (shop.zone === 'minburi') {
            minburiGrid.insertAdjacentHTML('beforeend', shopCardHtml);
        } else {
            nongchokGrid.insertAdjacentHTML('beforeend', shopCardHtml);
        }
    });
    setTimeout(startAutoSlide, 300);
}

function executeSearch() {
    const searchInput = document.getElementById('shopSearchInput');
    if (!searchInput) return;

    const searchQuery = searchInput.value.toLowerCase().trim();
    const shopCards = document.querySelectorAll('.shop-card');

    if (searchQuery === "") {
        shopCards.forEach(card => {
            card.style.display = "";
            card.style.opacity = "1";
        });
        return;
    }

    const navigationKeywords = [
        { keywords: ['หนังสือ', 'book', 'guidebook'], target: '#book-feature' },
        { keywords: ['ของที่ระลึก', 'merch', 'sticker'], target: '#merch' },
        { keywords: ['ร้านแนะนำ', 'highlights', 'cafe'], target: '#highlights' },
        { keywords: ['ผู้จัดทำ', 'creator', 'author'], target: '#author' },
        { keywords: ['หน้าแรก', 'home'], target: '#home' }
    ];

    const navigationMatch = navigationKeywords.find(item => item.keywords.some(key => searchQuery.includes(key)));
    let firstMatchingCard = null;

    shopCards.forEach(card => {
        const shopNameInCard = card.querySelector('.shop-name')?.innerText.toLowerCase() || "";
        const associatedShopData = REAL_SHOPS.find(s => s.name.toLowerCase() === shopNameInCard || (s.nameTH && s.nameTH.toLowerCase().includes(searchQuery)));

        if (shopNameInCard.includes(searchQuery) || (associatedShopData && associatedShopData.nameTH.toLowerCase().includes(searchQuery))) {
            card.style.display = "";
            card.style.opacity = "1";
            if (!firstMatchingCard) firstMatchingCard = card;
        } else {
            card.style.display = "none";
        }
    });

    if (navigationMatch) {
        document.querySelector(navigationMatch.target)?.scrollIntoView({ behavior: 'smooth' });
    } else if (firstMatchingCard) {
        firstMatchingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

window.openSimpleLightbox = function (imageIndex, shopIndex) {
    if (!lbContainer || !lbImg) {
        lbImg = document.getElementById('lightboxImg');
        lbContainer = document.getElementById('simpleLightbox');
    }

    if (typeof imageIndex === 'string' && shopIndex === undefined) {
        currentGallery = [imageIndex];
        currentImgIdx = 0;
    } else {
        const shop = REAL_SHOPS[shopIndex];
        if (!shop) return;
        currentGallery = [0, 1, 2, 3, 4, 5, 6, 7].map(i => `img/20ResCafe/${shop.folder}/${shop.file}${i}.jpg`);
        currentImgIdx = imageIndex;
    }

    lbImg.src = currentGallery[currentImgIdx];
    lbImg.classList.remove('zoomed');
    translateX = 0; translateY = 0; lastX = 0; lastY = 0;
    lbImg.style.transform = `translate(0px, 0px) scale(1)`;
    lbContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeSimpleLightbox = function () {
    if (lbContainer) { lbContainer.style.display = 'none'; document.body.style.overflow = 'auto'; }
};

window.changeImg = function (step) {
    if (!currentGallery.length) return;
    currentImgIdx = (currentImgIdx + step + currentGallery.length) % currentGallery.length;
    if (lbImg) lbImg.src = currentGallery[currentImgIdx];
};



// --- [4. Utilities] ---

/**
 * [4.1] Auto Slide Engine
 * ระบบเปลี่ยนรูปภาพอัตโนมัติในการ์ดร้านค้า
 */
function startAutoSlide() {
    document.querySelectorAll('.photo-gallery').forEach(gallery => {
        const photoItems = gallery.querySelectorAll('.photo-item');
        if (photoItems.length <= 1) return;

        let currentIndex = 0;
        setInterval(() => {
            photoItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % photoItems.length;
            photoItems[currentIndex].classList.add('active');
        }, 3000);
    });
}

/**
 * [4.2] Ticker Renderer
 * ระบบแสดงชื่อร้านค้าแบบวิ่ง (Ticker) ท้ายหน้า
 */
function renderTicker() {
    const tickerTrackMain = document.getElementById('shopTickerInner');
    const tickerTrackDuplicate = document.getElementById('shopTickerInnerDup');

    if (!tickerTrackMain || !tickerTrackDuplicate) return;

    const tickerContent = REAL_SHOPS.map(shop => `
        <div class="ticker-item">${shop.name}</div>
        <div class="ticker-sep">SAVOR HAPPINESS 🍴</div>
    `).join('');

    tickerTrackMain.innerHTML = tickerContent;
    tickerTrackDuplicate.innerHTML = tickerContent;
}

/**
 * [4.3] Copy Contact Info
 * คัดลอกอีเมลลงคลิปบอร์ด
 */
function copyContact() {
    const contactEmail = 'palmy1983ch@gmail.com';
    navigator.clipboard.writeText(contactEmail).then(() => {
        const copyButton = document.querySelector('.copy-btn');
        if (copyButton) {
            const originalContent = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyButton.innerHTML = originalContent;
            }, 2000);
        }
    });
}

/**
 * [4.4] Scroll Progress Bar
 * แถบแสดงสถานะการเลื่อนหน้าเว็บ
 */
window.onscroll = function () {
    const windowScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercentage = (windowScrollTop / documentHeight) * 100;

    const progressBar = document.getElementById("myBar");
    if (progressBar) {
        progressBar.style.width = scrolledPercentage + "%";
    }
};

/**
 * [4.5] Book Viewer Switcher
 * เปลี่ยนรูปภาพตัวอย่างหนังสือในส่วน Guidebook
 */
window.changeBookView = function (imageSource, thumbnailElement) {
    const mainBookDisplay = document.getElementById('mainBookImg');
    if (mainBookDisplay) {
        mainBookDisplay.src = imageSource;
        document.querySelectorAll('.thumb-item').forEach(thumb => thumb.classList.remove('active'));
        thumbnailElement.classList.add('active');
    }
};

/**
 * [4.6] QR Modal Logic
 * เปิด-ปิด หน้าต่าง QR Code สำหรับสนับสนุนผลงาน
 */
window.openQRModal = function () {
    const qrModalOverlay = document.getElementById('qrModal');
    if (qrModalOverlay) qrModalOverlay.style.display = 'flex';
};

window.closeQRModal = function () {
    const qrModalOverlay = document.getElementById('qrModal');
    if (qrModalOverlay) qrModalOverlay.style.display = 'none';
};
