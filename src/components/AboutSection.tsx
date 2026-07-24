'use client';

import { motion } from 'framer-motion';
import { Terminal, Cpu, Sparkles, Heart } from 'lucide-react';

interface AboutSectionProps {
  aboutText: string;
  hobbies: string[];
}

export default function AboutSection({ aboutText, hobbies }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-pink-400 tracking-wider uppercase mb-2">
              Engineering Background
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Background & Philosophy
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Combining architectural precision with interactive UI design and algorithmic curiosity.
          </p>
        </div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Narrative Card (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 solid-card p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-violet-400" />
                <span>My Journey & Philosophy</span>
              </h3>

              <div className="prose prose-invert max-w-none text-gray-300 text-base leading-relaxed space-y-4 font-sans">
                <p>
                  {aboutText ||
                    'My passion for software began with a fascination for how code turns abstract ideas into living, reactive digital tools. Over the years, I have evolved into a full-stack engineer driven by speed, architectural purity, and pixel perfection.'}
                </p>
                <p>
                  I specialize in modern JavaScript/TypeScript ecosystems — building resilient web apps with Next.js App Router, scaling backend services with Node.js and MongoDB, and designing smooth 60fps user interactions using Framer Motion and WebGL.
                </p>
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-semibold text-gray-300">Clean Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-semibold text-gray-300">Fluid Micro-Animations</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-semibold text-gray-300">Sub-50ms Latency</span>
              </div>
            </div>
          </motion.div>

          {/* Passions & Hobbies Sidebar (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 solid-card p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span>Passions & Hobbies</span>
              </h3>

              <p className="text-gray-400 text-xs mb-5">
                Interests outside daily code architecture:
              </p>

              <div className="flex flex-col gap-2.5">
                {hobbies && hobbies.length > 0 ? (
                  hobbies.map((hobby, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center gap-2.5 text-xs text-gray-300 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      <span>{hobby}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-gray-500">No hobbies listed</span>
                )}
              </div>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center">
              <span className="text-xs text-violet-300 font-medium italic">
                &ldquo;Obsessed with detail, driven by curiosity.&rdquo;
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
