// ============================================================
// АЛХИМИЯ — ЛАБОРАТОРИЯ
// ============================================================

let slotA = null;
let slotB = null;
let pickerTarget = null;

// ============================================================
// ИНВЕНТАРЬ
// ============================================================
function renderInventory() {
    const container = document.getElementById('inventoryContainer');
    if (!container) return;

    const d = state.data;
    const inv = d.inventory || {};
    const ids = Object.keys(inv).filter(id => inv[id] > 0);

    if (ids.length === 0) {
        container.innerHTML = `
            <div class="inventory-empty">
                <div style="font-size:48px;margin-bottom:10px;">🎒</div>
                <div>Инвентарь пуст</div>
                <div style="font-size:12px;margin-top:6px;color:#4a4f5e;">
                    Открой пак, чтобы получить базовые карты
                </div>
            </div>`;
        return;
    }

    ids.sort((a, b) => {
        const ca = getCard(a), cb = getCard(b);
        if (!ca || !cb) return 0;
        if (ca.tier !== cb.tier) return ca.tier - cb.tier;
        return ca.name.localeCompare(cb.name);
    });

    container.innerHTML = ids.map(id => {
        const card = getCard(id);
        const tier = getTierInfo(card.tier);
        return `
            <div class="inventory-card tier-${card.tier}"
                 style="--tier-color:${tier.color}; --tier-glow:${tier.glow}"
                 onclick="pickFromInventory('${id}')">
                <div class="inventory-count">×${inv[id]}</div>
                <div class="inventory-emoji">${card.emoji}</div>
                <div class="inventory-name">${card.name}</div>
            </div>
        `;
    }).join('');
}

function pickFromInventory(cardId) {
    if (!slotA) {
        slotA = cardId;
    } else if (!slotB) {
        slotB = cardId;
    } else {
        slotB = cardId;
    }

    switchTab('lab');
    renderSlots();
    updateMergeButton();
}

// ============================================================
// КОЛЛЕКЦИЯ
// ============================================================
function renderCollection() {
    const container = document.getElementById('collectionContainer');
    if (!container) return;

    const d = state.data;
    const seen = new Set(d.seen || []);
    const allIds = getAllCardIds();

    allIds.sort((a, b) => {
        const ca = getCard(a), cb = getCard(b);
        if (ca.tier !== cb.tier) return ca.tier - cb.tier;
        return ca.name.localeCompare(cb.name);
    });

    const header = document.getElementById('collectionHeader');
    if (header) {
        header.textContent = `📖 Собрано ${seen.size} / ${allIds.length}`;
    }

    container.innerHTML = allIds.map(id => {
        const card = getCard(id);
        const tier = getTierInfo(card.tier);
        const isSeen = seen.has(id);

        return `
            <div class="collection-card tier-${card.tier} ${isSeen ? '' : 'locked'}"
                 style="--tier-color:${tier.color}; --tier-glow:${tier.glow}">
                <div class="collection-emoji">${isSeen ? card.emoji : '❓'}</div>
                <div class="collection-name">${isSeen ? card.name : '???'}</div>
                <div class="collection-tier" style="color:${tier.color}">${tier.name}</div>
            </div>
        `;
    }).join('');
}

// ============================================================
// ПИКЕР КАРТ
// ============================================================
function openPicker(slot) {
    pickerTarget = slot;
    const picker = document.getElementById('cardPickerOverlay');
    const grid = document.getElementById('pickerGrid');
    const title = document.getElementById('pickerTitle');
    if (!picker || !grid) return;

    title.textContent = slot === 'A' ? 'Карта 1' : 'Карта 2';

    const d = state.data;
    const inv = d.inventory || {};

    // Какая карта уже стоит в другом слоте
    const otherSlot = slot === 'A' ? slotB : slotA;

    // Все карты с количеством > 0
    let ids = Object.keys(inv).filter(id => inv[id] > 0);

    // Фильтр: если карта в другом слоте и её 1 шт — не показываем
    // (нельзя поставить одну и ту же карту в оба слота — её не хватит на слияние)
    ids = ids.filter(id => {
        if (id === otherSlot && (inv[id] || 0) < 2) return false;
        return true;
    });

    ids.sort((a, b) => {
        const ca = getCard(a), cb = getCard(b);
        if (!ca || !cb) return 0;
        if (ca.tier !== cb.tier) return ca.tier - cb.tier;
        return ca.name.localeCompare(cb.name);
    });

    if (ids.length === 0) {
        grid.innerHTML = `<div class="picker-empty">Нет доступных карт</div>`;
    } else {
        grid.innerHTML = ids.map(id => {
            const card = getCard(id);
            const tier = getTierInfo(card.tier);
            return `
                <div class="picker-card tier-${card.tier}"
                     style="--tier-color:${tier.color}"
                     onclick="selectCard('${id}')">
                    <div class="picker-card-count">×${inv[id]}</div>
                    <div class="picker-card-emoji">${card.emoji}</div>
                    <div class="picker-card-name">${card.name}</div>
                </div>
            `;
        }).join('');
    }

    picker.style.display = 'flex';
}

