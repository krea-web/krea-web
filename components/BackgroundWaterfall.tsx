
import React, { useMemo, useEffect, useRef } from 'react';

export const BackgroundWaterfall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const columns = 12;
  const repeatText = Array(60).fill('KREA').join('     ');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth) * 2 - 1;
      const yPos = (clientY / innerHeight) * 2 - 1;

      containerRef.current.style.setProperty('--mouse-x', xPos.toString());
      containerRef.current.style.setProperty('--mouse-y', yPos.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const columnData = useMemo(() => {
    return Array.from({ length: columns }).map((_, i) => ({
      speed: 25 + Math.random() * 40,
      delay: Math.random() * -100,
      fontSize: 8 + Math.random() * 12,
      opacity: 0.02 + Math.random() * 0.06,
      blur: Math.random() > 0.7 ? Math.random() * 4 : 0,
      zIndex: Math.floor(Math.random() * 3),
      responsiveness: 0.2 + Math.random() * 0.8,
    }));
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 overflow-hidden select-none pointer-events-none"
      style={{
        perspective: '2000px',
        ['--mouse-x' as any]: '0',
        ['--mouse-y' as any]: '0',
        maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
      }}
    >
      <div className="flex justify-around h-full w-full opacity-60">
        {columnData.map((col, i) => {
          return (
            <div 
              key={i} 
              className="animate-waterfall h-fit flex flex-col items-center transition-transform duration-1000 ease-out"
              style={{ 
                animationDuration: `${col.speed}s`, 
                animationDelay: `${col.delay}s`,
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                opacity: col.opacity,
                filter: col.blur ? `blur(${col.blur}px)` : 'none',
                zIndex: col.zIndex,
                transform: `
                  translateZ(${col.zIndex * 150}px) 
                  translateX(calc(var(--mouse-x) * ${col.responsiveness * 100}px))
                  rotateY(calc(var(--mouse-x) * ${col.responsiveness * 10}deg))
                `,
              }}
            >
              <span className="luminous-bg-text py-24 heading font-black tracking-[1em]" style={{ fontSize: `${col.fontSize}px` }}>
                {repeatText}
              </span>
              <span className="luminous-bg-text py-24 heading font-black tracking-[1em]" style={{ fontSize: `${col.fontSize}px` }}>
                {repeatText}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Deep Space Atmosphere Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-[4000ms] ease-out opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, transparent 80%)',
          transform: `translate(calc(var(--mouse-x) * 3%), calc(var(--mouse-y) * 3%))`
        }}
      ></div>
    </div>
  );
};
