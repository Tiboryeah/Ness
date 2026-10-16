import React, { useState } from 'react';
import { ArrowDownRight, KeyRound } from 'lucide-react';
import { playPopSynth } from '../utils/audio';

export default function Landing({ copy, onStart }) {
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
          <span>{copy.topline[0]}</span>
          <span>{copy.topline[1]}</span>
        </div>

        <div className="landing-monogram goth-landing-monogram" aria-hidden="true">
          <span>R</span>
          <span className="goth-monogram-cross">†</span>
        </div>

        <div className="landing-birthday-pill goth-birthday-pill">
          <span>{copy.pill}</span>
        </div>

        <h1 className="landing-title goth-landing-title">
          {copy.titleLead}<br /><span className="landing-name-highlight goth-name-highlight">{copy.titleName}</span>
        </h1>

        <p className="landing-subtitle">
          {copy.subtitle}
        </p>

        <div className="landing-tibo-badge goth-tibo-badge"><span>De <strong>Tibo</strong> · Hasta el último amanecer †</span></div>

        {/* Mystic Portal Entry Button */}
        <div className="landing-portal-wrapper">
          <button 
            type="button" 
            className="mystic-keyhole-btn birthday-entry-btn goth-entry-btn"
            onClick={handleStart}
            aria-label={copy.entryLabel}
          >
            <KeyRound size={27} className="key-icon-pulse" />
          </button>
          <span className="portal-hint goth-portal-hint">
            {copy.entryHint} <ArrowDownRight size={15} />
          </span>
        </div>
      </div>
    </section>
  );
}
