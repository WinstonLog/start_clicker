// ============================================================
// ЗВЁЗДЫ КАРТ (прокачка) — сбалансировано
// ============================================================
// Каждая карта может быть прокачана до 5★
// Требует дубликаты (карты того же id)
// Бонус растёт нелинейно — слабее с каждой звездой

const MAX_STARS = 5;

// Сколько дубликатов нужно для перехода на след. звезду
const STAR_COST = {
    0: 2,   // 1★ → 2★
    1: 5,   // 2★ → 3★
    2: 15,  // 3★ → 4★
    3: 40,  // 4★ → 5★
    4: null // 5★ — макс
};

// ============================================================
// ПОЛУЧЕНИЕ ДАННЫХ
// ============================================================
function getCardStars(cardId) {
    const d = state.data;
    if (!d.stars) d.stars = {};
    return d.stars[cardId] || 0;
}

function getStarCost(cardId) {
    const stars = getCardStars(cardId);
    return STAR_COST[stars];
}

function canUpgradeStar(cardId) {
    const d = state.data;
    const stars = getCardStars(cardId);
    const cost = STAR_COST[stars];
    if (cost === null || cost === undefined) return false;
    const inv = d.inventory || {};
    return (inv[cardId] || 0) >= cost;
}

// ============================================================
// АПГРЕЙД
// ============================================================
function upgradeStar(cardId) {
    const d = state.data;
    const stars = getCardStars(cardId);
    const cost = STAR_COST[stars];

    if (cost === null || cost === undefined) {
        spawnFloat('⭐ Максимум!', window.innerWidth / 2, 200, '#ffcc66', 18);
        return;
    }

    if (!canUpgradeStar(cardId)) {
        spawnFloat(`Нужно ${cost} шт.`, window.innerWidth / 2, window.innerHeight / 2, '#ff5c7a', 16);
        if (typeof playMergeFail === 'function') playMergeFail();
        return;
    }

    // Списываем
    d.inventory[cardId] -= cost;
    if (d.inventory[cardId] <= 0) delete d.inventory[cardId];

    // Поднимаем звезду
    if (!d.stars) d.stars = {};
    d.stars[cardId] = stars + 1;

    // Награды
    addRating(80 * (stars + 1));
    addXp(20 * (stars + 1));

    saveNow(true);
    renderStars();
    renderInventory();
    updateUI();

    if (typeof playMergeSuccess === 'function') playMergeSuccess();
    if (typeof vibrate === 'function') vibrate([50, 30, 80]);

    const card = getCard(cardId);
    spawnFloat(`⭐ ${card.name} → ${stars + 1}★`, window.innerWidth / 2, 200, '#ffcc66', 20);

    if (stars + 1 === MAX_STARS) {
        setTimeout(() => {
            spawnFloat(`🌟 МАКСИМУМ: ${card.name}!`, window.innerWidth / 2, 250, '#ff3366', 22);
        }, 400);
    }
}

// ============================================================
// БОНУС К ДОБЫЧЕ ОТ ЗВЁЗД (нелинейный)
// ============================================================
// 1★ = +3%
// 2★ = +5%   (итого)
// 3★ = +6.5% (итого)
// 4★ = +7.5% (итого)
// 5★ = +8.5% (итого)
function starsBonus() {
    const d = state.data;
    if (!d.stars) return 0;

    let total = 0;
    for (const id in d.stars) {
        const s = d.stars[id];
        if (s >= 5) total += 8.5;
        else if (s === 4) total += 7.5;
        else if (s === 3) total += 6.5;
        else if (s === 2) total += 5;
        else if (s === 1) total += 3;
    }
    return Math.floor(total * 10) / 10;
}

// ============================================================
// ОТРИСОВКА СПИСКА ДЛЯ ПРОКАЧКИ
// ============================================================
function renderStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;

    const d = state.data;
    const seen = new Set(d.seen || []);
    const inv = d.inventory || {};

    const ids = [...seen].sort((a, b) => {
        const ca = getCard(a), cb = getCard(b);
        if (!ca || !cb) return 0;
        if (ca.tier !== cb.tier) return ca.tier - cb.tier;
        return ca.name.localeCompare(cb.name);
    });

    if (ids.length === 0) {
        container.innerHTML = `
            <div class="stars-empty">
                <div style="font-size:48px;">⭐</div>
                <div>Сначала открой карты</div>
            </div>`;
        return;
    }

    const totalBonus = starsBonus();
    const header = document.getElementById('starsHeader');
    if (header) {
        header.textContent = `⭐ Прокачка карт (+${totalBonus}% к добыче)`;
    }

    container.innerHTML = ids.map(id => {
        const card = getCard(id);
        const tier = getTierInfo(card.tier);
        const stars = getCardStars(id);
        const count = inv[id] || 0;
        const cost = STAR_COST[stars];
        const canUpgrade = cost && count >= cost;
        const isMax = stars >= MAX_STARS;

        let starsHTML = '';
        for (let i = 0; i < MAX_STARS; i++) {
            starsHTML += i < stars ? '★' : '☆';
        }

        return `
            <div class="star-card"
                 style="--tier-color:${tier.color}; --tier-glow:${tier.glow}">
                <div class="scene">${renderCardArt(id)}</div>
                <div class="star-card-name">${card.name}</div>
                <div class="star-card-stars">${starsHTML}</div>
                <div class="star-card-count">В инвентаре: ${count}</div>
                ${isMax
                    ? '<div class="star-card-max">✅ МАКСИМУМ</div>'
                    : `<button class="star-upgrade-btn ${canUpgrade ? '' : 'disabled'}"
                              onclick="upgradeStar('${id}')">
                           ⬆ ${cost} шт.
                       </button>`
                }
            </div>
        `;
    }).join('');
}

// ============================================================
// ЭКСПОРТ
// ============================================================
window.MAX_STARS = MAX_STARS;
window.STAR_COST = STAR_COST;
window.getCardStars = getCardStars;
window.getStarCost = getStarCost;
window.canUpgradeStar = canUpgradeStar;
window.upgradeStar = upgradeStar;
window.starsBonus = starsBonus;
window.renderStars = renderStars;