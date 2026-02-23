
import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { Star, Quote, CheckCircle2, X, MessageSquare, Send, User } from 'lucide-react';
import { testimonialsData, type TestimonialReview } from '../src/data/testimonialsData';

type Review = TestimonialReview;

interface TestimonialCardProps {
  rev: Review;
  index: number;
  onClick: () => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rev, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (centerY - y) / 25;
    const rotateY = (x - centerX) / 25;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const resetRotate = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetRotate}
      onClick={onClick}
      className="relative flex-shrink-0 w-[80vw] sm:w-[400px] md:w-[480px] transition-all duration-700 ease-out cursor-pointer px-3 md:px-5"
      style={{ 
        perspective: '1200px',
        zIndex: isHovered ? 50 : 1
      }}
    >
      <div className={`absolute inset-x-3 md:inset-x-5 -inset-y-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[2rem] md:rounded-[3rem] blur-2xl opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-40' : ''}`}></div>
      
      <div 
        className={`glass h-full p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border transition-all duration-500 flex flex-col justify-between overflow-hidden group ${
          isHovered ? 'border-blue-500/50 bg-slate-900/95' : 'border-white/5 bg-slate-950/40'
        }`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered && window.innerWidth >= 1024 ? 'scale(1.02)' : 'scale(1)'}`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute top-4 right-8 text-blue-500/5 group-hover:text-blue-500/10 transition-colors pointer-events-none" style={{ transform: 'translateZ(-20px)' }}>
          <Quote size={60} className="md:w-[100px] md:h-[100px]" />
        </div>

        <div style={{ transform: 'translateZ(30px)' }}>
          <div className="flex gap-1.5 mb-5 md:mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star 
                key={s} 
                size={12} 
                className={`transition-all duration-500 md:w-[14px] md:h-[14px] ${isHovered ? 'fill-blue-500 text-blue-500' : 'fill-blue-500/20 text-blue-500/30'}`}
                style={{ transitionDelay: `${s * 50}ms` }}
              />
            ))}
          </div>

          <p className="text-xs md:text-xl serif italic text-blue-50/90 leading-relaxed relative z-10 font-medium tracking-tight whitespace-normal">
            "{rev.text}"
          </p>
        </div>

        <div className="mt-8 md:mt-12 pt-6 border-t border-white/5 flex items-center justify-between" style={{ transform: 'translateZ(15px)' }}>
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white">{rev.author}</span>
              <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-blue-600/20 flex items-center justify-center">
                <CheckCircle2 size={10} className="text-blue-400" />
              </div>
            </div>
            <p className="text-[7px] md:text-[9px] text-blue-500/80 font-black tracking-[0.3em] uppercase">{rev.role}</p>
          </div>
          
          <div className="text-[7px] font-mono text-blue-300/10 hidden sm:block uppercase tracking-tighter">
            VERIFIED_REF_{index + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Testimonials: React.FC<{ lang: Language }> = ({ lang }) => {
  const [selectedReview, setSelectedReview] = useState<{rev: Review, index: number} | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Record<number, string[]>>({});

  const t = {
    it: {
      title: "Voci",
      span: "dell'Eccellenza",
      subtitle: "HUMAN EXPERIENCE",
      desc: "L'impatto di KREA attraverso le parole dei partner che hanno scelto l'evoluzione digitale.",
      modalTitle: "Dettaglio Eccellenza",
      commentPlaceholder: "Aggiungi un commento...",
      commentBtn: "Invia",
      commentsTitle: "Discussione",
      noComments: "Nessun commento presente. Sii il primo."
    },
    en: {
      title: "Voices of",
      span: "Excellence",
      subtitle: "HUMAN EXPERIENCE",
      desc: "The impact of KREA through the words of partners who chose digital evolution.",
      modalTitle: "Excellence Detail",
      commentPlaceholder: "Add a comment...",
      commentBtn: "Send",
      commentsTitle: "Discussion",
      noComments: "No comments yet. Be the first."
    }
  }[lang];

  const reviews: Review[] = testimonialsData;

  const handleAddComment = () => {
    if (!comment.trim() || !selectedReview) return;
    const idx = selectedReview.index;
    setComments(prev => ({
      ...prev,
      [idx]: [...(prev[idx] || []), comment]
    }));
    setComment('');
  };

  return (
    <div className="py-24 md:py-48 relative overflow-hidden bg-transparent" id="testimonials">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-600/5 to-transparent blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 mb-16 tablet:mb-32 text-center reveal">
        <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full border-blue-500/20 text-blue-500 text-[10px] font-black tracking-[0.5em] uppercase mb-10 shadow-xl">
          <MessageSquare size={14} className="animate-pulse" />
          {t.subtitle}
        </div>
        <h2 className="text-5xl md:text-8xl lg:text-9xl heading font-black text-white tracking-tighter leading-[0.9] mb-10 uppercase py-2">
          {t.title}<br/><span className="text-blue-600 italic font-light serif lowercase">{t.span}</span>
        </h2>
        <p className="text-gray-500 text-lg md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed px-4">
          {t.desc}
        </p>
      </div>

      {/* INFINITE SCROLL CONTAINER */}
      <div className="relative w-full group reveal">
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>

        <div className="flex whitespace-nowrap overflow-hidden py-10">
          <div className="flex animate-infinite-scroll group-hover:pause">
            {/* Prima serie */}
            {reviews.map((rev, i) => (
              <TestimonialCard 
                key={`first-${i}`} 
                rev={rev} 
                index={i} 
                onClick={() => setSelectedReview({ rev, index: i })} 
              />
            ))}
            {/* Duplicazione per il loop infinito */}
            {reviews.map((rev, i) => (
              <TestimonialCard 
                key={`second-${i}`} 
                rev={rev} 
                index={i} 
                onClick={() => setSelectedReview({ rev, index: i })} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedReview && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedReview(null)}></div>
          <div className="relative w-full max-w-2xl glass rounded-[3rem] border-white/10 p-8 md:p-16 animate-reveal-3d overflow-hidden bg-slate-950/80 shadow-[0_0_100px_rgba(59,130,246,0.1)]">
            <button 
              onClick={() => setSelectedReview(null)}
              className="absolute top-8 right-8 p-3 rounded-full glass border-white/10 hover:bg-white/10 transition-all text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="space-y-10">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-black text-blue-500 tracking-[0.5em] uppercase">{t.modalTitle}</span>
                <div className="flex gap-1.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-blue-500 text-blue-500" />)}
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-10 -left-6 text-blue-500/10" size={80} />
                <p className="text-xl md:text-4xl serif italic text-white leading-tight md:leading-snug tracking-tight">
                  "{selectedReview.rev.text}"
                </p>
              </div>

              <div className="flex items-center justify-between border-y border-white/5 py-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center font-black heading text-white text-xl shadow-[0_0_20px_rgba(59,130,246,0.4)]">K</div>
                  <div>
                    <p className="text-lg font-black text-white uppercase tracking-tight leading-none mb-1.5">{selectedReview.rev.author}</p>
                    <p className="text-[10px] text-blue-500 font-black tracking-[0.2em] uppercase">{selectedReview.rev.role}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3 glass px-5 py-2.5 rounded-full border-blue-500/20">
                   <CheckCircle2 size={16} className="text-blue-500" />
                   <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">AUTHENTIC_SOURCE</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h5 className="text-[12px] font-black tracking-[0.4em] uppercase text-gray-500">{t.commentsTitle}</h5>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-600/10 px-3 py-1 rounded-full border border-blue-500/20">{(comments[selectedReview.index] || []).length} PACKETS</span>
                </div>
                
                <div className="space-y-5 max-h-[200px] overflow-y-auto pr-3 custom-scrollbar">
                  {(comments[selectedReview.index] || []).length === 0 ? (
                    <p className="text-sm text-gray-700 italic font-light">{t.noComments}</p>
                  ) : (
                    comments[selectedReview.index].map((c, i) => (
                      <div key={i} className="flex gap-5 items-start bg-white/[0.03] p-5 rounded-3xl border border-white/5 animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                           <User size={16} className="text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed font-light italic">{c}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder={t.commentPlaceholder}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                      className="w-full bg-white/5 rounded-2xl px-8 py-5 text-sm text-white placeholder-gray-800 outline-none border border-white/5 focus:border-blue-500/40 transition-all font-light"
                    />
                  </div>
                  <button 
                    onClick={handleAddComment}
                    className="px-6 rounded-2xl bg-blue-600 text-white hover:bg-white hover:text-black transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center group/send"
                  >
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 60s linear infinite;
          display: flex;
          width: max-content;
        }
        .pause {
          animation-play-state: paused;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 10px; }
        @keyframes reveal-3d {
          from { opacity: 0; transform: scale(0.9) translateZ(-150px); filter: blur(30px); }
          to { opacity: 1; transform: scale(1) translateZ(0); filter: blur(0); }
        }
        .animate-reveal-3d { animation: reveal-3d 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
