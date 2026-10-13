import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import Card from '../Card';
import { playPopSynth } from '../../utils/audio';

export default function CoffeeCard() {
  const [milkAdded, setMilkAdded] = useState(false);
  const [isDrunk, setIsDrunk] = useState(false);

  const handleAddMilk = (e) => {
    e.stopPropagation();
    if (isDrunk) return;
    playPopSynth();
    setMilkAdded(true);
  };

  const handleDrink = (e) => {
    e.stopPropagation();
    playPopSynth();
    setIsDrunk(true);
  };

  const handleRefill = (e) => {
    e.stopPropagation();
    playPopSynth();
    setMilkAdded(false);
    setIsDrunk(false);
  };

  return (
    <Card 
      id="card-cafe" 
      icon={<Coffee />} 
      title="3. El Café Calentito" 
      desc="Un aroma reconfortante para empezar el día. Prepáralo a tu gusto."
    >
      <div 
        style={{ 
          height: '140px', 
          background: 'rgba(0,0,0,0.3)', 
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Steam lines */}
        {!isDrunk && (
          <div className="steam-container" style={{
            position: 'absolute',
            top: '10px',
            display: 'flex',
            gap: '8px',
            zIndex: 2,
            pointerEvents: 'none'
          }}>
            <div className="steam-line" style={{ width: '3px', height: '20px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '2px', animation: 'steam-rise 1.5s infinite alternate ease-in-out' }} />
            <div className="steam-line" style={{ width: '3px', height: '30px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '2px', animation: 'steam-rise 2s infinite alternate ease-in-out', animationDelay: '0.4s' }} />
            <div className="steam-line" style={{ width: '3px', height: '20px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '2px', animation: 'steam-rise 1.7s infinite alternate ease-in-out', animationDelay: '0.2s' }} />
          </div>
        )}

        {/* Coffee Cup Representation */}
        <div className="cup-outer" style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          border: '5px solid #eaeaea',
          boxShadow: '0 8px 15px rgba(0,0,0,0.4)',
          background: '#c4c4c4',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          transition: 'transform 0.5s'
        }}>
          {/* Cup Handle */}
          <div style={{
            position: 'absolute',
            right: '-18px',
            width: '16px',
            height: '35px',
            border: '5px solid #eaeaea',
            borderLeft: 'none',
            borderRadius: '0 15px 15px 0',
            top: '22px'
          }} />

          {/* Coffee liquid */}
          <div className="cup-liquid" style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: isDrunk ? '#221510' : '#4d2a18', // empty cup looks like dark ceramic
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            transition: 'background-color 0.5s',
            position: 'relative'
          }}>
            {!isDrunk && (
              <div 
                className="coffee-content" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: '#4d2a18',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'background-color 0.5s'
                }}
              >
                {/* Latte Art (Milk Heart) */}
                {milkAdded && (
                  <div className="latte-art-heart" style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#f5e6d3',
                    position: 'relative',
                    transform: 'rotate(-45deg)',
                    boxShadow: '0 0 8px #f5e6d3',
                    animation: 'grow-in 0.8s ease forwards',
                    borderRadius: '2px'
                  }}>
                    <div style={{ width: '32px', height: '32px', backgroundColor: '#f5e6d3', borderRadius: '50%', position: 'absolute', top: '-16px', left: '0' }} />
                    <div style={{ width: '32px', height: '32px', backgroundColor: '#f5e6d3', borderRadius: '50%', position: 'absolute', top: '0', left: '16px' }} />
                  </div>
                )}
              </div>
            )}
            
            {isDrunk && (
              <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', fontWeight: 'bold' }}>
                VACÍO
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {!milkAdded && !isDrunk && (
          <button className="action-btn" onClick={handleAddMilk} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            Añadir Leche
          </button>
        )}
        {!isDrunk ? (
          <button className="action-btn" onClick={handleDrink} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            Beber Café
          </button>
        ) : (
          <button className="action-btn" onClick={handleRefill} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            Servir Otro
          </button>
        )}
      </div>

      {/* Embedded CSS for steam animation */}
      <style>{`
        @keyframes steam-rise {
          0% { transform: translateY(5px) scale(0.9); opacity: 0.2; }
          100% { transform: translateY(-15px) scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </Card>
  );
}
