'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProfilePhotoCardProps {
  photoUrl: string;
  name: string;
}

export default function ProfilePhotoCard({ photoUrl, name }: ProfilePhotoCardProps) {
  const defaultPhoto =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800';
  const src = photoUrl && photoUrl.trim() !== '' ? photoUrl : defaultPhoto;

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative w-full max-w-[320px] aspect-[4/5] mx-auto group cursor-pointer"
    >
      {/* Soft spotlight magenta glow behind card */}
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 via-pink-600/30 to-orange-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Angular Pedestal Frame Wrapper */}
      <div className="profile-angular-wrapper w-full h-full shadow-2xl">
        <div className="profile-angular-inner relative w-full h-full">
          <Image
            src={src}
            alt={name || 'Profile photo'}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            priority
            className="object-cover object-center filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700"
          />

          {/* Glass edge hover overlay & subtle badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-transparent to-white/10 opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
              Full-Stack Developer
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
