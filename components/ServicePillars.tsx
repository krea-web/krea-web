
import React from 'react';
import { Zap, Shield, Globe, Cpu, ShieldCheck, Activity } from 'lucide-react';
// Changed import from '../App' to '../types'
import { Language } from '../types';

interface ServicePillarsProps {
  lang: Language;
}

export const ServicePillars: React.FC<ServicePillarsProps> = ({ lang }) => {
  const t = {
    it: {
      subtitle: "ECCELLENZA OPERATIVA",
      titlePart1: "I Pilastri",
      titlePart2: "Del Successo.",
      pillars: [
        {
          id: "PHASE_01",
          icon: <Zap size={20} />,
          title: "Performance",
          desc: "Sistemi ottimizzati per caricamenti istantanei e fluidità estrema. Latenza zero come standard di base per ogni architettura.",
          tag: "ULTRA_LOW_LATENCY",
          metrics: "SPEED: < 0.3s"
        },
        {
          id: "PHASE_02",
          icon: <Shield size={20} />,
          title: "Sicurezza",
          desc: "Protezione dei dati con standard bancari e crittografia avanzata AES-256. Ogni byte è blindato da protocolli d'élite.",
          tag: "CYBER_ARMOR_v2",
          metrics: "SEC: 100%"
        },
        {
          id: "PHASE_03",
          icon: <Globe size={20} />,
          title: "Scalabilità",
          desc: "Architetture pronte a sostenere milioni di utenti globali. Progettate per crescere senza mai degradare le prestazioni.",
          tag: "GLOBAL_CLUSTER",
          metrics: "UPTIME: 100%"
        },
        {
          id: "PHASE_04",
          icon: <Cpu size={20} />,
          title: "Neural Core",
          desc: "Integrazione di modelli generativi e predittivi su misura. Trasformiamo l'intelligenza in vantaggio competitivo reale.",
          tag: "NEURAL_SYNAPSE",
          metrics: "AI: ON"
        }
      ]
    },
    en: {
      subtitle: "OPERATIONAL EXCELLENCE",
      titlePart1: "Pillars",
      titlePart2: "Of Success.",
      pillars: [
        {
          id: "PHASE_01",
          icon: <Zap size={20} />,
          title: "Performance",
          desc: "Systems optimized for instant loading and extreme fluidity. Zero latency as a base standard for every architecture.",
          tag: "ULTRA_LOW_LATENCY",
          metrics: "SPEED: < 0.3s"
        },
        {
          id: "PHASE_02",
          icon: <Shield size={20} />,
          title: "Security",
          desc: "Data protection with banking standards and advanced AES-256 encryption. Every byte is locked by elite protocols.",
          tag: "CYBER_ARMOR_v2",
          metrics: "SEC: 100%"
        },
        {
          id: "PHASE_03",
          icon: <Globe size={20} />,
          title: "Scalability",
          desc: "Architectures ready to support millions of global users. Designed to grow without ever degrading performance.",
          tag: "GLOBAL_CLUSTER",
          metrics: "UPTIME: 100%"
        },
        {
          id: "PHASE_04",
          icon: <Cpu size={20} />,
          title: "Neural Core",
          desc: "Integration of tailored generative and predictive models. We transform intelligence into real competitive advantage.",
          tag: "NEURAL_SYNAPSE",
          metrics: "AI: ON"
        }
      ]
    }
  }[lang];

  return (
    <section 
      className="py-24 md:py-40 px-6 bg-[#020617] relative overflow-visible z-10"
      id="pillars"
    >
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/[0.03] blur-[250px] pointer-events-none"></div>
      
      {/* Seamless Transition Gradient Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-24 md:mb-40 reveal">
          <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full border-blue-500/20 text-blue-500 mb-8">
            <ShieldCheck size={14} className="animate-pulse" />
            <p className="font-black text-[10px] md:text-[11px] tracking-[0.5em] uppercase">{t.subtitle}</p>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl heading font-black text-white tracking-tighter uppercase leading-[0.85]">
            {t.titlePart1} <br />
            <span className="text-blue-600 italic font-light serif capitalize">{t.titlePart2}</span>
          </h2>
        </div>

        <div className="relative">
          {/* Luminous Central Beam - Extended to connect to next section */}
          <div className="absolute left-6 md:left-1/2 -top-20 -bottom-32 w-[1px] bg-gradient-to-b from-transparent via-blue-600/50 to-blue-500/80 -translate-x-1/2 hidden md:block overflow-hidden z-0">
             <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent animate-beam-flow"></div>
             {/* Glow effect */}
             <div className="absolute inset-0 w-full h-full shadow-[0_0_25px_rgba(59,130,246,0.6)] opacity-40"></div>
          </div>

          <div className="space-y-16 md:space-y-32 relative z-10">
            {t.pillars.map((pillar, i) => (
              <div 
                key={i} 
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 reveal ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Central Interaction Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full glass border border-blue-400/40 flex items-center justify-center bg-black z-30 hidden md:flex group/node transition-all duration-700 hover:scale-125">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md group-hover/node:blur-xl transition-all"></div>
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,1)] z-10"></div>
                </div>

                <div className="w-full md:w-[46%]">
                   <div className="relative group perspective-1000">
                      <div className="absolute -inset-1 bg-blue-600/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      
                      <div className="relative glass p-8 md:p-12 rounded-[2.5rem] border-white/5 bg-slate-950/60 backdrop-blur-3xl group-hover:border-blue-500/30 transition-all duration-700 overflow-hidden">
                        
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700">
                              {pillar.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[9px] md:text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase">{pillar.id}</span>
                              <span className="text-[7px] font-mono text-gray-700">{pillar.tag}</span>
                            </div>
                          </div>
                          <div className="text-right">
                             <span className="text-lg md:text-xl font-black text-white heading tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">{pillar.metrics}</span>
                          </div>
                        </div>
                        
                        <h4 className="text-xl md:text-2xl lg:text-3xl font-black text-white heading uppercase tracking-tight mb-4 group-hover:text-blue-500 transition-colors">
                          {pillar.title}
                        </h4>
                        
                        <p className="text-gray-400 text-sm md:text-base lg:text-lg italic font-light leading-relaxed border-l border-blue-600/20 pl-6 group-hover:text-gray-200 transition-colors">
                          {pillar.desc}
                        </p>
                      </div>
                   </div>
                </div>

                <div className="hidden md:block md:w-[54%]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes beam-flow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-beam-flow {
          animation: beam-flow 3s linear infinite;
        }
      `}</style>
    </section>
  );
};
