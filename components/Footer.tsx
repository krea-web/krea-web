
import React from 'react';
// Changed import from '../App' to '../types'
import { Language, Page } from '../types';
import { Instagram, ArrowUpRight, MapPin, Mail, Globe, Activity, ShieldCheck, Wifi } from 'lucide-react';

interface FooterProps {
  lang: Language;
  setCurrentPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setCurrentPage }) => {
  const t = {
    it: {
      desc: "Global Digital Agency. Ingegneria neurale e design d'élite per il dominio dei mercati internazionali.",
      rights: "TUTTI I DIRITTI RISERVATI.",
      social: "NETWORK",
      contact: "UPLINK",
      links: "SISTEMA",
      location: "SARDINIA / GLOBAL",
      status: "SISTEMA ONLINE"
    },
    en: {
      desc: "Global Digital Agency. Neural engineering and elite design for international market dominance.",
      rights: "ALL RIGHTS RESERVED.",
      social: "NETWORK",
      contact: "UPLINK",
      links: "SYSTEM",
      location: "SARDINIA / GLOBAL",
      status: "SYSTEM ONLINE"
    }
  }[lang];

  return (
    <footer className="relative pt-24 pb-12 bg-[#020205] overflow-hidden border-t border-white/5">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
          {/* Cyber Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:30px_30px] opacity-20"></div>
          
          {/* Massive Typography - FIXED FOR MOBILE */}
          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 text-[38vw] md:text-[23vw] md:bottom-[-5%] font-black heading text-white/[0.05] tracking-tighter leading-none select-none whitespace-nowrap z-0 pointer-events-none">
            KREA
          </div>

          {/* Glow Spots */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
            
            {/* COLONNA BRAND (Mobile: Full Width, Desktop: 5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
                <div 
                    className="flex items-center gap-4 group cursor-pointer w-fit" 
                    onClick={() => setCurrentPage('home')}
                >
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]"></div>
                        <div className="absolute inset-[1px] bg-black rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-500 flex items-center justify-center">
                           <span className="font-black text-white text-xl heading">K</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-black heading text-white tracking-tighter leading-none">KREA<span className="text-blue-500">.</span></h2>
                        <span className="text-[9px] font-mono text-gray-500 tracking-[0.3em] uppercase block mt-1">Digital Architecture</span>
                    </div>
                </div>

                <p className="text-gray-400 text-sm md:text-base font-light italic leading-relaxed border-l-2 border-blue-500/20 pl-6 max-w-md">
                    {t.desc}
                </p>

                {/* System Status Widget (Visible on both) */}
                <div className="glass px-5 py-3 rounded-2xl border-white/5 bg-white/[0.02] inline-flex items-center gap-6 w-fit">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[9px] font-black tracking-widest text-gray-400 uppercase">SERVER: 99.9%</span>
                    </div>
                    <div className="flex items-center gap-2 hidden xs:flex">
                         <Wifi size={10} className="text-blue-500" />
                         <span className="text-[9px] font-black tracking-widest text-gray-400 uppercase">LATENCY: 12ms</span>
                    </div>
                </div>
            </div>

            {/* COLONNA LINKS (Mobile: Grid 2x2, Desktop: 7 Cols Flex) */}
            <div className="lg:col-span-7">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                    
                    {/* NAVIGAZIONE */}
                    <div className="space-y-6">
                        <h5 className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase mb-4">
                            <Activity size={12} /> {t.links}
                        </h5>
                        <ul className="space-y-4">
                            {[
                                { label: 'HOME', page: 'home' },
                                { label: 'CHI SIAMO', page: 'about' },
                                { label: 'TARIFFE', page: 'pricing' }
                            ].map((link, i) => (
                                <li key={i}>
                                    <button 
                                        onClick={() => setCurrentPage(link.page as Page)} 
                                        className="text-[11px] font-bold text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 uppercase tracking-widest flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* SOCIAL */}
                    <div className="space-y-6">
                         <h5 className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase mb-4">
                            <Globe size={12} /> {t.social}
                        </h5>
                        <ul className="space-y-4">
                            <li className="group">
                                <a 
                                    href="https://www.instagram.com/krea.webb/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[11px] font-bold text-gray-400 hover:text-white transition-all duration-300 uppercase tracking-widest flex items-center gap-2"
                                >
                                    <Instagram size={14} className="group-hover:text-pink-500 transition-colors" />
                                    INSTAGRAM
                                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* CONTATTI (Su mobile occupa 2 colonne o va a capo bene) */}
                    <div className="col-span-2 md:col-span-1 space-y-6 mt-4 md:mt-0 pt-6 md:pt-0 border-t border-white/5 md:border-none">
                        <h5 className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-500 uppercase mb-4">
                            <ShieldCheck size={12} /> {t.contact}
                        </h5>
                        <div className="space-y-4">
                            <a href="mailto:kreafase1@gmail.com" className="group flex items-center gap-3 glass p-3 rounded-xl border-white/5 hover:bg-white/5 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                    <Mail size={14} />
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Email</span>
                                    <span className="text-[10px] text-white font-mono uppercase">kreafase1@gmail.com</span>
                                </div>
                            </a>
                            
                            <div className="flex items-center gap-3 glass p-3 rounded-xl border-white/5">
                                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                                    <MapPin size={14} />
                                </div>
                                <div>
                                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">HQ</span>
                                    <span className="text-[10px] text-white font-mono">{t.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <span className="text-[8px] font-mono text-gray-500 tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} KREA DIGITAL ARCHITECTURE. {t.rights}
                </span>
                <span className="text-[8px] font-mono text-gray-500 tracking-widest uppercase">
                    VAT: IT12345678901
                </span>
            </div>

            <div className="flex items-center gap-4">
               <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                  <span className="text-[8px] font-bold text-green-500 tracking-widest uppercase">{t.status}</span>
               </div>
            </div>
        </div>

      </div>
    </footer>
  );
};
