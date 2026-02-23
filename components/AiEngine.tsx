
import React, { useState } from 'react';
import { Monitor, Smartphone, Sparkles, Palette, Search, RefreshCcw, Activity, Layers, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';

interface AiEngineProps {
  lang: Language;
}

const HERO_SEEDS = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1481487484168-9b930d5b7960?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=2000&q=80"
];

export const AiEngine: React.FC<AiEngineProps> = ({ lang }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [results, setResults] = useState<{ desktop: string | null; mobile: string | null }>(() => {
    const randomSeed = HERO_SEEDS[Math.floor(Math.random() * HERO_SEEDS.length)];
    return { desktop: randomSeed, mobile: randomSeed };
  });
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [error, setError] = useState<string | null>(null);

  const t = {
    it: {
      label: "KREA ADAPTIVE ARCHITECT",
      titlePart1: "KREA",
      titlePart2: "il tuo sito.",
      desc: "KREA istantaneamente una coppia di idee (Desktop & Mobile) per la tua visione digitale.",
      placeholder: "Descrivi la tua visione di business...",
      btn: "KREA",
      ready: "Ecosistema Pronto",
      genDesktop: "SINTESI DESKTOP...",
      genMobile: "SINTESI MOBILE...",
      err: "Errore durante la sintesi. Verificare la connessione o la chiave API.",
      keyMissing: "Chiave API non rilevata. Verificare le impostazioni di sistema."
    },
    en: {
      label: "KREA ADAPTIVE ARCHITECT",
      titlePart1: "KREA",
      titlePart2: "your website.",
      desc: "Instantly KREATE a pair of elite mockups (Desktop & Mobile) for your digital vision.",
      placeholder: "Describe your business vision...",
      btn: "KREA",
      ready: "Ecosystem Ready",
      genDesktop: "SYNTHESIZING DESKTOP...",
      genMobile: "SYNTHESIZING MOBILE...",
      err: "Synthesis failed. Please check connection or API key.",
      keyMissing: "API Key missing. Please check system settings."
    }
  }[lang];

  const handleGenerate = async () => {
    if (!prompt || isGenerating) return;
    
    // Check for API Key presence
    if (!process.env.API_KEY) {
      setError(t.keyMissing);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setLoadingProgress(0);
    
    try {
      // Correct initialization using the provided global API Key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // STEP 1: Desktop Generation
      setCurrentTask(t.genDesktop);
      setLoadingProgress(15);
      
      const desktopResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ 
            text: `High-fidelity professional desktop website landing page hero section for: "${prompt}". Aspect ratio 16:9. Ultra-modern, elite luxury aesthetic, minimalist UI elements, dark mode, high resolution 4k.` 
          }]
        },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });

      setLoadingProgress(55);

      // STEP 2: Mobile Generation
      setCurrentTask(t.genMobile);
      
      const mobileResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ 
            text: `High-fidelity professional mobile smartphone website UI for: "${prompt}". Aspect ratio 9:16. Modern luxury design, mobile interface elements, portrait orientation, premium dark theme.` 
          }]
        },
        config: { imageConfig: { aspectRatio: "9:16" } }
      });

      setLoadingProgress(95);

      let desktopImg: string | null = null;
      let mobileImg: string | null = null;

      // Extract image data from parts
      desktopResponse?.candidates?.[0]?.content?.parts?.forEach(part => {
        if (part.inlineData?.data) {
          desktopImg = `data:image/png;base64,${part.inlineData.data}`;
        }
      });

      mobileResponse?.candidates?.[0]?.content?.parts?.forEach(part => {
        if (part.inlineData?.data) {
          mobileImg = `data:image/png;base64,${part.inlineData.data}`;
        }
      });

      if (desktopImg && mobileImg) {
        setResults({ desktop: desktopImg, mobile: mobileImg });
        setLoadingProgress(100);
      } else {
        throw new Error("Missing binary image data");
      }

    } catch (err) {
      console.error("KREA Synthesis Error:", err);
      setError(t.err);
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        setCurrentTask('');
      }, 800);
    }
  };

  const activeResultUrl = viewMode === 'desktop' ? results.desktop : results.mobile;

  return (
    <div className="py-24 md:py-32 flex flex-col items-center relative bg-black" id="ai-engine">
      <div className="text-center mb-16 px-6 max-w-4xl reveal">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-blue-500/20 mb-6">
          <Palette size={14} className="text-blue-500" />
          <span className="text-[9px] font-black tracking-[0.4em] text-blue-500 uppercase">{t.label}</span>
        </div>
        <h2 className="text-4xl md:text-7xl heading font-black mb-6 uppercase text-white">
            {t.titlePart1} <span className="text-blue-600 italic serif lowercase">{t.titlePart2}</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-xl font-light max-w-2xl mx-auto italic">{t.desc}</p>
      </div>

      <div className="w-full max-w-3xl px-6 mb-20 reveal">
        <div className="relative glass rounded-[2.5rem] border-white/10 p-2 flex flex-col sm:flex-row items-center gap-2 bg-black/60 shadow-2xl">
            <div className="flex items-center flex-1 w-full sm:w-auto">
                <div className="pl-6 text-blue-500/40"><Search size={22} /></div>
                <input 
                  type="text" 
                  placeholder={t.placeholder} 
                  className="flex-1 bg-transparent py-5 px-4 text-white outline-none placeholder-gray-700" 
                  value={prompt} 
                  onChange={(e) => setPrompt(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()} 
                  disabled={isGenerating}
                />
            </div>
            <button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt} 
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-blue-600 disabled:hover:text-white"
            >
              {isGenerating ? <RefreshCcw size={14} className="animate-spin" /> : <Sparkles size={14} />}
              <span className="ml-2">{isGenerating ? 'GEN...' : t.btn}</span>
            </button>
        </div>
        
        {isGenerating && (
          <div className="mt-6 space-y-3 animate-fade-in px-4">
             <div className="flex justify-between items-center text-[8px] font-black tracking-widest text-blue-500 uppercase">
                <span className="flex items-center gap-2">
                  <Activity size={10} className="animate-pulse" />
                  {currentTask}
                </span>
                <span>{loadingProgress}%</span>
             </div>
             <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-700 ease-out" style={{ width: `${loadingProgress}%` }}></div>
             </div>
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs animate-shake">
            <AlertCircle size={16} />
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl px-6 reveal">
        <div className="flex justify-center gap-4 mb-10">
          <button 
            onClick={() => setViewMode('desktop')} 
            className={`p-4 rounded-2xl transition-all flex items-center gap-3 border ${viewMode === 'desktop' ? 'bg-white text-black border-white shadow-xl scale-105' : 'bg-white/5 text-gray-500 border-white/10 hover:text-white'}`}
          >
            <Monitor size={20}/>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Desktop</span>
          </button>
          <button 
            onClick={() => setViewMode('mobile')} 
            className={`p-4 rounded-2xl transition-all flex items-center gap-3 border ${viewMode === 'mobile' ? 'bg-white text-black border-white shadow-xl scale-105' : 'bg-white/5 text-gray-500 border-white/10 hover:text-white'}`}
          >
            <Smartphone size={20}/>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Mobile</span>
          </button>
        </div>
        
        <div className="relative group perspective-2000">
           <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000"></div>
           
           <div 
            className={`mx-auto glass rounded-[2.5rem] border-white/10 overflow-hidden transition-all duration-1000 bg-zinc-950/80 backdrop-blur-3xl shadow-2xl ${viewMode === 'desktop' ? 'max-w-4xl aspect-video' : 'max-w-xs aspect-[9/16]'}`}
            style={{ transformStyle: 'preserve-3d' }}
           >
              {isGenerating ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-black/40">
                    <div className="relative w-20 h-20 mb-6">
                       <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full"></div>
                       <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                       <Layers className="absolute inset-0 m-auto text-blue-500 animate-pulse" size={24} />
                    </div>
                    <span className="text-[9px] font-black tracking-[0.5em] text-blue-500 uppercase animate-pulse">{currentTask}</span>
                  </div>
              ) : activeResultUrl ? (
                  <img 
                    src={activeResultUrl} 
                    className="w-full h-full object-cover animate-fade-in transition-transform duration-[5s] group-hover:scale-110" 
                    alt="KREA Site Mockup" 
                  />
              ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 text-gray-800">
                    <Activity size={48} className="mb-4 opacity-20" />
                    <span className="text-[10px] font-black tracking-widest uppercase opacity-20">System Standby</span>
                  </div>
              )}
           </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};
