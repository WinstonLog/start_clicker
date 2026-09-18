// ============================================================
// ГЛАВНЫЙ ФАЙЛ
// ============================================================
let mode = 'login';
const $ = id => document.getElementById(id);

function setMode(m) {
    mode = m;
    document.querySelectorAll('.tab').forEach(t =>
        t.classList.toggle('active', t.dataset.tab === m)
    );
    $('wrapPass2').style.display = m === 'register' ? 'flex' : 'none';
    $('btnSubmit').textContent = m === 'register' ? 'Создать' : 'Войти';
    $('err').textContent = '';
}

document.querySelectorAll('.tab').forEach(t =>
    t.addEventListener('click', () => setMode(t.dataset.tab))
);

function showAuth() {
    $('authModal').style.display = 'flex';
    $('game').style.display = 'none';
}
function showGame() {
    $('authModal').style.display = 'none';
    $('game').style.display = 'flex';
}

$('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('inName').value.trim();
    const pass = $('inPass').value;
    const pass2 = $('inPass2').value;
    const btn = $('btnSubmit');
    const err = $('err');

    err.textContent = '';

    if (name.length < 3) return err.textContent = 'Имя минимум 3 символа';
    if (pass.length < 6) return err.textContent = 'Пароль минимум 6 символов';
    if (mode === 'register' && pass !== pass2) return err.textContent = 'Пароли не совпадают';

    btn.disabled = true;
    btn.textContent = mode === 'register' ? 'Создаём...' : 'Входим...';

    try {
        const res = mode === 'register'
            ? await register(name, pass)
            : await login(name, pass);

        if (!res.ok) {
            const map = {
                name_taken: '❌ Имя занято',
                no_user: '❌ Игрок не найден',
                bad_pass: '❌ Неверный пароль',
                network: '⚠️ Ошибка сети'
            };
            err.textContent = map[res.error] || 'Ошибка';
            btn.disabled = false;
            btn.textContent = mode === 'register' ? 'Создать' : 'Войти';
            return;
        }

        showGame();
        onReady();

    } catch (e) {
        console.error(e);
        err.textContent = '⚠️ Что-то сломалось';
        btn.disabled = false;
    }
});

$('btnLogout').addEventListener('click', async () => {
    await saveNow(true);
    setTimeout(() => {
        clearSession();
        location.reload();
    }, 200);
});

async function boot() {
    const s = await autoLogin();
    if (s) {
        showGame();
        onReady();
    } else {
        showAuth();
    }
}

function ensureData() {
    if (!state.data) state.data = {};
    const d = state.data;
    if (typeof d.gold !== 'number') d.gold = 0;
    if (typeof d.totalGold !== 'number') d.totalGold = 0;
    if (typeof d.clicks !== 'number') d.clicks = 0;
    if (typeof d.level !== 'number') d.level = 1;
    if (typeof d.xp !== 'number') d.xp = 0;
    if (typeof d.critChance !== 'number') d.critChance = 0;
    if (typeof d.autoIncome !== 'number') d.autoIncome = 0;
    if (typeof d.rating !== 'number') d.rating = 0;
    if (typeof d.streak !== 'number') d.streak = 0;
    if (typeof d.lastBonusDate !== 'string') d.lastBonusDate = '';
    if (typeof d.merges !== 'number') d.merges = 0;
    if (typeof d.lastSeen !== 'number') d.lastSeen = Date.now();

    if (!d.upg) d.upg = { clickPower: 0, auto: 0, crit: 0 };
    if (typeof d.upg.clickPower !== 'number') d.upg.clickPower = 0;
    if (typeof d.upg.auto !== 'number') d.upg.auto = 0;
    if (typeof d.upg.crit !== 'number') d.upg.crit = 0;

    if (!d.inventory) d.inventory = {};
    if (!d.stars) d.stars = {};
    if (!Array.isArray(d.seen)) d.seen = [];
    if (!Array.isArray(d.discovered)) d.discovered = [];
    if (!Array.isArray(d.achievements)) d.achievements = [];
}

const RATING = {
    click: 1,
    critClick: 5,
    pack: 20,
    newCard: 100,
    duplicateCard: 10,
    upgrade: 25,
    levelUp: 200,
    merge: 20,
    mergeNew: 300
};

function addRating(amount) {
    if (!state.data || amount <= 0) return;
    state.data.rating = (state.data.rating || 0) + amount;
}

