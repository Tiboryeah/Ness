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

        <div className="landing-topline goth-landing-topline">
          <span>† 13.10 · ISSUE MMXXVI · UNHOLY ROMANCE</span>
          <span>SIN CENSURA †</span>
        </div>

        <div className="landing-monogram goth-landing-monogram" aria-hidden="true">
          <span>R</span>
          <span className="goth-monogram-cross">†</span>
        </div>

        <div className="landing-birthday-pill goth-birthday-pill">
          <span>† PUNK PROMISE // PARA MI PROMETIDA & REINA ✟</span>
        </div>

        <h1 className="landing-title goth-landing-title">
          ¡Feliz Cumpleaños,<br /><span className="landing-name-highlight goth-name-highlight">Ratita!</span>
        </h1>

        <p className="landing-subtitle">
          Guitarras desgarradoras, flores oscuras, criaturas en sombras y un pacto de amor eterno. Hoy celebramos tu vida y el primer cumpleaños como prometidos.
        </p>

        <div className="landing-tibo-badge goth-tibo-badge"><span>De <strong>Tibo</strong> · Hasta el último amanecer †</span></div>

        {/* Mystic Portal Entry Button */}
        <div className="landing-portal-wrapper">
          <button 
            type="button" 
            className="mystic-keyhole-btn birthday-entry-btn goth-entry-btn"
            onClick={handleStart}
            aria-label="Abrir el ritual de celebración de Ratita"
          >
            <KeyRound size={27} className="key-icon-pulse" />
          </button>
          <span className="portal-hint goth-portal-hint">
            Entrar al ritual nocturno † <ArrowDownRight size={15} />
          </span>
        </div>
      </div>
    </section>
  );
}
