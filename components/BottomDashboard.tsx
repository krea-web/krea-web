
import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Map, Activity, Zap, Radio, Terminal, Lock } from 'lucide-react';
// Changed import from '../App' to '../types'
import { Language } from '../types';

interface BottomDashboardProps {
  lang: Language;
}

export const BottomDashboard: React.FC<BottomDashboardProps> = ({ lang }) => {
  const [coords, setCoords] = useState({ lat: 40.92, lng: 9.49 });
  const [pulse, setPulse] = useState(Array(15).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lng: prev.lng + (Math.random() - 0.5) * 0.0001
      }));
      setPulse(prev => {
        const next = [...prev.slice(1), Math.floor(Math.random() * 80) + 20];
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const t = {
    it: {
      hq: "TACTICAL_HQ",
      loc: "GLOBAL / OPERATIONS / HUB",
      sys: "NEURAL_PULSE",
      active: "ELITE_ACTIVE",
      efficiency: "COMPUTATIONAL_LOAD",
      secure: "QUANTUM_SHIELD",
      encryption: "AES-512_ENCRYPTED"
    },
    en: {
      hq: "TACTICAL_HQ",
      loc: "GLOBAL / OPERATIONS / HUB",
      sys: "NEURAL_PULSE",
      active: "ELITE_ACTIVE",
      efficiency: "COMPUTATIONAL_LOAD",
      secure: "QUANTUM_SHIELD",
      encryption: "AES-512_ENCRYPTED"
    }
  }[lang];

  return (
    <div className="px-4 xs:px-6 py-16 tablet:py-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 tablet:gap-8">
        
        {/* HQ: Tactical Radar */}
        <div className="glass rounded-[2rem] tablet:rounded-[3rem] p-6 tablet:p-10 border-white/5 group relative overflow-hidden min-h-[280px] tablet:h-[320px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 tablet:w-64 h-48 tablet:h-64 border border-blue-500 rounded-full animate-[ping_4s_infinite]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 tablet:w-40 h-32 tablet:h-40 border border-blue-500/30 rounded-full"></div>
            </div>
            
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 tablet:gap-3">
                    <Map size={14} className="text-blue-500 tablet:w-4 tablet:h-4" />
                    <span className="text-[8px] tablet:text-[10px] font-black tracking-[0.3em] tablet:tracking-[0.4em] text-gray-500 uppercase">{t.hq}</span>
                </div>
                <div className="flex gap-1">
                   <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                   <div className="w-1 h-1 bg-blue-500/40 rounded-full"></div>
                </div>
            </div>

            <div className="relative z-10 space-y-1 tablet:space-y-2">
                <h4 className="text-lg tablet:text-xl font-black heading tracking-tight text-white">{t.loc}</h4>
                <div className="flex items-center gap-3 tablet:gap-4 font-mono text-[7px] tablet:text-[9px] text-blue-400/60 uppercase tracking-widest">
                    <span>ACTIVE_STREAM: DISTRIBUTED</span>
                    <span className="w-[1px] h-3 bg-white/10 hidden tablet:block"></span>
                    <span className="hidden tablet:block">MODE: WORLDWIDE</span>
                </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 tablet:gap-4 py-3 tablet:py-4 px-4 tablet:px-6 bg-white/[0.03] border border-white/5 rounded-xl tablet:rounded-2xl">
                <Radio size={12} className="text-blue-500 animate-pulse tablet:w-4 tablet:h-4" />
                <span className="text-[7px] tablet:text-[8px] font-black tracking-[0.2em] tablet:tracking-[0.3em] text-gray-400 uppercase">SATELLITE_LINK: ESTABLISHED</span>
            </div>
        </div>

        {/* SYSTEM: Neural Wave */}
        <div className="glass rounded-[2rem] tablet:rounded-[3rem] p-6 tablet:p-10 border-white/5 group relative overflow-hidden min-h-[280px] tablet:h-[320px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 tablet:mb-8">
                <div className="flex items-center gap-2 tablet:gap-3">
                    <Cpu className="text-blue-500 tablet:w-4 tablet:h-4" size={14} />
                    <span className="text-[8px] tablet:text-[10px] font-black tracking-[0.3em] tablet:tracking-[0.4em] text-gray-500 uppercase">{t.sys}</span>
                </div>
                <span className="text-[8px] tablet:text-[9px] font-black text-blue-500 tracking-[0.2em] uppercase">{t.active}</span>
            </div>
            
            <div className="flex-1 flex items-end gap-1 tablet:gap-1.5 px-1 tablet:px-2 pb-6 tablet:pb-10">
                {pulse.map((val, i) => (
                    <div 
                        key={i} 
                        className="flex-1 bg-blue-600/30 rounded-full group-hover:bg-blue-600/60 transition-all duration-300" 
                        style={{ height: `${val}%`, transitionDelay: `${i * 10}ms` }}
                    ></div>
                ))}
            </div>

            <div className="space-y-3 tablet:space-y-4">
                <div className="flex justify-between text-[8px] tablet:text-[9px] font-black mb-1 uppercase tracking-widest text-gray-400">
                    <span>{t.efficiency}</span>
                    <span className="text-blue-500 hidden xs:inline">OPTIMIZED_FLOW</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 animate-[loading_4s_infinite]" style={{ width: '40%' }}></div>
                </div>
            </div>
        </div>

        {/* SECURITY: Quantum Core */}
        <div className="glass rounded-[2rem] tablet:rounded-[3rem] p-6 tablet:p-10 border-white/5 group relative overflow-hidden min-h-[280px] tablet:h-[320px] flex flex-col items-center justify-center text-center sm:col-span-2 lg:col-span-1">
            <div className="relative w-16 h-16 tablet:w-24 tablet:h-24 mb-6 tablet:mb-10 group-hover:scale-110 transition-transform duration-700">
                <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-3 tablet:inset-4 rounded-full border border-blue-500/40 animate-[spin_6s_linear_infinite_reverse]"></div>
                <div className="absolute inset-6 tablet:inset-8 rounded-full border border-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center bg-blue-600/10 backdrop-blur-md">
                    <Lock size={16} className="text-white animate-pulse tablet:w-5 tablet:h-5" />
                </div>
            </div>
            
            <div className="space-y-3 tablet:space-y-4">
                <h4 className="text-[9px] tablet:text-[10px] font-black tracking-[0.3em] tablet:tracking-[0.4em] uppercase text-white">{t.secure}</h4>
                <div className="inline-flex items-center gap-2 tablet:gap-3 px-4 tablet:px-5 py-2 glass rounded-full border-blue-500/30">
                    <Shield size={10} className="text-blue-500 tablet:w-3 tablet:h-3" />
                    <span className="text-[8px] tablet:text-[9px] font-black tracking-widest text-blue-500">{t.encryption}</span>
                </div>
                <p className="text-[6px] tablet:text-[7px] font-mono text-gray-600 tracking-[0.4em] tablet:tracking-[0.5em] uppercase pt-2 tablet:pt-4">DATA_INTEGRITY: 100%</p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </div>
  );
};
