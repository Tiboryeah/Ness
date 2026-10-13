import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

// Custom lips SVG that takes a fill color
const SVGLips = ({ color }) => (
  <svg 
    width="46" 
    height="28" 
    viewBox="0 0 40 25" 
    fill={color} 
    style={{ 
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
      transition: 'all 0.3s ease'
    }}
  >
    <path d="M 3 13 C 7 7, 12 4.5, 17 5 C 19 5.2, 19.5 6.5, 20 6.5 C 20.5 6.5, 21 5.2, 23 5 C 28 4.5, 33 7, 37 13 C 32 12.2, 27 10.5, 20 11.2 C 13 10.5, 8 12.2, 3 13 Z" />
    <path d="M 3 13 C 7 17.5, 11 21.5, 20 21.5 C 29 21.5, 33 17.5, 37 13 C 32 14.2, 27 14.8, 20 14.8 C 13 14.8, 8 14.2, 3 13 Z" />
  </svg>
);

export default function LipstickCard() {
  const [selectedShade, setSelectedShade] = useState('#800020'); // Default: Merlot (#800020)
  const [shadeName, setShadeName] = useState('Merlot Velvet');
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [message, setMessage] = useState('');
  const [isSealing, setIsSealing] = useState(false);

  const shades = [
    { name: 'Merlot Velvet', color: '#800020' }, // Burgundy/Wine
    { name: 'Cabernet Matte', color: '#722f37' }, // Deep Wine
    { name: 'Pinot Noir Noir', color: '#4a0e17' }  // Very Dark Wine Red
  ];

  const messages = [
    "Ness: eres el misterio más hermoso que he empezado a leer...",
    "El café de la tarde se disfruta más si es pensando en ti.",
    "Me encanta escuchar Queen y hablar de libros victorianos contigo.",
    "Aunque nos conocemos apenas, cada detalle tuyo hace brillar el día.",
    "Dices que eres un libro abierto... pero qué bonita tu tinta invisible."
  ];

  const handleSelectShade = (shade) => {
    playPopSynth();
    setSelectedShade(shade.color);
    setShadeName(shade.name);
  };

  const handleSealAndOpen = () => {
    if (isSealing || isUnfolded) return;
    setIsSealing(true);
    playPopSynth(); // Sound effect for kiss

    // Pick a random message
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMsg);

    // Sequence: Stamp first, then unfold
    setTimeout(() => {
      setIsUnfolded(true);
      setIsSealing(false);
    }, 600); // 600ms stamp delay
  };

  const handleFoldBack = () => {
    playPopSynth();
    setIsUnfolded(false);
  };

  return (
    <Card 
      id="card-labial" 
      icon={<Heart />} 
      title="2. El Labial Vino" 
      desc="Elige un tono de labial, sella la servilleta con un beso y ábrela para leer el mensaje."
    >
      <div 
        className="lipstick-napkin-container"
        style={{
          height: '140px',
          background: 'radial-gradient(circle, #5b3d22 0%, #2f1c0c 100%)', // vintage wood tabletop
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '10px'
        }}
      >
        {/* The Paper Napkin */}
        <div 
          style={{
            width: isUnfolded ? '95%' : '80%',
            height: isUnfolded ? '120px' : '100px',
            backgroundColor: '#fdf5e6', // paper texture
            border: '1.2px dashed #c4b196',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            padding: '10px',
            boxSizing: 'border-box'
          }}
        >
          {!isUnfolded ? (
            // Folded state
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Servilleta doblada
              </span>
              
              {/* Kiss preview or stamping animation */}
              <div style={{ 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                transform: isSealing ? 'scale(1.2)' : 'scale(1)', 
                opacity: isSealing ? 1 : 0.45,
                transition: 'all 0.2s ease-in-out'
              }}>
                <SVGLips color={selectedShade} />
              </div>

              <span style={{ fontSize: '0.75rem', color: '#555', marginTop: '6px', fontWeight: '500' }}>
                {isSealing ? 'Sellando...' : 'Lista para recibir tu beso'}
              </span>
            </div>
          ) : (
            // Unfolded state (Message Revealed)
            <div style={{ 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              width: '100%',
              animation: 'fade-in 0.4s ease-out'
            }}>
              {/* Small stamp at the top of unfolded message */}
              <div style={{ transform: 'scale(0.8)', marginBottom: '4px' }}>
                <SVGLips color={selectedShade} />
              </div>
              
              <p style={{ 
                fontFamily: 'var(--font-cursive)', 
                color: '#2a1a0c', 
                fontSize: '1.25rem', 
                margin: '2px 0 6px 0',
                lineHeight: '1.25',
                fontWeight: '600'
              }}>
                "{message}"
              </p>

              <span style={{ fontSize: '0.55rem', color: '#8c704f', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Tono del beso: <span style={{ color: selectedShade, fontWeight: 'bold' }}>{shadeName}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Control panel under the napkin */}
      {!isUnfolded ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '6px', width: '100%' }}>
          {/* Color swatches */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--pink-pastel)', marginRight: '4px' }}>Tono:</span>
            {shades.map(s => (
              <button
                key={s.name}
                onClick={() => handleSelectShade(s)}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: s.color,
                  border: selectedShade === s.color ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                  boxShadow: selectedShade === s.color ? `0 0 6px ${s.color}` : 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'transform 0.2s'
                }}
                title={s.name}
              />
            ))}
          </div>

          <button 
            className="action-btn" 
            onClick={handleSealAndOpen}
            disabled={isSealing}
            style={{ 
              padding: '6px 16px', 
              fontSize: '0.78rem',
              backgroundColor: 'var(--pink-light)',
              color: '#fff',
              border: 'none',
              boxShadow: '0 2px 8px rgba(161,29,51,0.25)'
            }}
          >
            Sellar con Beso
          </button>
        </div>
      ) : (
        <button 
          className="action-btn" 
          onClick={handleFoldBack}
          style={{ padding: '5px 14px', fontSize: '0.75rem', marginTop: '6px', alignSelf: 'center' }}
        >
          Doblar Servilleta
        </button>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Card>
  );
}
