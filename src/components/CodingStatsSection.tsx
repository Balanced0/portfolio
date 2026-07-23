'use client';

import { motion } from 'framer-motion';
import { Code, Terminal, Trophy, ExternalLink, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export interface CodingStatItem {
  platform: 'codeforces' | 'leetcode' | string;
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ratingHistory?: Array<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastFetchedAt?: string | Date | any;
}

interface CodingStatsSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: CodingStatItem[] | any[];
}

export default function CodingStatsSection({ stats }: CodingStatsSectionProps) {
  const codeforces = (stats || []).find((s) => s.platform === 'codeforces') || {
    platform: 'codeforces',
    handle: 'MISTYCAN',
    rating: 1450,
    maxRating: 1520,
    rank: 'Specialist',
    totalSolved: 480,
  };

  const leetcode = (stats || []).find((s) => s.platform === 'leetcode') || {
    platform: 'leetcode',
    handle: 'MISTYCAN',
    rating: 1780,
    maxRating: 1810,
    rank: 'Knight',
    totalSolved: 650,
    easySolved: 240,
    mediumSolved: 320,
    hardSolved: 90,
  };

  const easy = leetcode.easySolved || 240;
  const medium = leetcode.mediumSolved || 320;
  const hard = leetcode.hardSolved || 90;
  const totalLC = leetcode.totalSolved || easy + medium + hard;

  return (
    <section id="coding-stats" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Problem Solving & Algorithms</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            Competitive <span className="gradient-text">Programming</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl text-base">
            Live tracked metrics and rating history from Codeforces and LeetCode.
          </p>
        </motion.div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Codeforces Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase text-sky-400 tracking-wider">
                      Codeforces
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                      @{codeforces.handle}
                    </h3>
                  </div>
                </div>

                <a
                  href={`https://codeforces.com/profile/${codeforces.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <span>Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col">
                  <span className="text-xs text-gray-400 font-medium">Current Rating</span>
                  <span className="text-2xl font-display font-extrabold text-cyan-300 mt-1">
                    {codeforces.rating || 1450}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col">
                  <span className="text-xs text-gray-400 font-medium">Max Rating</span>
                  <span className="text-2xl font-display font-extrabold text-violet-300 mt-1">
                    {codeforces.maxRating || 1520}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col col-span-2 sm:col-span-1">
                  <span className="text-xs text-gray-400 font-medium">Rank Title</span>
                  <span className="text-base font-display font-bold text-pink-400 mt-1 flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    {codeforces.rank || 'Specialist'}
                  </span>
                </div>
              </div>

              {/* Rating History Log */}
              {codeforces.ratingHistory && codeforces.ratingHistory.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-3 block">
                    Recent Contest Highlights
                  </span>
                  <div className="space-y-2">
                    {codeforces.ratingHistory.slice(-3).map((item: { title?: string; date?: string; rating?: number }, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-white/[0.02] border border-white/5"
                      >
                        <span className="text-gray-300 font-medium truncate max-w-[200px]">
                          {item.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-mono">{item.date}</span>
                          <span className="font-mono font-bold text-cyan-400">{item.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase text-amber-400 tracking-wider">
                      LeetCode
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                      @{leetcode.handle}
                    </h3>
                  </div>
                </div>

                <a
                  href={`https://leetcode.com/u/${leetcode.handle}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <span>Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Total Solved Overview */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-transparent border border-amber-500/20 mb-6">
                <div>
                  <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Total Solved Problems
                  </span>
                  <div className="text-3xl font-display font-extrabold text-white mt-0.5">
                    {totalLC}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Easy / Medium / Hard Progress Bars */}
              <div className="space-y-4">
                {/* Easy */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Easy
                    </span>
                    <span className="font-mono text-gray-300">{easy} Solved</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, (easy / totalLC) * 100 * 2.5)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-emerald-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-amber-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Medium
                    </span>
                    <span className="font-mono text-gray-300">{medium} Solved</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, (medium / totalLC) * 100 * 2)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-rose-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Hard
                    </span>
                    <span className="font-mono text-gray-300">{hard} Solved</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, (hard / totalLC) * 100 * 3)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-rose-400 rounded-full"
                    />
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
