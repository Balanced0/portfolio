'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, Sparkles, Cpu, Layers } from 'lucide-react';
import { getTechIcon } from '@/components/TechIcons';

export interface SkillItem {
  name: string;
  category: string;
  proficiency?: number;
  icon?: string;
  order?: number;
}

interface SkillsSectionProps {
  skills: SkillItem[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  // Extract unique categories in order
  const categories = useMemo(() => {
    const defaultOrder = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'Tools'];
    const uniqueFromProps = Array.from(new Set(skills.map((s) => s.category))).filter(Boolean);
    
    // Combine and keep standard order first
    const combined = ['All'];
    defaultOrder.slice(1).forEach((cat) => {
      if (uniqueFromProps.some((c) => c.toLowerCase() === cat.toLowerCase())) {
        combined.push(cat);
      }
    });
    
    // Add any extra custom categories
    uniqueFromProps.forEach((cat) => {
      if (!combined.some((c) => c.toLowerCase() === cat.toLowerCase())) {
        combined.push(cat);
      }
    });

    return combined;
  }, [skills]);

  // Filter skills based on category and search query
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        activeCategory === 'All' ||
        skill.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [skills, activeCategory, searchQuery]);

  // Compute category count for pills
  const getCategoryCount = (catName: string) => {
    if (catName === 'All') return skills.length;
    return skills.filter((s) => s.category.toLowerCase() === catName.toLowerCase()).length;
  };

  // Mouse spotlight handler (GPU-accelerated, zero re-renders)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#05030a] border-t border-white/5">
      {/* Background Ambient Glow & Mesh Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Glowing Central Nebula Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/20 via-violet-600/15 to-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-pink-900/10 rounded-full blur-[100px]" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-cyan-900/10 rounded-full blur-[100px]" />
        
        {/* Subtle Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header & 3D Chrome Sculpture Motif */}
        <div className="flex flex-col items-center text-center mb-14">
          
          {/* Futuristic 3D Floating Sculpture Graphic (Demo 3 Inspired) */}
          <div className="relative mb-6 group cursor-pointer">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#0d091a] border border-purple-500/30 flex items-center justify-center shadow-2xl backdrop-blur-xl">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-violet-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" viewBox="0 0 100 100" fill="none">
                {/* Sleek Chrome Sculpture Paths */}
                <path d="M50 15 C30 15 15 30 15 50 C15 70 30 85 50 85 C70 85 85 70 85 50 C85 30 70 15 50 15 Z" stroke="url(#sculptureGrad1)" strokeWidth="3" fill="none" />
                <path d="M50 25 C36 25 25 36 25 50 C25 64 36 75 50 75 C64 75 75 64 75 50 C75 36 64 25 50 25 Z" stroke="url(#sculptureGrad2)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
                <circle cx="50" cy="50" r="10" fill="url(#sculptureGrad1)" />
                <defs>
                  <linearGradient id="sculptureGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="50%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                  <linearGradient id="sculptureGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-300 tracking-widest uppercase mb-4 shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-violet-400" />
            <span>MY SKILLS & ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            My Core <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Abilities</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            A battle-tested tech stack engineered for speed, scalability, and pixel-perfect responsiveness across modern full-stack web architectures.
          </p>
        </div>

        {/* Controls Container: Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Filter Pills (Demo 1 & 2 Inspired) */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0c0817]/90 border border-purple-500/20 backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar shadow-inner">
            {categories.map((cat) => {
              const isActive = cat.toLowerCase() === activeCategory.toLowerCase();
              const count = getCategoryCount(cat);

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200 flex items-center gap-2 whitespace-nowrap z-10 ${
                    isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(147,51,234,0.4)] border border-violet-400/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                  <span
                    className={`relative z-10 px-1.5 py-0.5 rounded-md text-[10px] font-mono transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0c0817]/90 border border-purple-500/20 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tech Stack Card Grid (Demo 1 Spotlight + Glass Cards) */}
        <AnimatePresence mode="wait">
          {filteredSkills.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-gray-500 text-sm bg-[#0c0817]/40 rounded-2xl border border-white/5"
            >
              No technologies found matching &quot;{searchQuery}&quot;
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + searchQuery}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                  },
                },
                exit: { opacity: 0, transition: { duration: 0.15 } },
              }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5"
            >
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, y: 15, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onMouseMove={handleMouseMove}
                  onClick={() => setSelectedSkill(skill)}
                  className="tech-card-spotlight group rounded-2xl bg-[#0c0818]/70 backdrop-blur-md border border-purple-500/15 hover:border-violet-400/60 p-4 sm:p-5 transition-all duration-300 transform-gpu hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] flex flex-col items-center justify-between text-center gap-3 cursor-pointer"
                >
                  {/* Category Pill Tag */}
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                    <span>{skill.category}</span>
                    {skill.proficiency ? (
                      <span className="text-violet-400 font-semibold">{skill.proficiency}%</span>
                    ) : null}
                  </div>

                  {/* Brand SVG Icon with Animated Glow */}
                  <div className="relative my-2 p-3 rounded-2xl bg-white/[0.03] group-hover:bg-violet-500/15 border border-white/5 group-hover:border-violet-500/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="transform group-hover:scale-110 transition-transform duration-300 ease-out">
                      {getTechIcon(skill.name, skill.icon, 'w-8 h-8 sm:w-10 sm:h-10')}
                    </div>
                  </div>

                  {/* Tech Name */}
                  <div className="w-full">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-white transition-colors truncate">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Bottom Hover Shine Bar */}
                  <div className="w-full h-1 rounded-full bg-white/5 group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-cyan-400 transition-all duration-300" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skill Detail Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm rounded-3xl bg-[#0f0a21] border border-purple-500/30 p-6 shadow-2xl overflow-hidden"
              >
                {/* Top Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-violet-600/30 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      {getTechIcon(selectedSkill.name, selectedSkill.icon, 'w-8 h-8')}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{selectedSkill.name}</h4>
                      <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                        {selectedSkill.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="p-1 rounded-lg text-gray-400 hover:text-white bg-white/5"
                  >
                    ✕
                  </button>
                </div>

                {selectedSkill.proficiency ? (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Proficiency & Experience</span>
                      <span className="text-violet-300 font-semibold">{selectedSkill.proficiency}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.proficiency}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                ) : null}

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Actively utilized in production environments to build resilient, high-performance software modules and maintainable architectures.
                </p>

                <button
                  onClick={() => setSelectedSkill(null)}
                  className="w-full py-2.5 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 text-xs font-semibold border border-violet-500/40 transition-colors"
                >
                  Close Inspector
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
