// ============================================================
// ОФЛАЙН-ДОХОД
// ============================================================
// Пока игрок не в игре — автодобыча работает на 40%
// Максимум накапливается за 8 часов

const OFFLINE_RATE = 0.4;       // 40% от автодобычи
const OFFLINE_MAX_HOURS = 8;    // максимум 8 часов

function calculateOfflineIncome() {
    const d = state.data;
    if (!d.lastSeen) {
        d.lastSeen = Date.now();
        return 0;
    }

    const now = Date.now();
    const diff = now - d.lastSeen;
    const hours = Math.min(diff / (1000 * 60 * 60), OFFLINE_MAX_HOURS);

    // Если меньше минуты — ничего
    if (diff < 60000) return 0;

    // Считаем сколько бы накопилось
    const perSec = (typeof goldPerSec === 'function') ? goldPerSec() : 0;
    if (perSec <= 0) return 0;

    const earned = Math.floor(perSec * OFFLINE_RATE * hours * 3600);

    return {
        earned,
        hours: Math.floor(hours),
        minutes: Math.floor((hours * 60) % 60)
    };
}

function applyOfflineIncome() {
    const result = calculateOfflineIncome();
    if (!result || result.earned <= 0) return;

    const d = state.data;
    d.gold += result.earned;
    d.totalGold += result.earned;

    // Показываем модалку
    showOfflineModal(result.earned, result.hours, result.minutes);

    saveNow(true);
    updateUI();
}

function showOfflineModal(earned, hours, minutes) {
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
}

function showOfflineModal(earned, hours, minutes) {
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

// Обновляем lastSeen каждые 30 секунд пока игрок онлайн
function trackActivity() {
    if (state.data) {
        state.data.lastSeen = Date.now();
    }
}

window.calculateOfflineIncome = calculateOfflineIncome;
window.applyOfflineIncome = applyOfflineIncome;
window.showOfflineModal = showOfflineModal;
window.closeOfflineModal = closeOfflineModal;
window.trackActivity = trackActivity;