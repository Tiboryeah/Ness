import React from 'react';
import FlowerCard from './cards/FlowerCard';
import LipstickCard from './cards/LipstickCard';
import CoffeeCard from './cards/CoffeeCard';
import RaccoonCard from './cards/RaccoonCard';
import VinylCard from './cards/VinylCard';
import BookcaseCard from './cards/BookcaseCard';
import VictorianCard from './cards/VictorianCard';
import GrapesCard from './cards/GrapesCard';
import LetterCard from './cards/LetterCard';
import InvisibleBookCard from './cards/InvisibleBookCard';

export default function CardGallery({ isPlaying, onTriggerCandyRain, currentTrack, onTrackChange }) {
  return (
    <section className="gallery-section">
      <h2 className="section-title text-center" style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '10px' }}>
        El Mundo de Ness
      </h2>
      <p className="section-subtitle text-center" style={{ color: 'var(--pink-pastel)', marginBottom: '50px' }}>
        Pasa el cursor o haz clic en cada tarjeta para interactuar con sus pasiones y secretos.
      </p>
      
      <div className="cards-grid">
        <FlowerCard />
        <LipstickCard />
        <CoffeeCard />
        <RaccoonCard />
        <VinylCard isPlaying={isPlaying} currentTrack={currentTrack} onTrackChange={onTrackChange} />
        <BookcaseCard />
        <VictorianCard />
        <GrapesCard />
        <LetterCard />
        <InvisibleBookCard onTriggerCandyRain={onTriggerCandyRain} />
      </div>
    </section>
  );
}
