/* ============================================================
   SAVOR HAPPINESS - MASTER INTEGRATED ENGINE (PRO-RESTORED)
   Consolidated UI Logic | Pop & Clean Aesthetic | Pro-Clean Structure
   Target: 1,200 - 1,500 Lines (Stability & Completion Priority)
   ============================================================ */

/* [1] FONTS & MASTER VARIABLES */
@font-face {
    font-family: 'NangKaiThot';
    src: url('fonts/MN-Nang-Kai-Thot-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

:root {
    --ci-green: #007A33;
    --ci-olive: #93a35a;
    --ci-orange: #FF8C00;
    --ci-yellow: #f4e105;
    --ci-soft-yellow: #fffbd3;
    --ci-cream: #f8f2e6;
    --ci-white: #ffffff;
    --savor-dark: #333333;

    --bg-main: var(--ci-cream);
    --bg-nav: var(--ci-cream);
    /* Light Mode: Clean Cream Nav */
    --bg-card: var(--ci-white);
    --text-main: #333333;
    --text-nav: var(--ci-green);
    /* Light Mode: Green Links on Cream Nav */
}

[data-theme="dark"] {
    --bg-main: linear-gradient(160deg, #93a35a 0%, #7d8a4d 100%);
    --bg-nav: var(--ci-green);
    /* Dark Mode: Cinematic Green Nav */
    --bg-card: #ffffff;
    --text-main: #ffffff;
    --text-nav: #ffffff;
    /* Dark Mode: White Links on Green Nav */
}

[data-theme="dark"] body {
    background: var(--bg-main) fixed !important;
}

/* Logo Toggling Logic (User Specific Mapping & High Specificity) */
.logo .logo-light,
.logo .logo-dark {
    display: none;
    height: 52px;
    width: auto;
    object-fit: contain;
    margin: 0 auto;
}

/* Light Mode: Show White Logo (savorhappiness-2) on Cream Nav */
.logo .logo-light {
    display: block !important;
}

/* Dark Mode: Show Black-Strip Logo (savorhappiness-1) on Green Nav */
[data-theme="dark"] .logo .logo-light {
    display: none !important;
}

[data-theme="dark"] .logo .logo-dark {
    display: block !important;
}

.logo img {
    height: 50px;
    width: auto;
    object-fit: contain;
    padding: 5px 0;
}

/* [2] GLOBAL RESET & SECURITY */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'NangKaiThot', 'Anuphan', sans-serif;
    -webkit-font-smoothing: antialiased;
}

html,
body {
    width: 100%;
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden;
    background: var(--bg-main);
    color: var(--text-main);
    line-height: 1.6;
    scroll-behavior: smooth;
    scroll-padding-top: 85px;
    transition: background 0.3s ease;
}

body {
    padding-top: 85px;
    /* Master Padding for Fixed Nav */
}

img,
video {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    -webkit-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
}

a {
    text-decoration: none;
    color: inherit;
    transition: 0.3s;
}

a:hover {
    color: var(--ci-green);
}

/* [3] UI COMPONENTS: NAV BAR & PROGRESS */
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    background: var(--bg-nav);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    height: 90px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 2.5px solid var(--ci-orange);
}

.logo img {
    height: 52px;
    /* Precision Thesis Alignment */
    width: auto;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: block;
}

.nav-links a {
    color: var(--ci-green) !important;
    /* Explicit Light Mode Color */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    font-size: 0.95rem;
    transition: 0.3s;
}

[data-theme="dark"] .nav-links a {
    color: #ffffff !important;
    /* Explicit Dark Mode Color */
}

.nav-links a:hover {
    color: var(--ci-orange);
}

.nav-links {
    display: flex;
    gap: 25px;
    align-items: center;
}

/* Links are already handled by the Master Sync block in [3] */

.nav-controls-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
}

/* Branded Toggles (EN/TH & LIGHT/DARK) */
.lang-btn,
.theme-btn {
    width: 65px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-weight: 850;
    /* Ultra-Bold for Branding */
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1.5px solid rgba(255, 255, 255, 0.3);
}

/* Light Mode Specifics (Cream Nav Context) */
html:not([data-theme="dark"]) .lang-btn:not(.active),
html:not([data-theme="dark"]) .theme-btn:not(.active) {
    background: rgba(0, 122, 51, 0.05);
    color: var(--ci-green);
    /* Brand Green text on Cream */
    border-color: rgba(0, 122, 51, 0.3);
}

