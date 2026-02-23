
import React, { useEffect, useState } from 'react';
// Changed import from '../App' to '../types'
import { Language } from '../types';
import { Cpu, Wifi, Globe, Instagram } from 'lucide-react';

interface FloatingWidgetsProps {
  lang: Language;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({ lang }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    it: {
      location: "OPERATIVITÀ GLOBALE",
      status: "SISTEMA ATTIVO",
      connection: "CRITTOGRAFATO",
      social: "SEGUICI"
    },
    en: {
      location: "OPERATING GLOBALLY",
      status: "SYSTEM ACTIVE",
      connection: "ENCRYPTED",
      social: "FOLLOW US"
    }
  }[lang];

  // Generiamo 20 elementi con proprietà differenziate per un background immersivo
  const ambientK = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${(i * 7.7) % 100}%`,
    top: `${(i * 13.3) % 100}%`,
    size: 20 + ((i * 17) % 120),
    blur: (i % 3) * 2,
    opacity: 0.03 + ((i % 5) * 0.02),
    parallax: 0.02 + ((i % 10) * 0.015),
    rotation: i * 25
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] hidden lg:block">
      {/* Widget Laterale Sinistro: Localizzazione */}
      <div 
        className="absolute left-10 top-1/3 transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      >
        <div className="animate-float">
          <div className="glass px-3 py-10 rounded-full border-white/10 flex flex-col items-center gap-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
            <span 
              className="text-[10px] font-black tracking-[0.5em] text-gray-500 uppercase"
              style={{ writingMode: 'vertical-rl' }}
            >
              {t.location}
            </span>
            <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
              <Globe size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Widget Laterale Destro: Stato Sistema */}
      <div 
        className="absolute right-10 top-1/2 transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${scrollY * -0.25}px)` }}
      >
        <div className="animate-float" style={{ animationDelay: '1s' }}>
          <div className="glass p-6 rounded-3xl border-white/10 space-y-4 shadow-[0_0_50px_rgba(59,130,246,0.1)] min-w-[180px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[9px] font-black text-white tracking-widest">{t.status}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-[11px] font-black text-blue-400 animate-bounce">K</span>
                <Cpu size={14} className="text-blue-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 animate-[loading_3s_infinite]" style={{ width: '60%' }}></div>
              </div>
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 animate-[loading_5s_infinite]" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-40">
              <Wifi size={10} />
              <span className="text-[8px] font-bold tracking-tighter uppercase">{t.connection}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Indicator */}
      <div 
        className="absolute left-1/4 bottom-20 transition-transform duration-500 ease-out"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="animate-float flex items-center gap-3 glass px-4 py-2 rounded-full border-blue-500/20">
            <Instagram size={14} className="text-blue-500" />
            <span className="text-[10px] font-black tracking-widest text-blue-400">{t.social} @KREA.WEBB</span>
        </div>
      </div>

      {/* BACKGROUND AMBIENT BRANDING (K-CLOUD) */}
      {ambientK.map((k) => (
        <div 
            key={k.id}
            className="absolute pointer-events-none transition-transform duration-[4000ms] ease-out select-none"
            style={{ 
                left: k.left, 
                top: k.top,
                opacity: k.opacity,
                transform: `translateY(${scrollY * k.parallax}px) rotate(${k.rotation + (scrollY * 0.05)}deg)`,
                filter: `blur(${k.blur}px)`
            }}
        >
            <span 
              className="font-black text-blue-500 block leading-none"
              style={{ fontSize: `${k.size}px` }}
            >
              K
            </span>
        </div>
      ))}

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};
