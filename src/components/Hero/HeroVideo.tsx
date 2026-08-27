import React from 'react';

export const HeroVideo: React.FC = () => {
  return (
    <div className="hero-video-container" aria-hidden="true">
      {/* High-fidelity static poster backdrop (always present for 0 CLS and instant LCP) */}
      <div
        className="hero-video-poster"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, #f7f7f9 0%, #ffffff 75%)',
          zIndex: 0,
        }}
      />
      {/* Soft ambient depth lighting */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '15%',
          width: '70%',
          height: '80%',
          background: 'radial-gradient(circle, rgba(0, 0, 0, 0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div className="hero-video-overlay" style={{ zIndex: 2 }} />
    </div>
  );
};


