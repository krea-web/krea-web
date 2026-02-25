
import React, { useRef, useState } from 'react';
import { Check, Zap, Globe, Crown, Wrench, ArrowRight, Star } from 'lucide-react';
import { Language } from '../types';
import { getPricingPlans, type PricingPlanView } from '../src/data/pricingData';

interface PricingProps {
  lang: Language;
  onNavigate: (id: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ lang, onNavigate }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const titleRef = useRef<HTMLDivElement>(null);

  const handleTitleMove = (e: React.MouseEvent) => {
    if (!titleRef.current || window.innerWidth < 1024) return;
    const rect = titleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const t = {
    it: {
      badge: "INVESTIMENTO STRATEGICO",
      title: "LE NOSTRE",
      span: "TARIFFE",
      desc: "Architetture scalabili progettate per dominare. Ogni piano è un concentrato di ingegneria digitale per la tua crescita.",
      setupLabel: "SETUP FEE",
      monthlyLabel: "CANONE MENSILE (OPZIONALE)",
    },
    en: {
      badge: "STRATEGIC INVESTMENT",
      title: "OUR",
      span: "PRICING",
      desc: "Scalable architectures designed to dominate. Each plan is a concentrate of digital engineering for your growth.",
      setupLabel: "SETUP FEE",
      monthlyLabel: "MONTHLY FEE (OPTIONAL)",
    }
  }[lang];

  const plans = getPricingPlans(lang);

  return (
    <div className="py-16 md:py-32 laptop:py-48 relative overflow-hidden px-4 xs:px-6 bg-[#030303]" id="pricing">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.03),transparent_70%)] pointer-events-none"></div>
      
      {/* HEADER */}
      <div className="flex flex-col items-center text-center w-full mb-16 md:mb-32 reveal">
        <div 
          ref={titleRef}
          onMouseMove={handleTitleMove}
          onMouseLeave={resetTilt}
          className="max-w-7xl mx-auto px-4 perspective-2000"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 glass rounded-full border-blue-500/20 text-blue-400 text-[8px] md:text-[10px] font-black tracking-[0.5em] uppercase mb-8 shadow-xl">
            <Star size={10} className="animate-spin-slow" />
            {t.badge}
          </div>
          
          <h2 
            className="text-[12vw] sm:text-[10vw] md:text-[7rem] lg:text-[9rem] heading font-black leading-[0.8] tracking-[-0.05em] uppercase text-white transition-transform duration-700 ease-out select-none"
            style={{ 
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <span className="block drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" style={{ transform: 'translateZ(40px)' }}>{t.title}</span>
            <span className="text-blue-600 block mt-1 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" style={{ transform: 'translateZ(80px)' }}>{t.span}</span>
          </h2>
          
          <p className="mt-10 md:mt-16 text-gray-500 italic text-sm md:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl mx-auto border-t border-white/5 pt-8 md:pt-12">
            {t.desc}
          </p>
        </div>
      </div>

      {/* GRID - 3 main + 1 full-width spot */}
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch mb-8">
          {plans.filter(p => p.id !== 'SPOT').map((plan) => (
            <PricingCard key={plan.id} plan={plan} t={t} onCtaClick={() => onNavigate('booking')} />
          ))}
        </div>
        {/* SPOT card full width */}
        {plans.filter(p => p.id === 'SPOT').map((plan) => (
          <PricingCard key={plan.id} plan={plan} t={t} onCtaClick={() => onNavigate('booking')} isSpot />
        ))}
      </div>
    </div>
  );
};

const IconMap: Record<string, React.FC<{ size: number }>> = {
  zap: Zap,
  globe: Globe,
  crown: Crown,
  wrench: Wrench,
};

