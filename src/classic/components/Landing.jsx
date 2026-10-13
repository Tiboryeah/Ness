import React, { useState } from 'react';
import { ArrowDownRight, Asterisk, KeyRound } from 'lucide-react';
import { playPopSynth } from '../utils/audio';

export default function Landing({ onStart }) {
  const [isFading, setIsFading] = useState(false);

  const handleStart = () => {
    playPopSynth();
    setIsFading(true);
    setTimeout(() => {
      onStart();
    }, 700);
  };

  return (
    <section id="landing" className={isFading ? 'fade-out' : ''}>
      <div className="landing-card glass">
        {/* Floating glow elements */}
        <div className="landing-ambient-lights">
          <span className="light-orb orb-purple" />
          <span className="light-orb orb-green" />
          <span className="light-orb orb-pink" />
        </div>

        <div className="landing-topline">
          <span>Archivo sentimental</span>
          <span>MMXXVI</span>
        </div>

        <div className="landing-monogram" aria-hidden="true">
          <span>R</span>
          <Asterisk size={22} />
        </div>

        <h1 className="landing-title">
          Para<br /><span className="landing-name-highlight">Ratita</span>
        </h1>

        <p className="landing-subtitle">
          Una colección privada de canciones, flores, criaturas y pequeñas obsesiones. Tu universo, guardado en un rincón de la noche.
        </p>

        <div className="landing-tibo-badge"><span>Un universo hecho para <strong>ti</strong></span></div>

        {/* Mystic Portal Entry Button */}
        <div className="landing-portal-wrapper">
          <button 
            type="button" 
            className="mystic-keyhole-btn"
            onClick={handleStart}
            aria-label="Abrir el rincón de Ratita"
          >
            <KeyRound size={27} className="key-icon-pulse" />
          </button>
          <span className="portal-hint">
            Entrar al universo <ArrowDownRight size={15} />
          </span>
        </div>
      </div>
    </section>
  );
}
