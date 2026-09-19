// ============================================================
// КАРТЫ (Алхимия с единой вершиной)
// ============================================================

const TIERS = {
    0: { name: 'Базовая',     color: '#8b90a8', glow: 'rgba(139,144,168,0.4)' },
    1: { name: 'Простая',     color: '#4ad4ff', glow: 'rgba(74,212,255,0.4)'  },
    2: { name: 'Обычная',     color: '#44ff88', glow: 'rgba(68,255,136,0.5)'  },
    3: { name: 'Необычная',   color: '#22c55e', glow: 'rgba(34,197,94,0.5)'   },
    4: { name: 'Редкая',      color: '#b388ff', glow: 'rgba(179,136,255,0.6)' },
    5: { name: 'Эпическая',   color: '#ff6688', glow: 'rgba(255,102,136,0.7)' },
    6: { name: 'Мифическая',  color: '#ffcc66', glow: 'rgba(255,204,102,0.8)' },
    7: { name: 'Божественная',color: '#ff9933', glow: 'rgba(255,153,51,0.9)'  },
    8: { name: 'Абсолютная',  color: '#ff3366', glow: 'rgba(255,51,102,1)'    }
};

const CARDS = {
    // TIER 0
    water:  { name: 'Вода', emoji: '💧', tier: 0,
        over: [{p:'o-tl',s:16,e:'💧',a:'a-float'},{p:'o-br',s:18,e:'💧',a:'a-bob'}] },
    fire:   { name: 'Огонь', emoji: '🔥', tier: 0,
        over: [{p:'o-tl',s:14,e:'✨',a:'a-twinkle'},{p:'o-tr',s:13,e:'⚡',a:'a-twinkle'},{p:'o-bl',s:14,e:'🔥',a:'a-float'}] },
    earth:  { name: 'Земля', emoji: '🌍', tier: 0,
        over: [{p:'o-br',s:16,e:'🌿',a:'a-float'},{p:'o-tl',s:13,e:'🌱',a:'a-bob'}] },
    air:    { name: 'Воздух', emoji: '💨', tier: 0,
        over: [{p:'o-tr',s:18,e:'☁️',a:'a-float'},{p:'o-bl',s:15,e:'💨',a:'a-bob'}] },
    energy: { name: 'Энергия', emoji: '⚡', tier: 0,
        over: [{p:'o-tl',s:13,e:'✨',a:'a-twinkle'},{p:'o-br',s:13,e:'💫',a:'a-twinkle'}] },
    ice:    { name: 'Лёд', emoji: '❄️', tier: 0,
        over: [{p:'o-tl',s:13,e:'✨',a:'a-twinkle'},{p:'o-br',s:11,e:'✨',a:'a-twinkle'}] },

    // TIER 1
    steam:  { name: 'Пар', emoji: '♨️', tier: 1,
        over: [{p:'o-tr',s:16,e:'☁️',a:'a-float'},{p:'o-tl',s:13,e:'💨',a:'a-bob'}] },
    dust:   { name: 'Пыль', emoji: '🌫️', tier: 1,
        over: [{p:'o-tl',s:11,e:'✨',a:'a-twinkle'},{p:'o-tr',s:10,e:'✨',a:'a-twinkle'},{p:'o-bl',s:11,e:'✨',a:'a-twinkle'},{p:'o-br',s:10,e:'✨',a:'a-twinkle'}] },
    mud:    { name: 'Грязь', emoji: '🟫', tier: 1,
        over: [{p:'o-tl',s:15,e:'💧',a:'a-float'},{p:'o-br',s:14,e:'🌿',a:'a-bob'}] },
    lava:   { name: 'Лава', emoji: '🟠', tier: 1,
        over: [{p:'o-tl',s:16,e:'🔥',a:'a-float'},{p:'o-bl',s:12,e:'💧',a:'a-bob'},{p:'o-br',s:12,e:'🔥',a:'a-float'}] },
    spark:  { name: 'Искра', emoji: '✨', tier: 1,
        over: [{p:'o-tl',s:13,e:'⚡',a:'a-twinkle'},{p:'o-br',s:13,e:'✨',a:'a-twinkle'},{p:'o-tr',s:10,e:'💫',a:'a-pulse'}] },
    snow:   { name: 'Снег', emoji: '🌨️', tier: 1,
        over: [{p:'o-tl',s:16,e:'❄️',a:'a-float'},{p:'o-br',s:16,e:'❄️',a:'a-bob'}] },

    // TIER 2
    cloud:  { name: 'Облако', emoji: '☁️', tier: 2,
        over: [{p:'o-tl',s:15,e:'☁️',a:'a-float'},{p:'o-br',s:17,e:'☁️',a:'a-bob'}] },
    ash:    { name: 'Пепел', emoji: '🌑', tier: 2,
        over: [{p:'o-tl',s:12,e:'💥',a:'a-pulse'},{p:'o-br',s:13,e:'💥',a:'a-pulse'},{p:'o-t',s:10,e:'🌫️',a:'a-float'}] },
    sprout: { name: 'Росток', emoji: '🌿', tier: 2,
        over: [{p:'o-tl',s:18,e:'🌱',a:'a-float'},{p:'o-br',s:15,e:'🍃',a:'a-bob'},{p:'o-tr',s:13,e:'✨',a:'a-twinkle'}] },
    glacier:{ name: 'Ледник', emoji: '🧊', tier: 2,
        over: [{p:'o-t',s:22,e:'⛰️',a:'a-float'},{p:'o-b',s:14,e:'🌊',a:'a-bob'}] },
    crystal:{ name: 'Кристалл', emoji: '💎', tier: 2,
        over: [{p:'o-tl',s:13,e:'✨',a:'a-twinkle'},{p:'o-br',s:12,e:'💠',a:'a-twinkle'},{p:'o-t',s:11,e:'✨',a:'a-pulse'}] },
    ocean:  { name: 'Океан', emoji: '🌊', tier: 2,
        over: [{p:'o-tl',s:15,e:'💧',a:'a-float'},{p:'o-br',s:17,e:'🐚',a:'a-bob'},{p:'o-tr',s:12,e:'💧',a:'a-float'}] },

    // TIER 3
    rain:   { name: 'Дождь', emoji: '🌧️', tier: 3,
        over: [{p:'o-tl',s:13,e:'💧',a:'a-rise'},{p:'o-tr',s:11,e:'💧',a:'a-rise'},{p:'o-bl',s:10,e:'💧',a:'a-rise'},{p:'o-br',s:13,e:'💧',a:'a-rise'}] },
    stone:  { name: 'Камень', emoji: '🪨', tier: 3,
        over: [{p:'o-tl',s:13,e:'🌿',a:'a-float'},{p:'o-br',s:14,e:'✨',a:'a-twinkle'}] },
    tree:   { name: 'Дерево', emoji: '🌳', tier: 3,
        over: [{p:'o-tl',s:15,e:'🍃',a:'a-float'},{p:'o-tr',s:14,e:'🌿',a:'a-bob'},{p:'o-b',s:11,e:'🌱',a:'a-pulse'}] },
    mirror: { name: 'Зеркало', emoji: '🪞', tier: 3,
        over: [{p:'o-tl',s:13,e:'✨',a:'a-twinkle'},{p:'o-br',s:14,e:'💫',a:'a-twinkle'}] },
    diamond:{ name: 'Алмаз', emoji: '💠', tier: 3,
        over: [{p:'o-tl',s:11,e:'✨',a:'a-twinkle'},{p:'o-tr',s:13,e:'✨',a:'a-twinkle'},{p:'o-bl',s:10,e:'💎',a:'a-pulse'},{p:'o-br',s:11,e:'💫',a:'a-twinkle'}] },
    snowman:{ name: 'Снеговик', emoji: '⛄', tier: 3,
        over: [{p:'o-tl',s:13,e:'❄️',a:'a-float'},{p:'o-br',s:13,e:'❄️',a:'a-bob'}] },

    // TIER 4
    storm:  { name: 'Гроза', emoji: '⛈️', tier: 4,
        over: [{p:'o-tl',s:15,e:'⚡',a:'a-twinkle'},{p:'o-br',s:14,e:'💧',a:'a-rise'},{p:'o-b',s:13,e:'⚡',a:'a-pulse'}] },
    volcano:{ name: 'Вулкан', emoji: '🌋', tier: 4,
        over: [{p:'o-t',s:16,e:'🔥',a:'a-rise'},{p:'o-tl',s:13,e:'💨',a:'a-float'},{p:'o-tr',s:14,e:'💥',a:'a-pulse'}] },
    forest: { name: 'Лес', emoji: '🌲', tier: 4,
        over: [{p:'o-tl',s:16,e:'🌳',a:'a-float'},{p:'o-br',s:18,e:'🌲',a:'a-bob'},{p:'o-bl',s:13,e:'🍃',a:'a-float'}] },
    moon:   { name: 'Луна', emoji: '🌙', tier: 4,
        over: [{p:'o-tl',s:11,e:'⭐',a:'a-twinkle'},{p:'o-tr',s:13,e:'✨',a:'a-twinkle'},{p:'o-br',s:10,e:'⭐',a:'a-twinkle'},{p:'o-bl',s:10,e:'✨',a:'a-pulse'}] },
    tiara:  { name: 'Диадема', emoji: '💍', tier: 4,
        over: [{p:'o-tl',s:13,e:'💎',a:'a-float'},{p:'o-tr',s:13,e:'💎',a:'a-bob'},{p:'o-b',s:11,e:'✨',a:'a-twinkle'}] },
    mountain:{ name: 'Гора', emoji: '⛰️', tier: 4,
        over: [{p:'o-t',s:15,e:'❄️',a:'a-float'},{p:'o-tl',s:13,e:'☁️',a:'a-bob'},{p:'o-tr',s:11,e:'☁️',a:'a-float'}] },

    // TIER 5
    planet: { name: 'Планета', emoji: '🪐', tier: 5,
        over: [{p:'o-tl',s:11,e:'⭐',a:'a-twinkle'},{p:'o-tr',s:10,e:'✨',a:'a-twinkle'},{p:'o-br',s:10,e:'⭐',a:'a-twinkle'}] },
    island: { name: 'Остров', emoji: '🏝️', tier: 5,
        over: [{p:'o-t',s:15,e:'☀️',a:'a-pulse'},{p:'o-tl',s:13,e:'🌊',a:'a-float'},{p:'o-br',s:13,e:'🌊',a:'a-bob'}] },
    unicorn:{ name: 'Единорог', emoji: '🦄', tier: 5,
        over: [{p:'o-tl',s:13,e:'✨',a:'a-twinkle'},{p:'o-tr',s:14,e:'💫',a:'a-twinkle'},{p:'o-bl',s:11,e:'⭐',a:'a-pulse'},{p:'o-br',s:13,e:'✨',a:'a-twinkle'}] },
    crown:  { name: 'Корона', emoji: '👑', tier: 5,
        over: [{p:'o-tl',s:13,e:'💎',a:'a-float'},{p:'o-tr',s:13,e:'💎',a:'a-bob'},{p:'o-bl',s:11,e:'✨',a:'a-twinkle'},{p:'o-br',s:11,e:'✨',a:'a-twinkle'}] },
    permafrost: { name: 'Вечный лёд', emoji: '🧊', tier: 5,
        over: [{p:'o-tl',s:24,e:'🧊',a:'a-float'},{p:'o-br',s:16,e:'❄️',a:'a-bob'},{p:'o-tr',s:11,e:'✨',a:'a-twinkle'}] },
    dragon: { name: 'Дракон', emoji: '🐉', tier: 5,
        over: [{p:'o-tr',s:18,e:'🔥',a:'a-rise'},{p:'o-tl',s:15,e:'✨',a:'a-twinkle'},{p:'o-br',s:13,e:'💥',a:'a-pulse'}] },

    // TIER 6
    galaxy: { name: 'Галактика', emoji: '🌌', tier: 6,
        over: [{p:'o-tl',s:11,e:'⭐',a:'a-twinkle'},{p:'o-tr',s:10,e:'✨',a:'a-twinkle'},{p:'o-bl',s:10,e:'⭐',a:'a-twinkle'},{p:'o-br',s:11,e:'✨',a:'a-twinkle'}] },
    phoenix:{ name: 'Феникс', emoji: '🦅', tier: 6,
        over: [{p:'o-tl',s:16,e:'🔥',a:'a-float'},{p:'o-tr',s:16,e:'🔥',a:'a-bob'},{p:'o-b',s:15,e:'✨',a:'a-pulse'}] },
    citadel:{ name: 'Цитадель', emoji: '🗼', tier: 6,
        over: [{p:'o-t',s:13,e:'👑',a:'a-float'},{p:'o-tl',s:11,e:'✨',a:'a-twinkle'},{p:'o-tr',s:11,e:'✨',a:'a-twinkle'}] },
    explosion:{ name: 'Взрыв', emoji: '💥', tier: 6,
        over: [{p:'o-tl',s:15,e:'🔥',a:'a-twinkle'},{p:'o-tr',s:15,e:'⚡',a:'a-twinkle'},{p:'o-bl',s:13,e:'💫',a:'a-pulse'},{p:'o-br',s:13,e:'✨',a:'a-twinkle'}] },

    // TIER 7
    universe:{ name: 'Вселенная', emoji: '🌠', tier: 7,
        over: [{p:'o-tl',s:11,e:'⭐',a:'a-twinkle'},{p:'o-tr',s:13,e:'✨',a:'a-twinkle'},{p:'o-bl',s:10,e:'⭐',a:'a-twinkle'},{p:'o-br',s:11,e:'✨',a:'a-twinkle'}] },
    throne:  { name: 'Трон мира', emoji: '🔱', tier: 7,
        over: [{p:'o-t',s:15,e:'👑',a:'a-float'},{p:'o-tl',s:13,e:'💎',a:'a-twinkle'},{p:'o-tr',s:13,e:'💎',a:'a-twinkle'},{p:'o-b',s:11,e:'✨',a:'a-pulse'}] },

    // TIER 8
    philosopher: { name: 'Философский камень', emoji: '🔮', tier: 8,
        over: [{p:'o-tl',s:13,e:'✨',a:'a-twinkle'},{p:'o-tr',s:15,e:'⚡',a:'a-twinkle'},{p:'o-bl',s:13,e:'💫',a:'a-twinkle'},{p:'o-br',s:15,e:'✨',a:'a-twinkle'}] }
};

