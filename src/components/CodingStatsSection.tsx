'use client';

import { Code, Terminal, Trophy, ExternalLink, CheckCircle2 } from 'lucide-react';

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
    ratingHistory: [
      { title: 'Div. 3 Round 820', rating: 1180, date: '2023-01' },
      { title: 'Educational Round 145', rating: 1290, date: '2023-05' },
      { title: 'Div. 2 Round 890', rating: 1380, date: '2023-10' },
      { title: 'Div. 2 Round 910', rating: 1450, date: '2024-03' },
    ],
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

  // Rating History Sparkline Points calculation for Codeforces
  const history = codeforces.ratingHistory && codeforces.ratingHistory.length > 0
    ? codeforces.ratingHistory
    : [
        { rating: 1180 },
        { rating: 1290 },
        { rating: 1380 },
        { rating: 1450 },
      ];

  const minRating = Math.min(...history.map((h: { rating: number }) => h.rating || 1000)) - 50;
  const maxRating = Math.max(...history.map((h: { rating: number }) => h.rating || 1600)) + 50;
  
  const chartWidth = 400;
  const chartHeight = 120;

  const points = history.map((item: { rating: number }, idx: number) => {
    const x = (idx / Math.max(1, history.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - ((item.rating - minRating) / (maxRating - minRating)) * (chartHeight - 30) - 15;
    return { x, y, rating: item.rating };
  });

  const pathD = points.length > 1
    ? points.reduce((acc: string, curr: { x: number; y: number }, i: number) => {
        return i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
      }, '')
    : '';

  return (
    <section id="coding-stats" className="py-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Terminal Header Bar */}
        <div className="terminal-frame mb-8">
          <div className="terminal-titlebar">
            <div className="terminal-dot bg-rose-500/80" />
            <div className="terminal-dot bg-amber-500/80" />
            <div className="terminal-dot bg-emerald-500/80" />
            <span className="text-[11px] font-medium text-gray-400 ml-2">
              competitive-programming-telemetry --user=MISTYCAN
            </span>
          </div>
          <div className="p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0a0c10]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>ACM-ICPC & Algorithmic Profile</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Competitive Programming Metrics
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://codeforces.com/profile/${codeforces.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-btn py-1.5 px-3 text-xs"
              >
                Codeforces @{codeforces.handle} <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              <a
                href={`https://leetcode.com/u/${leetcode.handle}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-btn py-1.5 px-3 text-xs"
              >
                LeetCode @{leetcode.handle} <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Codeforces Card */}
          <div className="lg:col-span-7 terminal-frame p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Codeforces Profile</h3>
                    <span className="text-xs text-sky-400 font-medium">Handle: {codeforces.handle}</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  {codeforces.rank || 'Specialist'}
                </div>
              </div>

              {/* Rating Stats Numbers */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Current Rating</span>
                  <div className="text-xl font-bold text-cyan-300 mt-0.5">
                    {codeforces.rating || 1450}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Max Rating</span>
                  <div className="text-xl font-bold text-violet-300 mt-0.5">
                    {codeforces.maxRating || 1520}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Problems Solved</span>
                  <div className="text-xl font-bold text-pink-400 mt-0.5">
                    {codeforces.totalSolved || 480}+
                  </div>
                </div>
              </div>

              {/* Contest Rating Sparkline Chart */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center justify-between text-xs font-medium text-gray-400 mb-2">
                  <span>Rating Progression Chart</span>
                  <span className="text-emerald-400">Peak: {codeforces.maxRating || 1520}</span>
                </div>

                <div className="w-full overflow-hidden">
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-28 overflow-visible">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2={chartWidth} y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <line x1="0" y1="60" x2={chartWidth} y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2={chartWidth} y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                    {pathD && (
                      <path
                        d={`${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`}
                        fill="url(#chartGlow)"
                      />
                    )}

                    {pathD && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {points.map((p: { x: number; y: number; rating: number }, idx: number) => (
                      <g key={idx}>
                        <circle cx={p.x} cy={p.y} r="4" fill="#38bdf8" stroke="#09090e" strokeWidth="2" />
                        <text
                          x={p.x}
                          y={p.y - 8}
                          textAnchor="middle"
                          fill="#a5f3fc"
                          fontSize="9"
                          fontWeight="bold"
                        >
                          {p.rating}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* LeetCode Card */}
          <div className="lg:col-span-5 terminal-frame p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">LeetCode Profile</h3>
                    <span className="text-xs text-amber-400 font-medium">Handle: {leetcode.handle}</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {leetcode.rank || 'Knight'}
                </div>
              </div>

              {/* Total Solved Header */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Total Solved</span>
                  <div className="text-3xl font-bold text-white mt-0.5">
                    {totalLC}
                  </div>
                </div>
                <div className="text-right text-xs font-semibold text-amber-400">
                  Rating: {leetcode.rating || 1780}
                </div>
              </div>

              {/* Problem Difficulty Breakdown */}
              <div className="space-y-4">
                {/* Easy */}
                <div>
                  <div className="flex items-center justify-between text-xs font-medium mb-1">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Easy
                    </span>
                    <span className="text-gray-300">{easy}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, (easy / totalLC) * 100 * 2.5)}%` }}
                      className="h-full bg-emerald-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex items-center justify-between text-xs font-medium mb-1">
                    <span className="text-amber-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Medium
                    </span>
                    <span className="text-gray-300">{medium}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, (medium / totalLC) * 100 * 2)}%` }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex items-center justify-between text-xs font-medium mb-1">
                    <span className="text-rose-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Hard
                    </span>
                    <span className="text-gray-300">{hard}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, (hard / totalLC) * 100 * 3)}%` }}
                      className="h-full bg-rose-400 rounded-full"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
