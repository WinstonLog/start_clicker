// ============================================================
// ОФЛАЙН-ДОХОД
// ============================================================
// Пока игрок не в игре — автодобыча работает на 40%
// Максимум накапливается за 8 часов

const OFFLINE_RATE = 0.4;       // 40% от автодобычи
const OFFLINE_MAX_HOURS = 8;    // максимум 8 часов

// ============================================================
// ГАРАНТИРОВАННОЕ СОХРАНЕНИЕ lastSeen
// ============================================================
// Синхронный XHR — блокирует UI на ~100-500мс, но ГАРАНТИРУЕТ
// что данные долетели до Supabase даже при мгновенной перезагрузке
function forceSaveLastSeen() {
    if (!state.playerId || !state.token) return;

    try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${SUPABASE_URL}/rest/v1/rpc/save_data`, false); // false = синхронно
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('apikey', SUPABASE_KEY);
        xhr.setRequestHeader('Authorization', `Bearer ${SUPABASE_KEY}`);
        xhr.send(JSON.stringify({
            p_player_id: state.playerId,
            p_hash: state.token,
            p_data: state.data
        }));
    } catch (e) {
        console.warn('forceSaveLastSeen failed:', e);
    }
}

// ============================================================
// ПРИМЕНЕНИЕ ОФЛАЙН-ДОХОДА
// ============================================================
function applyOfflineIncome() {
    const d = state.data;
    if (!d) return;

    const now = Date.now();
    const lastSeen = d.lastSeen || now;
    const diff = now - lastSeen;

    // 🛡️ ЗАЩИТА #1: обновляем lastSeen СРАЗУ — до всего остального
    // Если игрок перезагрузит страницу — в памяти уже новый
    d.lastSeen = now;

    // 🛡️ ЗАЩИТА #2: sessionStorage — не даём награду дважды за 60 сек
    // Даже если lastSeen не долетел до БД
    const sessionKey = 'offline_claimed_at_' + (state.playerId || 'guest');
    const claimedAt = parseInt(sessionStorage.getItem(sessionKey) || '0');
    const secondsSinceClaim = (now - claimedAt) / 1000;

    if (secondsSinceClaim < 60) {
        // Уже давали награду меньше минуты назад — пропускаем
        // Но lastSeen всё равно сохраняем
        saveNow(true);
        return;
    }

    // Если меньше минуты офлайна — не начисляем
    if (diff < 60000) {
        saveNow(true);
        return;
    }

    const perSec = (typeof goldPerSec === 'function') ? goldPerSec() : 0;
    if (perSec <= 0) {
        saveNow(true);
        return;
    }

    const hours = Math.min(diff / (1000 * 60 * 60), OFFLINE_MAX_HOURS);
    const earned = Math.floor(perSec * OFFLINE_RATE * hours * 3600);

    if (earned <= 0) {
        saveNow(true);
        return;
    }

    // 🛡️ ЗАЩИТА #3: ставим метку СРАЗУ, до начисления
    sessionStorage.setItem(sessionKey, String(now));

    // Начисляем
    d.gold += earned;
    d.totalGold += earned;

    // 🛡️ ЗАЩИТА #4: двойное сохранение
    // Обычное (асинхронное) + синхронное (гарантированное)
    saveNow(true);
    forceSaveLastSeen();

    // Показываем модалку
    showOfflineModal(earned, Math.floor(hours), Math.floor((hours * 60) % 60));
    updateUI();
}

// ============================================================
// МОДАЛКА (одна, не две!)
// ============================================================
function showOfflineModal(earned, hours, minutes) {
    // Если уже показана — не дублируем
    if (document.getElementById('offlineOverlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'offline-overlay';
    overlay.innerHTML = `
        <div class="offline-content">
            <div class="offline-icon">💤</div>
            <div class="offline-title">Пока тебя не было...</div>
            <div class="offline-time">
                ${hours > 0 ? hours + ' ч ' : ''}${minutes} мин
            </div>
            <div class="offline-earned">
                +${formatNum(earned)} 💠
            </div>
            <div class="offline-rate">Автодобыча работала на 40%</div>
            <button class="offline-close" onclick="closeOfflineModal()">Забрать</button>
        </div>
    `;
    overlay.id = 'offlineOverlay';
    overlay.onclick = (e) => { if (e.target === overlay) closeOfflineModal(); };
    document.body.appendChild(overlay);

    if (typeof vibrate === 'function') vibrate([50, 30, 50]);
    if (typeof playBonus === 'function') playBonus();
}

function closeOfflineModal() {
    const el = document.getElementById('offlineOverlay');
    if (el) el.remove();
}

// ============================================================
// ТРЕКИНГ АКТИВНОСТИ (каждые 30 сек из main.js)
// ============================================================
function trackActivity() {
    if (state.data) {
        state.data.lastSeen = Date.now();
    }
}

// ============================================================
// ЭКСПОРТ
// ============================================================
window.applyOfflineIncome = applyOfflineIncome;
window.showOfflineModal = showOfflineModal;
window.closeOfflineModal = closeOfflineModal;
window.trackActivity = trackActivity;
window.forceSaveLastSeen = forceSaveLastSeen;
