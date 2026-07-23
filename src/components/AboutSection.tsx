'use client';

import { motion } from 'framer-motion';
import { UserCheck, Heart, Terminal, Cpu, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  aboutText: string;
  hobbies: string[];
}

export default function AboutSection({ aboutText, hobbies }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Behind The Code</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl text-base">
            Passionate about building software that balances high-performance architecture with exquisite visual craftsmanship.
          </p>
        </motion.div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Journey & Philosophy Card (8 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 glass-card p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  My Engineering Journey
                </h3>
              </div>

              <div className="prose prose-invert max-w-none text-gray-300 text-base leading-relaxed space-y-4 font-sans">
                <p>
                  {aboutText ||
                    'My passion for software began with a fascination for how code turns abstract ideas into living, reactive digital tools. Over the years, I have evolved into a full-stack engineer driven by speed, architectural purity, and pixel perfection.'}
                </p>
                <p>
                  I specialize in modern JavaScript/TypeScript ecosystems — building resilient web apps with Next.js App Router, scaling backend services with Node.js and MongoDB, and designing silky smooth 60fps user interactions using Framer Motion and WebGL.
                </p>
                <p>
                  Whether it is optimizing core database queries, designing glassmorphic micro-animations, or competing in algorithmic programming contests, I strive for engineering excellence in every line of code.
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
                <span className="text-xs font-semibold text-gray-300">Sub-50ms API Latency</span>
              </div>
            </div>
          </motion.div>

          {/* Hobbies & Interests Card (4 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4 glass-card p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Passions & Hobbies
                </h3>
              </div>

              <p className="text-gray-400 text-sm mb-6">
                When I am not sitting in front of a code editor or analyzing stack traces, you will find me exploring creative tech, problem solving, or tinkering with design:
              </p>

              <div className="flex flex-col gap-3">
                {hobbies && hobbies.length > 0 ? (
                  hobbies.map((hobby, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3 hover:border-pink-500/30 hover:bg-white/5 transition-all"
                    >
                      <span className="w-2 h-2 rounded-full bg-pink-400" />
                      <span className="text-sm font-medium text-gray-200">{hobby}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No hobbies listed</span>
                )}
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-violet-900/30 to-pink-900/20 border border-violet-500/20 text-center">
              <span className="text-xs font-mono text-violet-300">
                &ldquo;Obsessed with detail, driven by curiosity.&rdquo;
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