function closePicker(event) {
    if (event && event.target !== event.currentTarget) return;
    const picker = document.getElementById('cardPickerOverlay');
    if (picker) picker.style.display = 'none';
    pickerTarget = null;
}

function selectCard(id) {
    if (!pickerTarget) return;

    if (pickerTarget === 'A') {
        slotA = id;
    } else {
        slotB = id;
    }

    closePicker();
    renderSlots();
    updateMergeButton();
}

// ============================================================
// СЛОТЫ
// ============================================================
function renderSlots() {
    const slotAEl = document.getElementById('slotA');
    const slotBEl = document.getElementById('slotB');

    renderSlot(slotAEl, slotA);
    renderSlot(slotBEl, slotB);

    const preview = document.querySelector('.lab-preview-result');
    if (preview) {
        if (slotA && slotB) {
            const d = state.data;
            const inv = d.inventory || {};

            // Проверка: хватает ли карт для слияния
            let enough = true;
            if (slotA === slotB) {
                if ((inv[slotA] || 0) < 2) enough = false;
            } else {
                if ((inv[slotA] || 0) < 1 || (inv[slotB] || 0) < 1) enough = false;
            }

            if (!enough) {
                preview.textContent = '❌';
                preview.classList.remove('known');
                preview.style.filter = '';
            } else {
                const recipe = findRecipe(slotA, slotB);
                if (recipe) {
                    const resCard = getCard(recipe.result);
                    const isNew = !(d.seen || []).includes(recipe.result);
                    preview.textContent = resCard.emoji;
                    preview.classList.add('known');
                    preview.style.filter = isNew
                        ? 'drop-shadow(0 0 20px #ffcc66) drop-shadow(0 0 40px #ffcc66)'
                        : 'drop-shadow(0 0 20px #4ad4ff)';
                } else {
                    preview.textContent = '❌';
                    preview.classList.remove('known');
                    preview.style.filter = '';
                }
            }
        }
    }
}

function renderSlot(el, cardId) {
    if (!el) return;

    if (!cardId) {
        el.classList.remove('filled');
        el.style.removeProperty('--slot-color');
        el.style.removeProperty('--slot-glow');
        el.innerHTML = '<span class="lab-slot-plus">?</span>';
        return;
    }

    const card = getCard(cardId);
    const tier = getTierInfo(card.tier);
    el.classList.add('filled');
    el.style.setProperty('--slot-color', tier.color);
    el.style.setProperty('--slot-glow', tier.glow);
    el.innerHTML = `
        <div class="lab-slot-emoji">${card.emoji}</div>
        <div class="lab-slot-name">${card.name}</div>
    `;
}

function clearSlots() {
    slotA = null;
    slotB = null;
    renderSlots();
    updateMergeButton();
}

function updateMergeButton() {
    const btn = document.getElementById('labMergeBtn');
    if (!btn) return;
    btn.disabled = !(slotA && slotB);
}

