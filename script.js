/* ============================================================
    SAVOR HAPPINESS - TOTAL INTEGRATED ENGINE (JS)
    Consolidated UI Logic | Lightbox | Search | Multi-Lang
    Author: Pran (Palm) - Graphic Design SPU
    ============================================================ */

// --- [1. Global State & Data] ---
let lbImg, lbContainer;
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;
let translateX = 0, translateY = 0, lastX = 0, lastY = 0;
let currentLang = 'th';
let currentGallery = []; 
let currentImgIdx = 0;

const translations = {
    'th': {
        'nav-home': 'หน้าแรก', 'nav-book': 'หนังสือ', 'nav-highlights': 'ร้านแนะนำ', 'nav-merch': 'ของที่ระลึก', 'nav-creator': 'ผู้จัดทำ',
        'hero-subtitle': 'DIGITAL MEDIA | GRAPHIC DESIGN | SPU THESIS',
        'hero-title': 'SAVOR HAPPINESS', 
        'hero-vibe': 'สัมผัส มุมมอง รสชาติ.',
        'hero-desc': 'ไกด์บุ๊คที่จะพาคุณตกหลุมรักชานเมือง',
        'book-title': 'THE GUIDEBOOK', 
        'book-desc': 'Savor Happiness: 20 ร้านเด็ดย่านมีนบุรี–หนองจอก ผ่านภาพและดีไซน์',
        'btn-read': 'อ่านออนไลน์ (PDF)', 'btn-gallery': 'ดูรูปเล่มเพิ่มเติม', 'btn-start': 'กดเริ่มเพื่อลิ้มรสความสุข', 'btn-pdf': 'อ่านตัวอย่างไฟล์ PDF',
        'author-name': 'ปรานต์ แถวอินทร์ (ปาล์ม)', 'author-info': 'นักออกแบบกราฟิก | คณะดิจิทัลมีเดีย มหาวิทยาลัยศรีปทุม #67',
        'merch-section-title': 'ของที่ระลึก', 
        'merch-min-title': 'สติ๊กเกอร์ ชุดดื่มด่ำกับความสุข',
        'zone-minburi': 'ย่านมีนบุรี', 'zone-nongchok': 'ย่านหนองจอก',
        'creator-title': 'ผู้จัดทำ',
        'qr-title': 'อุดหนุนผลงาน', 'qr-subtitle': 'Thesis Project: Savor Happiness', 'qr-thanks': 'ขอบคุณทุกการสนับสนุนครับ ✨'
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
        'qr-title': 'Support My Work', 'qr-subtitle': 'Thesis Project: Savor Happiness', 'qr-thanks': 'Thank you for your support! ✨'
    }
};

const realShops = [
    { name: "The Lobby Boy Coffee", nameTH: "เดอะ ล็อบบี้ บอย คอฟฟี่", zone: "minburi", folder: "LobbyBoy", file: "lobby" },
    { name: "De Wila Cat Hotel & Café", nameTH: "เดอ วิลา แคท โฮเทล แอนด์ คาเฟ่ (มีนบุรี)", zone: "minburi", folder: "DeWila", file: "dewila" },
    { name: "Chomna Bar & Terrace", nameTH: "ชมนา บาร์ แอนด์ เทอร์เรซ (มีนบุรี)", zone: "minburi", folder: "Chomna", file: "chomna" },
    { name: "Prakai Cafe & Cuisine", nameTH: "ประกาย คาเฟ่ แอน คูซีน (มีนบุรี)", zone: "minburi", folder: "Prakai", file: "prakai" },
    { name: "Trees & Co.", nameTH: "ทรี แอนด์ โค (มีนบุรี)", zone: "minburi", folder: "TreesCo", file: "trees" },
    { name: "Rim Lagoon Café", nameTH: "ริม ลากูน คาเฟ่ (มีนบุรี)",   zone: "minburi", folder: "RimLagoon", file: "rim" },
    { name: "James 500 City Camp", nameTH: "เจมส์ 500 ซิตี้ แคมป์ (มีนบุรี)",  zone: "minburi", folder: "James500", file: "james" },
    { name: "Cat's Eye Cafe", nameTH: "แคท อาย คาเฟ่ (มีนบุรี)",  zone: "minburi", folder: "CatsEye", file: "cat" },
    { name: "Daylight", nameTH: "เดย์ไลท์ (มีนบุรี)", zone: "minburi", folder: "Daylight", file: "day" },
    { name: "Wild Duck Cafe", nameTH: "ไวล์ด ดัค คาเฟ่ (มีนบุรี)",  zone: "minburi", folder: "WildDuck", file: "duck" },
    { name: "Voodoo Cafe", nameTH: "วูดู คาเฟ่ (หนองจอก)",   zone: "nongchok", folder: "Voodoo", file: "voodoo" },
    { name: "All of Me Home Cafe", nameTH: "ออล ออฟ มี โฮม คาเฟ่ (หนองจอก)",   zone: "nongchok", folder: "AllOfMe", file: "all" },
    { name: "Barakat Lunla Land", nameTH: "บารอกัต ลัลลา แลนด์ (หนองจอก)",   zone: "nongchok", folder: "Barakat", file: "barakat" },
    { name: "Chill Out Farm & Cafe", nameTH: "ชิลล์ เอาท์ ฟาร์ม แอนด์ คาเฟ่ (หนองจอก)",   zone: "nongchok", folder: "ChillOut", file: "chill" },
    { name: "Nine Than Cafe", nameTH: "นายท่าน คาเฟ่ (หนองจอก)",   zone: "nongchok", folder: "NineThan", file: "nine" },
    { name: "Fairy Tale Cafe", nameTH: "แฟรี่ เทล คาเฟ่ (หนองจอก)",   zone: "nongchok", folder: "FairyTale", file: "fairy" },
    { name: "Again Please", nameTH: "อะเกน พลีส (หนองจอก)",   zone: "nongchok", folder: "AgainPlease", file: "again" },
    { name: "Wang Wela Café", nameTH: "วางเวลา คาเฟ่ (หนองจอก)",   zone: "nongchok", folder: "WangWela", file: "wang" },
    { name: "Minna Cafe", nameTH: "มินนา คาเฟ่ (หนองจอก)",   zone: "nongchok", folder: "Minna", file: "minna" },
    { name: "Home Vintage Cafe", nameTH: "โฮม วินเทจ คาเฟ่ (หนองจอก)",   zone: "nongchok", folder: "HomeVintage", file: "home" }
];

