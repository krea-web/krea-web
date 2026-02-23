
import React from 'react';

export const TechMarquee: React.FC = () => {
  const wordsRow1 = ["LUXURY DESIGN", "GLOBAL STRATEGY", "KREA", "INNOVATION", "SARDINIA", "ELITE CODE", "BEYOND FORM"];
  const wordsRow2 = ["PURE PERFORMANCE", "NEURAL ARCHITECTURE", "CONCEPT POWERED", "OAK LOGIC", "DATA DRIVEN", "VISION"];
  
  return (
    <div className="py-16 md:py-24 relative overflow-hidden bg-[#030303] flex flex-col gap-2 md:gap-4">
      {/* Maschere di dissolvenza ai lati */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none"></div>

      {/* Riga 1: Scorrimento verso SINISTRA */}
      <div className="flex whitespace-nowrap overflow-hidden group">
        <div className="flex animate-scroll-marquee-left items-center">
          {[...wordsRow1, ...wordsRow1, ...wordsRow1].map((word, i) => (
            <div key={i} className="flex items-center">
              <span className="text-[4rem] md:text-[7rem] font-black heading tracking-tighter uppercase transition-all duration-700 select-none px-6 md:px-12 text-transparent stroke-text hover:text-blue-500 cursor-none italic">
                {word}
              </span>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,1)] animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Riga 2: Scorrimento verso DESTRA */}
      <div className="flex whitespace-nowrap overflow-hidden group">
        <div className="flex animate-scroll-marquee-right items-center">
          {[...wordsRow2, ...wordsRow2, ...wordsRow2].map((word, i) => (
            <div key={i} className="flex items-center">
              <span className="text-[4rem] md:text-[7rem] font-black heading tracking-tighter uppercase transition-all duration-700 select-none px-6 md:px-12 text-transparent stroke-text-white hover:text-white cursor-none">
                {word}
              </span>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/20 border border-white/40"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(59, 130, 246, 0.4);
        }
        .stroke-text-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
        }
        
        @keyframes scroll-marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        
        @keyframes scroll-marquee-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        
        .animate-scroll-marquee-left {
          animation: scroll-marquee-left 40s linear infinite;
        }
        
        .animate-scroll-marquee-right {
          animation: scroll-marquee-right 50s linear infinite;
        }

        .group:hover .animate-scroll-marquee-left,
        .group:hover .animate-scroll-marquee-right {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
