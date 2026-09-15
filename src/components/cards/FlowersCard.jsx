import React, { useState } from 'react';
import { Flower2, Sun, Sparkles, Wind, Heart } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

function BotanicalIllustration({ type, color }) {
  const petals = Array.from({ length: type === 'girasoles' ? 18 : 6 });
  const tinyBlooms = Array.from({ length: 17 });
  return (
    <svg className={`botanical-art botanical-${type}`} viewBox="0 0 560 360" role="img" aria-label={`Ilustración animada de ${type}`}>
      <defs>
        <linearGradient id={`stem-${type}`} x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#315340" /><stop offset="1" stopColor="#b9ff66" />
        </linearGradient>
        <radialGradient id={`bloom-${type}`}>
          <stop stopColor="#fff7d1" /><stop offset=".5" stopColor={color} /><stop offset="1" stopColor={color} stopOpacity=".28" />
        </radialGradient>
        <filter id={`soft-${type}`} x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>
      <g className="botanical-grid" opacity=".17"><path d="M40 300H520M40 240H520M40 180H520M40 120H520M100 50V320M220 50V320M340 50V320M460 50V320" /></g>
      <ellipse className="botanical-aura" cx="280" cy="170" rx="155" ry="115" fill={color} opacity=".1" filter={`url(#soft-${type})`} />

      {type === 'nube' && (
        <g className="plant plant-cloud">
          {[145, 205, 270, 335, 405].map((x, i) => <path key={x} className="stem-line" d={`M280 326 Q ${x + (i % 2 ? 40 : -30)} 225 ${x} ${80 + (i % 3) * 26}`} stroke={`url(#stem-${type})`} />)}
          {tinyBlooms.map((_, i) => {
            const x = 125 + (i * 73) % 315;
            const y = 65 + (i * 47) % 150;
            return <g key={i} className="tiny-bloom" style={{ '--i': i }} transform={`translate(${x} ${y})`}><circle r="12" fill="none" stroke={color} opacity=".3" /><circle cx="-7" cy="-4" r="5" fill="#f3efe7" /><circle cx="7" cy="-4" r="5" fill="#f3efe7" /><circle cy="7" r="5" fill="#f3efe7" /><circle r="2.4" fill="#b9ff66" /></g>;
          })}
        </g>
      )}

      {type === 'girasoles' && (
        <g className="plant plant-sunflower">
          <path className="stem-line main-stem" d="M278 330 Q260 232 282 151" stroke={`url(#stem-${type})`} />
          <path className="botanical-leaf" d="M272 255 Q190 198 168 250 Q218 278 272 267Z" />
          <path className="botanical-leaf leaf-right" d="M275 218 Q350 171 382 220 Q330 252 277 235Z" />
          <g className="flower-head" transform="translate(282 126)">
            {petals.map((_, i) => <ellipse key={i} className="sun-petal" style={{ '--i': i }} cx="0" cy="-58" rx="15" ry="42" fill={color} transform={`rotate(${i * 20})`} />)}
            <circle r="52" fill="#3d2719" /><circle r="43" fill="none" stroke="#f2a719" strokeWidth="12" strokeDasharray="2 7" />
            <circle r="27" fill="#211510" /><circle r="18" fill="none" stroke="#8e5b20" strokeWidth="2" strokeDasharray="1 4" />
          </g>
        </g>
      )}

      {type === 'lirios' && (
        <g className="plant plant-lily">
          {[225, 280, 335].map((x, i) => <path key={x} className="stem-line" d={`M280 330 Q ${x + 15} 230 ${x} ${125 + i * 8}`} stroke={`url(#stem-${type})`} />)}
          {[225, 280, 335].map((x, flowerIndex) => (
            <g key={x} className="lily-head" style={{ '--i': flowerIndex }} transform={`translate(${x} ${125 + flowerIndex * 8})`}>
              {petals.map((_, i) => <path key={i} className="lily-petal" d="M0 0 Q-22-46 0-70 Q22-46 0 0Z" fill={`url(#bloom-${type})`} transform={`rotate(${i * 60})`} />)}
              {Array.from({ length: 8 }).map((_, i) => <path key={i} className="lily-stamen" d={`M0 0 Q${(i - 4) * 10} -55 ${(i - 4) * 15} -74`} />)}
            </g>
          ))}
        </g>
      )}

      {type === 'tulipanes' && (
        <g className="plant plant-tulips">
          {[205, 280, 360].map((x, i) => (
            <g key={x} className="tulip" style={{ '--i': i }}>
              <path className="stem-line" d={`M280 330 Q${x} 252 ${x} ${125 + i * 18}`} stroke={`url(#stem-${type})`} />
              <path className="botanical-leaf" d={`M${x} 255 Q${x - 64} 220 ${x - 55} 286 Q${x - 20} 278 ${x} 266Z`} />
              <g className="tulip-cup" transform={`translate(${x} ${115 + i * 18})`}>
                <path d="M0 45 Q-52 18-42-38 Q-17-28 0-5 Q16-31 42-38 Q52 18 0 45Z" fill={`url(#bloom-${type})`} />
                <path d="M0 43 Q-27 12 0-38 Q28 12 0 43Z" fill={color} opacity=".72" />
              </g>
            </g>
          ))}
        </g>
      )}

      {Array.from({ length: 9 }).map((_, i) => <circle key={i} className="pollen-dot" style={{ '--i': i }} cx={85 + (i * 61) % 420} cy={70 + (i * 83) % 210} r={1.5 + (i % 3)} fill={i % 2 ? color : '#b9ff66'} />)}
      <g className="botanical-caption"><path d="M38 326H120" /><text x="38" y="318">HERBARIUM · 05</text><text x="438" y="318">BLOOM STUDY</text></g>
    </svg>
  );
}

