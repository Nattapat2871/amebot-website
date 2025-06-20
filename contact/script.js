// =========================================================================
// SCRIPT.JS - FULL WEBSITE LOGIC
// =========================================================================

// --- SECTION 1: GLOBALLY ACCESSIBLE FUNCTIONS & DATA ---
// (ส่วนที่สคริปต์อื่นหรือส่วนอื่นของเว็บสามารถเรียกใช้ได้)

// อ็อบเจกต์เก็บคำแปล
window.translations = {
    'EN': {
        'nav_home': 'Home',
        'nav_status': 'Status',
        'nav_dashboard': 'Dashboard',
        'nav_contact': 'Contact',
        'lang_en': 'English',
        'lang_th': 'Thai',
        // --- คำแปลสำหรับ Contact Form และ Modal ---
        'contact_heading': 'Contact Us',
        'contact_description': 'Have questions or feedback? Fill out the form below to send us a message via Discord.',
        'form_username_label': 'Username',
        'form_username_placeholder': 'Enter Your Username',
        'form_email_label': 'Email or Discord User ID',
        'form_email_placeholder': 'For us to reply (optional)',
        'form_message_label': 'Message',
        'form_message_placeholder': 'Write your message here...',
        'form_submit_button': 'Send Message',
        'status_sending': 'Sending message...',
        'status_error_general': 'An error occurred. Unable to send message.',
        'status_error_network': 'A network error occurred. Please try again.',
        'modal_success_title': 'Message Sent!',
        'modal_success_description': 'Thank you for your message. We will get back to you as soon as possible.',
    },
    'TH': {
        'nav_home': 'หน้าหลัก',
        'nav_status': 'สถานะ',
        'nav_dashboard': 'แดชบอร์ด',
        'nav_contact': 'ติดต่อ',
        'lang_en': 'อังกฤษ',
        'lang_th': 'ภาษาไทย',
        // --- คำแปลสำหรับ Contact Form และ Modal ---
        'contact_heading': 'ติดต่อเรา',
        'contact_description': 'มีคำถามหรือข้อเสนอแนะ? กรอกฟอร์มด้านล่างเพื่อส่งข้อความถึงเราผ่าน Discord',
        'form_username_label': 'ชื่อผู้ใช้',
        'form_username_placeholder': 'ระบุชื่อผู้ใช้ของคุณ',
        'form_email_label': 'อีเมลหรือ Discord User ID',
        'form_email_placeholder': 'สำหรับให้เราตอบกลับ (ไม่บังคับ)',
        'form_message_label': 'ข้อความ',
        'form_message_placeholder': 'เขียนข้อความของคุณที่นี่...',
        'form_submit_button': 'ส่งข้อความ',
        'status_sending': 'กำลังส่งข้อความ...',
        'status_error_general': 'เกิดข้อผิดพลาด ไม่สามารถส่งข้อความได้',
        'status_error_network': 'เกิดข้อผิดพลาดด้านเครือข่าย กรุณาลองใหม่อีกครั้ง',
        'modal_success_title': 'ส่งข้อความสำเร็จ!',
        'modal_success_description': 'ขอบคุณสำหรับข้อความของคุณ เราจะติดต่อกลับโดยเร็วที่สุด',
    }
};

// ฟังก์ชันสำหรับเปลี่ยนภาษาทั้งหน้าเว็บ
window.setLanguage = (lang) => {
    if (!window.translations[lang]) return;

    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const key = el.dataset.translateKey;
        const translation = window.translations[lang][key];

        if (translation) {
            // ตรวจสอบสำหรับ placeholder ของ input/textarea
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else if (el.tagName === 'BUTTON') { // สำหรับปุ่ม
                el.textContent = translation;
            } else { // สำหรับส่วนอื่นๆ ที่มี span หรือ textContent ปกติ
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
// (โค้ดจะเริ่มทำงานเมื่อหน้าเว็บโหลดเสร็จสมบูรณ์)

document.addEventListener('DOMContentLoaded', function () {

    // ตั้งค่าส่วนประกอบที่ใช้ร่วมกันทุกหน้า (เช่น Navbar)
    setupGlobalComponents();

    // ตั้งค่าการทำงานของฟอร์มติดต่อ
    handleContactForm();

    // ตั้งค่าภาษาเริ่มต้นเมื่อเปิดหน้าเว็บ
    const preferredLang = localStorage.getItem('preferredLanguage') || 'EN';
    window.setLanguage(preferredLang);
});


// --- SECTION 3: GLOBAL COMPONENTS SETUP ---
// (ฟังก์ชันสำหรับจัดการ Navbar, Mobile Menu, Language Switcher)

function setupGlobalComponents() {
    // --- Element Selectors ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');
    const langSwitcher = document.getElementById('language-switcher');
    const langButton = document.getElementById('lang-button');

    // --- UI & Utility Functions ---
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

    // --- Event Listeners ---
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
                window.setLanguage(lang); // เรียกใช้ setLanguage เพื่ออัปเดตข้อความ
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

    // --- Initial Setup Calls ---
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


// --- SECTION 4: CONTACT FORM HANDLING WITH MODAL ---
// (ฟังก์ชันสำหรับจัดการฟอร์มติดต่อและหน้าต่างยืนยัน)

function handleContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const successModal = document.getElementById('success-modal');

    // ถ้าไม่มีฟอร์มในหน้านี้ ก็ไม่ต้องทำอะไรต่อ
    if (!contactForm) {
        return;
    }

    // ฟังก์ชันสำหรับปิด Modal
    const closeModal = () => {
        if (successModal) {
            successModal.classList.remove('show');
        }
    };

    // Event Listener สำหรับฟอร์ม
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // หยุดการส่งฟอร์มแบบปกติ

        const data = new FormData(contactForm);
        const currentLang = document.documentElement.lang || 'EN'; // รับภาษาปัจจุบัน

        // แสดงสถานะว่ากำลังส่ง...
        formStatus.textContent = window.translations[currentLang]['status_sending'];
        formStatus.className = '';

        fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // ถ้าส่งสำเร็จ: แสดง Modal
                formStatus.textContent = ''; // ล้างข้อความสถานะเดิม
                if (successModal) {
                    successModal.classList.add('show');
                }
                contactForm.reset(); // ล้างข้อมูลในฟอร์ม
            } else {
                // ถ้าล้มเหลว: แสดงข้อความ Error ใต้ฟอร์ม
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = window.translations[currentLang]['status_error_general'];
                    }
                    formStatus.className = 'error';
                })
            }
        }).catch(error => {
            // ถ้ามีปัญหาด้าน Network
            formStatus.textContent = window.translations[currentLang]['status_error_network'];
            formStatus.className = 'error';
        });
    });

    // เพิ่ม Event Listeners สำหรับปิด Modal
    if (successModal) {
        const closeModalButton = successModal.querySelector('.close-button');

        // 1. ปิดโดยการคลิกปุ่มกากบาท
        if (closeModalButton) {
            closeModalButton.addEventListener('click', closeModal);
        }

        // 2. ปิดโดยการคลิกที่พื้นหลังสีเทา
        window.addEventListener('click', (event) => {
            if (event.target == successModal) {
                closeModal();
            }
        });

        // 3. ปิดโดยการกดปุ่ม Esc
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && successModal.classList.contains('show')) {
                closeModal();
            }
        });
    }
}