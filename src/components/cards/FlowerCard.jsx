import React, { useState, useRef } from 'react';
import { Flower } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

// Custom Lily SVG (Lirio)
const SVGLily = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
  >
    {/* Overlapping white petals for a realistic lily */}
    <path d="M16 2 C18 10 22 14 16 16 C10 14 14 10 16 2 Z" fill="#ffffff" />
    <path d="M16 30 C14 22 10 18 16 16 C22 18 18 22 16 30 Z" fill="#ffffff" />
    <path d="M2 16 C10 14 14 10 16 16 C14 22 10 18 2 16 Z" fill="#ffffff" />
    <path d="M30 16 C22 18 18 22 16 16 C18 10 22 14 30 16 Z" fill="#ffffff" />
    
    <path d="M6 6 C12 10 14 12 16 16 C12 14 10 12 6 6 Z" fill="#fafafa" />
    <path d="M26 26 C20 22 18 20 16 16 C20 18 22 20 26 26 Z" fill="#fafafa" />
    <path d="M26 6 C20 10 18 12 16 16 C20 14 22 12 26 6 Z" fill="#fafafa" />
    <path d="M6 26 C12 22 14 20 16 16 C12 18 10 20 6 26 Z" fill="#fafafa" />
    
    {/* Golden center pistil / stamens */}
    <circle cx="16" cy="16" r="3" fill="#d4af37" />
    <path d="M16 16 L16 10 M16 16 L12 13 M16 16 L20 13 M16 16 L12 19 M16 16 L20 19 M16 16 L16 22" stroke="#d4af37" strokeWidth="1" />
    <circle cx="16" cy="9" r="1" fill="#c73e55" />
    <circle cx="11" cy="12" r="1" fill="#c73e55" />
    <circle cx="21" cy="12" r="1" fill="#c73e55" />
    <circle cx="11" cy="20" r="1" fill="#c73e55" />
    <circle cx="21" cy="20" r="1" fill="#c73e55" />
    <circle cx="16" cy="23" r="1" fill="#c73e55" />
  </svg>
);

// Custom Hydrangea SVG (Hortensia / Ortencia)
const SVGHydrangea = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
  >
    {/* Cluster of blue/indigo flowers */}
    <circle cx="16" cy="10" r="5.5" fill="#7baaf7" />
    <circle cx="10" cy="16" r="5.5" fill="#8e89f7" />
    <circle cx="22" cy="16" r="5.5" fill="#6bb5f7" />
    <circle cx="16" cy="22" r="5.5" fill="#9f8bf7" />
    <circle cx="16" cy="16" r="7" fill="#a79bf7" />
    
    {/* Small white cores */}
    <circle cx="16" cy="10" r="1.2" fill="#fff" />
    <circle cx="10" cy="16" r="1.2" fill="#fff" />
    <circle cx="22" cy="16" r="1.2" fill="#fff" />
    <circle cx="16" cy="22" r="1.2" fill="#fff" />
    <circle cx="16" cy="16" r="1.5" fill="#fff" />
  </svg>
);

// Custom Gerbera SVG
const SVGGerbera = () => {
  const petals = [];
  for (let i = 0; i < 12; i++) {
    petals.push(i);
  }
  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
    >
      <g>
        {petals.map(i => {
          const angle = i * 30;
          return (
            <ellipse 
              key={i}
              cx="16" 
              cy="7" 
              rx="3" 
              ry="7" 
              fill="#e23c55" 
              transform={`rotate(${angle}, 16, 16)`} 
            />
          );
        })}
      </g>
      {/* Dark brown & gold core */}
      <circle cx="16" cy="16" r="5.5" fill="#3a141a" />
      <circle cx="16" cy="16" r="3.5" fill="#120205" />
      <circle cx="16" cy="16" r="1.5" fill="#d4af37" />
    </svg>
  );
};

