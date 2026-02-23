
import React, { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    setProgress(scrollPercent);
    setIsVisible(scrollTop > 400);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, [updateScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[150] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-75 pointer-events-none'
      }`}
    >
      <button 
        onClick={scrollToTop}
        className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center group outline-none magnetic-target"
        aria-label="Scroll to top"
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Glass Background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 group-hover:border-blue-500/40 transition-all duration-500 shadow-2xl"></div>

        {/* Progress Ring SVG */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="2"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-blue-500 transition-all duration-300 ease-out"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-0.5 group-hover:-translate-y-1 transition-transform duration-500">
          <ArrowUp size={16} className="text-white group-hover:text-blue-400 transition-colors" />
          <span className="text-[6px] font-black tracking-[0.3em] text-blue-500/60 uppercase">TOP</span>
        </div>

        {/* HUD Decoration Details */}
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-blue-500/0 group-hover:border-blue-500/50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 rounded-tr-sm"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-blue-500/0 group-hover:border-blue-500/50 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-500 rounded-bl-sm"></div>
        
        {/* Percentage Tooltip on Hover */}
        <div className="absolute -left-14 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="text-[8px] font-mono text-blue-400">{Math.round(progress)}%</span>
        </div>
      </button>
    </div>
  );
};