// ============================================================
// СЛИЯНИЕ
// ============================================================
function doMerge() {
    if (!slotA || !slotB) return;

    const d = state.data;
    if (!d.inventory) d.inventory = {};

    if (slotA === slotB) {
        if ((d.inventory[slotA] || 0) < 2) {
            showMergeOverlay({ ok: false, error: 'need_two' });
            if (typeof playMergeFail === 'function') playMergeFail();
            return;
        }
    } else {
        if ((d.inventory[slotA] || 0) < 1 || (d.inventory[slotB] || 0) < 1) {
            showMergeOverlay({ ok: false, error: 'no_cards' });
            if (typeof playMergeFail === 'function') playMergeFail();
            return;
        }
    }

    const recipe = findRecipe(slotA, slotB);
    if (!recipe) {
        showMergeOverlay({ ok: false, error: 'no_recipe' });
        if (typeof playMergeFail === 'function') playMergeFail();
        return;
    }

    if (slotA === slotB) {
        d.inventory[slotA] -= 2;
    } else {
        d.inventory[slotA] -= 1;
        d.inventory[slotB] -= 1;
    }

    if (d.inventory[slotA] <= 0) delete d.inventory[slotA];
    if (d.inventory[slotB] <= 0) delete d.inventory[slotB];

    const resultId = recipe.result;
    d.inventory[resultId] = (d.inventory[resultId] || 0) + 1;

    if (!d.seen) d.seen = [];
    const isNew = !d.seen.includes(resultId);
    if (isNew) {
        d.seen.push(resultId);
        addRating(300);
        addXp(60);
    } else {
        addRating(20);
        addXp(5);
    }

    if (!d.discovered) d.discovered = [];
    const key = [slotA, slotB].sort().join('+');
    if (!d.discovered.includes(key)) {
        d.discovered.push(key);
    }

    d.merges = (d.merges || 0) + 1;

    saveNow(true);

    if (typeof playMergeSuccess === 'function') playMergeSuccess();
    if (typeof vibrate === 'function') vibrate([40, 20, 40]);

    const a = slotA;
    const b = slotB;
    showMergeOverlay({
        ok: true,
        cardId: resultId,
        isNew,
        a,
        b
    });

    slotA = null;
    slotB = null;
    renderSlots();
    updateMergeButton();

    renderInventory();
    renderCollection();
    updateUI();
    renderJournal();
}

// ============================================================
// ОВЕРЛЕЙ РЕЗУЛЬТАТА
// ============================================================
function showMergeOverlay(data) {
    const overlay = document.getElementById('mergeOverlay');
    const content = document.getElementById('mergeContent');
    if (!overlay || !content) return;

    if (!data.ok) {
        const texts = {
            no_cards: 'У тебя нет этих карт',
            need_two: 'Нужно 2 одинаковые карты',
            no_recipe: 'Ничего не получилось...'
        };
        content.innerHTML = `
            <div class="merge-title" style="color:#ff5c7a;">Неудача</div>
            <div class="merge-fail-text">${texts[data.error] || 'Ошибка'}</div>
            <button class="merge-close" onclick="closeMergeOverlay()">Понятно</button>
        `;
    } else {
        const card = getCard(data.cardId);
        const cardA = getCard(data.a);
        const cardB = getCard(data.b);
        const tier = getTierInfo(card.tier);
        const isFinal = data.cardId === 'philosopher';

        content.innerHTML = `
            <div class="merge-title" ${isFinal ? 'style="color:#ff3366;"' : ''}>
                ${isFinal ? '🔮 АБСОЛЮТ ДОСТИГНУТ!' : 'Слияние успешно!'}
            </div>
            <div class="merge-formula">
                <span>${cardA.emoji}</span>
                <span class="arrow">+</span>
                <span>${cardB.emoji}</span>
                <span class="arrow">→</span>
            </div>
            <div class="merge-result tier-${card.tier}" style="filter: drop-shadow(0 0 24px ${tier.color})">${card.emoji}</div>
            <div class="merge-name">${card.name}</div>
            <div style="font-size:11px;color:${tier.color};font-weight:800;letter-spacing:1px;">
                ${tier.name.toUpperCase()}
            </div>
            ${data.isNew ? '<div class="merge-new-badge">🆕 НОВАЯ КАРТА!</div>' : ''}
            ${isFinal ? '<div class="merge-new-badge" style="animation:starSpin 1s infinite;">🔮 ФИЛОСОФСКИЙ КАМЕНЬ</div>' : ''}
            <button class="merge-close" onclick="closeMergeOverlay()">Класс!</button>
        `;
    }

    overlay.style.display = 'flex';

    clearTimeout(window._mergeTimer);
    window._mergeTimer = setTimeout(closeMergeOverlay, 4000);
}

function closeMergeOverlay() {
    const overlay = document.getElementById('mergeOverlay');
    if (overlay) overlay.style.display = 'none';
    clearTimeout(window._mergeTimer);
}

// ============================================================
// ЖУРНАЛ
// ============================================================
function renderJournal() {
    const container = document.getElementById('labJournal');
    if (!container) return;

    const d = state.data;
    const discovered = d.discovered || [];

    if (discovered.length === 0) {
        container.innerHTML = `
            <div style="grid-column:1/-1;padding:30px 20px;text-align:center;color:#6b7084;font-size:13px;">
                Пока ничего не открыто.<br>
                Соедини 2 карты в лаборатории выше ↑
            </div>
        `;
        return;
    }

    const sorted = [...discovered].sort();

    container.innerHTML = sorted.map(key => {
        const [a, b] = key.split('+');
        const cardA = getCard(a);
        const cardB = getCard(b);
        const recipe = findRecipe(a, b);
        if (!cardA || !cardB || !recipe) return '';
        const resCard = getCard(recipe.result);

        return `
            <div class="journal-item">
                <span class="emoji">${cardA.emoji}</span>
                <span class="arrow">+</span>
                <span class="emoji">${cardB.emoji}</span>
                <span class="arrow">=</span>
                <span class="emoji">${resCard.emoji}</span>
                <span class="result">${resCard.name}</span>
            </div>
        `;
    }).join('');
}

