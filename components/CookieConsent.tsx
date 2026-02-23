
import React, { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';
// Changed import from '../App' to '../types'
import { Language } from '../types';

interface CookieConsentProps {
  lang: Language;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('krea_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('krea_consent', 'true');
    setIsVisible(false);
  };

  const t = {
    it: {
      text: "Utilizziamo protocolli digitali per ottimizzare la tua esperienza d'élite.",
      btn: "ACCETTA",
      policy: "Privacy Policy"
    },
    en: {
      text: "We use digital protocols to optimize your elite experience.",
      btn: "ACCEPT",
      policy: "Privacy Policy"
    }
  }[lang];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[500] w-[90%] max-w-2xl animate-reveal-up">
      <div className="glass p-6 md:p-8 rounded-full border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500">
            <Shield size={20} />
          </div>
          <p className="text-[10px] md:text-xs text-gray-400 font-light italic text-center md:text-left">
            {t.text} <a href="#" className="text-white underline ml-1">{t.policy}</a>
          </p>
        </div>
        <button 
          onClick={accept}
          className="bg-white text-black px-10 py-3 rounded-full text-[10px] font-black tracking-widest hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap"
        >
          {t.btn}
        </button>
      </div>
      <style>{`
        @keyframes reveal-up {
          from { opacity: 0; transform: translate(-50%, 50px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-reveal-up { animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
