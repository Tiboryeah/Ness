// Reproductor único de "Kumbala" compartido entre la cuenta regresiva del mes y su página,
// así la canción sigue sonando sin cortes cuando se abre el telón.
// El volumen pasa por Web Audio porque iOS ignora audio.volume.

const SRC = '/music/maldita_vecindad_kumbala.mp3';

// 25 % del volumen del teléfono
export const KUMBALA_VOLUME = 0.25;

let audio = null;
let ctx = null;
let gain = null;
const listeners = new Set();

function ensureAudio() {
  if (!audio) {
    audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = 'auto';
    ['play', 'pause'].forEach((e) => audio.addEventListener(e, () => listeners.forEach((fn) => fn(!audio.paused))));
  }
  return audio;
}

function ensureGraph() {
  if (ctx) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  ctx = new Ctx();
  gain = ctx.createGain();
  ctx.createMediaElementSource(audio).connect(gain).connect(ctx.destination);
}

// Idealmente dentro de un toque o clic: fuera de uno el navegador puede bloquearlo
export function playKumbala(volume = KUMBALA_VOLUME) {
  ensureAudio();
  ensureGraph();
  ctx?.resume?.();
  setKumbalaVolume(volume, 0);
  return audio.play().then(() => true, () => false);
}

// Intenta sonar en cuanto se abre la página; si el navegador lo bloquea
// (o deja el audio en silencio hasta un gesto), arranca con el primer toque.
export function autoplayKumbala(volume = KUMBALA_VOLUME) {
  playKumbala(volume);
  const events = ['pointerdown', 'touchend', 'keydown'];
  const onGesture = (e) => {
    // El botón de música maneja su propio toque; si no, este lo encendería y el botón lo apagaría
    if (e.target.closest?.('[data-music-toggle]')) return;
    events.forEach((e) => window.removeEventListener(e, onGesture, true));
    playKumbala(volume);
  };
  events.forEach((e) => window.addEventListener(e, onGesture, { capture: true, passive: true }));
  return () => events.forEach((e) => window.removeEventListener(e, onGesture, true));
}

export function pauseKumbala() {
  audio?.pause();
}

export function setKumbalaVolume(volume, seconds = 1) {
  if (gain) {
    const t = ctx.currentTime;
    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(gain.gain.value, t);
    gain.gain.linearRampToValueAtTime(volume, t + seconds);
  } else if (audio) {
    audio.volume = volume;
  }
}

export const isKumbalaPlaying = () => !!audio && !audio.paused;

export function onKumbalaChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
