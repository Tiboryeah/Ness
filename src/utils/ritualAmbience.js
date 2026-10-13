// Ambiente sonoro del contador: dron grave + caja musical desafinada en re menor.
// Todo se sintetiza en el navegador; necesita un gesto del usuario para empezar.

const MASTER_VOLUME = 0.3;

// Nana inquietante: [nota MIDI | null = silencio, duración en tiempos]
const LULLABY = [
  [69, 1], [74, 1], [77, 1], [76, 2], [null, 1],
  [74, 1], [69, 1], [70, 1], [69, 2], [null, 1],
  [67, 1], [70, 1], [74, 1], [73, 3], [null, 2],
  [74, 1], [77, 1], [81, 1], [80, 2], [null, 1],
  [77, 1], [76, 1], [74, 3], [null, 4],
];
const BEAT = 0.82;

const midiToHz = (m) => 440 * 2 ** ((m - 69) / 12);

function makeImpulse(ctx, seconds, decay) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** decay;
  }
  return buf;
}

export function startRitualAmbience() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();
  // iOS/Safari arrancan el contexto suspendido aunque se cree dentro del toque
  ctx.resume?.();
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(MASTER_VOLUME, now + 6);
  master.connect(ctx.destination);

  const reverb = ctx.createConvolver();
  reverb.buffer = makeImpulse(ctx, 5, 2.6);
  const wet = ctx.createGain();
  wet.gain.value = 0.75;
  reverb.connect(wet).connect(master);

  const sources = [];

  // Dron: re grave con un mi bemol rozándolo (segunda menor), filtrado y respirando lento
  const droneFilter = ctx.createBiquadFilter();
  droneFilter.type = 'lowpass';
  droneFilter.frequency.value = 520;
  droneFilter.Q.value = 3;
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.32;
  droneFilter.connect(droneGain);
  droneGain.connect(master);
  droneGain.connect(reverb);

  [[73.42, 'sawtooth', 0.45], [73.9, 'sawtooth', 0.35], [146.83, 'triangle', 0.3], [155.56, 'sine', 0.12], [36.71, 'sine', 0.7]].forEach(([f, type, g]) => {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = f;
    const gain = ctx.createGain();
    gain.gain.value = g;
    osc.connect(gain).connect(droneFilter);
    osc.start();
    sources.push(osc);
  });

  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 220;
  lfo.connect(lfoDepth).connect(droneFilter.frequency);
  lfo.start();
  sources.push(lfo);

  // Viento: ruido filtrado que sube y baja
  const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const nd = noiseBuf.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuf;
  noise.loop = true;
  const wind = ctx.createBiquadFilter();
  wind.type = 'bandpass';
  wind.frequency.value = 500;
  wind.Q.value = 6;
  const windGain = ctx.createGain();
  windGain.gain.value = 0.05;
  noise.connect(wind).connect(windGain).connect(reverb);
  const windLfo = ctx.createOscillator();
  windLfo.frequency.value = 0.045;
  const windDepth = ctx.createGain();
  windDepth.gain.value = 320;
  windLfo.connect(windDepth).connect(wind.frequency);
  noise.start();
  windLfo.start();
  sources.push(noise, windLfo);

  // Caja musical: notas agudas, cada una un poco desafinada
  function pluck(midi, when) {
    const f = midiToHz(midi) * 2 * 2 ** (((Math.random() - 0.5) * 22) / 1200);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0, when);
    env.gain.linearRampToValueAtTime(0.16, when + 0.006);
    env.gain.exponentialRampToValueAtTime(0.0008, when + 3.2);
    env.connect(master);
    env.connect(reverb);
    [[1, 1], [2.01, 0.25], [4.2, 0.06]].forEach(([mult, amp]) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f * mult;
      const g = ctx.createGain();
      g.gain.value = amp;
      osc.connect(g).connect(env);
      osc.start(when);
      osc.stop(when + 3.3);
    });
  }

  let step = 0;
  let nextTime = now + 1.5;
  const scheduler = setInterval(() => {
    while (nextTime < ctx.currentTime + 0.6) {
      const [note, beats] = LULLABY[step % LULLABY.length];
      // Como una caja a la que se le acaba la cuerda: el tempo se arrastra un poco
      const drag = 1 + 0.06 * Math.sin(step / 7);
      if (note !== null) pluck(note, nextTime);
      nextTime += beats * BEAT * drag;
      step++;
    }
  }, 150);

  // Bus aparte para latidos y campana: siguen sonando aunque la música se corte
  let isMuted = false;
  const fx = ctx.createGain();
  fx.gain.value = 1;
  fx.connect(ctx.destination);
  const fxReverb = ctx.createConvolver();
  fxReverb.buffer = makeImpulse(ctx, 6, 2.2);
  const fxWet = ctx.createGain();
  fxWet.gain.value = 0.55;
  fxReverb.connect(fxWet).connect(fx);

  function thump(when, peak) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(95, when);
    osc.frequency.exponentialRampToValueAtTime(42, when + 0.16);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(peak, when + 0.012);
    g.gain.exponentialRampToValueAtTime(0.001, when + 0.32);
    osc.connect(g).connect(fx);
    osc.start(when);
    osc.stop(when + 0.35);
  }

  let stopped = false;
  const stop = (fade = 0.4) => {
    if (stopped) return;
    stopped = true;
    clearInterval(scheduler);
    const t = ctx.currentTime;
    [master, fx].forEach((g) => {
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + fade);
    });
    setTimeout(() => {
      sources.forEach((s) => { try { s.stop(); } catch { /* ya detenido */ } });
      ctx.close();
    }, fade * 1000 + 100);
  };

  return {
    setMuted(muted) {
      isMuted = muted;
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(muted ? 0 : MASTER_VOLUME, t + 0.6);
    },
    // Latido "lub-dub"; intensity de 0 a 1 para que crezca en los últimos segundos
    heartbeat(intensity = 0.5) {
      if (isMuted || stopped) return;
      const t = ctx.currentTime + 0.02;
      const peak = 0.35 + intensity * 0.5;
      thump(t, peak);
      thump(t + 0.24, peak * 0.7);
    },
    // Corte en seco de la música (el silencio repentino asusta más que un fade)
    silence(fade = 0.12) {
      clearInterval(scheduler);
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + fade);
    },
    // Campanada de medianoche: parciales de campana de iglesia con caída larga
    bell() {
      if (isMuted || stopped) return;
      const t = ctx.currentTime + 0.02;
      const f = 98;
      [[0.5, 0.5, 7], [1, 0.45, 5.5], [1.19, 0.25, 4], [1.5, 0.18, 3.5], [2, 0.3, 3.2], [2.52, 0.12, 2.4], [3.01, 0.1, 2], [4.07, 0.06, 1.4]].forEach(([mult, amp, decay]) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f * mult;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(amp * 0.6, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0005, t + decay);
        osc.connect(g);
        g.connect(fx);
        g.connect(fxReverb);
        osc.start(t);
        osc.stop(t + decay + 0.1);
      });
    },
    stop,
  };
}
