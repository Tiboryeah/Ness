import React, { useState } from 'react';
import { Mail, Heart } from 'lucide-react';
import Card from '../Card';
import { playClickSynth } from '../../utils/audio';

export default function LetterCard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = (e) => {
    e.stopPropagation();
    playClickSynth();
    setIsOpen(!isOpen);
  };

  return (
    <Card 
      id="card-cartas" 
      icon={<Mail />} 
      title="9. Cartas del Corazón" 
      desc="Palabras sinceras escritas desde el alma. Haz clic para abrir el sobre."
    >
      <div className="card-interaction letter-interaction">
        <div 
          className="envelope-wrapper"
          onClick={toggleEnvelope}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <div className={`envelope ${isOpen ? 'open' : ''}`} style={{ backgroundColor: '#58111a' }}>
            <div className="flap" style={{ borderTopColor: '#58111a' }}></div>
            <div className="pocket"></div>
            <div className="letter" style={{ background: '#fdf5e6' }}>
              <div className="letter-content" style={{ color: '#3a141a', fontFamily: 'var(--font-serif)' }}>
                <h4 className="cursive" style={{ color: 'var(--pink-neon)', fontSize: '1.5rem', marginBottom: '5px' }}>Querida Ness,</h4>
                <p style={{ fontSize: '0.62rem', lineHeight: '1.4', fontStyle: 'italic', marginBottom: '8px' }}>
                  Aunque hace muy poco que nos conocemos y apenas estamos empezando a escribir nuestra historia, me alegra mucho haber coincidido contigo.
                </p>
                <p style={{ fontSize: '0.62rem', lineHeight: '1.4', marginBottom: '8px' }}>
                  En este tiempo he aprendido a escuchar con atención lo que compartes. Sé que a veces te ronda el temor al abandono, pero también conozco tu mayor anhelo: el día en que cortes el listón de tu propia barbería. Aunque nos estemos conociendo apenas, quiero que sepas que me encantaría estar siempre ahí para apoyarte y celebrar contigo cuando llegue ese gran momento.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                  <Heart size={14} fill="var(--pink-light)" stroke="none" />
                  <p className="cursive text-right" style={{ fontSize: '1.1rem', margin: 0, color: 'var(--pink-neon)' }}>
                    Con cariño, Tibo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button 
          className="action-btn" 
          onClick={toggleEnvelope}
          style={{ alignSelf: 'center', padding: '6px 15px', fontSize: '0.8rem' }}
        >
          {isOpen ? 'Cerrar Carta' : 'Abrir Carta'}
        </button>
      </div>

      <style>{`
        .envelope::before {
          border-bottom-color: #8a1c2e !important;
        }
        .envelope.open .flap {
          border-top-color: #38070d !important;
        }
      `}</style>
    </Card>
  );
}
