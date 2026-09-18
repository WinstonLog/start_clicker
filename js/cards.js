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
    water:  { name: 'Вода',    emoji: '💧', tier: 0 },
    fire:   { name: 'Огонь',   emoji: '🔥', tier: 0 },
    earth:  { name: 'Земля',   emoji: '🪨', tier: 0 },
    air:    { name: 'Воздух',  emoji: '💨', tier: 0 },
    energy: { name: 'Энергия', emoji: '⚡', tier: 0 },
    ice:    { name: 'Лёд',     emoji: '❄️', tier: 0 },

    // TIER 1
    steam:  { name: 'Пар',     emoji: '♨️', tier: 1 },
    dust:   { name: 'Пыль',    emoji: '🌫️', tier: 1 },
    mud:    { name: 'Грязь',   emoji: '🟫', tier: 1 },
    lava:   { name: 'Лава',    emoji: '🌋', tier: 1 },
    spark:  { name: 'Искра',   emoji: '✨', tier: 1 },
    snow:   { name: 'Снег',    emoji: '🌨️', tier: 1 },

    // TIER 2
    cloud:  { name: 'Облако',  emoji: '☁️', tier: 2 },
    ash:    { name: 'Пепел',   emoji: '🪶', tier: 2 },
    sprout: { name: 'Росток',  emoji: '🌿', tier: 2 },
    glacier:{ name: 'Ледник',  emoji: '🧊', tier: 2 },
    crystal:{ name: 'Кристалл',emoji: '💎', tier: 2 },
    ocean:  { name: 'Океан',   emoji: '🌊', tier: 2 },

    // TIER 3
    rain:   { name: 'Дождь',    emoji: '🌧️', tier: 3 },
    stone:  { name: 'Камень',   emoji: '🗿', tier: 3 },
    tree:   { name: 'Дерево',   emoji: '🌳', tier: 3 },
    mirror: { name: 'Зеркало',  emoji: '🪞', tier: 3 },
    diamond:{ name: 'Алмаз',    emoji: '💠', tier: 3 },
    snowman:{ name: 'Снеговик', emoji: '⛄', tier: 3 },

    // TIER 4
    storm:  { name: 'Гроза',    emoji: '⛈️', tier: 4 },
    volcano:{ name: 'Вулкан',   emoji: '🌋', tier: 4 },
    forest: { name: 'Лес',      emoji: '🌲', tier: 4 },
    moon:   { name: 'Луна',     emoji: '🌙', tier: 4 },
    tiara:  { name: 'Диадема',  emoji: '💍', tier: 4 },
    mountain:{ name: 'Гора',    emoji: '⛰️', tier: 4 },

    // TIER 5
    planet: { name: 'Планета',  emoji: '🪐', tier: 5 },
    island: { name: 'Остров',   emoji: '🏝️', tier: 5 },
    unicorn:{ name: 'Единорог', emoji: '🦄', tier: 5 },
    crown:  { name: 'Корона',   emoji: '👑', tier: 5 },
    permafrost: { name: 'Вечный лёд', emoji: '🧊', tier: 5 },
    dragon: { name: 'Дракон',   emoji: '🐉', tier: 5 },

    // TIER 6
    galaxy: { name: 'Галактика', emoji: '🌌', tier: 6 },
    phoenix:{ name: 'Феникс',    emoji: '🦅', tier: 6 },
    citadel:{ name: 'Цитадель',  emoji: '🗼', tier: 6 },
    explosion:{ name: 'Взрыв',   emoji: '💥', tier: 6 },

    // TIER 7
    universe:{ name: 'Вселенная', emoji: '🌠', tier: 7 },
    throne:  { name: 'Трон мира', emoji: '🔱', tier: 7 },

    // TIER 8 — ВЕРШИНА
    philosopher: { name: 'Философский камень', emoji: '🔮', tier: 8 }
};

