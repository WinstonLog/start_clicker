// ============================================================
// SVG-ГРАФИКА ВСЕХ 43 КАРТ
// ============================================================
// Каждая функция возвращает SVG-строку нужного размера.
// Использование: cardArt('water', 60) → SVG 60×60

const CARD_ART = {

    // ================= TIER 0: СТИХИИ =================
    water: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="w_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#7ae0ff"/>
                    <stop offset="60%" stop-color="#4ad4ff"/>
                    <stop offset="100%" stop-color="#1a6aaf"/>
                </linearGradient>
            </defs>
            <path d="M50 12 Q78 48 78 68 A28 28 0 0 1 22 68 Q22 48 50 12 Z" fill="url(#w_g)"/>
            <ellipse cx="40" cy="55" rx="4" ry="7" fill="#fff" opacity="0.5"/>
        </svg>`,

    fire: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="f_g" cx="50%" cy="70%" r="60%">
                    <stop offset="0%" stop-color="#ffee44"/>
                    <stop offset="40%" stop-color="#ff8822"/>
                    <stop offset="100%" stop-color="#cc2200"/>
                </radialGradient>
            </defs>
            <path d="M50 12 Q65 35 68 55 Q72 75 50 88 Q28 75 32 55 Q35 35 50 12 Z" fill="url(#f_g)"/>
            <path d="M50 35 Q58 55 55 70 Q55 80 50 85 Q45 80 45 70 Q42 55 50 35 Z" fill="#ffdd44" opacity="0.7"/>
        </svg>`,

    earth: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="e_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#8a6a44"/>
                    <stop offset="100%" stop-color="#4a2a14"/>
                </linearGradient>
            </defs>
            <path d="M50 18 L78 40 L82 70 L50 88 L18 70 L22 40 Z" fill="url(#e_g)" stroke="#2a1408" stroke-width="1.5"/>
            <path d="M35 45 L50 38 L62 48 M40 62 L58 55" stroke="#2a1408" stroke-width="1" opacity="0.6" fill="none"/>
            <path d="M30 50 L40 45" stroke="#a88866" stroke-width="1.5" opacity="0.5" fill="none"/>
        </svg>`,

    air: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="a_g" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#c8e8ff" stop-opacity="0.3"/>
                    <stop offset="50%" stop-color="#88c8ff"/>
                    <stop offset="100%" stop-color="#c8e8ff" stop-opacity="0.3"/>
                </linearGradient>
            </defs>
            <path d="M15 40 Q30 30 45 40 Q60 50 75 40 Q85 35 90 40"
                  stroke="url(#a_g)" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M10 55 Q30 45 50 55 Q70 65 90 55"
                  stroke="url(#a_g)" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M20 70 Q35 62 50 70 Q65 78 80 70"
                  stroke="url(#a_g)" stroke-width="4" fill="none" stroke-linecap="round"/>
        </svg>`,

    energy: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="en_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffee44"/>
                    <stop offset="100%" stop-color="#ffcc00"/>
                </linearGradient>
            </defs>
            <path d="M55 8 L30 50 L48 50 L42 92 L72 42 L54 42 L60 8 Z"
                  fill="url(#en_g)" stroke="#aa8800" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M50 30 L40 48 M52 55 L46 75" stroke="#fff" stroke-width="1.5" opacity="0.6" fill="none"/>
        </svg>`,

    ice: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="i_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#e8f8ff"/>
                    <stop offset="100%" stop-color="#88c8e8"/>
                </linearGradient>
            </defs>
            <g stroke="url(#i_g)" stroke-width="4" stroke-linecap="round" fill="none">
                <line x1="50" y1="15" x2="50" y2="85"/>
                <line x1="20" y1="32" x2="80" y2="68"/>
                <line x1="20" y1="68" x2="80" y2="32"/>
                <line x1="50" y1="15" x2="40" y2="25"/>
                <line x1="50" y1="15" x2="60" y2="25"/>
                <line x1="50" y1="85" x2="40" y2="75"/>
                <line x1="50" y1="85" x2="60" y2="75"/>
                <line x1="20" y1="32" x2="32" y2="34"/>
                <line x1="20" y1="32" x2="26" y2="20"/>
                <line x1="80" y1="68" x2="68" y2="66"/>
                <line x1="80" y1="68" x2="74" y2="80"/>
            </g>
        </svg>`,

    // ================= TIER 1 =================
    steam: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="st_g" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stop-color="#4ad4ff" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.2"/>
                </linearGradient>
            </defs>
            <path d="M35 85 Q25 68 35 52 Q48 38 38 25 Q30 15 40 8"
                  stroke="url(#st_g)" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M55 87 Q45 70 55 55 Q68 42 58 28 Q50 18 60 10"
                  stroke="url(#st_g)" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M72 88 Q64 74 72 62 Q82 50 74 38"
                  stroke="url(#st_g)" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>
        </svg>`,

    dust: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <g fill="#c8b898" opacity="0.85">
                <circle cx="25" cy="35" r="3"/>
                <circle cx="40" cy="28" r="2"/>
                <circle cx="58" cy="32" r="3.5"/>
                <circle cx="72" cy="40" r="2.5"/>
                <circle cx="30" cy="55" r="4"/>
                <circle cx="48" cy="48" r="3"/>
                <circle cx="68" cy="58" r="4"/>
                <circle cx="22" cy="72" r="3"/>
                <circle cx="45" cy="70" r="3.5"/>
                <circle cx="62" cy="75" r="2.5"/>
                <circle cx="78" cy="70" r="3"/>
                <circle cx="55" cy="82" r="2"/>
                <circle cx="35" cy="82" r="2.5"/>
            </g>
            <g fill="#8a7a5a" opacity="0.5">
                <circle cx="20" cy="45" r="2"/>
                <circle cx="55" cy="22" r="1.5"/>
                <circle cx="80" cy="52" r="2"/>
                <circle cx="70" cy="82" r="1.5"/>
            </g>
        </svg>`,

    mud: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="mud_g" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stop-color="#7a5a3a"/>
                    <stop offset="100%" stop-color="#3a2a14"/>
                </radialGradient>
            </defs>
            <ellipse cx="50" cy="72" rx="38" ry="16" fill="url(#mud_g)"/>
            <ellipse cx="35" cy="65" rx="10" ry="8" fill="url(#mud_g)"/>
            <ellipse cx="60" cy="62" rx="12" ry="10" fill="url(#mud_g)"/>
            <ellipse cx="72" cy="68" rx="8" ry="6" fill="url(#mud_g)"/>
            <ellipse cx="42" cy="55" rx="6" ry="5" fill="url(#mud_g)"/>
            <circle cx="35" cy="63" r="2" fill="#aa8866" opacity="0.7"/>
            <circle cx="60" cy="60" r="2.5" fill="#aa8866" opacity="0.7"/>
            <circle cx="50" cy="70" r="2" fill="#aa8866" opacity="0.5"/>
        </svg>`,

    lava: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="lv_g" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stop-color="#ffee44"/>
                    <stop offset="40%" stop-color="#ff7722"/>
                    <stop offset="100%" stop-color="#aa2200"/>
                </radialGradient>
            </defs>
            <path d="M15 40 Q25 35 35 45 Q45 55 55 42 Q65 30 75 42 Q85 55 88 50 L88 85 L12 85 Z"
                  fill="url(#lv_g)"/>
            <ellipse cx="35" cy="55" rx="4" ry="3" fill="#ffee88" opacity="0.9"/>
            <ellipse cx="60" cy="60" rx="5" ry="4" fill="#ffee88" opacity="0.9"/>
            <ellipse cx="75" cy="65" rx="3" ry="2" fill="#ffee88" opacity="0.9"/>
            <ellipse cx="48" cy="72" rx="4" ry="3" fill="#ffee88" opacity="0.8"/>
            <ellipse cx="35" cy="55" rx="1.5" ry="1" fill="#fff"/>
            <ellipse cx="60" cy="60" rx="2" ry="1.2" fill="#fff"/>
        </svg>`,

    spark: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="sp_g" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="40%" stop-color="#ffee44"/>
                    <stop offset="100%" stop-color="#ffaa00"/>
                </radialGradient>
            </defs>
            <path d="M50 20 L54 44 L78 48 L54 52 L50 76 L46 52 L22 48 L46 44 Z"
                  fill="url(#sp_g)" stroke="#aa6600" stroke-width="1"/>
            <path d="M50 38 L52 48 L62 50 L52 52 L50 62 L48 52 L38 50 L48 48 Z"
                  fill="#fff" opacity="0.8"/>
            <circle cx="50" cy="50" r="3" fill="#fff"/>
        </svg>`,

    snow: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <g fill="#fff" opacity="0.95">
                <circle cx="20" cy="30" r="4"/>
                <circle cx="35" cy="20" r="3"/>
                <circle cx="52" cy="28" r="5"/>
                <circle cx="70" cy="22" r="4"/>
                <circle cx="82" cy="38" r="3"/>
                <circle cx="15" cy="55" r="4"/>
                <circle cx="32" cy="48" r="5"/>
                <circle cx="50" cy="55" r="4"/>
                <circle cx="68" cy="50" r="5"/>
                <circle cx="85" cy="60" r="3"/>
                <circle cx="22" cy="75" r="4"/>
                <circle cx="42" cy="80" r="5"/>
                <circle cx="62" cy="78" r="4"/>
                <circle cx="78" cy="82" r="3"/>
            </g>
            <g fill="#a8d8ff" opacity="0.6">
                <circle cx="45" cy="35" r="2"/>
                <circle cx="60" cy="68" r="2.5"/>
                <circle cx="28" cy="60" r="2"/>
            </g>
        </svg>`,

    // ================= TIER 2 =================
    cloud: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="cl_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="100%" stop-color="#a8b8d0"/>
                </linearGradient>
            </defs>
            <ellipse cx="35" cy="55" rx="22" ry="18" fill="url(#cl_g)"/>
            <ellipse cx="60" cy="50" rx="25" ry="20" fill="url(#cl_g)"/>
            <ellipse cx="45" cy="65" rx="26" ry="14" fill="url(#cl_g)"/>
            <ellipse cx="70" cy="62" rx="18" ry="13" fill="url(#cl_g)"/>
            <ellipse cx="38" cy="48" rx="10" ry="7" fill="#fff" opacity="0.6"/>
        </svg>`,

    ash: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <g opacity="0.85">
                <path d="M50 25 Q45 35 50 45 Q55 55 50 65 Q45 75 50 85"
                      stroke="#8a8a8a" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M35 40 Q30 50 35 60 Q40 70 35 80"
                      stroke="#6a6a6a" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M65 40 Q70 50 65 60 Q60 70 65 80"
                      stroke="#6a6a6a" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M25 50 Q22 58 25 66"
                      stroke="#4a4a4a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M75 50 Q78 58 75 66"
                      stroke="#4a4a4a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            </g>
        </svg>`,

    sprout: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="spr_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#88ee66"/>
                    <stop offset="100%" stop-color="#2a8822"/>
                </linearGradient>
            </defs>
            <path d="M50 90 L50 40" stroke="#4a8822" stroke-width="4" stroke-linecap="round"/>
            <path d="M50 55 Q30 45 22 30 Q42 32 50 55 Z" fill="url(#spr_g)"/>
            <path d="M50 45 Q70 35 78 22 Q58 24 50 45 Z" fill="url(#spr_g)"/>
            <circle cx="50" cy="88" r="6" fill="#3a2a14"/>
            <circle cx="50" cy="88" r="3" fill="#2a1a08"/>
        </svg>`,

    glacier: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="gl_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#e8f8ff"/>
                    <stop offset="100%" stop-color="#6aa8d8"/>
                </linearGradient>
            </defs>
            <path d="M20 75 L30 30 L50 20 L75 35 L82 75 Z" fill="url(#gl_g)" stroke="#4a7898" stroke-width="1.5"/>
            <path d="M30 30 L50 50 L75 35 M50 50 L50 75 M38 45 L50 50 M62 55 L50 50"
                  stroke="#4a7898" stroke-width="1" fill="none" opacity="0.6"/>
            <path d="M35 35 L45 40 L40 50" fill="#fff" opacity="0.4"/>
        </svg>`,

    crystal: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="cr_g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="50%" stop-color="#b8f0ff"/>
                    <stop offset="100%" stop-color="#4a9ed0"/>
                </linearGradient>
            </defs>
            <path d="M50 12 L75 40 L68 85 L32 85 L25 40 Z" fill="url(#cr_g)" stroke="#2a6a9a" stroke-width="1.5"/>
            <path d="M50 12 L50 85 M25 40 L68 85 M75 40 L32 85"
                  stroke="#2a6a9a" stroke-width="0.8" opacity="0.5" fill="none"/>
            <path d="M42 30 L45 45 L38 42 Z" fill="#fff" opacity="0.8"/>
        </svg>`,

    ocean: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="oc_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4ad4ff"/>
                    <stop offset="100%" stop-color="#0a3a6a"/>
                </linearGradient>
            </defs>
            <path d="M5 60 Q20 45 35 60 Q50 75 65 60 Q80 45 95 60 L95 90 L5 90 Z" fill="url(#oc_g)"/>
            <path d="M5 50 Q20 38 35 50 Q50 62 65 50 Q80 38 95 50"
                  fill="none" stroke="#88e0ff" stroke-width="3" stroke-linecap="round"/>
            <path d="M5 68 Q20 58 35 68 Q50 78 65 68 Q80 58 95 68"
                  fill="none" stroke="#a8e8ff" stroke-width="2" opacity="0.6" stroke-linecap="round"/>
            <circle cx="25" cy="55" r="2" fill="#fff" opacity="0.7"/>
            <circle cx="55" cy="52" r="1.5" fill="#fff" opacity="0.5"/>
            <circle cx="78" cy="56" r="2" fill="#fff" opacity="0.6"/>
        </svg>`,

    // ================= TIER 3 =================
    rain: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="rn_cl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#d8e8f8"/>
                    <stop offset="100%" stop-color="#8898b0"/>
                </linearGradient>
            </defs>
            <ellipse cx="35" cy="30" rx="20" ry="14" fill="url(#rn_cl)"/>
            <ellipse cx="60" cy="28" rx="22" ry="15" fill="url(#rn_cl)"/>
            <ellipse cx="48" cy="36" rx="24" ry="12" fill="url(#rn_cl)"/>
            <g stroke="#4ad4ff" stroke-width="2.5" stroke-linecap="round" opacity="0.85">
                <line x1="28" y1="50" x2="25" y2="65"/>
                <line x1="42" y1="52" x2="39" y2="70"/>
                <line x1="56" y1="50" x2="53" y2="67"/>
                <line x1="70" y1="52" x2="67" y2="68"/>
                <line x1="35" y1="70" x2="32" y2="82"/>
                <line x1="50" y1="72" x2="47" y2="85"/>
                <line x1="64" y1="70" x2="61" y2="83"/>
            </g>
        </svg>`,

    stone: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="sto_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#a89888"/>
                    <stop offset="100%" stop-color="#5a4a3a"/>
                </linearGradient>
            </defs>
            <path d="M25 70 L15 50 L28 25 L55 18 L80 30 L85 55 L72 78 L42 82 Z"
                  fill="url(#sto_g)" stroke="#3a2a1a" stroke-width="1.5"/>
            <path d="M35 40 L45 32 M60 30 L72 38 M40 60 L55 55 M65 65 L75 58"
                  stroke="#3a2a1a" stroke-width="1" opacity="0.6" fill="none"/>
            <path d="M28 48 L40 42 L50 50" fill="none" stroke="#8a7a68" stroke-width="1.5" opacity="0.5"/>
            <path d="M60 20 L70 26" fill="none" stroke="#c8b8a0" stroke-width="1.5" opacity="0.5"/>
        </svg>`,

    tree: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <rect x="45" y="70" width="10" height="25" fill="#5a3a1a"/>
            <rect x="43" y="75" width="14" height="3" fill="#3a1a08"/>
            <circle cx="50" cy="45" r="22" fill="#2a6622"/>
            <circle cx="35" cy="52" r="16" fill="#3a882a"/>
            <circle cx="65" cy="52" r="16" fill="#3a882a"/>
            <circle cx="50" cy="35" r="15" fill="#4aa832"/>
            <circle cx="42" cy="42" r="4" fill="#88ee66" opacity="0.6"/>
            <circle cx="58" cy="38" r="3" fill="#88ee66" opacity="0.5"/>
            <circle cx="50" cy="55" r="2" fill="#88ee66" opacity="0.4"/>
        </svg>`,

    mirror: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="mi_g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="30%" stop-color="#c8e8ff"/>
                    <stop offset="60%" stop-color="#88b8e0"/>
                    <stop offset="100%" stop-color="#ffffff"/>
                </linearGradient>
            </defs>
            <ellipse cx="50" cy="50" rx="32" ry="38" fill="#8a6a3a"/>
            <ellipse cx="50" cy="50" rx="28" ry="34" fill="url(#mi_g)"/>
            <path d="M35 30 L45 65 M65 32 L55 68" stroke="#fff" stroke-width="2" opacity="0.7" fill="none"/>
            <path d="M30 55 L40 45 L50 55 L60 45 L70 55"
                  stroke="#ffffff" stroke-width="1.5" opacity="0.5" fill="none"/>
        </svg>`,

    diamond: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="di_g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="50%" stop-color="#b8f0ff"/>
                    <stop offset="100%" stop-color="#4a9ed0"/>
                </linearGradient>
            </defs>
            <path d="M30 30 L50 15 L70 30 L80 55 L50 90 L20 55 Z"
                  fill="url(#di_g)" stroke="#2a6a9a" stroke-width="1.5"/>
            <path d="M30 30 L80 55 M70 30 L20 55 M50 15 L50 90 M30 30 L50 55 M70 30 L50 55"
                  stroke="#2a6a9a" stroke-width="0.8" opacity="0.5" fill="none"/>
            <path d="M42 32 L46 50 L38 45 Z" fill="#fff" opacity="0.9"/>
            <path d="M58 35 L62 48 L55 46 Z" fill="#fff" opacity="0.6"/>
        </svg>`,

    snowman: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <circle cx="50" cy="72" r="20" fill="#f0f8ff" stroke="#a8c8e0" stroke-width="1"/>
            <circle cx="50" cy="45" r="15" fill="#f0f8ff" stroke="#a8c8e0" stroke-width="1"/>
            <circle cx="50" cy="25" r="11" fill="#f0f8ff" stroke="#a8c8e0" stroke-width="1"/>
            <circle cx="46" cy="23" r="1.5" fill="#2a1a08"/>
            <circle cx="54" cy="23" r="1.5" fill="#2a1a08"/>
            <path d="M50 26 L54 28 L50 29 Z" fill="#ff8822"/>
            <circle cx="50" cy="42" r="1.2" fill="#2a1a08"/>
            <circle cx="50" cy="48" r="1.2" fill="#2a1a08"/>
            <line x1="68" y1="65" x2="82" y2="40" stroke="#5a3a1a" stroke-width="2.5"/>
            <path d="M80 38 L88 34 M80 40 L88 42 M82 36 L86 38" stroke="#aa8822" stroke-width="1.5"/>
        </svg>`,

    // ================= TIER 4 =================
    storm: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="stm_cl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4a5a78"/>
                    <stop offset="100%" stop-color="#1a2a48"/>
                </linearGradient>
            </defs>
            <ellipse cx="35" cy="30" rx="22" ry="14" fill="url(#stm_cl)"/>
            <ellipse cx="62" cy="28" rx="24" ry="15" fill="url(#stm_cl)"/>
            <ellipse cx="50" cy="38" rx="26" ry="12" fill="url(#stm_cl)"/>
            <path d="M55 40 L40 65 L50 65 L42 85 L65 58 L53 58 L62 40 Z"
                  fill="#ffee44" stroke="#ffaa00" stroke-width="1.5"/>
        </svg>`,

    volcano: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="vl_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#5a4a3a"/>
                    <stop offset="100%" stop-color="#2a1a0a"/>
                </linearGradient>
            </defs>
            <path d="M10 88 L38 42 L45 45 L55 45 L62 42 L90 88 Z" fill="url(#vl_g)"/>
            <path d="M38 42 L50 30 L62 42 L55 45 L45 45 Z" fill="#3a2a1a"/>
            <ellipse cx="50" cy="30" rx="12" ry="5" fill="#ff4422"/>
            <ellipse cx="50" cy="30" rx="8" ry="3" fill="#ffcc22"/>
            <path d="M42 30 Q35 20 30 12" stroke="#ff6622" stroke-width="3" fill="none" opacity="0.8" stroke-linecap="round"/>
            <path d="M58 30 Q65 18 70 10" stroke="#ff6622" stroke-width="3" fill="none" opacity="0.8" stroke-linecap="round"/>
            <circle cx="32" cy="18" r="2" fill="#ff4422" opacity="0.7"/>
            <circle cx="68" cy="15" r="2.5" fill="#ff4422" opacity="0.6"/>
            <circle cx="50" cy="12" r="2" fill="#ffaa22" opacity="0.7"/>
            <path d="M46 45 Q44 60 48 75" stroke="#ff4422" stroke-width="2.5" fill="none" opacity="0.8"/>
            <path d="M54 45 Q56 58 52 72" stroke="#ff4422" stroke-width="2.5" fill="none" opacity="0.8"/>
        </svg>`,

    forest: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <ellipse cx="20" cy="55" rx="12" ry="20" fill="#1a4418"/>
            <ellipse cx="80" cy="55" rx="12" ry="20" fill="#1a4418"/>
            <ellipse cx="35" cy="52" rx="14" ry="24" fill="#2a6622"/>
            <ellipse cx="65" cy="52" rx="14" ry="24" fill="#2a6622"/>
            <ellipse cx="50" cy="45" rx="16" ry="28" fill="#3a882a"/>
            <rect x="47" y="70" width="6" height="20" fill="#5a3a1a"/>
            <rect x="18" y="70" width="4" height="18" fill="#3a1a08"/>
            <rect x="78" y="70" width="4" height="18" fill="#3a1a08"/>
            <rect x="33" y="72" width="4" height="16" fill="#3a1a08"/>
            <rect x="63" y="72" width="4" height="16" fill="#3a1a08"/>
            <circle cx="48" cy="35" r="4" fill="#88ee66" opacity="0.4"/>
            <circle cx="35" cy="45" r="3" fill="#88ee66" opacity="0.3"/>
            <circle cx="65" cy="45" r="3" fill="#88ee66" opacity="0.3"/>
        </svg>`,

    moon: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="mn_g" cx="40%" cy="35%" r="70%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="60%" stop-color="#e8dcc0"/>
                    <stop offset="100%" stop-color="#a89880"/>
                </radialGradient>
                <radialGradient id="mn_halo" cx="50%" cy="50%" r="50%">
                    <stop offset="55%" stop-color="#ffdd88" stop-opacity="0"/>
                    <stop offset="100%" stop-color="#ffdd88" stop-opacity="0.5"/>
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#mn_halo)"/>
            <circle cx="50" cy="50" r="28" fill="url(#mn_g)"/>
            <circle cx="42" cy="42" r="5" fill="#b8a888" opacity="0.6"/>
            <circle cx="58" cy="55" r="4" fill="#b8a888" opacity="0.5"/>
            <circle cx="48" cy="62" r="3" fill="#b8a888" opacity="0.6"/>
            <circle cx="60" cy="38" r="3" fill="#b8a888" opacity="0.4"/>
        </svg>`,

    tiara: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="ti_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="40%" stop-color="#c8e8ff"/>
                    <stop offset="100%" stop-color="#88b8e0"/>
                </linearGradient>
            </defs>
            <path d="M20 70 L15 45 L30 58 L40 35 L50 55 L60 30 L70 55 L80 40 L85 65 Z"
                  fill="url(#ti_g)" stroke="#4a7898" stroke-width="1.5"/>
            <path d="M15 45 L50 40 L85 65" stroke="#4a7898" stroke-width="0.8" fill="none" opacity="0.5"/>
            <circle cx="30" cy="55" r="3" fill="#4ad4ff"/>
            <circle cx="50" cy="52" r="4" fill="#b388ff"/>
            <circle cx="70" cy="55" r="3" fill="#4ad4ff"/>
            <circle cx="40" cy="38" r="2" fill="#fff"/>
            <circle cx="60" cy="35" r="2" fill="#fff"/>
        </svg>`,

    mountain: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="mt_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="30%" stop-color="#88a8c8"/>
                    <stop offset="100%" stop-color="#3a4a6a"/>
                </linearGradient>
            </defs>
            <path d="M5 88 L35 40 L45 55 L60 25 L95 88 Z" fill="url(#mt_g)" stroke="#2a3a5a" stroke-width="1.5"/>
            <path d="M60 25 L70 45 L65 42 L60 48 L55 42 L50 45 Z" fill="#fff" opacity="0.9"/>
            <path d="M35 40 L42 55 L38 52 L34 58 L30 52 L26 55 Z" fill="#fff" opacity="0.7"/>
            <path d="M60 25 L35 40 M60 25 L95 88" stroke="#5a6a8a" stroke-width="0.8" fill="none" opacity="0.5"/>
        </svg>`,

    // ================= TIER 5 =================
    planet: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="pl_g" cx="35%" cy="35%" r="70%">
                    <stop offset="0%" stop-color="#ffcc88"/>
                    <stop offset="50%" stop-color="#cc7744"/>
                    <stop offset="100%" stop-color="#552211"/>
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="26" fill="url(#pl_g)"/>
            <ellipse cx="50" cy="50" rx="42" ry="12" fill="none" stroke="#ffcc88" stroke-width="3" opacity="0.7" transform="rotate(-20 50 50)"/>
            <ellipse cx="50" cy="50" rx="42" ry="12" fill="none" stroke="#ffeeaa" stroke-width="1.5" opacity="0.5" transform="rotate(-20 50 50)"/>
            <ellipse cx="42" cy="42" rx="5" ry="3" fill="#ffffff" opacity="0.3"/>
        </svg>`,

    island: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="isl_w" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#4ad4ff"/>
                    <stop offset="100%" stop-color="#0a3a6a"/>
                </linearGradient>
            </defs>
            <path d="M0 70 Q25 65 50 70 Q75 75 100 70 L100 100 L0 100 Z" fill="url(#isl_w)"/>
            <ellipse cx="50" cy="70" rx="30" ry="8" fill="#f0d890"/>
            <path d="M50 68 L52 35" stroke="#7a5a2a" stroke-width="3" stroke-linecap="round"/>
            <path d="M52 35 Q35 30 25 38 Q38 35 52 40 Z" fill="#2a8822"/>
            <path d="M52 35 Q70 28 78 38 Q65 33 52 40 Z" fill="#3a9822"/>
            <path d="M52 35 Q45 22 55 15 Q52 25 50 35 Z" fill="#3a9822"/>
            <path d="M52 35 Q60 22 72 25 Q60 30 55 38 Z" fill="#2a8822"/>
            <circle cx="52" cy="40" r="2" fill="#5a3a1a"/>
            <circle cx="49" cy="42" r="1.8" fill="#5a3a1a"/>
        </svg>`,

    unicorn: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="un_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="100%" stop-color="#e8d8f8"/>
                </linearGradient>
                <linearGradient id="un_horn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffee44"/>
                    <stop offset="100%" stop-color="#ffaa22"/>
                </linearGradient>
            </defs>
            <path d="M55 15 L60 38 L52 38 Z" fill="url(#un_horn)" stroke="#cc8800" stroke-width="0.8"/>
            <line x1="53" y1="22" x2="58" y2="30" stroke="#cc8800" stroke-width="0.5"/>
            <path d="M38 45 Q35 35 45 32 Q58 30 65 38 Q70 45 68 55 Q65 68 55 72 Q45 72 40 65 Z" fill="url(#un_g)" stroke="#b8a8d8" stroke-width="1"/>
            <ellipse cx="52" cy="45" rx="2.5" ry="3" fill="#4a2a8a"/>
            <circle cx="52.5" cy="44" r="1" fill="#fff"/>
            <path d="M60 33 L64 24 L66 32 Z" fill="url(#un_g)" stroke="#b8a8d8" stroke-width="0.8"/>
            <path d="M42 40 Q35 45 40 55 Q36 60 42 65"
                  fill="none" stroke="#b388ff" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
            <path d="M45 38 Q38 40 42 50"
                  fill="none" stroke="#ffccff" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
            <circle cx="63" cy="58" r="1.5" fill="#8a7aa8"/>
        </svg>`,

    crown: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="cw_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffee44"/>
                    <stop offset="60%" stop-color="#ffaa22"/>
                    <stop offset="100%" stop-color="#cc6600"/>
                </linearGradient>
            </defs>
            <path d="M15 75 L20 45 L32 60 L45 30 L50 55 L55 30 L68 60 L80 45 L85 75 Z"
                  fill="url(#cw_g)" stroke="#aa6600" stroke-width="1.5"/>
            <rect x="15" y="72" width="70" height="8" rx="2" fill="url(#cw_g)" stroke="#aa6600" stroke-width="1.5"/>
            <circle cx="50" cy="52" r="3" fill="#ff4444"/>
            <circle cx="30" cy="58" r="2" fill="#4ad4ff"/>
            <circle cx="70" cy="58" r="2" fill="#4ad4ff"/>
            <circle cx="45" cy="35" r="2" fill="#fff"/>
            <circle cx="55" cy="35" r="2" fill="#fff"/>
            <rect x="45" y="74" width="4" height="4" fill="#ff4444"/>
            <rect x="60" y="74" width="4" height="4" fill="#44ff88"/>
            <rect x="30" y="74" width="4" height="4" fill="#4ad4ff"/>
        </svg>`,

    permafrost: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="pf_g" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="40%" stop-color="#c8e8ff"/>
                    <stop offset="100%" stop-color="#4a88b8"/>
                </radialGradient>
                <radialGradient id="pf_halo" cx="50%" cy="50%" r="50%">
                    <stop offset="50%" stop-color="#88ccff" stop-opacity="0.4"/>
                    <stop offset="100%" stop-color="#88ccff" stop-opacity="0"/>
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="url(#pf_halo)"/>
            <path d="M50 15 L78 42 L72 82 L28 82 L22 42 Z" fill="url(#pf_g)" stroke="#2a6898" stroke-width="1.5"/>
            <path d="M50 15 L50 82 M22 42 L72 82 M78 42 L28 82"
                  stroke="#2a6898" stroke-width="1" opacity="0.5" fill="none"/>
            <path d="M42 30 L46 45 L38 42 Z" fill="#fff" opacity="0.9"/>
            <path d="M58 35 L62 48 L55 46 Z" fill="#fff" opacity="0.6"/>
            <path d="M50 25 L46 32 M50 25 L54 32" stroke="#fff" stroke-width="1" opacity="0.7"/>
            <path d="M35 55 L32 62 M35 55 L38 62" stroke="#fff" stroke-width="1" opacity="0.6"/>
            <path d="M65 55 L62 62 M65 55 L68 62" stroke="#fff" stroke-width="1" opacity="0.6"/>
        </svg>`,

    dragon: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="dr_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ff8844"/>
                    <stop offset="100%" stop-color="#aa2200"/>
                </linearGradient>
            </defs>
            <path d="M50 48 L12 28 L22 48 L8 55 L25 62 L50 58 Z" fill="url(#dr_g)" stroke="#660a00" stroke-width="1"/>
            <path d="M50 48 L88 28 L78 48 L92 55 L75 62 L50 58 Z" fill="url(#dr_g)" stroke="#660a00" stroke-width="1"/>
            <ellipse cx="50" cy="62" rx="16" ry="20" fill="url(#dr_g)"/>
            <path d="M50 30 Q42 26 40 36 Q38 46 50 46 Q62 46 60 36 Q58 26 50 30 Z" fill="url(#dr_g)" stroke="#660a00" stroke-width="1"/>
            <path d="M44 27 L36 14 L44 22 Z" fill="#aa2200" stroke="#660a00" stroke-width="0.8"/>
            <path d="M56 27 L64 14 L56 22 Z" fill="#aa2200" stroke="#660a00" stroke-width="0.8"/>
            <circle cx="46" cy="35" r="2.5" fill="#ffee44"/>
            <circle cx="54" cy="35" r="2.5" fill="#ffee44"/>
            <circle cx="46" cy="35" r="1" fill="#aa2200"/>
            <circle cx="54" cy="35" r="1" fill="#aa2200"/>
            <ellipse cx="50" cy="48" rx="5" ry="3" fill="#ffee44"/>
            <ellipse cx="50" cy="48" rx="3" ry="2" fill="#fff"/>
        </svg>`,

    // ================= TIER 6 =================
    galaxy: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="gx_g" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="25%" stop-color="#b388ff"/>
                    <stop offset="60%" stop-color="#4a2a8a"/>
                    <stop offset="100%" stop-color="#0a0715"/>
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="url(#gx_g)"/>
            <ellipse cx="50" cy="50" rx="38" ry="12" fill="none"
                     stroke="#ffffff" stroke-width="0.8" opacity="0.5"
                     transform="rotate(-30 50 50)"/>
            <ellipse cx="50" cy="50" rx="30" ry="8" fill="none"
                     stroke="#ffccff" stroke-width="0.6" opacity="0.4"
                     transform="rotate(-30 50 50)"/>
            <ellipse cx="50" cy="50" rx="38" ry="12" fill="none"
                     stroke="#88aaff" stroke-width="0.6" opacity="0.4"
                     transform="rotate(60 50 50)"/>
            <circle cx="25" cy="30" r="1.5" fill="#fff"/>
            <circle cx="72" cy="35" r="1" fill="#fff"/>
            <circle cx="35" cy="72" r="1.2" fill="#fff"/>
            <circle cx="68" cy="75" r="1" fill="#fff"/>
            <circle cx="50" cy="50" r="2" fill="#fff"/>
            <circle cx="60" cy="55" r="1" fill="#ffeeff"/>
            <circle cx="40" cy="45" r="1.2" fill="#ffeeff"/>
        </svg>`,

    phoenix: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="ph_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffee44"/>
                    <stop offset="40%" stop-color="#ff7722"/>
                    <stop offset="100%" stop-color="#cc1122"/>
                </linearGradient>
            </defs>
            <path d="M50 65 L35 88 L42 75 L40 92 L50 78 L60 92 L58 75 L65 88 Z"
                  fill="url(#ph_g)" opacity="0.85"/>
            <path d="M50 45 Q28 35 12 18 Q26 30 35 45 Q28 48 15 55 Q30 50 50 55 Z"
                  fill="url(#ph_g)"/>
            <path d="M50 45 Q72 35 88 18 Q74 30 65 45 Q72 48 85 55 Q70 50 50 55 Z"
                  fill="url(#ph_g)"/>
            <ellipse cx="50" cy="55" rx="9" ry="14" fill="url(#ph_g)"/>
            <circle cx="50" cy="38" r="7" fill="url(#ph_g)"/>
            <path d="M50 36 L53 32 L47 32 Z" fill="#ffcc44"/>
            <circle cx="47" cy="37" r="1.2" fill="#fff"/>
            <circle cx="53" cy="37" r="1.2" fill="#fff"/>
            <circle cx="47" cy="37" r="0.5" fill="#000"/>
            <circle cx="53" cy="37" r="0.5" fill="#000"/>
            <path d="M50 25 Q46 20 50 15 Q54 20 50 25 Z" fill="#ffee44" opacity="0.8"/>
        </svg>`,

    citadel: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="ct_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#c8d8e8"/>
                    <stop offset="100%" stop-color="#6a7a8a"/>
                </linearGradient>
            </defs>
            <rect x="20" y="55" width="60" height="40" fill="url(#ct_g)" stroke="#3a4a5a" stroke-width="1.5"/>
            <path d="M20 55 L20 48 L28 48 L28 55 L34 55 L34 48 L42 48 L42 55 L48 55 L48 48 L56 48 L56 55 L62 55 L62 48 L70 48 L70 55 L76 55 L76 48 L80 48 L80 55 Z"
                  fill="url(#ct_g)" stroke="#3a4a5a" stroke-width="1.5"/>
            <rect x="42" y="25" width="16" height="30" fill="url(#ct_g)" stroke="#3a4a5a" stroke-width="1.5"/>
            <path d="M40 25 L50 12 L60 25 Z" fill="#cc4422" stroke="#3a4a5a" stroke-width="1.5"/>
            <line x1="50" y1="12" x2="50" y2="5" stroke="#3a4a5a" stroke-width="1.5"/>
            <path d="M50 5 L58 8 L50 11 Z" fill="#ffee44"/>
            <rect x="47" y="35" width="6" height="8" rx="3" fill="#1a1a2a"/>
            <rect x="27" y="68" width="5" height="8" rx="2.5" fill="#1a1a2a"/>
            <rect x="68" y="68" width="5" height="8" rx="2.5" fill="#1a1a2a"/>
            <rect x="47" y="68" width="6" height="10" fill="#1a1a2a"/>
            <rect x="49" y="68" width="2" height="10" fill="#ffee44" opacity="0.6"/>
        </svg>`,

    explosion: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="ex_g" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="30%" stop-color="#ffee44"/>
                    <stop offset="60%" stop-color="#ff7722"/>
                    <stop offset="100%" stop-color="#cc1122"/>
                </radialGradient>
            </defs>
            <g fill="url(#ex_g)" opacity="0.9">
                <path d="M50 5 L55 40 L60 5 Z"/>
                <path d="M95 50 L60 55 L95 60 Z"/>
                <path d="M50 95 L55 60 L60 95 Z"/>
                <path d="M5 50 L40 55 L5 60 Z"/>
                <path d="M80 20 L60 45 L85 25 Z"/>
                <path d="M20 80 L45 60 L25 85 Z"/>
                <path d="M80 80 L60 55 L85 85 Z"/>
                <path d="M20 20 L45 40 L25 15 Z"/>
            </g>
            <circle cx="50" cy="50" r="20" fill="url(#ex_g)"/>
            <circle cx="50" cy="50" r="10" fill="#ffffff" opacity="0.95"/>
            <circle cx="50" cy="50" r="5" fill="#ffee44"/>
        </svg>`,

    // ================= TIER 7 =================
    universe: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="uni_g" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ffddff"/>
                    <stop offset="30%" stop-color="#b388ff"/>
                    <stop offset="70%" stop-color="#4a2a8a"/>
                    <stop offset="100%" stop-color="#0a0715"/>
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="url(#uni_g)"/>
            <circle cx="30" cy="30" r="1.5" fill="#fff"/>
            <circle cx="72" cy="38" r="1" fill="#fff"/>
            <circle cx="40" cy="70" r="1.2" fill="#fff"/>
            <circle cx="65" cy="72" r="1.5" fill="#fff"/>
            <circle cx="25" cy="55" r="1" fill="#fff"/>
            <circle cx="78" cy="58" r="1" fill="#fff"/>
            <circle cx="55" cy="20" r="1" fill="#fff"/>
            <circle cx="50" cy="50" r="2.5" fill="#fff"/>
            <circle cx="35" cy="45" r="1" fill="#ffeeff"/>
            <circle cx="62" cy="55" r="1.2" fill="#ffeeff"/>
            <ellipse cx="50" cy="50" rx="38" ry="13" fill="none"
                     stroke="#ffffff" stroke-width="0.7" opacity="0.4"
                     transform="rotate(-30 50 50)"/>
            <ellipse cx="50" cy="50" rx="30" ry="9" fill="none"
                     stroke="#ffffff" stroke-width="0.5" opacity="0.3"
                     transform="rotate(-30 50 50)"/>
            <circle cx="50" cy="50" r="44" fill="none" stroke="#ffddff" stroke-width="1" opacity="0.6">
                <animate attributeName="r" values="44;48;44" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite"/>
            </circle>
        </svg>`,

    throne: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <linearGradient id="th_g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#ffee44"/>
                    <stop offset="40%" stop-color="#ff9933"/>
                    <stop offset="100%" stop-color="#aa4411"/>
                </linearGradient>
            </defs>
            <path d="M30 15 L40 8 L50 5 L60 8 L70 15 L70 65 L30 65 Z"
                  fill="url(#th_g)" stroke="#662200" stroke-width="1.5"/>
            <path d="M30 15 L25 8 L30 22 Z" fill="#ffcc44" stroke="#662200" stroke-width="1"/>
            <path d="M50 5 L50 -3 L55 8 Z" fill="#ffcc44" stroke="#662200" stroke-width="1"/>
            <path d="M70 15 L75 8 L70 22 Z" fill="#ffcc44" stroke="#662200" stroke-width="1"/>
            <rect x="28" y="60" width="44" height="10" fill="url(#th_g)" stroke="#662200" stroke-width="1.5"/>
            <rect x="30" y="70" width="6" height="25" fill="#662200"/>
            <rect x="64" y="70" width="6" height="25" fill="#662200"/>
            <rect x="30" y="88" width="40" height="4" fill="#662200"/>
            <circle cx="50" cy="35" r="5" fill="#ff4444" opacity="0.9"/>
            <circle cx="50" cy="35" r="2.5" fill="#fff" opacity="0.8"/>
            <path d="M20 55 L28 55 L28 65 L20 65 Z" fill="url(#th_g)" stroke="#662200" stroke-width="1"/>
            <path d="M72 55 L80 55 L80 65 L72 65 Z" fill="url(#th_g)" stroke="#662200" stroke-width="1"/>
            <line x1="78" y1="30" x2="85" y2="20" stroke="#ffee44" stroke-width="2"/>
            <circle cx="87" cy="17" r="3" fill="#ffee44" stroke="#cc8800" stroke-width="0.8">
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
            </circle>
        </svg>`,

    // ================= TIER 8 — АБСОЛЮТ =================
    philosopher: (s) => `
        <svg viewBox="0 0 100 100" width="${s}" height="${s}">
            <defs>
                <radialGradient id="phi_core" cx="45%" cy="35%" r="70%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="30%" stop-color="#ff4444"/>
                    <stop offset="70%" stop-color="#aa0022"/>
                    <stop offset="100%" stop-color="#550011"/>
                </radialGradient>
                <radialGradient id="phi_halo" cx="50%" cy="50%" r="50%">
                    <stop offset="50%" stop-color="#ff4466" stop-opacity="0.5"/>
                    <stop offset="100%" stop-color="#ff4466" stop-opacity="0"/>
                </radialGradient>
                <radialGradient id="phi_inner" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ffff88"/>
                    <stop offset="100%" stop-color="#ff4466" stop-opacity="0"/>
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#phi_halo)">
                <animate attributeName="r" values="44;48;44" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="50" cy="50" r="30" fill="url(#phi_inner)" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.9;0.6" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <path d="M50 10 L75 40 L68 80 L32 80 L25 40 Z" fill="url(#phi_core)" stroke="#ffaaaa" stroke-width="1"/>
            <path d="M50 10 L50 80" stroke="#ffaaaa" stroke-width="0.8" opacity="0.5" fill="none"/>
            <path d="M25 40 L68 80" stroke="#ffaaaa" stroke-width="0.8" opacity="0.3" fill="none"/>
            <path d="M75 40 L32 80" stroke="#ffaaaa" stroke-width="0.8" opacity="0.3" fill="none"/>
            <ellipse cx="43" cy="32" rx="4" ry="6" fill="#fff" opacity="0.7"/>
            <g>
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"/>
                <circle cx="50" cy="5" r="1.8" fill="#ffcc44">
                    <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite"/>
                </circle>
                <circle cx="95" cy="50" r="1.8" fill="#ffcc44">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite"/>
                </circle>
                <circle cx="50" cy="95" r="1.8" fill="#ffcc44">
                    <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite"/>
                </circle>
                <circle cx="5" cy="50" r="1.8" fill="#ffcc44">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite"/>
                </circle>
                <circle cx="82" cy="18" r="1.2" fill="#ffcc44"/>
                <circle cx="82" cy="82" r="1.2" fill="#ffcc44"/>
                <circle cx="18" cy="82" r="1.2" fill="#ffcc44"/>
                <circle cx="18" cy="18" r="1.2" fill="#ffcc44"/>
            </g>
        </svg>`
};

// ============================================================
// ГЛАВНАЯ ФУНКЦИЯ
// ============================================================
// cardArt('water', 60) → SVG строка 60×60
// cardArt('philosopher', 120) → SVG строка 120×120
function cardArt(cardId, size = 60) {
    const fn = CARD_ART[cardId];
    if (!fn) return '';
    return fn(size);
}

// Экспорт
window.CARD_ART = CARD_ART;
window.cardArt = cardArt;