html:not([data-theme="dark"]) .active {
    background: var(--ci-orange);
    color: #fff !important;
    border-color: var(--ci-orange);
}

/* Dark Mode Specifics (Olive Context) */
[data-theme="dark"] .lang-btn:not(.active),
[data-theme="dark"] .theme-btn:not(.active) {
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.4);
}

/* [ACTIVE STATE] - Branded Orange */
.lang-btn.active,
.theme-btn.active,
.theme-btn.active-dark {
    background: var(--ci-orange) !important;
    border-color: var(--ci-orange) !important;
    color: #fff !important;
    box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
    transform: translateY(-1px);
}

.lang-btn:hover,
.theme-btn:hover {
    border-color: var(--ci-yellow);
    transform: scale(1.05);
}

/* Scroll Progress */
.scroll-progress-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    z-index: 10001;
    pointer-events: none;
}

.progress-bar {
    height: 100%;
    background: var(--ci-orange);
    width: 0%;
    box-shadow: 0 0 10px rgba(255, 140, 0, 0.5);
    transition: width 0.1s;
}

/* Hamburger */
.hamburger-menu {
    display: none;
    font-size: 28px;
    color: var(--ci-green);
    cursor: pointer;
    z-index: 10002;
}

/* [4] HERO SECTION & SEARCH */
#home {
    min-height: 100vh;
    height: calc(100vh - 85px);
    width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
}

.hero-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
}

.grid-item {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.4);
    transition: 0.8s;
}

.grid-item:hover img {
    filter: brightness(0.7);
    transform: scale(1.1);
}

.hero-content-overlay {
    position: relative;
    z-index: 10;
    text-align: center;
    color: white;
    padding: 60px 20px;
    max-width: 1000px;
    width: 100%;
}

#home h1 {
    font-size: clamp(2.4rem, 9vw, 5rem);
    font-weight: 900;
    margin-bottom: 15px;
    text-transform: uppercase;
    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    letter-spacing: 3px;
    line-height: 0.95;
}

.subtitle-vibe {
    font-size: clamp(0.9rem, 4.5vw, 1.5rem);
    letter-spacing: 6px;
    color: var(--ci-orange);
    margin-bottom: 20px;
    font-weight: 500;
}

.hero-desc {
    font-size: clamp(0.85rem, 3vw, 1.15rem);
    margin-bottom: 30px;
    color: rgba(255, 255, 255, 0.9);
    max-width: 650px;
    margin-inline: auto;
}

/* Search Wrapper (Luxury Design) */
.search-wrapper {
    max-width: 850px;
    margin: 110px auto 50px !important;
    /* Perfect Breathing Room (Luxury Gap) */
    padding: 0 20px;
    position: relative;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Horizontally centers the search input group */
}

.search-input-group {
    display: flex;
    align-items: center;
    width: 100%;
    /* Ensure it spans the wrapper but remains centered */
    background: #fff;
    border-radius: 16px;
    padding: 10px 10px 10px 30px;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.4);
    transition: 0.3s;
}

.search-input-group:focus-within {
    transform: translateY(-2px);
    border-color: var(--ci-orange);
    box-shadow: 0 20px 50px rgba(255, 140, 0, 0.2);
}

#shopSearchInput {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1.1rem;
    color: #333;
    background: transparent;
    font-weight: 500;
}

#shopSearchInput::placeholder {
    color: #bbb;
}

#searchBtn {
    background: var(--ci-green) !important;
    color: #fff !important;
    border: none;
    padding: 14px 35px;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
}

#searchBtn:hover {
    background: var(--ci-orange) !important;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 140, 0, 0.3);
}

#searchSuggestions {
    position: absolute;
    top: calc(100% + 15px);
    left: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(25px) saturate(180%);
    border-radius: 20px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.4);
    z-index: 1001;
    display: none;
    overflow: hidden;
    animation: slideUp 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.suggestion-item {
    padding: 18px 25px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.02);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;
    color: #444;
    font-weight: 500;
    transition: 0.3s;
}

.suggestion-item:last-child {
    border-bottom: none;
}

