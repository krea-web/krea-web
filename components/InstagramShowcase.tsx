
import React, { useState, useRef } from 'react';
import { Instagram, Heart, MessageCircle, Send, Bookmark, Zap, Globe, ArrowUpRight, Battery, Wifi, Signal, Home, Search as SearchIcon, PlaySquare, User as UserIcon, PlusSquare } from 'lucide-react';
// Changed import from '../App' to '../types'
import { Language } from '../types';

interface InstagramShowcaseProps {
  lang: Language;
}

const FeedMarquee: React.FC = () => {
  const images = [
    "https://i.postimg.cc/Y2gGMxQN/K-FEED-1-jpg.png",
    "https://i.postimg.cc/05mMPC7V/K-FEED-2-jpg.png",
    "https://i.postimg.cc/sfSQsJ5H/K-FEED-3-jpg.png",
    "https://i.postimg.cc/CMDBS4b2/K-FEED-4-jpg.png",
    "https://i.postimg.cc/8kWJNbLn/K-FEED-5-jpg.png",
    "https://i.postimg.cc/KcLkx5tw/K-FEED-6-jpg.png",
  ];

  return (
    <div className="w-full overflow-hidden py-6 md:py-10 mb-6 md:mb-10 relative">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2"></div>
      
      <div className="flex animate-instagram-marquee gap-4 md:gap-6 w-max">
        {[...images, ...images, ...images].map((img, i) => (
          <div key={i} className="group relative w-32 h-32 xs:w-40 xs:h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 transition-all duration-500 hover:border-blue-500/50 hover:scale-105">
            <img 
              src={img} 
              alt={`KREA Instagram Feed Post ${i % 6 + 1}`} 
              loading="lazy"
              width="400"
              height="400"
              fetchPriority="high"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" size={24} />
            </div>
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 opacity-60 group-hover:opacity-100 transition-all">
               <span className="text-[7px] font-mono text-blue-400 font-bold tracking-tighter uppercase">K_FEED_0{i % 6 + 1}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes instagram-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-instagram-marquee {
          animation: instagram-marquee 40s linear infinite;
        }
        @media (hover: hover) {
          .animate-instagram-marquee:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
};

export const InstagramShowcase: React.FC<InstagramShowcaseProps> = ({ lang }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const deviceRef = useRef<HTMLDivElement>(null);

  const t = {
    it: {
      label: "SOCIAL ECOSYSTEM",
      title: "Visione",
      span: "Social.",
      desc: "Entra nel cuore pulsante di KREA. Scopri i dietro le quinte, le innovazioni tecnologiche e il lifestyle d'élite che definisce il nostro brand globale.",
      btn: "UNISCITI ALLA COMMUNITY",
      bridgeLabel: "KREA.WEBB"
    },
    en: {
      label: "SOCIAL ECOSYSTEM",
      title: "Social",
      span: "Vision.",
      desc: "Step into the beating heart of KREA. Discover the behind-the-scenes, tech innovations, and the elite lifestyle that defines our global brand.",
      btn: "JOIN THE COMMUNITY",
      bridgeLabel: "KREA.WEBB"
    }
  }[lang];

  // Stats for the feed posts - Diversified
  const postStats = [
    { likes: "12,402", time: "45 MIN AGO" },
    { likes: "8,845", time: "3 HOURS AGO" },
    { likes: "3,982", time: "8 HOURS AGO" },
    { likes: "15,156", time: "1 DAY AGO" },
    { likes: "6,432", time: "2 DAYS AGO" },
    { likes: "2,118", time: "5 DAYS AGO" }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!deviceRef.current || window.innerWidth < 1024) return;
    const rect = deviceRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - (e.clientY - rect.top)) / 25;
    const rotateY = ((e.clientX - rect.left) - centerX) / 25;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="py-20 md:py-32 px-4 xs:px-6 relative overflow-hidden bg-[#020205]" id="instagram">
      
      {/* Decorative Bridge */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col items-center reveal">
         <div className="flex items-center gap-3 mb-6 opacity-30">
            <div className="w-8 xs:w-12 h-[1px] bg-white"></div>
            <span className="text-[8px] xs:text-[9px] font-black tracking-[0.4em] uppercase text-white">{t.bridgeLabel}</span>
            <div className="w-8 xs:w-12 h-[1px] bg-white"></div>
         </div>
         <FeedMarquee />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* TEXT CONTENT */}
        <div className="lg:col-span-7 space-y-10 order-2 lg:order-1 reveal">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 glass rounded-full border-blue-500/20">
              <Zap size={14} className="text-blue-500 animate-pulse" />
              <span className="text-blue-500 font-black text-[9px] xs:text-[10px] tracking-[0.5em] uppercase">{t.label}</span>
            </div>
            <h2 className="text-4xl xs:text-5xl md:text-8xl heading font-black mb-6 tracking-tighter leading-none text-white">
              {t.title}<br />
              <span className="italic text-blue-600 serif lowercase font-light">{t.span}</span>
            </h2>
            <p className="text-gray-400 italic text-lg xs:text-xl leading-relaxed max-w-xl border-l-2 border-blue-600/30 pl-6 md:pl-8 font-light">
              {t.desc}
            </p>
          </div>

          <div className="luminous-btn-wrapper w-full xs:w-auto">
            <button 
              onClick={() => window.open('https://www.instagram.com/krea.webb/', '_blank')} 
              className="luminous-btn-content px-8 xs:px-12 py-5 xs:py-6 text-[10px] xs:text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            >
              <Instagram size={18} />
              {t.btn}
            </button>
          </div>
        </div>

        {/* HIGH-FIDELITY PHONE MOCKUP */}
        <div 
          className="lg:col-span-5 relative flex justify-center order-1 lg:order-2 perspective-2000 reveal" 
          onMouseMove={handleMouseMove} 
          onMouseLeave={handleMouseLeave}
        >
          {/* Phone Hardware Shell */}
          <div 
            ref={deviceRef} 
            className="w-[280px] h-[580px] xs:w-[310px] xs:h-[640px] md:w-[330px] md:h-[680px] bg-[#0c0c0e] rounded-[3.5rem] p-3 border-[1px] border-white/20 relative overflow-hidden transition-all duration-700 ease-out shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
            style={{ 
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, 
              transformStyle: 'preserve-3d' 
            }}
          >
            {/* Reflective Screen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.05] pointer-events-none z-[80]"></div>
            
            {/* Volume Buttons (Left Side) */}
            <div className="absolute left-[-2px] top-32 w-[3px] h-12 bg-[#222] rounded-r-sm z-50"></div>
            <div className="absolute left-[-2px] top-48 w-[3px] h-12 bg-[#222] rounded-r-sm z-50"></div>
            
            {/* Power Button (Right Side) */}
            <div className="absolute right-[-2px] top-40 w-[3px] h-16 bg-[#222] rounded-l-sm z-50"></div>

            {/* Simulated Display Area */}
            <div className="h-full w-full bg-black rounded-[2.8rem] overflow-hidden relative border-[1px] border-white/5 flex flex-col">
                
                {/* Dynamic Island / Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-[100] flex items-center justify-end px-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#111] border border-white/5"></div>
                </div>

                {/* Status Bar */}
                <div className="h-10 w-full flex items-center justify-between px-8 pt-1 z-[90]">
                    <span className="text-[10px] font-bold text-white">10:00</span>
                    <div className="flex items-center gap-1.5 opacity-80">
                        <Signal size={10} className="text-white" />
                        <Wifi size={10} className="text-white" />
                        <Battery size={12} className="text-white" />
                    </div>
                </div>

                {/* App Header */}
                <div className="pt-2 pb-3 px-6 bg-black/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between z-[70]">
                    <span className="text-lg font-black heading tracking-tight text-white uppercase italic">KREA<span className="text-blue-600">.</span></span>
                    <div className="flex gap-4">
                      <Heart size={20} className="text-white opacity-80" />
                      <Send size={20} className="text-white opacity-80" />
                    </div>
                </div>

                {/* Feed Content - Scrollable (Starts directly after header) */}
                <div className="flex-1 overflow-hidden relative">
                    <div className="flex flex-col animate-[scroll-feed-ultra_50s_linear_infinite] gap-10 pt-4 px-3 pb-24">
                        {[1, 2, 3, 4, 5, 6].map((idx) => {
                          const stats = postStats[idx - 1];
                          return (
                            <div key={idx} className="bg-transparent space-y-3">
                                {/* Post Header */}
                                <div className="flex items-center justify-between px-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white border border-white/10 shadow-[0_0_10px_rgba(59,130,246,0.3)]">K</div>
                                        <div className="flex flex-col">
                                          <span className="text-[11px] font-black uppercase text-white tracking-tighter">krea.webb</span>
                                          <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Global Digital Hub</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5 opacity-30">
                                        {[1,2,3].map(d => <div key={d} className="w-1 h-1 bg-white rounded-full"></div>)}
                                    </div>
                                </div>
                                
                                {/* Post Image */}
                                <div className="aspect-square relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 group/post">
                                    <img 
                                      src={`https://i.postimg.cc/${['Y2gGMxQN','05mMPC7V','sfSQsJ5H','CMDBS4b2','8kWJNbLn','KcLkx5tw'][idx-1]}/K-FEED-${idx}-jpg.png`} 
                                      className="w-full h-full object-cover group-hover/post:scale-105 transition-transform duration-[3s]" 
                                      alt={`KREA Instagram Feed Content ${idx}`}
                                      loading="lazy"
                                      width="400"
                                      height="400"
                                      fetchPriority="high"
                                    />
                                    <div className="absolute top-4 right-4 glass p-1.5 rounded-lg border-white/10 opacity-60">
                                       <Globe size={12} className="text-white" />
                                    </div>
                                </div>

                                {/* Post Footer */}
                                <div className="space-y-2 px-1">
                                    <div className="flex justify-between items-center text-white">
                                      <div className="flex gap-4">
                                        <Heart size={22} className="hover:text-red-500 transition-colors cursor-pointer" />
                                        <MessageCircle size={22} className="hover:text-blue-400 transition-colors cursor-pointer" />
                                        <Send size={22} className="hover:text-blue-300 transition-colors cursor-pointer" />
                                      </div>
                                      <Bookmark size={22} className="hover:text-yellow-400 transition-colors cursor-pointer" />
                                    </div>
                                    <div className="text-[11px] font-bold text-white">{stats.likes} likes</div>
                                    <div className="text-[11px] leading-relaxed text-gray-400">
                                      <span className="font-black uppercase mr-2 text-white">krea.webb</span> 
                                      Architecting the future through high-performance digital ecosystems. Seamless, scalable, and elite. ⚡️ #GlobalDigitalHub #Innovation
                                    </div>
                                    <div className="text-[8px] text-gray-700 font-black tracking-widest uppercase pt-1">{stats.time}</div>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>

                {/* Bottom Navigation Bar */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-black/90 backdrop-blur-2xl border-t border-white/5 z-[90] flex items-center justify-around px-4 pb-2">
                    <Home size={22} className="text-white" />
                    <SearchIcon size={22} className="text-gray-500" />
                    <PlusSquare size={22} className="text-gray-500" />
                    <PlaySquare size={22} className="text-gray-500" />
                    <div className="w-7 h-7 rounded-full border border-white/20 overflow-hidden bg-blue-600 flex items-center justify-center text-[8px] font-black">K</div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-[100]"></div>
            </div>
          </div>

          {/* Floating Accents (Desktop Only) */}
          <div className="absolute -right-8 top-1/4 animate-float hidden lg:block z-[110]">
             <div className="glass px-4 py-2 rounded-xl border-blue-500/20 flex items-center gap-2 bg-black/60 backdrop-blur-md">
                <ArrowUpRight size={14} className="text-blue-500" />
                <span className="text-[8px] font-black text-white tracking-[0.2em]">LIVE_SYNC</span>
             </div>
          </div>
          
          <div className="absolute -left-12 bottom-1/3 animate-float-reverse hidden lg:block z-[110]">
             <div className="glass px-4 py-2 rounded-xl border-white/10 flex items-center gap-2 bg-black/40 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[8px] font-black text-gray-400 tracking-[0.2em]">ENCRYPTED_FEED</span>
             </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll-feed-ultra { 
          0% { transform: translateY(0); } 
          100% { transform: translateY(-50%); } 
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        .animate-float-reverse {
          animation: float-reverse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
