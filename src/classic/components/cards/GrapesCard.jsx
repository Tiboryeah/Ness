import React, { useState } from 'react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

const SVGGrapeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
    <circle cx="12" cy="10" r="3.5" fill="#a2d149" />
    <circle cx="8" cy="13" r="3.5" fill="#9bc445" />
    <circle cx="16" cy="13" r="3.5" fill="#9bc445" />
    <circle cx="12" cy="16" r="3.5" fill="#8cb23e" />
    {/* Stem */}
    <path d="M12,6 Q11,3 8,4" fill="none" stroke="#6d4c41" strokeWidth="1.5" />
  </svg>
);

export default function GrapesCard() {
  // 12 grapes in the bunch
  const initialGrapes = [
    { id: 1, cx: 30, cy: 30, r: 10 },
    { id: 2, cx: 50, cy: 30, r: 10 },
    { id: 3, cx: 70, cy: 30, r: 10 },
    { id: 4, cx: 40, cy: 45, r: 10 },
    { id: 5, cx: 60, cy: 45, r: 10 },
    { id: 6, cx: 80, cy: 45, r: 10 },
    { id: 7, cx: 50, cy: 60, r: 10 },
    { id: 8, cx: 70, cy: 60, r: 10 },
    { id: 9, cx: 60, cy: 75, r: 10 },
    { id: 10, cx: 50, cy: 75, r: 10 },
    { id: 11, cx: 55, cy: 90, r: 10 },
    { id: 12, cx: 65, cy: 90, r: 10 }
  ];

  const [grapes, setGrapes] = useState(initialGrapes);
  const [eatenCount, setEatenCount] = useState(0);

  const handleGrapeClick = (id, e) => {
    e.stopPropagation();
    playPopSynth();
    setGrapes(prev => prev.filter(g => g.id !== id));
    setEatenCount(prev => prev + 1);
  };

  const resetGrapes = (e) => {
    e.stopPropagation();
    playPopSynth();
    setGrapes(initialGrapes);
  };

  return (
    <Card 
      id="card-uvas" 
      icon={<SVGGrapeIcon />} 
      title="8. Las Uvas Verdes" 
      desc="Un bocado dulce y refrescante. Haz clic en las uvas para ir comiéndotelas una a una."
    >
      <div 
        style={{ 
          height: '140px', 
          background: 'rgba(0,0,0,0.3)', 
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
        {grapes.length > 0 ? (
          <svg width="120" height="110" viewBox="0 0 120 110">
            {/* Vine stem */}
            <path d="M 50 10 Q 55 25 50 30" fill="none" stroke="#6d4c41" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 50 15 Q 40 10 32 15" fill="none" stroke="#81c784" strokeWidth="2.5" strokeLinecap="round" />

            {/* Grapes rendering */}
            {grapes.map(g => (
              <circle
                key={g.id}
                cx={g.cx}
                cy={g.cy}
                r={g.r}
                fill="url(#greenGrapeGrad)"
                stroke="#689f38"
                strokeWidth="1"
                onClick={(e) => handleGrapeClick(g.id, e)}
                style={{ 
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))'
                }}
              />
            ))}

            {/* Gradients */}
            <defs>
              <radialGradient id="greenGrapeGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#d4e157" />
                <stop offset="60%" stopColor="#9ccc65" />
                <stop offset="100%" stopColor="#558b2f" />
              </radialGradient>
            </defs>
          </svg>
        ) : (
          <div style={{ textAlign: 'center', color: '#fff', fontSize: '0.82rem' }}>
            <p style={{ marginBottom: '8px' }}>¡Te has comido todas las uvas!</p>
            <button className="action-btn" onClick={resetGrapes} style={{ fontSize: '0.75rem', padding: '5px 10px' }}>
              Servir más uvas
            </button>
          </div>
        )}

        {/* Eaten counter */}
        {grapes.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '12px',
            fontSize: '0.72rem',
            color: 'var(--pink-pastel)',
            fontWeight: '600'
          }}>
            Comidas: {eatenCount}
          </div>
        )}
      </div>
    </Card>
  );
}
