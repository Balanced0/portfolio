'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Layers,
  Atom,
  Palette,
  Sparkles,
  Server,
  Database,
  Network,
  Cpu,
  Zap,
  Box,
  GitBranch,
  Cloud,
  Globe,
  CheckCircle2,
  Wrench,
} from 'lucide-react';

interface SkillItem {
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}

interface SkillsSectionProps {
  skills: SkillItem[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  // Extract unique categories dynamically
  const categories = Array.from(new Set(skills.map((s) => s.category))).filter(Boolean);
  const defaultCategory = categories.includes('Frontend') ? 'Frontend' : categories[0] || 'Frontend';

  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);

  const filteredSkills = skills.filter(
    (s) => s.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const getSkillIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-violet-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-pink-400" />;
      case 'Atom':
        return <Atom className="w-5 h-5 text-cyan-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-teal-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-blue-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Box':
        return <Box className="w-5 h-5 text-sky-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-orange-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-blue-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-pink-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-violet-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technical Proficiency</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl text-base">
            Core tech stack and tools mastered across frontend engineering, backend services, and cloud architecture.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {categories.map((cat) => {
            const isActive = cat.toLowerCase() === activeCategory.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-white shadow-[0_0_20px_rgba(217,70,239,0.3)]'
                    : 'text-gray-400 hover:text-gray-200 bg-white/[0.03] border border-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="glass-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                      {getSkillIcon(skill.icon)}
                    </div>
                    <span className="font-display font-semibold text-white text-base">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-pink-400">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Animated Skill Bar */}
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden p-0.5 border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.05 }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
