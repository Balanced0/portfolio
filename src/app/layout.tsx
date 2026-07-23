import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Alvi Hasan | Full-Stack Engineer & Systems Architect',
  description:
    'Production portfolio of Alvi Hasan — Full-Stack Engineer specializing in high-performance Web applications, Next.js 16, Distributed Systems, and Competitive Programming.',
  keywords: [
    'Full-Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Portfolio',
    'Codeforces',
    'LeetCode',
    'Software Engineer',
  ],
  authors: [{ name: 'Alvi Hasan' }],
  openGraph: {
    title: 'Alvi Hasan | Full-Stack Engineer',
    description:
      'Explore projects, interactive 3D demos, competitive programming stats, and engineering experience.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} dark scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#09090e] text-[#f3f4f6] selection:bg-purple-500/30 selection:text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
