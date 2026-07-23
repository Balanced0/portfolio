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
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-pink-400 tracking-wider uppercase mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>// CAREER_HISTORY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Work Experience
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Leading front-end architecture, building reactive real-time tools, and engineering high-throughput microservices.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {experience.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="solid-card p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{item.company}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {item.role}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 self-start md:self-auto">
                  {item.location && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.03] text-xs text-gray-400">
                      <MapPin className="w-3 h-3 text-pink-400" />
                      {item.location}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300">
                    <Calendar className="w-3.5 h-3.5 text-violet-400" />
                    {item.startDate} — {item.endDate}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed font-sans whitespace-pre-line">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
