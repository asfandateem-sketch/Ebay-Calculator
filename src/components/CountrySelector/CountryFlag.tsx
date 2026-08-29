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
  width = 18,
  height = 13,
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
          <path fill="#bd3d44" d="M0 0h640v480H0z" />
          <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203.1h640M0 277h640M0 350.8h640M0 424.6h640" />
          <path fill="#192f5d" d="M0 0h295.4v258.5H0z" />
          <g fill="#fff">
            {/* Optimized clean star matrix for ultra-fast rendering */}
            {[
              [24, 21], [74, 21], [124, 21], [174, 21], [224, 21], [274, 21],
              [49, 43], [99, 43], [149, 43], [199, 43], [249, 43],
              [24, 65], [74, 65], [124, 65], [174, 65], [224, 65], [274, 65],
              [49, 87], [99, 87], [149, 87], [199, 87], [249, 87],
              [24, 109], [74, 109], [124, 109], [174, 109], [224, 109], [274, 109],
              [49, 131], [99, 131], [149, 131], [199, 131], [249, 131],
              [24, 153], [74, 153], [124, 153], [174, 153], [224, 153], [274, 153],
              [49, 175], [99, 175], [149, 175], [199, 175], [249, 175],
              [24, 197], [74, 197], [124, 197], [174, 197], [224, 197], [274, 197],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="5" />
            ))}
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
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path fill="#fff" d="m75 0 245 180L565 0h75v45L435 240l205 150v90h-75L320 300 75 480H0v-45l205-195L0 90V0h75z" />
          <path fill="#c8102e" d="m424 281 216 159v40l-240-175 24-24zm-208-82L0 40V0l240 175-24 24zM640 0v3l-216 160 24 24L640 40V0zM0 480v-3l216-160-24-24L0 440v40z" />
          <path fill="#fff" d="M240 0h160v480H240zM0 160h640v160H0z" />
          <path fill="#c8102e" d="M266.7 0h106.6v480H266.7zM0 186.7h640v106.6H0z" />
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
          <path fill="#ff0000" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M160 0h320v480H160z" />
          <path
            fill="#ff0000"
            d="M320 80l15 48 37-14-12 37 45 6-31 29 24 35-42-2-12 40-24-34-24 34-12-40-42 2 24-35-31-29 45-6-12-37 37 14 15-48z"
          />
          <path fill="#ff0000" d="M315 250h10v70h-10z" />
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
          <path fill="#00008b" d="M0 0h640v480H0z" />
          {/* Canton Mini Union Jack */}
          <g transform="scale(0.5)">
            <path fill="#012169" d="M0 0h640v480H0z" />
            <path fill="#fff" d="m75 0 245 180L565 0h75v45L435 240l205 150v90h-75L320 300 75 480H0v-45l205-195L0 90V0h75z" />
            <path fill="#c8102e" d="m424 281 216 159v40l-240-175 24-24zm-208-82L0 40V0l240 175-24 24zM640 0v3l-216 160 24 24L640 40V0zM0 480v-3l216-160-24-24L0 440v40z" />
            <path fill="#fff" d="M240 0h160v480H240zM0 160h640v160H0z" />
            <path fill="#c8102e" d="M266.7 0h106.6v480H266.7zM0 186.7h640v106.6H0z" />
          </g>
          {/* Commonwealth Star & Southern Cross */}
          <g fill="#fff">
            <circle cx="160" cy="360" r="22" />
            <circle cx="480" cy="95" r="10" />
            <circle cx="560" cy="195" r="10" />
            <circle cx="480" cy="395" r="10" />
            <circle cx="410" cy="225" r="10" />
            <circle cx="450" cy="290" r="6" />
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
          <path fill="#000" d="M0 0h640v160H0z" />
          <path fill="#dd0000" d="M0 160h640v160H0z" />
          <path fill="#ffce00" d="M0 320h640v160H0z" />
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
          <path fill="#002395" d="M0 0h213.3v480H0z" />
          <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
          <path fill="#ed2939" d="M426.7 0H640v480H426.7z" />
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
          <path fill="#009246" d="M0 0h213.3v480H0z" />
          <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
          <path fill="#ce2b37" d="M426.7 0H640v480H426.7z" />
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
          <path fill="#c60b1e" d="M0 0h640v120H0z" />
          <path fill="#ffc400" d="M0 120h640v240H0z" />
          <path fill="#c60b1e" d="M0 360h640v120H0z" />
          <circle cx="160" cy="240" r="28" fill="#c60b1e" opacity="0.85" />
          <circle cx="160" cy="240" r="20" fill="#ffc400" />
        </svg>
      );

    default:
      return null;
  }
};
