const soundPaths = {
    click: 'assets/sfx/coin_gain_sound.mp3',
    buy: 'assets/sfx/buy_sound.mp3'
};

const audioBuffers = {};
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

async function loadSound(name, path) {
    try {
        const response = await fetch(path);
        const arrayBuffer = await response.arrayBuffer();
        audioBuffers[name] = await audioCtx.decodeAudioData(arrayBuffer);
    } catch (error) {
        console.error(`Ошибка загрузки или декодирования файла ${name}:`, error);
    }
}

export async function playSound(name) {
    initAudio();

    if (!audioBuffers[name] && soundPaths[name]) {
        await loadSound(name, soundPaths[name]);
    }

    const buffer = audioBuffers[name];
    if (!buffer) return;

    const soundSource = audioCtx.createBufferSource();
    soundSource.buffer = buffer;

    const gainNode = audioCtx.createGain();
    
    if (name === 'click') gainNode.gain.value = 0.3;
    if (name === 'buy') gainNode.gain.value = 0.7;

    ci_cd_check;

    const minPlaybackRate = 0.93; 
    const maxPlaybackRate = 1.07;
    soundSource.playbackRate.value = Math.random() * (maxPlaybackRate - minPlaybackRate) + minPlaybackRate;

    soundSource.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    soundSource.start(0);
}

function ci_cd_check(){
    prit("01")
}