// ============================================================
// ПОДСКАЗКА
// ============================================================
const HINT_PRICE = 500;

function buyHint() {
    const d = state.data;
    if (d.gold < HINT_PRICE) {
        spawnFloat('Не хватает!', window.innerWidth / 2, window.innerHeight / 2, '#ff5c7a', 20);
        return;
    }

    const discovered = new Set(d.discovered || []);
    const availableRecipes = RECIPES.filter(r => {
        const key = [r.a, r.b].sort().join('+');
        return !discovered.has(key);
    });

    if (availableRecipes.length === 0) {
        spawnFloat('🎉 Все рецепты открыты!', window.innerWidth / 2, 200, '#ffcc66', 18);
        return;
    }

    availableRecipes.sort((a, b) => {
        const ta = getCard(a.result).tier;
        const tb = getCard(b.result).tier;
        return ta - tb;
    });

    const pool = availableRecipes.slice(0, Math.min(5, availableRecipes.length));
    const pick = pool[Math.floor(Math.random() * pool.length)];

    const key = [pick.a, pick.b].sort().join('+');
    const cardA = getCard(pick.a);
    const cardB = getCard(pick.b);
    const resCard = getCard(pick.result);
    const tier = getTierInfo(resCard.tier);

    d.gold -= HINT_PRICE;
    if (!d.discovered) d.discovered = [];
    d.discovered.push(key);

    addRating(50);

    saveNow(true);
    updateUI();
    renderJournal();

    const hintHTML = `
        <div class="merge-title" style="color:#ffcc66;">Подсказка!</div>
        <div class="merge-formula">
            <span>${cardA.emoji}</span>
            <span class="arrow">+</span>
            <span>${cardB.emoji}</span>
            <span class="arrow">=</span>
            <span>${resCard.emoji}</span>
        </div>
        <div class="merge-name">${resCard.name}</div>
        <div style="font-size:11px;color:${tier.color};font-weight:800;letter-spacing:1px;">
            ${tier.name.toUpperCase()}
        </div>
        <button class="merge-close" onclick="closeMergeOverlay()">Записано!</button>
    `;

    const overlay = document.getElementById('mergeOverlay');
    const content = document.getElementById('mergeContent');
    if (overlay && content) {
        content.innerHTML = hintHTML;
        overlay.style.display = 'flex';
        clearTimeout(window._mergeTimer);
        window._mergeTimer = setTimeout(closeMergeOverlay, 5000);
    }

    if (typeof playMergeSuccess === 'function') playMergeSuccess();
}

// ============================================================
// ВИЗУАЛЬНАЯ КАРТА ДЕРЕВА
// ============================================================
function openTreeMap() {
    const overlay = document.getElementById('treeOverlay');
    if (!overlay) return;

    renderTreeMap();
    overlay.style.display = 'flex';
}

function closeTreeMap() {
    const overlay = document.getElementById('treeOverlay');
    if (overlay) overlay.style.display = 'none';
}

function renderTreeMap() {
    const canvas = document.getElementById('treeCanvas');
    if (!canvas) return;

    const d = state.data;
    const seen = new Set(d.seen || []);

    const byTier = {};
    for (const id of getAllCardIds()) {
        const card = getCard(id);
        if (!byTier[card.tier]) byTier[card.tier] = [];
        byTier[card.tier].push(id);
    }

    for (const t in byTier) {
        byTier[t].sort((a, b) => getCard(a).name.localeCompare(getCard(b).name));
    }

    const tiers = Object.keys(byTier).map(Number).sort((a, b) => a - b);
    const tierNames = {
        0: '🌍 Стихии',
        1: '🜂 Простые',
        2: '🜃 Обычные',
        3: '🜄 Необычные',
        4: '🜅 Редкие',
        5: '🜆 Эпические',
        6: '🜇 Мифические',
        7: '🜈 Божественные',
        8: '🜉 АБСОЛЮТ'
    };

    let html = '';

    for (const tier of tiers) {
        const ids = byTier[tier];

        html += `
            <div class="tree-level">
                <div class="tree-level-header">${tierNames[tier] || ('Уровень ' + tier)}</div>
                <div class="tree-level-cards">
                    ${ids.map(id => {
                        const card = getCard(id);
                        const ti = getTierInfo(card.tier);
                        const isSeen = seen.has(id);
                        return `
                            <div class="tree-card tier-${card.tier} ${isSeen ? '' : 'unknown'}"
                                 style="--tier-color:${ti.color}; --tier-glow:${ti.glow}"
                                 onclick="showTreeInfo('${id}')">
                                <div class="tree-card-emoji">${isSeen ? card.emoji : '❓'}</div>
                                <div class="tree-card-name">${isSeen ? card.name : '???'}</div>
                                ${isSeen ? '<div class="tree-card-check">✓</div>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        if (tier < tiers[tiers.length - 1]) {
            html += `<div class="tree-arrow">▼</div>`;
        }
    }

    canvas.innerHTML = html;
}

