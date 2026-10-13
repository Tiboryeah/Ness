// Web Audio API Synthesizers for local interactive sounds without external assets
let audioCtx;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

export function playClickSynth() {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
  
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + 0.1);
}

export function playPopSynth() {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
  
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + 0.08);
}

export function playMeowSynth() {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  
  osc.type = 'triangle';
  
  // A cat's "meow" starts around 320Hz, sweeps up to 780Hz, then down to 520Hz
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(780, now + 0.14);
  osc.frequency.exponentialRampToValueAtTime(520, now + 0.4);
  
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + 0.45);
}

// A layered, low-frequency purr: filtered noise + a softly modulated fundamental.
// Returns a stop function so the sound follows the petting gesture.
export function startPurrSynth() {
  initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const now = audioCtx.currentTime;
  const output = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  const body = audioCtx.createOscillator();
  const breath = audioCtx.createOscillator();
  const breathDepth = audioCtx.createGain();
  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
  const noise = buffer.getChannelData(0);
  for (let i = 0; i < noise.length; i += 1) noise[i] = Math.random() * 2 - 1;
  const texture = audioCtx.createBufferSource();

  body.type = 'sawtooth';
  body.frequency.value = 27;
  breath.type = 'sine';
  breath.frequency.value = 4.2;
  breathDepth.gain.value = 0.045;
  filter.type = 'lowpass';
  filter.frequency.value = 150;
  filter.Q.value = 2.2;
  texture.buffer = buffer;
  texture.loop = true;
  output.gain.setValueAtTime(0.001, now);
  output.gain.exponentialRampToValueAtTime(0.11, now + 0.18);

  breath.connect(breathDepth).connect(output.gain);
  body.connect(filter);
  texture.connect(filter);
  filter.connect(output).connect(audioCtx.destination);
  body.start();
  breath.start();
  texture.start();

  let stopped = false;
  return () => {
    if (stopped) return;
    stopped = true;
    const stopAt = audioCtx.currentTime + 0.22;
    output.gain.cancelScheduledValues(audioCtx.currentTime);
    output.gain.setValueAtTime(Math.max(output.gain.value, 0.001), audioCtx.currentTime);
    output.gain.exponentialRampToValueAtTime(0.001, stopAt);
    [body, breath, texture].forEach((node) => node.stop(stopAt + 0.02));
  };
}

export function playChimeSynth() {
  initAudio();
  const now = audioCtx.currentTime;
  const scale = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
  
  scale.forEach((freq, index) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const noteTime = now + index * 0.07;
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, noteTime);
    
    gain.gain.setValueAtTime(0.001, noteTime);
    gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(noteTime);
    osc.stop(noteTime + 0.25);
  });
}
