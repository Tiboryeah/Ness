import React, { useState } from 'react';
import { Citrus, Sparkles, Check, Droplets } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

// Custom Animated SVG: Mango Tropical Jugoso
function AnimatedMango({ isRevealed }) {
  return (
    <div className={`animated-fruit-stage ${isRevealed ? 'fruit-revealed' : ''}`}>
      <svg 
        viewBox="0 0 240 200" 
        className="fruit-svg-illustration"
        style={{ filter: 'drop-shadow(0 10px 25px rgba(245, 158, 11, 0.45))' }}
      >
        <defs>
          {/* Main Mango Body Gradient */}
          <linearGradient id="mangoBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>

          {/* Leaf Gradient */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Juicy Cube Gradient */}
          <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="fruitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Glow Aura */}
        <circle cx="120" cy="105" r="70" fill="rgba(245, 158, 11, 0.12)" />

        {/* Stem */}
        <path 
          d="M 120,42 Q 125,28 135,22" 
          stroke="#78350f" 
          strokeWidth="6" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Green Leaf with gentle sway */}
        <g className="leaf-sway">
          <path 
            d="M 124,35 Q 165,22 175,42 Q 155,56 124,35 Z" 
            fill="url(#leafGrad)" 
            stroke="#166534" 
            strokeWidth="1.5" 
          />
          <path d="M 125,36 Q 148,35 168,43" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
        </g>

        {/* Main Mango Curved Silhouette */}
        <g className="mango-bounce-group">
          <path 
            d="M 115,40 C 65,40 45,75 50,115 C 55,155 90,178 128,175 C 172,172 195,138 190,95 C 185,55 155,40 115,40 Z" 
            fill="url(#mangoBodyGrad)" 
          />

          {/* Glossy highlight streak */}
          <path 
            d="M 75,65 Q 60,105 70,135" 
            stroke="rgba(255,255,255,0.45)" 
            strokeWidth="5" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* Mango Hedgehog cut grid (diced cubes of mango) */}
          <g transform="translate(100, 78)">
            <rect x="0" y="0" width="22" height="22" rx="4" fill="url(#cubeGrad)" stroke="#b45309" strokeWidth="1" className="fruit-piece cube-pulse-1" />
            <rect x="26" y="0" width="22" height="22" rx="4" fill="url(#cubeGrad)" stroke="#b45309" strokeWidth="1" className="fruit-piece cube-pulse-2" />
            <rect x="52" y="4" width="18" height="18" rx="4" fill="url(#cubeGrad)" stroke="#b45309" strokeWidth="1" className="fruit-piece cube-pulse-3" />
            
            <rect x="4" y="26" width="22" height="22" rx="4" fill="url(#cubeGrad)" stroke="#b45309" strokeWidth="1" className="fruit-piece cube-pulse-2" />
            <rect x="30" y="26" width="22" height="22" rx="4" fill="url(#cubeGrad)" stroke="#b45309" strokeWidth="1" className="fruit-piece cube-pulse-1" />
            <rect x="54" y="26" width="16" height="20" rx="4" fill="url(#cubeGrad)" stroke="#b45309" strokeWidth="1" className="fruit-piece cube-pulse-3" />

            <rect x="12" y="52" width="20" height="18" rx="4" fill="url(#cubeGrad)" stroke="#b45309" strokeWidth="1" className="fruit-piece cube-pulse-3" />
            <rect x="36" y="52" width="18" height="18" rx="4" fill="url(#cubeGrad)" stroke="#b45309" strokeWidth="1" className="fruit-piece cube-pulse-2" />
          </g>

          {/* Floating Honey / Juice droplets */}
          <circle cx="165" cy="155" r="4.5" fill="#fde047" className="juice-drop-1" />
          <circle cx="180" cy="140" r="3" fill="#fbbf24" className="juice-drop-2" />
          <circle cx="75" cy="150" r="3.5" fill="#fde047" className="juice-drop-3" />
        </g>
      </svg>
    </div>
  );
}

