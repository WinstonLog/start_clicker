// ============================================================
// ЗВУКИ
// ============================================================
let _audioCtx = null;
let _soundEnabled = true;
let _vibrationEnabled = true;

function initAudio() {
    if (_audioCtx) return _audioCtx;
    try {
        _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        return _audioCtx;
    } catch (e) { return null; }
}

function playTone(freq, duration = 0.08, type = 'sine', volume = 0.1) {
    if (!_soundEnabled) return;
    try {
        const ctx = initAudio();
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    } catch (e) {}
}

function playClick() {
    playTone(800 + Math.random() * 200, 0.06, 'sine', 0.06);
}

function playCrit() {
    playTone(1200, 0.08, 'square', 0.08);
    setTimeout(() => playTone(1600, 0.1, 'sine', 0.08), 40);
}

function playUpgrade() {
    playTone(500, 0.1, 'sine', 0.1);
    setTimeout(() => playTone(700, 0.1, 'sine', 0.1), 60);
    setTimeout(() => playTone(900, 0.15, 'sine', 0.1), 120);
}

function playPack() {
    playTone(300, 0.15, 'sawtooth', 0.08);
    setTimeout(() => playTone(500, 0.15, 'sawtooth', 0.08), 100);
}

function playLevelUp() {
    playTone(600, 0.12, 'sine', 0.12);
    setTimeout(() => playTone(800, 0.12, 'sine', 0.12), 100);
    setTimeout(() => playTone(1000, 0.12, 'sine', 0.12), 200);
    setTimeout(() => playTone(1300, 0.25, 'sine', 0.12), 300);
}

function playBonus() {
    playTone(700, 0.15, 'triangle', 0.12);
    setTimeout(() => playTone(1000, 0.15, 'triangle', 0.12), 120);
    setTimeout(() => playTone(1400, 0.3, 'sine', 0.12), 240);
}

function playMergeSuccess() {
    playTone(700, 0.1, 'sine', 0.12);
    setTimeout(() => playTone(900, 0.1, 'sine', 0.12), 80);
    setTimeout(() => playTone(1200, 0.2, 'sine', 0.12), 160);
}

function playMergeFail() {
    playTone(200, 0.15, 'sawtooth', 0.1);
    setTimeout(() => playTone(150, 0.2, 'sawtooth', 0.1), 80);
}

function vibrate(pattern) {
    if (!_vibrationEnabled) return;
    if (navigator.vibrate) navigator.vibrate(pattern);
}

window.playClick = playClick;
window.playCrit = playCrit;
window.playUpgrade = playUpgrade;
window.playPack = playPack;
window.playLevelUp = playLevelUp;
window.playBonus = playBonus;
window.playMergeSuccess = playMergeSuccess;
window.playMergeFail = playMergeFail;
window.vibrate = vibrate;