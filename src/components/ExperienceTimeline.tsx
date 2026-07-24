'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const spineLineRef = useRef<SVGLineElement>(null);
  const entriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const spine = spineLineRef.current;
    if (!section || !spine) return;

    const ctx = gsap.context(() => {
      // Animated Spine Line Drawing via Scroll Scrubbing
      gsap.fromTo(
        spine,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      );

      // Entry Cards Clip-Path Reveal & Numbered Node Highlighting
      entriesRef.current.forEach((entry, idx) => {
        const node = nodesRef.current[idx];
        if (!entry) return;

        gsap.fromTo(
          entry,
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            opacity: 0,
            x: 25,
          },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: entry,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5,
              onToggle: (self) => {
                if (node) {
                  if (self.isActive) {
                    node.classList.add('border-pink-500', 'text-white', 'bg-pink-600/30', 'shadow-[0_0_20px_rgba(236,72,153,0.8)]', 'scale-110');
                    node.classList.remove('border-white/10', 'text-gray-500', 'bg-[#06040d]');
                  } else {
                    node.classList.remove('border-pink-500', 'text-white', 'bg-pink-600/30', 'shadow-[0_0_20px_rgba(236,72,153,0.8)]', 'scale-110');
                    node.classList.add('border-white/10', 'text-gray-500', 'bg-[#06040d]');
                  }
                }
              },
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [experience]);

  if (!experience || experience.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-28 relative bg-[#06040d] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Composition: Integrated Section Title Left, Timeline Right */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column: Clean Typographic Integrated Header */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-28 h-fit space-y-4">
            <div className="text-xs font-semibold text-pink-400 tracking-widest uppercase">
              Career History
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Work Experience
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
              A chronological trajectory of engineering leadership, real-time reactive architectures, microservice design, and high-scale web platforms.
            </p>
          </div>

          {/* Right Column: Scroll-Synced Timeline with Gradient Spine */}
          <div className="w-full lg:w-7/12 relative pl-8 sm:pl-12">
            
            {/* Animated SVG Spine Line */}
            <div className="absolute left-3.5 sm:left-5 top-3 bottom-3 w-0.5">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2"
                />
                <line
                  ref={spineLineRef}
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="url(#experienceSpineGrad)"
                  strokeWidth="3"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                />
                <defs>
                  <linearGradient id="experienceSpineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#EC4899" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Timeline Entries */}
            <div className="space-y-12 sm:space-y-16">
              {experience.map((item, idx) => {
                const nodeNumber = String(idx + 1).padStart(2, '0');

                return (
                  <div key={idx} className="relative pl-6 sm:pl-8">
                    
                    {/* Numbered Circle Node Badge ("01", "02") */}
                    <div
                      ref={(el) => { nodesRef.current[idx] = el; }}
                      className="absolute -left-[27px] sm:-left-[31px] top-3.5 w-8 h-8 rounded-full border border-white/10 bg-[#06040d] text-gray-500 text-xs font-bold flex items-center justify-center transition-all duration-300 z-10"
                    >
                      {nodeNumber}
                    </div>

                    {/* Card Container with Clip-Path Reveal */}
                    <div
                      ref={(el) => { entriesRef.current[idx] = el; }}
                      className="rounded-2xl bg-[#0c0919] border border-purple-500/15 hover:border-pink-500/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
                        <div>
                          <div className="text-xs font-semibold text-pink-300 uppercase tracking-wider mb-1">
                            {item.company}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-pink-200 transition-colors">
                            {item.role}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
                          {item.location && (
                            <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-pink-400" />
                              {item.location}
                            </span>
                          )}
                          <span className="text-xs text-pink-300 font-medium flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-pink-400" />
                            {item.startDate} — {item.endDate}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                        {item.description}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