const RECIPES = [
    { a: 'water', b: 'fire', result: 'steam' },
    { a: 'earth', b: 'air', result: 'dust' },
    { a: 'water', b: 'earth', result: 'mud' },
    { a: 'fire', b: 'earth', result: 'lava' },
    { a: 'energy', b: 'air', result: 'spark' },
    { a: 'water', b: 'ice', result: 'snow' },
    { a: 'steam', b: 'air', result: 'cloud' },
    { a: 'dust', b: 'fire', result: 'ash' },
    { a: 'mud', b: 'energy', result: 'sprout' },
    { a: 'lava', b: 'ice', result: 'glacier' },
    { a: 'spark', b: 'earth', result: 'crystal' },
    { a: 'snow', b: 'water', result: 'ocean' },
    { a: 'cloud', b: 'cloud', result: 'rain' },
    { a: 'ash', b: 'earth', result: 'stone' },
    { a: 'sprout', b: 'sprout', result: 'tree' },
    { a: 'glacier', b: 'energy', result: 'mirror' },
    { a: 'crystal', b: 'crystal', result: 'diamond' },
    { a: 'ocean', b: 'ice', result: 'snowman' },
    { a: 'rain', b: 'energy', result: 'storm' },
    { a: 'stone', b: 'fire', result: 'volcano' },
    { a: 'tree', b: 'tree', result: 'forest' },
    { a: 'mirror', b: 'cloud', result: 'moon' },
    { a: 'diamond', b: 'diamond', result: 'tiara' },
    { a: 'snowman', b: 'earth', result: 'mountain' },
    { a: 'storm', b: 'diamond', result: 'planet' },
    { a: 'volcano', b: 'ocean', result: 'island' },
    { a: 'forest', b: 'moon', result: 'unicorn' },
    { a: 'tiara', b: 'diamond', result: 'crown' },
    { a: 'mountain', b: 'ice', result: 'permafrost' },
    { a: 'volcano', b: 'planet', result: 'dragon' },
    { a: 'planet', b: 'planet', result: 'galaxy' },
    { a: 'unicorn', b: 'fire', result: 'phoenix' },
    { a: 'crown', b: 'island', result: 'citadel' },
    { a: 'permafrost', b: 'volcano', result: 'explosion' },
    { a: 'galaxy', b: 'explosion', result: 'universe' },
    { a: 'citadel', b: 'phoenix', result: 'throne' },
    { a: 'universe', b: 'throne', result: 'philosopher' }
];

