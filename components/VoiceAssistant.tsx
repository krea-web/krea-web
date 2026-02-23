
import React, { useState, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, X, Zap, Terminal } from 'lucide-react';
import { Language } from '../types';

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface VoiceAssistantProps {
  lang: Language;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outCtxRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const t = {
    it: {
      btn: "PARLA CON AURA",
      title: "AURA INTEL",
      desc: "Advanced Universal Response Architect. Chiedimi del nostro processo, tariffe o visione globale.",
      listening: "SISTEMA IN ASCOLTO...",
      standby: "AURA IN STANDBY",
      start: "INIZIA CONVERSAZIONE",
      stop: "DISCONNETTI",
      instruction: "Sei AURA, l'assistente virtuale d'élite di KREA Digital Agency. Sei professionale, visionaria e sofisticata. Parla della nostra posizione come hub tecnologico internazionale e delle nostre architetture digitali globali che scalano mercati mondiali."
    },
    en: {
      btn: "TALK TO AURA",
      title: "AURA INTEL",
      desc: "Advanced Universal Response Architect. Ask me about our process, pricing, or global vision.",
      listening: "SYSTEM LISTENING...",
      standby: "AURA STANDBY",
      start: "START CONVERSATION",
      stop: "DISCONNECT",
      instruction: "You are AURA, the elite virtual assistant of KREA Digital Agency. You are professional, visionary, and sophisticated. Talk about our position as an international tech hub and our global digital architectures that scale world markets."
    }
  }[lang];

  const toggleAssistant = () => setIsOpen(!isOpen);

  const startSession = async () => {
    if (isActive) return;
    
    const apiKey = process.env.API_KEY;
    if (!apiKey) return;

    setIsActive(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        setIsActive(false);
        return;
      }

      audioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
      outCtxRef.current = new AudioContextClass({ sampleRate: 24000 });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: t.instruction,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        },
        callbacks: {
          onopen: () => {
            if (!audioContextRef.current) return;
            const source = audioContextRef.current.createMediaStreamSource(stream);
            processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            processorRef.current.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              
              const pcmData = new Uint8Array(int16.buffer);
              const base64 = encode(pcmData);
              sessionPromise.then(s => {
                s.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
              });
            };

            source.connect(processorRef.current);
            processorRef.current.connect(audioContextRef.current.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            // FIXED: Added optional chaining to array index [0] to satisfy TS18048
            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && outCtxRef.current) {
              const ctx = outCtxRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (msg.serverContent?.interrupted) {
              for (const source of sourcesRef.current) {
                try { source.stop(); } catch (e) {}
              }
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            stopSession();
          },
          onerror: () => {
            stopSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start Aura session:', err);
      setIsActive(false);
    }
  };

  const stopSession = () => {
    setIsActive(false);
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e) {}
    }
    if (processorRef.current) {
      try { processorRef.current.disconnect(); } catch (e) {}
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (e) {}
    }
    if (outCtxRef.current) {
      try { outCtxRef.current.close(); } catch (e) {}
    }
    
    for (const source of sourcesRef.current) {
      try { source.stop(); } catch (e) {}
    }
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    
    sessionRef.current = null;
    processorRef.current = null;
    audioContextRef.current = null;
    outCtxRef.current = null;
  };

  return (
    <>
      <button 
        onClick={toggleAssistant}
        className="fixed bottom-32 right-10 z-[200] w-16 h-16 rounded-full glass border-blue-500/40 flex items-center justify-center text-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-110 transition-all magnetic-target group"
      >
        <div className="absolute inset-0 rounded-full border border-blue-500 animate-ping opacity-20"></div>
        {isOpen ? <X size={24} /> : <Zap size={24} className="group-hover:rotate-12 transition-transform" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-52 right-10 z-[200] w-[350px] glass rounded-[2.5rem] border-white/10 p-1 overflow-hidden animate-reveal-3d shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
          <div className="bg-[#050505] rounded-[2.4rem] p-8 space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-blue-500 ${isActive ? 'animate-pulse' : 'opacity-20'}`}></div>
                <span className="text-[10px] font-black tracking-[0.4em] text-white uppercase">{t.title}</span>
              </div>
              <div className="text-blue-500/40"><Terminal size={14} /></div>
            </div>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className={`w-24 h-24 rounded-full border border-blue-500/20 flex items-center justify-center relative ${isActive ? 'animate-pulse' : ''}`}>
                <div className="absolute inset-2 border border-blue-500/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
                {isActive ? <Mic size={32} className="text-blue-500" /> : <MicOff size={32} className="text-gray-700" />}
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-gray-400 font-light italic leading-relaxed">{t.desc}</p>
              </div>
            </div>

            <button 
              onClick={isActive ? stopSession : startSession}
              className={`w-full py-5 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${isActive ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-blue-600 text-white shadow-xl shadow-blue-600/20'}`}
            >
              {isActive ? t.stop : t.start}
              <Zap size={14} />
            </button>

            <div className="pt-4 flex justify-center">
              <span className="text-[7px] font-black tracking-[0.5em] text-gray-700 uppercase">AURA_OS_v1.0_READY</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .animate-reveal-3d { animation: reveal-3d 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes reveal-3d {
          from { opacity: 0; transform: scale(0.9) translateZ(-150px); filter: blur(30px); }
          to { opacity: 1; transform: scale(1) translateZ(0); filter: blur(0); }
        }
      `}</style>
    </>
  );
};
