// ============================================================
// ДОСТИЖЕНИЯ
// ============================================================

const ACHIEVEMENTS = [
    // Клики
    { id: 'click_100',     icon: '👆',  name: 'Новичок',          desc: '100 тапов',           check: d => d.clicks >= 100,          reward: 100 },
    { id: 'click_1000',    icon: '👋',  name: 'Активный',         desc: '1 000 тапов',         check: d => d.clicks >= 1000,         reward: 400 },
    { id: 'click_10000',   icon: '🤚',  name: 'Маньяк кликов',    desc: '10 000 тапов',        check: d => d.clicks >= 10000,        reward: 2000 },
    { id: 'click_100000',  icon: '💪',  name: 'Палец-легенда',    desc: '100 000 тапов',       check: d => d.clicks >= 100000,       reward: 15000 },

    // Карты
    { id: 'card_1',        icon: '🎴',  name: 'Первая карта',     desc: 'Открой 1 карту',      check: d => (d.seen||[]).length >= 1,     reward: 100 },
    { id: 'card_10',       icon: '🃏',  name: 'Коллекционер',     desc: 'Открой 10 карт',      check: d => (d.seen||[]).length >= 10,    reward: 800 },
    { id: 'card_20',       icon: '🎴',  name: 'Собиратель',       desc: 'Открой 20 карт',      check: d => (d.seen||[]).length >= 20,    reward: 3000 },
    { id: 'card_30',       icon: '📚',  name: 'Архивариус',       desc: 'Открой 30 карт',      check: d => (d.seen||[]).length >= 30,    reward: 8000 },
    { id: 'card_43',       icon: '🏆',  name: 'ПОЛНАЯ КОЛЛЕКЦИЯ', desc: 'Открой все 43 карты', check: d => (d.seen||[]).length >= 43,    reward: 100000 },

    // Слияния
    { id: 'merge_1',       icon: '⚗️',  name: 'Алхимик',          desc: '1 слияние',           check: d => (d.merges||0) >= 1,       reward: 100 },
    { id: 'merge_50',      icon: '🧪',  name: 'Лаборант',         desc: '50 слияний',          check: d => (d.merges||0) >= 50,      reward: 1000 },
    { id: 'merge_200',     icon: '⚗️',  name: 'Мастер зелий',     desc: '200 слияний',         check: d => (d.merges||0) >= 200,     reward: 6000 },
    { id: 'merge_1000',    icon: '🔮',  name: 'Великий алхимик',  desc: '1 000 слияний',       check: d => (d.merges||0) >= 1000,    reward: 40000 },

    // Философский камень
    { id: 'philosopher',   icon: '🔮',  name: 'АБСОЛЮТ',          desc: 'Философский камень',  check: d => (d.seen||[]).includes('philosopher'), reward: 250000 },

    // Уровни
    { id: 'level_5',       icon: '⭐',  name: 'Расту',            desc: 'Уровень 5',           check: d => (d.level||1) >= 5,        reward: 300 },
    { id: 'level_10',      icon: '🌟',  name: 'Опытный',          desc: 'Уровень 10',          check: d => (d.level||1) >= 10,       reward: 1500 },
    { id: 'level_25',      icon: '💫',  name: 'Ветеран',          desc: 'Уровень 25',          check: d => (d.level||1) >= 25,       reward: 8000 },
    { id: 'level_50',      icon: '✨',  name: 'Мастер',           desc: 'Уровень 50',          check: d => (d.level||1) >= 50,       reward: 30000 },
    { id: 'level_100',     icon: '🏅',  name: 'ЛЕГЕНДА',          desc: 'Уровень 100',         check: d => (d.level||1) >= 100,      reward: 200000 },

    // Рейтинг
    { id: 'rating_1000',   icon: '🥉',  name: 'Тысячник',         desc: '1 000 RP',            check: d => (d.rating||0) >= 1000,    reward: 500 },
    { id: 'rating_10000',  icon: '🥈',  name: 'Десятка',          desc: '10 000 RP',           check: d => (d.rating||0) >= 10000,   reward: 5000 },
    { id: 'rating_100000', icon: '🥇',  name: 'Сотка',            desc: '100 000 RP',          check: d => (d.rating||0) >= 100000,  reward: 50000 },

    // Стрик
    { id: 'streak_3',      icon: '🔥',  name: 'Разогрев',         desc: 'Стрик 3 дня',         check: d => (d.streak||0) >= 3,       reward: 300 },
    { id: 'streak_7',      icon: '🔥',  name: 'Неделя',           desc: 'Стрик 7 дней',        check: d => (d.streak||0) >= 7,       reward: 1500 },
    { id: 'streak_14',     icon: '🔥',  name: 'Две недели',       desc: 'Стрик 14 дней',       check: d => (d.streak||0) >= 14,      reward: 5000 },
    { id: 'streak_30',     icon: '🔥',  name: 'МЕСЯЦ',            desc: 'Стрик 30 дней',       check: d => (d.streak||0) >= 30,      reward: 30000 },

    // Эссенция
    { id: 'gold_10000',    icon: '💠',  name: 'Богач',            desc: '10 000 эссенции',     check: d => (d.totalGold||0) >= 10000,  reward: 500 },
    { id: 'gold_100000',   icon: '💎',  name: 'Миллионер',        desc: '100 000 эссенции',    check: d => (d.totalGold||0) >= 100000, reward: 5000 },
    { id: 'gold_1000000',  icon: '👑',  name: 'Магнат',           desc: '1 000 000 эссенции',  check: d => (d.totalGold||0) >= 1000000, reward: 50000 },
    { id: 'gold_10000000', icon: '💰',  name: 'ИМПЕРИЯ',          desc: '10 000 000 эссенции', check: d => (d.totalGold||0) >= 10000000, reward: 500000 },

    // Звёзды
    { id: 'star_1',        icon: '⭐',  name: 'Первая звезда',    desc: '1 звезда у карты',    check: d => Object.values(d.stars||{}).some(s => s >= 1), reward: 300 },
    { id: 'star_10',       icon: '🌟',  name: 'Десятка звёзд',    desc: '10 звёзд всего',      check: d => Object.values(d.stars||{}).reduce((a,b)=>a+b,0) >= 10, reward: 2500 },
    { id: 'star_50',       icon: '💫',  name: 'Созвездие',        desc: '50 звёзд всего',      check: d => Object.values(d.stars||{}).reduce((a,b)=>a+b,0) >= 50, reward: 25000 },
    { id: 'star_100',      icon: '✨',  name: 'Галактика',        desc: '100 звёзд всего',     check: d => Object.values(d.stars||{}).reduce((a,b)=>a+b,0) >= 100, reward: 100000 },
    { id: 'star_max',      icon: '🌠',  name: 'Пятизвёздочный',   desc: 'Карта на 5★',         check: d => Object.values(d.stars||{}).some(s => s >= 5), reward: 15000 }
];

