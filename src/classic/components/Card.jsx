import React, { useEffect, useRef } from 'react';

export default function Card({ id, icon, title, desc, children }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        card.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || !window.matchMedia('(pointer: fine)').matches) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const clientX = e.clientX;
    const clientY = e.clientY;
    frameRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.transform = `perspective(1200px) translateY(-6px) rotateX(${((y / rect.height) - .5) * -3}deg) rotateY(${((x / rect.width) - .5) * 3}deg)`;
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    card.style.transform = 'none';
  };

  return (
    <div 
      className="card glass" 
      id={id} 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-glow"></div>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p className="card-desc">{desc}</p>
      <div className="card-interaction">
        {children}
      </div>
    </div>
  );
}
