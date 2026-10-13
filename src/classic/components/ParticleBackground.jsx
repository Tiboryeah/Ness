import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];
    let lastFrame = 0;
    const frameInterval = 1000 / 15;
    
    // Palette: Morado Eléctrico, Verde Esmeralda, Rosa Pastel, Blanco Nube
    const colours = [
      'rgba(168, 85, 247, 0.45)', // Purple
      'rgba(16, 185, 129, 0.45)', // Emerald Green
      'rgba(244, 114, 182, 0.45)', // Pink
      'rgba(240, 253, 244, 0.5)',  // White petal / mist
      'rgba(52, 211, 153, 0.4)'   // Mint Green
    ];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Types: 'petal' (botanical leaf/petal), 'star' (soft glowing spark)
        this.type = Math.random() > 0.45 ? 'petal' : 'star';
        this.size = this.type === 'petal' ? Math.random() * 5 + 4 : Math.random() * 2.5 + 1.2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = -(Math.random() * 0.45 + 0.15); // gentle upward drift
        this.color = colours[Math.floor(Math.random() * colours.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.02 - 0.01;
        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.spin;

        // Reset when drifted out of viewport
        if (this.y < -20) {
          this.y = canvas.height + 20;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        if (this.type === 'star') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 0;
          ctx.fill();
        } else {
          // Curved petal
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.moveTo(0, -this.size * 1.5);
          ctx.quadraticCurveTo(this.size, 0, 0, this.size * 1.5);
          ctx.quadraticCurveTo(-this.size, 0, 0, -this.size * 1.5);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    function initParticles() {
      particlesArray = [];
      const isMobile = window.innerWidth <= 768;
      const targetCount = isMobile ? 4 : Math.min(14, Math.floor((canvas.width * canvas.height) / 72000));
      for (let i = 0; i < targetCount; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles(timestamp) {
      if (timestamp - lastFrame >= frameInterval) {
        lastFrame = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach((p) => {
          p.update();
          p.draw();
        });
      }
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastFrame = 0;
        animationFrameId = requestAnimationFrame(animateParticles);
      }
    }

    initParticles();
    animationFrameId = requestAnimationFrame(animateParticles);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} />;
}
