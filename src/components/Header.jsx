import React from 'react';
import MusicPlayer from './MusicPlayer';
import { Sparkles, PartyPopper, Crown } from 'lucide-react';

export default function Header({ 
  isPlaying, 
  isMuted, 
  volume,
  statusText, 
  togglePlay, 
  toggleMute, 
  onVolumeChange,
  seekRelative, 
  currentTrack, 
  onTrackChange, 
  onNextTrack, 
  onPrevTrack,
  onTriggerCelebration
}) {
  return (
    <header className="header-glass">
      <div className="header-brand goth-header-brand">
        <div className="brand-badge goth-brand-badge">
          <span className="goth-brand-cross">†</span>
          <span className="brand-name">Ratita</span>
          <span className="brand-fiancee-tag goth-fiancee-tag">✟ Prometida</span>
        </div>
        <div className="brand-subtext-group">
          <span className="brand-subtext goth-brand-subtext">13.10 // Ritual de Cumpleaños</span>
          {onTriggerCelebration && (
            <button 
              type="button" 
              className="header-celebrate-btn goth-celebrate-btn"
              onClick={onTriggerCelebration}
              title="Desatar lluvia de sombras y metal"
            >
              <span>† Festejar Darks †</span>
            </button>
          )}
        </div>
      </div>
      
      <MusicPlayer 
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        statusText={statusText}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        onVolumeChange={onVolumeChange}
        seekRelative={seekRelative}
        currentTrack={currentTrack}
        onTrackChange={onTrackChange}
        onNextTrack={onNextTrack}
        onPrevTrack={onPrevTrack}
      />
    </header>
  );
}

