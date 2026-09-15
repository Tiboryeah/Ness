import React, { useState } from 'react';
import { CalendarDays, Lock, Music2, Unlock } from 'lucide-react';
import Card from '../Card';
import { playClickSynth } from '../../utils/audio';

function Bat({ className = '' }) {
  return <svg className={className} viewBox="0 0 64 30" aria-hidden="true"><path d="M32 27C26 17 20 12 13 10c2 3 2 6 1 9C9 16 5 15 1 16c7 5 12 9 17 13 3-5 8-7 14-2 6-5 11-3 14 2 5-4 10-8 17-13-4-1-8 0-13 3-1-3-1-6 1-9-7 2-13 7-19 17Z" fill="currentColor" /></svg>;
}

const letterParagraphs = [
  'Sé que el tiempo apenas nos ha concedido unas cuantas páginas juntos, pero desde el instante en que apareciste frente a mí, algo quedó atrapado entre tus ojos y mis pensamientos.',
  'Desde entonces, vuelves a mí con demasiada facilidad.',
  'Recuerdo la suavidad de tus manos, el sabor de tus besos, esa risa tuya que parece romper incluso las noches más silenciosas. Recuerdo la delicadeza de tu rostro, el brillo travieso de tus ojos y esa forma tan tuya de mirar, como si guardaras secretos detrás de ellos.',
  'Tus snake bites, tu septum, cada pequeño destello de metal sobre tu rostro parecen haber encontrado exactamente el lugar al que pertenecen. Como si incluso ellos hubieran sido puestos ahí para remarcar algo que yo ya sospechaba desde que te vi: que tienes una belleza difícil de ignorar.',
  'Y sí... incluso puedo perdonarte que le vayas a los Pumas.',
  'Supongo que ningún ser perfecto podía estar completamente libre de alguna pequeña maldición.',
  'Pero incluso con eso, me pareces increíble.',
  'No sé cuánto tiempo nos conceda la vida, ni qué caminos tenga preparados para nosotros. Quizá mañana todo cambie, quizá nos espere una eternidad disfrazada de unos cuantos años. Nadie conoce realmente dónde termina este extraño recorrido.',
  'Pero hay algo que sí sé.',
  'Quiero que me permitas caminar a tu lado.',
  'Quiero coleccionar contigo noches, risas, besos, momentos absurdos, silencios cómodos y recuerdos que algún día podamos mirar atrás y decir: valió la pena estar ahí.',
  'Y si me das esa oportunidad, quiero demostrarte que puedo convertirme cada día en una mejor versión de mí. No por miedo a perderte, sino porque quiero ser alguien capaz de cuidar aquello que llegue a construir contigo.',
  'Quiero seguir enamorándote incluso cuando crea que ya lo conseguí.',
  'Elegirte cuando los días sean hermosos y también cuando la oscuridad pese un poco más.',
  'Serte fiel mientras exista un camino que recorrer juntos.',
  'Tomar tu mano y avanzar contigo por esta cosa extraña, breve y preciosa que llamamos vida.',
  'Porque no sé cuándo llegará nuestro último amanecer.',
  'Pero mientras llega...',
  'quiero hacer que cada segundo contigo tenga algo de eternidad.'
];

export default function SecretCard({ onUnlock }) {
  const [date, setDate] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [wrong, setWrong] = useState(false);

  const tryUnlock = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (date !== '2026-09-10') {
      setWrong(true);
      window.setTimeout(() => setWrong(false), 700);
      return;
    }
    playClickSynth();
    setWrong(false);
    setUnlocked(true);
    onUnlock?.();
  };

  return (
    <Card
      id="card-secret"
      icon={unlocked ? <Unlock size={22} /> : <Lock size={22} />}
      title="9. Archivo Nocturno"
      desc={unlocked ? 'Una página que solo podía abrir un recuerdo compartido.' : 'Hay algo aquí que no responde a llaves. Solo a una fecha que dos personas podrían recordar.'}
    >
      {!unlocked ? (
        <div className={`secret-lock ${wrong ? 'secret-wrong' : ''}`}>
          <div className="secret-lock-orbit"><Lock size={32} /><span>09</span></div>
          <span className="secret-eyebrow">ACCESO CIFRADO · INTENTOS ILIMITADOS</span>
          <h4>¿Cuándo fue<br />nuestro primer beso?</h4>
          <p>Escribe la fecha que convirtió una noche cualquiera en el principio de algo.</p>
          <form className="secret-date-form" onSubmit={tryUnlock}>
            <label htmlFor="secret-date"><CalendarDays size={16} /> Fecha del recuerdo</label>
            <input id="secret-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-describedby="date-format secret-status" required />
            <small id="date-format">Formato: día / mes / año</small>
            <button type="submit"><Lock size={15} /><span>Intentar abrir</span></button>
            <span id="secret-status" className="secret-status" role="status">{wrong ? 'La cerradura permanece en silencio. Intenta recordarlo otra vez.' : 'La fecha correcta abrirá el archivo.'}</span>
          </form>
        </div>
      ) : (
        <article className="secret-revelation">
          <div className="bat-swarm" aria-hidden="true"><Bat className="bat bat-one" /><Bat className="bat bat-two" /><Bat className="bat bat-three" /></div>
          <div className="secret-wordmark">
            <span>NOW PLAYING</span>
            <strong>AVENGED<br />SEVENFOLD</strong>
            <small><Music2 size={12} /> A Little Piece of Heaven</small>
          </div>
          <header className="secret-letter-header">
            <span>ARCHIVO DESBLOQUEADO · 10.09.26</span>
            <h4>Para la criatura<br />que habita mis pensamientos</h4>
          </header>
          <div className="secret-letter-copy">
            {letterParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <p className="secret-eternity">Te amito. ♡</p>
          </div>
          <footer className="secret-seal"><span>T</span><small>hasta el último amanecer</small></footer>
        </article>
      )}
    </Card>
  );
}
