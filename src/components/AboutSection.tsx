'use client';

import { motion } from 'framer-motion';

interface AboutSectionProps {
  profile: {
    aboutText: string;
    hobbies: string[];
    aboutTitle?: string;
    aboutSubtitle?: string;
    aboutNarrativeTitle?: string;
    aboutText2?: string;
    highlight1Title?: string;
    highlight1Label?: string;
    highlight2Title?: string;
    highlight2Label?: string;
    highlight3Title?: string;
    highlight3Label?: string;
    hobbiesTitle?: string;
    ethosQuote?: string;
    ethosSubtitle?: string;
  };
}

// Assigns each hobby a float animation class in a cycle
const FLOAT_CLASSES = ['hobby-float-a', 'hobby-float-b', 'hobby-float-c', 'hobby-float-d'];

// Accent colours cycling for hobby tags
const ACCENT_GRADIENTS = [
  'from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-200 shadow-violet-500/10',
  'from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-200 shadow-pink-500/10',
  'from-orange-500/15 to-amber-600/10 border-orange-500/25 text-orange-200 shadow-orange-500/10',
  'from-cyan-500/15 to-sky-600/10 border-cyan-500/25 text-cyan-200 shadow-cyan-500/10',
  'from-emerald-500/15 to-teal-600/10 border-emerald-500/25 text-emerald-200 shadow-emerald-500/10',
];

// Organic blob border-radius values to make each hobby card feel bespoke
const ORGANIC_RADIUS = [
  '22px 8px 20px 10px / 10px 22px 8px 20px',
  '10px 24px 10px 20px / 20px 10px 24px 10px',
  '20px 12px 24px 8px / 12px 24px 8px 20px',
  '12px 22px 10px 24px / 24px 10px 22px 10px',
  '22px 10px 18px 12px / 10px 18px 12px 22px',
];

const NODE_DOT_COLORS = [
  'bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.9)]',
  'bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.9)]',
  'bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.9)]',
  'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]',
  'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]',
];

export default function AboutSection({ profile }: AboutSectionProps) {
  const {
    aboutText,
    hobbies,
    aboutTitle = 'Engineering Background',
    aboutSubtitle = 'Background & Philosophy',
    aboutNarrativeTitle = 'My Journey & Philosophy',
    aboutText2 = 'I specialize in modern JavaScript/TypeScript ecosystems — building resilient web apps with Next.js App Router, scaling backend services with Node.js and MongoDB, and designing smooth 60fps user interactions using Framer Motion and WebGL.',
    highlight1Title = 'Architected',
    highlight1Label = 'Clean System Design',
    highlight2Title = '60 FPS',
    highlight2Label = 'Fluid Micro-Motion',
    highlight3Title = '< 50 ms',
    highlight3Label = 'Target Response Latency',
    hobbiesTitle = 'Passions & Interests',
    ethosQuote = 'Obsessed with detail, driven by curiosity.',
    ethosSubtitle = 'Engineering Ethos',
  } = profile;

  const quoteWords = ethosQuote ? ethosQuote.split(/\s+/) : ['Obsessed', 'with', 'detail,', 'driven', 'by', 'curiosity.'];

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-white/5">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="text-xs font-semibold text-pink-400 tracking-widest uppercase mb-2">
            {aboutTitle}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            {aboutSubtitle}
          </h2>
        </motion.div>

        {/* Two-column layout: narrative left, hobby node constellation right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">

          {/* Main narrative (7 cols) — slides in from left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7 solid-card p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                <span>{aboutNarrativeTitle}</span>
              </h3>

              <div className="prose prose-invert max-w-none text-gray-300 text-base leading-relaxed space-y-4 font-sans">
                <p>
                  {aboutText ||
                    'My passion for software began with a fascination for how code turns abstract ideas into living, reactive digital tools. Over the years, I have evolved into a full-stack engineer driven by speed, architectural purity, and pixel perfection.'}
                </p>
                {aboutText2 && <p>{aboutText2}</p>}
              </div>
            </div>

            {/* Micro Highlights - Stat style without stock icons */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-0.5 group">
                <span className="font-display font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
                  {highlight1Title}
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  {highlight1Label}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 group">
                <span className="font-display font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">
                  {highlight2Title}
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  {highlight2Label}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 group">
                <span className="font-display font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  {highlight3Title}
                </span>
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  {highlight3Label}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Floating organic hobby node cloud (5 cols) — drifts in from right */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 flex flex-col"
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
              {hobbiesTitle}
            </p>

            {/* Organic node constellation cloud */}
            <div className="relative flex flex-wrap gap-3.5 items-start content-start min-h-[200px] p-2">
              {hobbies && hobbies.length > 0 ? (
                hobbies.map((hobby, idx) => (
                  <div
                    key={idx}
                    className={`
                      ${FLOAT_CLASSES[idx % FLOAT_CLASSES.length]}
                      bg-gradient-to-br ${ACCENT_GRADIENTS[idx % ACCENT_GRADIENTS.length]}
                      inline-flex items-center gap-2.5 px-4 py-2.5
                      border text-xs sm:text-sm font-semibold shadow-lg
                      cursor-default select-none
                      hover:scale-110 hover:brightness-125
                      transition-all duration-300
                    `}
                    style={{
                      borderRadius: ORGANIC_RADIUS[idx % ORGANIC_RADIUS.length],
                      animationDelay: `${idx * 0.7}s`,
                    }}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${NODE_DOT_COLORS[idx % NODE_DOT_COLORS.length]}`} />
                    <span>{hobby}</span>
                  </div>
                ))
              ) : (
                <span className="text-xs text-gray-500">No hobbies listed yet.</span>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Signature Quote — Large-type word-by-word scroll reveal ── */}
        <div className="py-4 border-t border-white/5">
          <div
            className="flex flex-wrap gap-x-4 gap-y-2 justify-center items-baseline"
            aria-label={ethosQuote}
          >
            {quoteWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`
                  font-display font-extrabold select-none
                  text-4xl sm:text-5xl lg:text-6xl leading-tight
                  ${i === 0 || i === 4 ? 'gradient-text' : 'text-white/80'}
                `}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: quoteWords.length * 0.1 + 0.2 }}
            className="text-center text-xs text-gray-500 mt-4 font-sans tracking-widest uppercase"
          >
            — {ethosSubtitle}
          </motion.p>
        </div>

      </div>
    </section>
  );
}
