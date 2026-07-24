'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      // 1. Scrubbed Spine Line Drawing
      gsap.fromTo(
        spine,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 75%',
            scrub: 0.5,
          },
        }
      );

      // 2. Alternating Cards Clip-Path & Node Highlight Animations
      entriesRef.current.forEach((entry, idx) => {
        const node = nodesRef.current[idx];
        if (!entry) return;

        const isLeft = idx % 2 === 0;

        gsap.fromTo(
          entry,
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            opacity: 0,
            x: isLeft ? -35 : 35,
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
                    node.classList.add(
                      'border-cyan-400',
                      'bg-cyan-950/80',
                      'text-cyan-300',
                      'shadow-[0_0_25px_rgba(56,189,248,0.8)]',
                      'scale-110'
                    );
                    node.classList.remove('border-white/10', 'bg-[#070510]', 'text-gray-500');
                  } else {
                    node.classList.remove(
                      'border-cyan-400',
                      'bg-cyan-950/80',
                      'text-cyan-300',
                      'shadow-[0_0_25px_rgba(56,189,248,0.8)]',
                      'scale-110'
                    );
                    node.classList.add('border-white/10', 'bg-[#070510]', 'text-gray-500');
                  }
                }
              },
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [education]);

  if (!education || education.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-28 relative bg-[#05030a] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Education & Degrees
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            Foundational computer science, algorithms, distributed systems, and software engineering.
          </p>
        </div>

        {/* Central Spine Alternating Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Animated Central SVG Spine Line (Centered on Desktop) */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 pointer-events-none">
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
                stroke="url(#eduSpineGrad)"
                strokeWidth="4"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className="drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
              />
              <defs>
                <linearGradient id="eduSpineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Alternating Timeline Entries */}
          <div className="space-y-12 sm:space-y-16">
            {education.map((item, idx) => {
              const nodeNumber = String(idx + 1).padStart(2, '0');
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Perfectly Centered Numbered Node Badge ("01", "02") */}
                  <div
                    ref={(el) => { nodesRef.current[idx] = el; }}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-full border border-white/10 bg-[#070510] text-gray-500 text-xs font-bold flex items-center justify-center transition-all duration-300 z-20 backdrop-blur-md"
                  >
                    {nodeNumber}
                  </div>

                  {/* Entry Card (Alternating Left / Right) */}
                  <div
                    ref={(el) => { entriesRef.current[idx] = el; }}
                    className={`w-full pl-12 md:pl-0 md:w-[calc(50%-2.75rem)] ${
                      isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                    }`}
                  >
                    <div className="rounded-2xl bg-[#0c0818] border border-purple-500/15 hover:border-cyan-400/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] group">
                      
                      {/* Date Range Top (Clean Accent Text, No Icon - Image 2 Inspired) */}
                      <div className="text-sky-400 text-xs sm:text-sm font-semibold tracking-wide mb-1.5">
                        {item.startDate} – {item.endDate}
                      </div>

                      {/* Role / Degree Title (Bold White Heading) */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-200 transition-colors mb-1">
                        {item.degree} in {item.field}
                      </h3>

                      {/* Institution / Company Subtitle */}
                      <div className="text-gray-400 text-sm font-medium mb-4">
                        {item.institution}
                      </div>

                      {/* Details Body */}
                      <p className="text-gray-300 text-sm leading-relaxed font-sans">
                        {item.details}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
