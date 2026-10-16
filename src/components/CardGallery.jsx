import React from 'react';
import CatCard from './cards/CatCard';
import FruitCard from './cards/FruitCard';
import TokyoGhoulCard from './cards/TokyoGhoulCard';
import RockSkaCard from './cards/RockSkaCard';
import FlowersCard from './cards/FlowersCard';
import CuteCornerCard from './cards/CuteCornerCard';
import LoveLetterCard from './cards/LoveLetterCard';
import MarineCard from './cards/MarineCard';
import SecretCard from './cards/SecretCard';
import BirthdayEngagementCard from './cards/BirthdayEngagementCard';

export default function CardGallery({ 
  isPlaying, 
  onTogglePlay, 
  currentTrack, 
  onTrackChange, 
  onTriggerCandyRain, 
  onSecretUnlock,
  copy,
  showBirthdayCard
}) {
  return (
    <section className="gallery-section">
      <div className="gallery-header-block text-center">
        <span className="section-kicker">{copy.kicker}</span>
        <h2 className="section-title">
          El mundo de<br /><em>Ratita</em>
        </h2>
        <p className="section-subtitle">
          {copy.subtitle}
        </p>
      </div>

      <div className="cards-grid">
        {showBirthdayCard && (
          <BirthdayEngagementCard 
            onTriggerBirthdayRain={onTriggerCandyRain}
            onPlaySong={(track) => onTrackChange(track, true)}
            isPlaying={isPlaying}
            currentTrack={currentTrack}
          />
        )}

        <CatCard />
        <FruitCard />
        <TokyoGhoulCard />

        <RockSkaCard 
          isPlaying={isPlaying} 
          onTogglePlay={onTogglePlay}
          currentTrack={currentTrack} 
          onTrackChange={onTrackChange} 
        />
        <FlowersCard />

        <CuteCornerCard onTriggerCandyRain={onTriggerCandyRain} />
        <LoveLetterCard />
        <MarineCard />
        <SecretCard onUnlock={onSecretUnlock} />
      </div>
    </section>
  );
}
