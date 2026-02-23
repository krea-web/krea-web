
import React, { useState, useEffect, useRef } from 'react';
import { Globe, Target, Crosshair, Zap } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onNavigate: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isActivating, setIsActivating] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      if (!containerRef.current || isActivating || window.innerWidth < 1024) return;
      
      const xRotation = ((clientY - innerHeight / 2) / innerHeight) * 12;
      const yRotation = ((clientX - innerWidth / 2) / innerWidth) * -12;
      setRotate({ x: xRotation, y: yRotation });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActivating, isInView]);

  const handleCubeInteraction = () => {
    if (isActivating) return;
    setIsActivating(true);
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 1000);
    setTimeout(() => setIsActivating(false), 2500);
  };

  const t = {
    it: {
      badge: "GLOBAL DIGITAL ARCHITECTURE",
      title: "KREA",
      span: "il tuo spazio sul we",
      spanEnd: "b",
      location: "GLOBAL INNOVATION • MARKET DOMINANCE",
      desc: "Architettiamo ecosistemi digitali d'élite unendo ingegneria estrema e visione strategica globale.",
      cta1: "PROVA A KREARE"
    },
    en: {
      badge: "GLOBAL DIGITAL ARCHITECTURE",
      title: "KREA",
      span: "your space on the we",
      spanEnd: "b",
      location: "GLOBAL INNOVATION • MARKET DOMINANCE",
      desc: "Architecting elite digital ecosystems that merge uncompromising engineering with global strategic excellence.",
      cta1: "TRY KREATING"
    }
  }[lang];

  return (
    <div ref={heroRef} className="pt-24 tablet:pt-32 laptop:pt-48 pb-16 tablet:pb-24 flex flex-col items-center justify-center relative px-4 xs:px-6 overflow-hidden min-h-screen bg-black">
      
      {showRipple && (
        <div className="absolute top-[25%] tablet:top-[30%] laptop:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] bg-blue-500/40 rounded-full animate-ripple pointer-events-none z-20"></div>
      )}

      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className={`absolute top-[20%] left-10 w-24 h-24 border border-white/5 rounded-full flex items-center justify-center ${isInView ? 'animate-spin-slow' : ''}`}>
              <Target size={14} className="text-blue-500 opacity-40" />
          </div>
          <div className={`absolute bottom-[20%] right-10 w-32 h-32 border border-white/5 rounded-full flex items-center justify-center ${isInView ? 'animate-spin-slow-reverse' : ''}`}>
              <Crosshair size={16} className="text-blue-500 opacity-40" />
          </div>
      </div>

      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] md:h-[900px] bg-blue-600/[0.08] blur-[150px] md:blur-[220px] rounded-full -z-10 ${isInView ? 'animate-pulse' : ''}`}></div>
      
      <div className="relative mb-6 tablet:mb-10 laptop:mb-20 h-28 tablet:h-40 laptop:h-52 flex items-center justify-center z-50">
        <div 
          className={`scene cursor-pointer transition-all duration-1000 ${isActivating ? 'scale-110' : 'scale-[0.55] tablet:scale-[0.75] laptop:scale-[0.85]'} magnetic-target group`} 
          onClick={handleCubeInteraction}
        >
          <div className={`cube ${isActivating ? 'animate-sync' : isInView ? 'animate-spin-infinite' : ''}`}>
            <div className="cube-core">
                <div className="core-glow animate-pulse"></div>
                <div className="core-rings animate-spin-slow"></div>
            </div>
            {['front', 'back', 'right', 'left', 'top', 'bottom'].map((side) => (
              <div key={side} className={`cube-face face-${side} transition-all duration-700 flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-white/5 pointer-events-none"></div>
                <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-blue-500/30"></div>
                <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-blue-500/30"></div>
                <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-blue-500/30"></div>
                <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-blue-500/30"></div>
                <div className="absolute inset-x-0 h-[1px] bg-blue-500/10 top-1/2 -translate-y-1/2"></div>
                <div className="absolute inset-y-0 w-[1px] bg-blue-500/10 left-1/2 -translate-x-1/2"></div>
                <span className={`text-4xl tablet:text-5xl laptop:text-6xl font-black transition-all duration-1000 ${isActivating ? 'text-blue-400 scale-110 drop-shadow-[0_0_20px_#3b82f6]' : 'text-white/80'} heading relative z-10`}>K</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`absolute -bottom-10 w-24 tablet:w-48 h-6 bg-blue-500/20 blur-2xl rounded-full scale-x-150 transition-all duration-1000 ${isActivating ? 'opacity-80 scale-x-[2] bg-blue-600/30' : 'opacity-30'}`}></div>
      </div>

      <div ref={containerRef} className="text-center max-w-7xl space-y-6 tablet:space-y-10 laptop:space-y-14 relative z-10" style={{ perspective: '2000px' }}>
        <div className="space-y-4 transition-transform duration-700 ease-out" style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`, transformStyle: 'preserve-3d' }}>
          <div className="inline-flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 glass rounded-full border-blue-500/40 text-blue-400 text-[8px] tablet:text-[10px] laptop:text-[11px] font-black tracking-[0.4em] laptop:tracking-[0.7em] uppercase mb-4 shadow-[0_0_40px_rgba(59,130,246,0.2)]" style={{ transform: 'translateZ(30px)' }}>
            <Globe size={12} className="tablet:w-4 tablet:h-4 animate-spin-slow text-blue-500" />
            {t.badge}
          </div>
          <h1 className="flex flex-col items-center select-none" style={{ transformStyle: 'preserve-3d' }}>
            <span className="text-[18vw] tablet:text-[14vw] laptop:text-[16rem] heading font-black leading-[0.7] tracking-[-0.08em] uppercase blur-in block" style={{ transform: 'translateZ(120px)' }}>
              {t.title}
            </span>
            <span className="text-[4.5vw] tablet:text-[3vw] laptop:text-6xl serif italic text-gradient-blue leading-none tracking-[-0.02em] blur-in block mt-[-0.1rem] tablet:mt-[-0.5rem] lowercase" style={{ animationDelay: '0.3s', transform: 'translateZ(180px)' }}>
              {t.span}<span className="text-white font-bold not-italic">{t.spanEnd}</span>
            </span>
          </h1>
        </div>
        
        <div className="space-y-4 tablet:space-y-6 blur-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-[7px] tablet:text-[9px] laptop:text-[11px] text-blue-500/60 tracking-[0.4em] tablet:tracking-[0.6em] laptop:tracking-[0.9em] font-black uppercase px-4">{t.location}</p>
          <div className="max-w-4xl mx-auto space-y-3 tablet:space-y-6">
            <p className="text-gray-400 text-sm tablet:text-xl laptop:text-3xl leading-relaxed font-light px-4 tablet:px-8 italic">
              {t.desc}
            </p>
          </div>
        </div>

        <div className="pt-6 tablet:pt-12 laptop:pt-16 flex flex-col sm:flex-row items-center justify-center gap-4 tablet:gap-8 laptop:gap-10 blur-in px-4 xs:px-6" style={{ animationDelay: '0.9s' }}>
          <div className="luminous-btn-wrapper w-full sm:w-auto magnetic-target scale-100 laptop:scale-125 desktop:scale-150 transition-transform duration-500">
            <button onClick={() => onNavigate('ai-engine')} className="luminous-btn-content px-10 tablet:px-14 laptop:px-16 py-4 tablet:py-5 laptop:py-6 text-[10px] tablet:text-[11px] laptop:text-[12px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 w-full sm:w-auto">
              {t.cta1}
              <Zap size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .scene { width: 80px; height: 80px; perspective: 1200px; }
        @media (min-width: 768px) { .scene { width: 120px; height: 120px; } }
        @media (min-width: 1024px) { .scene { width: 160px; height: 160px; } }
        .cube { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .cube-face { position: absolute; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(10px); border: 1px solid rgba(59, 130, 246, 0.25); backface-visibility: visible; box-shadow: inset 0 0 30px rgba(59, 130, 246, 0.15); }
        .cube-core { position: absolute; top: 50%; left: 50%; width: 45%; height: 45%; transform: translate(-50%, -50%); transform-style: preserve-3d; }
        .core-glow { position: absolute; inset: 0; background: #3b82f6; filter: blur(20px); border-radius: 50%; opacity: 0.7; }
        .core-rings { position: absolute; inset: -25%; border: 1.5px dashed rgba(59, 130, 246, 0.4); border-radius: 50%; }
        .face-front  { transform: rotateY(0deg) translateZ(40px); }
        .face-back   { transform: rotateY(180deg) translateZ(40px); }
        .face-right  { transform: rotateY(90deg) translateZ(40px); }
        .face-left   { transform: rotateY(-90deg) translateZ(40px); }
        .face-top    { transform: rotateX(90deg) translateZ(40px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(40px); }
        @media (min-width: 768px) { .face-front { transform: rotateY(0deg) translateZ(60px); } .face-back { transform: rotateY(180deg) translateZ(60px); } .face-right { transform: rotateY(90deg) translateZ(60px); } .face-left { transform: rotateY(-90deg) translateZ(60px); } .face-top { transform: rotateX(90deg) translateZ(60px); } .face-bottom { transform: rotateX(-90deg) translateZ(60px); } }
        @media (min-width: 1024px) { .face-front { transform: rotateY(0deg) translateZ(80px); } .face-back { transform: rotateY(180deg) translateZ(80px); } .face-right { transform: rotateY(90deg) translateZ(80px); } .face-left { transform: rotateY(-90deg) translateZ(80px); } .face-top { transform: rotateX(90deg) translateZ(80px); } .face-bottom { transform: rotateX(-90deg) translateZ(80px); } }
        .animate-spin-slow { animation: spin 30s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-reverse 25s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-infinite { animation: spinCube 25s linear infinite; } 
        @keyframes spinCube { 0% { transform: rotateX(0deg) rotateY(0deg); } 100% { transform: rotateX(360deg) rotateY(720deg); } }
        .animate-sync { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) !important; }
        @keyframes ripple { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(15); opacity: 0; } }
        .animate-ripple { animation: ripple 1s cubic-bezier(0, 0, 0, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
};
