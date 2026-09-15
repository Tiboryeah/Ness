import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc3, ListMusic } from 'lucide-react';
import { playClickSynth } from '../utils/audio';
import { TRACK_METADATA, PLAYLIST_KEYS } from '../data/playlist';

export default function MusicPlayer({ 
  isPlaying, 
  isMuted, 
  volume,
  statusText, 
  togglePlay, 
  toggleMute, 
  onVolumeChange,
  currentTrack, 
  onTrackChange, 
  onNextTrack, 
  onPrevTrack 
}) {
  const [showPlaylist, setShowPlaylist] = useState(false);

  const activeSong = TRACK_METADATA[currentTrack] || TRACK_METADATA.laley;

  const handleSelectSong = (key) => {
    playClickSynth();
    onTrackChange(key);
    setShowPlaylist(false);
  };

  return (
    <div className="mini-player glass">
      {/* Equalizer and Title */}
      <div className="music-info-cluster">
        <div className="music-disc-icon">
          <Disc3 size={20} className={isPlaying ? 'spinning-disc-icon' : ''} />
        </div>
        <div className="music-text-group">
          <span className="music-title-strong">
            {activeSong.title} <span className="music-artist-tag">— {activeSong.artist}</span>
          </span>
          <div className="music-status-row">
            <span className={`status-dot ${isPlaying ? 'status-playing' : ''}`} />
            <span className="music-status-label">{statusText}</span>
          </div>
        </div>

        {/* Dynamic Waveform Visualizer */}
        {isPlaying && (
          <div className="mini-equalizer-bars">
            <span className="eq-bar eq-bar-1" />
            <span className="eq-bar eq-bar-2" />
            <span className="eq-bar eq-bar-3" />
            <span className="eq-bar eq-bar-4" />
          </div>
        )}
      </div>

      {/* Playback Controls */}
      <div className="player-controls">
        <button 
          type="button"
          onClick={() => { playClickSynth(); onPrevTrack(); }} 
          className="player-btn skip-btn"
          title="Canción anterior"
          aria-label="Canción anterior"
        >
          <SkipBack size={17} />
        </button>
        <button 
          type="button"
          onClick={() => { playClickSynth(); togglePlay(); }} 
          className={`player-btn main-play-btn ${isPlaying ? 'play-active' : ''}`}
          title={isPlaying ? "Pausar" : "Reproducir"}
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button 
          type="button"
          onClick={() => { playClickSynth(); onNextTrack(); }} 
          className="player-btn skip-btn"
          title="Siguiente canción"
          aria-label="Siguiente canción"
        >
          <SkipForward size={17} />
        </button>
        
        {/* Playlist Toggle */}
        <div className="playlist-menu-wrapper">
          <button
            type="button"
            onClick={() => { playClickSynth(); setShowPlaylist((prev) => !prev); }}
            className={`player-btn ${showPlaylist ? 'playlist-active-btn' : ''}`}
            title="Lista de canciones"
            aria-label="Lista de canciones"
          >
            <ListMusic size={17} />
          </button>

          {showPlaylist && (
            <div className="playlist-dropdown glass">
              <div className="playlist-dropdown-header">
                <span>Playlist de Ratita</span>
                <span className="playlist-count">{PLAYLIST_KEYS.length} temas</span>
              </div>
              <div className="playlist-items-list">
                {PLAYLIST_KEYS.map((key) => {
                  const item = TRACK_METADATA[key];
                  const isCurrent = currentTrack === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`playlist-item-btn ${isCurrent ? 'item-active' : ''}`}
                      onClick={() => handleSelectSong(key)}
                    >
                      <span className="item-title">{item.title}</span>
                      <span className="item-artist">{item.artist}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button 
          type="button"
          onClick={() => { playClickSynth(); toggleMute(); }} 
          className={`player-btn ${isMuted ? 'muted-active' : ''}`}
          title={isMuted ? "Activar sonido" : "Silenciar"}
          aria-label={isMuted ? "Activar sonido" : "Silenciar"}
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
        <label className="volume-control" title={`Volumen: ${volume}%`}>
          <span className="sr-only">Ajustar volumen</span>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={(event) => onVolumeChange(event.target.value)}
            aria-label="Volumen"
            aria-valuetext={`${volume}%`}
            style={{ '--volume-level': `${volume}%` }}
          />
          <output>{volume}%</output>
        </label>
      </div>
    </div>
  );
}
