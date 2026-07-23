export const DEFAULT_PROFILE = {
  name: "Alvi Hasan",
  designation: "Full-Stack Engineer & Systems Architect",
  aboutText: "I am a passionate Full-Stack Engineer specializing in high-performance web systems, reactive architectures, and intuitive modern interfaces. Over the years, I have built scalable microservices, real-time applications, and rich interactive web experiences using Next.js, React, Node.js, and TypeScript. I love tackling algorithmic challenges, refining UI animations down to sub-pixel perfection, and architecting robust cloud backends.",
  hobbies: [
    "Competitive Programming",
    "Open Source Contributing",
    "3D Graphics & Shader Tinkering",
    "UI/UX Design Systems",
    "Tech Blogging & Mentoring"
  ],
  photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  resumeUrl: "#"
};

export const DEFAULT_SKILLS = [
  { name: "TypeScript / JavaScript", category: "Frontend", proficiency: 96, icon: "Code2", order: 1 },
  { name: "Next.js 16 (App Router)", category: "Frontend", proficiency: 94, icon: "Layers", order: 2 },
  { name: "React 19 / State Management", category: "Frontend", proficiency: 95, icon: "Atom", order: 3 },
  { name: "Tailwind CSS & UI Systems", category: "Frontend", proficiency: 92, icon: "Palette", order: 4 },
  { name: "Framer Motion & GSAP", category: "Frontend", proficiency: 88, icon: "Sparkles", order: 5 },
  
  { name: "Node.js / Express / NestJS", category: "Backend", proficiency: 92, icon: "Server", order: 6 },
  { name: "MongoDB / Mongoose / SQL", category: "Backend", proficiency: 90, icon: "Database", order: 7 },
  { name: "REST & GraphQL APIs", category: "Backend", proficiency: 93, icon: "Network", order: 8 },
  { name: "Microservices & WebSockets", category: "Backend", proficiency: 86, icon: "Cpu", order: 9 },
  { name: "Redis Caching & Queue Systems", category: "Backend", proficiency: 84, icon: "Zap", order: 10 },

  { name: "Docker & Containerization", category: "Tools", proficiency: 85, icon: "Box", order: 11 },
  { name: "Git / GitHub Workflows", category: "Tools", proficiency: 95, icon: "GitBranch", order: 12 },
  { name: "Vercel / Cloud Deployment", category: "Tools", proficiency: 90, icon: "Cloud", order: 13 },
  { name: "Spline 3D & WebGL", category: "Tools", proficiency: 80, icon: "Globe", order: 14 },
  { name: "Jest & Playwright Testing", category: "Tools", proficiency: 82, icon: "CheckCircle2", order: 15 },
];

export const DEFAULT_EDUCATION = [
  {
    institution: "Military Institute of Science and Technology (MIST)",
    degree: "Bachelor of Science",
    field: "Computer Science & Engineering",
    startDate: "2021",
    endDate: "2025",
    details: "Graduated with honors. Focused on Algorithms, Distributed Systems, Software Engineering, and Database Architecture. Active participant in national ACM-ICPC contests.",
    order: 1
  }
];

export const DEFAULT_EXPERIENCE = [
  {
    company: "Nexus Labs Tech",
    role: "Senior Full-Stack Developer",
    location: "Remote / San Francisco, CA",
    startDate: "2024",
    endDate: "Present",
    description: "Leading frontend architecture using Next.js App Router and GSAP animation engines. Engineered high-throughput MongoDB aggregation pipelines and real-time streaming services handling 50k+ daily users.",
    order: 1
  },
  {
    company: "Aetheria Solutions",
    role: "Full-Stack Software Engineer",
    location: "Dhaka, Bangladesh",
    startDate: "2023",
    endDate: "2024",
    description: "Developed reactive web applications, built secure JWT/OAuth authentication systems, optimized core web vitals resulting in a 40% LCP performance improvement, and authored shared UI libraries.",
    order: 2
  }
];