// ============================================================
// ЛОГИКА
// ============================================================
function checkAchievements() {
    const d = state.data;
    if (!d.achievements) d.achievements = [];

    let unlocked = 0;

    for (const ach of ACHIEVEMENTS) {
        if (d.achievements.includes(ach.id)) continue;
        if (ach.check(d)) {
            d.achievements.push(ach.id);
            d.gold += ach.reward;
            unlocked++;

            setTimeout(() => {
                showAchievement(ach);
            }, unlocked * 500);
        }
    }

    if (unlocked > 0) {
        saveNow(true);
        updateUI();
        renderAchievements();
    }
}

function showAchievement(ach) {
    const el = document.createElement('div');
    el.className = 'ach-toast';
    el.innerHTML = `
        <div class="ach-toast-icon">${ach.icon}</div>
        <div class="ach-toast-info">
            <div class="ach-toast-title">🏆 Достижение!</div>
            <div class="ach-toast-name">${ach.name}</div>
            <div class="ach-toast-desc">${ach.desc} · +${ach.reward} 💠</div>
        </div>
    `;
    document.body.appendChild(el);

    setTimeout(() => {
        el.classList.add('show');
    }, 50);

    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 500);
    }, 3500);

    if (typeof playMergeSuccess === 'function') playMergeSuccess();
    if (typeof vibrate === 'function') vibrate([60, 30, 60]);
}

function renderAchievements() {
    const container = document.getElementById('achievementsContainer');
    if (!container) return;

    const d = state.data;
    const unlocked = new Set(d.achievements || []);

    const header = document.getElementById('achievementsHeader');
    if (header) {
        header.textContent = `🏅 Достижения (${unlocked.size} / ${ACHIEVEMENTS.length})`;
    }

    container.innerHTML = ACHIEVEMENTS.map(ach => {
        const isUnlocked = unlocked.has(ach.id);
        return `
            <div class="ach-card ${isUnlocked ? 'unlocked' : ''}">
                <div class="ach-icon">${isUnlocked ? ach.icon : '🔒'}</div>
                <div class="ach-info">
                    <div class="ach-name">${ach.name}</div>
                    <div class="ach-desc">${ach.desc}</div>
                </div>
                <div class="ach-reward">+${formatNum(ach.reward)} 💠</div>
            </div>
        `;
    }).join('');
}

window.ACHIEVEMENTS = ACHIEVEMENTS;
window.checkAchievements = checkAchievements;
window.renderAchievements = renderAchievements;