const UPGRADES = [
    {
        id: 'clickPower',
        icon: '👆',
        name: 'Сила клика',
        desc: (lvl) => `+1 к доходу за тап (сейчас +${lvl})`,
        cost: (lvl) => Math.floor(15 * Math.pow(1.35, lvl)),
        apply: () => {}
    },
    {
        id: 'auto',
        icon: '⚙️',
        name: 'Авто-добыча',
        desc: (lvl) => `+1 эссенция/сек (сейчас +${lvl})`,
        cost: (lvl) => Math.floor(50 * Math.pow(1.4, lvl)),
        apply: (d) => { d.autoIncome = d.upg.auto; }
    },
    {
        id: 'crit',
        icon: '⚡',
        name: 'Крит-удар',
        desc: (lvl) => `+3% шанс ×5 добычи (сейчас ${lvl * 3}%)`,
        cost: (lvl) => Math.floor(200 * Math.pow(1.55, lvl)),
        apply: (d) => { d.critChance = Math.min(d.upg.crit * 3, 60); }
    }
];

function totalMultiplier() {
    const lvlBonus = typeof levelBonus === 'function' ? levelBonus() : 0;
    const strBonus = typeof streakBonus === 'function' ? streakBonus() : 0;
    const starBonus = typeof starsBonus === 'function' ? starsBonus() : 0;
    return 1 + (lvlBonus + strBonus + starBonus) / 100;
}

function goldPerClick() {
    const base = 1 + state.data.upg.clickPower;
    return Math.floor(base * totalMultiplier());
}

function goldPerSec() {
    const base = state.data.autoIncome || 0;
    return Math.floor(base * totalMultiplier());
}

function buyUpgrade(id) {
    const d = state.data;
    const upg = UPGRADES.find(u => u.id === id);
    if (!upg) return;

    const lvl = d.upg[id];
    const price = upg.cost(lvl);

    if (d.gold < price) {
        shakeUpgrade(id);
        return;
    }

    d.gold -= price;
    d.upg[id] += 1;
    upg.apply(d);

    d.upgradesBought = (d.upgradesBought || 0) + 1;

    addRating(RATING.upgrade * (lvl + 1));
    addXp(5 * (lvl + 1));

    if (typeof playUpgrade === 'function') playUpgrade();
    if (typeof vibrate === 'function') vibrate(20);

    renderUpgrades();
    updateUI();
    flashUpgrade(id);

    saveNow(true);
}

function shakeUpgrade(id) {
    const el = document.querySelector(`.upgrade[data-id="${id}"]`);
    if (!el) return;
    el.style.transition = 'transform 0.1s';
    el.style.transform = 'translateX(-6px)';
    setTimeout(() => el.style.transform = 'translateX(6px)', 60);
    setTimeout(() => el.style.transform = '', 120);
}

function flashUpgrade(id) {
    const el = document.querySelector(`.upgrade[data-id="${id}"]`);
    if (!el) return;
    el.classList.add('bought');
    setTimeout(() => el.classList.remove('bought'), 400);
}

function renderUpgrades() {
    const panel = $('upgradesPanel');
    if (!panel) return;
    const d = state.data;

    panel.innerHTML = UPGRADES.map(u => {
        const lvl = d.upg[u.id];
        const price = u.cost(lvl);
        const canBuy = d.gold >= price;

        return `
            <div class="upgrade ${canBuy ? '' : 'disabled'}"
                 data-id="${u.id}"
                 onclick="buyUpgrade('${u.id}')">
                <div class="upgrade-icon">${u.icon}</div>
                <div class="upgrade-info">
                    <div class="upgrade-name">
                        ${u.name}
                        <span class="upgrade-level">Ур. ${lvl}</span>
                    </div>
                    <div class="upgrade-desc">${u.desc(lvl)}</div>
                </div>
                <div class="upgrade-cost">${formatNum(price)}</div>
            </div>
        `;
    }).join('');
}

function doClick(x, y) {
    const d = state.data;
    let gain = goldPerClick();

    const isCrit = Math.random() * 100 < d.critChance;
    if (isCrit) gain *= 5;

    d.gold += gain;
    d.totalGold += gain;
    d.clicks += 1;

    addRating(isCrit ? RATING.critClick : RATING.click);
    addXp(isCrit ? 3 : 1);

    if (isCrit) {
        if (typeof playCrit === 'function') playCrit();
    } else {
        if (typeof playClick === 'function') playClick();
    }

    spawnFloat(
        (isCrit ? '⚡ +' : '+') + formatNum(gain),
        x, y,
        isCrit ? '#ffcc66' : '#4ad4ff',
        isCrit ? 32 : 22
    );

    updateUI();
    renderUpgrades();

    const c = $('crystal');
    if (c) {
        c.style.transform = 'scale(0.92)';
        setTimeout(() => c.style.transform = '', 80);
    }
}

