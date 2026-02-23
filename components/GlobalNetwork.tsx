
import React, { useState, useEffect, useRef } from 'react';
import { Globe2, Radio, Activity, ShieldCheck, Zap, Terminal, Server, MapPin } from 'lucide-react';
import { Language } from '../types';

interface GlobalNetworkProps {
  lang: Language;
}

export const GlobalNetwork: React.FC<GlobalNetworkProps> = ({ lang }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [metrics, setMetrics] = useState({ ping: 14, traffic: 892, nodes: 24 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        ping: Math.floor(Math.random() * 5) + 12,
        traffic: Math.floor(Math.random() * 100) + 850,
        nodes: 24 + (Math.random() > 0.8 ? 1 : 0)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || window.innerWidth < 1024) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x: y, y: x });
  };

  const t = {
    it: {
      badge: "GLOBAL OPERATIONAL REACH",
      title: "Architettura",
      span: "Senza Confini.",
      desc: "Controlliamo i flussi digitali dei nostri partner globali da un hub strategico centralizzato. Un'infrastruttura d'élite distribuita per garantire resilienza e prestazioni assolute in ogni continente.",
      stats: [
        { label: "LATENZA MEDIA", val: `${metrics.ping}ms`, icon: Radio },
        { label: "NODI ATTIVI", val: `${metrics.nodes}`, icon: Server },
        { label: "TRAFFICO DATA", val: `${metrics.traffic}GB/s`, icon: Activity }
      ],
      nodes: [
        { name: "GLOBAL_HQ (CORE)", pos: "top-[48%] left-[49%]", main: true },
        { name: "LONDON (EDGE)", pos: "top-[35%] left-[47%]" },
        { name: "NEW YORK (CORE)", pos: "top-[42%] left-[28%]" },
        { name: "TOKYO (PEERING)", pos: "top-[45%] left-[82%]" },
        { name: "DUBAI (DISTRIBUTION)", pos: "top-[52%] left-[62%]" }
      ],
      terminalLabel: "KREA_OS_v10.0_NODES",
      secure: "QUANTUM-RESISTANT AES-256 CHANNEL"
    },
    en: {
      badge: "GLOBAL OPERATIONAL REACH",
      title: "Borderless",
      span: "Architecture.",
      desc: "We control the digital flows of our global partners from a centralized strategic hub. An elite infrastructure distributed to guarantee absolute resilience and performance across every continent.",
      stats: [
        { label: "AVG LATENCY", val: `${metrics.ping}ms`, icon: Radio },
        { label: "ACTIVE NODES", val: `${metrics.nodes}`, icon: Server },
        { label: "DATA TRAFFIC", val: `${metrics.traffic}GB/s`, icon: Activity }
      ],
      nodes: [
        { name: "GLOBAL_HQ (CORE)", pos: "top-[48%] left-[49%]", main: true },
        { name: "LONDON (EDGE)", pos: "top-[35%] left-[47%]" },
        { name: "NEW YORK (CORE)", pos: "top-[42%] left-[28%]" },
        { name: "TOKYO (PEERING)", pos: "top-[45%] left-[82%]" },
        { name: "DUBAI (DISTRIBUTION)", pos: "top-[52%] left-[62%]" }
      ],
      terminalLabel: "KREA_OS_v10.0_NODES",
      secure: "QUANTUM-RESISTANT AES-256 CHANNEL"
    }
  }[lang];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="py-24 md:py-48 px-6 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-7 perspective-2000">
             <div 
              className="relative aspect-[16/10] bg-slate-900/40 rounded-[3.5rem] border border-blue-500/20 shadow-[0_0_60px_rgba(59,130,246,0.1)] overflow-hidden group transition-transform duration-700 ease-out"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: 'preserve-3d' }}
             >
                <div className="absolute inset-0 opacity-30 p-12" style={{ transform: 'translateZ(-40px)' }}>
                   <svg viewBox="0 0 1000 600" className="w-full h-full fill-blue-500/10">
                      <path d="M150,200 Q300,100 450,200 T750,200" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" className="text-blue-500/40" />
                      <path d="M200,400 Q400,300 600,400 T900,400" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" className="text-blue-500/40" />
                   </svg>
                </div>

                {t.nodes.map((node, i) => (
                  <div key={i} className={`absolute ${node.pos} group/node`} style={{ transform: 'translateZ(40px)' }}>
                    <div className="relative">
                      <div className={`w-3 h-3 ${node.main ? 'bg-white' : 'bg-blue-400'} rounded-full shadow-[0_0_20px_rgba(59,130,246,1)] relative z-10 transition-transform group-hover/node:scale-150`}></div>
                      <div className="absolute -inset-4 bg-blue-500/30 rounded-full animate-ping"></div>
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-blue-600/90 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/20 opacity-0 group-hover/node:opacity-100 transition-all scale-90 group-hover/node:scale-100 whitespace-nowrap shadow-2xl">
                         <div className="flex items-center gap-2">
                           {node.main && <MapPin size={10} className="text-white" />}
                           <span className="text-[8px] font-black text-white tracking-[0.2em] uppercase">{node.name}</span>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-10 left-10 glass p-8 rounded-3xl border-white/10 max-w-[240px] animate-float shadow-2xl bg-black/60" style={{ transform: 'translateZ(60px)' }}>
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Terminal size={14} className="text-blue-400" />
                        <span className="text-[9px] font-mono font-black text-white tracking-tighter">{t.terminalLabel}</span>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-gray-400">ENCRYPTION:</span>
                        <span className="text-green-400 font-black">QUANTUM_READY</span>
                      </div>
                      <div className="h-[1px] w-full bg-white/10"></div>
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-gray-400">STABILITY:</span>
                        <span className="text-blue-400 font-black">99.999%</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full border-blue-500/30 shadow-xl bg-blue-900/20">
                <Globe2 size={14} className="text-blue-400 animate-[spin_15s_linear_infinite]" />
                <span className="text-blue-400 font-black text-[9px] md:text-[10px] tracking-[0.4em] uppercase">{t.badge}</span>
              </div>
              <h2 className="text-5xl md:text-8xl heading font-black text-white tracking-tighter uppercase leading-[0.8]">
                {t.title} <br />
                <span className="text-blue-500 italic font-light serif lowercase">{t.span}</span>
              </h2>
              <p className="text-blue-100/60 text-lg md:text-2xl font-light italic leading-relaxed border-l-2 border-blue-500/30 pl-10">
                {t.desc}
              </p>
            </div>

            <div className="grid gap-5">
              {t.stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="glass p-8 rounded-[2rem] border-white/10 flex items-center justify-between group hover:border-blue-500/60 transition-all duration-500 spotlight bg-slate-900/40">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-500">
                        <Icon size={24} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black tracking-widest text-blue-300/40 uppercase mb-1">{stat.label}</p>
                        <h4 className="text-3xl font-black text-white tracking-tight">{stat.val}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
