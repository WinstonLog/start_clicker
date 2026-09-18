// ============================================================
// ЕЖЕДНЕВНЫЙ БОНУС
// ============================================================

const BONUS_TABLE = [
    { d: 1,  essence: 100,  packs: 0, xp: 20  },
    { d: 2,  essence: 150,  packs: 0, xp: 30  },
    { d: 3,  essence: 250,  packs: 1, xp: 50  },
    { d: 4,  essence: 300,  packs: 0, xp: 60  },
    { d: 5,  essence: 400,  packs: 0, xp: 80  },
    { d: 6,  essence: 500,  packs: 1, xp: 100 },
    { d: 7,  essence: 1000, packs: 2, xp: 200 },
    { d: 8,  essence: 600,  packs: 0, xp: 120 },
    { d: 9,  essence: 700,  packs: 0, xp: 140 },
    { d: 10, essence: 900,  packs: 1, xp: 180 },
    { d: 11, essence: 1000, packs: 0, xp: 200 },
    { d: 12, essence: 1200, packs: 0, xp: 240 },
    { d: 13, essence: 1400, packs: 1, xp: 280 },
    { d: 14, essence: 2500, packs: 3, xp: 400 },
    { d: 15, essence: 1500, packs: 0, xp: 300 },
    { d: 16, essence: 1700, packs: 0, xp: 340 },
    { d: 17, essence: 1900, packs: 1, xp: 380 },
    { d: 18, essence: 2200, packs: 0, xp: 420 },
    { d: 19, essence: 2500, packs: 0, xp: 460 },
    { d: 20, essence: 2800, packs: 1, xp: 500 },
    { d: 21, essence: 5000, packs: 5, xp: 800 },
    { d: 22, essence: 3000, packs: 0, xp: 550 },
    { d: 23, essence: 3300, packs: 0, xp: 600 },
    { d: 24, essence: 3600, packs: 1, xp: 650 },
    { d: 25, essence: 4000, packs: 0, xp: 700 },
    { d: 26, essence: 4400, packs: 0, xp: 750 },
    { d: 27, essence: 4800, packs: 1, xp: 800 },
    { d: 28, essence: 5500, packs: 0, xp: 900 },
    { d: 29, essence: 6000, packs: 2, xp: 1000 },
    { d: 30, essence: 10000, packs: 10, xp: 2000 }
];

function getBonusForDay(day) {
    const idx = Math.min(Math.max(day - 1, 0), BONUS_TABLE.length - 1);
    return BONUS_TABLE[idx];
}

function streakBonus() {
    const s = state.data?.streak || 0;
    return Math.min((s - 1) * 5, 150);
}

function todayStr() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

function daysBetween(a, b) {
    if (!a) return 999;
    const da = new Date(a + 'T00:00:00');
    const db = new Date(b + 'T00:00:00');
    return Math.round((db - da) / (1000 * 60 * 60 * 24));
}

function isBonusAvailable() {
    const d = state.data;
    if (!d) return false;
    if (!d.lastBonusDate) return true;
    const diff = daysBetween(d.lastBonusDate, todayStr());
    return diff >= 1;
}

function checkStreak() {
    const d = state.data;
    if (!d) return;
    if (!d.lastBonusDate) return;

    const diff = daysBetween(d.lastBonusDate, todayStr());
    if (diff > 1) {
        d.streak = 0;
        saveNow(true);
    }
}

