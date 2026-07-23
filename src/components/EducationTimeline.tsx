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
    <section id="education" className="py-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 tracking-wider uppercase mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>// ACADEMIC_BACKGROUND</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Education & Degrees
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Academic foundations in Computer Science, algorithms, and software engineering.
          </p>
        </div>

        {/* Structured Timeline */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {education.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="solid-card p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-pink-400 uppercase tracking-wider mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{item.degree} in {item.field}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {item.institution}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 self-start md:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-violet-400" />
                  <span>{item.startDate} — {item.endDate}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed font-sans">
                {item.details}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
