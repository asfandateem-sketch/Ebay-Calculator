import React from 'react';
import { HeroVideo } from './HeroVideo';
import { HeroContent } from './HeroContent';

interface HeroProps {
  onCalculateClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCalculateClick, onHowItWorksClick }) => {
  return (
    <section id="hero-section" className="hero-stage">
      <HeroVideo />
      <HeroContent
        onCalculateClick={onCalculateClick}
        onHowItWorksClick={onHowItWorksClick}
      />
    </section>
  );
};
