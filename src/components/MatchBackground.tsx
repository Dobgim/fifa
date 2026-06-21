import React from 'react';

interface MatchBackgroundProps {
  flagA: string;
  flagB: string;
  className?: string;
}

const MatchBackground: React.FC<MatchBackgroundProps> = ({ flagA, flagB, className = '' }) => {
  const isSpecialA = flagA === '🏆' || flagA === '⚽' || flagA.toLowerCase() === 'tbd';
  const isSpecialB = flagB === '🏆' || flagB === '⚽' || flagB.toLowerCase() === 'tbd';

  const urlA = isSpecialA ? null : `https://flagcdn.com/w640/${flagA.toLowerCase()}.png`;
  const urlB = isSpecialB ? null : `https://flagcdn.com/w640/${flagB.toLowerCase()}.png`;

  return (
    <div className={`absolute inset-0 w-full h-full flex overflow-hidden select-none pointer-events-none ${className}`}>
      {/* Left side: Flag A */}
      <div className="relative w-1/2 h-full overflow-hidden bg-slate-950">
        {urlA ? (
          <img
            src={urlA}
            alt="Team A flag backdrop"
            className="w-full h-full object-cover scale-125 blur-[1.5px] opacity-45 saturate-150 origin-left"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">{flagA}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-950/70 to-slate-950" />
      </div>

      {/* Right side: Flag B */}
      <div className="relative w-1/2 h-full overflow-hidden bg-slate-950">
        {urlB ? (
          <img
            src={urlB}
            alt="Team B flag backdrop"
            className="w-full h-full object-cover scale-125 blur-[1.5px] opacity-45 saturate-150 origin-right"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">{flagB}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950/20 via-slate-950/70 to-slate-950" />
      </div>

      {/* Pitch-green radial highlight overlay in the center for football premium aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,177,64,0.18)_0%,transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#090b0e_98%)]" />
      
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#090b0e] to-transparent" />
    </div>
  );
};

export default MatchBackground;