export default function FlowersCard() {
  const [selectedFlower, setSelectedFlower] = useState('nube');
  const [bloomEpoch, setBloomEpoch] = useState(0);

  const flowers = {
    nube: {
      name: 'Flor Nube (Gypsophila)',
      icon: <Wind size={16} />,
      symbol: 'Ternura, pureza y delicadeza eterna',
      color: '#e2e8f0',
      tag: 'Elegancia Sutil',
      meaning: 'Pequeñas constelaciones blancas que complementan y hacen brillar todo lo que las rodea. Transmiten paz y dulzura inmediata.'
    },
    girasoles: {
      name: 'Girasoles',
      icon: <Sun size={16} />,
      symbol: 'Luz, vitalidad y energía inagotable',
      color: '#f59e0b',
      tag: 'Calidez Solar',
      meaning: 'Flores majestuosas que siempre buscan el sol, iluminando cualquier rincón con su optimismo radiante y su porte imponente.'
    },
    lirios: {
      name: 'Lirios Rojos',
      icon: <Sparkles size={16} />,
      symbol: 'Misterio, pasión y belleza profunda',
      color: '#ef4444',
      tag: 'Pasión Carmesí',
      meaning: 'Conocidos también como lirios de araña roja (Higanbana), evocan fuerza, elegancia poética y una atracción magnética inolvidable.'
    },
    tulipanes: {
      name: 'Tulipanes',
      icon: <Heart size={16} />,
      symbol: 'Amor sincero, gracia y renacimiento',
      color: '#ec4899',
      tag: 'Gracia & Encanto',
      meaning: 'Siluetas perfectas y estilizadas que representan afecto auténtico, armonía y la belleza de los comienzos memorables.'
    }
  };

  const current = flowers[selectedFlower];

  const handleSelect = (key, e) => {
    e.stopPropagation();
    playPopSynth();
    setSelectedFlower(key);
    setBloomEpoch((value) => value + 1);
  };

  return (
    <Card
      id="card-flowers"
      icon={<Flower2 size={22} />}
      title="5. El Jardín Botánico de Ratita"
      desc="Un ramillete dedicado a tus flores predilectas, cada una con su propia magia y encanto."
    >
      <div className="flowers-card-body">
        {/* Flower selector tabs */}
        <div className="flower-nav-chips">
          {Object.keys(flowers).map((key) => {
            const f = flowers[key];
            const isSelected = selectedFlower === key;
            return (
              <button
                key={key}
                type="button"
                className={`flower-chip ${isSelected ? 'active-flower-chip' : ''}`}
                style={isSelected ? { borderColor: f.color, color: f.color } : {}}
                onClick={(e) => handleSelect(key, e)}
              >
                {f.icon}
                <span>{f.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Botanical Visual Display */}
        <div className="flower-display-frame">
          <BotanicalIllustration key={`${selectedFlower}-${bloomEpoch}`} type={selectedFlower} color={current.color} />
          <div className="flower-badge-tag" style={{ color: current.color, borderColor: current.color }}>
            <Sparkles size={13} />
            <span>{current.tag}</span>
          </div>
        </div>

        {/* Meaning and description */}
        <div className="flower-info-box">
          <h4 className="flower-display-title" style={{ color: current.color }}>
            {current.name}
          </h4>
          <p className="flower-symbol-text">
            <strong>Significado:</strong> {current.symbol}
          </p>
          <p className="flower-meaning-desc">{current.meaning}</p>
        </div>
      </div>
    </Card>
  );
}
