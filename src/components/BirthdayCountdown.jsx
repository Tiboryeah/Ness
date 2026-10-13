import { useEffect, useRef, useState } from 'react';
import { startRitualAmbience } from '../utils/ritualAmbience';
import './BirthdayCountdown.css';

const pad = (n) => String(n).padStart(2, '0');

function getRemaining(target) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    ms,
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

// Aleatorio con semilla: las formas orgánicas salen iguales en cada render
function seeded(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Contorno suave que pasa por puntos irregulares alrededor de un centro
function blobPath(cx, cy, r, rnd, points = 11, wobble = 0.38) {
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2;
    const rr = r * (1 - wobble / 2 + rnd() * wobble);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  let d = `M${mid(pts[points - 1], pts[0]).join(' ')}`;
  pts.forEach((p, i) => {
    const m = mid(p, pts[(i + 1) % points]);
    d += ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  });
  return `${d} Z`;
}

// ---------- Sangre ----------

// Escurrimientos: [x %, grosor px, largo px, retraso s, duración s]
const DRIPS = [
  [2.5, 14, 80, 0.4, 9], [8, 8, 29, 2.2, 7], [14.5, 19, 172, 0.1, 14], [21, 10, 50, 1.6, 8],
  [29, 13, 110, 0.8, 11], [35, 6, 23, 3, 6], [43.5, 21, 218, 0.3, 16], [52, 10, 69, 1.9, 9],
  [60, 14, 135, 1.1, 12], [67, 8, 36, 2.6, 7], [75, 18, 184, 0.6, 15], [83, 10, 62, 1.4, 8],
  [90, 13, 105, 2, 10], [96.5, 8, 43, 2.9, 7],
];
const FALLING = DRIPS.filter(([, , h]) => h > 85);

// Chorro que se adelgaza y termina en una gota gorda
function dripPath(w, len) {
  const c = w * 1.5;
  const tip = len + w * 1.5;
  return [
    `M${c - w / 2} 0`,
    `C${c - w / 2} ${len * 0.35} ${c - w * 0.26} ${len * 0.62} ${c - w * 0.3} ${len - w * 0.6}`,
    `C${c - w * 1.02} ${len + w * 0.15} ${c - w * 0.62} ${tip} ${c} ${tip}`,
    `C${c + w * 0.62} ${tip} ${c + w * 1.02} ${len + w * 0.15} ${c + w * 0.3} ${len - w * 0.6}`,
    `C${c + w * 0.24} ${len * 0.6} ${c + w * 0.5} ${len * 0.3} ${c + w / 2} 0 Z`,
  ].join(' ');
}

function Drip({ x, w, h, delay, dur }) {
  const vw = w * 3;
  const vh = h + w * 2;
  return (
    <svg
      className="bc-drip"
      viewBox={`0 0 ${vw} ${vh}`}
      width={vw}
      height={vh}
      style={{ left: `${x}%`, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
    >
      <path d={dripPath(w, h)} fill="url(#bc-blood-body)" filter="url(#bc-wet)" />
      {/* Reflejo de luz sobre el líquido */}
      <path
        d={`M${w * 1.5 - w * 0.22} ${h * 0.08} C${w * 1.5 - w * 0.16} ${h * 0.45} ${w * 1.5 - w * 0.1} ${h * 0.75} ${w * 1.5 - w * 0.2} ${h}`}
        stroke="#ffd0c8"
        strokeOpacity="0.22"
        strokeWidth={Math.max(0.6, w * 0.12)}
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx={w * 1.5 - w * 0.32} cy={h + w * 0.55} rx={w * 0.18} ry={w * 0.26} fill="#ffe0da" opacity="0.35" />
    </svg>
  );
}

// Salpicadura seca: mancha central, gotitas alrededor y estelas alargadas
function Splatter({ seed, className }) {
  const rnd = seeded(seed);
  const satellites = Array.from({ length: 34 }, () => {
    const a = rnd() * Math.PI * 2;
    const dist = 34 + rnd() ** 1.6 * 64;
    const r = Math.max(0.6, 5.2 - dist / 18 + rnd() * 1.6);
    const stretch = rnd() > 0.7 ? 1.8 + rnd() * 2.2 : 1;
    return { x: 100 + Math.cos(a) * dist, y: 100 + Math.sin(a) * dist, r, stretch, deg: (a * 180) / Math.PI };
  });
  return (
    <svg className={`bc-splatter ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <path d={blobPath(100, 100, 26, rnd, 13, 0.55)} fill="url(#bc-dried)" />
      <path d={blobPath(112, 92, 13, rnd, 9, 0.5)} fill="url(#bc-dried)" />
      {satellites.map((s, i) => (
        <ellipse
          key={i}
          cx={s.x}
          cy={s.y}
          rx={s.r * s.stretch}
          ry={s.r}
          transform={`rotate(${s.deg.toFixed(1)} ${s.x.toFixed(1)} ${s.y.toFixed(1)})`}
          fill="#3b0306"
        />
      ))}
    </svg>
  );
}

function BloodCeiling() {
  const rnd = seeded(13);
  // Borde inferior irregular de la mancha superior
  let edge = 'M0 0 H1000 V30';
  for (let x = 1000; x > 0; x -= 25) {
    const y = 24 + rnd() * 14;
    edge += ` Q${x - 12} ${y + 4} ${x - 25} ${22 + rnd() * 10}`;
  }
  edge += ' Z';

  return (
    <div className="bc-blood" aria-hidden="true">
      {DRIPS.map(([x, w, h, delay, dur]) => (
        <Drip key={x} x={x} w={w} h={h} delay={delay} dur={dur} />
      ))}
      <svg className="bc-blood-band" viewBox="0 0 1000 40" preserveAspectRatio="none">
        <path d={edge} fill="url(#bc-blood-band)" />
      </svg>
      {FALLING.map(([x, w, h, delay, dur], i) => (
        <span
          key={x}
          className="bc-drop"
          style={{
            left: `calc(${x}% + ${w * 1.5}px)`,
            top: h + w * 1.2,
            '--s': w / 8,
            animationDelay: `${delay + dur + i * 1.3}s`,
            animationDuration: `${5 + (i % 3) * 2.1}s`,
          }}
        />
      ))}
    </div>
  );
}

// ---------- Defs compartidas ----------

function SceneDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="bc-blood-body" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1c0002" />
          <stop offset="0.3" stopColor="#4f0006" />
          <stop offset="0.45" stopColor="#7c0a13" />
          <stop offset="0.7" stopColor="#3e0004" />
          <stop offset="1" stopColor="#140001" />
        </linearGradient>
        <linearGradient id="bc-blood-band" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0e0001" />
          <stop offset="0.6" stopColor="#3a0004" />
          <stop offset="0.9" stopColor="#5a050c" />
          <stop offset="1" stopColor="#2a0003" />
        </linearGradient>
        <radialGradient id="bc-dried" cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#560509" />
          <stop offset="0.7" stopColor="#3a0306" />
          <stop offset="1" stopColor="#1e0103" />
        </radialGradient>
        {/* Textura húmeda e irregular dentro del mismo SVG (funciona en todos los navegadores) */}
        <filter id="bc-wet" x="-30%" y="-5%" width="160%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" result="grainA" />
          <feComposite in="grainA" in2="SourceGraphic" operator="in" result="grainIn" />
          <feBlend in="SourceGraphic" in2="grainIn" mode="multiply" />
        </filter>

        {/* Pentagrama rayado, como tallado en la pared */}
        <filter id="bc-scratched" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="2" result="holes" />
          <feColorMatrix in="holes" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.7" result="mask" />
          <feComposite in="rough" in2="mask" operator="in" />
        </filter>

        {/* Velas */}
        <filter id="bc-flame-filter" x="-80%" y="-30%" width="260%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.13" numOctaves="2" seed="3" result="noise">
            <animate attributeName="baseFrequency" dur="2.9s" values="0.05 0.13;0.06 0.17;0.045 0.11;0.05 0.13" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="warped" />
          <feGaussianBlur in="warped" stdDeviation="0.35" />
        </filter>
        <filter id="bc-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <filter id="bc-smoke-filter" x="-100%" y="-20%" width="300%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="2" seed="8" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <linearGradient id="bc-wax" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#0b0102" />
          <stop offset="0.2" stopColor="#2c0408" />
          <stop offset="0.38" stopColor="#4d0c12" />
          <stop offset="0.5" stopColor="#3d080d" />
          <stop offset="0.8" stopColor="#1c0204" />
          <stop offset="1" stopColor="#070001" />
        </linearGradient>
        <linearGradient id="bc-wax-drip" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1e0204" />
          <stop offset="0.45" stopColor="#57111a" />
          <stop offset="1" stopColor="#160103" />
        </linearGradient>
        <linearGradient id="bc-wax-glow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ff7a3a" stopOpacity="0.32" />
          <stop offset="0.3" stopColor="#ff4a2a" stopOpacity="0.08" />
          <stop offset="1" stopColor="#ff4a2a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="bc-pool" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#d9743f" />
          <stop offset="0.4" stopColor="#7a1a14" />
          <stop offset="1" stopColor="#2c0408" />
        </radialGradient>
        <radialGradient id="bc-halo">
          <stop offset="0" stopColor="#ffb055" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#ff7a1f" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
        </radialGradient>
        {/* Flama real: base azul, zona oscura, cuerpo amarillo-blanco, punta naranja que se pierde */}
        <linearGradient id="bc-flame-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ff4a10" stopOpacity="0" />
          <stop offset="0.14" stopColor="#ff6a1a" stopOpacity="0.7" />
          <stop offset="0.38" stopColor="#ffc35a" />
          <stop offset="0.66" stopColor="#fff2cc" />
          <stop offset="0.8" stopColor="#ffd98a" />
          <stop offset="0.9" stopColor="#5d6dff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2a3cff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ---------- Velas ----------

function Candle({ side, top: t }) {
  return (
    <div className={`bc-candle bc-candle-${side}`} aria-hidden="true">
      <span className="bc-candle-light" style={{ top: `${((t - 22) / 250) * 100}%` }} />
      <svg viewBox="0 0 80 250" className="bc-candle-svg">
        {/* Charco de cera en la base */}
        <path d="M6 246 Q8 238 22 238 Q30 234 40 236 Q52 233 60 238 Q74 239 74 246 Q60 250 40 249 Q18 250 6 246 Z" fill="url(#bc-wax-drip)" />

        <path
          d={`M26 ${t + 5} Q26 ${t} 30 ${t + 1} Q35 ${t + 3.5} 39 ${t + 1.5} Q45 ${t - 0.5} 50 ${t + 1} Q54 ${t + 1.5} 54 ${t + 6} V242 H26 Z`}
          fill="url(#bc-wax)"
        />
        <path d={`M26 ${t + 5} Q26 ${t} 30 ${t + 1} Q35 ${t + 3.5} 39 ${t + 1.5} Q45 ${t - 0.5} 50 ${t + 1} Q54 ${t + 1.5} 54 ${t + 6} V${t + 40} H26 Z`} fill="url(#bc-wax-glow)" />

        {/* Escurrimientos de cera, con grumos */}
        <path d={`M27 ${t + 3} C26.2 ${t + 22} 26 ${t + 40} 26.8 ${t + 58} C27 ${t + 64} 26.4 ${t + 70} 27.4 ${t + 76} C28 ${t + 81} 31.2 ${t + 80} 31.2 ${t + 74} C31 ${t + 62} 31.6 ${t + 44} 31 ${t + 26} C30.8 ${t + 16} 31.6 ${t + 8} 31.8 ${t + 3} Z`} fill="url(#bc-wax-drip)" />
        <path d={`M47 ${t + 1.5} C47.4 ${t + 30} 46.6 ${t + 70} 47.4 ${t + 104} C47.6 ${t + 112} 51.8 ${t + 112} 52 ${t + 104} C52.4 ${t + 80} 51.6 ${t + 40} 52.6 ${t + 2.5} Z`} fill="url(#bc-wax-drip)" />
        <path d={`M37 ${t + 2.5} C37 ${t + 9} 36.6 ${t + 14} 37.2 ${t + 18} C37.6 ${t + 22} 40 ${t + 21} 40.2 ${t + 17} C40.4 ${t + 12} 40 ${t + 7} 40.4 ${t + 2.5} Z`} fill="url(#bc-wax-drip)" />
        <path d="M24 242 C24 236 27 233 28 228 C29 233 31 238 31 242 Z" fill="url(#bc-wax-drip)" />
        <path d="M49 242 C49 238 50 236 50.5 231 C51.5 236 54 238 55 242 Z" fill="url(#bc-wax-drip)" />

        <ellipse cx="40" cy={t + 3} rx="10" ry="2.2" fill="url(#bc-pool)" />

        {/* Pabilo doblado y carbonizado */}
        <path d={`M40 ${t + 2.5} Q39.4 ${t - 3} 40.8 ${t - 8} Q41.4 ${t - 10} 42.2 ${t - 10.5}`} stroke="#0d0806" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="42.2" cy={t - 10.5} r="0.9" fill="#ff5a00" filter="url(#bc-soft)" />

        <path
          className="bc-smoke"
          d={`M42 ${t - 12} C37 ${t - 40} 48 ${t - 60} 41 ${t - 88} C36 ${t - 106} 45 ${t - 120} 42 ${t - 140}`}
          stroke="#9a938e"
          strokeWidth="2.4"
          fill="none"
          filter="url(#bc-smoke-filter)"
        />

        <g className="bc-flame" style={{ transformOrigin: `41px ${t - 6}px` }}>
          <circle cx="41" cy={t - 22} r="24" fill="url(#bc-halo)" className="bc-halo" />
          <path
            filter="url(#bc-flame-filter)"
            d={`M41.5 ${t - 46} C43 ${t - 37} 46.4 ${t - 26} 45.8 ${t - 16} C45.3 ${t - 8} 43.4 ${t - 4} 41 ${t - 4} C38.6 ${t - 4} 36.7 ${t - 8} 36.3 ${t - 16} C35.9 ${t - 25} 39.6 ${t - 35} 41.5 ${t - 46} Z`}
            fill="url(#bc-flame-body)"
          />
          <ellipse cx="41.6" cy={t - 9.5} rx="1.4" ry="3.2" fill="#3b1606" opacity="0.55" filter="url(#bc-soft)" />
        </g>
      </svg>
    </div>
  );
}

// ---------- Pantalla ----------

const PENTAGRAM = '100,180 53,35.3 176.1,124.7 23.9,124.7 147,35.3';

const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 0.97) % 11,
  duration: 9 + ((i * 1.9) % 7),
  size: 1 + (i % 2),
}));

// Últimos segundos: todo desaparece y queda un número gigante que late
const FINAL_MS = 10000;

// Escena de medianoche (ms desde el cero)
const MIDNIGHT_TIMELINE = [
  [500, 'bell'],
  [2000, 'greeting'],
  [5400, 'seam'],
  [6300, 'reveal'],
  [8000, 'finish'],
];

export default function BirthdayCountdown({ target, onPrepare, onFinish }) {
  const [left, setLeft] = useState(() => getRemaining(target));
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const [phase, setPhase] = useState('count');
  const ambience = useRef(null);
  const prepared = useRef(false);
  const awakening = left.ms === 0;
  const final = left.ms > 0 && left.ms <= FINAL_MS;
  const finalSecond = Math.ceil(left.ms / 1000);

  // Tic cada 250 ms para que el cambio de segundo caiga justo en su momento
  useEffect(() => {
    const id = setInterval(() => setLeft(getRemaining(target)), 250);
    return () => clearInterval(id);
  }, [target]);

  useEffect(() => () => ambience.current?.stop(), []);

  // Monta la edición del cumpleaños debajo del telón antes del cero, para revelarla sin cortes
  useEffect(() => {
    if ((final || awakening) && !prepared.current) {
      prepared.current = true;
      onPrepare?.();
    }
  }, [final, awakening, onPrepare]);

  // Un latido por segundo en la cuenta final, cada vez más fuerte
  useEffect(() => {
    if (!final) return;
    ambience.current?.heartbeat(1 - (finalSecond - 1) / 9);
  }, [final, finalSecond]);

  useEffect(() => {
    if (!awakening) return;
    setPhase('midnight');
    ambience.current?.silence();
    const timers = MIDNIGHT_TIMELINE.map(([ms, step]) => setTimeout(() => {
      if (step === 'bell') ambience.current?.bell();
      else if (step === 'finish') onFinish();
      else setPhase(step);
    }, ms));
    return () => timers.forEach(clearTimeout);
  }, [awakening, onFinish]);

  const enter = () => {
    if (ambience.current) return;
    ambience.current = startRitualAmbience();
    setEntered(true);
  };

  const toggleMute = () => {
    ambience.current?.setMuted(!muted);
    setMuted(!muted);
  };

  const units = [
    ...(left.days > 0 ? [['Días', left.days]] : []),
    ['Horas', left.hours],
    ['Minutos', left.minutes],
    ['Segundos', left.seconds],
  ];

  const sceneHidden = ['greeting', 'seam', 'reveal'].includes(phase);

  return (
    <main className={`bc-root bc-phase-${phase}${final ? ' bc-final' : ''}${sceneHidden ? ' bc-scene-hidden' : ''}`}>
      <SceneDefs />

      <Splatter seed={7} className="bc-splatter-a" />
      <Splatter seed={21} className="bc-splatter-b" />
      <Splatter seed={42} className="bc-splatter-c" />

      <BloodCeiling />

      <div className="bc-embers" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            style={{ left: `${e.left}%`, width: e.size, height: e.size, animationDelay: `${e.delay}s`, animationDuration: `${e.duration}s` }}
          />
        ))}
      </div>

      <svg className="bc-sigil" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="bc-ring" d="M100 13 a87 87 0 1 1 -0.01 0" />
        </defs>
        <g filter="url(#bc-scratched)">
          <circle cx="100" cy="100" r="95" />
          <circle cx="100" cy="100" r="80" />
          <polygon points={PENTAGRAM} />
          <text className="bc-sigil-text">
            <textPath href="#bc-ring">AVE · REGINA · TENEBRARVM · NATA · EST · IN · NOCTE · XIII · OCTOBRIS ·</textPath>
          </text>
        </g>
      </svg>

      <section className="bc-content">
        <span className="bc-kicker">XIII · X · MMXXVI</span>
        <h1 className="bc-title">El ritual comienza a medianoche</h1>

        {!awakening && (
          <>
            <p className="bc-sub">Falta muy poco para que nazca la reina de las tinieblas</p>
            <div className="bc-clock" role="timer" aria-live="off">
              {units.map(([label, value], i) => (
                <div key={label} className="bc-unit-wrap">
                  {i > 0 && <span className="bc-sep" aria-hidden="true">†</span>}
                  <div className="bc-unit">
                    <span className="bc-digits">{pad(value)}</span>
                    <span className="bc-label">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="bc-altar">
          <Candle side="left" top={92} />
          <p className="bc-oath">Enciende las velas, Ratita. A las doce la oscuridad será toda tuya.</p>
          <Candle side="right" top={132} />
        </div>
      </section>

      {final && (
        <div className="bc-final-count" key={finalSecond} aria-live="assertive">{finalSecond}</div>
      )}

      <span className="bc-subliminal" aria-hidden="true">no mires atrás</span>
      <div className="bc-grain" aria-hidden="true" />
      <div className="bc-flicker" aria-hidden="true" />

      {/* Escena de medianoche: destello, telón negro, saludo y apertura */}
      <div className="bc-flash" aria-hidden="true" />
      <div className="bc-curtain bc-curtain-top" aria-hidden="true" />
      <div className="bc-curtain bc-curtain-bottom" aria-hidden="true" />
      <div className="bc-seam" aria-hidden="true" />
      <div className="bc-greeting" aria-live="polite">
        <span className="bc-greeting-kicker">Medianoche · XIII · X</span>
        <p className="bc-greeting-title">Feliz cumpleaños, Ratita</p>
        <span className="bc-greeting-sub">La oscuridad entera se inclina ante ti</span>
      </div>

      {entered && !awakening && (
        <button type="button" className="bc-mute" onClick={toggleMute}>
          {muted ? 'Sonido: apagado' : 'Sonido: encendido'}
        </button>
      )}

      {!entered && !awakening && !final && (
        <div className="bc-gate" onClick={enter}>
          <span className="bc-gate-warning">Advertencia</span>
          <p className="bc-gate-title">Entra, si te atreves</p>
          <p className="bc-gate-sub">Sube un poco el volumen. Apaga la luz.</p>
          <button type="button" className="bc-gate-btn">Entrar al ritual</button>
        </div>
      )}
    </main>
  );
}
