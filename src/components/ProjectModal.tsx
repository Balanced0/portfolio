'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, AlertTriangle, Lightbulb, Code2, GitBranch } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import type { ProjectItem } from './ProjectsSection';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const TECH_DOTS = [
  'bg-violet-400',
  'bg-pink-400',
  'bg-sky-400',
  'bg-orange-400',
  'bg-emerald-400',
];

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Lock body scroll & listen for Escape */
  useEffect(() => {
    if (!project) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    // Reset scroll position every time a new project opens
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        /* ── Portal-like fixed layer ── */
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">

          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal shell — outer wrapper centers, inner scrolls */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.94, y: 16, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="relative w-full max-w-3xl z-10 flex flex-col"
            style={{ maxHeight: '85vh' }}
          >
            {/* ── Gradient border wrapper ── */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-violet-500/50 via-pink-500/30 to-violet-500/50 shadow-2xl shadow-violet-900/40">
              <div className="rounded-[calc(1rem-1px)] bg-[#0d0d14] flex flex-col overflow-hidden" style={{ maxHeight: 'calc(85vh - 2px)' }}>

                {/* ── Sticky header (never scrolls away) ── */}
                <div className="shrink-0 flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-white/8 bg-[#0d0d14]">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-1">
                      Project Detail
                    </p>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-tight truncate">
                      {project.name}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="shrink-0 mt-0.5 p-2 rounded-xl bg-white/8 hover:bg-white/15 text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* ── Scrollable body ── */}
                <div
                  ref={scrollRef}
                  className="overflow-y-auto overscroll-contain flex-1"
                  style={{ scrollbarGutter: 'stable' }}
                >
                  {/* Hero image */}
                  <div className="relative w-full h-[200px] sm:h-[260px] shrink-0">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover object-center"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/10 to-transparent" />
                    {/* Live + GitHub overlaid on image */}
                    <div className="absolute bottom-5 right-5 flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gradient-pill-btn py-2 px-5 text-xs flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full bg-black/60 hover:bg-white/15 text-white border border-white/15 transition-colors backdrop-blur-sm"
                          title="GitHub Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* ── Content sections ── */}
                  <div className="px-6 pb-8 pt-5 space-y-6">

                    {/* 1. Tech Stack */}
                    <div>
                      <h3 className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                        <GitBranch className="w-3.5 h-3.5" />
                        Technology Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, ti) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[11px] font-semibold text-gray-300"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${TECH_DOTS[ti % TECH_DOTS.length]}`} />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 2. Description */}
                    <div>
                      <h3 className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                        <Code2 className="w-3.5 h-3.5" />
                        Project Overview
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                        {project.description}
                      </p>
                    </div>

                    {/* 3 & 4: Live link + GitHub — also in body for easy access when scrolled past image */}
                    {(project.liveUrl || project.githubUrl) && (
                      <div className="flex flex-wrap gap-3 pt-1">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:text-white hover:bg-violet-500/20 text-xs font-semibold transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Project
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.10] text-gray-300 hover:text-white hover:bg-white/[0.10] text-xs font-semibold transition-colors"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            GitHub (Client Repo)
                          </a>
                        )}
                      </div>
                    )}

                    {/* 5. Challenges */}
                    {project.challenges && (
                      <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-5">
                        <h3 className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Challenges Faced
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                          {project.challenges}
                        </p>
                      </div>
                    )}

                    {/* 6. Future Improvements */}
                    {project.futureImprovements && (
                      <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-5">
                        <h3 className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">
                          <Lightbulb className="w-3.5 h-3.5" />
                          Future Improvements
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                          {project.futureImprovements}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
                {/* End scrollable body */}

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
