import React, { useState, useEffect, useRef } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Landing from './components/Landing';
import Header from './components/Header';
import CardGallery from './components/CardGallery';
import { playChimeSynth } from './utils/audio';
import { Heart, Star, Sparkles } from 'lucide-react';

export default function App() {
  const [started, setStarted] = useState(false);
  
  // Music Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [statusText, setStatusText] = useState('Pausado');
  const [currentTrack, setCurrentTrack] = useState('oasis'); // 'oasis' or 'queen'
  const audioRef = useRef(null);

  const trackUrls = {
    oasis: 'https://archive.org/download/Alternatibo/Wonderwall-Oasis.mp3',
    queen: '/love_of_my_life.mp3'
  };

  // Confetti/Candy Shower States
  const [candies, setCandies] = useState([]);

  // Set default volume and initial track source when element mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      audioRef.current.src = trackUrls.oasis;
    }
  }, []);

  // Control Handlers
  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.25; // safety check
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setStatusText('Reproduciendo');
      }).catch(err => {
        console.error("Audio play failed on start:", err);
      });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setStatusText('Pausado');
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setStatusText('Reproduciendo');
      }).catch(err => {
        console.error("Audio play failed:", err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const seekRelative = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0, 
      Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds)
    );
  };

  const handleTrackChange = (track) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = trackUrls[track];
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setStatusText('Reproduciendo');
      }).catch(err => {
        console.error("Audio play failed on track change:", err);
      });
    }
  };

  // Re-engineered confetti shower using Lucide SVG vectors instead of emojis (Petal & Heart rain)
  const triggerCandyRain = () => {
    playChimeSynth();
    const numCandies = 35;
    const shapes = ['heart', 'star', 'sparkle', 'petal'];
    const colors = ['#a11d33', '#c73e55', '#e8a7b0', '#d4af37', '#fdf5e6'];
    
    for (let i = 0; i < numCandies; i++) {
      setTimeout(() => {
        const id = Date.now() + Math.random();
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = `${Math.random() * 95}vw`;
        const scale = Math.random() * 0.6 + 0.7;

        setCandies(prev => [...prev, { id, type, color, left, scale }]);

        // Clean up particle after it falls (3s duration)
        setTimeout(() => {
          setCandies(prev => prev.filter(c => c.id !== id));
        }, 3000);
      }, i * 70);
    }
  };

  return (
    <>
      {/* 1. Animated background particles */}
      <ParticleBackground />

      {/* 2. Welcome Landing Screen */}
      {!started && <Landing onStart={handleStart} />}

      {/* 3. Main content (unlocked on start) */}
      {started && (
        <div id="main-content">
          <Header 
            isPlaying={isPlaying}
            isMuted={isMuted}
            statusText={statusText}
            togglePlay={togglePlay}
            toggleMute={toggleMute}
            seekRelative={seekRelative}
            currentTrack={currentTrack}
          />

          <main className="container">
            <section className="intro-card glass">
              <h2 className="section-title">Un pequeño detalle para Ness...</h2>
              <p>
                Ness, he creado este rincón inspirado en las cosas de las que hemos hablado: 
                los lirios, las hortensias, los mapaches, los libros y la música. 
                Aunque nos estamos conociendo apenas, espero que disfrutes explorando cada una de estas sorpresas preparadas con mucho cariño.
              </p>
            </section>

            <CardGallery 
              isPlaying={isPlaying} 
              onTriggerCandyRain={triggerCandyRain}
              currentTrack={currentTrack}
              onTrackChange={handleTrackChange}
            />

            <footer className="glass">
              <p className="cursive">Un detalle para Ness. Con mucho cariño, de parte de Tibo.</p>
            </footer>
          </main>
        </div>
      )}

      {/* HTML5 Audio Element managed imperatively */}
      <audio ref={audioRef} loop prefetch="auto" />

      {/* Global falling shapes confetti layer */}
      {candies.map(c => (
        <span 
          key={c.id} 
          className="falling-candy"
          style={{ left: c.left, color: c.color }}
        >
          <span style={{ display: 'inline-block', transform: `scale(${c.scale})` }}>
            {c.type === 'heart' && <Heart size={24} fill={c.color} stroke="none" />}
            {c.type === 'star' && <Star size={24} fill={c.color} stroke="none" />}
            {c.type === 'sparkle' && <Sparkles size={24} />}
            {c.type === 'petal' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill={c.color} style={{ transform: 'rotate(45deg)', display: 'inline-block' }}>
                <path d="M12,2 C12,2 4,10 4,14 C4,18 7.5,21 12,21 C16.5,21 20,18 20,14 C20,10 12,2 12,2 Z" />
              </svg>
            )}
          </span>
        </span>
      ))}
    </>
  );
}
