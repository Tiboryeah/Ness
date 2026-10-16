import { useEffect, useRef, useState } from 'react';
import { TOGETHER_SINCE, momentUrl } from '../../editionSchedule';
import { pad } from '../../utils/countdown';
import { autoplayKumbala, isKumbalaPlaying, onKumbalaChange, pauseKumbala, playKumbala } from '../../utils/kumbala';
import { LETTER, MEMORIES, ORIGIN } from '../../data/monthMemories';
import './cartel.css';
import './MonthAnniversary.css';

// Cada volante de recuerdo se imprime en un color distinto, como en la calle
const FLYER_TONES = ['yellow', 'paper', 'pink', 'green', 'ink', 'blue'];

function useTogether() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.max(0, Math.floor((now - TOGETHER_SINCE.getTime()) / 1000));
  return [
    ['Días', Math.floor(s / 86400)],
    ['Hrs', pad(Math.floor(s / 3600) % 24)],
    ['Min', pad(Math.floor(s / 60) % 60)],
    ['Seg', pad(s % 60)],
  ];
}

function useKumbala() {
  const [playing, setPlaying] = useState(isKumbalaPlaying);
  useEffect(() => onKumbalaChange(setPlaying), []);
  // Kumbala suena sola al abrir la página (o al primer toque si el navegador lo bloquea)
  useEffect(() => autoplayKumbala(), []);
  const toggle = () => (isKumbalaPlaying() ? pauseKumbala() : playKumbala());
  return [playing, toggle];
}

// Agrega .is-visible a cada [data-reveal] cuando entra en pantalla.
// data-reveal va siempre en un contenedor propio: React reescribe className de los elementos con estado.
function useReveal(rootRef) {
  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll('[data-reveal]') ?? [];
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [rootRef]);
}

function SectionLabel({ children }) {
  return (
    <div className="ma-label-wrap" data-reveal>
      <h2 className="ma-label">{children}</h2>
    </div>
  );
}

function OriginTicket() {
  const [torn, setTorn] = useState(false);
  return (
    <div className="ma-ticket-wrap" data-reveal>
      <div className={`ma-ticket${torn ? ' is-torn' : ''}`}>
        <div className="ma-ticket-main cartel-paper">
          <div className="ma-ticket-band">
            <span>{ORIGIN.show}</span>
            <span>{ORIGIN.venue}</span>
          </div>
          <strong className="ma-ticket-band-name">{ORIGIN.band}</strong>
          <dl className="ma-ticket-rows">
            <div><dt>Noche</dt><dd>{ORIGIN.night}</dd></div>
            <div><dt>Canción</dt><dd>{ORIGIN.song}</dd></div>
            <div><dt>Hora</dt><dd>{ORIGIN.hour}</dd></div>
            <div><dt>Respuesta</dt><dd className="ma-ticket-yes">{ORIGIN.answer}</dd></div>
          </dl>
          <span className="ma-ticket-stamp">Válido para toda la vida</span>
        </div>
        <button
          type="button"
          className="ma-ticket-stub cartel-paper"
          onClick={() => setTorn(true)}
          disabled={torn}
          aria-label="Arrancar el talón del boleto"
        >
          <span className="ma-ticket-stub-admit">Admite 2</span>
          <span className="ma-ticket-stub-hint">{torn ? '16.09' : 'Arráncalo'}</span>
        </button>
      </div>
      <p className="ma-handnote">{torn ? 'Este talón es tuyo. El mío lo guardo yo.' : 'jálale al talón →'}</p>
    </div>
  );
}

