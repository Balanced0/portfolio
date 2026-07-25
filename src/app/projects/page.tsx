import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import { fetchAllProjects } from '@/lib/getPublicData';
import AllProjectsGrid from '@/components/AllProjectsGrid';
import type { ProjectItem } from '@/components/ProjectsSection';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'All Projects | Alvi Chowdhury — Full-Stack Engineer',
  description:
    'Browse every software project built by Alvi Chowdhury — real-time engines, fintech dashboards, geospatial marketplaces, and more.',
};

export default async function AllProjectsPage() {
  const projects = (await fetchAllProjects()) as ProjectItem[];

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white mb-10 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-violet-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Homepage</span>
          </Link>

          {/* Page header */}
          <div className="mb-12">
            <div className="text-xs font-semibold text-violet-400 tracking-widest uppercase mb-3">
              Complete Portfolio
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4">
              All Projects
            </h1>
            <p className="text-gray-400 text-base max-w-xl">
              Every project I&apos;ve shipped — pulled live from the database. New work added
              via the admin panel appears here automatically.
            </p>
          </div>

          {/* Client grid with modal state */}
          <AllProjectsGrid projects={projects} />

        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
