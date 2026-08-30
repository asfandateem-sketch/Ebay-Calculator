import React from 'react';
import { SITE_CONFIG } from '../../config/site';
import { RouterLink } from '../RouterLink';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  onClick,
  className = '',
  showTagline = true,
  size = 'md',
}) => {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const emblemSize = isSmall ? 30 : isLarge ? 46 : 38;

  return (
    <RouterLink
      id="brand-logo"
      to="/"
      onClick={onClick}
      className={`brand-logo brand-logo-new ${className}`}
      aria-label={`${SITE_CONFIG.name} Home`}
    >
      {/* Official ProfitEbay Circular Emblem */}
      <div className="brand-emblem-wrapper" style={{ width: emblemSize, height: emblemSize }}>
        <svg
          viewBox="0 0 400 400"
          className="brand-emblem-svg"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logoBlueGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0080ff" />
              <stop offset="100%" stopColor="#0060e6" />
            </linearGradient>
          </defs>

          {/* Dark Slate Outer Right Arc */}
          <path
            d="M 200 32 A 168 168 0 0 1 368 200 A 168 168 0 0 1 182 367 L 182 328 A 129 129 0 0 0 329 200 A 129 129 0 0 0 200 71 Z"
            fill="#2c3545"
          />

          {/* Main Outer Blue P Arc */}
          <path
            d="M 188 32 A 168 168 0 0 0 22 200 C 22 288 88 359 174 367 L 174 328 C 109 320 59 266 59 200 C 59 129 117 71 188 71 Z"
            fill="url(#logoBlueGradNav)"
          />

          {/* Blue P Upper Loop */}
          <path
            d="M 174 71 L 210 71 C 265 71 310 116 310 171 C 310 222 272 263 222 270 L 222 231 C 251 224 271 199 271 171 C 271 137 244 110 210 110 L 174 110 Z"
            fill="url(#logoBlueGradNav)"
          />

          {/* Blue P Inner Vertical Stem */}
          <path
            d="M 135 110 L 174 110 L 174 365 L 135 365 Z"
            fill="url(#logoBlueGradNav)"
          />
          <path
            d="M 135 231 L 222 231 L 222 270 L 135 270 Z"
            fill="url(#logoBlueGradNav)"
          />

          {/* 3 Growth Bar Charts in Slate */}
          <rect x="185" y="286" width="16" height="34" rx="3" fill="#2c3545" />
          <rect x="209" y="268" width="16" height="52" rx="3" fill="#2c3545" />
          <rect x="233" y="244" width="16" height="76" rx="3" fill="#2c3545" />

          {/* Sweeping Growth Arrow */}
          <path
            d="M 184 330 C 228 326 298 276 324 205 L 312 198 C 289 260 226 305 184 310 Z"
            fill="url(#logoBlueGradNav)"
          />
          <polygon
            points="338,185 306,202 322,220"
            fill="url(#logoBlueGradNav)"
          />
        </svg>
      </div>

      {/* Brand Typography & Tagline Container */}
      <div className="brand-text-container">
        <div className="brand-name-row">
          <span className="brand-text-profit">Profit</span>
          <span className="brand-text-ebay">Ebay</span>
        </div>
        {showTagline && (
          <div className="brand-tagline-row">
            <span className="brand-tagline-word">CALCULATE</span>
            <span className="brand-tagline-dot">•</span>
            <span className="brand-tagline-word">ANALYZE</span>
            <span className="brand-tagline-dot">•</span>
            <span className="brand-tagline-word">PROFIT</span>
          </div>
        )}
      </div>
    </RouterLink>
  );
};
