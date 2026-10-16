import { useEffect, useRef, useState } from 'react';
import { getRemaining, pad } from '../../utils/countdown';
import { KUMBALA_VOLUME, playKumbala, pauseKumbala, setKumbalaVolume } from '../../utils/kumbala';
import { momentUrl } from '../../editionSchedule';
import './cartel.css';
import './MonthCountdown.css';

const FINAL_MS = 10000;
const MUSIC_VOLUME = KUMBALA_VOLUME;

// A medianoche se pegan sobre el cartel, una por una, tiras con lo que pasó esa noche
const STRIPS = [
  { text: '15 de septiembre · La GAM · Maldita Vecindad', tone: 'yellow' },
  { text: 'Sonó Kumbala y te pregunté si querías ser mi novia', tone: 'pink' },
  { text: 'Ya era 16. Dijiste que sí.', tone: 'green' },
  { text: 'Un mes después…', tone: 'ink' },
];

// ms desde el cero
const STAMP_AT = 250;
const STRIP_TIMES = [1500, 3700, 6000, 8100];
const TEAR_AT = 10200;
const FINISH_AT = 12600;

// El mismo cartel se dibuja dos veces (una por cada mitad) para poder rasgarlo
function PosterFace({ units, phase, strip }) {
  return (
    <div className="mc-face cartel-paper">
      <div className="mc-band">
        <span>Esta noche</span>
        <span>00:00 hrs</span>
      </div>

      <p className="mc-pre">Desde aquella noche de Kumbala</p>

      <h1 className="mc-headline">
        <span className="mc-headline-num cartel-rainbow">1</span>
        <span className="mc-headline-word cartel-rainbow">mes</span>
      </h1>

      <p className="mc-names">Ratita &amp; Tibo</p>

      <div className="mc-countdown">
        <span className="mc-countdown-label">Faltan</span>
        <div className="mc-boxes" role="timer" aria-live="off">
          {units.map(([label, value]) => (
            <div key={label} className="mc-box">
              <strong>{pad(value)}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <dl className="mc-info">
        <div><dt>Lugar</dt><dd>Donde estés tú</dd></div>
        <div><dt>Música</dt><dd>Kumbala</dd></div>
        <div><dt>Entrada</dt><dd>Solo 2 personas</dd></div>
      </dl>

      <p className="mc-fine">Evento privado · Prohibido olvidar · Válido para toda la vida</p>

      <div className="mc-tabs" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => <span key={i}>16 · 10</span>)}
      </div>

      {phase !== 'count' && <div className="mc-stamp">¡Hoy!</div>}

      <div className="mc-strips">
        {STRIPS.map((s, i) => (
          <p key={s.text} className={`mc-strip mc-strip-${s.tone}${i <= strip ? ' is-pasted' : ''}`} style={{ '--n': i }}>
            {s.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function MonthCountdown({ target, onPrepare, onFinish }) {
  const [left, setLeft] = useState(() => getRemaining(target));
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const [phase, setPhase] = useState('count');
  const [strip, setStrip] = useState(-1);
  const prepared = useRef(false);
  const atZero = left.ms === 0;
  const final = left.ms > 0 && left.ms <= FINAL_MS;
  const finalSecond = Math.ceil(left.ms / 1000);

  useEffect(() => {
    const id = setInterval(() => setLeft(getRemaining(target)), 250);
    return () => clearInterval(id);
  }, [target]);

  // La página del mes se monta debajo del cartel antes del cero
  useEffect(() => {
    if ((final || atZero) && !prepared.current) {
      prepared.current = true;
      onPrepare?.();
    }
  }, [final, atZero, onPrepare]);

  useEffect(() => {
    if (!atZero) return;
    // La música baja para leer las tiras y vuelve a subir cuando se rasga el cartel
    if (!mutedRef.current) setKumbalaVolume(0.1, 1.2);
    const timers = [
      setTimeout(() => setPhase('stamp'), STAMP_AT),
      ...STRIP_TIMES.map((ms, i) => setTimeout(() => setStrip(i), ms)),
      setTimeout(() => {
        setPhase('tear');
        if (!mutedRef.current) setKumbalaVolume(MUSIC_VOLUME, 2.4);
      }, TEAR_AT),
      setTimeout(onFinish, FINISH_AT),
    ];
    return () => timers.forEach(clearTimeout);
  }, [atZero, onFinish]);

  // Si la cuenta se cierra sin llegar al cero, la música se detiene
  useEffect(() => () => {
    if (!prepared.current) pauseKumbala();
  }, []);

  const enter = () => {
    if (entered) return;
    playKumbala(MUSIC_VOLUME);
    setEntered(true);
  };

  const toggleMute = () => {
    setKumbalaVolume(muted ? MUSIC_VOLUME : 0, 0.6);
    mutedRef.current = !muted;
    setMuted(!muted);
  };

  const units = [
    ...(left.days > 0 ? [['Días', left.days]] : []),
    ['Hrs', left.hours],
    ['Min', left.minutes],
    ['Seg', left.seconds],
  ];

  return (
    <main className={`mc-root mc-phase-${phase}${final ? ' mc-final' : ''}${entered ? ' is-entered' : ''}`}>
      <div className="mc-wall" aria-hidden="true" />

      <div className="mc-poster">
        <span className="cartel-tape mc-tape-a" />
        <span className="cartel-tape mc-tape-b" />
        <div className="mc-burst cartel-burst" aria-hidden="true">
          <span>¡Dijo<br />que sí!</span>
        </div>
        <div className="mc-half mc-half-left"><PosterFace units={units} phase={phase} strip={strip} /></div>
        <div className="mc-half mc-half-right" aria-hidden="true"><PosterFace units={units} phase={phase} strip={strip} /></div>
      </div>

      {final && <div className="mc-final-count cartel-rainbow" key={finalSecond}>{finalSecond}</div>}

      {entered && phase === 'count' && !final && (
        <button type="button" className="mc-mute" onClick={toggleMute}>
          {muted ? 'Música: apagada' : 'Música: encendida'}
        </button>
      )}

      {!entered && phase === 'count' && !final && (
        <div className="mc-gate">
          <p className="mc-gate-note">Ratita, alguien pegó un cartel para ti.</p>
          <button type="button" className="mc-gate-btn" onClick={enter}>Ver el cartel</button>
          <p className="mc-gate-hint">Sube el volumen: va a sonar nuestra canción.</p>
          <a className="mc-gate-skip" href={momentUrl('principal')}>o entra a nuestra página mientras tanto</a>
        </div>
      )}
    </main>
  );
}