export default function FlowerCard() {
  const [flowers, setFlowers] = useState([]);
  const [selectedType, setSelectedType] = useState('lily'); // 'lily', 'hydrangea', 'gerbera'
  const gardenRef = useRef(null);

  const handleGardenClick = (e) => {
    // Avoid double clicks on existing flowers
    if (e.target.closest('.grown-flower')) return;

    playPopSynth();
    const garden = gardenRef.current;
    if (!garden) return;

    const rect = garden.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotate = Math.random() * 60 - 30; // random tilt

    const newFlower = {
      id: Date.now() + Math.random(),
      x: x - 16, // center flower (size 32px / 2 = 16)
      y: y - 16,
      type: selectedType,
      rotate
    };

    setFlowers(prev => {
      const updated = [...prev, newFlower];
      if (updated.length > 25) {
        updated.shift();
      }
      return updated;
    });
  };

  const clearGarden = (e) => {
    e.stopPropagation();
    setFlowers([]);
  };

  return (
    <Card 
      id="card-flores" 
      icon={<Flower />} 
      title="1. El Jardín de Ness" 
      desc="Lirios, hortensias y gerberas. Elige tu flor favorita y haz clic en el jardín para sembrarla."
    >
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '10px' }}>
        <button 
          className={`action-btn ${selectedType === 'lily' ? 'active-tab' : ''}`}
          onClick={(e) => { e.stopPropagation(); setSelectedType('lily'); }}
          style={{ 
            fontSize: '0.8rem', 
            padding: '6px 12px',
            backgroundColor: selectedType === 'lily' ? 'var(--pink-light)' : 'rgba(255,255,255,0.05)',
            border: selectedType === 'lily' ? '1px solid #fff' : '1px solid transparent'
          }}
        >
          Lirio
        </button>
        <button 
          className={`action-btn ${selectedType === 'hydrangea' ? 'active-tab' : ''}`}
          onClick={(e) => { e.stopPropagation(); setSelectedType('hydrangea'); }}
          style={{ 
            fontSize: '0.8rem', 
            padding: '6px 12px',
            backgroundColor: selectedType === 'hydrangea' ? 'var(--pink-light)' : 'rgba(255,255,255,0.05)',
            border: selectedType === 'hydrangea' ? '1px solid #fff' : '1px solid transparent'
          }}
        >
          Hortensia
        </button>
        <button 
          className={`action-btn ${selectedType === 'gerbera' ? 'active-tab' : ''}`}
          onClick={(e) => { e.stopPropagation(); setSelectedType('gerbera'); }}
          style={{ 
            fontSize: '0.8rem', 
            padding: '6px 12px',
            backgroundColor: selectedType === 'gerbera' ? 'var(--pink-light)' : 'rgba(255,255,255,0.05)',
            border: selectedType === 'gerbera' ? '1px solid #fff' : '1px solid transparent'
          }}
        >
          Gerbera
        </button>
      </div>

      <div 
        className="garden-area" 
        ref={gardenRef}
        onClick={handleGardenClick}
        style={{ height: '140px' }}
      >
        {flowers.length === 0 && (
          <div className="garden-tip">¡Haz clic para plantar flores!</div>
        )}
        {flowers.map(f => (
          <div 
            key={f.id} 
            className="grown-flower" 
            style={{ 
              left: `${f.x}px`, 
              top: `${f.y}px`,
              transform: `rotate(${f.rotate}deg)`,
              '--flower-rotate': `${f.rotate}deg`
            }}
          >
            {f.type === 'lily' && <SVGLily />}
            {f.type === 'hydrangea' && <SVGHydrangea />}
            {f.type === 'gerbera' && <SVGGerbera />}
          </div>
        ))}
      </div>
      
      {flowers.length > 0 && (
        <button 
          className="action-btn" 
          onClick={clearGarden}
          style={{ padding: '5px 12px', fontSize: '0.75rem', marginTop: '5px', alignSelf: 'center' }}
        >
          Limpiar Jardín
        </button>
      )}
    </Card>
  );
}
