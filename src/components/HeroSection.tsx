'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, Code, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './BrandIcons';
import SplineHero from './SplineHero';
import ProfilePhotoCard from './ProfilePhotoCard';

interface HeroSectionProps {
  profile: {
    name: string;
    designation: string;
    aboutText: string;
    photoUrl: string;
    resumeUrl: string;
  };
  socialLinks: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
}

export default function HeroSection({ profile, socialLinks }: HeroSectionProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleResumeClick = () => {
    if (!profile.resumeUrl || profile.resumeUrl === '#' || profile.resumeUrl.trim() === '') {
      setToastMessage('Resume file coming soon! Request directly via contact.');
      setTimeout(() => setToastMessage(null), 4000);
    } else {
      window.open(profile.resumeUrl, '_blank');
    }
  };

  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <GithubIcon className="w-5 h-5" />;
    if (p.includes('linkedin')) return <LinkedinIcon className="w-5 h-5" />;
    if (p.includes('codeforces')) return <Code className="w-5 h-5" />;
    if (p.includes('leetcode')) return <Terminal className="w-5 h-5" />;
    if (p.includes('twitter') || p.includes('x')) return <TwitterIcon className="w-5 h-5" />;
    return <Sparkles className="w-5 h-5" />;
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Soft Spotlight Glows */}
      <div className="spotlight-glow top-10 left-1/4" />
      <div className="spotlight-glow bottom-0 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid: Info + Photo / 3D Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Intro & Call to Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md self-start">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
              <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
                Available for New Projects & Roles
              </span>
            </div>

            {/* Headline & Name */}
            <div>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
              </h1>
              <p className="mt-3 font-display text-xl sm:text-2xl font-semibold text-purple-300/90 tracking-wide">
                {profile.designation || 'Full-Stack Developer & Systems Architect'}
              </p>
            </div>

            {/* Short Intro */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Building ultra-fast Next.js applications, robust distributed backend APIs, and visually stunning digital products engineered for scalability.
            </p>

            {/* CTAs: Resume Button + Contact Link */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleResumeClick}
                className="gradient-pill-btn flex items-center gap-2 text-base font-semibold group cursor-pointer"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </button>

              <a
                href="#projects"
                className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 text-pink-400" />
              </a>
            </div>

            {/* Toast Notice if Resume is empty */}
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-900/40 border border-violet-500/40 text-violet-200 text-xs self-start"
              >
                <CheckCircle2 className="w-4 h-4 text-pink-400" />
                <span>{toastMessage}</span>
              </motion.div>
            )}

            {/* Social Links */}
            <div className="pt-4 flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Connect & Socials
              </span>
              <div className="flex items-center gap-3">
                {socialLinks && socialLinks.length > 0 ? (
                  socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-violet-400 hover:border-violet-500/40 transition-all shadow-sm"
                      title={social.platform}
                    >
                      {getIcon(social.platform)}
                    </a>
                  ))
                ) : (
                  <span className="text-xs text-gray-500">No social links added yet</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Angular Profile Photo Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <ProfilePhotoCard photoUrl={profile.photoUrl} name={profile.name} />
          </motion.div>
        </div>

        {/* 3D Spline Robot Hero Scene Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Interactive 3D Viewport
              </span>
            </div>
            <span className="text-xs text-gray-500 font-mono">Drag / Scroll to Interact</span>
          </div>
          <SplineHero />
        </motion.div>

      </div>
    </section>
  );
}
