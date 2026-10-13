import React, { useState } from 'react';
import { Mail, MailOpen, Heart, Sparkles, Star, Zap } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

export default function LoveLetterCard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = (e) => {
    e.stopPropagation();
    playPopSynth();
    setIsOpen((prev) => !prev);
  };

  return (
    <Card
      id="card-love-letter"
      icon={isOpen ? <MailOpen size={22} /> : <Mail size={22} />}
      title="7. La Carta Secreta"
      desc="Unas palabras escritas especialmente para ti, guardadas en este sobre."
    >
      <div className="letter-card-body">
        {!isOpen ? (
          <button type="button" className="envelope-closed punk-envelope" onClick={toggleLetter} aria-label="Abrir la carta secreta">
            <span className="punk-tape tape-left" aria-hidden="true" />
            <span className="punk-tape tape-right" aria-hidden="true" />
            <span className="punk-staple staple-one" aria-hidden="true" />
            <span className="punk-staple staple-two" aria-hidden="true" />
            <span className="punk-postmark" aria-hidden="true"><Star size={14} /> 07 / SECRET</span>
            <span className="punk-warning"><Zap size={13} /> PRIVATE NOISE</span>
            <span className="punk-address">
              <small>ENTREGAR A</small>
              <strong>RATITA</strong>
              <em>sin intermediarios / sin censura</em>
            </span>
            <span className="envelope-flap" aria-hidden="true" />
            <span className="wax-seal">
              <Heart size={21} className="seal-heart" />
              <span className="seal-ring" />
            </span>
            <span className="envelope-prompt">ROMPE EL SELLO</span>
            <span className="envelope-to-from">
              <span>PARA: <strong>Ratita</strong></span>
              <span>DE: <strong>Tibo</strong></span>
            </span>
            <span className="punk-scribble" aria-hidden="true">NO ABRIR<br />SIN SENTIR</span>
          </button>
        ) : (
          <div className="letter-opened" onClick={toggleLetter}>
            <div className="letter-paper">
              <span className="letter-tape letter-tape-top" aria-hidden="true" />
              <span className="letter-tape letter-tape-side" aria-hidden="true" />
              <span className="letter-staple" aria-hidden="true" />
              <span className="letter-issue-mark" aria-hidden="true">ISSUE 07<br />NO CENSURA</span>
              <div className="letter-header">
                <span className="letter-title">Para mi Ratita,<br /><em>con mucho cariño</em></span>
                <Sparkles size={16} className="letter-sparkle" />
              </div>
              <div className="letter-content">
                <p>
                  Ratita, quise crear este rincón reuniendo todas las cosas que te hacen ser tan única: desde la chispa juguetona de los michis naranjosos hasta el contraste fascinante entre la energía rebelde del ska, el poder del rock y el misterio oscuro de Tokyo Ghoul.
                </p>
                <p>
                  Me encanta cómo tus gustos viajan con tanta naturalidad entre la fuerza de bandas como La Ley, Deftones y La Sekta Core, y la infinita ternura de Chiikawa, los Ternurines y el encanto de la flor nube o los tulipanes.
                </p>
                <p className="letter-highlight-phrase">
                  Aunque para todo el mundo seas mi linda Ratita, en este universo y en mi corazón tú siempre serás mi <strong>Reyna</strong>... y yo tu rey.
                </p>
                <p>
                  Espero que al recorrer este espacio sonrías tanto como yo sonreí preparándolo para ti. Eres una persona increíble, llena de colores únicos: negro, verde, morado y esos destellos de dulzura que iluminan todo.
                </p>
                <p className="letter-signature">
                  Siempre aquí,<br />
                  <strong>Tibo</strong>
                </p>
              </div>
              <button type="button" className="close-letter-hint">
                DOBLAR / GUARDAR / VOLVER AL RUIDO
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
