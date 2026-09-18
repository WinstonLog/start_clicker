// ============================================================
// ПАК — динамическая цена
// ============================================================

const PACK_BASE_PRICE = 100;

// Цена пака = базовая × множитель уровня × множитель открытых паков
// Применяется сразу ко всем — старым и новым игрокам
function packPrice() {
    const d = state.data || {};
    const lvl = Math.min(d.level || 1, 50);            // кап на 50 ур.
    const opened = Math.min(d.packsOpened || 0, 300);  // кап на 300 паках

    const lvlMult  = Math.pow(1.11, lvl - 1);
    const openMult = Math.pow(1.03, opened);

    return Math.floor(PACK_BASE_PRICE * lvlMult * openMult);
}

async function openPack() {
    const d = state.data;
    const price = packPrice();

    if (d.gold < price) {
        spawnFloat('Не хватает!', window.innerWidth / 2, window.innerHeight / 2, '#ff5c7a', 20);
        return;
    }

    d.gold -= price;

    const cardId = rollBaseCard();
    const card = getCard(cardId);

    if (!d.inventory) d.inventory = {};
    if (!d.seen) d.seen = [];

    d.inventory[cardId] = (d.inventory[cardId] || 0) + 1;
    if (!d.seen.includes(cardId)) {
        d.seen.push(cardId);
    }

    addRating(20);
    addXp(10);
    d.packsOpened = (d.packsOpened || 0) + 1;

    if (typeof playPack === 'function') playPack();
    if (typeof vibrate === 'function') vibrate(40);

    saveNow(true);
    updateUI();
    renderUpgrades();
    updatePackButton();

    showPackOpening([cardId]);
}

function showPackOpening(cards) {
    const overlay = document.getElementById('packOverlay');
    const container = document.getElementById('packCards');
    if (!overlay || !container) return;

    overlay.style.display = 'flex';
    container.innerHTML = '';

    cards.forEach((cardId, i) => {
        const card = getCard(cardId);
        const tier = getTierInfo(card.tier);

        const el = document.createElement('div');
        el.className = `pack-card`;
        el.style.setProperty('--tier-color', tier.color);
        el.style.setProperty('--tier-glow', tier.glow);
        el.dataset.index = i;
        el.textContent = '?';
        container.appendChild(el);
    });

    setTimeout(() => {
        cards.forEach((cardId, i) => {
            setTimeout(() => revealCard(cardId, i), i * 400);
        });

        setTimeout(() => {
            showPackCollectBtn();
        }, cards.length * 400 + 600);
    }, 800);
}

function revealCard(cardId, index) {
    const container = document.getElementById('packCards');
    const old = container.children[index];
    if (!old) return;

    const card = getCard(cardId);
    const tier = getTierInfo(card.tier);

    const el = document.createElement('div');
    el.className = `pack-card revealed`;
    el.style.setProperty('--tier-color', tier.color);
    el.style.setProperty('--tier-glow', tier.glow);
    el.innerHTML = `
        <div class="pack-card-emoji">${card.emoji}</div>
        <div class="pack-card-name">${card.name}</div>
        <div class="pack-card-rarity" style="color:${tier.color}">${tier.name}</div>
    `;

    old.replaceWith(el);
    spawnBurst(el, tier.color);
}

function spawnBurst(el, color) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const p = document.createElement('div');
        p.className = 'burst-particle';
        p.style.left = cx + 'px';
        p.style.top = cy + 'px';
        p.style.background = color;
        p.style.setProperty('--dx', Math.cos(angle) * 80 + 'px');
        p.style.setProperty('--dy', Math.sin(angle) * 80 + 'px');
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 700);
    }
}

function showPackCollectBtn() {
    const container = document.getElementById('packCards');

    const old = document.querySelector('.pack-collect-btn');
    if (old) old.remove();

    const btn = document.createElement('button');
    btn.className = 'pack-collect-btn';
    btn.textContent = '✅ Забрать';
    btn.onclick = () => closePackOverlay();

    container.parentElement.appendChild(btn);
}

function closePackOverlay() {
    const overlay = document.getElementById('packOverlay');
    if (overlay) overlay.style.display = 'none';

    const btn = document.querySelector('.pack-collect-btn');
    if (btn) btn.remove();

    renderInventory();
    renderCollection();
    renderStars();
    updatePackButton();
}

function updatePackButton() {
    const btn = document.getElementById('openPackBtn');
    if (!btn) return;

    const price = packPrice();
    const canBuy = (state.data?.gold || 0) >= price;

    btn.disabled = !canBuy;

    const priceEl = document.getElementById('packPrice');
    if (priceEl) priceEl.textContent = formatNum(price);
}

function switchTab(tab) {
    document.querySelectorAll('.view').forEach(v => {
        v.classList.toggle('active', v.dataset.view === tab);
    });
    document.querySelectorAll('.sidebar-item').forEach(b => {
        b.classList.toggle('active', b.dataset.view === tab);
    });

    const content = document.getElementById('content');
    if (content) content.scrollTop = 0;

    if (typeof closeSidebar === 'function') closeSidebar();

    if (tab === 'collection') renderCollection();
    if (tab === 'inventory') renderInventory();
    if (tab === 'lab') {
        renderSlots();
        renderJournal();
    }
    if (tab === 'stars' && typeof renderStars === 'function') renderStars();
    if (tab === 'achievements' && typeof renderAchievements === 'function') renderAchievements();
    if (tab === 'top') loadTop(true);
    if (tab === 'bonus') {
        if (typeof renderBonusTable === 'function') renderBonusTable();
        if (typeof updateBonusTimer === 'function') updateBonusTimer();
    }
    if (tab === 'profile') {
        if (typeof updateProfileUI === 'function') updateProfileUI();
    }
}

function shakeElement(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.transition = 'transform 0.1s';
    el.style.transform = 'translateX(-8px)';
    setTimeout(() => el.style.transform = 'translateX(8px)', 60);
    setTimeout(() => el.style.transform = '', 120);
}

window.packPrice = packPrice;
window.openPack = openPack;
window.switchTab = switchTab;
window.closePackOverlay = closePackOverlay;
window.updatePackButton = updatePackButton;