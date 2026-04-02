/* ============================================================
    SAVOR HAPPINESS - TOTAL INTEGRATED ENGINE
    Author: Pran (Palm) - Graphic Design SPU
    ============================================================ */

// --- [จุดที่ 1: ประกาศตัวแปรไว้นอกสุด (Global Scope)] ---
let lbImg, lbContainer;
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;
let translateX = 0, translateY = 0, lastX = 0, lastY = 0;
let currentLang = 'th';
var currentGallery = []; 
var currentImgIdx = 0;

// 1. ข้อมูลพื้นฐาน (Language & Shops)
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
        'creator-title': 'ผู้จัดทำ'
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
        'creator-title': 'Creator'
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

// --- [ส่วนที่ 2: ระบบ Lightbox (ตัวเดียวจบ รองรับทั้ง 1 และ 2 arguments)] ---
window.openSimpleLightbox = function(indexOrSrc, shopIdx) {
    if (!lbContainer || !lbImg) {
        lbImg = document.getElementById('lightboxImg');
        lbContainer = document.getElementById('simpleLightbox');
    }
    if (!lbContainer || !lbImg) return;

    if (typeof indexOrSrc === 'string' && shopIdx === undefined) {
        // จากรูปเล่มหนังสือ
        currentGallery = [indexOrSrc];
        currentImgIdx = 0;
    } else {
        // จากร้านคาเฟ่
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
    if (lbContainer) {
        lbContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

window.changeImg = function(step) {
    if (!currentGallery || currentGallery.length === 0) return;
    currentImgIdx += step;
    if (currentImgIdx >= currentGallery.length) currentImgIdx = 0;
    if (currentImgIdx < 0) currentImgIdx = currentGallery.length - 1;
    if (lbImg) lbImg.src = currentGallery[currentImgIdx];
};

// --- ส่วนที่ 4: ฟังก์ชัน Render Shops ---
function renderShops() {
    const minGrid = document.getElementById('minburi-list');
    const nongGrid = document.getElementById('nongchok-list');
    if(!minGrid || !nongGrid) return;
    
    minGrid.innerHTML = ""; 
    nongGrid.innerHTML = "";

    realShops.forEach((shop, shopIdx) => {
        let imgHtml = "";
        for(let i = 0; i < 8; i++) {
            const fullPath = `img/20ResCafe/${shop.folder}/${shop.file}${i}.jpg`;
            imgHtml += `
                <img class="photo-item ${i === 0 ? 'active' : ''}" 
                     src="${fullPath}" 
                     onclick="window.openSimpleLightbox(${i}, ${shopIdx})" 
                     onerror="this.style.display='none';">
            `;
        }

        const cardHtml = `
            <div class="shop-card" data-aos="fade-up">
                <div class="photo-gallery">${imgHtml}</div>
                <div class="shop-info">
                    <div class="shop-name">${shop.name}</div>
                    <div class="shop-tag">${shop.zone === 'minburi' ? 'Min Buri' : 'Nong Chok'}</div>
                </div>
            </div>`;

        if(shop.zone === 'minburi') minGrid.insertAdjacentHTML('beforeend', cardHtml);
        else nongGrid.insertAdjacentHTML('beforeend', cardHtml);
    });
    setTimeout(startAutoSlide, 300);
}

// 2. ระบบค้นหาและวาร์ป (เวอร์ชันแก้ไขให้วาร์ปไปเมนูได้)
function executeSearch() {
    const searchInput = document.getElementById('shopSearchInput');
    const suggestionBox = document.getElementById('searchSuggestions');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();
    const shopCards = document.querySelectorAll('.shop-card');

    // 1. แผนผังคำค้นหาสำหรับวาร์ปไปตาม Section ต่างๆ
    const navMap = [
        { keywords: ['หนังสือ', 'book', 'guidebook', 'เล่ม'], target: '#book-feature' },
        { keywords: ['ของที่ระลึก', 'merch', 'sticker', 'สติ๊กเกอร์'], target: '#merch' },
        { keywords: ['ร้านแนะนำ', 'highlights', 'cafe', 'คาเฟ่'], target: '#highlights' },
        { keywords: ['ผู้จัดทำ', 'creator', 'author', 'ปาล์ม', 'palm', 'ปรานต์'], target: '#author' },
        { keywords: ['หน้าแรก', 'home', 'top'], target: '#home' }
    ];

    if (query === "") {
        shopCards.forEach(card => { card.style.display = ""; card.style.opacity = "1"; });
        return;
    }

    // 2. ตรวจสอบว่าตรงกับเมนู (Section) ไหนไหม
    const navMatch = navMap.find(item => item.keywords.some(key => query.includes(key)));

    // 3. ค้นหาร้านค้า (Shops)
    let firstMatch = null;
    let foundAnyShop = false;

    shopCards.forEach(card => {
        const shopNameText = card.querySelector('.shop-name')?.innerText.toLowerCase() || "";
        // หาข้อมูลจาก realShops มาเทียบชื่อภาษาไทยด้วย
        const shopData = realShops.find(s => s.name.toLowerCase() === shopNameText || (s.nameTH && s.nameTH.toLowerCase().includes(query)));
        
        if (shopNameText.includes(query) || (shopData && shopData.nameTH.toLowerCase().includes(query))) {
            card.style.display = ""; 
            card.style.opacity = "1";
            foundAnyShop = true;
            if (!firstMatch) firstMatch = card;
        } else { 
            card.style.display = "none"; 
        }
    });

    // 4. ตัดสินใจว่าจะวาร์ปไปไหน
    if (navMatch) {
        // ถ้าเจอคำที่ตรงกับ Menu ให้วาร์ปไป Section นั้นก่อน (เช่น ผู้จัดทำ)
        const targetSection = document.querySelector(navMatch.target);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else if (firstMatch) {
        // ถ้าไม่เจอเมนู แต่เจอร้านค้า ให้วาร์ปไปที่ร้านแรกที่เจอ
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (suggestionBox) suggestionBox.style.display = "none";
}

// 3. ระบบจัดการ UI (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    if (history.scrollRestoration) { history.scrollRestoration = 'manual'; }
    window.scrollTo(0, 0);

    lbImg = document.getElementById('lightboxImg');
    lbContainer = document.getElementById('simpleLightbox');
    const searchInput = document.getElementById('shopSearchInput');
    const suggestionBox = document.getElementById('searchSuggestions');
    const hamBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navLinks');
    const icon = document.querySelector('#hamburgerBtn i');

    renderShops();
    renderTicker();

    // Logic จิก-ลาก-ซูม
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
            e.preventDefault();
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

    // ระบบ Suggestion
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

// [4] ระบบ Hamburger Menu (เปิด-ปิด และ หุบเมื่อคลิกเลือก)
    if (hamBtn && navMenu) {
        // เมื่อกดปุ่มเบอร์เกอร์ (สามขีด)
        hamBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('active');
            // สลับไอคอนระหว่าง สามขีด กับ กากบาท
            if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        });

        // จิกหัว "ทุกลิงก์" และ "ทุกปุ่ม" ในแผ่นเมนู
        // พอโดนจิ้มปุ๊บ ให้สั่งหุบแผ่นเมนูทันที
        const menuItems = navMenu.querySelectorAll('a, .lang-btn, .theme-btn');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active'); // หุบแผ่นเมนู
                if (icon) icon.className = 'fas fa-bars'; // คืนค่าไอคอนเป็นสามขีด
            });
        });

        // แถม: คลิกพื้นที่ว่างๆ ข้างนอกเมนู ก็ให้หุบด้วย (UX จะได้เนียนๆ)
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }

    if (typeof AOS !== 'undefined') {
        setTimeout(() => { AOS.init({ duration: 1000, once: true }); }, 100);
    }
}); // ปิดท้าย DOMContentLoaded