function Letter() {
  const [open, setOpen] = useState(false);
  return (
    <div className="ma-letter-zone" data-reveal>
      {open ? (
        <article className="ma-notebook">
          <span className="cartel-tape ma-notebook-tape" aria-hidden="true" />
          <p className="ma-notebook-greeting">{LETTER.greeting}</p>
          {LETTER.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <p className="ma-notebook-closing">{LETTER.closing}</p>
          <p className="ma-notebook-sign">{LETTER.sign}</p>
        </article>
      ) : (
        <button type="button" className="ma-envelope" onClick={() => setOpen(true)}>
          <span className="ma-envelope-flap" aria-hidden="true" />
          <span className="ma-envelope-to">Para: Ratita</span>
          <span className="ma-envelope-from">De: Tibo</span>
          <span className="ma-envelope-seal">Ábreme</span>
        </button>
      )}
    </div>
  );
}

export default function MonthAnniversary() {
  const rootRef = useRef(null);
  const together = useTogether();
  const [playing, toggleMusic] = useKumbala();
  useReveal(rootRef);

  return (
    <div className="ma-root" ref={rootRef}>
      {/* Cartel principal */}
      <header className="ma-hero">
        <div className="ma-hero-poster cartel-paper">
          <span className="cartel-tape ma-tape-tl" aria-hidden="true" />
          <span className="cartel-tape ma-tape-tr" aria-hidden="true" />

          <div className="ma-hero-band">
            <span>16.09 → 16.10</span>
            <span>Primer aniversario</span>
          </div>

          <p className="ma-hero-feliz">¡Feliz</p>
          <h1 className="ma-hero-title">
            <span className="ma-hero-num cartel-rainbow">1</span>
            <span className="ma-hero-word cartel-rainbow">mes</span>
          </h1>
          <p className="ma-hero-name">mi Ratita!</p>

          <div className="ma-hero-burst cartel-burst" aria-hidden="true">
            <span>¡Y<br />contando!</span>
          </div>

          <p className="ma-hero-sub">
            Treinta días desde que sonó Kumbala y me dijiste que sí. Esto es lo que guardo de ellos.
          </p>

          <div className="ma-together">
            <span className="ma-together-label">Llevamos juntos</span>
            <div className="ma-together-boxes" role="timer" aria-live="off">
              {together.map(([label, value]) => (
                <div key={label} className="ma-together-box">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <button type="button" data-music-toggle className={`ma-music${playing ? ' is-playing' : ''}`} onClick={toggleMusic}>
            <span className="ma-music-icon" aria-hidden="true" />
            {playing ? 'Pausar Kumbala' : 'Poner Kumbala'}
          </button>

          <div className="ma-hero-tabs" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => <span key={i}>Ratita &amp; Tibo</span>)}
          </div>
        </div>
      </header>

      <section className="ma-section">
        <SectionLabel>Cómo empezó</SectionLabel>
        <OriginTicket />
      </section>

      <section className="ma-section">
        <SectionLabel>Lo que guardo de este mes</SectionLabel>
        <ol className="ma-flyers">
          {MEMORIES.map((m, i) => (
            <li key={m.id} className="ma-flyer-slot" data-reveal style={{ '--i': i }}>
              <article className={`ma-flyer ma-flyer-${FLYER_TONES[i % FLYER_TONES.length]}`}>
                <span className="cartel-tape ma-flyer-tape" aria-hidden="true" />
                {m.photo && <img className="ma-flyer-photo" src={m.photo} alt={m.title} loading="lazy" />}
                <div className="ma-flyer-top">
                  <span className="ma-flyer-num">{pad(i + 1)}</span>
                  <span className="ma-flyer-date">{m.date}</span>
                </div>
                <h3 className="ma-flyer-title">{m.title}</h3>
                <p className="ma-flyer-text">{m.text}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="ma-section">
        <SectionLabel>Una carta para ti</SectionLabel>
        <Letter />
      </section>

      <footer className="ma-closing">
        <div className="ma-closing-wrap" data-reveal>
          <div className="ma-closing-poster cartel-paper">
            <p className="ma-closing-kicker">Próxima función</p>
            <p className="ma-closing-title">
              <span className="cartel-rainbow">¡Que vengan</span>
              <span className="cartel-rainbow">muchos más!</span>
            </p>
            <p className="ma-closing-note">Arranca una tirita:</p>
            <nav className="ma-closing-tabs" aria-label="Seguir">
              <a href={`${momentUrl('principal')}#momentos`}>Nuestra página</a>
              <a href={momentUrl('cumple')}>Tu cumpleaños</a>
              <a href={momentUrl('mes-contador')}>Nuestro primer mes</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
