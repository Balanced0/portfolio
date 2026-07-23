'use client';

import { ArrowUp, Code2, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#07070b]/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center text-white">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-white tracking-wide text-sm">
            ALVI<span className="text-violet-400">.DEV</span>
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400 font-sans flex items-center gap-1.5">
          <span>&copy; {new Date().getFullYear()} Alvi Hasan. Engineered with</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          <span>using Next.js 16 & Tailwind CSS.</span>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-2 text-xs font-semibold"
          aria-label="Back to top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 text-violet-400" />
        </button>

      </div>
    </footer>
  );
}
