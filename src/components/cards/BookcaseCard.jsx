import React, { useState } from 'react';
import { BookOpen, Book, Film, Tv } from 'lucide-react';
import Card from '../Card';
import { playClickSynth } from '../../utils/audio';

export default function BookcaseCard() {
  const [activeItem, setActiveItem] = useState(null); // null, 'book', 'movie', 'series'

  const handleItemClick = (item, e) => {
    e.stopPropagation();
    playClickSynth();
    setActiveItem(activeItem === item ? null : item);
  };

  const closeOverlay = (e) => {
    e.stopPropagation();
    setActiveItem(null);
  };

  return (
    <Card 
      id="card-estanteria" 
      icon={<BookOpen />} 
      title="6. La Estantería de Ness" 
      desc="Tus historias y mundos favoritos. Haz clic en los objetos del estante victoriano."
    >
      <div 
        style={{ 
          height: '140px', 
          background: 'linear-gradient(180deg, #422617 0%, #21120a 100%)', // warm mahogany wood
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          padding: '0 10px 10px 10px',
          boxShadow: 'inset 0 -12px 0 #5c351f, inset 0 0 15px rgba(0,0,0,0.9)' // shelf ledge
        }}
      >
        {/* Book Favorite: "Antes de diciembre" */}
        <div 
          onClick={(e) => handleItemClick('book', e)}
          style={{
            width: '28px',
            height: '90px',
            backgroundColor: '#8b1c2e', // dark wine red book spine
            borderLeft: '4px solid #d4af37', // gold trim
            borderRadius: '4px 2px 2px 4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '3px 0 6px rgba(0,0,0,0.5)',
            transform: activeItem === 'book' ? 'translateY(-15px) rotate(-8deg)' : 'none',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          <div style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: '#fdf5e6',
            fontSize: '0.48rem',
            fontWeight: '600',
            letterSpacing: '1px',
            fontFamily: 'var(--font-serif)'
          }}>
            ANTES DE DICIEMBRE
          </div>
        </div>

        {/* Movie: "El Diario de una pasión" (styled as a vintage film tape box or cinema ticket) */}
        <div 
          onClick={(e) => handleItemClick('movie', e)}
          style={{
            width: '45px',
            height: '75px',
            backgroundColor: '#0f0507',
            border: '2px solid #d4af37',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '3px 0 6px rgba(0,0,0,0.5)',
            transform: activeItem === 'movie' ? 'translateY(-15px) scale(1.05)' : 'none',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            padding: '5px'
          }}
        >
          <Film size={18} style={{ color: 'var(--purple-neon)', marginBottom: '4px' }} />
          <div style={{
            color: '#d4af37',
            fontSize: '0.38rem',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'var(--font-serif)',
            lineHeight: '1.2'
          }}>
            EL DIARIO DE UNA PASIÓN
          </div>
        </div>

        {/* Series: "Bridgerton" (styled as a classic Victorian teacup) */}
        <div 
          onClick={(e) => handleItemClick('series', e)}
          style={{
            width: '42px',
            height: '42px',
            backgroundColor: '#f5e6d3', // porcelain cream
            border: '2px solid #d4af37',
            borderRadius: '0 0 20px 20px', // teacup shape
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '3px 3px 6px rgba(0,0,0,0.4)',
            transform: activeItem === 'series' ? 'translateY(-15px)' : 'none',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative',
            marginBottom: '8px'
          }}
        >
          {/* Teacup Handle */}
          <div style={{
            position: 'absolute',
            right: '-10px',
            width: '12px',
            height: '22px',
            border: '2.5px solid #d4af37',
            borderLeft: 'none',
            borderRadius: '0 10px 10px 0',
            top: '8px'
          }} />
          <span style={{ fontSize: '0.65rem', color: '#8b1c2e', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>B</span>
        </div>

        {/* Overlay Content within Card */}
        {activeItem && (
          <div 
            onClick={closeOverlay}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: 'rgba(15, 5, 7, 0.95)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '15px',
              zIndex: 10,
              animation: 'fade-in 0.3s'
            }}
          >
            {activeItem === 'book' && (
              <>
                <h4 style={{ color: 'var(--purple-neon)', fontFamily: 'var(--font-serif)', marginBottom: '5px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Book size={14} /> Novela Favorita
                </h4>
                <p style={{ color: '#fff', fontSize: '0.72rem', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.4' }}>
                  "Antes de diciembre es un recordatorio de que, a veces, la persona correcta llega en el momento exacto, cambiándolo todo."
                </p>
              </>
            )}
            {activeItem === 'movie' && (
              <>
                <h4 style={{ color: 'var(--purple-neon)', fontFamily: 'var(--font-serif)', marginBottom: '5px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Film size={14} /> Película Favorita
                </h4>
                <p style={{ color: '#fff', fontSize: '0.72rem', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.4' }}>
                  "El mejor tipo de amor es el que despierta el alma y nos hace buscar más... Eso es lo que me das tú."
                </p>
              </>
            )}
            {activeItem === 'series' && (
              <>
                <h4 style={{ color: 'var(--purple-neon)', fontFamily: 'var(--font-serif)', marginBottom: '5px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Tv size={14} /> Serie Favorita
                </h4>
                <p style={{ color: '#fff', fontSize: '0.72rem', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.4' }}>
                  "Bridgerton: Un romance aristocrático e intenso. 'Tú eres el objeto de mis afectos y mi más grande deseo...' al estilo victoriano."
                </p>
              </>
            )}
            <span style={{ fontSize: '0.65rem', color: 'var(--pink-pastel)', marginTop: '8px', cursor: 'pointer' }}>
              (Haz clic para cerrar)
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
