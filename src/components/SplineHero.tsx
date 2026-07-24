'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, Bot } from 'lucide-react';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <SplineLoadingSkeleton />,
});

function SplineLoadingSkeleton() {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-pink-500/5 to-transparent animate-pulse" />
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <Bot className="w-8 h-8 text-violet-400 animate-bounce" />
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin text-pink-400" />
          <span>Initializing 3D Interactive Scene...</span>
        </div>
      </div>
    </div>
  );
}

export default function SplineHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] sm:h-[520px] lg:h-[600px] rounded-3xl overflow-hidden glass-card p-1 shadow-2xl"
    >
      {!isLoaded && <SplineLoadingSkeleton />}
      {/* Hide WebGL canvas completely when off-screen to stop WebGL GPU frame loops */}
      <div
        className={`w-full h-full transition-opacity duration-500 ${
          isLoaded && isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        <Spline
          scene="https://prod.spline.design/moQplg4AUXTYbopq/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}