.suggestion-item:hover {
    background: #fdfaf5;
    color: var(--ci-green);
    padding-left: 35px;
    /* Master Slider Trick */
    border-left: 5px solid var(--ci-green);
}

.suggestion-item i {
    color: var(--ci-orange);
    font-size: 1.1rem;
}

/* Dark Mode Fix for Search (Since suggestion box is always light/white) */
[data-theme="dark"] .suggestion-item {
    color: #333 !important;
}

/* [5] ATMOSPHERE (VIDEO EXPERIENCE) */
.video-experience-v2 {
    padding: 100px 0;
    background: var(--bg-main);
}

.video-flex-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 1400px;
    margin: 0 auto;
    gap: 50px;
    padding: 0 5%;
}

.video-visual-side {
    width: 100%;
    max-width: 900px;
    position: relative;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.1);
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.video-visual-side:hover {
    transform: scale(1.02);
    box-shadow: 0 35px 80px var(--savor-shadow);
}

.video-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
}

#myVideo {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.video-text-side {
    width: 100%;
    max-width: 850px;
    display: flex;
    justify-content: center;
}

.video-content-box {
    background: #fff;
    padding: 50px 60px;
    border-radius: 40px;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.02);
    width: 100%;
}

.video-tag {
    display: inline-block;
    color: var(--ci-orange);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 25px;
    font-size: 0.9rem;
}

.video-description p {
    color: #444;
    line-height: 1.8;
    font-size: 1.15rem;
}

.mute-control-btn {
    position: absolute;
    bottom: 25px;
    right: 25px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
}

/* [6] GUIDEBOOK SECTION */
.section {
    padding: 100px 5%;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
}

.section-title {
    margin-bottom: 60px;
    text-align: center;
    font-size: 2.4rem;
    color: var(--ci-green);
    font-weight: 800;
}

.section-title::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: var(--ci-orange);
    margin: 15px auto 0;
    border-radius: 2px;
}

.book-grid-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
}

.book-visual {
    flex: 1;
    min-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.inner-mockup {
    width: 100%;
    max-width: 500px;
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    cursor: zoom-in;
    transition: 0.4s;
}

.book-thumbs {
    display: flex;
    justify-content: center;
    gap: 15px;
    width: 100%;
    margin-top: 30px;
}

.thumb-item {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: 0.3s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.thumb-item.active {
    border-color: var(--ci-green);
    transform: translateY(-3px);
}

.book-text {
    flex: 1;
    min-width: 350px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.book-card {
    background: #fff !important;
    padding: 50px 60px !important;
    border-radius: 24px !important;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06) !important;
    border: 1px solid #f0f0f0 !important;
    max-width: 850px;
    width: 100%;
}

.book-badge-row {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 25px;
}

.badge {
    background: var(--ci-soft-yellow) !important;
    color: var(--ci-green) !important;
    padding: 6px 18px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 700;
}

.book-spec-detail {
    color: var(--ci-orange) !important;
    font-weight: 800;
    letter-spacing: 1.5px;
    margin-bottom: 15px;
    text-transform: uppercase;
}

.book-description {
    line-height: 1.8;
    margin-bottom: 35px;
    color: #555;
    font-size: 1.1rem;
}

/* Buttons */
.btn-group {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: var(--ci-green) !important;
    color: #fff !important;
    padding: 16px 35px;
    border-radius: 12px;
    font-weight: 700;
    transition: 0.3s;
    box-shadow: 0 5px 15px rgba(0, 122, 51, 0.2);
    animation: pulse-green 2s infinite;
}

.btn-primary:hover {
    background: #005c26 !important;
    transform: scale(1.03);
}

@keyframes pulse-green {
    0% {
        box-shadow: 0 0 0 0 rgba(0, 122, 51, 0.4);
    }

    70% {
        box-shadow: 0 0 0 15px rgba(0, 122, 51, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(0, 122, 51, 0);
    }
}

/* [7] DISTRICT LABELS & ACCENTS */
.district-label {
    margin: 80px auto 40px;
    font-size: clamp(1.4rem, 4vw, 1.8rem);
    font-weight: 800;
    color: var(--ci-orange);
    letter-spacing: 3px;
    text-align: center;
    text-transform: uppercase;
    background: #fff;
    border: 2px solid var(--ci-green);
    padding: 15px 40px;
    border-radius: 50px;
    width: fit-content;
    box-shadow: 0 8px 25px rgba(0, 122, 51, 0.1);
    transition: 0.3s;
}

[data-theme="dark"] .district-label {
    background: var(--ci-soft-yellow);
    border-color: #fff;
}

/* [8] MERCH & TICKER SYSTEM */
.shop-ticker-banner {
    background: #fff;
    border-block: 2px solid var(--ci-orange);
    padding: 18px 0;
    overflow: hidden;
    margin: 60px 0;
    display: flex;
    align-items: center;
}

.video-visual-side {
    width: 100%;
    max-width: 900px;
    /* Cinematic Width */
    position: relative;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.1);
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.video-visual-side:hover {
    transform: scale(1.02);
    box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
}

.video-text-side {
    width: 100%;
    max-width: 750px;
    /* Balanced Card Width */
    display: flex;
    justify-content: center;
}

.video-content-box {
    background: #fff;
    padding: 50px 40px;
    border-radius: 40px;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.04);
    width: 100%;
}

.video-tag {
    display: inline-block;
    color: var(--ci-orange);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 20px;
    font-size: 0.9rem;
}

/* Unified Video Styling (Consolidated) */
.video-content-box .section-title {
    margin-bottom: 25px;
    color: var(--ci-green) !important;
}

.video-description p {
    color: #444;
    line-height: 1.8;
}

.shop-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 50px !important;
    width: 100% !important;
    max-width: 1200px !important;
    margin: 60px auto !important;
    padding: 0 40px;
}

.shop-card {
    background: #fff;
    border-radius: 35px;
    overflow: hidden;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.05);
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.02);
}

