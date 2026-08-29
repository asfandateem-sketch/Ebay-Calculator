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
      <div className="brand-logo-badge">
        <svg
          className="brand-icon-svg"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Stylized profit growth bars in brand blue */}
          <rect x="4" y="16" width="6" height="12" rx="3" fill="#2563eb" />
          <rect x="13" y="10" width="6" height="18" rx="3" fill="#3b82f6" />
          <rect x="22" y="4" width="6" height="24" rx="3" fill="#10b981" />
        </svg>
      </div>
      <div className="brand-name-group">
        <span className="brand-name-profit">Profit</span>
        <span className="brand-name-ebay">ebay</span>
        <span className="brand-version-badge">2026</span>
      </div>
    </RouterLink>
  );
};
