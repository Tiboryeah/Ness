import React from 'react';
import { Disc, Play, Pause, Radio, Music2, Volume2 } from 'lucide-react';
import Card from '../Card';
import { playClickSynth } from '../../utils/audio';

export default function RockSkaCard({ isPlaying, onTogglePlay, currentTrack, onTrackChange }) {
  const bands = {
    laley: {
      name: 'La Ley',
      song: 'El Duelo',
      genre: 'Rock en Español / Alternativo',
      desc: 'Letras profundas, guitarras envolventes y una atmósfera inolvidable que toca fibras directas en el corazón.',
      badgeColor: '#a855f7', mark: 'LA LEY', labelClass: 'laley'
    },
    cafetacvba: {
      name: 'Café Tacvba',
      song: 'Eres',
      genre: 'Rock Alternativo / Balada',
      desc: 'Una de las canciones más hermosas y sentidas de la música en español: poesía pura y melodía perfecta.',
      badgeColor: '#06b6d4', mark: 'CAFÉ TACVBA', labelClass: 'cafetacvba'
    },
    deftones: {
      name: 'Deftones',
      song: 'Be Quiet And Drive (Far Away)',
      genre: 'Alt-Metal / Shoegaze',
      desc: 'Riffs pesados, guitarras atmosféricas de ensueño y voces etéreas que sumergen en un trance cautivador.',
      badgeColor: '#ec4899', mark: 'deftones', labelClass: 'deftones'
    },
    sektacore: {
      name: 'La Sekta Core',
      song: 'El Fantasma de la Rana',
      genre: 'Ska Punk / Hardcore',
      desc: 'Poder puro, trompetas aceleradas y el slam que hace vibrar el suelo con adrenalina contagiosa.',
      badgeColor: '#10b981', mark: 'SEKTA CORE', labelClass: 'sektacore'
    },
    interpol: {
      name: 'Interpol',
      song: 'Evil',
      genre: 'Post-Punk Revival / Indie Rock',
      desc: 'Líneas de bajo elegantes y oscuras, misterio cautivador y un sonido inconfundible.',
      badgeColor: '#8b5cf6', mark: 'INTERPOL', labelClass: 'interpol'
    },
    maldita: {
      name: 'Maldita Vecindad',
      song: 'Kumbala',
      genre: 'Rock Mestizo / Ska / Danzón',
      desc: 'El saxofón nocturno, la atmósfera de cabaret íntimo y la cadencia que eriza la piel.',
      badgeColor: '#f59e0b', mark: 'MALDITA', labelClass: 'maldita'
    },
    mecano: {
      name: 'Mecano',
      song: 'La Fuerza del Destino',
      genre: 'Synth-Pop / Pop Rock',
      desc: 'Letras poéticas atemporales, teclados mágicos y una nostalgia que acaricia el alma.',
      badgeColor: '#38bdf8', mark: 'MECANO', labelClass: 'mecano'
    },
    tijuanano: {
      name: 'Tijuana No!',
      song: 'Pobre De Tí',
      genre: 'Ska / Punk Rock',
      desc: 'Mensaje, fuerza inquebrantable, ritmo vibrante y un himno histórico imprescindible del ska latino.',
      badgeColor: '#ef4444', mark: 'TIJUANA NO!', labelClass: 'tijuanano'
    },
    loveofmylife: {
      name: 'Queen (Especial Cumpleaños)',
      song: 'Love of My Life',
      genre: 'Balada de Amor / Promesa',
      desc: '“Love of my life, you\'ve hurt me, you\'ve broken my heart and now you leave me... love of my life, can\'t you see? Bring it back, bring it back, don\'t take it away from me, because you don\'t know what it means to me.” La canción más especial para ti en tu cumpleaños.',
      badgeColor: '#f43f5e', mark: 'QUEEN', labelClass: 'queen'
    }
  };

  const activeBandKey = bands[currentTrack] ? currentTrack : 'laley';
  const current = bands[activeBandKey];

  const handleBandSelect = (key, e) => {
    e.stopPropagation();
    playClickSynth();
    if (onTrackChange) {
      onTrackChange(key, true);
    }
  };

  return (
    <Card
      id="card-rock-ska"
      icon={<Disc size={22} />}
      title="4. Ska, Rock & Vinilos"
      desc="Tus bandas favoritas ahora listas para sonar en el tocadiscos. Toca cualquier banda para escucharla."
    >
      <div className="rock-card-body">
        {/* Vinyl Player Display */}
        <div className="turntable-container">
          {/* Vinyl Record */}
          <button
            type="button"
            className={`vinyl-disc spinning-vinyl ${isPlaying ? 'vinyl-playing' : 'vinyl-paused'}`}
            onClick={(event) => { event.stopPropagation(); playClickSynth(); onTogglePlay(); }}
            aria-label={isPlaying ? 'Detener el vinilo y levantar la aguja' : 'Reproducir el vinilo y bajar la aguja'}
            title={isPlaying ? 'Detener vinilo' : 'Reproducir vinilo'}
          >
            <div className="vinyl-groove-inner" />
            <div className="vinyl-groove-mid" />
            <div 
              className="vinyl-center-label"
              style={{ backgroundColor: current.badgeColor }}
            >
              <span className="vinyl-label-ring" aria-hidden="true">33⅓ · RATITA RECORDS · 2026</span>
              <div className="vinyl-spindle" />
              <span className={`vinyl-band-mark mark-${current.labelClass}`}>{current.mark}</span>
              <span className="vinyl-catalog">RT—{String(Object.keys(bands).indexOf(activeBandKey) + 1).padStart(2, '0')}</span>
            </div>
          </button>

          {/* Tone Arm */}
          <div className={`turntable-arm ${isPlaying ? 'arm-on-record' : ''}`}>
            <div className="arm-cartridge" />
          </div>

          {/* Audio Indicator */}
          <div className="turntable-status">
            <span className={`status-led ${isPlaying ? 'led-on' : 'led-off'}`} />
            <span className="status-label">
              {isPlaying ? `Sonando: ${current.song}` : 'Toca una banda para reproducir'}
            </span>
          </div>
        </div>

        {/* Band Selector Chips */}
        <div className="bands-scroll-chips">
          {Object.keys(bands).map((key) => {
            const b = bands[key];
            const isSelected = activeBandKey === key;
            return (
              <button
                key={key}
                type="button"
                className={`band-chip ${isSelected ? 'band-chip-active' : ''}`}
                style={isSelected ? { borderColor: b.badgeColor, color: b.badgeColor } : {}}
                onClick={(e) => handleBandSelect(key, e)}
              >
                {isSelected && isPlaying ? (
                  <Volume2 size={12} className="chip-icon-pulse" />
                ) : (
                  <Radio size={12} />
                )}
                <span>{b.name}</span>
              </button>
            );
          })}
        </div>

        {/* Band Feature Box */}
        <div className="band-info-panel">
          <div className="band-info-header">
            <h4 className="band-info-name" style={{ color: current.badgeColor }}>
              {current.name}
            </h4>
            <span className="band-info-genre">{current.genre}</span>
          </div>
          <p className="band-info-highlight">
            <Music2 size={15} /> Tema en pista: <strong>“{current.song}”</strong>
          </p>
          <p className="band-info-desc">{current.desc}</p>
        </div>

        {/* Player action trigger */}
        <div className="rock-actions">
          <button 
            type="button" 
            className="rock-play-toggle-btn"
            onClick={onTogglePlay}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? `Pausar “${current.song}”` : `Reproducir “${current.song}”`}</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
