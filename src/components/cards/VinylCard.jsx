import React, { useState } from 'react';
import { Disc } from 'lucide-react';
import Card from '../Card';
import { playClickSynth } from '../../utils/audio';

export default function VinylCard({ isPlaying, currentTrack, onTrackChange }) {
  const handleRecordChange = (record, e) => {
    e.stopPropagation();
    playClickSynth();
    onTrackChange(record);
  };

  return (
    <Card 
      id="card-vinilos" 
      icon={<Disc />} 
      title="5. Los Vinilos" 
      desc="La calidez y nostalgia de la aguja tocando el surco. Elige un disco para colocarlo."
    >
      <div 
        style={{ 
          height: '140px', 
          background: 'radial-gradient(circle, #5b3d22 0%, #2f1c0c 100%)', // vintage wood look
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '10px',
          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)'
        }}
      >
        {/* Turntable Platter and Vinyl */}
        <div style={{
          width: '105px',
          height: '105px',
          borderRadius: '50%',
          background: '#151515',
          border: '4px solid #333',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          animation: isPlaying ? 'spin-record 3s linear infinite' : 'none'
        }}>
          {/* Grooves on vinyl */}
          <div style={{
            position: 'absolute',
            width: '85px',
            height: '85px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.04)',
            pointerEvents: 'none'
          }} />

          {/* Record Label */}
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: currentTrack === 'oasis' ? '#2e7d32' : '#d4af37', // green for Oasis, Gold for Queen
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
            boxShadow: '0 0 5px rgba(0,0,0,0.4)',
            transition: 'background-color 0.4s'
          }}>
            {/* Center Spindle Hole */}
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              border: '1.5px solid #222'
            }} />
            <span style={{ 
              fontSize: '0.45rem', 
              color: currentTrack === 'oasis' ? '#fff' : '#000', 
              fontWeight: '900',
              marginTop: '1px',
              textAlign: 'center',
              lineHeight: '1',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {currentTrack === 'oasis' ? 'OASIS' : 'QUEEN'}
            </span>
          </div>
        </div>

        {/* Tone Arm */}
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '25px',
          width: '10px',
          height: '60px',
          backgroundColor: '#bbb',
          borderRadius: '5px',
          transformOrigin: 'top center',
          transform: isPlaying ? 'rotate(25deg)' : 'rotate(0deg)',
          transition: 'transform 0.8s ease-in-out',
          zIndex: 3,
          boxShadow: '2px 2px 5px rgba(0,0,0,0.4)'
        }}>
          {/* Tone Arm Head / Cartridge */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '-3px',
            width: '16px',
            height: '8px',
            backgroundColor: '#444',
            borderRadius: '2px'
          }} />
        </div>

        {/* Play State Light */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '15px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isPlaying ? '#00ff00' : '#ff0000',
          boxShadow: isPlaying ? '0 0 8px #00ff00' : '0 0 8px #ff0000',
          transition: 'background-color 0.4s'
        }} />
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button 
          className={`action-btn ${currentTrack === 'oasis' ? 'active-tab' : ''}`}
          onClick={(e) => handleRecordChange('oasis', e)}
          style={{ 
            fontSize: '0.8rem', 
            padding: '6px 12px',
            backgroundColor: currentTrack === 'oasis' ? 'var(--pink-light)' : 'rgba(255,255,255,0.05)',
            border: currentTrack === 'oasis' ? '1px solid #fff' : '1px solid transparent'
          }}
        >
          Wonderwall
        </button>
        <button 
          className={`action-btn ${currentTrack === 'queen' ? 'active-tab' : ''}`}
          onClick={(e) => handleRecordChange('queen', e)}
          style={{ 
            fontSize: '0.8rem', 
            padding: '6px 12px',
            backgroundColor: currentTrack === 'queen' ? 'var(--pink-light)' : 'rgba(255,255,255,0.05)',
            border: currentTrack === 'queen' ? '1px solid #fff' : '1px solid transparent'
          }}
        >
          Love of My Life
        </button>
      </div>

      <style>{`
        @keyframes spin-record {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Card>
  );
}
