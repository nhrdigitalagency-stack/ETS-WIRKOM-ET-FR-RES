import React, { useState, useEffect } from 'react';

export const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(1, Math.max(0, scrollTop / scrollHeight));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
      rafId = null;
    };

    const handleScrollOrResize = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const percentage = Math.round(scrollProgress * 100);

  return (
    <div
      role="progressbar"
      aria-label="Progression de lecture de la page"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      className="sticky top-[4.25rem] sm:top-[4.85rem] z-40 w-full max-w-full px-3.5 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-full bg-[#E2E7E2]/80 dark:bg-[#2C332E]/80 h-1 shadow-2xs">
        <div
          className="h-full w-full origin-left bg-gradient-to-r from-[#115B38] via-[#FF6600] to-[#FF6600] transform-gpu transition-transform duration-100 ease-out motion-reduce:transition-none"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </div>
  );
};
