import React, { useState } from 'react';
import { Heart, Sparkles, Music2, Flame, Zap, ShieldAlert, Disc } from 'lucide-react';
import Card from '../Card';
import { playChimeSynth, playPopSynth } from '../../utils/audio';

function BatIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 30" width="28" height="14" aria-hidden="true">
      <path d="M32 27C26 17 20 12 13 10c2 3 2 6 1 9C9 16 5 15 1 16c7 5 12 9 17 13 3-5 8-7 14-2 6-5 11-3 14 2 5-4 10-8 17-13-4-1-8 0-13 3-1-3-1-6 1-9-7 2-13 7-19 17Z" fill="currentColor" />
    </svg>
  );
}

function GothicCross({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 32" width="16" height="22" aria-hidden="true">
      <path d="M9 2h6v7h7v6h-7v17H9V15H2V9h7V2z" fill="currentColor" />
    </svg>
  );
}

export default function BirthdayEngagementCard({ onTriggerBirthdayRain, onPlaySong, isPlaying, currentTrack }) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [ringBoxOpen, setRingBoxOpen] = useState(false);

  const handleBlowCandles = (e) => {
    e.stopPropagation();
    playChimeSynth();
    setCandlesBlown(true);
    if (onTriggerBirthdayRain) {
      onTriggerBirthdayRain();
    }
  };

  const handleRelight = (e) => {
    e.stopPropagation();
    playPopSynth();
    setCandlesBlown(false);
  };

  const toggleRingBox = (e) => {
    e.stopPropagation();
    playPopSynth();
    setRingBoxOpen((prev) => !prev);
  };

  const handlePlayQueen = (e) => {
    e.stopPropagation();
    playPopSynth();
    if (onPlaySong) {
      onPlaySong('loveofmylife');
    }
  };

  return (
    <Card
      id="card-birthday-engagement"
      icon={<GothicCross className="goth-header-cross" />}
      title="10. El Ritual: Cumpleaños & Promesa Eterna"
      desc="13 de Octubre: El día en que nació la reina de mi oscuridad, mi prometida en las sombras."
    >
      <div className="birthday-card-container goth-birthday-container">
        {/* Punk & Goth Zine Banner */}
        <div className="goth-banner-box">
          <span className="punk-tape tape-left" aria-hidden="true" />
          <span className="punk-tape tape-right" aria-hidden="true" />
          <span className="punk-staple staple-one" aria-hidden="true" />
          <span className="punk-staple staple-two" aria-hidden="true" />

          <div className="goth-banner-topline">
            <span className="goth-stamp">
              <Zap size={12} /> ISSUE 13 · UNHOLY ROMANCE
            </span>
            <span className="goth-bats-pair">
              <BatIcon />
              <GothicCross />
              <BatIcon />
            </span>
            <span className="goth-date-mark">13.10.MMXXVI</span>
          </div>

          <h3 className="goth-headline">
            ¡Feliz Cumpleaños,<br />
            <em>Mi Prometida & Mi Reina!</em>
          </h3>
          <p className="goth-subheadline">
            Un pacto sellado en metal, guitarras distorsionadas, flores oscuras y la certeza de amarte más allá de la muerte.
          </p>
        </div>

        {/* Sección 1: El Pastel Gótico de Terciopelo Negro */}
        <div className="goth-cake-section">
          <div className="goth-cake-stage" onClick={!candlesBlown ? handleBlowCandles : undefined}>
            <div className="cake-ambient-darkness" />

            <svg viewBox="0 0 320 230" className="goth-cake-svg" aria-label="Pastel gótico negro con velitas carmesí">
              <defs>
                {/* Velvet Obsidian Cake Shading */}
                <linearGradient id="gothCakeBase" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1f182a" />
                  <stop offset="45%" stopColor="#0d0914" />
                  <stop offset="100%" stopColor="#050308" />
                </linearGradient>

                {/* Crimson Blood Dripping Icing */}
                <linearGradient id="crimsonDrip" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#b91c1c" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </linearGradient>

                {/* Spectral Flame Aura */}
                <radialGradient id="gothFlameGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#a855f7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                </radialGradient>

                {/* Antique Silver Plate */}
                <linearGradient id="antiqueSilver" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="35%" stopColor="#94a3b8" />
                  <stop offset="55%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                <filter id="bloodGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" />
                </filter>
              </defs>

              {/* Murciélagos en la atmósfera detrás del pastel */}
              <g opacity="0.35" fill="#a855f7">
                <path d="M 60,40 Q 75,25 90,40 Q 75,35 60,40 Z" />
                <path d="M 230,35 Q 245,20 260,35 Q 245,30 230,35 Z" />
              </g>

              {/* Plato Plateado estilo victoriano con remaches */}
              <ellipse cx="160" cy="202" rx="126" ry="19" fill="url(#antiqueSilver)" stroke="#0f172a" strokeWidth="2" />
              <ellipse cx="160" cy="200" rx="116" ry="14" fill="#09070d" />

              {/* Capa Inferior del Pastel (Black Velvet / Obsidiana) */}
              <path d="M 65,150 C 65,150 65,192 160,192 C 255,192 255,150 255,150 L 255,134 C 255,134 255,176 160,176 C 65,176 65,134 65,134 Z" fill="url(#gothCakeBase)" stroke="#3f3f46" strokeWidth="1.5" />
              
              {/* Filigrana y espinas en la base inferior */}
              <path d="M 85,165 Q 110,175 135,162 Q 160,178 185,162 Q 210,175 235,165" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />

              {/* Glaseado gótico carmesí escurriendo por la capa inferior */}
              <path d="M 65,134 C 75,152 85,134 95,148 C 105,134 115,156 125,134 C 138,154 150,134 165,150 C 180,134 192,158 205,134 C 215,152 225,134 235,150 C 245,134 255,142 255,134 L 255,124 C 255,124 255,145 160,145 C 65,145 65,124 65,124 Z" fill="url(#crimsonDrip)" filter="url(#bloodGlow)" opacity="0.9" />

              {/* Capa Superior del Pastel (Obsidiana) */}
              <path d="M 92,100 C 92,100 92,140 160,140 C 228,140 228,100 228,100 L 228,88 C 228,88 228,124 160,124 C 92,124 92,88 92,88 Z" fill="url(#gothCakeBase)" stroke="#52525b" strokeWidth="1.2" />

              {/* Glaseado gótico superior con gotas escurriendo */}
              <path d="M 92,88 C 102,112 112,88 122,104 C 132,88 145,116 158,88 C 172,110 185,88 198,106 C 208,88 218,104 228,88 C 228,72 160,68 92,88 Z" fill="url(#crimsonDrip)" />

              {/* Tapa Superior del pastel con pentagrama / cruz gótica grabada */}
              <ellipse cx="160" cy="84" rx="68" ry="16" fill="#120c1a" stroke="#71717a" strokeWidth="1" />
              <path d="M 152,84 H 168 M 160,76 V 92" stroke="#dc2626" strokeWidth="1.2" opacity="0.6" />

              {/* 5 Velas Negras estilo cirio gótico con cera derretida */}
              {[
                { x: 122, y: 80, height: 26 },
                { x: 142, y: 76, height: 30 },
                { x: 160, y: 74, height: 34 },
                { x: 178, y: 76, height: 30 },
                { x: 198, y: 80, height: 26 }
              ].map((candle, idx) => (
                <g key={idx} className="goth-candle-group">
                  {/* Cuerpo de la vela (Negro carbón) */}
                  <rect x={candle.x - 2.5} y={candle.y - candle.height} width="5" height={candle.height} rx="1.5" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
                  
                  {/* Cera goteando de la vela */}
                  <path d={`M ${candle.x - 2.5},${candle.y - candle.height + 4} Q ${candle.x - 4.5},${candle.y - candle.height + 10} ${candle.x - 2.5},${candle.y - candle.height + 12}`} stroke="#dc2626" strokeWidth="1.2" fill="none" />

                  {/* Pabilo */}
                  <line x1={candle.x} y1={candle.y - candle.height} x2={candle.x} y2={candle.y - candle.height - 5} stroke="#09090b" strokeWidth="1.5" />

                  {/* Flama espectral carmesí-violeta o Humo al soplar */}
                  {!candlesBlown ? (
                    <g className={`goth-flame-dance goth-delay-${idx}`}>
                      {/* Aura resplandeciente */}
                      <circle cx={candle.x} cy={candle.y - candle.height - 12} r="12" fill="url(#gothFlameGlow)" filter="url(#bloodGlow)" />
                      {/* Llama exterior carmesí */}
                      <path d={`M ${candle.x},${candle.y - candle.height - 5} C ${candle.x - 4},${candle.y - candle.height - 12} ${candle.x - 3},${candle.y - candle.height - 18} ${candle.x},${candle.y - candle.height - 24} C ${candle.x + 3},${candle.y - candle.height - 18} ${candle.x + 4},${candle.y - candle.height - 12} ${candle.x},${candle.y - candle.height - 5} Z`} fill="#ef4444" />
                      {/* Centro violeta eléctrico */}
                      <path d={`M ${candle.x},${candle.y - candle.height - 6} C ${candle.x - 2},${candle.y - candle.height - 10} ${candle.x - 1.5},${candle.y - candle.height - 14} ${candle.x},${candle.y - candle.height - 18} C ${candle.x + 1.5},${candle.y - candle.height - 14} ${candle.x + 2},${candle.y - candle.height - 10} ${candle.x},${candle.y - candle.height - 6} Z`} fill="#fbcfe8" />
                    </g>
                  ) : (
                    /* Humo espectral oscuro */
                    <g className="goth-smoke-stream">
                      <path
                        d={`M ${candle.x},${candle.y - candle.height - 5} Q ${candle.x + 6},${candle.y - candle.height - 18} ${candle.x - 4},${candle.y - candle.height - 32} T ${candle.x + 5},${candle.y - candle.height - 48}`}
                        stroke="rgba(203, 213, 225, 0.55)"
                        strokeWidth="2.2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  )}
                </g>
              ))}
            </svg>

            {/* Prompt interactivo bajo el pastel */}
            <div className="cake-interaction-prompt">
              {!candlesBlown ? (
                <button type="button" className="goth-blow-btn" onClick={handleBlowCandles}>
                  <Flame size={17} className="goth-btn-flame" />
                  <span>† SOPLAR EL FUEGO DEL RITUAL Y PEDIR UN DESEO †</span>
                </button>
              ) : (
                <div className="goth-wish-granted">
                  <div className="goth-wish-header">
                    <BatIcon />
                    <strong>† PACTO SELLADO EN LA OSCURIDAD †</strong>
                    <BatIcon />
                  </div>
                  <p>
                    Que cada noche sea eterna, que el ruido de la música nunca cese y que nuestro amor arda más que cualquier sombra.
                  </p>
                  <button type="button" className="goth-relight-btn" onClick={handleRelight}>
                    [ Reencender las llamas del ritual ]
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sección 2: El Anillo Punk-Goth & La Promesa */}
        <div className="goth-engagement-box">
          <span className="punk-tape tape-center" aria-hidden="true" />
          <div className="goth-box-header">
            <span className="goth-box-tag">
              <ShieldAlert size={14} /> PUNK WEDDING COVENANT // NO CENSURA
            </span>
            <span className="goth-box-number">#13.10 · DESTINO</span>
          </div>

          {/* Anillo de plata oscura y diamante negro con espinas */}
          <div className="goth-ring-stage">
            <button 
              type="button" 
              className={`goth-ring-btn ${ringBoxOpen ? 'goth-ring-active' : ''}`}
              onClick={toggleRingBox}
              aria-label="Abrir cofre con el anillo punk gótico"
            >
              <div className="goth-ring-halo" />
              <svg viewBox="0 0 120 120" className="goth-ring-svg">
                <defs>
                  {/* Dark Oxidized Silver Metal */}
                  <linearGradient id="oxidizedSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f1f5f9" />
                    <stop offset="30%" stopColor="#94a3b8" />
                    <stop offset="70%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>

                  {/* Black Onyx / Dark Diamond with Crimson Inner Sparkle */}
                  <radialGradient id="blackDiamondGrad" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="35%" stopColor="#581c87" />
                    <stop offset="70%" stopColor="#18181b" />
                    <stop offset="100%" stopColor="#000000" />
                  </radialGradient>
                </defs>

                {/* Aro con púas / espinas góticas */}
                <ellipse cx="60" cy="74" rx="36" ry="28" fill="none" stroke="url(#oxidizedSilver)" strokeWidth="6.5" />
                <ellipse cx="60" cy="74" rx="36" ry="28" fill="none" stroke="#f87171" strokeWidth="1" strokeDasharray="4 8" opacity="0.7" />

                {/* Púas en el aro */}
                <polygon points="24,74 20,70 24,66" fill="#cbd5e1" />
                <polygon points="96,74 100,70 96,66" fill="#cbd5e1" />
                <polygon points="60,102 60,107 58,102" fill="#cbd5e1" />

                {/* Garras góticas sosteniendo la piedra */}
                <path d="M 44,46 L 50,42 L 53,46" stroke="#e2e8f0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 76,46 L 70,42 L 67,46" stroke="#e2e8f0" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Diamante Negro / Ónix central facetado */}
                <g className="goth-diamond-pulse" transform="translate(60, 42)">
                  <polygon points="0,-22 18,-8 11,14 -11,14 -18,-8" fill="url(#blackDiamondGrad)" stroke="#cbd5e1" strokeWidth="1.2" />
                  <polygon points="0,-22 8,-8 0,8 -8,-8" fill="#f43f5e" opacity="0.4" />
                  <polygon points="0,-22 0,8 11,14" fill="#09090b" opacity="0.6" />
                  <circle cx="0" cy="-6" r="3.5" fill="#ffffff" opacity="0.8" />
                  <polygon points="0,-18 3,-10 0,-4 -3,-10" fill="#ffffff" opacity="0.6" />
                </g>
              </svg>

              <span className="goth-ring-caption">
                {ringBoxOpen ? '† UN PACTO DE SANGRE Y RUIDO †' : 'Toca el anillo de espinas & ónix'}
              </span>
            </button>
          </div>

          {/* Manifiesto y carta de amor punk/goth */}
          <div className="goth-letter-content">
            <h4 className="goth-letter-heading">
              Para mi cómplice, mi musa de moshpit y reina de la noche:
            </h4>
            <p>
              Ratita, hoy 13 de octubre el calendario se rinde ante ti. No celebro a una persona común: celebro a la criatura más fascinante que he conocido. A la mujer que ama las guitarras desgarradoras, el slam, los gatitos con alma libre, las historias oscuras y los contrastes que vuelven loco a cualquiera.
            </p>
            <p>
              Amo cada destello de metal en tu rostro, tus snake bites, tu septum, y esa mirada tuya que guarda secretos que solo nosotros entendemos en medio de la madrugada.
            </p>
            <p>
              Tener tu 'sí' y llamarte <strong>mi prometida</strong> es el mayor pacto de mi vida. No te prometo un amor tibio ni de cuentos cliché: te prometo un amor rabioso, leal, apasionado y firme, de esos que aguantan cualquier tormenta.
            </p>
            <blockquote className="goth-quote">
              “Prometo saltar contigo en cada slam de la vida, sostener tu mano cuando la oscuridad pese, y recordarte hasta el último de mis días que tú eres mi reina, mi música y mi destino.”
            </blockquote>
            <p className="goth-signature">
              Feliz cumpleaños, mi amor eterno.<br />
              <strong>Tibo · Tu prometido ✟</strong>
            </p>
          </div>
        </div>

        {/* Sección 3: Acciones Góticas (Música & Lluvia Darks) */}
        <div className="goth-actions-grid">
          <button 
            type="button" 
            className={`goth-action-track ${currentTrack === 'loveofmylife' && isPlaying ? 'goth-playing-active' : ''}`}
            onClick={handlePlayQueen}
          >
            <Music2 size={18} />
            <span>
              {currentTrack === 'loveofmylife' && isPlaying 
                ? 'Sonando: Queen - Love of My Life' 
                : '† Escuchar "Love of My Life" (Dedicada para ti) †'}
            </span>
          </button>

          <button 
            type="button" 
            className="goth-action-rain"
            onClick={onTriggerBirthdayRain}
          >
            <BatIcon />
            <span>† Desatar Lluvia de Sombras & Metal ✟</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
