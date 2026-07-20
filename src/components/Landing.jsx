import React, { useState } from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

export default function Landing({ onStart }) {
  const [isFading, setIsFading] = useState(false);

  const handleStart = () => {
    setIsFading(true);
    setTimeout(() => {
      onStart();
    }, 800);
  };

  return (
    <section id="landing" className={isFading ? 'fade-out' : ''}>
      <div className="landing-content glass">
        <div className="sparkles-container">
          <span className="sparkle" style={{ top: '10%', left: '15%', color: 'var(--pink-light)' }}>
            <Sparkles size={24} />
          </span>
          <span className="sparkle" style={{ top: '25%', right: '15%', color: 'var(--purple-neon)' }}>
            <Heart size={20} fill="var(--purple-neon)" />
          </span>
          <span className="sparkle" style={{ bottom: '20%', left: '20%', color: 'var(--pink-pastel)' }}>
            <Star size={18} fill="var(--pink-pastel)" />
          </span>
        </div>
        <h1 className="glow-text">
          Para Ness...<br />
          <span className="highlight-name" style={{ fontFamily: 'var(--font-cursive)', fontSize: '4.5rem', fontWeight: '400', textTransform: 'none' }}>Ness</span>
        </h1>
        <p className="subtitle" style={{ fontSize: '1.2rem', marginTop: '10px' }}>
          He construido un pequeño rincón secreto con las cosas que te encantan y las palabras que compartimos.
        </p>
        <p className="from-tibo" style={{ color: 'var(--purple-neon)', fontWeight: '600', marginBottom: '35px', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
          De parte de Tibo
        </p>

        <div className="gift-box-container" onClick={handleStart} style={{ marginTop: '10px' }}>
          <div className="romantic-entry-btn" style={{ 
            width: '80px', 
            height: '80px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'rgba(255,255,255,0.02)', 
            border: '2px solid var(--purple-neon)', 
            borderRadius: '50%', 
            boxShadow: '0 0 20px rgba(212,175,55,0.25)', 
            cursor: 'pointer',
            animation: 'pulse-gift 2.2s infinite ease-in-out',
            transition: 'transform 0.3s'
          }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="var(--purple-neon)">
              {/* Antique Victorian keyhole */}
              <circle cx="12" cy="9" r="3.5" />
              <path d="M9.5,12.5 L14.5,12.5 L16,19.5 L8,19.5 Z" />
            </svg>
          </div>
          <p className="gift-hint" style={{ color: 'var(--pink-pastel)', marginTop: '18px', fontWeight: '600' }}>
            Haz clic en la cerradura para entrar
          </p>
        </div>
      </div>
    </section>
  );
}
