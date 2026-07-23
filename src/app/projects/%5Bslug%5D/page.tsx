import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, AlertTriangle, Lightbulb, Code2 } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import { connectToDatabase } from '@/lib/db';
import { Project } from '@/models/Project';
import { DEFAULT_PROJECTS } from '@/lib/seedData';

export async function generateStaticParams() {
  return DEFAULT_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  return {
    title: slug ? `${slug.replace(/-/g, ' ')} | Project Detail` : 'Project Detail',
  };
}

async function getProjectBySlug(slug: string) {
  if (!slug) return null;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const proj = await Project.findOne({ slug }).lean();
      if (proj) return JSON.parse(JSON.stringify(proj));
    }
  } catch (err) {
    console.warn('DB query error on project slug:', err);
  }
  const defaultProj = DEFAULT_PROJECTS.find((p) => p.slug === slug);
  return defaultProj || null;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-violet-400" />
            <span>Back to All Projects</span>
          </Link>

          {/* Hero Banner Image */}
          <div className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden glass-card mb-10 border border-white/10 shadow-2xl">
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-black/40 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack?.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-pink-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
                  {project.name}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-pill-btn py-3 px-6 text-sm flex items-center gap-2"
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
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="glass-card p-8 sm:p-12 flex flex-col gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-violet-400" />
                <span>Description & Architecture</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line font-sans">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              {project.challenges && (
                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <h3 className="font-display font-bold text-amber-300 mb-3 flex items-center gap-2 text-base">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <span>Technical Challenges Overcome</span>
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}

              {project.futureImprovements && (
                <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                  <h3 className="font-display font-bold text-cyan-300 mb-3 flex items-center gap-2 text-base">
                    <Lightbulb className="w-5 h-5 text-cyan-400" />
                    <span>Future Enhancements</span>
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.futureImprovements}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
