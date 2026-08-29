import React from 'react';

interface CountryFlagProps {
  code: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  ariaLabel?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  code,
  className = '',
  width = 20,
  height = 14,
  ariaLabel,
}) => {
  const normalizedCode = code.toUpperCase();
  const label = ariaLabel || `${normalizedCode} flag`;

  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderRadius: '2px',
    flexShrink: 0,
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  };

  switch (normalizedCode) {
    case 'US':
    case 'USA':
      return (
        <svg
          viewBox="0 0 640 480"
          width={width}
          height={height}
          className={`country-flag-svg ${className}`}
          style={baseStyle}
          role="img"
          aria-label={label}
        >
          <g fillRule="evenodd">
            <path fill="#bd3d44" d="M0 0h640v480H0z" />
            <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203.1h640M0 277h640M0 350.8h640M0 424.6h640" />
            <path fill="#192f5d" d="M0 0h295.4v258.5H0z" />
            {/* Star grid */}
            <g fill="#fff">
              {[
                [24.6, 21.5], [73.8, 21.5], [123, 21.5], [172.3, 21.5], [221.5, 21.5], [270.8, 21.5],
                [49.2, 43], [98.5, 43], [147.7, 43], [197, 43], [246.2, 43],
                [24.6, 64.6], [73.8, 64.6], [123, 64.6], [172.3, 64.6], [221.5, 64.6], [270.8, 64.6],
                [49.2, 86.2], [98.5, 86.2], [147.7, 86.2], [197, 86.2], [246.2, 86.2],
                [24.6, 107.7], [73.8, 107.7], [123, 107.7], [172.3, 107.7], [221.5, 107.7], [270.8, 107.7],
                [49.2, 129.2], [98.5, 129.2], [147.7, 129.2], [197, 129.2], [246.2, 129.2],
                [24.6, 150.8], [73.8, 150.8], [123, 150.8], [172.3, 150.8], [221.5, 150.8], [270.8, 150.8],
                [49.2, 172.3], [98.5, 172.3], [147.7, 172.3], [197, 172.3], [246.2, 172.3],
                [24.6, 193.8], [73.8, 193.8], [123, 193.8], [172.3, 193.8], [221.5, 193.8], [270.8, 193.8],
              ].map(([cx, cy], idx) => (
                <polygon
                  key={idx}
                  points={`${cx},${cy - 8} ${cx + 2.5},${cy - 2.5} ${cx + 8},${cy - 2.5} ${cx + 3.5},${cy + 1.5} ${cx + 5},${cy + 7} ${cx},${cy + 3.5} ${cx - 5},${cy + 7} ${cx - 3.5},${cy + 1.5} ${cx - 8},${cy - 2.5} ${cx - 2.5},${cy - 2.5}`}
                />
              ))}
            </g>
          </g>
        </svg>
      );

    case 'UK':
    case 'GB':
      return (
        <svg
          viewBox="0 0 640 480"
          width={width}
          height={height}
          className={`country-flag-svg ${className}`}
          style={baseStyle}
          role="img"
          aria-label={label}
        >
          <g fillRule="evenodd">
            <path fill="#012169" d="M0 0h640v480H0z" />
            <path fill="#fff" d="m75 0 245 180L565 0h75v45L435 240l205 150v90h-75L320 300 75 480H0v-45l205-195L0 90V0h75z" />
            <path fill="#c8102e" d="m424 281 216 159v40l-240-175 24-24zm-208-82L0 40V0l240 175-24 24zM640 0v3l-216 160 24 24L640 40V0zM0 480v-3l216-160-24-24L0 440v40z" />
            <path fill="#fff" d="M240 0h160v480H240zM0 160h640v160H0z" />
            <path fill="#c8102e" d="M266.7 0h106.6v480H266.7zM0 186.7h640v106.6H0z" />
          </g>
        </svg>
      );

    case 'CA':
      return (
        <svg
          viewBox="0 0 640 480"
          width={width}
          height={height}
          className={`country-flag-svg ${className}`}
          style={baseStyle}
          role="img"
          aria-label={label}
        >
          <g fillRule="evenodd">
            <path fill="#ff0000" d="M0 0h640v480H0z" />
            <path fill="#fff" d="M160 0h320v480H160z" />
            <path
              fill="#ff0000"
              d="M320 80l15 48 37-14-12 37 45 6-31 29 24 35-42-2-12 40-24-34-24 34-12-40-42 2 24-35-31-29 45-6-12-37 37 14 15-48z"
            />
            <path fill="#ff0000" d="M315 250h10v70h-10z" />
          </g>
        </svg>
      );

    case 'AU':
      return (
        <svg
          viewBox="0 0 640 480"
          width={width}
          height={height}
          className={`country-flag-svg ${className}`}
          style={baseStyle}
          role="img"
          aria-label={label}
        >
          <g fillRule="evenodd">
            <path fill="#00008b" d="M0 0h640v480H0z" />
            {/* Canton Mini Union Jack */}
            <g transform="scale(0.5)">
              <path fill="#012169" d="M0 0h640v480H0z" />
              <path fill="#fff" d="m75 0 245 180L565 0h75v45L435 240l205 150v90h-75L320 300 75 480H0v-45l205-195L0 90V0h75z" />
              <path fill="#c8102e" d="m424 281 216 159v40l-240-175 24-24zm-208-82L0 40V0l240 175-24 24zM640 0v3l-216 160 24 24L640 40V0zM0 480v-3l216-160-24-24L0 440v40z" />
              <path fill="#fff" d="M240 0h160v480H240zM0 160h640v160H0z" />
              <path fill="#c8102e" d="M266.7 0h106.6v480H266.7zM0 186.7h640v106.6H0z" />
            </g>
            {/* Commonwealth Star */}
            <g fill="#fff" transform="translate(160, 360)">
              <polygon points="0,-32 8,-12 30,-12 12,2 18,22 0,10 -18,22 -12,2 -30,-12 -8,-12" />
            </g>
            {/* Southern Cross */}
            <g fill="#fff">
              <polygon points="480,80 483,92 495,92 485,99 488,111 480,103 472,111 475,99 465,92 477,92" />
              <polygon points="560,180 563,192 575,192 565,199 568,211 560,203 552,211 555,199 545,192 557,192" />
              <polygon points="480,380 483,392 495,392 485,399 488,411 480,403 472,411 475,399 465,392 477,392" />
              <polygon points="410,210 413,222 425,222 415,229 418,241 410,233 402,241 405,229 395,222 407,222" />
              <polygon points="450,280 452,287 459,287 453,291 455,298 450,293 445,298 447,291 441,287 448,287" />
            </g>
          </g>
        </svg>
      );

    case 'DE':
      return (
        <svg
          viewBox="0 0 640 480"
          width={width}
          height={height}
          className={`country-flag-svg ${className}`}
          style={baseStyle}
          role="img"
          aria-label={label}
        >
          <g fillRule="evenodd">
            <path fill="#000" d="M0 0h640v160H0z" />
            <path fill="#dd0000" d="M0 160h640v160H0z" />
            <path fill="#ffce00" d="M0 320h640v160H0z" />
          </g>
        </svg>
      );

    case 'FR':
      return (
        <svg
          viewBox="0 0 640 480"
          width={width}
          height={height}
          className={`country-flag-svg ${className}`}
          style={baseStyle}
          role="img"
          aria-label={label}
        >
          <g fillRule="evenodd">
            <path fill="#002395" d="M0 0h213.3v480H0z" />
            <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
            <path fill="#ed2939" d="M426.7 0H640v480H426.7z" />
          </g>
        </svg>
      );

    case 'IT':
      return (
        <svg
          viewBox="0 0 640 480"
          width={width}
          height={height}
          className={`country-flag-svg ${className}`}
          style={baseStyle}
          role="img"
          aria-label={label}
        >
          <g fillRule="evenodd">
            <path fill="#009246" d="M0 0h213.3v480H0z" />
            <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
            <path fill="#ce2b37" d="M426.7 0H640v480H426.7z" />
          </g>
        </svg>
      );

    case 'ES':
      return (
        <svg
          viewBox="0 0 640 480"
          width={width}
          height={height}
          className={`country-flag-svg ${className}`}
          style={baseStyle}
          role="img"
          aria-label={label}
        >
          <g fillRule="evenodd">
            <path fill="#c60b1e" d="M0 0h640v120H0z" />
            <path fill="#ffc400" d="M0 120h640v240H0z" />
            <path fill="#c60b1e" d="M0 360h640v120H0z" />
            {/* Coat of arms emblem */}
            <circle cx="160" cy="240" r="28" fill="#c60b1e" opacity="0.8" />
            <circle cx="160" cy="240" r="20" fill="#ffc400" />
          </g>
        </svg>
      );

    default:
      return null;
  }
};
