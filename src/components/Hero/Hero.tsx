import React from 'react';
import { HeroVideo } from './HeroVideo';
import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';

interface HeroProps {
  onCalculateClick: () => void;
  onExploreHubClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onCalculateClick,
  onExploreHubClick,
}) => {
  return (
    <section id="hero-section" className="hero-luxury-stage">
      <HeroVideo />
      <div className="hero-luxury-wrapper container">
        <div className="hero-luxury-grid">
          <HeroContent
            onCalculateClick={onCalculateClick}
            onExploreHubClick={onExploreHubClick}
          />
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};
