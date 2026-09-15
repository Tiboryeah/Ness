import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Card from '../Card';
import { playClickSynth } from '../../utils/audio';

export default function InvisibleBookCard({ onTriggerCandyRain }) {
  const [uvOn, setUvOn] = useState(false);
  const [uvCoords, setUvCoords] = useState({ x: 0, y: 0 });

  const toggleUvLight = (e) => {
    e.stopPropagation();
    playClickSynth();
    setUvOn(!uvOn);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setUvCoords({ x, y });
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      setUvCoords({ x, y });
    }
  };

  return (
    <Card 
      id="card-libro-invisible" 
      icon={<Sparkles />} 
      title="10. El Libro de Tinta Invisible" 
      desc="Dices que eres un libro abierto... pero algunas páginas se leen de otra forma."
    >
      <div 
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{ 
          height: '140px', 
          background: 'radial-gradient(circle, #fdf5e6 0%, #dcd1be 100%)', // open paper book look
          borderRadius: '12px',
          border: '1.5px solid #8a1c2e',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '12px',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
        }}
      >
        {/* Book spine decoration */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '2px',
          backgroundColor: 'rgba(0,0,0,0.15)',
          boxShadow: '0 0 4px rgba(0,0,0,0.2)'
        }} />

        {/* Left Page (Visible Text) */}
        <div style={{
          width: '50%',
          paddingRight: '8px',
          borderRight: '1px dashed rgba(0,0,0,0.1)',
          color: '#3a141a',
          fontSize: '0.52rem',
          lineHeight: '1.4',
          fontFamily: 'var(--font-serif)',
          textAlign: 'justify'
        }}>
          <strong>Soy un libro abierto...</strong>
          <p style={{ marginTop: '2px' }}>
            Si me miras a los ojos sabrás todo de mí. Mis capítulos están abiertos a la luz del día para que cualquiera los lea...
          </p>
        </div>

        {/* Right Page (Visible Text) */}
        <div style={{
          width: '50%',
          paddingLeft: '8px',
          color: '#3a141a',
          fontSize: '0.52rem',
          lineHeight: '1.4',
          fontFamily: 'var(--font-serif)',
          textAlign: 'justify'
        }}>
          <p>
            No escondo nada, no tengo secretos ni misterios. Mi portada es clara y mis hojas giran al viento, mostrando mi verdad.
          </p>
        </div>

        {/* UV Blacklight Secret Layer */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(18, 5, 20, 0.96)', // violet ultraviolet mask
          color: '#fff',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
          borderRadius: '12px',
          opacity: uvOn ? 1 : 0,
          transition: 'opacity 0.4s ease',
          zIndex: 5
        }}>
          {/* Glowing Hidden Text */}
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.62rem',
            lineHeight: '1.4',
            textAlign: 'center',
            clipPath: `circle(45px at ${uvCoords.x}px ${uvCoords.y}px)`,
            color: '#fff',
            textShadow: '0 0 5px var(--pink-light), 0 0 10px var(--pink-light), 0 0 20px #800020',
            width: '100%',
            fontWeight: '600'
          }}>
            <p style={{ color: 'var(--purple-neon)', fontWeight: 'bold', fontSize: '0.7rem', marginBottom: '4px' }}>✦ PÁGINAS INVISIBLES ✦</p>
            <p>"Aunque para el mundo seas un libro abierto..."</p>
            <p>"Adoro saber que guardas páginas con tinta invisible..."</p>
            <p>"Cuya magia solo mis ojos pueden revelar."</p>
            <p style={{ color: 'var(--purple-neon)', marginTop: '4px', fontSize: '0.68rem', fontWeight: 'bold' }}>Qué lindo coincidir en esta historia, Ness.</p>
          </div>

          {/* Flashlight circle beam indicator (for when mouse is not hovering yet, or to guide) */}
          <div style={{
            position: 'absolute',
            left: `${uvCoords.x - 45}px`,
            top: `${uvCoords.y - 45}px`,
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: '2px dashed rgba(212, 175, 55, 0.3)',
            pointerEvents: 'none',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)'
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button 
          className="action-btn" 
          onClick={toggleUvLight}
          style={{ 
            fontSize: '0.8rem', 
            padding: '6px 12px',
            backgroundColor: uvOn ? 'var(--pink-light)' : 'rgba(255,255,255,0.05)',
            border: uvOn ? '1px solid #fff' : '1px solid transparent'
          }}
        >
          {uvOn ? 'Apagar Luz UV' : 'Usar Luz UV'}
        </button>
        {uvOn && (
          <button 
            className="action-btn" 
            onClick={(e) => { e.stopPropagation(); onTriggerCandyRain(); }}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            Lluvia de Pétalos
          </button>
        )}
      </div>
    </Card>
  );
}
