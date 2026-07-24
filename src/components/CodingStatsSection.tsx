'use client';

import { ExternalLink, TrendingUp } from 'lucide-react';

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

/* ─── Codeforces SVG Logo ─────────────────────────────────────────────────── */
function CodeforcesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5C9 3.672 9.672 3 10.5 3h3zm9 7.5c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
    </svg>
  );
}

/* ─── LeetCode SVG Logo ───────────────────────────────────────────────────── */
function LeetCodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

/* ─── Stat Box ────────────────────────────────────────────────────────────── */
function StatBox({
  label,
  value,
  accentClass,
}: {
  label: string;
  value: string | number;
  accentClass: string;
}) {
  return (
    <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
        {label}
      </span>
      <span className={`text-lg font-extrabold font-display leading-none ${accentClass}`}>
        {value}
      </span>
    </div>
  );
}

/* ─── Difficulty Bar ──────────────────────────────────────────────────────── */
function DiffBar({
  label,
  count,
  total,
  barClass,
  labelClass,
}: {
  label: string;
  count: number;
  total: number;
  barClass: string;
  labelClass: string;
}) {
  const pct = total > 0 ? Math.min(100, (count / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
        <span className={labelClass}>{label}</span>
        <span className="text-gray-400 tabular-nums">{count}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={`h-full rounded-full ${barClass} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function CodingStatsSection({ stats }: CodingStatsSectionProps) {
  /* ── Pull platform data ────────────────────────────────────────────── */
  const codeforces = (stats || []).find((s) => s.platform === 'codeforces') || {
    platform: 'codeforces',
    handle: 'MISTYCAN',
    rating: 814,
    maxRating: 872,
    rank: 'newbie',
    totalSolved: 0,
    ratingHistory: [],
  };

  const leetcode = (stats || []).find((s) => s.platform === 'leetcode') || {
    platform: 'leetcode',
    handle: 'MISTYCAN',
    rating: 1467,
    maxRating: 1467,
    rank: '#1,665,281',
    totalSolved: 95,
    easySolved: 76,
    mediumSolved: 19,
    hardSolved: 0,
  };

  const easy = leetcode.easySolved ?? 0;
  const medium = leetcode.mediumSolved ?? 0;
  const hard = leetcode.hardSolved ?? 0;
  const totalLC = leetcode.totalSolved || easy + medium + hard;

  /* ── Rating chart (Codeforces history) ────────────────────────────── */
  const history: { rating: number; title?: string; date?: string }[] =
    codeforces.ratingHistory && codeforces.ratingHistory.length > 0
      ? codeforces.ratingHistory
      : [{ rating: codeforces.rating || 814 }];

  const ratings = history.map((h) => h.rating || 0);
  const minR = Math.max(0, Math.min(...ratings) - 80);
  const maxR = Math.max(...ratings) + 80;

  const W = 480;
  const H = 130;
  const PAD_X = 16;
  const PAD_Y = 16;

  const toXY = (idx: number, rating: number) => ({
    x: history.length === 1
      ? W / 2
      : PAD_X + (idx / (history.length - 1)) * (W - PAD_X * 2),
    y: H - PAD_Y - ((rating - minR) / (maxR - minR)) * (H - PAD_Y * 2),
  });

  const pts = history.map((item, idx) => toXY(idx, item.rating || 0));

  const linePath =
    pts.length > 1
      ? pts.reduce(
          (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
          ''
        )
      : '';

  const areaPath =
    linePath && pts.length > 1
      ? `${linePath} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`
      : '';

  /* ── Last-fetched label ────────────────────────────────────────────── */
  const cfFetchedAt = codeforces.lastFetchedAt
    ? new Date(codeforces.lastFetchedAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <section
      id="coding-stats"
      className="py-28 relative bg-[#05030a] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(236,72,153,0.04) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header (matches Education / Experience pattern) ── */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">
            Competitive Programming
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Coding Stats
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            Live data pulled from Codeforces and LeetCode — updated every hour.
          </p>

          {/* Profile links */}
          <div className="flex items-center gap-3 mt-5">
            <a
              id="coding-stats-cf-link"
              href={`https://codeforces.com/profile/${codeforces.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-btn py-1.5 px-4 text-xs gap-1.5"
            >
              <CodeforcesIcon className="w-3.5 h-3.5" />
              codeforces/{codeforces.handle}
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              id="coding-stats-lc-link"
              href={`https://leetcode.com/u/${leetcode.handle}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-btn py-1.5 px-4 text-xs gap-1.5"
            >
              <LeetCodeIcon className="w-3.5 h-3.5" />
              leetcode/{leetcode.handle}
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* ── Cards Grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Codeforces Card (7 / 12) ─────────────────────────────── */}
          <div
            id="coding-stats-cf-card"
            className="lg:col-span-7 glass-card p-6 flex flex-col gap-5"
          >
            {/* Card header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.07]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/25 flex items-center justify-center text-violet-400 shrink-0">
                  <CodeforcesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white leading-none mb-0.5">
                    Codeforces
                  </h3>
                  <span className="text-[11px] text-gray-500 font-medium">
                    @{codeforces.handle}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-violet-300 uppercase tracking-wider capitalize px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                {codeforces.rank || 'Unrated'}
              </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <StatBox
                label="Current"
                value={codeforces.rating ?? 0}
                accentClass="text-violet-300"
              />
              <StatBox
                label="Peak"
                value={codeforces.maxRating ?? 0}
                accentClass="text-pink-400"
              />
              <StatBox
                label="Contests"
                value={history.length}
                accentClass="text-orange-400"
              />
            </div>

            {/* Rating progression chart */}
            <div className="rounded-xl bg-black/30 border border-white/[0.05] p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                  <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                  Rating Progression
                </div>
                <span className="text-[11px] text-pink-400 font-semibold">
                  Peak {codeforces.maxRating ?? 0}
                </span>
              </div>

              <div className="w-full overflow-hidden">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="w-full h-28 overflow-visible"
                  aria-label="Codeforces rating progression chart"
                >
                  <defs>
                    {/* Gradient for the line stroke */}
                    <linearGradient id="cfLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                    {/* Gradient for the area fill */}
                    <linearGradient id="cfAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Subtle grid lines */}
                  {[0.25, 0.5, 0.75].map((f) => (
                    <line
                      key={f}
                      x1={PAD_X}
                      y1={PAD_Y + f * (H - PAD_Y * 2)}
                      x2={W - PAD_X}
                      y2={PAD_Y + f * (H - PAD_Y * 2)}
                      stroke="rgba(255,255,255,0.04)"
                      strokeDasharray="4 4"
                    />
                  ))}

                  {/* Area fill */}
                  {areaPath && (
                    <path d={areaPath} fill="url(#cfAreaGrad)" />
                  )}

                  {/* Line */}
                  {linePath && (
                    <path
                      d={linePath}
                      fill="none"
                      stroke="url(#cfLineGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Dots + labels */}
                  {pts.map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={pts.length > 8 ? 3 : 4}
                        fill="#ec4899"
                        stroke="#05030a"
                        strokeWidth="2"
                      />
                      {/* Only show rating label if few points, to avoid clutter */}
                      {pts.length <= 10 && (
                        <text
                          x={p.x}
                          y={p.y - 9}
                          textAnchor="middle"
                          fill="#d1d5db"
                          fontSize="8.5"
                          fontWeight="600"
                          fontFamily="system-ui, sans-serif"
                        >
                          {history[i].rating}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>

              {cfFetchedAt && (
                <p className="text-[10px] text-gray-600 text-right">
                  Updated {cfFetchedAt}
                </p>
              )}
            </div>
          </div>

          {/* ── LeetCode Card (5 / 12) ───────────────────────────────── */}
          <div
            id="coding-stats-lc-card"
            className="lg:col-span-5 glass-card p-6 flex flex-col gap-5"
          >
            {/* Card header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.07]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400 shrink-0">
                  <LeetCodeIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white leading-none mb-0.5">
                    LeetCode
                  </h3>
                  <span className="text-[11px] text-gray-500 font-medium">
                    @{leetcode.handle}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-pink-300 uppercase tracking-wider capitalize px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 max-w-[110px] truncate text-right">
                {leetcode.rank || 'Unranked'}
              </span>
            </div>

            {/* Stats row — mirrors CF structure */}
            <div className="grid grid-cols-3 gap-3">
              <StatBox
                label="Contest"
                value={leetcode.rating ?? 0}
                accentClass="text-violet-300"
              />
              <StatBox
                label="Solved"
                value={totalLC}
                accentClass="text-pink-400"
              />
              <StatBox
                label="Hard"
                value={hard}
                accentClass="text-orange-400"
              />
            </div>

            {/* Difficulty breakdown — fills the same space as CF chart */}
            <div className="rounded-xl bg-black/30 border border-white/[0.05] p-4 flex flex-col gap-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">Difficulty Breakdown</span>
                <span className="text-[11px] text-pink-400 font-semibold">
                  {totalLC} total
                </span>
              </div>

              <div className="flex flex-col gap-3 flex-1 justify-center">
                <DiffBar
                  label="Easy"
                  count={easy}
                  total={totalLC}
                  barClass="bg-gradient-to-r from-violet-400 to-violet-500"
                  labelClass="text-violet-300"
                />
                <DiffBar
                  label="Medium"
                  count={medium}
                  total={totalLC}
                  barClass="bg-gradient-to-r from-pink-400 to-pink-500"
                  labelClass="text-pink-300"
                />
                <DiffBar
                  label="Hard"
                  count={hard}
                  total={totalLC}
                  barClass="bg-gradient-to-r from-orange-400 to-orange-500"
                  labelClass="text-orange-300"
                />
              </div>

              {/* Visual donut-style summary */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.05]">
                {[
                  { label: 'Easy', n: easy, cls: 'text-violet-400' },
                  { label: 'Medium', n: medium, cls: 'text-pink-400' },
                  { label: 'Hard', n: hard, cls: 'text-orange-400' },
                ].map(({ label, n, cls }) => (
                  <div key={label} className="text-center">
                    <div className={`text-lg font-extrabold font-display leading-none ${cls}`}>
                      {n}
                    </div>
                    <div className="text-[10px] text-gray-600 mt-0.5 uppercase tracking-wider">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
