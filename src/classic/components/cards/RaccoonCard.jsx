import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

const SVGRaccoon = ({ isHappy, isWinking }) => (
  <svg 
    width="80" 
    height="70" 
    viewBox="0 0 80 70" 
    style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))', transition: 'transform 0.3s' }}
  >
    {/* Ears */}
    <polygon points="15,25 5,5 30,15" fill="#5a5a5a" stroke="#eaeaea" strokeWidth="2" />
    <polygon points="10,21 6,9 22,15" fill="#a11d33" /> {/* Inner ear - customized red/wine */}

    <polygon points="65,25 75,5 50,15" fill="#5a5a5a" stroke="#eaeaea" strokeWidth="2" />
    <polygon points="70,21 74,9 58,15" fill="#a11d33" /> {/* Inner ear */}

    {/* Head Base */}
    <path d="M 10,35 C 10,20 70,20 70,35 C 70,55 60,60 40,60 C 20,60 10,55 10,35 Z" fill="#7a7a7a" stroke="#eaeaea" strokeWidth="2" />

    {/* White cheek highlights */}
    <path d="M 10,35 C 10,48 25,50 30,45" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M 70,35 C 70,48 55,50 50,45" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />

    {/* Black Raccoon Mask */}
    <path d="M 12,35 C 15,28 32,28 38,36 C 36,44 20,46 12,35 Z" fill="#2d2d2d" />
    <path d="M 68,35 C 65,28 48,28 42,36 C 44,44 60,46 68,35 Z" fill="#2d2d2d" />

    {/* Snout */}
    <polygon points="35,46 45,46 40,55" fill="#eaeaea" />
    <circle cx="40" cy="52" r="3.5" fill="#111" />

    {/* Eyes */}
    {!isWinking ? (
      <>
        {/* Left Eye */}
        <circle cx="25" cy="36" r="4.5" fill="#fff" />
        <circle cx="26" cy="35" r="2" fill="#000" />
        <circle cx="24" cy="37" r="0.8" fill="#fff" />
        {/* Right Eye */}
        <circle cx="55" cy="36" r="4.5" fill="#fff" />
        <circle cx="54" cy="35" r="2" fill="#000" />
        <circle cx="56" cy="37" r="0.8" fill="#fff" />
      </>
    ) : (
      <>
        {/* Left Eye (Open) */}
        <circle cx="25" cy="36" r="4.5" fill="#fff" />
        <circle cx="26" cy="35" r="2" fill="#000" />
        {/* Right Eye (Winking) */}
        <path d="M 50,36 Q 55,31 60,36" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </>
    )}

    {/* Blush */}
    {isHappy && (
      <>
        <ellipse cx="18" cy="43" rx="4" ry="2" fill="#e8a7b0" opacity="0.8" />
        <ellipse cx="62" cy="43" rx="4" ry="2" fill="#e8a7b0" opacity="0.8" />
      </>
    )}
  </svg>
);

export default function RaccoonCard() {
  const [raccoonState, setRaccoonState] = useState({
    isHappy: false,
    isWinking: false,
    bubbleText: '¡Hola Ness! Hazme clic.'
  });

  const raccoonPhrases = [
    '¡Hola Ness! Me encantan tus abrazos.',
    '¡Los mapaches dominaremos el mundo... después de tomar un café!',
    '¿Sabías que somos muy ordenados y lavamos todo?',
    '¡Eres la persona más asombrosa del universo entero!',
    '¡Dame una galleta y seré tu mejor amigo para siempre!',
    '¡Tibo te manda un abrazo mapache gigante y súper calientito!',
    '¡Guiño guiño! Estás preciosa hoy.'
  ];

  const handleRaccoonClick = (e) => {
    e.stopPropagation();
    playPopSynth();
    
    const randomPhrase = raccoonPhrases[Math.floor(Math.random() * raccoonPhrases.length)];
    const winking = Math.random() > 0.4;
    
    setRaccoonState({
      isHappy: true,
      isWinking: winking,
      bubbleText: randomPhrase
    });

    // Reset status after a few seconds
    setTimeout(() => {
      setRaccoonState(prev => ({
        ...prev,
        isHappy: false,
        isWinking: false
      }));
    }, 1800);
  };

  return (
    <Card 
      id="card-mapaches" 
      icon={<Smile />} 
      title="4. Los Mapaches Juguetones" 
      desc="Criaturas curiosas e inteligentes que te roban una sonrisa. Interactúa con él."
    >
      <div 
        style={{ 
          height: '140px', 
          background: 'rgba(0,0,0,0.3)', 
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
          padding: '10px'
        }}
        onClick={handleRaccoonClick}
      >
        {/* Dialogue Bubble */}
        <div style={{
          background: 'var(--purple-dark)',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: '15px',
          fontSize: '0.8rem',
          marginBottom: '10px',
          border: '1px solid var(--pink-light)',
          textAlign: 'center',
          maxWidth: '85%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          position: 'relative',
          animation: 'bounce-text 0.8s ease'
        }}>
          {raccoonState.bubbleText}
          {/* Arrow pointing down */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid var(--pink-light)'
          }} />
        </div>

        <div className="raccoon-container" style={{ transform: raccoonState.isHappy ? 'scale(1.05)' : 'none' }}>
          <SVGRaccoon isHappy={raccoonState.isHappy} isWinking={raccoonState.isWinking} />
        </div>
      </div>
    </Card>
  );
}
