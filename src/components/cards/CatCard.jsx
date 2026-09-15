import React, { useEffect, useRef, useState } from 'react';
import { Cat, Heart, Sparkles, Waves } from 'lucide-react';
import Card from '../Card';
import { playMeowSynth, playPopSynth, startPurrSynth } from '../../utils/audio';

export default function CatCard() {
  const [purrLevel, setPurrLevel] = useState(0);
  const [catMessage, setCatMessage] = useState('Mantén presionado: respira conmigo y escucha.');
  const [isPetting, setIsPetting] = useState(false);
  const purrStopRef = useRef(null);
  const progressRef = useRef(null);

  const catPhrases = [
    '¡Prrr... prrr! (Amasando amor para ti)',
    '¡Miau! Los gatitos naranjas te adoramos, Ratita.',
    'Ronroneo al 100%: ¡Energía gatuna cariñosa enviada!',
    'Modo bolita de pan dulce activado.',
    '¡Eres la humana favorita de este michi!',
    'Un cabezacito con cariño directo para ti.'
  ];

  const startPet = (e) => {
    e.stopPropagation();
    if (isPetting) return;
    setIsPetting(true);
    purrStopRef.current = startPurrSynth();
    setCatMessage('Inhala lento… el michi está amasando calma.');
    progressRef.current = window.setInterval(() => {
      setPurrLevel((level) => Math.min(100, level + 2));
    }, 90);
  };

  const stopPet = (e) => {
    e?.stopPropagation();
    if (!isPetting) return;
    setIsPetting(false);
    window.clearInterval(progressRef.current);
    purrStopRef.current?.();
    purrStopRef.current = null;
    setCatMessage(purrLevel >= 90 ? 'Ritual completo. Calma gatuna desbloqueada.' : catPhrases[Math.floor(Math.random() * catPhrases.length)]);
    if (purrLevel >= 90) playMeowSynth();
  };

  useEffect(() => () => {
    window.clearInterval(progressRef.current);
    purrStopRef.current?.();
  }, []);

  const handleReset = (e) => {
    e.stopPropagation();
    playPopSynth();
    setPurrLevel(0);
    setCatMessage('Listo para otro ritual de calma.');
  };

  return (
    <Card
      id="card-cat"
      icon={<Cat size={22} />}
      title="1. El Michi Naranjoso"
      desc="Esa vibra alegre, juguetona y cariñosa que solo un gatito color naranja sabe regalar."
    >
      <div className="cat-card-body">
        {/* Photo Container */}
        <div className="cat-photo-frame">
          <img 
            src="/images/orange-cat-illustration.webp" 
            alt="Gatito Naranjoso adorable" 
            className={`cat-image ${isPetting ? 'petting-bounce' : ''}`}
            loading="lazy"
            decoding="async"
          />
          <div className="cat-overlay-tag">
            <Sparkles size={14} />
            <span>Naranjoso Favorito</span>
          </div>
        </div>

        {/* Dynamic Purr Gauge */}
        <div className="cat-purr-panel">
          <div className="purr-header">
            <span className="purr-title">
              <Waves size={16} /> Ritual de calma
            </span>
            <span className="purr-value">{purrLevel}%</span>
          </div>
          <div className="purr-track">
            <div 
              className="purr-fill"
              style={{ width: `${purrLevel}%` }}
            />
          </div>
        </div>

        {/* Message bubble */}
        <div className="cat-dialog-bubble">
          <p>{catMessage}</p>
        </div>

        {/* Action button */}
        <div className="cat-actions">
          <button 
            type="button" 
            className="action-btn-primary"
            onPointerDown={startPet}
            onPointerUp={stopPet}
            onPointerLeave={stopPet}
            onPointerCancel={stopPet}
          >
            <Heart size={16} />
            <span>{isPetting ? 'Sigue respirando…' : 'Mantén para acariciar'}</span>
          </button>
          {purrLevel >= 100 && (
            <button 
              type="button" 
              className="action-btn-secondary"
              onClick={handleReset}
            >
              Reiniciar
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
