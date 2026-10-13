import React, { useState } from 'react';
import { Heart, Sparkles, Wand2, Star } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

export default function CuteCornerCard({ onTriggerCandyRain }) {
  const [activeTab, setActiveTab] = useState('ternurines'); // 'ternurines' or 'chiikawa'

  const handleTabChange = (tab, e) => {
    e.stopPropagation();
    playPopSynth();
    setActiveTab(tab);
  };

  const handleHugRain = (e) => {
    e.stopPropagation();
    if (onTriggerCandyRain) {
      onTriggerCandyRain();
    }
  };

  return (
    <Card
      id="card-cute-corner"
      icon={<Heart size={22} />}
      title="6. Rincón Cute: Ternurines & Chiikawa"
      desc="La dosis perfecta de cosas bonitas, rositas y adorables que alegran el corazón al instante."
    >
      <div className="cute-card-body">
        {/* Toggle tabs */}
        <div className="cute-tabs-bar">
          <button
            type="button"
            className={`cute-tab-btn ${activeTab === 'ternurines' ? 'active-cute-tab' : ''}`}
            onClick={(e) => handleTabChange('ternurines', e)}
          >
            <Sparkles size={14} />
            <span>Ternurines (Sylvanian)</span>
          </button>
          <button
            type="button"
            className={`cute-tab-btn ${activeTab === 'chiikawa' ? 'active-cute-tab' : ''}`}
            onClick={(e) => handleTabChange('chiikawa', e)}
          >
            <Star size={14} />
            <span>Chiikawa</span>
          </button>
        </div>

        {/* Display showcase */}
        <div className="cute-showcase-frame">
          {activeTab === 'ternurines' ? (
            <div className="cute-content-block">
              <img 
                src="/images/ternurines-tea-party.webp" 
                alt="Ternurines Sylvanian Families" 
                className="cute-image-display"
                loading="lazy"
                decoding="async"
              />
              <div className="cute-tag-overlay">
                <Heart size={14} />
                <span>Mundo Calico Critters</span>
              </div>
            </div>
          ) : (
            <div className="cute-content-block chiikawa-block">
              <div className="chiikawa-group-frame">
                <img 
                  src="/images/chiikawa-friends.webp" 
                  alt="Chiikawa, Hachiware, Usagi y sus amigos reunidos" 
                  className="chiikawa-main-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="cute-tag-overlay">
                <Sparkles size={14} />
                <span>Nanka Chiisakute Kawaii Yatsu</span>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="cute-desc-box">
          {activeTab === 'ternurines' ? (
            <>
              <h4 className="cute-heading">Pequeñas Familias del Bosque</h4>
              <p className="cute-text">
                Ropitas diminutas hechas a mano, caritas afelpadas y una vida pacífica llena de meriendas, aventuras y mucha ternura.
              </p>
            </>
          ) : (
            <>
              <h4 className="cute-heading">Chiikawa y sus Grandes Emociones</h4>
              <p className="cute-text">
                Pequeñito, sensible pero valiente. Cada paso que da es una tierna lección de bondad, amistad pura y dulzura sin igual.
              </p>
            </>
          )}
        </div>

        {/* Trigger Shower Button */}
        <div className="cute-actions-bar">
          <button 
            type="button" 
            className="cute-shower-btn"
            onClick={handleHugRain}
          >
            <Wand2 size={16} />
            <span>Detonar Lluvia de Ternura</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
