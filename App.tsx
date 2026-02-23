
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { Pricing } from './components/Pricing';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';
import { BackgroundWaterfall } from './components/BackgroundWaterfall';
import { BackgroundParticles } from './components/BackgroundParticles';
import { FloatingWidgets } from './components/FloatingWidgets';
import { InstagramShowcase } from './components/InstagramShowcase';
import { TechMarquee } from './components/TechMarquee';
import { DoubleMediaMarquee } from './components/DoubleMediaMarquee';
import { ScrollProgress } from './components/ScrollProgress';
import { ServicePillars } from './components/ServicePillars';
import { DigitalRestoration } from './components/DigitalRestoration';
import { AiEngine } from './components/AiEngine';
import { DominionTeaser } from './components/DominionTeaser';
import { SectionDivider } from './components/SectionDivider';
import { Language, Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [displayPage, setDisplayPage] = useState<Page>('home');
  
  // Lingua bloccata su Italiano
  const lang: Language = 'it';
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('INITIALIZING_CORE');
  const [transitionState, setTransitionState] = useState<'idle' | 'exiting' | 'entering'>('idle');

  const statusLogs = [
    'ESTABLISHING_SECURE_UPLINK',
    'SEQUENCING_DIGITAL_DNA',
    'LOADING_NEURAL_MODULES',
    'SYNCING_GLOBAL_NODES',
    'ENCRYPTING_INTERFACE',
    'OPTIMIZING_ADAPTIVE_GRID',
    'READY_FOR_TRANSMISSION'
  ];

  // 1. Timer del progresso puro
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) return 100;
        const step = prev < 30 ? 2.5 : prev < 70 ? 1.2 : 0.8;
        return Math.min(prev + step, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isLoading]);

  // 2. Aggiornamento messaggi basato sul progresso (Side Effect separato)
  useEffect(() => {
    const logIdx = Math.min(
      Math.floor((loadingProgress / 100) * statusLogs.length),
      statusLogs.length - 1
    );
    setStatusMsg(statusLogs[logIdx]);

    if (loadingProgress >= 100) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [loadingProgress]);

  const handlePageChange = useCallback((newPage: Page, targetId?: string) => {
    if (newPage === currentPage && !targetId) return;
    
    if (newPage === currentPage && targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        const offset = 100;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
      return;
    }

    setTransitionState('exiting');
    
    setTimeout(() => {
      setCurrentPage(newPage);
      setDisplayPage(newPage);
      
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            const offset = 100;
            const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      setTransitionState('entering');
      setTimeout(() => setTransitionState('idle'), 600);
    }, 500);
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [displayPage, isLoading, transitionState]);

  if (isLoading) {
    return (
      <div className={`fixed inset-0 bg-[#000000] z-[10000] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${loadingProgress >= 100 ? 'scale-110 opacity-0 filter blur-xl' : 'scale-100 opacity-100'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_60%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:50px_50px] opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/50 shadow-[0_0_20px_#3b82f6] z-10 animate-[scan_2.5s_linear_infinite] pointer-events-none"></div>

        <div className="relative w-96 h-96 flex items-center justify-center">
            <div className="absolute inset-0 border border-blue-900/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-0 border-t border-blue-500/50 rounded-full animate-[spin_3s_linear_infinite]"></div>
            <div className="absolute inset-8 border border-dashed border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            <svg className="absolute inset-0 w-full h-full rotate-[-90deg] drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(15, 23, 42, 0.5)" strokeWidth="2" />
              <circle 
                cx="50" cy="50" r="36" 
                fill="none" stroke="#3b82f6" strokeWidth="3" 
                strokeDasharray="226" 
                strokeDashoffset={226 - (226 * loadingProgress / 100)} 
                strokeLinecap="round"
                className="transition-all duration-200 ease-out"
              />
            </svg>
            <div className="relative z-20 flex flex-col items-center justify-center">
                <div className="relative group mb-2">
                  <span className="text-7xl font-black heading text-white tracking-tighter drop-shadow-[0_0_30px_rgba(59,130,246,1)] animate-pulse block">K</span>
                </div>
                <span className="text-3xl font-mono font-bold text-white tracking-widest">{Math.round(loadingProgress)}<span className="text-blue-500 text-lg">%</span></span>
            </div>
        </div>

        <div className="mt-12 text-center space-y-4 relative z-20">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-900/10 border border-blue-500/20 rounded-full backdrop-blur-md">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
               <span className="text-[10px] md:text-xs font-black text-blue-400 tracking-[0.3em] uppercase min-w-[200px]">{statusMsg}</span>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-600/40 relative overflow-x-hidden">
      <BackgroundWaterfall />
      <BackgroundParticles />
      <FloatingWidgets lang={lang} />
      <ScrollProgress />
      
      <div className="relative z-10 flex flex-col">
        <Navbar 
          activeSection={currentPage} 
          lang={lang} 
          setLang={setLang} 
          setCurrentPage={handlePageChange}
        />
        
        <main className={`flex-1 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          transitionState === 'exiting' ? 'opacity-0 scale-95 blur-xl -translate-y-4' : 
          transitionState === 'entering' ? 'opacity-0 scale-105 blur-2xl translate-y-4' : 
          'opacity-100 scale-100 blur-0 translate-y-0'
        }`}>
          {displayPage === 'home' && (
            <div className="bg-transparent">
              <section id="home" className="relative">
                <Hero lang={lang} onNavigate={(id) => handlePageChange('home', id)} />
                <SectionDivider />
                <div className="reveal"><ServicePillars lang={lang} /></div>
                <SectionDivider />
                <div id="ai-engine" className="reveal"><AiEngine lang={lang} /></div>
                <SectionDivider />
                <div className="reveal"><DoubleMediaMarquee /></div>
              </section>
              
              <SectionDivider />
              <div className="reveal">
                <DominionTeaser 
                  lang={lang} 
                  onNavigate={() => handlePageChange('pricing')} 
                />
              </div>

              <SectionDivider />
              <div className="reveal"><DigitalRestoration lang={lang} onNavigate={(id) => handlePageChange('home', id)} /></div>
              <SectionDivider />
              <div id="booking" className="reveal"><Booking lang={lang} /></div>
            </div>
          )}

          {displayPage === 'about' && (
            <div className="bg-transparent">
              <About lang={lang} onNavigate={(id) => handlePageChange('home', id)} />
              <SectionDivider />
              <div id="instagram" className="reveal"><InstagramShowcase lang={lang} /></div>
              <SectionDivider />
              <div className="reveal"><Testimonials lang={lang} /></div>
            </div>
          )}

          {displayPage === 'pricing' && (
            <div className="bg-transparent">
              <Pricing lang={lang} onNavigate={(id) => handlePageChange('pricing', id)} />
              <SectionDivider />
              <div className="reveal"><Booking lang={lang} /></div>
            </div>
          )}
        </main>

        <TechMarquee />
        <Footer lang={lang} setCurrentPage={(page) => handlePageChange(page)} />
      </div>

      <div className={`fixed inset-0 z-[150] pointer-events-none transition-all duration-500 bg-blue-600/5 backdrop-blur-sm ${transitionState !== 'idle' ? 'opacity-100' : 'opacity-0'}`}>
         <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/50 shadow-[0_0_20px_#3b82f6]"></div>
         <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500/50 shadow-[0_0_20px_#3b82f6]"></div>
      </div>
    </div>
  );
};

export default App;