// Custom Animated SVG: Racimo de Uvas Verdes Refrescantes
function AnimatedGrapes({ isRevealed }) {
  const grapesList = [
    // Top row
    { cx: 98, cy: 70, r: 15 },
    { cx: 122, cy: 68, r: 16 },
    { cx: 144, cy: 72, r: 15 },
    // Second row
    { cx: 86, cy: 94, r: 16 },
    { cx: 110, cy: 92, r: 17, center: true },
    { cx: 134, cy: 94, r: 16 },
    { cx: 156, cy: 96, r: 14 },
    // Third row
    { cx: 96, cy: 118, r: 16 },
    { cx: 120, cy: 116, r: 17, center: true },
    { cx: 142, cy: 120, r: 15 },
    // Fourth row
    { cx: 108, cy: 140, r: 15 },
    { cx: 130, cy: 142, r: 14 },
    // Bottom tip
    { cx: 120, cy: 162, r: 13 }
  ];

  return (
    <div className={`animated-fruit-stage ${isRevealed ? 'fruit-revealed' : ''}`}>
      <svg 
        viewBox="0 0 240 200" 
        className="fruit-svg-illustration"
        style={{ filter: 'drop-shadow(0 10px 25px rgba(16, 185, 129, 0.45))' }}
      >
        <defs>
          {/* Grape Spherical Gradient */}
          <radialGradient id="grapeGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#d9f99d" />
            <stop offset="40%" stopColor="#4ade80" />
            <stop offset="85%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#064e3b" />
          </radialGradient>

          {/* Translucent Highlight */}
          <radialGradient id="grapeGlow" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#f7fee7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#86efac" stopOpacity="0" />
          </radialGradient>

          {/* Vine Gradient */}
          <linearGradient id="vineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>

        {/* Ambient Glow Aura */}
        <circle cx="120" cy="115" r="75" fill="rgba(16, 185, 129, 0.12)" />

        {/* Vine Stem and Tendrils */}
        <path 
          d="M 120,30 Q 120,55 120,70 M 120,45 Q 145,35 160,48 Q 170,58 165,70" 
          stroke="url(#vineGrad)" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
          fill="none" 
        />
        {/* Curly tendril */}
        <path 
          d="M 120,40 Q 95,25 90,38 Q 85,50 100,55" 
          stroke="#65a30d" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Grape leaf */}
        <g className="leaf-sway">
          <path 
            d="M 122,45 C 135,30 160,35 158,52 C 156,65 138,62 122,45 Z" 
            fill="#22c55e" 
            stroke="#15803d" 
            strokeWidth="1.2" 
          />
        </g>

        {/* Grapes Cluster */}
        <g className="grapes-cluster-group">
          {grapesList.map((g, idx) => (
            <g key={idx} className={`grape-node grape-node-${(idx % 4) + 1}`} style={{ '--grape-index': idx }}>
              <circle 
                cx={g.cx} 
                cy={g.cy} 
                r={g.r} 
                fill="url(#grapeGrad)" 
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
              />
              {/* Glossy specular dot */}
              <ellipse 
                cx={g.cx - g.r * 0.32} 
                cy={g.cy - g.r * 0.35} 
                rx={g.r * 0.3} 
                ry={g.r * 0.2} 
                fill="#ffffff" 
                opacity="0.8" 
                transform={`rotate(-25 ${g.cx} ${g.cy})`}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default function FruitCard() {
  const [selectedFruit, setSelectedFruit] = useState('mango'); // 'mango' or 'grapes'
  const [isRevealed, setIsRevealed] = useState(false);

  const fruits = {
    mango: {
      title: 'Mango Tropical Dulce',
      subtitle: 'El rey dorado de la frescura',
      badge: 'Cálido & Exótico',
      badgeColor: '#f59e0b',
      accentColor: 'var(--fruit-mango)',
      description: 'Cremoso, lleno de sol, cortado en cubitos dorados rebosantes de néctar irresistible.',
      note: 'Dulzura pura para alegrar el día de Ratita.'
    },
    grapes: {
      title: 'Uva Verde Cristalina',
      subtitle: 'Crujiente, ácida y refrescante',
      badge: 'Fresco & Vital',
      badgeColor: '#10b981',
      accentColor: 'var(--green-mint)',
      description: 'Racimos de esmeraldas brillantes, crocantes con cada mordisco y con esa acidez perfecta que encanta.',
      note: 'La frescura favorita que nunca cansa.'
    }
  };

  const active = fruits[selectedFruit];

  const handleSelect = (fruitKey, e) => {
    e.stopPropagation();
    playPopSynth();
    setSelectedFruit(fruitKey);
    setIsRevealed(false);
  };

  const handleBite = (e) => {
    e.stopPropagation();
    playPopSynth();
    setIsRevealed((value) => !value);
  };

  return (
    <Card
      id="card-fruits"
      icon={<Citrus size={22} />}
      title="2. Gabinete de Frutas"
      desc="Dos sabores convertidos en pequeñas piezas de estudio: color, textura y frescura."
    >
      <div className="fruit-card-body">
        {/* Switcher tabs */}
        <div className="fruit-toggle-bar">
          <button 
            type="button" 
            className={`fruit-tab ${selectedFruit === 'mango' ? 'active-mango' : ''}`}
            onClick={(e) => handleSelect('mango', e)}
          >
            <span>Mango</span>
            {selectedFruit === 'mango' && <Check size={14} />}
          </button>
          <button 
            type="button" 
            className={`fruit-tab ${selectedFruit === 'grapes' ? 'active-grapes' : ''}`}
            onClick={(e) => handleSelect('grapes', e)}
          >
            <span>Uva Verde</span>
            {selectedFruit === 'grapes' && <Check size={14} />}
          </button>
        </div>

        {/* Dynamic Animated Vector Stage */}
        <div 
          className="fruit-interactive-stage"
          onClick={handleBite}
          title="Toca para revelar su anatomía"
        >
          <div className="fruit-orbit orbit-one" aria-hidden="true" />
          <div className="fruit-orbit orbit-two" aria-hidden="true" />
          <span className="fruit-specimen-index">FR—0{selectedFruit === 'mango' ? '1' : '2'}</span>
          {selectedFruit === 'mango' ? (
            <AnimatedMango isRevealed={isRevealed} />
          ) : (
            <AnimatedGrapes isRevealed={isRevealed} />
          )}

          <div className={`fruit-scan ${isRevealed ? 'scan-active' : ''}`} aria-hidden="true" />
          <div className={`fruit-profile ${isRevealed ? 'profile-visible' : ''}`}>
            <span>PERFIL</span>
            <strong>{selectedFruit === 'mango' ? 'DULCE · SOLAR' : 'ÁCIDO · CRISTALINO'}</strong>
          </div>

          <div 
            className="fruit-badge"
            style={{ borderColor: active.badgeColor, color: active.badgeColor }}
          >
            <Sparkles size={13} />
            <span>{active.badge}</span>
          </div>

          <div className="fruit-tap-hint">
            <Droplets size={13} />
            <span>{isRevealed ? 'Toca para recomponer' : 'Toca para revelar el corte'}</span>
          </div>
        </div>

        {/* Fruit Detail text */}
        <div className="fruit-details-box">
          <h4 className="fruit-title-text">{active.title}</h4>
          <p className="fruit-desc-text">{active.description}</p>
          <div className="fruit-subnote">
            <em>"{active.note}"</em>
          </div>
        </div>
      </div>
    </Card>
  );
}