function spawnFloat(text, x, y, color = '#4ad4ff', size = 22) {
    const layer = $('floatLayer');
    const el = document.createElement('div');
    el.className = 'float-num';
    el.textContent = text;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.color = color;
    el.style.fontSize = size + 'px';
    el.style.marginLeft = ((Math.random() - 0.5) * 40) + 'px';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 900);
}

function updateUI() {
    const d = state.data;
    $('uiGold').textContent = formatNum(Math.floor(d.gold));
    $('uiPerClick').textContent = formatNum(goldPerClick());
    $('uiPerSec').textContent = formatNum(goldPerSec());
    $('uiCrit').textContent = d.critChance + '%';

    const uiCards = $('uiCards');
    if (uiCards) {
        uiCards.textContent = (d.seen || []).length;
    }

    const uiRating = $('uiRating');
    if (uiRating) uiRating.textContent = formatNum(d.rating || 0);

    const bonusEl = $('uiBonus');
    if (bonusEl) {
        const totalBonus = (typeof levelBonus === 'function' ? levelBonus() : 0) +
                          (typeof streakBonus === 'function' ? streakBonus() : 0) +
                          (typeof starsBonus === 'function' ? starsBonus() : 0);
        bonusEl.textContent = '+' + totalBonus + '%';
    }

    if (typeof updateXpUI === 'function') updateXpUI();
    if (typeof updatePackButton === 'function') updatePackButton();
    if (typeof updateSidebar === 'function') updateSidebar();
    if (typeof updateBonusButton === 'function') updateBonusButton();
    if (typeof checkAchievements === 'function') checkAchievements();

    const lvlEl = document.getElementById('sidebarLevel');
    if (lvlEl) lvlEl.textContent = d.level || 1;
}

function formatNum(n) {
    n = Math.floor(n);
    if (n >= 1e12) return (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return n.toString();
}

function bindCrystal() {
    const c = $('crystal');
    if (!c || c.dataset.bound) return;
    c.dataset.bound = '1';

    let lastTouch = 0;

    c.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') {
            lastTouch = Date.now();
            doClick(e.clientX, e.clientY);
        } else if (e.pointerType === 'mouse') {
            if (Date.now() - lastTouch < 400) return;
            doClick(e.clientX, e.clientY);
        }
    });
}

setInterval(() => {
    if (!state.playerId || !state.data) return;
    const inc = goldPerSec();
    if (inc > 0) {
        state.data.gold += inc;
        state.data.totalGold += inc;
        updateUI();
        renderUpgrades();
    }
}, 1000);

let _saveLock = false;
let _lastSavedGold = -1;

async function saveNow(force = false) {
    if (!state.playerId) return;
    if (_saveLock && !force) return;

    ensureData();

    const cur = Math.floor(state.data.gold);
    if (!force && cur === _lastSavedGold) return;

    _saveLock = true;
    try {
        await saveProgress();
        _lastSavedGold = cur;
    } catch (e) {
        console.warn('save failed', e);
    } finally {
        _saveLock = false;
    }
}

setInterval(() => saveNow(), 5000);

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveNow(true);
});

window.addEventListener('beforeunload', () => {
    if (!state.playerId) return;
    ensureData();

    const url = `${SUPABASE_URL}/rest/v1/rpc/save_data`;
    const payload = JSON.stringify({
        p_player_id: state.playerId,
        p_hash: state.token,
        p_data: state.data
    });

    try {
        fetch(url, {
            method: 'POST',
            keepalive: true,
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            },
            body: payload
        }).catch(() => {});
    } catch (e) {}
});

const burgerBtn = document.getElementById('burgerBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
    burgerBtn.classList.add('open');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
    burgerBtn.classList.remove('open');
}

if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) closeSidebar();
        else openSidebar();
    });
}
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
});

function updateSidebar() {
    const nameEl = document.getElementById('sidebarName');
    const lvlEl = document.getElementById('sidebarLevel');
    if (nameEl) nameEl.textContent = state.name || 'Игрок';
    if (lvlEl) lvlEl.textContent = state.data?.level || 1;
}