// --- [2. Lifecycle: Initialization] ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Reset Scroll
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
    const logoImg = document.getElementById('mainLogo');
    const themeBtns = document.querySelectorAll('.theme-btn');

    // 3. Theme Recovery
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (logoImg) logoImg.src = "img/logo/savorhappiness-2.png";
        themeBtns.forEach(btn => {
            btn.innerText = "DARK";
            btn.classList.add('active-dark');
        });
    }

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
        lbImg.addEventListener('touchstart', startDragging, {passive: false});
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move, {passive: false});
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

    searchInput?.addEventListener('input', function() {
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
    }

    // 8. AOS Init
    if (typeof AOS !== 'undefined') {
        setTimeout(() => { AOS.init({ duration: 1000, once: true }); }, 100);
    }
});

// --- [3. Core Functions] ---

function renderShops() {
    const minGrid = document.getElementById('minburi-list');
    const nongGrid = document.getElementById('nongchok-list');
    if(!minGrid || !nongGrid) return;
    
    minGrid.innerHTML = ""; nongGrid.innerHTML = "";

    realShops.forEach((shop, shopIdx) => {
        let imgHtml = "";
        for(let i = 0; i < 8; i++) {
            const fullPath = `img/20ResCafe/${shop.folder}/${shop.file}${i}.jpg`;
            imgHtml += `
                <img class="photo-item ${i === 0 ? 'active' : ''}" 
                     src="${fullPath}" 
                     onclick="window.openSimpleLightbox(${i}, ${shopIdx})" 
                     onerror="if (this.src.endsWith('.jpg')) { this.src = this.src.replace('.jpg', '.JPG'); } else { this.style.display='none'; }">
            `;
        }
        const cardHtml = `<div class="shop-card" data-aos="fade-up"><div class="photo-gallery">${imgHtml}</div><div class="shop-info"><div class="shop-name">${shop.name}</div><div class="shop-tag">${shop.zone === 'minburi' ? 'Min Buri' : 'Nong Chok'}</div></div></div>`;
        if(shop.zone === 'minburi') minGrid.insertAdjacentHTML('beforeend', cardHtml);
        else nongGrid.insertAdjacentHTML('beforeend', cardHtml);
    });
    setTimeout(startAutoSlide, 300);
}

