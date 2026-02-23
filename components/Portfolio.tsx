import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, ArrowRight, Zap, ExternalLink, 
  Cpu, Activity, X, MapPin, Home, Eye, Layers, Star, Quote, CheckCircle2
} from 'lucide-react';
import { Language } from '../types';

const EstateDemo: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="text-white bg-black min-h-screen">
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-16 md:py-20">
      <img 
        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80" 
        width="1600"
        height="1200"
        className="absolute inset-0 w-full h-full object-cover opacity-80 animate-[ken-burns_20s_ease_infinite]" 
        alt="Luxury Villa" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black opacity-80"></div>
      
      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl">
        <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-5 py-1.5 md:py-2 glass rounded-full border-white/20 mb-6 md:mb-10">
            <MapPin size={12} className="text-blue-500 md:w-4 md:h-4" />
            <span className="text-[7px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-white/90">LUXURY INTERNATIONAL NETWORK</span>
        </div>
        <h1 className="text-5xl xs:text-6xl md:text-8xl lg:text-[10rem] font-black heading tracking-tighter leading-[0.9] mb-6 md:mb-8 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] uppercase">
            VILLA <br/><span className="text-blue-600 italic font-light serif lowercase block md:inline">diamond.</span>
        </h1>
        <p className="text-sm md:text-2xl lg:text-3xl font-medium italic text-white/90 max-w-2xl mx-auto mb-10 md:mb-16 leading-snug px-4">
            {lang === 'it' ? 'L\'apoteosi del design architettonico in un ecosistema di lusso senza precedenti.' : 'The apotheosis of architectural design in an unprecedented luxury ecosystem.'}
        </p>
      </div>
    </div>
    <style>{`
        @keyframes ken-burns { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
    `}</style>
  </div>
);

const StyleDemo: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="text-white bg-[#050505] min-h-screen">
    <div className="grid lg:grid-cols-12 min-h-[100dvh]">
       <div className="lg:col-span-7 relative overflow-hidden group min-h-[350px] md:min-h-screen lg:min-h-0">
          <img 
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80" 
            className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-[3s]" 
            alt="Elite Hair" 
          />
       </div>
       <div className="lg:col-span-5 p-6 md:p-12 lg:p-20 flex flex-col justify-center bg-[#050505]">
          <h1 className="text-5xl md:text-7xl font-black heading tracking-tighter uppercase text-white">GLOBAL STYLE.</h1>
          <p className="text-base md:text-xl text-gray-500 font-medium italic mt-6">
             {lang === 'it' ? 'L\'eccellenza nella scultura del capello.' : 'Excellence in hair sculpting.'}
          </p>
       </div>
    </div>
  </div>
);

interface PortfolioProps {
  lang: Language;
}

