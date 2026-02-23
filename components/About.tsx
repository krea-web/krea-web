
import React, { useState, useRef, useEffect } from 'react';
import { 
  Instagram, 
  ShieldCheck, 
  Binary, 
  Dna, 
  Target, 
  Trophy, 
  Zap, 
  Activity, 
  Cpu, 
  RefreshCw, 
  QrCode, 
  Fingerprint, 
  Layers, 
  BarChart3, 
  Network, 
  Palette, 
  Sparkles 
} from 'lucide-react';
// Changed import from '../App' to '../types'
import { Language } from '../types';

interface AboutProps {
  lang: Language;
  onNavigate: (id: string) => void;
}

const KCube: React.FC = () => {
  return (
    <div className="scene-container pointer-events-none">
      <div className="absolute inset-0 bg-blue-600/5 blur-[60px] md:blur-[80px] rounded-full animate-pulse pointer-events-none"></div>
      
      <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-0 animate-float" style={{ animationDelay: '0.2s' }}>
             <span className="text-[5px] md:text-[6px] font-mono text-blue-500/40 uppercase tracking-widest bg-black/40 px-2 py-1 border border-white/5 rounded-md">SYNC_CORE: OK</span>
          </div>
          <div className="absolute bottom-4 right-0 animate-float" style={{ animationDelay: '1s' }}>
             <span className="text-[5px] md:text-[6px] font-mono text-blue-500/40 uppercase tracking-widest bg-black/40 px-2 py-1 border border-white/5 rounded-md">DATA_v9.2</span>
          </div>
      </div>

      <div className="cube-main-container">
        <div className="k-die outer-cage animate-cube-rotate-slow">
          {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
            <div key={face} className={`die-face outer-face face-${face}`}>
              <div className="absolute inset-2 border border-blue-500/20 rounded-sm"></div>
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500/60"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500/60"></div>
            </div>
          ))}
        </div>

        <div className="k-die inner-core animate-cube-rotate">
          {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
            <div key={face} className={`die-face inner-face face-${face}`}>
              <div className="absolute inset-0 bg-blue-600/5"></div>
              <span className="heading font-black text-white drop-shadow-[0_0_15px_#3b82f6] relative z-10">K</span>
              <div className="absolute inset-0 overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-600/10 to-transparent"></div>
              </div>
            </div>
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-1/2 h-1/2 bg-blue-500 rounded-full blur-2xl animate-pulse opacity-60"></div>
             <div className="w-1/4 h-1/4 bg-white rounded-full blur-lg animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="cube-pedestal pointer-events-none">
         <div className="absolute inset-0 bg-blue-500/40 blur-2xl animate-pulse scale-x-150"></div>
         <div className="absolute inset-0 bg-blue-400/20 blur-md rounded-full border border-blue-500/20"></div>
      </div>

      <style>{`
        .scene-container { width: 150px; height: 150px; perspective: 1000px; display: flex; align-items: center; justify-content: center; margin: 0 auto; position: relative; }
        @media (min-width: 768px) { .scene-container { width: 300px; height: 300px; perspective: 1200px; } }
        .cube-main-container { width: 60px; height: 60px; transform-style: preserve-3d; position: relative; z-index: 10; }
        @media (min-width: 768px) { .cube-main-container { width: 120px; height: 120px; } }
        .k-die { width: 100%; height: 100%; position: absolute; inset: 0; transform-style: preserve-3d; }
        .outer-cage { transform: scale(1.35); opacity: 0.6; }
        .inner-core { transform: scale(1); }
        .die-face { position: absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; backface-visibility: visible; }
        .outer-face { background: rgba(59, 130, 246, 0.03); border: 1px solid rgba(59, 130, 246, 0.15); backdrop-filter: blur(2px); }
        .inner-face { background: rgba(2, 6, 23, 0.95); border: 1px solid rgba(59, 130, 246, 0.4); font-size: 1.8rem; box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.2); }
        @media (min-width: 768px) { .inner-face { font-size: 4rem; } }
        .face-front  { transform: rotateY(0deg) translateZ(30px); }
        .face-back   { transform: rotateY(180deg) translateZ(30px); }
        .face-right  { transform: rotateY(90deg) translateZ(30px); }
        .face-left   { transform: rotateY(-90deg) translateZ(30px); }
        .face-top    { transform: rotateX(90deg) translateZ(30px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(30px); }
        @media (min-width: 768px) {
          .face-front  { transform: rotateY(0deg) translateZ(60px); }
          .face-back   { transform: rotateY(180deg) translateZ(60px); }
          .face-right  { transform: rotateY(90deg) translateZ(60px); }
          .face-left   { transform: rotateY(-90deg) translateZ(60px); }
          .face-top    { transform: rotateX(90deg) translateZ(60px); }
          .face-bottom { transform: rotateX(-90deg) translateZ(60px); }
        }
        .cube-pedestal { position: absolute; bottom: 20%; left: 50%; transform: translateX(-50%); width: 60px; height: 8px; z-index: 1; }
        @media (min-width: 768px) { .cube-pedestal { width: 140px; height: 12px; } }
        @keyframes cube-rotate { 0% { transform: rotateX(0deg) rotateY(0deg); } 100% { transform: rotateX(360deg) rotateY(720deg); } }
        @keyframes cube-rotate-slow { 0% { transform: scale(1.35) rotateX(360deg) rotateY(0deg); } 100% { transform: scale(1.35) rotateX(0deg) rotateY(360deg); } }
        .animate-cube-rotate { animation: cube-rotate 25s linear infinite; }
        .animate-cube-rotate-slow { animation: cube-rotate-slow 40s linear infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const FounderCard: React.FC<{ founder: any; index: number; lang: Language; onNavigate: (id: string) => void }> = ({ founder, index, lang, onNavigate }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isDario = index === 0;
  
  const expertise = isDario 
    ? [
        { name: "Systems Engine", level: 99, icon: <Cpu size={12}/> },
        { name: "Cyber Protocol", level: 96, icon: <ShieldCheck size={12}/> },
        { name: "UX Architecture", level: 98, icon: <Fingerprint size={12}/> }
      ]
    : [
        { name: "Luxury Design", level: 99, icon: <Palette size={12}/> },
        { name: "Visual Narrative", level: 98, icon: <Sparkles size={12}/> },
        { name: "Global Scale", level: 97, icon: <Network size={12}/> }
      ];

  const imageUrl = isDario 
    ? "https://i.postimg.cc/v8S242MJ/Dario-jpg.jpg" 
    : "https://i.postimg.cc/C15ThJZ5/Michele-jpg.jpg"; 

  return (
    <div 
      className="group min-h-[500px] xs:min-h-[550px] tablet:min-h-[650px] w-full perspective-2000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-all duration-1000 preserve-3d shadow-2xl ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-black">
          {/* Semplificazione dell'immagine per maggiore robustezza */}
          <div className="w-full h-full absolute inset-0">
            <img 
              src={imageUrl} 
              alt={founder.name} 
              loading="lazy"
              width="800"
              height="1200"
              fetchPriority={index === 0 ? "high" : "auto"}
              style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: '100%' }}
              className={`transition-all duration-[2s] group-hover:scale-110 
                ${!isDario 
                  ? 'brightness-[0.8] grayscale-[0.1]' 
                  : 'brightness-[0.8] grayscale-[0.1]'
                } 
                group-hover:brightness-100 group-hover:grayscale-0`}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90 pointer-events-none"></div>
          
          {/* HUD OVERLAY FRONT */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
             <div className="flex justify-between items-start opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-[7px] font-mono font-bold tracking-[0.2em] text-white">ID_SCAN: ACTIVE</span>
                   </div>
                   <div className="text-[6px] font-mono text-blue-400">REF_SYS: 0x82A{index}</div>
                </div>
                <div className="w-10 h-10 border-t border-r border-white/20"></div>
             </div>

             <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-blue-600"></div>
                  <span className="text-blue-500 text-[8px] tablet:text-[10px] font-black tracking-[0.4em] uppercase">{founder.role}</span>
                </div>
                <h4 className="text-3xl xs:text-4xl md:text-5xl font-black text-white heading tracking-tighter uppercase leading-none">{founder.name.split(' ')[0]}<br/><span className="text-blue-600 italic serif lowercase">{founder.name.split(' ')[1]}.</span></h4>
             </div>
          </div>
        </div>

        {/* BACK SIDE (DOSSIER STYLE) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-blue-600/30 bg-[#050508] flex flex-col shadow-[0_0_50px_rgba(59,130,246,0.15)]">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="absolute top-0 right-0 p-10 opacity-[0.05] pointer-events-none"><QrCode size={150} /></div>

            <div className="relative z-10 p-8 xs:p-10 tablet:p-12 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10 pb-6 border-b border-white/5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-blue-500">
                       <Binary size={14} className="animate-pulse" />
                       <span className="text-[8px] font-black tracking-[0.5em] uppercase">Executive Classification</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-black heading text-white uppercase tracking-tight">{founder.name}</h4>
                    <div className="flex items-center gap-2">
                       <div className="px-2 py-0.5 bg-blue-600/10 border border-blue-500/20 rounded-md text-[6px] font-mono text-blue-400">ACCESS_LEVEL: OMEGA</div>
                       <div className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-md text-[6px] font-mono text-green-400">STATUS: ONLINE</div>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center">
                    <ShieldCheck size={24} className="text-blue-500/60" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-10">
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 opacity-30">
                        <Activity size={10} className="text-blue-500" />
                        <span className="text-[7px] font-black tracking-widest uppercase text-white">Neural Biography</span>
                     </div>
                     <p className="text-sm md:text-base text-gray-400 font-light italic leading-relaxed pl-4 border-l border-blue-600/20">
                        "{founder.bio}"
                     </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2 opacity-30">
                        <BarChart3 size={10} className="text-blue-500" />
                        <span className="text-[7px] font-black tracking-widest uppercase text-white">Synchronization Matrix</span>
                    </div>
                    <div className="grid gap-5">
                      {expertise.map((skill, i) => (
                        <div key={i} className="space-y-2 group/skill">
                          <div className="flex justify-between items-center text-[8px] font-black tracking-widest uppercase">
                            <div className="flex items-center gap-2 text-blue-200/60 group-hover/skill:text-blue-400 transition-colors">
                               {skill.icon}
                               {skill.name}
                            </div>
                            <span className="text-white font-mono">{skill.level}%</span>
                          </div>
                          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 shadow-[0_0_10px_#3b82f6] transition-all duration-1000 ease-out" 
                              style={{ width: isFlipped ? `${skill.level}%` : '0%' }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-10 mt-auto flex items-center justify-between border-t border-white/5">
                  <div className="flex gap-6">
                    <Instagram size={18} className="text-gray-600 hover:text-blue-500 transition-all hover:scale-110 cursor-pointer" />
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate('booking'); }} 
                    className="relative group/btn overflow-hidden px-8 py-3 bg-white text-black rounded-xl text-[9px] font-black tracking-[0.3em] uppercase transition-all active:scale-95"
                  >
                    <span className="relative z-10">INITIATE_CONTACT</span>
                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                  </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export const About: React.FC<AboutProps> = ({ lang, onNavigate }) => {
  const [titleTilt, setTitleTilt] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTitleMove = (e: React.MouseEvent) => {
    if (!titleContainerRef.current || window.innerWidth < 1024) return;
    const rect = titleContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    setTitleTilt({ x: rotateX, y: rotateY });
  };

  const resetTitleTilt = () => setTitleTilt({ x: 0, y: 0 });

  const depthScale = windowWidth < 768 ? 0.35 : windowWidth < 1100 ? 0.6 : 1;
  const perspectiveValue = windowWidth < 768 ? 1000 : windowWidth < 1100 ? 1500 : 2000;

  const t = {
    it: {
      label: "KREA IDENTITY & STRATEGY",
      titlePart1: "KREA",
      titlePart2: "WEB",
      missionLabel: "Il Manifesto KREA",
      missionTitle: "MISSION",
      missionDetail: "KREA è l'hub di ingegneria estetica che proietta la Sardegna nello scenario globale. Fondiamo il rigore algoritmico con un design di lusso per assicurare il dominio sui mercati internazionali.",
      visionTitle: "VISION",
      visionDetail: "Crediamo in un web opera dove la performance è l'unica verità assoluta. Progettiamo per catturare l'attenzione e convertire l'ambizione in valore misurabile e tangibile.",
      pillars: [
        { icon: <Dna size={18} />, title: "DNA UNICO", desc: "Design sartoriale che riflette l'identità del tuo brand." },
        { icon: <Target size={18} />, title: "DOMINIO", desc: "Strategie nate per conquistarare quote di mercato." },
        { icon: <Trophy size={18} />, title: "ELITE", desc: "Performance estreme senza alcun compromesso." }
      ],
      founders: [
        { name: "Dario Deiana", role: "FOUNDER", bio: "Architetto di sistemi ad alte prestazioni. Integra protocolli di sicurezza avanzati e strutture UX d'élite per creare ecosistemi digitali inattaccabili. Converte la complessità tecnica in pura potenza operativa." },
        { name: "Michele Putzu", role: "FOUNDER", bio: "Maestro della narrazione visiva e del design d'eccellenza. Plasma l'estetica di brand globali attraverso interfacce di lusso e linguaggi grafici d'avanguardia. Trasforma ogni pixel in un'esperienza sensoriale di prestigio." }
      ]
    },
    en: {
      label: "KREA IDENTITY & STRATEGY",
      titlePart1: "KREA",
      titlePart2: "WEB",
      missionLabel: "OUR MANIFESTO",
      missionTitle: "MISSION",
      missionDetail: "KREA is the aesthetic engineering hub projecting Sardinia onto the global stage. We blend algorithmic rigor with luxury design to ensure dominance in international markets.",
      visionTitle: "VISION",
      visionDetail: "We believe in a web where performance is the only absolute truth. We design to capture attention and convert ambition into measurable, tangible value.",
      pillars: [
        { icon: <Dna size={18} />, title: "UNIQUE DNA", desc: "Tailored design reflecting your brand's identity." },
        { icon: <Target size={18} />, title: "DOMINANCE", desc: "Strategies born to conquer market shares." },
        { icon: <Trophy size={18} />, title: "ELITE", desc: "Extreme performance without any compromise." }
      ],
      founders: [
        { name: "Dario Deiana", role: "FOUNDER", bio: "High-performance systems architect. Integrates advanced security protocols and elite UX structures to create unassailable digital ecosystems. Converts technical complexity into pure operational power." },
        { name: "Michele Putzu", role: "FOUNDER", bio: "Master of visual storytelling and luxury design. Shapes the aesthetics of global brands through luxury interfaces and cutting-edge graphic languages. Transforms every pixel in a prestigious sensory experience." }
      ]
    }
  }[lang];

  return (
    <div className="py-12 md:py-24 laptop:py-32 px-4 xs:px-6 bg-transparent relative overflow-hidden" id="about">
      <div className="absolute top-0 left-0 w-full h-[1200px] bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.04)_0%,transparent_60%)] -z-10 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 tablet:mb-24 reveal px-2">
          <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center animate-float">
                <div className="absolute inset-0 bg-blue-600 rounded-lg rotate-45 shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
                <div className="absolute inset-[2px] bg-black rounded-lg rotate-45"></div>
                <span className="relative font-black text-white text-sm md:text-base z-10 heading animate-pulse">K</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border-blue-500/10 text-blue-500/80 text-[7px] md:text-[9px] font-black tracking-[0.4em] uppercase">
                {t.label}
              </div>
          </div>

          <div 
            ref={titleContainerRef}
            onMouseMove={handleTitleMove}
            onMouseLeave={resetTitleTilt}
            className="py-6 md:py-12 flex items-center justify-center overflow-visible w-full"
            style={{ perspective: `${perspectiveValue}px` }}
          >
            <h2 
              className="heading font-black tracking-tighter leading-[0.95] md:leading-[0.8] uppercase flex flex-col items-center select-none transition-transform duration-700 ease-out w-full px-4"
              style={{ 
                transform: `rotateX(${titleTilt.x}deg) rotateY(${titleTilt.y}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <span 
                className="text-[18vw] tablet:text-[14vw] laptop:text-[16rem] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] block text-center leading-[0.7] blur-in" 
                style={{ transform: `translateZ(${35 * depthScale}px)` }}
              >
                {t.titlePart1}
              </span>
              <span 
                className="text-[10vw] tablet:text-[7vw] laptop:text-8xl text-blue-600 font-black heading uppercase tracking-tighter mt-1 md:mt-2 opacity-95 drop-shadow-[0_0_40px_rgba(59,130,246,0.3)] block text-center animate-shrink-word blur-in" 
                style={{ transform: `translateZ(${70 * depthScale}px)`, animationDelay: '0.3s' }}
              >
                {t.titlePart2}
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16 tablet:mb-24 reveal">
            <div className="lg:col-span-5 flex flex-col items-center order-2 lg:order-1 mt-4 lg:mt-0">
                <KCube />
                <div className="mt-8 text-center">
                    <span className="text-blue-500/50 font-black text-[7px] tablet:text-[10px] tracking-[0.4em] uppercase px-4 py-1.5 border border-blue-500/20 rounded-lg bg-blue-600/5">{t.missionLabel}</span>
                </div>
            </div>
            <div className="lg:col-span-7 space-y-6 lg:space-y-10 order-1 lg:order-2">
                <div className="space-y-4">
                    <h3 className="text-lg xs:text-xl md:text-4xl font-black heading text-white uppercase leading-tight tracking-tight">{t.missionTitle}</h3>
                    <p className="text-sm xs:text-base md:text-xl text-gray-400 font-light italic leading-relaxed border-l border-blue-600/30 pl-6">
                        {t.missionDetail}
                    </p>
                </div>
                <div className="space-y-4">
                    <h3 className="text-base xs:text-lg md:text-2xl font-black heading text-white/80 uppercase leading-tight tracking-tight">{t.visionTitle}</h3>
                    <p className="text-[12px] xs:text-sm md:text-lg text-blue-100/30 font-light leading-relaxed max-w-xl">
                        {t.visionDetail}
                    </p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 tablet:gap-6 mb-16 tablet:mb-24 reveal">
            {t.pillars.map((pillar, i) => (
                <div key={i} className="glass p-6 tablet:p-8 rounded-[1.8rem] border-white/5 bg-slate-900/20 hover:border-blue-500/20 transition-all duration-500 group">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-600/5 border border-blue-500/10 flex items-center justify-center text-blue-500/60 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {pillar.icon}
                    </div>
                    <h4 className="text-[12px] md:text-sm font-black tracking-[0.2em] text-white/90 uppercase mb-2">{pillar.title}</h4>
                    <p className="text-[11px] md:text-xs text-gray-500 italic leading-relaxed font-light">{pillar.desc}</p>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 reveal">
            {t.founders.map((f, i) => (
                <FounderCard key={i} founder={f} index={i} lang={lang} onNavigate={onNavigate} />
            ))}
        </div>

        <div className="mt-16 tablet:mt-24 pt-10 border-t border-white/5 text-center reveal">
            <p className="text-[6px] tablet:text-[8px] font-black tracking-[0.6em] text-gray-800 uppercase">
                ENGINEERING • DESIGN • DOMINANCE
            </p>
        </div>
      </div>
      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .preserve-3d { transform-style: preserve-3d; }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.01); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.2); border-radius: 10px; }
        
        @keyframes shrink-word {
          0% { letter-spacing: 0.5em; opacity: 0; filter: blur(10px); transform: scale(1.1) translateZ(100px); }
          100% { letter-spacing: normal; opacity: 0.95; filter: blur(0); transform: scale(1) translateZ(70px); }
        }
        .animate-shrink-word {
          animation: shrink-word 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
