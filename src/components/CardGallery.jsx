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

export default function CardGallery({ isPlaying, onTogglePlay, currentTrack, onTrackChange, onTriggerCandyRain, onSecretUnlock }) {
  return (
    <section className="gallery-section">
      <div className="gallery-header-block text-center">
        <span className="section-kicker">Colección · 01—09</span>
        <h2 className="section-title">
          El mundo de<br /><em>Ratita</em>
        </h2>
        <p className="section-subtitle">
          Nueve fragmentos interactivos. Algunos se muestran; otros esperan ser recordados.
        </p>
      </div>
      
      <div className="cards-grid">
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
