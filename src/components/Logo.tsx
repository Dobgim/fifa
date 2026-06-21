import React from 'react';

/**
 * SVG Logo Component — Football + Ticket hybrid
 * Used in Header, Footer, and as the site identity mark.
 */
const Logo: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 48,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={className}
    aria-label="Affordable FIFA Tickets Logo"
  >
    <defs>
      <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#004494" />
        <stop offset="100%" stopColor="#002c61" />
      </linearGradient>
      <linearGradient id="logo-ticket" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff8933" />
        <stop offset="100%" stopColor="#cc5600" />
      </linearGradient>
      <linearGradient id="logo-ball" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#d0d0d0" />
      </linearGradient>
      <filter id="logo-shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(0,0,0,0.45)" />
      </filter>
    </defs>

    {/* Background circle */}
    <circle cx="100" cy="100" r="96" fill="url(#logo-bg)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />

    {/* Ticket body */}
    <g transform="translate(98,108) rotate(-12)" filter="url(#logo-shadow)">
      {/* Main ticket */}
      <rect x="-62" y="-28" width="124" height="56" rx="9" ry="9" fill="url(#logo-ticket)" />
      {/* Perforated divider */}
      <line x1="-20" y1="-28" x2="-20" y2="28" stroke="rgba(255,255,255,0.30)" strokeWidth="1.5" strokeDasharray="4,3" />
      {/* Left stub shade */}
      <rect x="-62" y="-28" width="42" height="56" rx="9" ry="0" fill="rgba(0,0,0,0.14)" />
      <rect x="-62" y="-28" width="42" height="56" rx="9" ry="9" fill="none" />
      {/* Notch circles (for stamp/tear line) */}
      <circle cx="-20" cy="-28" r="7" fill="#002c61" />
      <circle cx="-20" cy="28" r="7" fill="#002c61" />
      {/* Text lines on body */}
      <rect x="-10" y="-17" width="52" height="6" rx="3" fill="rgba(255,255,255,0.75)" />
      <rect x="-10" y="-5" width="38" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="-10" y="5" width="46" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="-10" y="14" width="30" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
      {/* Star icon on stub */}
      <text x="-40" y="-3" textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.9)" fontFamily="sans-serif">★</text>
      <rect x="-53" y="7" width="26" height="3.5" rx="1.5" fill="rgba(255,255,255,0.30)" />
      <rect x="-53" y="13" width="20" height="3.5" rx="1.5" fill="rgba(255,255,255,0.25)" />
    </g>

    {/* Football overlapping top-right of ticket */}
    <g transform="translate(120, 66)" filter="url(#logo-shadow)">
      <circle cx="0" cy="0" r="24" fill="url(#logo-ball)" stroke="#c8c8c8" strokeWidth="1.5" />
      {/* Pentagon patches */}
      <polygon points="0,-11 9.2,-4.2 5.6,7.6 -5.6,7.6 -9.2,-4.2" fill="#0f0f0f" opacity="0.85" />
      <polygon points="0,-24 6.5,-15 0,-11 -6.5,-15" fill="#0f0f0f" opacity="0.55" />
      <polygon points="9.2,-4.2 19.5,-7.5 21.5,2.5 13,9 5.6,7.6" fill="#0f0f0f" opacity="0.50" />
      <polygon points="-9.2,-4.2 -19.5,-7.5 -21.5,2.5 -13,9 -5.6,7.6" fill="#0f0f0f" opacity="0.50" />
      <polygon points="5.6,7.6 13,9 8.5,20 0,24 -8.5,20 -13,9 -5.6,7.6" fill="#0f0f0f" opacity="0.40" />
    </g>

    {/* "AFFORDABLE" top label */}
    <text
      x="100"
      y="40"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="900"
      fontSize="10"
      fill="rgba(255,255,255,0.55)"
      letterSpacing="3"
    >
      AFFORDABLE
    </text>

    {/* Bottom arc text */}
    <path id="arc-text" d="M 22,152 A 78,78 0 0,0 178,152" fill="none" />
    <text fontFamily="Arial, sans-serif" fontWeight="800" fontSize="10.5" fill="rgba(255,255,255,0.65)" letterSpacing="1.8">
      <textPath href="#arc-text" startOffset="10%">FIFA WORLD CUP 2026™</textPath>
    </text>
  </svg>
);

export default Logo;
