
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Video, Image as ImageIcon, Zap, Lock, Key, RefreshCw, Download, Layers, PlayCircle } from 'lucide-react';
import { Language } from '../types';

interface AiGenerativeStudioProps {
  lang: Language;
}

export const AiGenerativeStudio: React.FC<AiGenerativeStudioProps> = ({ lang }) => {
  const [mode, setMode] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const t = {
    it: {
      title: "KREA SYNTHESIS STUDIO",
      subtitle: "Generative Excellence",
      desc: "Accedi ai modelli più avanzati al mondo per creare asset multimediali d'élite.",
      placeholder: "Descrivi il capolavoro architettonico...",
      btnImg: "Genera 4K Image",
      btnVid: "Genera Cinema Video",
      unlock: "Attiva Studio Access",
      billingNote: "È richiesto un progetto GCP con fatturazione attiva.",
      generating: "Sintetizzando l'essenza...",
      ready: "Asset Generato",
      modeImg: "Image Architect",
      modeVid: "Motion Architect",
      videoMessages: [
        "Inizializzazione flussi creativi...",
        "Elaborazione architettura temporale...",
        "Rendering fotogrammi d'élite...",
        "Sintesi sequenziale in corso...",
        "Finalizzazione asset cinematografico..."
      ]
    },
    en: {
      title: "KREA SYNTHESIS STUDIO",
      subtitle: "Generative Excellence",
      desc: "Access the world's most advanced models to create elite multimedia assets.",
      placeholder: "Describe the architectural masterpiece...",
      btnImg: "Generate 4K Image",
      btnVid: "Generate Cinema Video",
      unlock: "Activate Studio Access",
      billingNote: "Requires a GCP project with active billing.",
      generating: "Synthesizing essence...",
      ready: "Asset Generated",
      modeImg: "Image Architect",
      modeVid: "Motion Architect",
      videoMessages: [
        "Initializing creative flows...",
        "Processing temporal architecture...",
        "Rendering elite frames...",
        "Sequential synthesis in progress...",
        "Finalizing cinematic asset..."
      ]
    }
  }[lang];

  useEffect(() => {
    const checkKeyStatus = async () => {
      const aistudio = (window as any).aistudio;
      if (aistudio && typeof aistudio.hasSelectedApiKey === 'function') {
        const has = await aistudio.hasSelectedApiKey();
        if (has) setHasKey(true);
      }
    };
    checkKeyStatus();
  }, []);

  const handleUnlock = async () => {
    try {
      const aistudio = (window as any).aistudio;
      if (aistudio && typeof aistudio.openSelectKey === 'function') {
        await aistudio.openSelectKey();
        setHasKey(true);
      }
    } catch (e) {
      console.error("Key selection failed", e);
    }
  };

  const generateImage = async () => {
    setIsGenerating(true);
    setResultUrl(null);
    setStatusMessage(t.generating);
    try {
      const apiKey = (process.env.API_KEY || '') as string;
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "16:9", imageSize: "1K" } }
      });

      const parts = response?.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData?.data) {
            setResultUrl(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      }
    } catch (error: any) {
      console.error("Generation error", error);
      if (error.message?.includes("Requested entity was not found")) {
        setHasKey(false);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVideo = async () => {
    setIsGenerating(true);
    setResultUrl(null);
    
    let msgIdx = 0;
    setStatusMessage(t.videoMessages[0]);
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % t.videoMessages.length;
      setStatusMessage(t.videoMessages[msgIdx]);
    }, 12000);

    try {
      const apiKey = (process.env.API_KEY || '') as string;
      const ai = new GoogleGenAI({ apiKey });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${apiKey}`);
        const blob = await response.blob();
        setResultUrl(URL.createObjectURL(blob));
      }
    } catch (error: any) {
      console.error("Video error", error);
      if (error.message?.includes("Requested entity was not found")) {
        setHasKey(false);
      }
    } finally {
      clearInterval(msgInterval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-32 px-6 relative bg-[#030303]" id="ai-studio">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-blue-600/5 blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full border-blue-500/20 text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase mb-8">
            <Zap size={14} className="animate-pulse" />
            {t.subtitle}
          </div>
          <h2 className="text-6xl md:text-9xl heading font-black mb-8 tracking-tighter">{t.title}</h2>
          <p className="text-gray-500 text-lg md:text-2xl font-light italic max-w-2xl mx-auto italic">{t.desc}</p>
        </div>

        {!hasKey ? (
          <div className="glass rounded-[3rem] p-12 md:p-20 border-white/10 text-center max-w-2xl reveal relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-600/5 animate-pulse"></div>
             <Lock size={48} className="mx-auto mb-8 text-blue-500/50" />
             <h3 className="text-3xl font-black mb-6">Studio Locked</h3>
             <p className="text-gray-400 mb-10 text-sm leading-relaxed">{t.billingNote}</p>
             <button 
                onClick={handleUnlock}
                className="bg-white text-black px-12 py-6 rounded-full font-black text-[11px] tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-blue-600/20 flex items-center gap-4 mx-auto"
             >
                <Key size={16} /> {t.unlock}
             </button>
             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[10px] text-gray-600 mt-6 block hover:text-blue-500 underline uppercase tracking-widest">Billing Documentation</a>
          </div>
        ) : (
          <div className="w-full grid lg:grid-cols-12 gap-10 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-4 space-y-6">
                <div className="glass rounded-3xl p-2 border-white/10 flex gap-2">
                    <button 
                        onClick={() => setMode('image')}
                        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'image' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                    >
                        <ImageIcon size={14} /> {t.modeImg}
                    </button>
                    <button 
                        onClick={() => setMode('video')}
                        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'video' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Video size={14} /> {t.modeVid}
                    </button>
                </div>

                <div className="glass rounded-[2.5rem] p-8 border-white/10 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black tracking-widest text-gray-600 uppercase">Input Prompt</label>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={t.placeholder}
                            className="w-full bg-white/5 rounded-2xl p-6 text-sm text-white placeholder-gray-800 border border-white/5 focus:border-blue-500/50 outline-none h-40 resize-none transition-all"
                        />
                    </div>

                    <div className="luminous-btn-wrapper w-full group magnetic-target">
                        <button 
                            onClick={mode === 'image' ? generateImage : generateVideo}
                            disabled={isGenerating || !prompt}
                            className={`luminous-btn-content w-full py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 ${isGenerating ? 'opacity-50' : ''}`}
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" size={16} /> : mode === 'image' ? <Sparkles size={16} /> : <PlayCircle size={16} />}
                            {isGenerating ? statusMessage : (mode === 'image' ? t.btnImg : t.btnVid)}
                        </button>
                    </div>
                </div>
            </div>

            {/* Viewport */}
            <div className="lg:col-span-8">
                <div className="glass rounded-[3.5rem] border-white/5 min-h-[500px] flex items-center justify-center relative overflow-hidden bg-black/40 group">
                    {isGenerating && (
                        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
                            <div className="w-24 h-24 relative mb-8">
                                <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full"></div>
                                <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                                <Layers className="absolute inset-0 m-auto text-blue-500 animate-pulse" size={32} />
                            </div>
                            <span className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase px-12 text-center">{statusMessage}</span>
                            <div className="mt-4 flex gap-1">
                                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: `${i*0.2}s`}}></div>)}
                            </div>
                        </div>
                    )}

                    {resultUrl ? (
                        <div className="w-full h-full animate-reveal-3d">
                            {mode === 'image' ? (
                                <img src={resultUrl} className="w-full h-full object-contain" alt="Generated asset" />
                            ) : (
                                <video src={resultUrl} controls autoPlay className="w-full h-full object-contain" />
                            )}
                            <div className="absolute bottom-10 right-10 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a href={resultUrl} download="krea-ai-asset" className="p-4 glass rounded-full border-blue-500/30 text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
                                    <Download size={20} />
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-6 opacity-20">
                            <ImageIcon size={64} className="mx-auto" />
                            <p className="text-[10px] font-black tracking-[0.8em] uppercase">Viewport Ready</p>
                        </div>
                    )}
                </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes reveal-3d {
          from { opacity: 0; transform: scale(0.9) translateZ(-100px); filter: blur(20px); }
          to { opacity: 1; transform: scale(1) translateZ(0); filter: blur(0); }
        }
        .animate-reveal-3d { animation: reveal-3d 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