async function claimBonus() {
    const d = state.data;

    if (!isBonusAvailable()) {
        const diff = daysBetween(d.lastBonusDate, todayStr());
        if (diff === 0) {
            spawnFloat('🎁 Уже получено сегодня', window.innerWidth / 2, 120, '#ffaa88', 16);
        }
        return;
    }

    const diff = daysBetween(d.lastBonusDate, todayStr());
    let newStreak;

    if (!d.lastBonusDate || diff > 1) {
        newStreak = 1;
    } else {
        newStreak = Math.min((d.streak || 0) + 1, 30);
    }

    const reward = getBonusForDay(newStreak);

    d.streak = newStreak;
    d.lastBonusDate = todayStr();
    d.gold += reward.essence;

    if (reward.packs > 0) {
        if (!d.inventory) d.inventory = {};
        if (!d.seen) d.seen = [];
        for (let i = 0; i < reward.packs; i++) {
            const cardId = rollBaseCard();
            d.inventory[cardId] = (d.inventory[cardId] || 0) + 1;
            if (!d.seen.includes(cardId)) d.seen.push(cardId);
        }
    }

    addXp(reward.xp);

    saveNow(true);

    showBonusToast(reward, newStreak);
    updateBonusButton();
    updateUI();
    renderInventory();
    renderCollection();

    if (typeof playBonus === 'function') playBonus();
    if (typeof vibrate === 'function') vibrate([60, 30, 60, 30, 120]);
}

function updateBonusButton() {
    const btn = document.getElementById('bonusBtn');
    if (!btn) return;

    const available = isBonusAvailable();
    const streak = state.data?.streak || 0;

    if (available) {
        btn.classList.add('ready');
        btn.classList.remove('waiting');
    } else {
        btn.classList.remove('ready');
        btn.classList.add('waiting');
    }

    const badge = document.getElementById('bonusSidebarBadge');
    if (badge) badge.classList.toggle('hidden', !available);

    const bigBtn = document.getElementById('bonusClaimBtn');
    if (bigBtn) {
        bigBtn.disabled = !available;
        bigBtn.textContent = available ? '🎁 Забрать бонус' : '⏳ Уже получено';
    }

    const streakEl = document.getElementById('bonusCardStreak');
    if (streakEl) streakEl.textContent = streak;
}

function showBonusToast(reward, streak) {
    const overlay = document.getElementById('bonusOverlay');
    if (!overlay) return;

    const dayEl = document.getElementById('bonusDay');
    const essenceEl = document.getElementById('bonusEssence');
    const packsEl = document.getElementById('bonusPacks');
    const xpEl = document.getElementById('bonusXp');
    const streakEl = document.getElementById('bonusStreakValue');

    if (dayEl) dayEl.textContent = 'День ' + streak;
    if (essenceEl) essenceEl.textContent = '+' + reward.essence;
    if (xpEl) xpEl.textContent = '+' + reward.xp + ' XP';

    if (packsEl) {
        if (reward.packs > 0) {
            packsEl.style.display = 'flex';
            packsEl.querySelector('span:last-child').textContent = '+' + reward.packs + ' 📦';
        } else {
            packsEl.style.display = 'none';
        }
    }

    if (streakEl) streakEl.textContent = '+' + streakBonus() + '%';

    overlay.style.display = 'flex';

    clearTimeout(window._bonusTimer);
    window._bonusTimer = setTimeout(closeBonusOverlay, 4000);
}

function closeBonusOverlay() {
    const overlay = document.getElementById('bonusOverlay');
    if (overlay) overlay.style.display = 'none';
    clearTimeout(window._bonusTimer);
}

function updateBonusTimer() {
    const el = document.getElementById('bonusTimer');
    if (!el) return;

    const d = state.data;
    if (!d || !d.lastBonusDate || isBonusAvailable()) {
        el.textContent = 'Готово!';
        return;
    }

    const last = new Date(d.lastBonusDate + 'T00:00:00');
    const next = new Date(last);
    next.setDate(next.getDate() + 1);

    const now = new Date();
    const diff = next - now;

    if (diff <= 0) {
        el.textContent = 'Готово!';
        return;
    }

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

setInterval(updateBonusTimer, 1000);

window.getBonusForDay = getBonusForDay;
window.streakBonus = streakBonus;
window.isBonusAvailable = isBonusAvailable;
window.checkStreak = checkStreak;
window.claimBonus = claimBonus;
window.updateBonusButton = updateBonusButton;
window.updateBonusTimer = updateBonusTimer;
window.closeBonusOverlay = closeBonusOverlay;