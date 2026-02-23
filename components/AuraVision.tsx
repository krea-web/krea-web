import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Brain, Target, Zap, Activity, ChevronRight, Share2, Cpu, Database, Network } from 'lucide-react';
import { Language } from '../types';

interface AuraVisionProps {
  lang: Language;
}

interface StrategyNode {
  title: string;
  description: string;
  type: 'IDENTITY' | 'TECH' | 'MARKET' | 'SCALE';
  impact: string;
}

export const AuraVision: React.FC<AuraVisionProps> = ({ lang }) => {
  const [ambition, setAmbition] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [strategyTree, setStrategyTree] = useState<StrategyNode[] | null>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const t = {
    it: {
      label: "KREA NEURAL NERVE CENTER",
      title: "Aura",
      span: "Vision.",
      desc: "Inserisci la tua visione. Il nostro motore neurale progetterà istantaneamente la Roadmap Tattica per la dominazione del tuo mercato.",
      placeholder: "Es: 'Voglio digitalizzare il mercato del vino sardo per gli USA'...",
      btn: "DECRIPTA STRATEGIA",
      analyzing: "SEQUENZIAMENTO DNA BRAND...",
      impact: "IMPATTO STIMATO",
      ready: "ROADMAP GENERATA",
      nodes: {
        IDENTITY: "IDENTITÀ",
        TECH: "ARCHITETTURA",
        MARKET: "DOMINAZIONE",
        SCALE: "SCALABILITÀ"
      }
    },
    en: {
      label: "KREA NEURAL NERVE CENTER",
      title: "Aura",
      span: "Vision.",
      desc: "Enter your vision. Our neural system will instantly design the Tactical Roadmap for your market dominance.",
      placeholder: "Ex: 'I want to digitize the Sardinian wine market for the USA'...",
      btn: "DECRYPT STRATEGY",
      analyzing: "SEQUENCING BRAND DNA...",
      impact: "ESTIMATED IMPACT",
      ready: "ROADMAP GENERATED",
      nodes: {
        IDENTITY: "IDENTITY",
        TECH: "ARCHITECTURE",
        MARKET: "DOMINANCE",
        SCALE: "SCALABILITY"
      }
    }
  }[lang];

  const handleAnalyze = async () => {
    if (!ambition || isAnalyzing) return;
    
    // Always use process.env.API_KEY directly as per guidelines
    const apiKey = process.env.API_KEY;
    if (!apiKey) return;

    setIsAnalyzing(true);
    setStrategyTree(null);
    setActiveNode(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => (prev < 95 ? prev + Math.random() * 5 : prev));
    }, 200);

    try {
      // Always initialize GoogleGenAI with named apiKey parameter using process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Using gemini-3-pro-preview for complex business strategy analysis
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Analizza questa ambizione di business: "${ambition}". 
        Genera una strategia d'élite divisa in 4 pilastri: IDENTITY (Brand e percezione), TECH (Tecnologie e architettura), MARKET (Strategia di ingresso), SCALE (Come crescere). 
        Sii estremamente sofisticato, usa un tono da agenzia d'élite internazionale.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { 
                  type: Type.STRING,
                  description: "The name of the strategic pillar."
                },
                description: { 
                  type: Type.STRING,
                  description: "Detailed description of the tactical actions for this pillar."
                },
                type: { 
                  type: Type.STRING,
                  description: "The category of the pillar: IDENTITY, TECH, MARKET, or SCALE."
                },
                impact: { 
                  type: Type.STRING,
                  description: "The expected outcome and growth impact."
                }
              },
              // Use propertyOrdering instead of required in responseSchema as per guidelines
              propertyOrdering: ["title", "description", "type", "impact"]
            }
          }
        }
      });

      // Directly access .text property from response object
      const jsonStr = response.text?.trim() || "[]";
      const data = JSON.parse(jsonStr);
      setStrategyTree(data);
      setProgress(100);
    } catch (error) {
      console.error("Aura Vision Error:", error);
    } finally {
      clearInterval(interval);
      setIsAnalyzing(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'IDENTITY': return <Target size={20} />;
      case 'TECH': return <Cpu size={20} />;
      case 'MARKET': return <Network size={20} />;
      case 'SCALE': return <Zap size={20} />;
      default: return <Brain size={20} />;
    }
  };

  return (
    <section 
      className="py-24 md:py-48 px-6 bg-black relative overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
      }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] animate-pulse"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 reveal">
          <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full border-blue-500/20 text-blue-500 shadow-2xl mb-8">
            <Brain size={16} className="animate-pulse" />
            <p className="font-black text-[10px] tracking-[0.6em] uppercase">{t.label}</p>
          </div>
          <h2 className="text-6xl md:text-9xl heading font-black text-white tracking-tighter uppercase leading-[0.75] mb-8">
            {t.title} <br />
            <span className="text-blue-600 italic font-light serif capitalize">{t.span}</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-2xl italic font-light max-w-2xl mx-auto">{t.desc}</p>
        </div>

        <div className="max-w-4xl mx-auto mb-32 reveal">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur-2xl opacity-10 group-focus-within:opacity-30 transition-opacity"></div>
            <div className="relative glass rounded-[3rem] p-2 flex flex-col md:flex-row items-center gap-4 bg-black/80 border-white/10 focus-within:border-blue-500/50 transition-all">
              <input 
                type="text" 
                value={ambition}
                onChange={(e) => setAmbition(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent py-6 px-10 text-xl text-white outline-none font-light italic"
              />
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !ambition}
                className={`w-full md:w-auto px-12 py-6 rounded-full font-black text-[11px] tracking-widest uppercase flex items-center justify-center gap-4 transition-all duration-700 ${
                  isAnalyzing || !ambition ? 'bg-white/5 text-gray-700' : 'bg-blue-600 text-white shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:scale-105'
                }`}
              >
                {isAnalyzing ? <Activity size={16} className="animate-spin" /> : <Share2 size={16} />}
                {isAnalyzing ? t.analyzing : t.btn}
              </button>
            </div>
          </div>
          
          {isAnalyzing && (
            <div className="mt-8 px-10 space-y-2 animate-fade-in">
              <div className="flex justify-between items-center text-[9px] font-black tracking-widest text-blue-500">
                <span>ENCRYPTING_VISION_STREAM</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
        </div>

        <div className="relative min-h-[600px] flex items-center justify-center reveal">
          {!strategyTree && !isAnalyzing && (
            <div className="flex flex-col items-center opacity-10 animate-pulse">
              <div className="w-48 h-48 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mb-8">
                <Database size={64} />
              </div>
              <span className="text-[12px] font-black tracking-[1em] uppercase">SYSTEM_IDLE_AWAITING_INPUT</span>
            </div>
          )}

          {strategyTree && (
            <div className="w-full relative h-full flex flex-col items-center">
              <div className="relative z-30 mb-24">
                <div className="w-24 h-24 rounded-full glass border-2 border-blue-500/50 flex items-center justify-center bg-black animate-pulse shadow-[0_0_50px_rgba(59,130,246,0.4)]">
                  <Brain size={40} className="text-blue-500" />
                </div>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[9px] font-black tracking-widest text-blue-500 bg-black px-4 py-1 rounded-full border border-blue-500/30 uppercase">{t.ready}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                {strategyTree.map((node, i) => (
                  <div 
                    key={i} 
                    className={`glass p-8 rounded-[2.5rem] border-white/5 transition-all duration-700 cursor-pointer relative group ${activeNode === i ? 'border-blue-500/50 bg-blue-600/5 scale-105' : 'hover:border-white/20 hover:scale-[1.02]'}`}
                    onClick={() => setActiveNode(activeNode === i ? null : i)}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-12 w-[1px] bg-gradient-to-t from-blue-500/40 to-transparent"></div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${activeNode === i ? 'bg-blue-600 text-white' : 'bg-blue-600/10 text-blue-500'}`}>
                        {getIcon(node.type)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black tracking-widest text-gray-500 uppercase">PILASTRO_0{i+1}</span>
                        <span className="text-[10px] font-black tracking-widest text-blue-500 uppercase">{(t.nodes as any)[node.type]}</span>
                      </div>
                    </div>

                    <h4 className="text-xl font-black heading text-white uppercase mb-4 leading-tight">{node.title}</h4>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${activeNode === i ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-gray-400 font-light italic leading-relaxed border-l border-blue-600/30 pl-4">
                        {node.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[7px] font-black text-gray-600 uppercase mb-1">{t.impact}</span>
                        <span className="text-xs font-black text-white">{node.impact}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${activeNode === i ? 'rotate-90 text-blue-500' : 'text-gray-500'}`}>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};