.shop-card:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 60px rgba(0, 122, 51, 0.15);
}

.photo-gallery {
    height: 380px;
    overflow: hidden;
    position: relative;
    background: #f9f9f9;
}

.photo-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 1s ease;
    cursor: pointer;
}

.photo-item.active {
    opacity: 1;
    z-index: 2;
}

.shop-info {
    padding: 35px 30px;
    text-align: center;
}

.shop-name {
    font-weight: 900;
    color: var(--ci-green);
    font-size: 1.5rem;
    margin-bottom: 12px;
}

.shop-tag {
    color: var(--ci-orange);
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 1px;
}

/* [8] MERCH & TICKER */
.shop-ticker-banner {
    background: #fff;
    border-block: 1px solid rgba(0, 122, 51, 0.1);
    padding: 15px 0;
    overflow: hidden;
    margin: 40px 0;
    display: flex;
    align-items: center;
}

.shop-ticker-track {
    display: flex;
    white-space: nowrap;
    animation: tickerRight 40s linear infinite;
}

@keyframes tickerRight {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0%);
    }
}

.ticker-item {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--ci-green);
    padding: 0 30px;
}

.ticker-sep {
    color: var(--ci-orange);
    font-weight: 800;
    margin: 0 10px;
}

.merch-category {
    margin-bottom: 60px;
}

.merch-sub-title {
    margin: 40px auto 30px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Symmetry Centering */
    gap: 15px;
    font-size: 1.4rem;
    font-weight: bold;
    color: var(--savor-dark);
    position: relative;
    padding-bottom: 15px;
}

.merch-sub-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: var(--ci-orange);
    border-radius: 2px;
}

.merch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    justify-content: center;
    place-items: center;
}

.merch-grid.bookmark-triple-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    /* Force 3 columns for Split Row */
    gap: 12px !important;
    width: 100%;
}

.merch-card {
    background: #fff;
    padding: 15px;
    /* Compact padding for split layout */
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    transition: 0.3s;
    width: 100%;
}

.merch-card:hover {
    transform: translateY(-8px);
}

.merch-card img {
    border-radius: 12px;
    margin-bottom: 20px;
    transition: 0.3s;
    width: 100%;
    object-fit: cover;
}

.merch-card img:hover {
    transform: scale(1.05);
}

.merch-card p {
    font-weight: 700;
    color: var(--ci-green);
}

.sticker-side .merch-card {
    max-width: 280px;
    /* Normalized size to prevent "Luk" (Clutter) */
}

.sticker-side .merch-card img {
    max-height: 280px;
    /* Vertical Balance Locked */
    object-position: top;
}

