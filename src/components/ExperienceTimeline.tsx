'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  location?: string;
}

interface ExperienceTimelineProps {
  experience: ExperienceItem[];
}

export default function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  // Gracefully hides if no entries exist
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl text-base">
            Professional software engineering experience building scalable applications and leading front-end architecture.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {experience.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card p-8 sm:p-10 relative overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">
                    <Building2 className="w-4 h-4" />
                    <span>{item.company}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-pink-300 transition-colors">
                    {item.role}
                  </h3>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto">
                  {item.location && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] text-xs text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      {item.location}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-gray-300">
                    <Calendar className="w-3.5 h-3.5 text-violet-400" />
                    {item.startDate} — {item.endDate}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-base leading-relaxed font-sans whitespace-pre-line">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
