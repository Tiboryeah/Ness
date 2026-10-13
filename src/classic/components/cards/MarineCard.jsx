import React, { useEffect, useRef, useState } from 'react';
import { Fish, Maximize2, Minimize2, Waves } from 'lucide-react';
import Card from '../Card';
import { playChimeSynth } from '../../utils/audio';

const TAU = Math.PI * 2;

function drawFish(ctx, x, y, size, direction, color, phase) {
  ctx.save();
  ctx.translate(x, y + Math.sin(phase) * 2);
  ctx.scale(direction, 1);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 0, size, size * .38, 0, 0, TAU);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-size * .78, 0);
  ctx.lineTo(-size * 1.45, -size * .55);
  ctx.lineTo(-size * 1.35, size * .58);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(243,239,231,.8)';
  ctx.beginPath();
  ctx.arc(size * .48, -size * .08, Math.max(1, size * .07), 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawWhale(ctx, x, y, scale, phase) {
  ctx.save();
  ctx.translate(x, y + Math.sin(phase * .7) * 5);
  ctx.scale(scale, scale);
  ctx.fillStyle = '#372a62';
  ctx.beginPath();
  ctx.moveTo(-105, 0);
  ctx.bezierCurveTo(-88, -48, 30, -58, 92, -18);
  ctx.bezierCurveTo(118, -4, 103, 23, 70, 29);
  ctx.bezierCurveTo(8, 46, -72, 36, -105, 0);
  ctx.fill();
  ctx.fillStyle = '#594589';
  ctx.beginPath();
  ctx.moveTo(-15, 20);
  ctx.quadraticCurveTo(26, 66, 56, 27);
  ctx.quadraticCurveTo(18, 38, -15, 20);
  ctx.fill();
  ctx.save();
  ctx.translate(-102, -1);
  ctx.rotate(Math.sin(phase) * .08);
  ctx.fillStyle = '#493775';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-36, -42, -58, -20);
  ctx.quadraticCurveTo(-34, 2, 0, 5);
  ctx.moveTo(0, 4);
  ctx.quadraticCurveTo(-36, 41, -59, 18);
  ctx.quadraticCurveTo(-34, -2, 0, 0);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#b9ff66';
  ctx.beginPath();
  ctx.arc(69, -16, 2.8, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawDolphin(ctx, x, y, scale, phase) {
  ctx.save();
  ctx.translate(x, y + Math.sin(phase) * 5);
  ctx.rotate(Math.sin(phase * .6) * .06);
  ctx.scale(scale, scale);
  ctx.fillStyle = '#7661a9';
  ctx.beginPath();
  ctx.moveTo(-45, 4);
  ctx.bezierCurveTo(-20, -19, 26, -19, 47, -2);
  ctx.lineTo(65, 1);
  ctx.lineTo(47, 7);
  ctx.bezierCurveTo(16, 26, -23, 22, -45, 4);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-38, 4);
  ctx.lineTo(-59, -15);
  ctx.lineTo(-53, 5);
  ctx.lineTo(-61, 20);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(1, -12);
  ctx.lineTo(10, -31);
  ctx.lineTo(22, -10);
  ctx.fill();
  ctx.restore();
}

function drawJelly(ctx, x, y, size, phase, color) {
  ctx.save();
  ctx.translate(x, y + Math.sin(phase) * 8);
  const glow = ctx.createRadialGradient(0, -4, 1, 0, 0, size);
  glow.addColorStop(0, 'rgba(255,255,255,.85)');
  glow.addColorStop(.35, color);
  glow.addColorStop(1, 'rgba(140,98,255,.04)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, size, Math.PI, TAU);
  ctx.quadraticCurveTo(size * .65, size * .42, size * .3, size * .18);
  ctx.quadraticCurveTo(0, size * .52, -size * .3, size * .18);
  ctx.quadraticCurveTo(-size * .65, size * .42, -size, 0);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  for (let i = -2; i <= 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * size * .27, size * .15);
    ctx.bezierCurveTo(i * size * .22 + Math.sin(phase + i) * 7, size, i * size * .38, size * 1.35, i * size * .22 + Math.cos(phase + i) * 6, size * 1.8);
    ctx.stroke();
  }
  ctx.restore();
}

export default function MarineCard() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const immersiveRef = useRef(false);
  const [immersive, setImmersive] = useState(false);

  useEffect(() => {
    immersiveRef.current = immersive;
  }, [immersive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = sceneRef.current;
    if (!canvas || !host) return undefined;
    const ctx = canvas.getContext('2d', { alpha: false });
    const pointer = { x: .5, y: .5 };
    let width = 0;
    let height = 0;
    let frame;
    let visible = true;
    let last = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const bubbles = Array.from({ length: 16 }, (_, i) => ({ x: (i * 47 % 100) / 100, y: (i * 83 % 100) / 100, r: 1 + (i % 3), speed: .12 + (i % 4) * .035 }));
    const fish = Array.from({ length: 11 }, (_, i) => ({ x: (i * 71 % 120) / 100, y: .25 + ((i * 37) % 55) / 100, size: 3 + (i % 4) * 1.5, speed: 9 + (i % 5) * 2.5, direction: i % 3 === 0 ? -1 : 1 }));

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      if (!visible) return;
      if (!reduceMotion) frame = requestAnimationFrame(draw);
      if (time - last < 1000 / 20) return;
      last = time;
      const t = time / 1000;
      const dive = immersiveRef.current;
      const tempo = dive ? 2.45 : 1.35;
      const px = (pointer.x - .5) * 18;
      const py = (pointer.y - .5) * 10;
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#17132b');
      gradient.addColorStop(.5, '#090d1d');
      gradient.addColorStop(1, '#03060d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalAlpha = .12;
      for (let i = 0; i < 5; i += 1) {
        ctx.fillStyle = i % 2 ? '#8c62ff' : '#b9ff66';
        ctx.beginPath();
        ctx.moveTo(width * (.08 + i * .2) + px, 0);
        ctx.lineTo(width * (.25 + i * .22) + px * 1.8, height);
        ctx.lineTo(width * (.36 + i * .22) + px * 1.8, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      bubbles.forEach((bubble) => {
        bubble.y -= (bubble.speed * tempo) / height;
        if (bubble.y < -.03) bubble.y = 1.05;
        ctx.strokeStyle = 'rgba(185,255,102,.28)';
        ctx.lineWidth = .7;
        ctx.beginPath();
        ctx.arc(bubble.x * width + Math.sin(t + bubble.x * 9) * 5, bubble.y * height, bubble.r, 0, TAU);
        ctx.stroke();
      });

      fish.forEach((item, index) => {
        item.x += (item.speed * tempo * item.direction) / width / 30;
        if (item.direction > 0 && item.x > 1.15) item.x = -.15;
        if (item.direction < 0 && item.x < -.15) item.x = 1.15;
        drawFish(ctx, item.x * width - px * .3, item.y * height + py, item.size * (dive ? 1.18 : 1), item.direction, index % 4 ? 'rgba(243,239,231,.43)' : '#ff709f', t * 2 * tempo + index);
      });

      drawWhale(ctx, width * (dive ? .5 : .42) + px, height * (dive ? .52 : .49) + py, Math.min(width / (dive ? 560 : 760), dive ? 1.35 : .82), t * tempo);
      drawDolphin(ctx, width * .7 - px * .3, height * .26 - py, dive ? .8 : .58, t * 1.5 * tempo);
      drawDolphin(ctx, width * .79 - px * .4, height * .34 - py, dive ? .62 : .43, t * 1.5 * tempo + .8);
      drawJelly(ctx, width * .17 - px * .6, height * .3 + py, dive ? 27 : 18, t * 1.1 * tempo, '#ff709f');
      drawJelly(ctx, width * .84 - px * .7, height * .62 + py, dive ? 35 : 24, t * .85 * tempo + 1, '#8c62ff');
      drawJelly(ctx, width * .1 - px * .5, height * .7 + py, dive ? 19 : 12, t * 1.3 * tempo + 2, '#b9ff66');

      const floor = ctx.createLinearGradient(0, height * .76, 0, height);
      floor.addColorStop(0, 'rgba(5,11,22,0)');
      floor.addColorStop(1, '#02040a');
      ctx.fillStyle = floor;
      ctx.fillRect(0, height * .72, width, height * .28);
    };

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) frame = requestAnimationFrame(draw);
      else cancelAnimationFrame(frame);
    }, { threshold: .05 });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    observer.observe(host);
    host.addEventListener('pointermove', onPointerMove, { passive: true });
    const onFullscreenChange = () => setImmersive(document.fullscreenElement === host);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const toggleImmersive = async (event) => {
    event.stopPropagation();
    playChimeSynth();
    const host = sceneRef.current;
    if (!host) return;
    try {
      if (!document.fullscreenElement && host.requestFullscreen) {
        await host.requestFullscreen();
        setImmersive(true);
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        setImmersive((value) => !value);
      }
    } catch {
      setImmersive((value) => !value);
    }
  };

  return (
    <Card
      id="card-abyss"
      icon={<Waves size={22} />}
      title="8. Santuario Abisal"
      desc="Un océano nocturno donde lo inmenso y lo diminuto respiran dentro de la misma corriente."
    >
      <div className={`marine-experience ${immersive ? 'marine-immersive' : ''}`} ref={sceneRef}>
        <canvas ref={canvasRef} className="marine-canvas" aria-label="Océano animado con una ballena, delfines, medusas y peces" />
        <div className="marine-vignette" />
        <div className="marine-hud marine-hud-top"><span>{immersive ? 'INMERSIÓN ACTIVA' : 'VENTANA PELÁGICA · 08'}</span><span>{immersive ? 'PROF. 3,860 M' : 'PROF. 1,240 M'}</span></div>
        <div className="marine-title-lockup"><span>{immersive ? 'No estás mirando el océano' : 'Debajo del ruido'}</span><strong>{immersive ? 'estás dentro.' : 'todo respira.'}</strong></div>
        {immersive && <div className="marine-sonar" aria-hidden="true"><span /><span /><span /></div>}
        {immersive && <div className="marine-dive-note">Mueve el cursor para explorar la corriente · ESC para emerger</div>}
        <div className="marine-species"><Fish size={13} /><span>4 especies en tránsito</span></div>
        <button type="button" className="marine-expand" onClick={toggleImmersive} aria-label={immersive ? 'Cerrar océano inmersivo' : 'Abrir océano inmersivo'}>
          {immersive ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          <span>{immersive ? 'Cerrar inmersión' : 'Entrar al océano'}</span>
        </button>
      </div>
    </Card>
  );
}