function executeSearch() {
    const searchInput = document.getElementById('shopSearchInput');
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase().trim();
    const shopCards = document.querySelectorAll('.shop-card');

    if (query === "") {
        shopCards.forEach(card => { card.style.display = ""; card.style.opacity = "1"; });
        return;
    }

    const navMap = [
        { keywords: ['หนังสือ', 'book', 'guidebook'], target: '#book-feature' },
        { keywords: ['ของที่ระลึก', 'merch', 'sticker'], target: '#merch' },
        { keywords: ['ร้านแนะนำ', 'highlights', 'cafe'], target: '#highlights' },
        { keywords: ['ผู้จัดทำ', 'creator', 'author'], target: '#author' },
        { keywords: ['หน้าแรก', 'home'], target: '#home' }
    ];

    const navMatch = navMap.find(item => item.keywords.some(key => query.includes(key)));
    let firstMatch = null;

    shopCards.forEach(card => {
        const nameText = card.querySelector('.shop-name')?.innerText.toLowerCase() || "";
        const shopData = realShops.find(s => s.name.toLowerCase() === nameText || (s.nameTH && s.nameTH.toLowerCase().includes(query)));
        if (nameText.includes(query) || (shopData && shopData.nameTH.toLowerCase().includes(query))) {
            card.style.display = ""; card.style.opacity = "1";
            if (!firstMatch) firstMatch = card;
        } else { card.style.display = "none"; }
    });

    if (navMatch) { document.querySelector(navMatch.target)?.scrollIntoView({ behavior: 'smooth' }); }
    else if (firstMatch) { firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
}

window.openSimpleLightbox = function(indexOrSrc, shopIdx) {
    if (!lbContainer || !lbImg) {
        lbImg = document.getElementById('lightboxImg');
        lbContainer = document.getElementById('simpleLightbox');
    }
    if (typeof indexOrSrc === 'string' && shopIdx === undefined) {
        currentGallery = [indexOrSrc]; currentImgIdx = 0;
    } else {
        const shop = realShops[shopIdx];
        if (!shop) return;
        currentGallery = [0,1,2,3,4,5,6,7].map(i => `img/20ResCafe/${shop.folder}/${shop.file}${i}.jpg`);
        currentImgIdx = indexOrSrc;
    }
    lbImg.src = currentGallery[currentImgIdx];
    lbImg.classList.remove('zoomed');
    translateX = 0; translateY = 0; lastX = 0; lastY = 0;
    lbImg.style.transform = `translate(0px, 0px) scale(1)`;
    lbContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

window.closeSimpleLightbox = function() {
    if (lbContainer) { lbContainer.style.display = 'none'; document.body.style.overflow = 'auto'; }
};

window.changeImg = function(step) {
    if (!currentGallery.length) return;
    currentImgIdx = (currentImgIdx + step + currentGallery.length) % currentGallery.length;
    if (lbImg) lbImg.src = currentGallery[currentImgIdx];
};

function toggleTheme() {
    const html = document.documentElement;
    const logoImg = document.getElementById('mainLogo');
    const themeBtns = document.querySelectorAll('.theme-btn');
    const isDark = html.getAttribute('data-theme') === 'dark';

    if (!isDark) {
        html.setAttribute('data-theme', 'dark');
        if (logoImg) logoImg.src = "img/logo/savorhappiness-2.png";
        themeBtns.forEach(btn => { btn.innerText = "DARK"; btn.classList.add('active-dark'); });
        localStorage.setItem('theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
        if (logoImg) logoImg.src = "img/logo/savorhappiness-1.png";
        themeBtns.forEach(btn => { btn.innerText = "LIGHT"; btn.classList.remove('active-dark'); });
        localStorage.setItem('theme', 'light');
    }
}

function toggleLang() {
    currentLang = (currentLang === 'th') ? 'en' : 'th';
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) el.innerHTML = translations[currentLang][key];
    });
    const searchInput = document.getElementById('shopSearchInput');
    if (searchInput) searchInput.placeholder = (currentLang === 'th') ? 'ค้นหาร้านค้า หรือเมนู...' : 'Search shops or menu...';
    document.querySelectorAll('.lang-btn').forEach(btn => btn.innerText = currentLang.toUpperCase());
    localStorage.setItem('preferredLang', currentLang);
}

// --- [4. Utilities] ---

function startAutoSlide() {
    document.querySelectorAll('.photo-gallery').forEach(gallery => {
        const images = gallery.querySelectorAll('.photo-item');
        if (images.length <= 1) return;
        let idx = 0;
        setInterval(() => {
            images[idx].classList.remove('active');
            idx = (idx + 1) % images.length;
            images[idx].classList.add('active');
        }, 3000); 
    });
}

function renderTicker() {
    const t1 = document.getElementById('shopTickerInner'), t2 = document.getElementById('shopTickerInnerDup');
    if(!t1 || !t2) return;
    const content = realShops.map(shop => `<div class="ticker-item">${shop.name}</div><div class="ticker-sep">SAVOR HAPPINESS 🍴</div>`).join('');
    t1.innerHTML = content; t2.innerHTML = content;
}

function copyContact() {
    navigator.clipboard.writeText('palmy1983ch@gmail.com').then(() => {
        const btn = document.querySelector('.copy-btn');
        if (btn) {
            const old = btn.innerHTML; btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => btn.innerHTML = old, 2000);
        }
    });
}

window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    let myBar = document.getElementById("myBar");
    if (myBar) myBar.style.width = scrolled + "%";
};

window.changeBookView = function(src, thumb) {
    const mainImg = document.getElementById('mainBookImg');
    if (mainImg) {
        mainImg.src = src;
        document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    }
};

// --- QR Support Functions ---
window.openQRModal = function() {
    const modal = document.getElementById('qrModal');
    if (modal) modal.style.display = 'flex';
};

window.closeQRModal = function() {
    const modal = document.getElementById('qrModal');
    if (modal) modal.style.display = 'none';
};
