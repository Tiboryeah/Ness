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

  // Unlock and play audio + celebrate
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
    // Launch celebratory birthday shower upon entering
    setTimeout(() => {
      triggerCandyRain();
    }, 400);
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

  // Dark-Gothic & Punk Celebration shower with SVG vectors (ZERO emojis)
  const triggerCandyRain = () => {
    playChimeSynth();
    const numCandies = 50;
    const shapes = ['bat', 'cross', 'pin', 'ring', 'heart', 'star'];
    // Goth & Punk Palette: Sangre Carmesí, Morado Nocturno, Plata Cromo, Negro Humo, Verde Veneno
    const colors = ['#ef4444', '#dc2626', '#a855f7', '#7c3aed', '#94a3b8', '#f1f5f9', '#10b981', '#f43f5e'];
    
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
        }, 3400);
      }, i * 55);
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
            onTriggerCelebration={triggerCandyRain}
          />

          <main className="container">
            {/* Intro Welcome Card with Birthday & Engagement dedication */}
            <section className="intro-card glass">
              <span className="intro-index" aria-hidden="true">00</span>
              <div className="intro-badge">
                <Sparkles size={16} />
                <span>13 de Octubre · Edición Prometida</span>
              </div>
              <h2 className="intro-title">
                Hay universos que<br />merecen ser <em>celebrados.</em>
              </h2>
              <div className="intro-text">
                <p className="intro-birthday-callout">
                  <strong>¡Feliz Cumpleaños, mi amada Ratita!</strong> Hoy es 13 de octubre, y entre todas las fechas posibles, esta es la más sagrada para mí: el día en que nació la mujer que ilumina mi vida entera, y que ahora tengo el honor inmenso de llamar <strong>mi prometida</strong>.
                </p>
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
                  Hoy no solo celebro tu vida: celebro nuestro 'sí' y la promesa de caminar juntos hasta el último amanecer.
                </p>
                <p>
                  Cada detalle guarda una pista, un recuerdo, una melodía y un pedazo de mi alma dedicado a ti.
                </p>
                <p className="intro-whisper">
                  Pide un deseo frente al pastel, escucha nuestra música y disfruta tu rincón...
                </p>
                <p className="intro-closing-phrase">
                  Porque todo lo hermoso que existe en este lugar fue hecho para hacerte sonreír.
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
                <span className="gothic-note-kicker">DOS CERTEZAS PARA GUARDAR</span>
                <p>“Estoy seguro que puedes entrar a estudiar música en Bellas Artes, confía en ti.”</p>
                <p className="gothic-fiancee-quote">“Y tengo la certeza más hermosa de todas: eres el amor de mi vida, mi mejor decisión y la prometida más increíble del mundo.”</p>
                <span className="gothic-note-sign">— Tibo, tu prometido</span>
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
                <span className="footer-kicker">13 DE OCTUBRE · CUMPLEAÑOS & COMPROMISO</span>
                <p className="footer-signature">
                  Hecho para <strong>Ratita</strong>, mi Reina y Futura Esposa<br />con todo el amor infinito de <strong>Tibo</strong>.
                </p>
              </div>
              <div className="footer-stamp" aria-hidden="true">
                <Star size={19} fill="currentColor" />
                <span>FOREVER<br />NOISE</span>
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

      {/* Falling Goth & Punk Vector Shower (Zero Emojis) */}
      {candies.map((c) => (
        <span 
          key={c.id} 
          className="falling-candy"
          style={{ left: c.left, color: c.color }}
        >
          <span style={{ display: 'inline-block', transform: `scale(${c.scale})` }}>
            {c.type === 'bat' && (
              <svg width="30" height="15" viewBox="0 0 64 30" style={{ display: 'inline-block', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.8))' }}>
                <path d="M32 27C26 17 20 12 13 10c2 3 2 6 1 9C9 16 5 15 1 16c7 5 12 9 17 13 3-5 8-7 14-2 6-5 11-3 14 2 5-4 10-8 17-13-4-1-8 0-13 3-1-3-1-6 1-9-7 2-13 7-19 17Z" fill={c.color} />
              </svg>
            )}
            {c.type === 'cross' && (
              <svg width="18" height="26" viewBox="0 0 24 32" style={{ display: 'inline-block', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.8))' }}>
                <path d="M9 2h6v7h7v6h-7v17H9V15H2V9h7V2z" fill={c.color} />
              </svg>
            )}
            {c.type === 'pin' && (
              <svg width="22" height="24" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', transform: 'rotate(-20deg)' }}>
                <path d="M8 3h4a3 3 0 0 1 3 3v2H7V6a3 3 0 0 1 1-3z" fill={c.color} fillOpacity="0.3" />
                <path d="M7 8v11a2 2 0 0 0 4 0V8" />
                <line x1="11" y1="19" x2="16" y2="5" />
              </svg>
            )}
            {c.type === 'heart' && (
              <Heart size={22} fill={c.color} stroke="none" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.7))' }} />
            )}
            {c.type === 'star' && (
              <Star size={20} fill={c.color} stroke="none" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.7))' }} />
            )}
            {c.type === 'ring' && (
              <svg width="24" height="26" viewBox="0 0 24 26" fill="none" style={{ display: 'inline-block' }}>
                <circle cx="12" cy="15" r="7" stroke={c.color} strokeWidth="2.5" />
                <polygon points="12,2 16,7 8,7" fill={c.color} />
              </svg>
            )}
          </span>
        </span>
      ))}
    </>
  );
}
