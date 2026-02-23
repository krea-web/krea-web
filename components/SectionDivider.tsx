
import React from 'react';

export const SectionDivider: React.FC = () => {
  return (
    <div className="relative w-full h-[1px] my-4 md:my-0 reveal flex items-center justify-center pointer-events-none z-10">
      {/* Main gradient line fading at edges */}
      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      
      {/* Central glowing hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
        <div className="w-16 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80"></div>
        <div className="w-1.5 h-1.5 bg-black border border-blue-500 rotate-45 z-10"></div>
        <div className="w-16 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80"></div>
      </div>

      {/* Vertical ticks */}
      <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[1px] h-2 bg-blue-500/10"></div>
      <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[1px] h-2 bg-blue-500/10"></div>
    </div>
  );
};
