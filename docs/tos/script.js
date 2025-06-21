// =========================================================================
// SCRIPT.JS - FULL WEBSITE LOGIC
// =========================================================================

// --- SECTION 1: GLOBALLY ACCESSIBLE FUNCTIONS & DATA ---

// อ็อบเจกต์เก็บคำแปล (เพิ่มคำแปลสำหรับหน้า Privacy Policy)
window.translations = {
    'EN': {
        // --- NAV & GENERAL ---
        'nav_home': 'Home',
        'nav_status': 'Status',
        'nav_dashboard': 'Dashboard',
        'nav_contact': 'Contact',
        'lang_en': 'English',
        'lang_th': 'Thai',
        'tos_page_title': 'Terms of Service - AmeBot',
        'privacy_page_title': 'Privacy Policy - AmeBot',

        // --- ToS Page Content ---
        'tos_main_heading': 'Terms of Service',
        'tos_last_updated': 'Last updated: June 20, 2025',
        'tos_section1_heading': '1. Acceptance of Terms',
        'tos_section1_p1': 'By inviting or using AmeBot ("the bot") in your server, you are agreeing to be bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from using or accessing this bot.',
        'tos_section2_heading': '2. Bot Usage',
        'tos_section2_p1': 'You agree not to use the bot for any purpose that is illegal or prohibited by these terms. You agree not to misuse the bot\'s commands, such as spamming, in a way that would disrupt the service for others.',
        'tos_section3_heading': '3. Service Availability',
        'tos_section3_p1': 'We strive to ensure that the bot is available at all times, but we cannot guarantee that the service will be uninterrupted or error-free. We reserve the right to suspend or cease operations of the bot at any time for any reason.',
        'tos_section4_heading': '4. Termination',
        'tos_section4_p1': 'We reserve the right to prohibit the use of the bot on any Discord server or for any user at our sole discretion, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
        'tos_section5_heading': '5. Changes to Terms',
        'tos_section5_p1': 'We reserve the right to modify or replace these Terms at any time. We will try to provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.',

        // --- Privacy Policy Page Content ---
        'privacy_main_heading': 'Privacy Policy',
        'privacy_last_updated': 'Last updated: June 20, 2025',
        'privacy_section1_heading': 'Information We Collect',
        'privacy_section1_p1': 'In order to function, AmeBot may collect and store the following information: Discord User IDs, Server IDs, and Channel IDs. This data is necessary for commands, settings, and moderation features to work correctly. We do not collect or store personal messages or email addresses.',
        'privacy_section2_heading': 'How We Use Your Information',
        'privacy_section2_p1': 'The data collected is used solely for the purpose of providing and improving the bot\'s features. For example, Server IDs are used to save server-specific settings, and User IDs are used for user-specific commands or permissions.',
        'privacy_section3_heading': 'Data Storage and Security',
        'privacy_section3_p1': 'We take reasonable measures to protect the information we collect from loss, theft, misuse, and unauthorized access. All data is stored on secure servers.',
        'privacy_section4_heading': 'Data Retention',
        'privacy_section4_p1': 'We retain the data we collect for as long as it is necessary to provide the service. If you remove the bot from your server, we will make reasonable efforts to delete the associated data from our active databases.',
        'privacy_section5_heading': 'Contact Us',
        'privacy_section5_p1': 'If you have any questions about this Privacy Policy, you can contact us through our official support server or the contact form on our website.',

    },
    'TH': {
        // --- NAV & GENERAL ---
        'nav_home': 'หน้าหลัก',
        'nav_status': 'สถานะ',
        'nav_dashboard': 'แดชบอร์ด',
        'nav_contact': 'ติดต่อ',
        'lang_en': 'อังกฤษ',
        'lang_th': 'ภาษาไทย',
        'tos_page_title': 'ข้อกำหนดในการให้บริการ - AmeBot',
        'privacy_page_title': 'นโยบายความเป็นส่วนตัว - AmeBot',

        // --- ToS Page Content (คำแปลภาษาไทย) ---
        'tos_main_heading': 'ข้อกำหนดในการให้บริการ',
        'tos_last_updated': 'อัปเดตล่าสุด: 20 มิถุนายน 2025',
        'tos_section1_heading': '1. การยอมรับข้อกำหนด',
        'tos_section1_p1': 'การเชิญหรือใช้งาน AmeBot ("บอท") ในเซิร์ฟเวอร์ของคุณ ถือว่าคุณตกลงที่จะผูกพันตามข้อกำหนดในการให้บริการนี้ หากคุณไม่เห็นด้วยกับข้อกำหนดข้อใดข้อหนึ่ง คุณจะไม่ได้รับอนุญาตให้ใช้หรือเข้าถึงบอทนี้',
        'tos_section2_heading': '2. การใช้งานบอท',
        'tos_section2_p1': 'คุณตกลงที่จะไม่ใช้บอทเพื่อวัตถุประสงค์ใดๆ ที่ผิดกฎหมายหรือขัดต่อข้อกำหนดเหล่านี้ คุณตกลงที่จะไม่ใช้คำสั่งของบอทในทางที่ผิด เช่น การสแปม ซึ่งจะรบกวนการให้บริการแก่ผู้อื่น',
        'tos_section3_heading': '3. ความพร้อมใช้งานของบริการ',
        'tos_section3_p1': 'เรามุ่งมั่นที่จะทำให้บอทพร้อมใช้งานตลอดเวลา แต่ไม่สามารถรับประกันได้ว่าบริการจะไม่หยุดชะงักหรือปราศจากข้อผิดพลาด เราขอสงวนสิทธิ์ในการระงับหรือยุติการทำงานของบอทเมื่อใดก็ได้ไม่ว่าด้วยเหตุผลใดก็ตาม',
        'tos_section4_heading': '4. การยกเลิกบริการ',
        'tos_section4_p1': 'เราขอสงวนสิทธิ์ในการห้ามใช้บอทบนเซิร์ฟเวอร์ Discord ใดๆ หรือสำหรับผู้ใช้รายใดก็ตามตามดุลยพินิจของเราแต่เพียงผู้เดียว โดยไม่ต้องแจ้งให้ทราบล่วงหน้าหรือรับผิด สำหรับเหตุผลใดๆ ก็ตาม ซึ่งรวมถึงแต่ไม่จำกัดเพียงกรณีที่คุณละเมิดข้อกำหนด',
        'tos_section5_heading': '5. การเปลี่ยนแปลงข้อกำหนด',
        'tos_section5_p1': 'เราขอสงวนสิทธิ์ในการแก้ไขหรือเปลี่ยนแปลงข้อกำหนดเหล่านี้ได้ตลอดเวลา เราจะพยายามแจ้งให้ทราบล่วงหน้าอย่างน้อย 30 วันก่อนที่ข้อกำหนดใหม่จะมีผลบังคับใช้ การพิจารณาว่าสิ่งใดเป็นการเปลี่ยนแปลงที่สำคัญจะขึ้นอยู่กับดุลยพินิจของเราแต่เพียงผู้เดียว',

        // --- Privacy Policy Page Content (คำแปลภาษาไทย) ---
        'privacy_main_heading': 'นโยบายความเป็นส่วนตัว',
        'privacy_last_updated': 'อัปเดตล่าสุด: 20 มิถุนายน 2025',
        'privacy_section1_heading': 'ข้อมูลที่เรารวบรวม',
        'privacy_section1_p1': 'เพื่อให้สามารถทำงานได้ AmeBot อาจรวบรวมและจัดเก็บข้อมูลต่อไปนี้: Discord User ID, Server ID และ Channel ID ข้อมูลนี้จำเป็นเพื่อให้คำสั่ง การตั้งค่า และฟีเจอร์การดูแลทำงานได้อย่างถูกต้อง เราจะไม่รวบรวมหรือจัดเก็บข้อความส่วนตัวหรือที่อยู่อีเมล',
        'privacy_section2_heading': 'วิธีที่เราใช้ข้อมูลของคุณ',
        'privacy_section2_p1': 'ข้อมูลที่รวบรวมจะถูกใช้เพื่อวัตถุประสงค์ในการให้บริการและปรับปรุงฟีเจอร์ของบอทเท่านั้น ตัวอย่างเช่น Server ID ใช้เพื่อบันทึกการตั้งค่าเฉพาะเซิร์ฟเวอร์ และ User ID ใช้สำหรับคำสั่งหรือสิทธิ์เฉพาะผู้ใช้',
        'privacy_section3_heading': 'การจัดเก็บข้อมูลและความปลอดภัย',
        'privacy_section3_p1': 'เราใช้มาตรการที่สมเหตุสมผลในการปกป้องข้อมูลที่เรารวบรวมจากการสูญหาย การโจรกรรม การใช้ในทางที่ผิด และการเข้าถึงโดยไม่ได้รับอนุญาต ข้อมูลทั้งหมดจะถูกเก็บไว้บนเซิร์ฟเวอร์ที่ปลอดภัย',
        'privacy_section4_heading': 'การเก็บรักษาข้อมูล',
        'privacy_section4_p1': 'เราเก็บรักษาข้อมูลที่เรารวบรวมไว้ตราบเท่าที่จำเป็นเพื่อให้บริการ หากคุณนำบอทออกจากเซิร์ฟเวอร์ของคุณ เราจะพยายามอย่างสมเหตุสมผลในการลบข้อมูลที่เกี่ยวข้องออกจากฐานข้อมูลที่ใช้งานอยู่ของเรา',
        'privacy_section5_heading': 'ติดต่อเรา',
        'privacy_section5_p1': 'หากคุณมีคำถามใดๆ เกี่ยวกับนโยบายความเป็นส่วนตัวนี้ คุณสามารถติดต่อเราผ่านเซิร์ฟเวอร์สนับสนุนอย่างเป็นทางการหรือแบบฟอร์มการติดต่อบนเว็บไซต์ของเรา',
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