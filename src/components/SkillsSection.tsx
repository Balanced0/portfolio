'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
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

  // Extract unique categories in custom clean order
  const categories = useMemo(() => {
    const defaultOrder = ['All', 'Frontend', 'Backend', 'Databases', 'Tools', 'Languages'];
    const uniqueFromProps = Array.from(new Set(skills.map((s) => s.category))).filter(Boolean);
    
    const combined = ['All'];
    defaultOrder.slice(1).forEach((cat) => {
      if (uniqueFromProps.some((c) => c.toLowerCase() === cat.toLowerCase())) {
        combined.push(cat);
      }
    });
    
    uniqueFromProps.forEach((cat) => {
      if (!combined.some((c) => c.toLowerCase() === cat.toLowerCase())) {
        combined.push(cat);
      }
    });

    return combined;
  }, [skills]);

  // Filtered skills when category or search is selected
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

  // Split skills into 2 halves for two-way marquee
  const halfLength = Math.ceil(skills.length / 2);
  const row1Skills = useMemo(() => skills.slice(0, halfLength), [skills, halfLength]);
  const row2Skills = useMemo(() => skills.slice(halfLength), [skills, halfLength]);

  // Duplicate arrays for seamless infinite CSS looping
  const marqueeRow1 = useMemo(() => [...row1Skills, ...row1Skills, ...row1Skills], [row1Skills]);
  const marqueeRow2 = useMemo(() => [...row2Skills, ...row2Skills, ...row2Skills], [row2Skills]);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#05030a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Futuristic 3D Floating Sculpture Graphic (Demo 3 Inspired) */}
          <div className="relative mb-6 group cursor-pointer">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#0c0817] border border-purple-500/30 flex items-center justify-center shadow-2xl backdrop-blur-xl">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-violet-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" viewBox="0 0 100 100" fill="none">
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

          <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">
            My Skills & Ecosystem
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            My Core Abilities
          </h2>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Battle-tested technologies and frameworks powering modern full-stack web applications.
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0c0817]/90 border border-purple-500/20 backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar shadow-inner">
            {categories.map((cat) => {
              const isActive = cat.toLowerCase() === activeCategory.toLowerCase();

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSearchQuery('');
                  }}
                  className={`relative px-4.5 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap z-10 ${
                    isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillCategoryTab"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(147,51,234,0.4)] border border-violet-400/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
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

        {/* Dynamic Display: Default Marquee (when 'All' & no search) vs Still Grid (when specific Category or Search) */}
        {activeCategory === 'All' && !searchQuery ? (
          /* Default State: Pure CSS Continuous Horizontal Infinite Marquee */
          <div className="relative w-full overflow-hidden py-4 space-y-4">
            {/* Left & Right Gradient Mask Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#05030a] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#05030a] to-transparent z-20 pointer-events-none" />

            {/* Marquee Row 1 (Left to Right) */}
            <div className="overflow-hidden flex">
              <div className="animate-marquee-left flex gap-4 pr-4">
                {marqueeRow1.map((skill, idx) => (
                  <div
                    key={`r1-${skill.name}-${idx}`}
                    className="tech-icon-frame-outer group cursor-pointer flex-shrink-0"
                  >
                    <div className="tech-icon-frame-inner px-5 py-3.5 flex items-center gap-3">
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        {getTechIcon(skill.name, skill.icon, 'w-6 h-6 sm:w-7 sm:h-7')}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white transition-colors whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Row 2 (Right to Left) */}
            <div className="overflow-hidden flex">
              <div className="animate-marquee-right flex gap-4 pr-4">
                {marqueeRow2.map((skill, idx) => (
                  <div
                    key={`r2-${skill.name}-${idx}`}
                    className="tech-icon-frame-outer group cursor-pointer flex-shrink-0"
                  >
                    <div className="tech-icon-frame-inner px-5 py-3.5 flex items-center gap-3">
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        {getTechIcon(skill.name, skill.icon, 'w-6 h-6 sm:w-7 sm:h-7')}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white transition-colors whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Category Selected State: STILL, cleanly arranged Icon Grid */
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
                    transition: { staggerChildren: 0.04 },
                  },
                  exit: { opacity: 0, transition: { duration: 0.15 } },
                }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={{
                      hidden: { opacity: 0, y: 15, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="tech-icon-frame-outer group cursor-pointer"
                  >
                    <div className="tech-icon-frame-inner p-5 flex flex-col items-center justify-center text-center gap-3">
                      <div className="p-3 rounded-2xl bg-white/[0.03] group-hover:bg-violet-500/10 border border-white/5 group-hover:border-violet-500/30 transition-all duration-300 transform group-hover:scale-110">
                        {getTechIcon(skill.name, skill.icon, 'w-8 h-8 sm:w-9 sm:h-9')}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

      </div>
    </section>
  );
}
