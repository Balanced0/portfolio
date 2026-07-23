'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, AlertTriangle, Lightbulb, Code2 } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export interface ProjectItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: string | any;
  name: string;
  slug: string;
  image: string;
  teaser: string;
  techStack: string[];
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  challenges?: string;
  futureImprovements?: string;
  featured?: boolean;
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0d14] border border-white/10 rounded-3xl shadow-2xl z-10 glass-card p-6 sm:p-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors focus:outline-none z-20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Project Header & Image */}
          <div className="relative w-full h-[280px] sm:h-[380px] rounded-2xl overflow-hidden mb-8 border border-white/10">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 1200px) 100vw, 800px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                {project.name}
              </h3>
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-pill-btn py-2 px-5 text-sm flex items-center gap-2"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Full Description */}
          <div className="mb-8">
            <h4 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-pink-400" />
              <span>Project Overview</span>
            </h4>
            <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line font-sans">
              {project.description}
            </p>
          </div>

          {/* Challenges & Future Improvements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            {project.challenges && (
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <h5 className="font-display font-bold text-amber-300 mb-2 flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Technical Challenges</span>
                </h5>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            )}

            {project.futureImprovements && (
              <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                <h5 className="font-display font-bold text-cyan-300 mb-2 flex items-center gap-2 text-sm">
                  <Lightbulb className="w-4 h-4 text-cyan-400" />
                  <span>Future Roadmap</span>
                </h5>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {project.futureImprovements}
                </p>
              </div>
            )}
          </div>

          {/* Dedicated Page Link Footer */}
          <div className="mt-8 pt-4 flex justify-end">
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs text-violet-400 hover:text-pink-300 font-semibold underline flex items-center gap-1"
            >
              <span>Open Dedicated Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
