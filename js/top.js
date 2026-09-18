// ============================================================
// ТОП ИГРОКОВ
// ============================================================

let topCache = null;
let topCacheTime = 0;
const TOP_CACHE_TTL = 30000;

async function loadTop(force = false) {
    const container = document.getElementById('topContainer');
    if (!container) return;

    const now = Date.now();
    if (!force && topCache && (now - topCacheTime) < TOP_CACHE_TTL) {
        renderTop(topCache);
        return;
    }

    container.innerHTML = '<div class="top-loading">⏳ Загрузка топа...</div>';

    try {
        const { data, error } = await sb.rpc('get_top', { p_limit: 50 });
        if (error) throw error;

        topCache = data || [];
        topCacheTime = now;
        renderTop(topCache);
    } catch (e) {
        console.error('loadTop error:', e);
        container.innerHTML = '<div class="top-error">❌ Не удалось загрузить топ</div>';
    }
}

function renderTop(players) {
    const container = document.getElementById('topContainer');
    if (!container) return;

    if (!players || players.length === 0) {
        container.innerHTML = `
            <div class="top-empty">
                <div style="font-size:56px;">🏆</div>
                <div>Пока никого нет.<br>Стань первым!</div>
            </div>`;
        return;
    }

    let html = '';

    if (players.length >= 1) {
        const medals = ['🥇', '🥈', '🥉'];
        const podium = [];
        if (players[1]) podium.push({ p: players[1], rank: 2 });
        if (players[0]) podium.push({ p: players[0], rank: 1 });
        if (players[2]) podium.push({ p: players[2], rank: 3 });

        html += '<div class="top-podium">';
        for (const { p, rank } of podium) {
            const isMe = p.player_id === state.playerId;
            const online = isOnline(p.last_seen);

            html += `
                <div class="podium-item podium-rank-${rank} ${isMe ? 'podium-me' : ''}">
                    <div class="podium-medal">${medals[rank - 1]}</div>
                    <div class="podium-avatar">
                        ${online ? '<span class="online-dot"></span>' : ''}
                        ${getAvatar(p.level)}
                    </div>
                    <div class="podium-name">${escapeHtml(p.name)}</div>
                    <div class="podium-level">⭐ ${p.level} ур.</div>
                    <div class="podium-stat">${formatNum(p.rating || 0)} RP</div>
                    <div class="podium-base">${rank}</div>
                </div>
            `;
        }
        html += '</div>';
    }

    const startIdx = players.length >= 3 ? 3 : 0;

    if (startIdx < players.length) {
        html += '<div class="top-list">';
        for (let i = startIdx; i < players.length; i++) {
            const p = players[i];
            const rank = i + 1;
            const isMe = p.player_id === state.playerId;
            const online = isOnline(p.last_seen);

            html += `
                <div class="top-row ${isMe ? 'top-row-me' : ''}">
                    <div class="top-rank">#${rank}</div>
                    <div class="top-avatar">
                        ${online ? '<span class="online-dot small"></span>' : ''}
                        ${getAvatar(p.level)}
                    </div>
                    <div class="top-info">
                        <div class="top-name">
                            ${escapeHtml(p.name)}
                            ${isMe ? '<span class="me-tag">ты</span>' : ''}
                        </div>
                        <div class="top-meta">
                            ⭐ ${p.level} ур. · 🎴 ${p.cards_count || 0}
                        </div>
                    </div>
                    <div class="top-value">${formatNum(p.rating || 0)} <small>RP</small></div>
                    <button class="top-copy-btn" onclick="copyId('${p.player_id}', event)" title="Скопировать ID">
                        📋
                    </button>
                </div>
            `;
        }
        html += '</div>';
    }

    container.innerHTML = html;
    updateMyRankBadge();
}

async function updateMyRankBadge() {
    if (!state.playerId) return;

    let badge = document.getElementById('myRankBadge');
    if (!badge) {
        badge = document.createElement('div');
        badge.id = 'myRankBadge';
        badge.className = 'my-rank-badge';
        const topSection = document.querySelector('[data-view="top"]');
        if (topSection) topSection.appendChild(badge);
    }

    try {
        const { data, error } = await sb.rpc('get_my_rank', {
            p_player_id: state.playerId
        });

        if (error || !data) {
            badge.style.display = 'none';
            return;
        }

        const myRating = state.data?.rating || 0;

        badge.style.display = 'flex';
        badge.innerHTML = `
            <div>
                <div class="my-rank-label">Твоя позиция</div>
                <div class="my-rank-value">#${data}</div>
            </div>
            <div style="text-align:right;">
                <div class="my-rank-label">Рейтинг</div>
                <div class="my-rank-value">${formatNum(myRating)} RP</div>
            </div>
        `;
    } catch (e) {
        badge.style.display = 'none';
    }
}

function getAvatar(level) {
    if (level >= 100) return '🏆';
    if (level >= 75) return '👑';
    if (level >= 50) return '🎩';
    if (level >= 25) return '💠';
    if (level >= 10) return '🔥';
    if (level >= 5) return '⛏️';
    return '🧙';
}

function isOnline(lastSeen) {
    if (!lastSeen) return false;
    return Date.now() - new Date(lastSeen).getTime() < 5 * 60 * 1000;
}

async function copyId(id, evt) {
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(id);
        } else {
            const inp = document.createElement('input');
            inp.value = id;
            inp.style.position = 'fixed';
            inp.style.opacity = '0';
            document.body.appendChild(inp);
            inp.select();
            document.execCommand('copy');
            inp.remove();
        }

        if (evt?.target) {
            const btn = evt.target.closest('.top-copy-btn');
            if (btn) {
                btn.classList.add('copied');
                btn.textContent = '✅';
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.textContent = '📋';
                }, 1200);
            }
        }

        if (typeof vibrate === 'function') vibrate(30);
        if (typeof spawnFloat === 'function') {
            spawnFloat('📋 ID скопирован', window.innerWidth / 2, 80, '#44ff44', 16);
        }
    } catch (e) { console.error(e); }
}

function escapeHtml(s) {
    if (!s) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

window.loadTop = loadTop;
window.copyId = copyId;