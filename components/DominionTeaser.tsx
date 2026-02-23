
import React, { useState, useEffect } from 'react';
// Changed import from '../App' to '../types'
import { Language } from '../types';
import { Zap, Shield, Activity, Target, Cpu, Radio } from 'lucide-react';

interface DominionTeaserProps {
  lang: Language;
  onNavigate: () => void;
}

export const DominionTeaser: React.FC<DominionTeaserProps> = ({ lang, onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const t = {
    it: {
      title: "Inizia la",
      span: "Dominazione.",
      btn: "Configura il tuo Piano Elite",
      status: "SISTEMA_PRONTO",
      encryption: "AES-512 ACTIVE",
      telemetry: ["COORDS: 40.92N / 9.49E", "LINK: STABLE", "UPLINK: ACTIVE"]
    },
    en: {
      title: "Start the",
      span: "Domination.",
      btn: "Configure your Elite Plan",
      status: "SYSTEM_READY",
      encryption: "AES-512 ACTIVE",
      telemetry: ["COORDS: 40.92N / 9.49E", "LINK: STABLE", "UPLINK: ACTIVE"]
    }
  }[lang];

  return (
    <section 
      id="tariffe-teaser" 
      onMouseMove={handleMouseMove}
      className="py-32 md:py-64 px-6 relative overflow-hidden bg-black flex flex-col items-center justify-center min-h-[90vh]"
    >
      {/* INCOMING CONNECTION BEAM */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-48 md:h-80 z-20">
         <div className="w-full h-full bg-gradient-to-b from-blue-500 via-blue-600/50 to-transparent opacity-40"></div>
         {/* Particle flow down */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff] animate-[drop-particle_3s_infinite]"></div>
         <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-blue-400 animate-[drop-beam_2.5s_infinite]"></div>
      </div>

      {/* 3D Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/[0.05] blur-[180px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      {/* 3D Orbital Hub Animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none opacity-40">
        <div 
          className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] preserve-3d"
          style={{ transform: `rotateX(${60 + mousePos.y * 0.5}deg) rotateZ(${mousePos.x * 0.5}deg)` }}
        >
          {/* Orbital Rings */}
          <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute inset-10 border border-blue-400/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="absolute inset-24 border border-blue-300/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
          
          {/* HUD Accents */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]"></div>
        </div>
      </div>

      {/* Floating Telemetry Data */}
      <div className="absolute top-1/4 right-10 md:right-32 space-y-4 hidden lg:block opacity-20 group">
        {t.telemetry.map((text, i) => (
          <div key={i} className="flex items-center gap-3 justify-end group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-mono tracking-widest text-white">{text}</span>
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-1/4 left-10 md:left-32 space-y-4 hidden lg:block opacity-20">
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
          <span className="text-[9px] font-mono tracking-widest text-white uppercase">{t.encryption}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-[9px] font-mono tracking-widest text-white uppercase">{t.status}</span>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-12 reveal">
        {/* Animated Scanner HUD Element */}
        <div className="mx-auto w-24 h-24 relative mb-16">
            <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-blue-500/0 to-blue-500/50"></div>
            <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-ping"></div>
            <div className="absolute inset-4 border border-blue-500/40 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                <Target size={32} className="animate-spin-slow" />
            </div>
            {/* Corner Markers */}
            <div className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-blue-600/50"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-blue-600/50"></div>
        </div>

        <h2 className="text-6xl md:text-9xl heading font-black mb-12 uppercase tracking-tighter leading-[0.8] drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
          {t.title}<br />
          <span className="text-blue-600 italic serif lowercase font-light drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            {t.span}
          </span>
        </h2>
        
        <div className="flex flex-col items-center gap-8">
            <div className="luminous-btn-wrapper rounded-full group magnetic-target shadow-2xl scale-110 md:scale-125">
                <button 
                  onClick={onNavigate} 
                  className="luminous-btn-content px-16 py-7 text-[12px] font-black tracking-widest uppercase flex items-center gap-4"
                >
                  <Zap size={16} className="text-blue-500 animate-pulse" />
                  {t.btn}
                </button>
            </div>
            
            <div className="flex items-center gap-6 opacity-30 pt-10">
                <div className="flex items-center gap-2">
                    <Shield size={12} className="text-blue-500" />
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase">Enterprise Security</span>
                </div>
                <div className="w-[1px] h-4 bg-white/10"></div>
                <div className="flex items-center gap-2">
                    <Activity size={12} className="text-blue-500" />
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase">Active Load-Balancing</span>
                </div>
            </div>
        </div>
      </div>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes drop-particle {
          0% { transform: translate(-50%, 0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-50%, 400px); opacity: 0; }
        }
        @keyframes drop-beam {
          0% { transform: translate(-50%, -100px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(-50%, 200px); opacity: 0; }
        }
      `}</style>
    </section>
  );
};