/* Split Row Container */
.merch-split-row {
    display: flex;
    gap: 40px;
    align-items: flex-start;
    justify-content: center;
    margin: 40px auto 0;
    max-width: 1200px;
}

.sticker-side,
.bookmarks-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* [9] AUTHOR SECTION (ULTIMATE) */
.author-centering-wrapper {
    padding: 100px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.author-layout-card {
    background: #fff;
    border-radius: 50px;
    width: 100%;
    max-width: 960px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.03);
    transition: 0.4s;
}

.author-layout-card:hover {
    transform: translateY(-8px);
}

.author-visual-side {
    flex: 0 0 380px;
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #f0f0f0;
    background: linear-gradient(to bottom, #fff, #fafafa);
}

.author-profile-pic {
    width: 240px;
    height: 240px;
    border-radius: 45px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.author-profile-pic img {
    transition: 0.6s;
}

.author-profile-pic:hover img {
    transform: scale(1.1);
}

.author-logos-grid {
    display: flex;
    gap: 20px;
    justify-content: center;
    padding-top: 25px;
    border-top: 1px dashed #ddd;
    width: 80%;
}

.logo-box {
    background: #ffffff !important;
    border-radius: 12px;
    width: 60px;
    height: 60px;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.logo-box img {
    height: 32px !important;
    filter: grayscale(100%) !important;
    opacity: 0.7 !important;
    transition: 0.4s;
    visibility: visible !important;
    display: block !important;
    object-fit: contain !important;
}

.logo-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
}

.logo-box:hover img {
    filter: none !important;
    opacity: 1 !important;
    transform: scale(1.1);
}

.author-content-side {
    flex: 1;
    padding: 60px 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.author-name {
    color: var(--ci-green) !important;
    font-size: 32px !important;
    font-weight: 850;
    margin-bottom: 10px !important;
}

.author-title {
    color: #007A33 !important;
    font-size: 16px !important;
    margin-bottom: 40px !important;
}

.author-contact-grid {
    border-top: 1px solid #eee;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
}

.contact-box {
    display: flex;
    align-items: center;
    gap: 18px;
    width: 280px;
    padding: 12px 20px;
    border-radius: 15px;
    color: #444;
    font-weight: 600;
}

.contact-box:hover {
    background: #f8f8f8;
    transform: translateX(5px);
}

.contact-box i {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--ci-orange), #ffb800);
    color: #fff !important;
    border-radius: 12px;
    font-size: 16px;
    box-shadow: 0 4px 10px rgba(255, 140, 0, 0.3);
}

/* [10] OVERLAY COMPONENTS (MODAL, DIAL, LIGHTBOX) */
/* QR Modal */
.qr-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    z-index: 20000;
    align-items: center;
    justify-content: center;
}

.qr-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    border-radius: 30px;
    padding: 40px;
    text-align: center;
    position: relative;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
}

.qr-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
    color: #888;
}

.qr-header h3 {
    color: var(--ci-green);
    font-size: 1.8rem;
    margin-bottom: 5px;
}

.qr-placeholder {
    background: #fff !important;
    padding: 20px;
    border-radius: 20px;
    margin: 0 auto 25px;
    /* Perfect Centering */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    max-width: 280px;
    /* Precision Fit */
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.qr-image {
    width: 100%;
    border-radius: 10px;
}

.qr-footer p {
    color: var(--ci-orange);
    font-weight: 700;
    font-size: 1.1rem;
}

.support-desc {
    max-width: 600px;
    margin: 0 auto 35px !important;
    text-align: center;
    color: #666;
    line-height: 1.8;
    /* Increased breathing room */
    letter-spacing: 0.02em;
}

.support-container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.support-card {
    background: linear-gradient(145deg, #FFFBFA 0%, #FFFFFF 100%) !important;
    border: 1px solid rgba(0, 0, 0, 0.03) !important;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05), inset 0 0 15px rgba(255, 255, 255, 0.8) !important;
    padding: 60px 40px !important;
    border-radius: 40px !important;
    max-width: 850px !important;
}

.btn-support-cta {
    background: linear-gradient(135deg, var(--ci-green) 0%, #008B4E 100%) !important;
    border: none !important;
    border-radius: 50px !important;
    /* Premium Pill-shape */
    padding: 18px 50px !important;
    font-weight: 700 !important;
    letter-spacing: 0.05em !important;
    color: #fff !important;
    box-shadow: 0 10px 25px rgba(0, 168, 89, 0.25) !important;
    /* Floating Glow Shadow */
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
}

.btn-support-cta:hover {
    transform: scale(1.06) translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 168, 89, 0.4) !important;
    /* Enhanced Hover Glow */
    background: linear-gradient(135deg, #00B962 0%, var(--ci-green) 100%) !important;
}

.btn-support-cta i {
    font-size: 1.2rem;
}

/* Speed Dial */
.speed-dial-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 15px;
}

.speed-dial-main-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--ci-yellow) !important;
    border: 3px solid #fff;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.speed-dial-main-btn img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: absolute;
    transition: 0.4s;
}