const RECIPES = [
    // TIER 1
    { a: 'water',   b: 'fire',   result: 'steam'  },
    { a: 'earth',   b: 'air',    result: 'dust'   },
    { a: 'water',   b: 'earth',  result: 'mud'    },
    { a: 'fire',    b: 'earth',  result: 'lava'   },
    { a: 'energy',  b: 'air',    result: 'spark'  },
    { a: 'water',   b: 'ice',    result: 'snow'   },

    // TIER 2
    { a: 'steam',   b: 'air',    result: 'cloud'  },
    { a: 'dust',    b: 'fire',   result: 'ash'    },
    { a: 'mud',     b: 'energy', result: 'sprout' },
    { a: 'lava',    b: 'ice',    result: 'glacier'},
    { a: 'spark',   b: 'earth',  result: 'crystal'},
    { a: 'snow',    b: 'water',  result: 'ocean'  },

    // TIER 3
    { a: 'cloud',   b: 'cloud',  result: 'rain'   },
    { a: 'ash',     b: 'earth',  result: 'stone'  },
    { a: 'sprout',  b: 'sprout', result: 'tree'   },
    { a: 'glacier', b: 'energy', result: 'mirror' },
    { a: 'crystal', b: 'crystal',result: 'diamond'},
    { a: 'ocean',   b: 'ice',    result: 'snowman'},

    // TIER 4
    { a: 'rain',    b: 'energy', result: 'storm'  },
    { a: 'stone',   b: 'fire',   result: 'volcano'},
    { a: 'tree',    b: 'tree',   result: 'forest' },
    { a: 'mirror',  b: 'cloud',  result: 'moon'   },
    { a: 'diamond', b: 'diamond',result: 'tiara'  },
    { a: 'snowman', b: 'earth',  result: 'mountain'},

    // TIER 5
    { a: 'storm',   b: 'diamond',result: 'planet' },
    { a: 'volcano', b: 'ocean',  result: 'island' },
    { a: 'forest',  b: 'moon',   result: 'unicorn'},
    { a: 'tiara',   b: 'diamond',result: 'crown'  },
    { a: 'mountain',b: 'ice',    result: 'permafrost'},
    { a: 'volcano', b: 'planet', result: 'dragon' },

    // TIER 6
    { a: 'planet',  b: 'planet', result: 'galaxy' },
    { a: 'unicorn', b: 'fire',   result: 'phoenix'},
    { a: 'crown',   b: 'island', result: 'citadel'},
    { a: 'permafrost', b: 'volcano', result: 'explosion'},

    // TIER 7
    { a: 'galaxy',  b: 'explosion', result: 'universe' },
    { a: 'citadel', b: 'phoenix',   result: 'throne'   },

    // TIER 8 — ВЕРШИНА
    { a: 'universe', b: 'throne', result: 'philosopher' }
];

function getCard(id) {
    return CARDS[id] || null;
}

function getTierInfo(tier) {
    return TIERS[tier] || TIERS[0];
}

function findRecipe(cardA, cardB) {
    return RECIPES.find(r =>
        (r.a === cardA && r.b === cardB) ||
        (r.a === cardB && r.b === cardA)
    );
}

function getBaseCards() {
    return Object.keys(CARDS).filter(id => CARDS[id].tier === 0);
}

function getAllCardIds() {
    return Object.keys(CARDS);
}

function getTotalCardsCount() {
    return Object.keys(CARDS).length;
}

function rollBaseCard() {
    const base = getBaseCards();
    return base[Math.floor(Math.random() * base.length)];
}

function validateTree() {
    const errors = [];
    const allIds = getAllCardIds();
    const baseIds = new Set(getBaseCards());

    // 1. Каждая не-базовая карта имеет ровно 1 рецепт
    for (const id of allIds) {
        if (baseIds.has(id)) continue;
        const recipes = RECIPES.filter(r => r.result === id);
        if (recipes.length === 0) errors.push(`❌ ${id} — не имеет рецепта`);
        if (recipes.length > 1) errors.push(`⚠️ ${id} — несколько рецептов (${recipes.length})`);
    }

    // 2. Каждый рецепт ссылается на существующие карты
    for (const r of RECIPES) {
        if (!CARDS[r.a]) errors.push(`❌ Рецепт: карта "${r.a}" не существует`);
        if (!CARDS[r.b]) errors.push(`❌ Рецепт: карта "${r.b}" не существует`);
        if (!CARDS[r.result]) errors.push(`❌ Рецепт: результат "${r.result}" не существует`);

        // Рецепт не может ссылаться на самого себя
        if (r.a === r.result || r.b === r.result) {
            errors.push(`⚠️ Рецепт ${r.a}+${r.b}=${r.result} ссылается на самого себя`);
        }
    }

    // 3. Никаких дубликатов рецептов
    const seen = new Set();
    for (const r of RECIPES) {
        const key = [r.a, r.b].sort().join('+');
        if (seen.has(key)) errors.push(`⚠️ Дубликат рецепта: ${key}`);
        seen.add(key);
    }

    // 4. Проверка на зацикливание (нельзя получить карту через саму себя косвенно)
    // Строим граф: карта → какие карты нужны для её получения
    const deps = {};
    for (const r of RECIPES) {
        deps[r.result] = [r.a, r.b];
    }

    // Для каждой карты проверяем, что её можно получить "снизу вверх"
    function canCraft(cardId, visited = new Set()) {
        if (baseIds.has(cardId)) return true;
        if (visited.has(cardId)) return false; // цикл!
        visited.add(cardId);

        const dep = deps[cardId];
        if (!dep) return false;

        return dep.every(d => canCraft(d, new Set(visited)));
    }

    for (const id of allIds) {
        if (!canCraft(id)) {
            errors.push(`❌ ${id} — невозможно получить (цикл в зависимостях)`);
        }
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
window.validateTree = validateTree;