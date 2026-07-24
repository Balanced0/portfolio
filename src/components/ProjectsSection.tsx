'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, LayoutGrid } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import ProjectModal from './ProjectModal';

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
  order?: number;
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

const TECH_DOTS = [
  'bg-violet-400',
  'bg-pink-400',
  'bg-sky-400',
  'bg-orange-400',
  'bg-emerald-400',
];

/* ─── Single project card ─────────────────────────────────────────────── */
function ProjectCard({
  project,
  areaClass,
  idx,
  onOpen,
}: {
  project: ProjectItem;
  areaClass: string;
  idx: number;
  onOpen: (p: ProjectItem) => void;
}) {
  const isFeatured = areaClass === 'bento-featured';
  const maxTech = isFeatured ? 6 : 4;
  const imgH = isFeatured ? 'h-[340px] sm:h-[420px]' : 'h-[180px] sm:h-[200px]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`project-card flex flex-col group ${areaClass}`}
    >
      {/* Image */}
      <div className={`relative w-full overflow-hidden shrink-0 ${imgH}`}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 45vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/20 to-transparent" />

        {isFeatured && (
          <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-200 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
            Featured
          </div>
        )}

        {/* Quick-action icons overlaid on image */}
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
              title="GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className={`font-display font-bold text-white leading-snug mb-2 ${isFeatured ? 'text-xl' : 'text-base'}`}>
          {project.name}
        </h3>
        <p className={`text-gray-400 leading-relaxed mb-4 ${isFeatured ? 'text-sm line-clamp-3' : 'text-xs line-clamp-2'}`}>
          {project.teaser}
        </p>

        {/* Tech stack — monochrome dot + label */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, maxTech).map((tech, ti) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium text-gray-400"
            >
              <span className={`w-1 h-1 rounded-full ${TECH_DOTS[ti % TECH_DOTS.length]}`} />
              {tech}
            </span>
          ))}
          {project.techStack.length > maxTech && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium text-gray-500">
              +{project.techStack.length - maxTech}
            </span>
          )}
        </div>

        {/* Action row */}
        <div className="mt-auto border-t border-white/5 pt-3 flex items-center justify-between">
          <button
            onClick={() => onOpen(project)}
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
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="GitHub Repository"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────── */
export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Take up to first 3 projects for the homepage preview
  const preview = projects.slice(0, 3);
  const [p0, p1, p2] = preview;

  const AREA_CLASSES = ['bento-featured', 'bento-secondary-1', 'bento-secondary-2'];

  return (
    <section id="projects" className="py-24 relative overflow-hidden border-t border-white/5">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-600/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-2">
              Featured Portfolio
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Selected Software Projects
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gray-400 text-sm max-w-md"
          >
            Engineered for real-time performance, vector graphics, geospatial queries, and quantitative analytics.
          </motion.p>
        </div>

        {/* Intentional Bento Grid */}
        {preview.length > 0 && (
          <div className="bento-grid mb-10">
            {p0 && <ProjectCard project={p0} areaClass="bento-featured"    idx={0} onOpen={setSelectedProject} />}
            {p1 && <ProjectCard project={p1} areaClass="bento-secondary-1" idx={1} onOpen={setSelectedProject} />}
            {p2 && <ProjectCard project={p2} areaClass="bento-secondary-2" idx={2} onOpen={setSelectedProject} />}
          </div>
        )}

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex justify-center pt-2"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full ghost-btn font-semibold text-sm group"
          >
            <LayoutGrid className="w-4 h-4 text-violet-400" />
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-pink-400" />
          </Link>
        </motion.div>

      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
