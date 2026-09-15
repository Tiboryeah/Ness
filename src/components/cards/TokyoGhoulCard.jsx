import React, { useState } from 'react';
import { Flame, Moon, Coffee, ShieldAlert } from 'lucide-react';
import Card from '../Card';
import { playClickSynth } from '../../utils/audio';

export default function TokyoGhoulCard() {
  const [ghoulMode, setGhoulMode] = useState(false);

  const toggleMode = (e) => {
    e.stopPropagation();
    playClickSynth();
    setGhoulMode((prev) => !prev);
  };

  return (
    <Card
      id="card-tokyo-ghoul"
      icon={<Flame size={22} />}
      title="3. Anime & Dark Aesthetic: Tokyo Ghoul"
      desc="La dualidad entre la calma y la tempestad, envuelta en lirios rojos y sombras de Tokio."
    >
      <div className={`tokyo-card-body ${ghoulMode ? 'ghoul-active' : 'anteiku-active'}`}>
        {/* Visual Hero */}
        <div className="tokyo-visual-frame">
          <img
            src="/images/anteiku-calm.webp"
            alt="Joven tomando café junto a una ventana lluviosa"
            className="tokyo-character-img tokyo-calm-img"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/images/ghoul-awakening.webp"
            alt="Transformación ghoul entre luces carmesí"
            className="tokyo-character-img tokyo-ghoul-img"
            loading="lazy"
            decoding="async"
          />
          <div className="ghoul-slash slash-one" />
          <div className="ghoul-slash slash-two" />
          <div className="ghoul-eye-flare" />
          <div className="tokyo-atmosphere-overlay" />
          <div className="tokyo-mode-badge">
            {ghoulMode ? (
              <>
                <ShieldAlert size={14} className="icon-pulse-red" />
                <span>Modo Ghoul (Ojo Carmesí)</span>
              </>
            ) : (
              <>
                <Coffee size={14} />
                <span>Café Anteiku</span>
              </>
            )}
          </div>
        </div>

        {/* Narrative & Quote */}
        <div className="tokyo-text-box">
          <blockquote className="tokyo-quote">
            {ghoulMode
              ? '“No soy yo el que está equivocado... lo que está equivocado es este mundo.”'
              : '“A veces las mejores personas sufren más por proteger a quienes aman.”'}
          </blockquote>
          <p className="tokyo-lore">
            {ghoulMode
              ? 'Poder desatado, mirada decidida y la belleza misteriosa de los lirios de araña roja floreciendo en la oscuridad.'
              : 'El aroma a café recién molido, la serenidad previa a la batalla y los lazos que jamás se rompen.'}
          </p>
        </div>

        {/* Mode Switcher Button */}
        <div className="tokyo-action-bar">
          <button 
            type="button" 
            className={`tokyo-toggle-btn ${ghoulMode ? 'btn-ghoul' : 'btn-anteiku'}`}
            onClick={toggleMode}
          >
            <Moon size={16} />
            <span>{ghoulMode ? 'Volver a la Calma de Anteiku' : 'Desatar Modo Ghoul'}</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