.img-active {
    opacity: 0;
    transform: scale(0.5);
}

.speed-dial-container.active .speed-dial-main-btn {
    transform: rotate(15deg) scale(1.1);
    background: var(--ci-orange) !important;
}

.speed-dial-container.active .img-normal {
    opacity: 0;
    transform: scale(0.5);
}

.speed-dial-container.active .img-active {
    opacity: 1;
    transform: scale(1);
}

.speed-dial-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    opacity: 0;
    transform: translateY(30px) scale(0.5);
    transition: 0.4s;
    pointer-events: none;
}

.speed-dial-container.active .speed-dial-buttons {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
}

.dial-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    font-size: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
}

.dial-btn:hover {
    transform: scale(1.15);
}

.phone-btn {
    background: #FFD54F;
}

.line-btn {
    background: #66BB6A;
}

.copy-btn {
    background: #FFCA28;
}

/* Lightbox */
.lightbox-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 20001;
    cursor: zoom-out;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(8px);
}

.lightbox-content {
    max-width: 90%;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    animation: zoomIn 0.3s;
}

@keyframes zoomIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* [11] CONSOLIDATED RESPONSIVE ENGINE */
/* SAFE ZONE (1025px - 1180px) */
@media (min-width: 1025px) and (max-width: 1180px) {
    .nav-links {
        gap: 15px;
    }

    .nav-links a {
        font-size: 0.95rem;
    }

    nav {
        padding: 0 20px;
    }
}

/* TABLET (MAX 1024px) */
@media screen and (max-width: 1024px) {
    body {
        padding-top: 70px;
    }

    nav {
        height: 70px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* Forced Vertical Symmetry */
    }

    .hamburger-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        /* Standard Tap Target */
        width: 40px;
        cursor: pointer;
        z-index: 10002;
    }

    .hamburger-menu i {
        color: var(--ci-green);
        /* Light Mode: Green on Cream */
        font-size: 1.6rem;
        transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    [data-theme="dark"] .hamburger-menu i {
        color: var(--ci-orange) !important;
        /* Dark Mode: Contrast King (#FF8C00) */
        text-shadow: 0 0 10px rgba(255, 140, 0, 0.3);
    }

    .nav-links {
        display: none;
        position: fixed;
        top: 70px;
        /* Align to Nav Height: DO NOT COVER LOGO */
        right: -100%;
        width: 100%;
        /* Full screen for Thesis-A quality */
        height: calc(100vh - 70px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 35px;
        z-index: 10001;
        transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(15px);
        box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
    }

    .nav-links.active {
        display: flex;
        right: 0;
        transform: translateX(0);
    }

    [data-theme="dark"] .nav-links {
        background: var(--ci-green);
    }

    html:not([data-theme="dark"]) .nav-links a {
        color: var(--ci-green);
        font-weight: 700;
    }

    .nav-links .nav-controls-wrapper {
        display: flex;
        margin-top: 20px;
        gap: 15px;
    }

    .nav-links .lang-btn,
    .nav-links .theme-btn {
        width: 110px;
        height: 45px;
        border-radius: 12px;
        font-size: 0.9rem;
    }

    .author-layout-card {
        flex-direction: column !important;
        width: 95% !important;
        border-radius: 40px;
    }

    .author-visual-side {
        border-right: none;
        border-bottom: 1px solid #eee;
        width: 100%;
        padding: 50px 20px;
    }

    .author-content-side {
        padding: 50px 30px;
    }

    .video-flex-container {
        flex-direction: column;
    }

    .video-content-box {
        padding: 35px 20px;
        margin-inline: 15px;
        width: auto;
    }
}

/* MOBILE (MAX 768px) */
@media screen and (max-width: 768px) {
    .section {
        padding: 60px 5%;
    }

    .section-title {
        font-size: 1.8rem;
        margin-bottom: 40px;
    }

    .hero-grid {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(5, 1fr);
    }

    .book-card {
        padding: 35px 25px;
        margin: 20px 15px;
        width: auto;
    }

    .book-description {
        font-size: 0.95rem;
    }

    .btn-primary {
        width: 100%;
    }

    .shop-grid {
        grid-template-columns: 1fr !important;
        gap: 20px;
    }

    .merch-grid.bookmark-triple-grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }

    .merch-split-row {
        flex-direction: column;
        gap: 30px;
    }

    .sticker-side,
    .bookmarks-side {
        width: 100%;
    }

    .speed-dial-container {
        bottom: 20px;
        right: 20px;
    }
}