// --- 1. ฟังก์ชันสลับโหมด (Optimized for New Structure) ---
function toggleTheme() {
    const html = document.documentElement;
    const logoImg = document.getElementById('mainLogo');
    const themeBtns = document.querySelectorAll('.theme-btn'); // ดึงทุกปุ่มที่มี Class นี้
    
    // เช็กสถานะจาก Attribute ของ HTML (แม่นยำกว่าเช็กจาก Text)
    const isDark = html.getAttribute('data-theme') === 'dark';

    if (!isDark) {
        // --- เปลี่ยนเป็น DARK ---
        html.setAttribute('data-theme', 'dark');
        if (logoImg) logoImg.src = "img/logo/savorhappiness-2.png"; 
        
        themeBtns.forEach(btn => {
            btn.innerText = "DARK";
            btn.classList.add('active-dark'); // เผื่อพี่ปาล์มอยากแต่ง CSS ปุ่มตอนเป็น Dark
        });
        
        localStorage.setItem('theme', 'dark');
    } else {
        // --- กลับเป็น LIGHT ---
        html.removeAttribute('data-theme');
        if (logoImg) logoImg.src = "img/logo/savorhappiness-1.png";
        
        themeBtns.forEach(btn => {
            btn.innerText = "LIGHT";
            btn.classList.remove('active-dark');
        });
        
        localStorage.setItem('theme', 'light');
    }
}

// --- 2. ระบบเช็กค่าเดิม (Auto-Sync on Load) ---
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    const logoImg = document.getElementById('mainLogo');
    const themeBtns = document.querySelectorAll('.theme-btn');

    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        if (logoImg) logoImg.src = "img/logo/savorhappiness-2.png";
        
        themeBtns.forEach(btn => {
            btn.innerText = "DARK";
            btn.classList.add('active-dark');
            // ตัวอย่าง: ถ้าพี่อยากเปลี่ยนสีปุ่มทันที
            btn.style.backgroundColor = "var(--author-orange)"; 
            btn.style.color = "#fff";
        });
    }
});

function toggleLang() {
    // 1. สลับค่าภาษา
    currentLang = (currentLang === 'th') ? 'en' : 'th';
    
    // 2. อัปเดต Text (data-key)
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    // 4. อัปเดต Title/Tooltip
    document.querySelectorAll('[data-title-key]').forEach(el => {
        const key = el.getAttribute('data-title-key');
        if (translations[currentLang][key]) {
            el.title = translations[currentLang][key];
        }
    });

// --- [ส่วนที่แก้: เพื่อให้เปลี่ยนทุกปุ่มที่มีคลาส .lang-btn] ---

// 5. อัปเดตปุ่มภาษา (จัดการทุกปุ่มที่มี class .lang-btn)
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(btn => {
    // เปลี่ยนตัวหนังสือเป็นภาษาปัจจุบัน (TH หรือ EN)
    btn.innerHTML = currentLang.toUpperCase();
});

    // 6. บันทึกค่า
    localStorage.setItem('preferredLang', currentLang);
    
    console.log(`Language switched to: ${currentLang.toUpperCase()}`);
}


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

window.changeBookView = function(src, thumb) {
    const mainImg = document.getElementById('mainBookImg');
    if (mainImg) {
        mainImg.src = src;
        document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    }
};

window.onscroll = function() { updateProgressBar() };

function updateProgressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

function closeMenu() {
    const navMenu = document.querySelector('.nav-menu'); 
    if (navMenu) { navMenu.classList.remove('active'); }
}