// ============================================================
// ФУНКЦИИ
// ============================================================
function getCard(id) { return CARDS[id] || null; }
function getTierInfo(tier) { return TIERS[tier] || TIERS[0]; }

function findRecipe(cardA, cardB) {
    return RECIPES.find(r =>
        (r.a === cardA && r.b === cardB) ||
        (r.a === cardB && r.b === cardA)
    );
}

function getBaseCards() {
    return Object.keys(CARDS).filter(id => CARDS[id].tier === 0);
}
function getAllCardIds() { return Object.keys(CARDS); }
function getTotalCardsCount() { return Object.keys(CARDS).length; }

function rollBaseCard() {
    const base = getBaseCards();
    return base[Math.floor(Math.random() * base.length)];
}

// ============================================================
// РЕНДЕР ЭМОДЗИ-КОМБО
// ============================================================
function renderCardArt(cardId) {
    const card = getCard(cardId);
    if (!card) return '';

    const over = (card.over || []).map(o =>
        `<span class="over ${o.p} ${o.a || ''}" style="font-size:${o.s}px">${o.e}</span>`
    ).join('');

    return `<span class="emo">${card.emoji}</span>${over}`;
}

function validateTree() {
    const errors = [];
    const allIds = getAllCardIds();
    const baseIds = new Set(getBaseCards());

    for (const id of allIds) {
        if (baseIds.has(id)) continue;
        const recipes = RECIPES.filter(r => r.result === id);
        if (recipes.length === 0) errors.push(`❌ ${id} — не имеет рецепта`);
        if (recipes.length > 1) errors.push(`⚠️ ${id} — несколько рецептов`);
    }

    for (const r of RECIPES) {
        if (!CARDS[r.a]) errors.push(`❌ Рецепт: "${r.a}" не существует`);
        if (!CARDS[r.b]) errors.push(`❌ Рецепт: "${r.b}" не существует`);
        if (!CARDS[r.result]) errors.push(`❌ Результат "${r.result}" не существует`);
    }

    const seen = new Set();
    for (const r of RECIPES) {
        const key = [r.a, r.b].sort().join('+');
        if (seen.has(key)) errors.push(`⚠️ Дубликат рецепта: ${key}`);
        seen.add(key);
    }

    if (errors.length === 0) {
        console.log('✅ Дерево валидно! Карт:', allIds.length, '| Рецептов:', RECIPES.length);
    } else {
        console.warn('❌ Проблемы:', errors);
    }
    return errors;
}

window.CARDS = CARDS;
window.TIERS = TIERS;
window.RECIPES = RECIPES;
window.getCard = getCard;
window.getTierInfo = getTierInfo;
window.findRecipe = findRecipe;
window.getBaseCards = getBaseCards;
window.getAllCardIds = getAllCardIds;
window.getTotalCardsCount = getTotalCardsCount;
window.rollBaseCard = rollBaseCard;
window.renderCardArt = renderCardArt;
window.validateTree = validateTree;