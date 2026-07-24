'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import ProjectModal from './ProjectModal';
import type { ProjectItem } from './ProjectsSection';

interface AllProjectsGridProps {
  projects: ProjectItem[];
}

const TECH_DOTS = [
  'bg-violet-400',
  'bg-pink-400',
  'bg-sky-400',
  'bg-orange-400',
  'bg-emerald-400',
];

export default function AllProjectsGrid({ projects }: AllProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  if (projects.length === 0) {
    return (
      <p className="text-gray-500 text-center py-24">
        No projects found in the database.
      </p>
    );
  }

  return (
    <>
      {/* Project count badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-gray-400"
      >
        <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
        {projects.length} project{projects.length !== 1 ? 's' : ''} in the database
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, idx) => {
          const isFirst = idx === 0;
          return (
            <motion.div
              key={project.slug || idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`project-card flex flex-col group ${isFirst ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              {/* Image */}
              <div className={`relative w-full overflow-hidden shrink-0 ${isFirst ? 'h-[260px] sm:h-[320px]' : 'h-[200px]'}`}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/15 to-transparent" />
                {project.featured && (
                  <div className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-200 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
                    Featured
                  </div>
                )}
                {/* Hover quick-actions */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/15 text-gray-200 hover:text-white transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/15 text-gray-200 hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5">
                <h2 className="font-display text-base font-bold text-white mb-2 leading-snug">
                  {project.name}
                </h2>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                  {project.teaser}
                </p>

                {/* Tech dots */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 5).map((tech: string, ti: number) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium text-gray-400"
                    >
                      <span className={`w-1 h-1 rounded-full ${TECH_DOTS[ti % TECH_DOTS.length]}`} />
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium text-gray-500">
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto border-t border-white/5 pt-3 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors group/btn"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
