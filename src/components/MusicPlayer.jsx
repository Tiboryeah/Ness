import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { playClickSynth } from '../utils/audio';

export default function MusicPlayer({ isPlaying, isMuted, statusText, togglePlay, toggleMute, seekRelative, currentTrack }) {
  return (
    <div className="mini-player glass">
      <div className="music-info">
        <span className="music-title">
          {currentTrack === 'oasis' ? 'Wonderwall - Oasis' : 'Love of My Life - Queen'}
        </span>
        <span className="music-status">{statusText}</span>
      </div>
      <div className="player-controls">
        <button 
          onClick={() => { playClickSynth(); seekRelative(-10); }} 
          className="player-btn"
          title="Retroceder 10s"
        >
          <SkipBack size={18} />
        </button>
        <button 
          onClick={() => { playClickSynth(); togglePlay(); }} 
          className={`player-btn ${isPlaying ? 'play-active' : ''}`}
          title={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button 
          onClick={() => { playClickSynth(); seekRelative(10); }} 
          className="player-btn"
          title="Adelantar 10s"
        >
          <SkipForward size={18} />
        </button>
        <button 
          onClick={() => { playClickSynth(); toggleMute(); }} 
          className="player-btn"
          title={isMuted ? "Activar sonido" : "Silenciar"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