function showTreeInfo(cardId) {
    const card = getCard(cardId);
    if (!card) return;

    const tier = getTierInfo(card.tier);
    const d = state.data;
    const seen = new Set(d.seen || []);
    const discovered = new Set(d.discovered || []);

    const isSeen = seen.has(cardId);
    const isBase = card.tier === 0;
    const recipe = RECIPES.find(r => r.result === cardId);
    const isDiscovered = recipe && discovered.has([recipe.a, recipe.b].sort().join('+'));

    let contentHTML = `
        <div class="tree-info-emoji tier-${card.tier}" style="filter: drop-shadow(0 0 20px ${tier.color})">${isSeen ? card.emoji : '❓'}</div>
        <div class="tree-info-name">${isSeen ? card.name : '???'}</div>
        <div class="tree-info-tier" style="color:${tier.color}">${tier.name}</div>
    `;

    if (isBase) {
        contentHTML += `
            <div style="font-size:12px;color:#8b90a8;text-align:center;padding:8px 0;">
                📦 Получается из паков
            </div>
        `;
    } else if (recipe) {
        const cardA = getCard(recipe.a);
        const cardB = getCard(recipe.b);
        const aSeen = seen.has(recipe.a);
        const bSeen = seen.has(recipe.b);

        contentHTML += `
            <div class="tree-info-formula">
                <span>${aSeen ? cardA.emoji : '❓'}</span>
                <span class="arrow">+</span>
                <span>${bSeen ? cardB.emoji : '❓'}</span>
                <span class="arrow">=</span>
                <span>${isSeen ? card.emoji : '❓'}</span>
            </div>
            <div class="tree-info-formula-name">
                ${aSeen ? cardA.name : '???'} + ${bSeen ? cardB.name : '???'}
            </div>
        `;
    }

    let statusHTML = '';
    if (isSeen) {
        statusHTML = `<div class="tree-info-status discovered">✅ Открыта</div>`;
    } else if (isDiscovered) {
        statusHTML = `<div class="tree-info-status known">💡 Рецепт известен</div>`;
    } else {
        statusHTML = `<div class="tree-info-status unknown">🔒 Не открыта</div>`;
    }
    contentHTML += statusHTML;

    contentHTML += `
        <button class="tree-info-btn" onclick="closeTreeInfo()">Закрыть</button>
    `;

    const overlay = document.createElement('div');
    overlay.className = 'tree-info-overlay';
    overlay.id = 'treeInfoOverlay';
    overlay.style.setProperty('--info-color', tier.color);
    overlay.style.setProperty('--info-glow', tier.glow);
    overlay.onclick = (e) => { if (e.target === overlay) closeTreeInfo(); };
    overlay.innerHTML = `<div class="tree-info-content">${contentHTML}</div>`;

    document.body.appendChild(overlay);
}

function closeTreeInfo() {
    const overlay = document.getElementById('treeInfoOverlay');
    if (overlay) overlay.remove();
}

// ============================================================
// ЭКСПОРТ
// ============================================================
window.renderInventory = renderInventory;
window.renderCollection = renderCollection;
window.openPicker = openPicker;
window.closePicker = closePicker;
window.selectCard = selectCard;
window.clearSlots = clearSlots;
window.doMerge = doMerge;
window.closeMergeOverlay = closeMergeOverlay;
window.renderJournal = renderJournal;
window.buyHint = buyHint;
window.pickFromInventory = pickFromInventory;
window.openTreeMap = openTreeMap;
window.closeTreeMap = closeTreeMap;
window.renderTreeMap = renderTreeMap;
window.showTreeInfo = showTreeInfo;
window.closeTreeInfo = closeTreeInfo;