/* SMALL MOBILE (MAX 400px) */
@media screen and (max-width: 400px) {
    #home h1 {
        font-size: 2rem;
    }

    .merch-grid.bookmark-triple-grid {
        grid-template-columns: 1fr !important;
    }

    .thumb-item {
        width: 60px;
        height: 60px;
    }
}

/* LANDSCAPE FIX */
@media screen and (max-height: 600px) and (orientation: landscape) {
    nav {
        height: 60px;
    }

    body,
    .scroll-progress-container {
        padding-top: 60px;
        top: 60px;
    }

    .hero-content-overlay {
        padding-top: 30px;
    }

    .hero-grid {
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
}

/* DARK MODE FINAL OVERRIDES */
[data-theme="dark"] .section-title {
    color: #fff;
}

[data-theme="dark"] .book-card,
[data-theme="dark"] .video-content-box {
    background: #fff !important;
}

[data-theme="dark"] .book-text h2,
[data-theme="dark"] .book-description,
[data-theme="dark"] .video-description p {
    color: #333 !important;
}

[data-theme="dark"] .suggestion-item {
    color: #333 !important;
}

/* Restore search visibility in dark mode */
[data-theme="dark"] footer {
    background: #fff;
}

[data-theme="dark"] footer p {
    color: #888 !important;
}

/* [Dark Mode Mastery Overrides] */
[data-theme="dark"] .video-content-box {
    background: var(--ci-soft-yellow) !important;
    box-shadow: 0 20px 40px rgba(0, 122, 51, 0.15) !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .video-tag {
    color: #fff !important;
    background: var(--ci-orange);
    padding: 4px 12px;
    border-radius: 10px;
}

[data-theme="dark"] .merch-card {
    background: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 122, 51, 0.1) !important;
}

[data-theme="dark"] .merch-card:hover {
    box-shadow: 0 15px 40px rgba(255, 140, 0, 0.25) !important;
    /* Orange Highlight Hover */
}

[data-theme="dark"] .video-content-box .section-title,
[data-theme="dark"] .book-card .section-title,
[data-theme="dark"] .support-card .section-title {
    color: var(--ci-green) !important;
}

[data-theme="dark"] .video-description p,
[data-theme="dark"] .book-description,
[data-theme="dark"] .support-desc {
    color: #333 !important;
}

[data-theme="dark"] .section-title {
    color: #007A33;
    /* Main bg titles are white */
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .support-card {
    background: linear-gradient(145deg, #FFFBFA 0%, #FFFFFF 100%) !important;
    box-shadow: 0 0 50px rgba(0, 122, 51, 0.2) !important;
}

[data-theme="dark"] .btn-support-cta {
    box-shadow: 0 15px 35px rgba(0, 122, 51, 0.4) !important;
}

/* Restore nav shadow in mobile dark mode */
@media screen and (max-width: 991px) {
    [data-theme="dark"] .nav-links {
        background: var(--ci-green) !important;
    }
}

footer {
    text-align: center;
    padding: 60px 20px;
    background: #fff;
    border-top: 1px solid #eee;
    margin-top: 50px;
}

footer p {
    font-size: 1rem;
    color: #888;
}
