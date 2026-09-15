import React from 'react';
import MusicPlayer from './MusicPlayer';
import { Sparkles } from 'lucide-react';

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
  onPrevTrack 
}) {
  return (
    <header className="header-glass">
      <div className="header-brand">
        <div className="brand-badge">
          <Sparkles size={16} className="brand-icon-sparkle" />
          <span className="brand-name">Ratita</span>
        </div>
        <span className="brand-subtext">Un rincón de Tibo</span>
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
