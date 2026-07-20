import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];
    const colours = ['#800020', '#c73e55', '#e8a7b0', '#d4af37', '#fdf5e6'];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height;
        this.type = Math.random() > 0.5 ? 'bubble' : 'key';
        
        // Keys can be slightly larger to make details visible
        this.size = this.type === 'key' ? Math.random() * 6 + 7 : Math.random() * 7 + 4;
        
        this.speedX = Math.random() * 0.8 - 0.4;
        // Bubbles rise slightly faster, keys drift slowly
        this.speedY = this.type === 'bubble' ? -(Math.random() * 0.8 + 0.4) : -(Math.random() * 0.5 + 0.2);
        
        this.color = colours[Math.floor(Math.random() * colours.length)];
        this.opacity = this.type === 'bubble' ? Math.random() * 0.25 + 0.15 : Math.random() * 0.35 + 0.25;
        this.rotation = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.015 - 0.0075;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.type === 'key') {
          this.rotation += this.spin;
        }

        // reset to bottom if out of view
        if (this.y < -30) {
          this.y = canvas.height + 30;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        if (this.type === 'bubble') {
          // Draw translucent bubble with outline
          ctx.beginPath();
          const bubbleGrad = ctx.createRadialGradient(
            this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.1,
            this.x, this.y, this.size
          );
          bubbleGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
          bubbleGrad.addColorStop(0.3, 'rgba(212, 175, 55, 0.06)'); // subtle gold tint
          bubbleGrad.addColorStop(0.7, 'rgba(199, 62, 85, 0.08)');  // subtle wine tint
          bubbleGrad.addColorStop(1, 'rgba(255, 255, 255, 0.03)');
          
          ctx.fillStyle = bubbleGrad;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
          ctx.lineWidth = 1;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Highlight dot
          ctx.beginPath();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.arc(this.x - this.size * 0.35, this.y - this.size * 0.35, this.size * 0.18, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw Victorian Key
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          ctx.strokeStyle = this.color;
          ctx.fillStyle = this.color;
          ctx.lineWidth = 1.2;

          const s = this.size / 6; // scaling factor

          // Key handle (bow) - double loops
          ctx.beginPath();
          ctx.arc(0, -6 * s, 4 * s, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.arc(0, -6 * s, 1.8 * s, 0, Math.PI * 2);
          ctx.stroke();

          // Shaft
          ctx.beginPath();
          ctx.moveTo(0, -2 * s);
          ctx.lineTo(0, 10 * s);
          ctx.stroke();

          // Teeth (bit)
          ctx.fillRect(0, 5 * s, 3.5 * s, 1.8 * s);
          ctx.fillRect(0, 7.8 * s, 2.5 * s, 1.8 * s);
        }
        ctx.restore();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} />;
}
