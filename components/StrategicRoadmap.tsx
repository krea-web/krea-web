
import React from 'react';
import { Layers, Target, Cpu, ShieldCheck, Zap, ArrowDown } from 'lucide-react';
// Changed import from '../App' to '../types'
import { Language } from '../types';

interface StrategicRoadmapProps {
  lang: Language;
}

export const StrategicRoadmap: React.FC<StrategicRoadmapProps> = ({ lang }) => {
  const t = {
    it: {
      subtitle: "ENGINEERING PROCESS",
      title: "Roadmap Strategica.",
      desc: "Dall'analisi del DNA del brand alla dominazione del mercato. Un processo lineare di precisione chirurgica.",
      steps: [
        {
          id: "PHASE_01",
          title: "Discovery & DNA",
          desc: "Analisi profonda del mercato e decrittazione dei valori core del brand.",
          icon: <Target size={24} />,
          metrics: "DATA_READ: 100%"
        },
        {
          id: "PHASE_02",
          title: "Architecture Design",
          desc: "Progettazione dell'ecosistema digitale con focus su scalabilità e UX d'élite.",
          icon: <Layers size={24} />,
          metrics: "STRUCTURE: OK"
        },
        {
          id: "PHASE_03",
          title: "Core Development",
          desc: "Ingegnerizzazione del codice con standard di sicurezza e performance estremi.",
          icon: <Cpu size={24} />,
          metrics: "BUILD: STABLE"
        },
        {
          id: "PHASE_04",
          title: "Market Dominance",
          desc: "Lancio e ottimizzazione continua per garantire la leadership di settore.",
          icon: <Zap size={24} />,
          metrics: "ROI_TARGET: REACHED"
        }
      ]
    },
    en: {
      subtitle: "ENGINEERING PROCESS",
      title: "Strategic Roadmap.",
      desc: "From brand DNA analysis to market dominance. A linear process of surgical precision.",
      steps: [
        {
          id: "PHASE_01",
          title: "Discovery & DNA",
          desc: "Deep market analysis and decryption of core brand values.",
          icon: <Target size={24} />,
          metrics: "DATA_READ: 100%"
        },
        {
          id: "PHASE_02",
          title: "Architecture Design",
          desc: "Design of the digital ecosystem with a focus on scalability and elite UX.",
          icon: <Layers size={24} />,
          metrics: "STRUCTURE: OK"
        },
        {
          id: "PHASE_03",
          title: "Core Development",
          desc: "Code engineering with extreme security and performance standards.",
          icon: <Cpu size={24} />,
          metrics: "BUILD: STABLE"
        },
        {
          id: "PHASE_04",
          title: "Market Dominance",
          desc: "Launch and continuous optimization to ensure industry leadership.",
          icon: <Zap size={24} />,
          metrics: "ROI_TARGET: REACHED"
        }
      ]
    }
  }[lang];

  return (
    <section className="py-24 md:py-48 px-6 bg-[#030303] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-10 mb-24 md:mb-32 reveal">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full border-blue-500/20 text-blue-500 shadow-xl">
              <ShieldCheck size={14} className="animate-pulse" />
              <p className="font-black text-[9px] md:text-[10px] tracking-[0.5em] uppercase">{t.subtitle}</p>
            </div>
            <h2 className="text-5xl md:text-8xl heading font-black text-white tracking-tighter uppercase leading-[0.85]">
              {t.title}
            </h2>
          </div>
          <p className="text-gray-500 text-lg md:text-2xl italic font-light max-w-xl border-l border-blue-600/30 pl-8">
            {t.desc}
          </p>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-600/50 via-blue-600/20 to-transparent -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12 md:space-y-24">
            {t.steps.map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-24 reveal ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                
                {/* Visual Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass border border-blue-500/40 flex items-center justify-center bg-black z-10 hidden md:flex">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,1)]"></div>
                </div>

                <div className="w-full md:w-1/2">
                   <div className={`glass p-10 rounded-[3rem] border-white/5 group hover:border-blue-500/40 transition-all duration-700 relative overflow-hidden spotlight ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                            {step.icon}
                          </div>
                          <span className="text-[10px] font-black tracking-widest text-blue-500 uppercase">{step.id}</span>
                        </div>
                        <span className="text-[8px] font-mono text-gray-700">{step.metrics}</span>
                      </div>
                      
                      <h4 className="text-2xl md:text-3xl font-black text-white heading uppercase tracking-tight mb-4 group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-gray-500 italic font-light leading-relaxed">
                        {step.desc}
                      </p>
                   </div>
                </div>
                
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