export const DEFAULT_PROJECTS = [
  {
    name: "Aetheria Cloud - Real-time Collaborative Engine",
    slug: "aetheria-cloud-engine",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    teaser: "A low-latency, real-time collaborative workspace canvas with WebSockets, CRDT synchronization, and custom 3D viewports.",
    techStack: ["Next.js", "TypeScript", "WebSockets", "MongoDB", "Tailwind CSS", "Framer Motion"],
    description: "Aetheria Cloud is an enterprise-grade collaborative workspace designed for high-concurrency engineering teams. Built from the ground up to support real-time state synchronization, smooth vector drawing, and interactive 3D model previews.",
    liveUrl: "https://example.com/aetheria",
    githubUrl: "https://github.com/MISTYCAN/aetheria-cloud",
    challenges: "Handling Conflict-Free Replicated Data Types (CRDTs) over WebSockets under poor network connectivity without visual stutter or state desynchronization.",
    futureImprovements: "Implementing AI-assisted canvas generation and automated WebGL shader previews.",
    featured: true,
    order: 1
  },
  {
    name: "NexusFind - Smart Property & Asset Discovery",
    slug: "nexusfind-smart-property",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
    teaser: "High-performance full-stack marketplace featuring geospatial search, instant filtering, and responsive glassmorphic UI.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "GSAP"],
    description: "NexusFind enables users to discover, compare, and reserve premium real estate listings globally. Features sub-50ms geospatial query execution, automated email workflows, and interactive floorplan renders.",
    liveUrl: "https://example.com/nexusfind",
    githubUrl: "https://github.com/MISTYCAN/nexusfind",
    challenges: "Optimizing multi-criteria database queries across millions of geo-tagged records while maintaining fluid 60fps filter transitions.",
    futureImprovements: "Adding 360-degree virtual tour integrations and predictive price analytics.",
    featured: true,
    order: 2
  },
  {
    name: "Krypton - Algorithmic Trading & Analytics Dashboard",
    slug: "krypton-analytics-dashboard",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1200",
    teaser: "Dark-themed fintech dashboard with live candlestick charting, portfolio backtesting, and automated risk notifications.",
    techStack: ["Next.js", "TypeScript", "Recharts", "MongoDB", "Tailwind CSS"],
    description: "Krypton provides quantitative traders with real-time market sentiment analysis, automated execution strategy builders, and historical backtesting suites powered by server-side caching and web workers.",
    liveUrl: "https://example.com/krypton",
    githubUrl: "https://github.com/MISTYCAN/krypton",
    challenges: "Rendering thousands of dynamic data points per second in SVG/Canvas charts without causing main thread layout thrashing.",
    futureImprovements: "Integrating Rust WebAssembly modules for client-side strategy backtesting.",
    featured: true,
    order: 3
  }
];

export const DEFAULT_SOCIALS = [
  { platform: "GitHub", url: "https://github.com/MISTYCAN", icon: "Github", order: 1 },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin", order: 2 },
  { platform: "Codeforces", url: "https://codeforces.com/profile/MISTYCAN", icon: "Code", order: 3 },
  { platform: "LeetCode", url: "https://leetcode.com/u/MISTYCAN/", icon: "Terminal", order: 4 },
  { platform: "Twitter / X", url: "https://twitter.com", icon: "Twitter", order: 5 }
];

export const DEFAULT_CONTACT = {
  email: "alvihasan.dev@gmail.com",
  phone: "+880 1700 000000",
  whatsapp: "+880 1700 000000"
};

export const DEFAULT_STATS = [
  {
    platform: "codeforces",
    handle: "MISTYCAN",
    rating: 1450,
    maxRating: 1520,
    rank: "Specialist",
    totalSolved: 480,
    easySolved: 180,
    mediumSolved: 220,
    hardSolved: 80,
    ratingHistory: [
      { title: "Codeforces Round 850", rating: 1200, date: "2023-05" },
      { title: "Codeforces Round 890", rating: 1340, date: "2023-11" },
      { title: "Educational Codeforces Round 160", rating: 1450, date: "2024-03" }
    ],
    lastFetchedAt: new Date()
  },
  {
    platform: "leetcode",
    handle: "MISTYCAN",
    rating: 1780,
    maxRating: 1810,
    rank: "Knight",
    totalSolved: 650,
    easySolved: 240,
    mediumSolved: 320,
    hardSolved: 90,
    ratingHistory: [
      { title: "Weekly Contest 360", rating: 1620, date: "2023-08" },
      { title: "Weekly Contest 385", rating: 1780, date: "2024-02" }
    ],
    lastFetchedAt: new Date()
  }
];
