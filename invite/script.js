// =========================================================================
// SCRIPT.JS - FULL WEBSITE LOGIC
// =========================================================================

// --- SECTION 1: GLOBALLY ACCESSIBLE FUNCTIONS & DATA ---

// อ็อบเจกต์เก็บคำแปล (เพิ่มคำแปลสำหรับหน้า Invite)
window.translations = {
    'EN': {
        // --- NAV & GENERAL ---
        'nav_home': 'Home',
        'nav_status': 'Status',
        'nav_dashboard': 'Dashboard',
        'nav_contact': 'Contact',
        'lang_en': 'English',
        'lang_th': 'Thai',
        'invite_page_title': 'Invite AmeBot',

        // --- Invite Page ---
        'invite_heading': 'Inviting AmeBot',
        'invite_subheading': 'You will be redirected shortly...',

    },
    'TH': {
        // --- NAV & GENERAL ---
        'nav_home': 'หน้าหลัก',
        'nav_status': 'สถานะ',
        'nav_dashboard': 'แดชบอร์ด',
        'nav_contact': 'ติดต่อ',
        'lang_en': 'อังกฤษ',
        'lang_th': 'ภาษาไทย',
        'invite_page_title': 'เชิญ AmeBot',

        // --- Invite Page (คำแปลภาษาไทย) ---
        'invite_heading': 'กำลังเชิญ AmeBot',
        'invite_subheading': 'กำลังส่งต่อไปยังหน้าเชิญบอท...',

    }
};

// ฟังก์ชันสำหรับเปลี่ยนภาษาทั้งหน้าเว็บ (อัปเดตให้รองรับ Title)
window.setLanguage = (lang) => {
    if (!window.translations[lang]) return;

    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const key = el.dataset.translateKey;
        const translation = window.translations[lang][key];

        if (translation) {
            if (el.tagName === 'TITLE') {
                document.title = translation;
            } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else if (el.tagName === 'BUTTON') {
                el.textContent = translation;
            } else {
                const span = el.querySelector('span');
                if (span && !el.classList.contains('lang-option')) {
                    span.textContent = translation;
                } else {
                    el.textContent = translation;
                }
            }
        }
    });

    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
};


// --- SECTION 2: INITIALIZATION ---

document.addEventListener('DOMContentLoaded', function () {
    setupGlobalComponents();

    // ตั้งค่าภาษาเริ่มต้นเมื่อเปิดหน้าเว็บ
    const preferredLang = localStorage.getItem('preferredLanguage') || 'EN';
    window.setLanguage(preferredLang);
});


// --- SECTION 3: GLOBAL COMPONENTS SETUP ---

function setupGlobalComponents() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    const langSwitcher = document.getElementById('language-switcher');
    const langButton = document.getElementById('lang-button');

    const populateMobileMenu = () => {
        const desktopLinks = document.querySelectorAll('.nav-center .nav-links li a');
        if (mobileMenu) {
            mobileMenu.innerHTML = '';
            desktopLinks.forEach(link => {
                const newLink = link.cloneNode(true);
                mobileMenu.appendChild(newLink);
            });
        }
    };

    const toggleMobileMenu = () => {
        if (mobileMenu && overlay && hamburgerMenu) {
            const isMenuOpen = mobileMenu.classList.toggle('show');
            overlay.classList.toggle('show');
            hamburgerMenu.classList.toggle('is-active');
            document.body.classList.toggle('no-scroll', isMenuOpen);
        }
    };

    document.querySelectorAll('.nav-link-disabled').forEach(link => {
        link.addEventListener('click', (event) => event.preventDefault());
    });

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('show')) {
                toggleMobileMenu();
            }
        });
    }

    if (langButton) {
        langButton.addEventListener('click', (e) => {
            e.stopPropagation();
            langSwitcher.classList.toggle('open');
        });
    }

    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.dataset.lang;
            const flagSrc = option.dataset.flagSrc;
            if (lang && flagSrc) {
                const currentFlag = document.getElementById('current-flag');
                const currentLangText = document.getElementById('current-lang-text');
                if (currentFlag) currentFlag.src = flagSrc;
                if (currentLangText) currentLangText.textContent = lang;
                window.setLanguage(lang);
                if (langSwitcher) langSwitcher.classList.remove('open');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (langSwitcher && langSwitcher.classList.contains('open') && !langSwitcher.contains(e.target)) {
            langSwitcher.classList.remove('open');
        }
    });

    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                toggleMobileMenu();
            }
        });
    }

    populateMobileMenu();

    const preferredLang = localStorage.getItem('preferredLanguage') || 'EN';
    const initialLangOption = document.querySelector(`.lang-option[data-lang="${preferredLang}"]`);
    if (initialLangOption) {
        const currentFlag = document.getElementById('current-flag');
        const currentLangText = document.getElementById('current-lang-text');
        if (currentFlag) currentFlag.src = initialLangOption.dataset.flagSrc;
        if (currentLangText) currentLangText.textContent = preferredLang;
    }
}