function updateProfileUI() {
    const d = state.data;

    const nameEl = $('profileName');
    const idEl = $('profileId');
    const levelEl = $('profileLevel');
    const ratingEl = $('profileRating');
    const cardsEl = $('profileCards');
    const mergesEl = $('profileMerges');
    const clicksEl = $('profileClicks');
    const streakEl = $('profileStreak');

    if (nameEl) nameEl.textContent = state.name || '—';
    if (idEl) idEl.textContent = 'ID: ' + (state.playerId || '—');
    if (levelEl) levelEl.textContent = d.level || 1;
    if (ratingEl) ratingEl.textContent = formatNum(d.rating || 0);
    if (cardsEl) cardsEl.textContent = (d.seen || []).length;
    if (mergesEl) mergesEl.textContent = d.merges || 0;
    if (clicksEl) clicksEl.textContent = formatNum(d.clicks || 0);
    if (streakEl) streakEl.textContent = d.streak || 0;
}

async function copyMyId() {
    if (!state.playerId) return;
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(state.playerId);
        } else {
            const inp = document.createElement('input');
            inp.value = state.playerId;
            inp.style.position = 'fixed';
            inp.style.opacity = '0';
            document.body.appendChild(inp);
            inp.select();
            document.execCommand('copy');
            inp.remove();
        }
        spawnFloat('📋 ID скопирован', window.innerWidth / 2, 120, '#44ff44', 16);
        if (typeof vibrate === 'function') vibrate(30);
    } catch (e) { console.error(e); }
}

function renderBonusTable() {
    const container = document.getElementById('bonusTable');
    if (!container) return;

    const currentStreak = state.data?.streak || 0;
    const nextDay = currentStreak + 1;

    let html = '';
    for (const b of BONUS_TABLE) {
        const isCurrent = b.d === nextDay;
        const isPast = b.d <= currentStreak;

        html += `
            <div class="bonus-day-card ${isCurrent ? 'current' : ''} ${isPast ? 'past' : ''}">
                <div class="bonus-day-num">День ${b.d}</div>
                <div class="bonus-day-icon">${b.packs > 0 ? '🎁' : '💠'}</div>
                <div class="bonus-day-reward">+${b.essence} 💠</div>
                ${b.packs > 0 ? `<div class="bonus-day-extra">+${b.packs} 📦</div>` : ''}
                <div class="bonus-day-xp">+${b.xp} XP</div>
                ${isPast ? '<div class="bonus-day-check">✅</div>' : ''}
            </div>
        `;
    }
    container.innerHTML = html;
}

function bindSettings() {
    const soundToggle = document.getElementById('soundToggle');
    const vibToggle = document.getElementById('vibrationToggle');

    const saved = localStorage.getItem('settings');
    if (saved) {
        try {
            const s = JSON.parse(saved);
            if (typeof s.sound === 'boolean') _soundEnabled = s.sound;
            if (typeof s.vibration === 'boolean') _vibrationEnabled = s.vibration;
        } catch (e) {}
    }

    if (soundToggle) {
        soundToggle.checked = _soundEnabled;
        soundToggle.addEventListener('change', () => {
            _soundEnabled = soundToggle.checked;
            saveSettings();
        });
    }

    if (vibToggle) {
        vibToggle.checked = _vibrationEnabled;
        vibToggle.addEventListener('change', () => {
            _vibrationEnabled = vibToggle.checked;
            saveSettings();
            if (_vibrationEnabled) vibrate(30);
        });
    }
}

function saveSettings() {
    localStorage.setItem('settings', JSON.stringify({
        sound: _soundEnabled,
        vibration: _vibrationEnabled
    }));
}

function resetProgress() {
    if (!confirm('⚠️ Точно сбросить ВЕСЬ прогресс?\n\nЭто удалит:\n• Эссенцию\n• Уровень\n• Инвентарь\n• Коллекцию\n• Рейтинг\n\nОтменить нельзя!')) return;
    if (!confirm('⚠️ ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ!\n\nТочно?')) return;

    state.data = {};
    ensureData();
    saveNow(true).then(() => location.reload());
}

function onReady() {
    ensureData();

    // Офлайн-доход
    if (typeof applyOfflineIncome === 'function') applyOfflineIncome();

    if (typeof checkStreak === 'function') checkStreak();

    UPGRADES.forEach(u => u.apply(state.data));

    bindCrystal();
    bindSettings();
    updateUI();
    renderUpgrades();
    renderInventory();
    renderCollection();
    renderJournal();
    renderStars();
    renderAchievements();
    updateXpUI();
    updateSidebar();
    updateBonusButton();
    renderBonusTable();

    if (typeof validateTree === 'function') validateTree();

    setInterval(() => {
        if (typeof trackActivity === 'function') trackActivity();
    }, 30000);
}

window.buyUpgrade = buyUpgrade;
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
window.addRating = addRating;
window.renderBonusTable = renderBonusTable;
window.updateProfileUI = updateProfileUI;
window.copyMyId = copyMyId;
window.resetProgress = resetProgress;

boot();