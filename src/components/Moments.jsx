import { useEffect, useState } from 'react';
import { BIRTHDAY_START, MONTH_START, momentUrl } from '../editionSchedule';
import { formatCountdown } from '../utils/countdown';
import './Moments.css';

// Experiencias que solo existieron un día y aquí se pueden volver a vivir.
// opensAt: antes de esa fecha el boleto queda sellado.
const MOMENTS = [
  {
    view: 'clasica',
    stamp: 'El origen',
    date: 'MMXXVI',
    title: 'El primer rincón',
    text: 'La primera versión de este lugar, tal como nació: morado, verde esmeralda y muchas ganas de hacerte sonreír.',
    cta: 'Abrir',
  },
  {
    view: 'ritual',
    stamp: 'Víspera',
    date: '12.10',
    title: 'La víspera del ritual',
    text: 'Velas, sangre, una nana desafinada y una campanada a medianoche. Sube el volumen y espera al cero.',
    cta: 'Revivir la cuenta regresiva',
    opensAt: BIRTHDAY_START,
  },
  {
    view: 'cumple',
    stamp: 'Tu día',
    date: '13.10',
    title: 'Tu cumpleaños',
    text: 'La edición de tu día: Queen sonando, el pastel y la promesa de caminar juntos hasta el último amanecer.',
    cta: 'Volver a tu cumpleaños',
    opensAt: BIRTHDAY_START,
  },
  {
    view: 'mes-contador',
    direct: 'mes',
    stamp: 'Kumbala',
    date: '16.10',
    title: 'Nuestro primer mes',
    text: 'Desde aquella noche en la GAM, cuando Maldita Vecindad tocó Kumbala, ya pasaba de la medianoche y me dijiste que sí.',
    cta: 'Revivir nuestro primer mes',
    opensAt: MONTH_START,
  },
];

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export default function Moments() {
  const now = useNow();

  // Al volver desde un momento (/#momentos) la sección aparece después de entrar, así que el salto se hace aquí
  useEffect(() => {
    if (window.location.hash === '#momentos') {
      document.getElementById('momentos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section id="momentos" className="moments-section" aria-labelledby="moments-title">
      <header className="moments-header">
        <span className="moments-kicker">Archivo · Lo que ya vivimos</span>
        <h2 id="moments-title" className="moments-title">Momentos</h2>
        <p className="moments-subtitle">
          Hay noches que solo existieron un día. Aquí las guardo para que puedas volver a ellas cuando quieras,
          con su música, su cuenta regresiva y todo lo que sentimos.
        </p>
      </header>

      <ol className="moments-list">
        {MOMENTS.map((m, i) => {
          const locked = m.opensAt && now < m.opensAt.getTime();
          return (
            <li key={m.view} className={`moment-ticket${locked ? ' is-locked' : ''}`}>
              <div className="moment-stub" aria-hidden="true">
                <span className="moment-number">M—{String(i + 1).padStart(2, '0')}</span>
                <span className="moment-date">{m.date}</span>
              </div>
              <div className="moment-body">
                <span className="moment-stamp">{locked ? 'Sellado' : m.stamp}</span>
                <h3 className="moment-title">{m.title}</h3>
                <p className="moment-text">{m.text}</p>
                {locked ? (
                  <p className="moment-countdown">
                    Se abre en <strong>{formatCountdown(m.opensAt.getTime() - now)}</strong>
                  </p>
                ) : (
                  <div className="moment-actions">
                    <a className="moment-cta" href={momentUrl(m.view)}>{m.cta} <span aria-hidden="true">→</span></a>
                    {m.direct && <a className="moment-secondary" href={momentUrl(m.direct)}>Ir directo</a>}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