export const Portfolio: React.FC<PortfolioProps> = ({ lang }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const tabletRef = useRef<HTMLDivElement>(null);

  const projects = [
    { 
      id: 'estate',
      name: 'LUXURY ESTATE', 
      cat: 'LUXURY REAL ESTATE', 
      img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      tagline: lang === 'it' ? 'Ecosistema per il mercato immobiliare di lusso internazionale.' : 'Ecosystem for the international luxury real estate market.',
      stats: { roi: '+45%', leads: '2.4k', time: '1.2s' }
    },
    { 
      id: 'style',
      name: 'GLOBAL STYLE', 
      cat: 'HEALTH & BEAUTY', 
      img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80',
      tagline: lang === 'it' ? 'Infrastruttura di booking per saloni d\'élite globali.' : 'Booking infrastructure for elite global salons.',
      stats: { roi: '+62%', leads: '1.8k', time: '0.8s' }
    }
  ];

  useEffect(() => {
    if (selectedDemo) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [projects.length, selectedDemo]);

  const openDemo = (id: string) => {
    setIsDemoLoading(true);
    setSelectedDemo(id);
    setTimeout(() => setIsDemoLoading(false), 1500);
  };

  const t = {
    it: {
      subtitle: "PORTFOLIO",
      mainTitle: "Success Stories",
      desc: "Progetti reali che hanno generato risultati misurabili.",
      visit: "VISITA DEMO",
      loading: "CARICAMENTO...",
      stats: { roi: "ROI CRESCITA", leads: "CONVERSIONI", perf: "PERFORMANCE" }
    },
    en: {
      subtitle: "PORTFOLIO",
      mainTitle: "Success Stories",
      desc: "Real projects that generated measurable results.",
      visit: "VISIT DEMO",
      loading: "LOADING...",
      stats: { roi: "GROWTH ROI", leads: "CONVERSIONS", perf: "PERFORMANCE" }
    }
  }[lang];

  return (
    <div className="py-24 md:py-32 px-6 max-w-7xl mx-auto relative overflow-visible">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
        
        {/* Colonna 1: Anteprima Tablet */}
        <div 
            ref={tabletRef}
            className="relative flex justify-center lg:justify-start perspective-1000 group"
        >
            <div className="bg-[#111] rounded-[3.5rem] p-3 w-full max-w-md border-[6px] border-[#222] relative overflow-hidden">
                <div className="bg-black rounded-[2.8rem] h-[500px] w-full overflow-hidden relative">
                    <div className="absolute inset-0 transition-transform duration-1000 flex" style={{ transform: `translateX(-${activeIndex * 100}%)`, width: `${projects.length * 100}%` }}>
                        {projects.map((project, i) => (
                            <img key={i} src={project.img} className="w-full h-full object-cover flex-shrink-0" alt={project.name} />
                        ))}
                    </div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                         <h4 className="text-xl font-black heading text-white uppercase">{projects[activeIndex].name}</h4>
                         <button onClick={() => openDemo(projects[activeIndex].id)} className="mt-4 bg-blue-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">{t.visit}</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Colonna 2: Testi e Statistiche */}
        <div className="space-y-8 md:space-y-10 reveal">
            <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border-blue-500/20 text-blue-500 text-[10px] font-black uppercase">
                    <Activity size={14} /> {t.subtitle}
                </div>
                <h2 className="text-5xl md:text-7xl heading font-black tracking-tighter uppercase leading-tight">{t.mainTitle}</h2>
                <p className="text-gray-500 italic font-light leading-relaxed">{t.desc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-[2rem] border-white/5">
                    <p className="text-[8px] font-black text-gray-600 uppercase mb-1">{t.stats.roi}</p>
                    <h5 className="text-xl font-black heading text-blue-500">{projects[activeIndex].stats.roi}</h5>
                </div>
                <div className="glass p-6 rounded-[2rem] border-white/5">
                    <p className="text-[8px] font-black text-gray-600 uppercase mb-1">{t.stats.leads}</p>
                    <h5 className="text-xl font-black heading text-white">{projects[activeIndex].stats.leads}</h5>
                </div>
                <div className="glass p-6 rounded-[2rem] border-white/5">
                    <p className="text-[8px] font-black text-gray-600 uppercase mb-1">{t.stats.perf}</p>
                    <h5 className="text-xl font-black heading text-green-500">{projects[activeIndex].stats.time}</h5>
                </div>
            </div>
        </div>
      </div>

      {selectedDemo && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedDemo(null)}></div>
            <div className="relative w-full h-full glass border-white/10 flex flex-col overflow-hidden">
                {isDemoLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center bg-[#080808]">
                       <span className="text-blue-500 font-black animate-pulse uppercase tracking-widest">{t.loading}</span>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto relative bg-[#080808]">
                        <button onClick={() => setSelectedDemo(null)} className="fixed top-8 right-8 z-[1200] p-4 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/10 transition-all">
                            <X size={24} />
                        </button>
                        {selectedDemo === 'estate' && <EstateDemo lang={lang} />}
                        {selectedDemo === 'style' && <StyleDemo lang={lang} />}
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
