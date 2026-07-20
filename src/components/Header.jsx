import React from 'react';
import MusicPlayer from './MusicPlayer';
import { Heart } from 'lucide-react';

export default function Header({ isPlaying, isMuted, statusText, togglePlay, toggleMute, seekRelative, currentTrack }) {
  return (
    <header className="glass">
      <div className="header-logo" style={{ color: 'var(--pink-light)', display: 'flex', alignItems: 'center' }}>
        <Heart size={18} fill="var(--pink-light)" stroke="none" style={{ marginRight: '8px' }} />
        Ness & Tibo
      </div>
      
      <MusicPlayer 
        isPlaying={isPlaying}
        isMuted={isMuted}
        statusText={statusText}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        seekRelative={seekRelative}
        currentTrack={currentTrack}
      />
    </header>
  );
}
