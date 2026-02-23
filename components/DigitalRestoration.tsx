
import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Award, Zap, Activity, Lock, Scan } from 'lucide-react';
// Changed import from '../App' to '../types'
import { Language } from '../types';

interface DigitalRestorationProps {
  lang: Language;
  onNavigate: (id: string) => void;
}

export const DigitalRestoration: React.FC<DigitalRestorationProps> = ({ lang, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  const t = {
    it: {
      badge: "SESSIONE DIAGNOSTICA ATTIVA",
      title1: "PRENOTA",
      title2: "ora",
      desc: "Trasformiamo l'inefficienza in eccellenza. Una diagnosi chirurgica della tua architettura digitale per ripristinare la massima integrità del brand e scalare globalmente.",
      btn1: "PRENOTA CALL DIAGNOSTICA",
      partner: "CERTIFIED PERFORMANCE",
      stats: {
        label: "BRAND INTEGRITY",
        val: "99.8%",
        status: "OPTIMIZED"
      }
    },
    en: {
      badge: "DIAGNOSTIC SESSION ACTIVE",
      title1: "BOOK",
      title2: "now",
      desc: "Transforming inefficiency into excellence. A surgical diagnosis of your digital architecture to restore maximum brand integrity and scale globally.",
      btn1: "BOOK DIAGNOSTIC CALL",
      partner: "CERTIFIED PERFORMANCE",
      stats: {
        label: "BRAND INTEGRITY",
        val: "99.8%",
        status: "OPTIMIZED"
      }
    }
  }[lang];

  return (
    <section 
      className="py-20 md:py-32 lg:pt-48 lg:pb-0 px-4 xs:px-6 bg-black overflow-hidden relative"
      style={{
        // Modificato: la maschera ora non sfuma in basso (100%), permettendo la connessione visiva
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 100%)'
      }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10 pb-24">
        
        <div className="lg:col-span-7 space-y-8 md:space-y-12 reveal text-center lg:text-left order-2 lg:order-1">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 glass rounded-full border-blue-500/30 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <Activity size={12} className="animate-pulse" />
              <span className="text-[8px] md:text-[10px] font-black tracking-[0.4em] uppercase">{t.badge}</span>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="heading tracking-tighter uppercase flex flex-col select-none">
              <span className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-[0_5px_20px_rgba(0,0,0,0.5)] leading-none">
                {t.title1}
              </span>
              <span className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[9rem] font-black serif italic text-blue-600 lowercase leading-[0.8] lg:ml-[-0.05em] mt-2">
                {t.title2}.
              </span>
            </h2>
          </div>

          <p className="text-gray-300 text-base md:text-xl lg:text-2xl font-medium leading-relaxed max-w-xl italic border-l-2 border-blue-600/30 pl-6 md:pl-10 mx-auto lg:mx-0">
            {t.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <div className="luminous-btn-wrapper w-full sm:w-auto group magnetic-target">
                <button 
                  onClick={() => onNavigate('booking')}
                  className="luminous-btn-content px-10 py-5 md:px-14 md:py-7 rounded-full text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-4 group w-full sm:w-auto"
                >
                  {t.btn1}
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                </button>
            </div>
          </div>

          <div className="pt-10 flex items-center justify-center lg:justify-start gap-8 opacity-40">
            <span className="text-[8px] md:text-[9px] font-black tracking-[0.4em] text-gray-400 uppercase">{t.partner}</span>
            <div className="flex items-center gap-6">
              <ShieldCheck size={20} className="text-blue-500" />
              <Award size={20} className="text-white" />
              <Lock size={18} className="text-gray-500" />
            </div>
          </div>
        </div>

        <div 
          className="lg:col-span-5 relative w-full max-w-[500px] lg:max-w-none mx-auto aspect-square lg:h-[700px] reveal perspective-2000 order-1 lg:order-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 lg:w-[100%] lg:h-full lg:right-0 bg-black rounded-[2.5rem] sm:rounded-[4rem] lg:rounded-[8rem] overflow-hidden border border-white/10 shadow-2xl group transition-transform duration-1000" style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}>
             <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" 
              alt="Lab Visualization" 
              width="1200"
              height="1200"
              fetchPriority="high"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-[5s] ease-out"
             />
             <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,1)] z-20 animate-[scan_4s_linear_infinite]"></div>
             <div className="absolute inset-0 z-10 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>

          <div className="absolute top-[15%] -left-4 sm:left-[-15%] w-[220px] xs:w-[260px] sm:w-[320px] glass rounded-[1.5rem] sm:rounded-[2rem] border-white/10 shadow-2xl p-5 sm:p-8 transform -rotate-3 hover:rotate-0 transition-all duration-700 z-30 bg-black/60 backdrop-blur-xl">
              <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                    <Scan size={16} className="text-blue-500 sm:w-[18px]" />
                  </div>
                  <div className="text-right">
                    <p className="text-[6px] sm:text-[7px] font-black text-gray-400 tracking-widest uppercase">ENCRYPT_v2</p>
                    <p className="text-[8px] sm:text-[9px] font-mono text-green-400 font-bold">LIVE_LINK_OK</p>
                  </div>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                   <div className="flex justify-between items-end mb-2">
                      <p className="text-[7px] sm:text-[8px] font-black text-white/60 tracking-widest uppercase">{t.stats.label}</p>
                      <p className="text-lg sm:text-2xl font-black text-white heading">{t.stats.val}</p>
                   </div>
                   <div className="h-1 sm:h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[99%] animate-[progress_3s_ease-out] shadow-[0_0_10px_#3b82f6]"></div>
                   </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[7px] sm:text-[8px] font-black text-green-500 tracking-[0.3em] uppercase">{t.stats.status}</span>
                </div>
              </div>
          </div>

          <div className="absolute bottom-[15%] -right-2 sm:right-[-10%] w-48 sm:w-64 glass rounded-2xl sm:rounded-3xl border-white/10 p-4 sm:p-5 shadow-2xl hidden xs:block bg-black/60 backdrop-blur-lg z-30">
             <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                   <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
                   <span className="text-[7px] font-black tracking-widest text-gray-300 uppercase">SYSTEM_FLOW</span>
                </div>
                <div className="flex flex-col gap-1.5">
                   <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-white/40 w-3/4 animate-[loading_2s_infinite]"></div>
                   </div>
                   <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500/60 w-1/2 animate-[loading_3s_infinite_reverse]"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* CONNECTION BEAM TO NEXT SECTION */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 md:h-48 z-20 overflow-hidden">
         <div className="w-full h-full bg-gradient-to-b from-transparent via-blue-600 to-blue-500 opacity-50"></div>
         <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-400 blur-sm animate-beam-drop"></div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes progress {
          from { width: 0; }
          to { width: 99.8%; }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes beam-drop {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        .animate-beam-drop { animation: beam-drop 2s linear infinite; }
        .perspective-2000 { perspective: 2000px; }
      `}</style>
    </section>
  );
};