const PricingCard: React.FC<{ plan: PricingPlanView; t: any; onCtaClick: () => void; isSpot?: boolean }> = ({ plan, t, onCtaClick, isSpot }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / -30;
    const lX = ((e.clientX - rect.left) / rect.width) * 100;
    const lY = ((e.clientY - rect.top) / rect.height) * 100;
    setRotate({ x: y, y: x });
    setMousePos({ x: lX, y: lY });
  };

  const resetRotate = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const PlanIcon = IconMap[plan.icon] || Zap;

  return (
    <div 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotate} 
      className={`relative rounded-[2.5rem] md:rounded-[3rem] p-[1px] transition-all duration-700 reveal flex flex-col group ${plan.featured ? 'z-20 lg:-mt-4 lg:-mb-4' : 'z-10'}`} 
      style={{ 
        perspective: '2000px',
        background: isHovered 
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59,130,246,0.6), rgba(255,255,255,0.05) 60%)`
          : 'rgba(255,255,255,0.08)'
      }}
    >
      <div 
        className={`relative h-full glass rounded-[2.45rem] md:rounded-[2.95rem] p-8 md:p-10 flex ${isSpot ? 'flex-col md:flex-row md:items-center gap-8' : 'flex-col'} overflow-hidden transition-all duration-700 bg-black/95 ${plan.featured ? 'shadow-[0_40px_80px_rgba(59,130,246,0.12)]' : 'shadow-xl'}`} 
        style={{ 
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`, 
          transformStyle: 'preserve-3d' 
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59,130,246,0.08), transparent 60%)` }}
        ></div>

        {/* HEADER */}
        <div className={`${isSpot ? 'flex-1' : 'mb-8'} relative z-20`} style={{ transform: 'translateZ(30px)' }}>
          <div className="flex justify-between items-start mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700 ${plan.featured ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-white/5 text-blue-500 border border-white/10'}`}>
              <PlanIcon size={20} />
            </div>
            <div className="text-right">
              <span className="text-[8px] font-black text-blue-500 tracking-[0.3em] uppercase block mb-0.5">{plan.tag}</span>
              <h4 className="text-lg md:text-xl font-black heading tracking-tight text-white">{plan.name}</h4>
            </div>
          </div>
          
          {/* PRICING */}
          <div className="mb-6">
            <span className="text-[8px] font-black text-gray-600 tracking-[0.3em] uppercase block mb-1">{t.setupLabel}</span>
            <span className="text-2xl md:text-3xl font-black heading text-white group-hover:text-blue-500 transition-colors duration-500">
              {plan.setupFee}
            </span>
          </div>

          {plan.monthlyFee && (
            <div className="mb-6 py-3 px-4 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="text-[7px] font-black text-gray-600 tracking-[0.2em] uppercase block mb-1">{t.monthlyLabel}</span>
              <span className="text-sm md:text-base font-bold text-blue-400">{plan.monthlyFee}</span>
            </div>
          )}
          
          <p className="text-xs md:text-sm text-gray-500 italic leading-relaxed border-l border-blue-600/30 pl-4">
            {plan.desc}
          </p>
        </div>

        {/* FEATURES */}
        <div className={`${isSpot ? 'flex-1' : 'flex-1 mb-10'} space-y-3 relative z-20`} style={{ transform: 'translateZ(15px)' }}>
          {plan.features.map((feat: string, j: number) => (
            <div key={j} className="flex items-start gap-3 group/item">
              <div className="w-4 h-4 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover/item:bg-blue-600 transition-all mt-0.5 shrink-0">
                <Check size={10} className="text-blue-500 group-hover/item:text-white" />
              </div>
              <span className="text-[11px] md:text-xs text-gray-400 font-medium group-hover/item:text-white transition-colors">
                {feat}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`relative z-30 ${isSpot ? 'md:w-64 shrink-0' : ''}`} style={{ transform: 'translateZ(40px)' }}>
          <button 
            onClick={onCtaClick} 
            className={`w-full py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2.5 transition-all duration-500 overflow-hidden relative group/btn ${plan.featured ? 'bg-white text-black hover:bg-blue-600 hover:text-white' : 'bg-transparent text-white border border-white/10 hover:border-blue-500/50 hover:bg-white/5'}`}
          >
            <span className="relative z-10">{plan.ctaLabel}</span>
            <ArrowRight size={12} className="relative z-10 group-hover/btn:translate-x-1.5 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite] pointer-events-none"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
