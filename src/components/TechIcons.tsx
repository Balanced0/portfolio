'use client';

import React, { useState } from 'react';

// Official set of supported icon slugs in skillicons.dev
export const KNOWN_SKILLICONS_SLUGS = new Set([
  'html', 'css', 'js', 'ts', 'cpp', 'c', 'cs', 'python', 'java', 'react',
  'nextjs', 'vue', 'angular', 'svelte', 'nodejs', 'express', 'django', 'flask',
  'fastapi', 'tailwind', 'bootstrap', 'sass', 'less', 'mongodb', 'postgres',
  'mysql', 'sqlite', 'redis', 'git', 'github', 'gitlab', 'bitbucket', 'docker',
  'kubernetes', 'aws', 'gcp', 'azure', 'vercel', 'postman', 'figma', 'threejs',
  'framer', 'graphql', 'apollo', 'redux', 'prisma', 'supabase', 'firebase',
  'linux', 'bash', 'golang', 'rust', 'php', 'laravel', 'ruby', 'rails',
  'codeforces', 'leetcode', 'vite', 'webpack', 'babel', 'jest', 'vitest',
  'cypress', 'playwright', 'arch', 'ubuntu', 'debian', 'npm', 'pnpm', 'yarn',
  'bun', 'deno', 'electron', 'tauri', 'flutter', 'dart', 'kotlin', 'swift',
  'android', 'apple', 'solidity', 'bs', 'cf', 'clojure', 'cmake', 'codepen',
  'coffeescript', 'crystal', 'd3', 'elixir', 'elm', 'ember', 'erlang',
  'fortran', 'gatsby', 'godot', 'haskell', 'haxe', 'heroku', 'idea', 'invision',
  'julia', 'matlab', 'markdown', 'materialui', 'hugo', 'blender', 'vscode', 'visualstudio'
]);

/**
 * Auto-suggests a valid skillicons.dev slug from a skill name or icon override string.
 */
export function getSkillIconSlug(name: string, iconOverride?: string): string {
  if (iconOverride) {
    const trimmedOverride = iconOverride.toLowerCase().trim();
    if (KNOWN_SKILLICONS_SLUGS.has(trimmedOverride)) {
      return trimmedOverride;
    }
  }

  const raw = (name || '').toLowerCase().trim();
  if (!raw) return '';

  // Direct overrides mapping common names to skillicons slugs
  if (raw === 'c++' || raw === 'cpp' || raw === 'cplusplus') return 'cpp';
  if (raw === 'c' || raw === 'c language' || raw === 'c programming') return 'c';
  if (raw === 'c#' || raw === 'csharp' || raw === 'c sharp') return 'cs';
  if (raw.includes('javascript') || raw === 'js') return 'js';
  if (raw.includes('typescript') || raw === 'ts') return 'ts';
  if (raw.includes('react')) return 'react';
  if (raw.includes('next')) return 'nextjs';
  if (raw.includes('tailwind')) return 'tailwind';
  if (raw.includes('node')) return 'nodejs';
  if (raw.includes('express')) return 'express';
  if (raw.includes('mongo')) return 'mongodb';
  if (raw.includes('postgres') || raw === 'pg') return 'postgres';
  if (raw.includes('mysql')) return 'mysql';
  if (raw.includes('redis')) return 'redis';
  if (raw.includes('three') || raw.includes('webgl')) return 'threejs';
  if (raw.includes('framer') || raw.includes('motion')) return 'framer';
  if (raw.includes('graphql')) return 'graphql';
  if (raw.includes('docker')) return 'docker';
  if (raw.includes('aws') || raw.includes('amazon')) return 'aws';
  if (raw.includes('git') && !raw.includes('hub')) return 'git';
  if (raw.includes('github')) return 'github';
  if (raw.includes('postman')) return 'postman';
  if (raw.includes('vercel')) return 'vercel';
  if (raw.includes('python') || raw === 'py') return 'python';
  if (raw.includes('java') && !raw.includes('script')) return 'java';
  if (raw.includes('html')) return 'html';
  if (raw.includes('css')) return 'css';
  if (raw.includes('vue')) return 'vue';
  if (raw.includes('angular')) return 'angular';
  if (raw.includes('svelte')) return 'svelte';
  if (raw.includes('golang') || raw === 'go') return 'golang';
  if (raw.includes('rust')) return 'rust';
  if (raw.includes('php')) return 'php';
  if (raw.includes('laravel')) return 'laravel';
  if (raw.includes('figma')) return 'figma';
  if (raw.includes('prisma')) return 'prisma';
  if (raw.includes('codeforces') || raw === 'cf') return 'codeforces';
  if (raw.includes('leetcode') || raw === 'lc') return 'leetcode';

  // Normalize fallback: lowercase alphanumeric only
  const normalized = raw.replace(/[^a-z0-9]/g, '');
  if (KNOWN_SKILLICONS_SLUGS.has(normalized)) {
    return normalized;
  }

  return '';
}

interface SkillIconProps {
  name: string;
  iconSlug?: string;
  icon?: string;
  className?: string;
}

export function SkillIcon({ name, iconSlug, icon, className = 'w-6 h-6' }: SkillIconProps) {
  const [imgError, setImgError] = useState(false);

  const slug = getSkillIconSlug(name, iconSlug || icon);
  const isValid = slug && KNOWN_SKILLICONS_SLUGS.has(slug);

  // If no valid slug or image fetch fails, render a clean monogram badge in the site's accent gradient
  if (!isValid || imgError) {
    const letter = (name || '?').trim().charAt(0).toUpperCase();
    return (
      <div
        className={`${className} rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center font-bold text-white shadow-md text-[10px] sm:text-xs shrink-0 select-none`}
        title={`${name} (No icon available)`}
      >
        {letter}
      </div>
    );
  }

  const iconUrl = `https://skillicons.dev/icons?i=${slug}`;

  return (
    <img
      src={iconUrl}
      alt={name}
      loading="lazy"
      onError={() => setImgError(true)}
      className={`${className} object-contain shrink-0`}
    />
  );
}

// Backward-compatibility fallback helper
export function getTechIcon(name: string, iconName?: string, className = 'w-6 h-6') {
  return <SkillIcon name={name} iconSlug={iconName} className={className} />;
}
