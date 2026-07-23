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
  Terminal,
} from 'lucide-react';

interface SkillItem {
  name: string;
  category: string;
  proficiency?: number;
  icon?: string;
}

interface SkillsSectionProps {
  skills: SkillItem[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = Array.from(new Set(skills.map((s) => s.category))).filter(Boolean);
  const defaultCategory = categories.includes('Frontend') ? 'Frontend' : categories[0] || 'Frontend';

  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);

  const filteredSkills = skills.filter(
    (s) => s.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const getSkillIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-4 h-4 text-violet-400" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-pink-400" />;
      case 'Atom':
        return <Atom className="w-4 h-4 text-cyan-400" />;
      case 'Palette':
        return <Palette className="w-4 h-4 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Server':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-teal-400" />;
      case 'Network':
        return <Network className="w-4 h-4 text-blue-400" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'Box':
        return <Box className="w-4 h-4 text-sky-400" />;
      case 'GitBranch':
        return <GitBranch className="w-4 h-4 text-orange-400" />;
      case 'Cloud':
        return <Cloud className="w-4 h-4 text-blue-400" />;
      case 'Globe':
        return <Globe className="w-4 h-4 text-pink-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-violet-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Left-Aligned Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 tracking-wider uppercase mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>// TECH_STACK</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Core Skills & Ecosystem
            </h2>
          </div>
          
          <p className="text-gray-400 text-sm max-w-md">
            Production experience across modern frontend engines, backend APIs, distributed data stores, and cloud infrastructure.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const isActive = cat.toLowerCase() === activeCategory.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-violet-600/30 text-violet-200 border border-violet-500/50 shadow-sm'
                    : 'bg-white/[0.02] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Weighted Skill Tag Cloud - NO FAKE PERCENTAGE BARS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap gap-3"
          >
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="skill-tag group"
              >
                <div className="p-1 rounded-lg bg-white/5 group-hover:bg-violet-500/20 transition-colors">
                  {getSkillIcon(skill.icon)}
                </div>
                <span>{skill.name}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
