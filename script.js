// =========================================================================
// SCRIPT.JS - AMEBOT WEBSITE (Full Function Implementation)
// =========================================================================

document.addEventListener('DOMContentLoaded', function () {

    // -------------------------------------------------------------------------
    // SECTION 1: CONFIGURATION & DATA
    // -------------------------------------------------------------------------
    const imageUrls = ['asset/loading.gif', 'asset/amebot.png', 'asset/1.png', 'asset/2.png', 'asset/3.png', 'asset/4.png', 'asset/5.png', 'asset/6.png', 'asset/7.png', 'asset/8.png'];
    const translations = {
        'EN': {
            'nav_home': 'Home',
            'nav_status': 'Status',
            'nav_dashboard': 'Dashboard',
            'nav_contact': 'Contact',
            'lang_en': 'English',
            'lang_th': 'ภาษาไทย',
            'hero_title': 'Hello! This is AmeBot',
            'hero_description': 'My full name is Rurina Ame. I am your AI assistant, responsible for managing the server system and keeping all users safe. Let\'s meet!',
            'hero_button': 'Contact our developers',
            'hero_join_discord': 'Join Discord Server',
            'hero_invite_bot': 'Invite Bot',
            'about_title': 'About Me',
            'about_description': 'Hello! I am Rurina Ame, an intelligent AI assistant created to be more than just an ordinary bot. My core is powered by Google Gemini 1.5 Flash technology, giving me diverse capabilities and making me ready to be both an assistant and a friend to everyone.\n\nKey Features:\n• Welcome-Leave System\n• Anti-Spam System\n• Server Log System\n• Weather Forecast\n• Image Search',
            'bot': 'Bot',
            'statistics': 'Statistics',
            'developers': 'Developers',
            'api': 'API',
            'api_description': 'This API is used to fetch user data from Discord, capable of retrieving all available information.'
        },
        'TH': {
            'nav_home': 'หน้าหลัก',
            'nav_status': 'สถานะ',
            'nav_dashboard': 'แดชบอร์ด',
            'nav_contact': 'ติดต่อ',
            'lang_en': 'English',
            'lang_th': 'ภาษาไทย',
            'hero_title': 'สวัสดี! นี่คือ AmeBot',
            'hero_description': 'ชื่อเต็มหนูคือ Rurina Ame หนูเป็น AI ผู้ช่วยของคุณ มีหน้าที่ดูแลระบบเซิร์ฟเวอร์ จัดการผู้ใช้ทุกคนให้ปลอดภัย แล้วมาเจอกันนะ!',
            'hero_button': 'ติดต่อผู้พัฒนาของเรา',
            'hero_join_discord': 'เข้าร่วม Discord Server',
            'hero_invite_bot': 'เชิญบอท',
            'about_title': 'เกี่ยวกับฉัน',
            'about_description': 'สวัสดีค่ะ หนูคือ Rurina Ame ผู้ช่วย AI อัจฉริยะที่ถูกสร้างขึ้นมาเพื่อเป็นมากกว่าแค่บอทธรรมดา หัวใจหลักของหนูขับเคลื่อนด้วยเทคโนโลยี Google Gemini 1.5 Flash ทำให้หนูมีความสามารถที่หลากหลายและพร้อมจะเป็นทั้งผู้ช่วยและเพื่อนคุยให้กับทุกคนค่ะ\n\nความสามารถเด่น:\n• ระบบต้อนรับ-อำลา\n• ระบบป้องกันสแปม\n• ระบบบันทึก Log\n• สภาพอากาศ\n• ค้นหารูปภาพ',
            'bot': 'บอท',
            'statistics': 'สถิติ',
            'developers': 'ผู้พัฒนา',
            'api': 'API',
            'api_description': 'API นี้ใช้สำหรับดึงข้อมูลผู้ใช้ใน Discord สามารถดึงข้อมูลได้ทุกอย่าง'
        }
    };
    const botApiEndpoints = [{ apiUrl: 'https://api.ame.nattapat2871.online/v1/user/1141443585737244682', role: 'Main Bot & AI', description: 'The main bot responsible for server management and core functionalities.' }, { apiUrl: 'https://api.ame.nattapat2871.online/v1/user/1141441060044816405', role: 'API Bot' }, { apiUrl: 'https://api.ame.nattapat2871.online/v1/user/1376505105687253072', role: 'Music Bot', description: 'Dedicated to providing high-quality music streams 24/7.'}];
    const developerApiEndpoints = [
        { apiUrl: 'https://api.ame.nattapat2871.online/v1/user/1007237437627572275', role: 'Lead Developer & Founder' }, { apiUrl: 'https://api.ame.nattapat2871.online/v1/user/741501421936967722', role: 'Consultant' }
    ];

    // -------------------------------------------------------------------------
    // SECTION 2: PRELOADER & APP INITIALIZATION
    // -------------------------------------------------------------------------
    const preloader = document.getElementById('preloader');
    const criticalImages = [
        'asset/loading.gif',
        'asset/amebot.png',
        'asset/1.png'
    ];

    function loadImage(url) { return new Promise((resolve) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = () => { console.error(`Failed to load image: ${url}`); resolve(); }; image.src = url; }); }

    Promise.all(criticalImages.map(loadImage)).then(() => {
        setTimeout(() => preloader.classList.add('preloader--hidden'), 250);
        runApp();
    });

    // -------------------------------------------------------------------------
    // SECTION 3: MAIN APPLICATION LOGIC (runApp)
    // -------------------------------------------------------------------------
    function runApp() {
        // --- ELEMENT SELECTORS ---
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('overlay');
        const langSwitcher = document.getElementById('language-switcher');
        const langButton = document.getElementById('lang-button');
        const secondaryNavLinks = document.querySelectorAll('.secondary-nav-link');

        // --- DATA FETCHING & PROCESSING FUNCTIONS ---
        async function fetchApiData(endpoints) {
            const fetchPromises = endpoints.map(endpoint =>
                fetch(endpoint.apiUrl)
                    .then(response => {
                        if (!response.ok) { console.error(`Failed to fetch ${endpoint.apiUrl}. Status: ${response.status}`); return null; }
                        return response.json();
                    })
                    .then(data => data ? { ...data, ...endpoint } : null)
                    .catch(error => { console.error(`Error processing ${endpoint.apiUrl}:`, error); return null; })
            );
            const results = await Promise.all(fetchPromises);
            return results.filter(user => user !== null);
        }

        function parseDiscordEmojis(text) {
            if (!text) return '';
            const emojiRegex = /<a?:(\w+):(\d+)>/g;
            return text.replace(emojiRegex, (match, name, id) => `<img src="https://cdn.discordapp.com/emojis/${id}.webp?size=48&quality=lossless" alt=":${name}:" class="discord-emoji">`);
        }

        function getActivityStatusPrefix(activityType) {
            switch (activityType) {
                case 0: return 'Playing - ';
                case 2: return 'Listening to - ';
                case 3: return 'Watching - ';
                default: return '';
            }
        }

        function debounce(func, delay) {
            let timeoutId;
            return function (...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            };
        }

        const renderDeveloperProfiles = () => {
            const container = document.getElementById('developer-cards-container');
            if (!container) {
                console.error("Developer cards container not found!");
                return;
            }
            container.innerHTML = '<p style="color: #c4c4c4; text-align: center;">Fetching developer data...</p>';
            fetchApiData(developerApiEndpoints).then(users => {
                container.innerHTML = '';
                if (!users || users.length === 0) {
                    container.innerHTML = '<p style="color: #999; text-align: center;">Could not load developer data.</p>';
                    return;
                }
                users.forEach(data => {
                    const user = data.ame.user;
                    const profile = data.ame;

                    let guildTagHTML = '';
                    if (user.primary_guild?.tag) {
                        let badgeImgHTML = '';
                        if (user.primary_guild.badge && user.primary_guild.identity_guild_id) {
                            badgeImgHTML = `<img src="https://cdn.discordapp.com/clan-badges/${user.primary_guild.identity_guild_id}/${user.primary_guild.badge}.png?size=24" alt="Guild Badge" class="guild-badge-icon">`;
                        }
                        guildTagHTML = `<div class="guild-tag">${badgeImgHTML}<span>${user.primary_guild.tag}</span></div>`;
                    }

                    let avatarDecorationHTML = '';
                    if (user.avatar_decoration_data?.asset) {
                        avatarDecorationHTML = `<img src="https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png" class="profile-avatar-decoration">`;
                    }
                    const avatarSrc = user.avatar.startsWith('a_') ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=128` : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
                    const avatarHTML = `<div class="profile-avatar-wrapper">${avatarDecorationHTML}<img src="${avatarSrc}" alt="${user.username}'s avatar" class="profile-avatar"></div>`;

                    let badgesHTML = '';
                    if (profile.badges && profile.badges.length > 0) {
                        profile.badges.forEach(badge => {
                            badgesHTML += `<img src="https://cdn.discordapp.com/badge-icons/${badge.icon}.png" alt="${badge.description}" class="badge-image" title="${badge.description}">`;
                        });
                    }

                    let socialsHTML = '<div class="profile-socials">';
                    socialsHTML += `<a href="https://discord.com/users/${user.id}" target="_blank" rel="noopener noreferrer" title="Discord"><i class="fab fa-discord"></i></a>`;
                    profile.connected_accounts.forEach(acc => {
                        if (acc.type === 'github' && acc.name) {
                            socialsHTML += `<a href="https://github.com/${acc.name}" target="_blank" rel="noopener noreferrer" title="${acc.name}"><i class="fab fa-github"></i></a>`;
                        } else if (acc.type === 'domain' && acc.name) {
                            socialsHTML += `<a href="https://${acc.name}" target="_blank" rel="noopener noreferrer" title="${acc.name}"><i class="fas fa-globe"></i></a>`;
                        }
                    });
                    socialsHTML += '</div>';

                    let activityHTML = '';
                    const activity = profile.activities.find(act => act.type === 0 || act.type === 2 || act.type === 3);
                    if (activity) {
                        const statusPrefix = getActivityStatusPrefix(activity.type);
                        activityHTML = `<div class="profile-activity">${activity.assets?.large_image ? `<img src="${activity.assets.large_image}" alt="${activity.name}" class="activity-asset" onerror="this.onerror=null;this.src='asset/loading.gif';">` : ''}<div class="activity-info"><strong>${statusPrefix}${parseDiscordEmojis(activity.name)}</strong>${activity.details ? `<span>${parseDiscordEmojis(activity.details)}</span>` : ''}${activity.state ? `<span>${parseDiscordEmojis(activity.state)}</span>` : ''}</div></div>`;
                    }

                    const status = profile.discord_status.charAt(0).toUpperCase() + profile.discord_status.slice(1);
                    const statusHTML = `<div class="profile-status-wrapper"><div class="profile-status ${status}"><span>${status}</span></div></div>`;

                    const cardHTML = `<div class="profile-card"><div class="profile-card-header">${avatarHTML}<div class="profile-info"><div class="profile-name-line"><h3 class="profile-name">${user.username}</h3>${guildTagHTML}</div><div class="badges-container">${badgesHTML}</div><span class="profile-role">${data.role}</span></div></div><div class="profile-card-body"><div>${activityHTML}</div><div>${statusHTML}${socialsHTML}</div></div></div>`;
                    container.innerHTML += cardHTML;
                });
            });
        };

        const renderBotProfiles = () => {
            const container = document.getElementById('bot-cards-container');
            if (!container) {
                console.error("Bot cards container not found!");
                return;
            }
            container.innerHTML = '<p style="color: #e4e4e4; text-align: center;">Fetching bot data...</p>';
            fetchApiData(botApiEndpoints).then(bots => {
                container.innerHTML = '';
                if (!bots || bots.length === 0) {
                    container.innerHTML = '<p style="color: #999; text-align: center;">Could not load bot data.</p>';
                } else {
                    bots.forEach(data => {
                        const userData = data.ame.user;
                        const profileData = data.ame;

                        let guildTagHTML = '';
                        if (userData.primary_guild?.tag) {
                            guildTagHTML = `<div class="guild-tag">${userData.primary_guild.tag}</div>`;
                        }

                        let badgesHTML = '';
                        if (profileData.badges && profileData.badges.length > 0) {
                            profileData.badges.forEach(badge => {
                                badgesHTML += `<img src="https://cdn.discordapp.com/badge-icons/${badge.icon}.png" alt="${badge.description}" class="badge-image" title="${badge.description}">`;
                            });
                        }

                        const customStatusActivity = profileData.activities.find(act => act.type === 4);
                        const customStatusHTML = customStatusActivity ? `<div class="profile-custom-status">${parseDiscordEmojis(customStatusActivity.state)}</div>` : '';
                        const descriptionHTML = parseDiscordEmojis(data.description || profileData.user_profile?.bio || 'A very cool bot.');
                        const avatar = userData.avatar.startsWith('a_') ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.gif?size=128` : `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=128`;
                        const status = profileData.discord_status.charAt(0).toUpperCase() + profileData.discord_status.slice(1);

                        const cardHTML = `<div class="profile-card"><div class="profile-card-header"><img src="${avatar}" alt="${userData.username}'s avatar" class="profile-avatar"><div class="profile-info"><div class="profile-name-line"><h3 class="profile-name">${userData.username}</h3>${guildTagHTML}</div><div class="badges-container">${badgesHTML}</div><span class="profile-role">${data.role}</span></div></div><div class="profile-card-body"><div>${customStatusHTML}<p>${descriptionHTML}</p></div><div><div class="profile-status-wrapper"><div class="profile-status ${status}"><span>${status}</span></div></div></div></div></div>`;
                        container.innerHTML += cardHTML;
                    });
                }
            });
        };

        const renderStatistics = async () => {
            const serverCountEl = document.getElementById('stat-servers-count');
            const userCountEl = document.getElementById('stat-users-count');
            const aiInteractionsEl = document.getElementById('stat-ai-interactions');
            const aiTokensEl = document.getElementById('stat-ai-tokens');
            const apiRequestsEl = document.getElementById('stat-api-requests');
            const statsApiUrl = 'https://rurina-ame-bots.onrender.com/api/advance/system/';
            const apiUsageUrl = 'https://api.ame.nattapat2871.online/advance/system';
            try {
                const [statsResponse, apiUsageResponse] = await Promise.all([
                    fetch(statsApiUrl),
                    fetch(apiUsageUrl)
                ]);
                if (!statsResponse.ok || !apiUsageResponse.ok) { throw new Error(`API request failed`); }
                const statsData = await statsResponse.json();
                const apiUsageData = await apiUsageResponse.json();
                if (serverCountEl) serverCountEl.textContent = statsData.bot_info.server_count.toLocaleString('en-US');
                if (userCountEl) userCountEl.textContent = statsData.bot_info.user_count.toLocaleString('en-US');
                if (aiInteractionsEl) aiInteractionsEl.textContent = statsData.ai_stats.total_interactions.toLocaleString('en-US');
                if (aiTokensEl) {
                    const tokens = Math.round(statsData.ai_stats.estimated_tokens_processed);
                    aiTokensEl.textContent = `(${tokens.toLocaleString('en-US')} Tokens Processed)`;
                }
                if (apiRequestsEl) apiRequestsEl.textContent = apiUsageData.api_usage.total_requests.toLocaleString('en-US');
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
                const statsContainer = document.getElementById('statistics-cards-container');
                if (statsContainer) statsContainer.innerHTML = '<p style="color: #999; text-align: center;">Could not load statistics data.</p>';
            }
        };

        const setupApiTester = () => {
            const inputEl = document.getElementById('api-user-id-input');
            const jsonOutputEl = document.getElementById('api-json-output');
            const simpleDisplayContainer = document.getElementById('api-simple-display');
            const avatarEl = document.getElementById('api-profile-avatar');
            const statusIndicatorEl = document.getElementById('api-profile-status-indicator');
            const usernameEl = document.getElementById('api-profile-username');
            const badgesContainerEl = document.getElementById('api-profile-badges');
            const customStatusEl = document.getElementById('api-profile-custom-status');
            const activityCardEl = document.getElementById('api-profile-activity-card');
            const avatarDecorationEl = document.getElementById('api-profile-avatar-decoration');
            const guildTagEl = document.getElementById('api-profile-guild-tag');

            const fetchApiUserData = async (userId) => {
                if (!userId || userId.length < 17) {
                    if (jsonOutputEl) jsonOutputEl.textContent = '{ "message": "Please enter a valid Discord User ID." }';
                    if (jsonOutputEl) Prism.highlightElement(jsonOutputEl);
                    if (simpleDisplayContainer) simpleDisplayContainer.classList.add('hidden');
                    return;
                }
                if (jsonOutputEl) {
                    jsonOutputEl.textContent = 'Fetching data...';
                    Prism.highlightElement(jsonOutputEl);
                }
                const apiTesterContainer = document.querySelector('.api-tester-container');
                if (apiTesterContainer) apiTesterContainer.classList.add('loading');
                try {
                    const response = await fetch(`https://api.ame.nattapat2871.online/v1/user/${userId}`);
                    const data = await response.json();
                    if (!response.ok) { throw data; }
                    if (jsonOutputEl) {
                        jsonOutputEl.textContent = JSON.stringify(data, null, 2);
                        Prism.highlightElement(jsonOutputEl);
                    }
                    const user = data.ame.user;
                    const profile = data.ame;

                    if (avatarEl) {
                        const avatarUrl = user.avatar.startsWith('a_') ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=128` : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
                        avatarEl.src = avatarUrl;
                    }

                    if (avatarDecorationEl) {
                        if (user.avatar_decoration_data?.asset) {
                            avatarDecorationEl.src = `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png`;
                            avatarDecorationEl.style.display = 'block';
                        } else {
                            avatarDecorationEl.style.display = 'none';
                        }
                    }

                    if (statusIndicatorEl) {
                        statusIndicatorEl.className = 'status-indicator';
                        statusIndicatorEl.classList.add(profile.discord_status);
                    }
                    if (usernameEl) usernameEl.textContent = user.username;

                    if (guildTagEl) {
                        guildTagEl.innerHTML = '';
                        if (user.primary_guild?.tag) {
                            guildTagEl.style.display = 'inline-flex';
                            if (user.primary_guild.badge && user.primary_guild.identity_guild_id) {
                                const guildBadge = document.createElement('img');
                                guildBadge.src = `https://cdn.discordapp.com/clan-badges/${user.primary_guild.identity_guild_id}/${user.primary_guild.badge}.png?size=24`;
                                guildBadge.alt = `Guild Badge`;
                                guildBadge.className = 'guild-badge-icon';
                                guildTagEl.appendChild(guildBadge);
                            }
                            const guildTagText = document.createElement('span');
                            guildTagText.textContent = user.primary_guild.tag;
                            guildTagEl.appendChild(guildTagText);
                        } else {
                            guildTagEl.style.display = 'none';
                        }
                    }

                    if (badgesContainerEl) {
                        badgesContainerEl.innerHTML = '';
                        if (profile.badges && profile.badges.length > 0) {
                            profile.badges.forEach(badge => {
                                const badgeImg = document.createElement('img');
                                badgeImg.src = `https://cdn.discordapp.com/badge-icons/${badge.icon}.png`;
                                badgeImg.title = badge.description;
                                badgeImg.className = 'badge-image';
                                badgesContainerEl.appendChild(badgeImg);
                            });
                        }
                    }

                    if (customStatusEl) {
                        const customStatusActivity = profile.activities.find(act => act.type === 4);
                        customStatusEl.innerHTML = customStatusActivity ? parseDiscordEmojis(customStatusActivity.state) : '';
                    }

                    if (activityCardEl) {
                        activityCardEl.innerHTML = '';
                        const mainActivity = profile.activities.find(act => act.type === 0 || act.type === 2 || act.type === 3);
                        if (mainActivity) {
                            activityCardEl.style.display = 'flex';
                            const statusPrefix = getActivityStatusPrefix(mainActivity.type);
                            const largeImgUrl = mainActivity.assets?.large_image?.startsWith('mp:external') ? `https://media.discordapp.net/${mainActivity.assets.large_image.replace('mp:', '')}` : mainActivity.assets?.large_image;
                            const largeImg = largeImgUrl ? `<img src="${largeImgUrl}" alt="Activity" class="activity-icon" onerror="this.onerror=null;this.src='asset/loading.gif';">` : '<div class="activity-icon-placeholder">?</div>';
                            activityCardEl.innerHTML = `${largeImg}<div class="activity-details-container"><strong>${statusPrefix}${parseDiscordEmojis(mainActivity.name)}</strong>${mainActivity.details ? `<span>${parseDiscordEmojis(mainActivity.details)}</span>` : ''}${mainActivity.state ? `<span>${parseDiscordEmojis(mainActivity.state)}</span>` : ''}</div>`;
                        } else {
                            activityCardEl.style.display = 'none';
                        }
                    }

                    if (simpleDisplayContainer) simpleDisplayContainer.classList.remove('hidden');

                } catch (error) {
                    console.error('API Tester Error:', error);
                    if (jsonOutputEl) {
                        jsonOutputEl.textContent = JSON.stringify(error, null, 2);
                        Prism.highlightElement(jsonOutputEl);
                    }
                    if (simpleDisplayContainer) simpleDisplayContainer.classList.add('hidden');
                } finally {
                    if (apiTesterContainer) apiTesterContainer.classList.remove('loading');
                }
            };
            if (inputEl) {
                const debouncedFetch = debounce((event) => { fetchApiUserData(event.target.value.trim()); }, 500);
                inputEl.addEventListener('input', debouncedFetch);
            }
        };


        const setupWallpaperSlideshow = () => {
            const wallpaperBg1 = document.getElementById('wallpaper-bg-1');
            const wallpaperBg2 = document.getElementById('wallpaper-bg-2');
            if (!wallpaperBg1 || !wallpaperBg2) return;

            // กรองเอารูปภาพที่ไม่ต้องการออก (loading.gif, amebot.png)
            const wallpaperImages = imageUrls.slice(2);
            if (wallpaperImages.length === 0) return;

            let currentImageIndex = 0;
            let isBg1Active = true;

            const changeWallpaper = () => {
                // คำนวณ index ของรูปภาพถัดไป ให้วนลูป
                currentImageIndex = (currentImageIndex + 1) % wallpaperImages.length;
                const nextImageUrl = wallpaperImages[currentImageIndex];

                if (isBg1Active) {
                    // ถ้า bg1 แสดงอยู่ ให้โหลดรูปใหม่ใน bg2 แล้วสลับ
                    wallpaperBg2.style.backgroundImage = `url('${nextImageUrl}')`;
                    wallpaperBg2.style.opacity = 1;
                    wallpaperBg1.style.opacity = 0;
                } else {
                    // ถ้า bg2 แสดงอยู่ ให้โหลดรูปใหม่ใน bg1 แล้วสลับ
                    wallpaperBg1.style.backgroundImage = `url('${nextImageUrl}')`;
                    wallpaperBg1.style.opacity = 1;
                    wallpaperBg2.style.opacity = 0;
                }

                // สลับสถานะ active
                isBg1Active = !isBg1Active;
            };

            // ตั้งค่ารูปแรก
            wallpaperBg1.style.backgroundImage = `url('${wallpaperImages[0]}')`;
            wallpaperBg1.style.opacity = 1;
            wallpaperBg2.style.opacity = 0;

            // เริ่มการสลับรูปทุกๆ 7 วินาที
            setInterval(changeWallpaper, 7000);
        };

        // --- UI & UTILITY FUNCTIONS ---
        const updateTabContent = (clickedLink) => {
            const currentActiveLink = document.querySelector('.secondary-nav-link.active');
            if (currentActiveLink === clickedLink) return;
            const oldActiveLink = currentActiveLink;
            const newActiveLink = clickedLink;
            if (oldActiveLink) oldActiveLink.classList.remove('active');
            if (newActiveLink) newActiveLink.classList.add('active');
            const oldSection = document.querySelector('.content-section.is-active');
            const newSectionId = newActiveLink.getAttribute('href');
            const newSection = document.querySelector(newSectionId);
            if (!oldSection || !newSection || oldSection === newSection) return;
            const oldIndex = Array.from(secondaryNavLinks).indexOf(oldActiveLink);
            const newIndex = Array.from(secondaryNavLinks).indexOf(newActiveLink);
            const isMovingRight = newIndex > oldIndex;
            oldSection.classList.add('is-transitioning-out');
            oldSection.classList.remove('is-active');
            newSection.style.transform = isMovingRight ? 'translateX(100%)' : 'translateX(-100%)';
            newSection.classList.add('is-active');
            requestAnimationFrame(() => {
                newSection.style.transform = 'translateX(0)';
                oldSection.style.transform = isMovingRight ? 'translateX(-100%)' : 'translateX(100%)';
            });
            oldSection.addEventListener('transitionend', () => { oldSection.classList.remove('is-transitioning-out'); }, { once: true });
        };

        const setInitialTab = () => {
            const initialActiveLink = document.querySelector('.secondary-nav-link[href="#statistics"]');
            if (initialActiveLink) {
                initialActiveLink.classList.add('active');
                const initialSectionId = initialActiveLink.getAttribute('href');
                const initialSection = document.querySelector(initialSectionId);
                if (initialSection) {
                    initialSection.style.transition = 'none';
                    initialSection.classList.add('is-active');
                    setTimeout(() => { initialSection.style.transition = ''; }, 50);
                }
            }
        };

        const setLanguage = (lang) => {
            if (!translations[lang]) return;
            document.querySelectorAll('[data-translate-key]').forEach(el => {
                const key = el.dataset.translateKey;
                const translation = translations[lang][key];
                if (translation) {
                    const span = el.querySelector('span');
                    if (span && !el.classList.contains('lang-option')) {
                        span.textContent = translation;
                    } else {
                        el.textContent = translation;
                    }
                }
            });
            document.documentElement.lang = lang;
            localStorage.setItem('preferredLanguage', lang);
        };

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

        // --- EVENT LISTENERS ---
        if (secondaryNavLinks) {
            secondaryNavLinks.forEach(link => {
                link.addEventListener('click', (e) => { e.preventDefault(); updateTabContent(link); });
            });
        }
        document.querySelectorAll('.nav-link-disabled').forEach(link => { link.addEventListener('click', (event) => event.preventDefault()); });
        if (hamburgerMenu) hamburgerMenu.addEventListener('click', (e) => { e.stopPropagation(); toggleMobileMenu(); });
        if (overlay) overlay.addEventListener('click', () => { if (mobileMenu && mobileMenu.classList.contains('show')) toggleMobileMenu(); });
        if (langButton) langButton.addEventListener('click', (e) => { e.stopPropagation(); langSwitcher.classList.toggle('open'); });
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
                    setLanguage(lang);
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

        // --- INITIAL SETUP CALLS ---
        populateMobileMenu();
        const preferredLang = localStorage.getItem('preferredLanguage') || 'EN';
        const initialLangOption = document.querySelector(`.lang-option[data-lang="${preferredLang}"]`);
        if (initialLangOption) {
            const currentFlag = document.getElementById('current-flag');
            const currentLangText = document.getElementById('current-lang-text');
            if (currentFlag) currentFlag.src = initialLangOption.dataset.flagSrc;
            if (currentLangText) currentLangText.textContent = preferredLang;
        }
        setLanguage(preferredLang);
        setInitialTab();
        renderBotProfiles();
        renderDeveloperProfiles();
        renderStatistics();
        setupApiTester();
        setupWallpaperSlideshow();
    }
});