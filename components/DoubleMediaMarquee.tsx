
import React from 'react';

interface ProjectHypothesis {
  url: string;
}

const row1: ProjectHypothesis[] = [
  { url: 'https://i.postimg.cc/xdt8pxDd/KREA-VISION-1-jpg.png' },
  { url: 'https://i.postimg.cc/2yf5VPnK/KREA-VISION-2-jpg.png' },
  { url: 'https://i.postimg.cc/MH8Gvh1Y/KREA-VISION-3-jpg.png' },
  { url: 'https://i.postimg.cc/d3K0LzGB/KREA-VISION-4-jpg.png' },
  { url: 'https://i.postimg.cc/d38L6qq3/KREA-VISION-5-jpg.png' },
  { url: 'https://i.postimg.cc/jqNwthyN/KREA-VISION-6-jpg.png' },
  { url: 'https://i.postimg.cc/jqNwthyP/KREA-VISION-7-jpg.png' },
  { url: 'https://i.postimg.cc/qq8zwkk7/KREA-VISION-8-jpg.png' },
];

const row2: ProjectHypothesis[] = [
  { url: 'https://i.postimg.cc/nV7jp1q4/KREA-VISION-9-jpg.png' },
  { url: 'https://i.postimg.cc/d043NHP1/KREA-VISION-10-jpg.png' },
  { url: 'https://i.postimg.cc/7Y0gtkKp/KREA-VISION-11-jpg.png' },
  { url: 'https://i.postimg.cc/wv4tMW0P/KREA-VISION-12-jpg.png' },
  { url: 'https://i.postimg.cc/qMy8DTmH/KREA-VISION-13-jpg.png' },
  { url: 'https://i.postimg.cc/MKVy3Ssk/KREA-VISION-14-jpg.png' },
  { url: 'https://i.postimg.cc/c4wQkSDW/KREA-VISION-15-jpg.png' },
  { url: 'https://i.postimg.cc/RVd0ZphQ/HERO-16.png' },
];

export const DoubleMediaMarquee: React.FC = () => {
  return (
    <div className="py-20 md:py-32 relative overflow-hidden bg-black select-none">
      {/* Top Gradient for smooth integration with previous section */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/90 to-transparent z-10 pointer-events-none"></div>

      {/* Sezione Introduttiva */}
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 relative z-20">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-8 text-center md:text-left">
          <div className="space-y-4">
            <span className="text-blue-500 font-black text-[9px] md:text-[11px] tracking-[0.5em] uppercase block pl-1">DESIGN SPECIFICATIONS</span>
            <h3 className="text-5xl md:text-7xl heading font-black tracking-tighter uppercase text-white leading-[0.9]">
              KREA <span className="text-blue-600 italic serif lowercase drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">Vision.</span>
            </h3>
          </div>
          <p className="text-gray-400 italic text-sm md:text-lg max-w-md md:border-l border-blue-600/30 md:pl-8 mb-2 font-light leading-relaxed">
            Esplora l'archivio delle nostre proiezioni digitali. Dove l'estetica incontra l'ingegneria.
          </p>
        </div>
      </div>

      {/* Fade Masks */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"></div>

      <div className="space-y-8 md:space-y-12 relative z-0">
        {/* Row 1: Images scrolling RIGHT */}
        <div className="flex overflow-hidden whitespace-nowrap group py-4">
          <div className="flex animate-scroll-right gap-6 md:gap-10 px-4 md:px-6">
            {[...row1, ...row1, ...row1].map((item, i) => (
              <ProjectCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Images scrolling LEFT */}
        <div className="flex overflow-hidden whitespace-nowrap group py-4">
          <div className="flex animate-scroll-left gap-6 md:gap-10 px-4 md:px-6">
            {[...row2, ...row2, ...row2].map((item, i) => (
              <ProjectCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-right {
          animation: scroll-right 80s linear infinite;
        }
        .animate-scroll-left {
          animation: scroll-left 70s linear infinite;
        }
        @media (min-width: 768px) {
            .animate-scroll-right { animation-duration: 100s; }
            .animate-scroll-left { animation-duration: 90s; }
        }
        /* PAUSE ANIMATION ON HOVER */
        .group:hover .animate-scroll-right, 
        .group:hover .animate-scroll-left {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const ProjectCard: React.FC<{ item: ProjectHypothesis }> = ({ item }) => {
  return (
    <div className="relative group pointer-events-auto cursor-none overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 bg-zinc-950 transition-all duration-700 hover:border-blue-500/60 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] w-[300px] h-[200px] md:w-[500px] md:h-[320px] hover:z-30">
      
      {/* High-Fidelity Image */}
      <img 
        src={item.url} 
        alt="KREA Vision Concept" 
        loading="lazy"
        width="800"
        height="600"
        fetchPriority="low"
        className="w-full h-full object-cover opacity-70 grayscale-[30%] group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" 
      />
      
      {/* Cinematic Overlay (Removed heavy text gradient, kept subtle for depth) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      
      {/* Glowing Border Animation */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-blue-500/30 rounded-[1.5rem] md:rounded-[2.5rem] transition-colors duration-500 pointer-events-none"></div>
    </div>
  );
}
