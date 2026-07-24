'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

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

      // 2. Alternating Cards + Node Highlight Animations
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
                      'border-pink-400',
                      'bg-pink-950/80',
                      'text-white',
                      'shadow-[0_0_25px_rgba(236,72,153,0.85)]',
                      'scale-110'
                    );
                    node.classList.remove('border-white/10', 'bg-[#06040d]', 'text-gray-500');
                  } else {
                    node.classList.remove(
                      'border-pink-400',
                      'bg-pink-950/80',
                      'text-white',
                      'shadow-[0_0_25px_rgba(236,72,153,0.85)]',
                      'scale-110'
                    );
                    node.classList.add('border-white/10', 'bg-[#06040d]', 'text-gray-500');
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

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-semibold text-pink-400 tracking-widest uppercase mb-2">
            Career History
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Work Experience
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            Engineering leadership, real-time reactive architectures, microservice design, and high-scale web platforms.
          </p>
        </div>

        {/* Central Spine Alternating Timeline Container */}
        <div className="relative max-w-5xl mx-auto">

          {/* Animated Central SVG Spine Line */}
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
                stroke="url(#expSpineGrad)"
                strokeWidth="4"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                className="drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]"
              />
              <defs>
                <linearGradient id="expSpineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Alternating Timeline Entries */}
          <div className="space-y-12 sm:space-y-16">
            {experience.map((item, idx) => {
              const nodeNumber = String(idx + 1).padStart(2, '0');
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                >
                  {/* Centered Node Badge */}
                  <div
                    ref={(el) => { nodesRef.current[idx] = el; }}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-full border border-white/10 bg-[#06040d] text-gray-500 text-xs font-bold flex items-center justify-center transition-all duration-300 z-20 backdrop-blur-md"
                  >
                    {nodeNumber}
                  </div>

                  {/* Entry Card (Alternating Left / Right) */}
                  <div
                    ref={(el) => { entriesRef.current[idx] = el; }}
                    className={`w-full pl-12 md:pl-0 md:w-[calc(50%-2.75rem)] ${
                      isLeft ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <div className="rounded-2xl bg-[#0c0919] border border-purple-500/15 hover:border-pink-500/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.18)] group">

                      {/* Date Range — Clean accent, no icon (Image 2 style) */}
                      <div className="text-pink-400 text-xs sm:text-sm font-semibold tracking-wide mb-1.5">
                        {item.startDate} – {item.endDate}
                      </div>

                      {/* Role Title */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-pink-200 transition-colors mb-1">
                        {item.role}
                      </h3>

                      {/* Company + Location Subtitle row */}
                      <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm font-medium mb-5">
                        <span>{item.company}</span>
                        {item.location && (
                          <>
                            <span className="text-white/20">·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-pink-400" />
                              {item.location}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Description Body */}
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                        {item.description}
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
