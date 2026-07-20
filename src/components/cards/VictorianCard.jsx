import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

export default function VictorianCard() {
  const [isBroken, setIsBroken] = useState(false);

  const handleSealClick = (e) => {
    e.stopPropagation();
    playPopSynth();
    setIsBroken(!isBroken);
  };

  return (
    <Card 
      id="card-victoriano" 
      icon={<Crown />} 
      title="7. La Época Victoriana" 
      desc="El romance clásico, la elegancia y los secretos guardados con cera roja."
    >
      <div 
        style={{ 
          height: '140px', 
          background: 'radial-gradient(circle, #2d1b24 0%, #0d0608 100%)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '10px'
        }}
      >
        {!isBroken ? (
          /* Sealed Scroll */
          <div 
            onClick={handleSealClick}
            style={{
              width: '130px',
              height: '80px',
              backgroundColor: '#f5e6d3', // parchment color
              borderRadius: '6px',
              border: '2px solid #d4af37',
              boxShadow: '5px 5px 15px rgba(0,0,0,0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'transform 0.3s'
            }}
          >
            {/* Scroll Rolled Edges */}
            <div style={{ position: 'absolute', left: '-5px', top: '0', bottom: '0', width: '8px', background: '#e0cda9', borderRadius: '4px 0 0 4px', boxShadow: '2px 0 5px rgba(0,0,0,0.2)' }} />
            <div style={{ position: 'absolute', right: '-5px', top: '0', bottom: '0', width: '8px', background: '#e0cda9', borderRadius: '0 4px 4px 0', boxShadow: '-2px 0 5px rgba(0,0,0,0.2)' }} />
            
            {/* Wax Seal */}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#a11d33', // wine red wax
              border: '2.5px double #d4af37',
              boxShadow: '0 3px 6px rgba(0,0,0,0.4)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
              animation: 'pulse-gift 2s infinite ease-in-out'
            }}>
              <span style={{ fontSize: '0.95rem', color: '#d4af37', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>N</span>
            </div>
            
            <div style={{ position: 'absolute', bottom: '8px', fontSize: '0.62rem', color: '#8a1c2e', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>
              Romper Sello
            </div>
          </div>
        ) : (
          /* Unrolled Scroll Details */
          <div 
            onClick={handleSealClick}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#fdf5e6', // warm vintage parchment
              border: '2.5px solid #d4af37',
              borderRadius: '8px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#3a141a',
              boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
              cursor: 'pointer',
              animation: 'grow-in 0.4s ease forwards',
              position: 'relative'
            }}
          >
            {/* Filigree corner accents */}
            <div style={{ position: 'absolute', top: '2px', left: '2px', fontSize: '0.6rem', color: '#d4af37' }}>✦</div>
            <div style={{ position: 'absolute', top: '2px', right: '2px', fontSize: '0.6rem', color: '#d4af37' }}>✦</div>
            <div style={{ position: 'absolute', bottom: '2px', left: '2px', fontSize: '0.6rem', color: '#d4af37' }}>✦</div>
            <div style={{ position: 'absolute', bottom: '2px', right: '2px', fontSize: '0.6rem', color: '#d4af37' }}>✦</div>

            <p style={{
              fontFamily: 'var(--font-cursive)',
              fontSize: '1.45rem',
              lineHeight: '1.1',
              textAlign: 'center',
              margin: '0',
              fontWeight: '400'
            }}>
              Lady Ness,
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.62rem',
              lineHeight: '1.4',
              textAlign: 'center',
              margin: '5px 0 0 0',
              fontStyle: 'italic'
            }}>
              En la finura de los modales y el romance inmarcesible de la época victoriana, se halla nuestro refugio. Donde las cartas se escriben con devoción y las almas se enlazan para siempre.
            </p>
            <span style={{ fontSize: '0.52rem', color: 'var(--pink-light)', marginTop: '4px' }}>
              (Haz clic para cerrar)
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
