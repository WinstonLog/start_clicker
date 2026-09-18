// ============================================================
// УРОВНИ И ОПЫТ
// ============================================================

function xpForLevel(level) {
    return 50 + level * 30;
}

function levelBonus() {
    const lvl = state.data?.level || 1;
    return (lvl - 1) * 2;
}

function addXp(amount) {
    if (!state.data || amount <= 0) return;

    const d = state.data;
    d.xp = (d.xp || 0) + amount;

    let leveledUp = false;

    while (d.xp >= xpForLevel(d.level)) {
        d.xp -= xpForLevel(d.level);
        d.level += 1;
        leveledUp = true;

        if (typeof addRating === 'function') {
            addRating(200 * d.level);
        }
    }

    if (leveledUp) {
        showLevelUpOverlay(d.level);
        if (typeof playLevelUp === 'function') playLevelUp();
        if (typeof vibrate === 'function') vibrate([80, 40, 80, 40, 120]);
    }

    updateXpUI();
    if (typeof updateUI === 'function') updateUI();
}

function updateXpUI() {
    const d = state.data;
    if (!d) return;

    const need = xpForLevel(d.level);
    const pct = Math.min((d.xp / need) * 100, 100);

    const fill = document.getElementById('xpFill');
    const num = document.getElementById('uiXp');
    const next = document.getElementById('uiXpNext');
    const lvl = document.getElementById('uiLevel');

    if (fill) fill.style.width = pct + '%';
    if (num) num.textContent = Math.floor(d.xp);
    if (next) next.textContent = need;
    if (lvl) lvl.textContent = d.level;
}

function showLevelUpOverlay(level) {
    const overlay = document.getElementById('levelUpOverlay');
    const num = document.getElementById('levelUpNumber');
    if (!overlay) return;

    if (num) num.textContent = level;
    overlay.style.display = 'flex';

    clearTimeout(window._levelUpTimer);
    window._levelUpTimer = setTimeout(closeLevelUpOverlay, 2500);
}

function closeLevelUpOverlay() {
    const overlay = document.getElementById('levelUpOverlay');
    if (overlay) overlay.style.display = 'none';
    clearTimeout(window._levelUpTimer);
}

window.xpForLevel = xpForLevel;
window.levelBonus = levelBonus;
window.addXp = addXp;
window.updateXpUI = updateXpUI;
window.showLevelUpOverlay = showLevelUpOverlay;
window.closeLevelUpOverlay = closeLevelUpOverlay;