'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  details: string;
}

interface EducationTimelineProps {
  education: EducationItem[];
}

export default function EducationTimeline({ education }: EducationTimelineProps) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-20 relative overflow-hidden">
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
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            Education & <span className="gradient-text">Degrees</span>
          </h2>
          <p className="mt-3 text-gray-400 max-w-xl text-base">
            Academic foundations in Computer Science, algorithms, and system engineering.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {education.map((item, idx) => (
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
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 uppercase tracking-widest mb-1">
                    <Award className="w-4 h-4" />
                    <span>{item.degree} in {item.field}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">
                    {item.institution}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-gray-300 self-start md:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-violet-400" />
                  <span>{item.startDate} — {item.endDate}</span>
                </div>
              </div>

              <p className="text-gray-300 text-base leading-relaxed font-sans">
                {item.details}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
