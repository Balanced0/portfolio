'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Code, CheckCircle2, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, CodeforcesIcon, LeetcodeIcon } from './BrandIcons';
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
    if (p.includes('github')) return <GithubIcon className="w-4 h-4" />;
    if (p.includes('linkedin')) return <LinkedinIcon className="w-4 h-4" />;
    if (p.includes('codeforces')) return <CodeforcesIcon className="w-4 h-4" />;
    if (p.includes('leetcode')) return <LeetcodeIcon className="w-4 h-4" />;
    if (p.includes('twitter') || p.includes('x')) return <TwitterIcon className="w-4 h-4" />;
    return <Code className="w-4 h-4" />;
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Developer Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Availability Status */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for engineering roles</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
              </h1>
              <p className="mt-3 font-display text-xl sm:text-2xl font-semibold text-purple-300/90 tracking-wide">
                {profile.designation || 'Full-Stack Developer & Systems Architect'}
              </p>
            </div>

            {/* Bio Paragraph */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Building ultra-fast Next.js applications, robust distributed backend APIs, and visually stunning digital products engineered for scalability.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleResumeClick}
                className="gradient-pill-btn text-sm font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              <a
                href="#projects"
                className="ghost-btn flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 text-pink-400" />
              </a>
            </div>

            {/* Toast notice */}
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
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
              <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                Connect
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks && socialLinks.length > 0 ? (
                  socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/[0.03] hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
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

          {/* Right Column: Angular Profile Photo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <ProfilePhotoCard photoUrl={profile.photoUrl} name={profile.name} />
          </motion.div>
        </div>

        {/* 3D Spline Robot Hero Scene Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Interactive 3D Viewport
              </span>
            </div>
          </div>
          <SplineHero />
        </motion.div>

      </div>
    </section>
  );
}
