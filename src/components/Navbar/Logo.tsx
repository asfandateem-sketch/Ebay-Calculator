import React from 'react';
import { SITE_CONFIG } from '../../config/site';
import { RouterLink } from '../RouterLink';

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ onClick, className = '' }) => {
  return (
    <RouterLink
      id="brand-logo"
      to="/"
      onClick={onClick}
      className={`brand-logo ${className}`}
      aria-label={`${SITE_CONFIG.name} Home`}
    >
      <svg
        className="brand-icon-svg"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Two rotated rounded rectangles at -35 degrees representing balance & profit */}
        <g transform="rotate(-35 16 16)">
          <rect
            x="7"
            y="6"
            width="7"
            height="20"
            rx="3.5"
            fill="currentColor"
          />
          <rect
            x="18"
            y="9"
            width="7"
            height="15"
            rx="3.5"
            fill="currentColor"
          />
        </g>
      </svg>
      <span className="brand-name-text">{SITE_CONFIG.name}</span>
    </RouterLink>
  );
};
