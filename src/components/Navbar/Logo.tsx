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

  const emblemHeight = isSmall ? 26 : isLarge ? 38 : 32;
  const emblemWidth = Math.round(emblemHeight * 1.5);

  return (
    <RouterLink
      id="brand-logo"
      to="/"
      onClick={onClick}
      className={`brand-logo brand-logo-new ${className}`}
      aria-label={`${SITE_CONFIG.name} Home`}
    >
      {/* Official SMC Monogram Emblem */}
      <div className="brand-emblem-wrapper" style={{ width: emblemWidth, height: emblemHeight }}>
        <svg
          viewBox="0 0 500 320"
          className="brand-emblem-svg"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="navSmcBlueBright" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="40%" stopColor="#00b4d8" />
              <stop offset="100%" stopColor="#0066ff" />
            </linearGradient>
            <linearGradient id="navSmcBlueDeep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0077ff" />
              <stop offset="100%" stopColor="#003db3" />
            </linearGradient>
            <linearGradient id="navSmcBlueDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004cd8" />
              <stop offset="100%" stopColor="#001f66" />
            </linearGradient>
            <linearGradient id="navSmcArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0055ff" />
              <stop offset="50%" stopColor="#00b4d8" />
              <stop offset="100%" stopColor="#00f5ff" />
            </linearGradient>
            <linearGradient id="navSmcBarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0066ff" />
              <stop offset="100%" stopColor="#00d2ff" />
            </linearGradient>
            <linearGradient id="navSmcWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          <g id="nav-smc-group">
            {/* LETTER S */}
            <path
              className="logo-emblem-letter-s"
              d="M 195 62 L 140 62 C 102 62 72 88 72 124 C 72 158 98 178 138 186 L 158 190 C 182 195 194 204 194 218 C 194 234 178 246 152 246 C 122 246 98 232 90 208 L 40 220 C 54 264 96 288 152 288 C 210 288 248 256 248 214 C 248 174 220 154 178 146 L 156 142 C 136 138 126 130 126 118 C 126 104 140 94 162 94 L 195 94 Z"
              fill="url(#navSmcWhiteGrad)"
            />

            {/* LETTER C */}
            <path
              className="logo-emblem-letter-c"
              d="M 378 96 C 362 74 336 62 300 62 C 236 62 190 112 190 175 C 190 238 236 288 300 288 C 342 288 372 272 390 244 L 350 216 C 338 234 322 244 300 244 C 265 244 242 214 242 175 C 242 136 265 106 300 106 C 324 106 342 118 352 136 Z"
              fill="url(#navSmcWhiteGrad)"
            />

            {/* THREE RISING BARS */}
            <rect x="314" y="180" width="13" height="42" rx="3" fill="url(#navSmcBarGrad)" />
            <rect x="333" y="152" width="13" height="70" rx="3" fill="url(#navSmcBarGrad)" />
            <rect x="352" y="122" width="13" height="100" rx="3" fill="url(#navSmcBarGrad)" />

            {/* UPWARD SWOOPING ARROW */}
            <path
              d="M 282 258 C 322 258 370 215 402 142 L 388 134 C 358 200 318 238 282 238 Z"
              fill="url(#navSmcArrowGrad)"
            />
            <polygon points="418,122 384,136 398,154" fill="url(#navSmcArrowGrad)" />

            {/* 3D FACETED ORIGAMI 'M' */}
            <polygon points="172,94 220,166 186,166 150,94" fill="url(#navSmcBlueBright)" />
            <polygon points="186,166 220,166 250,236 228,236" fill="url(#navSmcBlueDark)" />
            <polygon points="228,236 250,236 304,64 278,64" fill="url(#navSmcBlueBright)" />
            <polygon points="278,64 304,64 304,244 278,206" fill="url(#navSmcBlueDeep)" />
            <polygon points="278,206 304,244 336,220 322,204" fill="url(#navSmcBlueDark)" />
          </g>
        </svg>
      </div>

      {/* Brand Typography & Tagline Container */}
      <div className="brand-text-container">
        <div className="brand-name-row">
          <span className="brand-text-seller">SELLER</span>
          <span className="brand-text-margin">MARGIN</span>
          <span className="brand-text-calc">CALC</span>
        </div>
        {showTagline && (
          <div className="brand-tagline-row">
            <span className="brand-tagline-word">CALCULATE</span>
            <span className="brand-tagline-dot">•</span>
            <span className="brand-tagline-word">ANALYZE</span>
            <span className="brand-tagline-dot">•</span>
            <span className="brand-tagline-word">MAXIMIZE</span>
          </div>
        )}
      </div>
    </RouterLink>
  );
};

