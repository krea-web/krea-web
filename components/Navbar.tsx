
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Instagram, ChevronRight, Globe, Zap } from 'lucide-react';
import { Language, Page } from '../types';

interface NavbarProps {
  activeSection: string;
  lang: Language;
  setLang: (lang: Language) => void;
  setCurrentPage: (page: Page, targetId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, lang, setLang, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current || window.innerWidth < 1024) return;
    const rect = navRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const navigateTo = (page: Page, targetId?: string) => {
    setCurrentPage(page, targetId);
    setIsMobileMenuOpen(false);
  };

  const menuItems: { id: Page; label: { it: string; en: string } }[] = [
    { id: 'home', label: { it: 'HOME', en: 'HOME' } },
    { id: 'about', label: { it: 'Chi Siamo', en: 'About' } },
    { id: 'pricing', label: { it: 'Tariffe', en: 'Pricing' } },
  ];

  const t = {
    it: { contact: "CALL" },
    en: { contact: "CALL" }
  }[lang];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-2 xs:px-4 md:px-6 ${isScrolled ? 'pt-1.5 md:pt-4' : 'pt-2 xs:pt-3 md:pt-6'}`}>
      <div 
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="max-w-7xl mx-auto relative group"
        style={{ perspective: '1200px' }}
      >
        <div className={`glass rounded-[0.8rem] xs:rounded-[1rem] md:rounded-full border-white/5 transition-all duration-500 ease-out transform-gpu overflow-visible ${isScrolled ? 'py-1.5 px-3 md:px-10 bg-black/90' : 'py-2 px-3.5 md:py-3.5 md:px-12 bg-black/20 backdrop-blur-sm'}`} style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: 'preserve-3d', boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.7)' : 'none' }}>
          <div className="flex items-center justify-between relative" style={{ transformStyle: 'preserve-3d' }}>
            
            <div 
              className="flex items-center gap-1.5 md:gap-3 cursor-pointer transition-all duration-500 group/logo magnetic-target" 
              style={{ transform: 'translateZ(30px)' }} 
              onClick={() => navigateTo('home')}
            >
              <div className="relative w-6 h-6 xs:w-7 xs:h-7 md:w-9 md:h-9 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-600 rounded-[6px] md:rounded-xl rotate-45 group-hover/logo:rotate-[225deg] transition-transform duration-700 shadow-[0_0_10px_rgba(37,99,235,0.6)]"></div>
                <div className="absolute inset-[1px] bg-black rounded-[6px] md:rounded-xl rotate-45 group-hover/logo:rotate-[225deg] transition-transform duration-700"></div>
                <span className="relative font-black text-[10px] xs:text-xs md:text-base heading text-white z-10">K</span>
              </div>
              <span className="text-sm xs:text-base md:text-xl font-black heading tracking-tight uppercase group-hover/logo:text-blue-500 transition-colors">
                KREA<span className="text-blue-600">.</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-4 lg:gap-8" style={{ transform: 'translateZ(15px)' }}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`text-[8px] lg:text-[10px] font-black tracking-[0.2em] lg:tracking-[0.4em] uppercase transition-all duration-500 relative py-1.5 px-1 group/link magnetic-target ${activeSection === item.id ? 'text-blue-500' : 'text-gray-400 hover:text-white'}`}
                >
                  {item.label[lang]}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-blue-500 transition-all duration-500 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 xs:gap-2 md:gap-5" style={{ transform: 'translateZ(40px)' }}>
              <button onClick={() => setLang(lang === 'it' ? 'en' : 'it')} className="flex items-center gap-1 glass px-2 md:px-3.5 py-1.5 rounded-full border-white/10 hover:border-blue-500/30 transition-all text-[7px] md:text-[9px] font-black group/lang magnetic-target bg-white/5">
                <Globe size={10} className="text-blue-500 group-hover:rotate-12 transition-transform duration-500 md:w-3" />
                <span className="tracking-widest">{lang.toUpperCase()}</span>
              </button>

              <button onClick={() => navigateTo('home', 'booking')} className="flex items-center gap-1.5 bg-blue-600 text-white px-3 xs:px-4 md:px-7 py-1.5 xs:py-2 md:py-3 rounded-full text-[7.5px] md:text-[9.5px] font-black tracking-widest hover:bg-white hover:text-black transition-all shadow-lg magnetic-target group/btn">
                <span className="hidden xs:inline">{lang === 'it' ? 'PRENOTA' : 'BOOK'}</span>
                <span className="xs:hidden">{t.contact}</span>
                <Zap size={10} className="group-hover/btn:scale-110 transition-transform md:w-3" />
              </button>

              <button className="md:hidden p-1 text-gray-400 hover:text-white transition-colors magnetic-target" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black/98 backdrop-blur-3xl transition-all duration-700 md:hidden z-[110] ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
        <div className="flex flex-col h-full p-6 xs:p-8">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2" onClick={() => navigateTo('home')}>
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-xs">K</div>
                    <span className="text-xl font-black heading tracking-tighter">KREA.</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 border border-white/10 rounded-full"><X size={20} /></button>
            </div>
            <div className="flex flex-col gap-3.5">
                {menuItems.map((item, idx) => (
                    <button key={item.id} onClick={() => navigateTo(item.id)} className="text-2xl xs:text-3xl font-black heading tracking-tight group flex items-center justify-between border-b border-white/5 pb-2.5 text-left" style={{ transitionDelay: `${idx * 100}ms` }}>
                      <span className={`${activeSection === item.id ? 'text-blue-500' : 'text-white'} group-hover:text-blue-500 transition-colors uppercase`}>{item.label[lang]}</span>
                      <ChevronRight className="text-blue-500 group-hover:translate-x-3 transition-transform duration-500" size={20} />
                    </button>
                ))}
            </div>
            <div className="mt-auto space-y-4">
                <div className="flex items-center gap-3">
                    <a href="https://www.instagram.com/krea.webb/" target="_blank" className="p-4 glass rounded-2xl text-blue-500 bg-white/5"><Instagram size={20} /></a>
                    <button onClick={() => { setLang(lang === 'it' ? 'en' : 'it'); setIsMobileMenuOpen(false); }} className="flex-1 glass py-4 rounded-2xl font-black tracking-widest text-[9px] border-blue-500/20 bg-white/5">{lang === 'it' ? 'ENGLISH VERSION' : 'VERSIONE ITALIANA'}</button>
                </div>
                <button onClick={() => navigateTo('home', 'booking')} className="w-full bg-blue-600 py-5 rounded-2xl font-black tracking-[0.25em] text-[10px] uppercase shadow-xl shadow-blue-600/20 active:scale-95 transition-transform">
                  {lang === 'it' ? 'AVVIA TRASMISSIONE' : 'START TRANSMISSION'}
                </button>
            </div>
        </div>
      </div>
    </nav>
  );
};
