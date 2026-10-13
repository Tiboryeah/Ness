import React, { useState, useEffect, useRef } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Landing from './components/Landing';
import Header from './components/Header';
import CardGallery from './components/CardGallery';
import { playChimeSynth } from './utils/audio';
import { Heart, Star, Sparkles } from 'lucide-react';
import { PLAYLIST_KEYS, TRACK_METADATA } from './data/playlist';

export default function App() {
  const [started, setStarted] = useState(false);
  
  // Music Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(25);
  const [statusText, setStatusText] = useState('Pausado');
  const [currentTrack, setCurrentTrack] = useState('laley'); // Primary track: La Ley - El Duelo
  const audioRef = useRef(null);

  // Falling particles / Confetti rain
  const [candies, setCandies] = useState([]);

  // Set default volume and initial track source
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      audioRef.current.src = TRACK_METADATA.laley.url;
    }
  }, []);

  // Unlock and play audio
  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setStatusText('Reproduciendo');
      }).catch((err) => {
        console.warn("Audio play on start prevented by browser:", err);
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
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (nextVolume) => {
    if (!audioRef.current) return;
    const normalized = Math.max(0, Math.min(100, Number(nextVolume)));
    audioRef.current.volume = normalized / 100;
    audioRef.current.muted = normalized === 0;
    setVolume(normalized);
    setIsMuted(normalized === 0);
  };

  const seekRelative = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0, 
      Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds)
    );
  };

  const handleTrackChange = (trackKey, autoPlay = true) => {
    if (!TRACK_METADATA[trackKey]) return;
    setCurrentTrack(trackKey);
    if (audioRef.current) {
      audioRef.current.src = TRACK_METADATA[trackKey].url;
      audioRef.current.load();
      if (autoPlay) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setStatusText('Reproduciendo');
        }).catch((err) => {
          console.error("Track change audio play error:", err);
        });
      }
    }
  };

  const handleNextTrack = () => {
    const currentIndex = PLAYLIST_KEYS.indexOf(currentTrack);
    const nextIndex = (currentIndex + 1) % PLAYLIST_KEYS.length;
    handleTrackChange(PLAYLIST_KEYS[nextIndex]);
  };

  const handlePrevTrack = () => {
    const currentIndex = PLAYLIST_KEYS.indexOf(currentTrack);
    const prevIndex = (currentIndex - 1 + PLAYLIST_KEYS.length) % PLAYLIST_KEYS.length;
    handleTrackChange(PLAYLIST_KEYS[prevIndex]);
  };

  const handleSecretUnlock = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.muted = false;
    setIsMuted(false);
    handleTrackChange('secret', true);
  };

  // Candy shower with SVG vectors (ZERO emojis)
  const triggerCandyRain = () => {
    playChimeSynth();
    const numCandies = 40;
    const shapes = ['heart', 'star', 'sparkle', 'petal'];
    // Palette: Morado, Verde Esmeralda, Rosa Pastel, Blanco Nube
    const colors = ['#a855f7', '#10b981', '#f472b6', '#34d399', '#c084fc', '#fbcfe8'];
    
    for (let i = 0; i < numCandies; i++) {
      setTimeout(() => {
        const id = Date.now() + Math.random();
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = `${Math.random() * 92 + 2}vw`;
        const scale = Math.random() * 0.6 + 0.7;

        setCandies((prev) => [...prev, { id, type, color, left, scale }]);

        setTimeout(() => {
          setCandies((prev) => prev.filter((c) => c.id !== id));
        }, 3200);
      }, i * 65);
    }
  };

  return (
    <>
      {/* 1. Animated background particles */}
      <ParticleBackground />

      {/* 2. Welcome Landing Portal */}
      {!started && <Landing onStart={handleStart} />}

      {/* 3. Main content */}
      {started && (
        <div id="main-content">
          <Header 
            isPlaying={isPlaying}
            isMuted={isMuted}
            volume={volume}
            statusText={statusText}
            togglePlay={togglePlay}
            toggleMute={toggleMute}
            onVolumeChange={handleVolumeChange}
            seekRelative={seekRelative}
            currentTrack={currentTrack}
            onTrackChange={handleTrackChange}
            onNextTrack={handleNextTrack}
            onPrevTrack={handlePrevTrack}
          />

          <main className="container">
            {/* Intro Welcome Card */}
            <section className="intro-card glass">
              <span className="intro-index" aria-hidden="true">00</span>
              <div className="intro-badge">
                <Sparkles size={16} />
                <span>Para Ratita</span>
              </div>
              <h2 className="intro-title">
                Hay universos que<br />merecen ser <em>guardados.</em>
              </h2>
              <div className="intro-text">
                <p>
                  Ratita, entre estas sombras he dejado escondidos pequeños fragmentos de tu mundo.
                </p>
                <p>
                  El fulgor ámbar de criaturas de ojos felinos, frutos dulces que guardan verano bajo la piel, notas que desgarran el silencio entre guitarras y metales, y melodías que sólo tú sabrías reconocer aun con los ojos cerrados.
                </p>
                <p>
                  También habitan aquí ciertas historias nacidas entre la oscuridad de Tokio, flores que parecen conocer secretos que nunca se pronuncian y pequeños rastros de esa ternura tuya que, incluso entre lo sombrío, insiste en permanecer intacta.
                </p>
                <p className="intro-accent-paragraph">
                  Nada en este rincón está aquí por accidente.
                </p>
                <p>
                  Cada detalle guarda una pista, un recuerdo o una pequeña parte de ti.
                </p>
                <p className="intro-whisper">
                  Así que entra despacio...
                </p>
                <p>
                  Quizá, mientras recorres este lugar, descubras que algunas cosas fueron hechas para ser encontradas.
                </p>
                <p className="intro-closing-phrase">
                  Y otras, simplemente, para hacerte saber que alguien se tomó el tiempo de recordarlas.
                </p>
              </div>
            </section>

            {/* Main Interactive Card Gallery */}
            <CardGallery 
              isPlaying={isPlaying} 
              onTogglePlay={togglePlay}
              currentTrack={currentTrack}
              onTrackChange={handleTrackChange}
              onTriggerCandyRain={triggerCandyRain}
              onSecretUnlock={handleSecretUnlock}
            />

            <aside className="gothic-encouragement" aria-label="Una nota para Ratita">
              <span className="gothic-note-wing wing-left" aria-hidden="true">†</span>
              <div className="gothic-note-inner">
                <span className="gothic-note-kicker">UNA CERTEZA PARA GUARDAR</span>
                <p>“Estoy seguro que puedes entrar a estudiar música en Bellas Artes, confía en ti.”</p>
                <span className="gothic-note-sign">— Tibo</span>
              </div>
              <span className="gothic-note-wing wing-right" aria-hidden="true">†</span>
            </aside>

            {/* Footer */}
            <footer className="footer-glass">
              <span className="footer-tape" aria-hidden="true" />
              <div className="footer-edition">
                <span>ARCHIVO PERSONAL</span>
                <strong>ISSUE<br />MMXXVI</strong>
              </div>
              <div className="footer-main-copy">
                <span className="footer-kicker">SIN CENSURA · SIN FILTROS · HECHO A MANO</span>
                <p className="footer-signature">
                  Hecho para <strong>Ratita</strong><br />con todo el cariño de <strong>Tibo</strong>.
                </p>
              </div>
              <div className="footer-stamp" aria-hidden="true">
                <Star size={19} fill="currentColor" />
                <span>LOVE<br />NOISE</span>
              </div>
              <span className="footer-scribble" aria-hidden="true">hasta el último amanecer</span>
            </footer>
          </main>
        </div>
      )}

      {/* Persistent HTML5 Audio element with loop and ended listener */}
      <audio 
        ref={audioRef} 
        prefetch="auto" 
        onEnded={handleNextTrack}
      />

      {/* Falling Vector Confetti (Zero Emojis) */}
      {candies.map((c) => (
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
