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
  // Languages
  { name: "C++", category: "Languages", proficiency: 92, icon: "CPlusPlus", order: 1 },
  { name: "Python", category: "Languages", proficiency: 94, icon: "Python", order: 2 },
  { name: "Java", category: "Languages", proficiency: 88, icon: "Java", order: 3 },
  { name: "JavaScript", category: "Languages", proficiency: 96, icon: "JavaScript", order: 4 },
  { name: "TypeScript", category: "Languages", proficiency: 95, icon: "TypeScript", order: 5 },
  { name: "HTML5", category: "Languages", proficiency: 98, icon: "Html5", order: 6 },
  { name: "CSS3", category: "Languages", proficiency: 95, icon: "Css3", order: 7 },

  // Frontend
  { name: "React.js", category: "Frontend", proficiency: 96, icon: "React", order: 8 },
  { name: "Next.js", category: "Frontend", proficiency: 94, icon: "Nextjs", order: 9 },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 95, icon: "Tailwind", order: 10 },
  { name: "Three.js & WebGL", category: "Frontend", proficiency: 82, icon: "Threejs", order: 11 },
  { name: "Framer Motion & GSAP", category: "Frontend", proficiency: 90, icon: "FramerMotion", order: 12 },

  // Backend
  { name: "Node.js", category: "Backend", proficiency: 93, icon: "Nodejs", order: 13 },
  { name: "Express.js", category: "Backend", proficiency: 92, icon: "Express", order: 14 },
  { name: "Django", category: "Backend", proficiency: 85, icon: "Django", order: 15 },
  { name: "REST & GraphQL APIs", category: "Backend", proficiency: 94, icon: "RestApi", order: 16 },
  { name: "Microservices & WebSockets", category: "Backend", proficiency: 88, icon: "Cpu", order: 17 },

  // Databases
  { name: "MongoDB", category: "Databases", proficiency: 92, icon: "Mongodb", order: 18 },
  { name: "PostgreSQL", category: "Databases", proficiency: 90, icon: "Postgres", order: 19 },
  { name: "MySQL", category: "Databases", proficiency: 88, icon: "Mysql", order: 20 },
  { name: "Redis", category: "Databases", proficiency: 86, icon: "Redis", order: 21 },

  // Tools & Cloud
  { name: "Git", category: "Tools", proficiency: 96, icon: "Git", order: 22 },
  { name: "GitHub", category: "Tools", proficiency: 96, icon: "Github", order: 23 },
  { name: "Postman", category: "Tools", proficiency: 92, icon: "Postman", order: 24 },
  { name: "Vercel", category: "Tools", proficiency: 94, icon: "Vercel", order: 25 },
  { name: "Docker", category: "Tools", proficiency: 86, icon: "Docker", order: 26 },
  { name: "AWS Cloud", category: "Tools", proficiency: 84, icon: "Aws", order: 27 },
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
    rating: 814,
    maxRating: 872,
    rank: "newbie",
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    ratingHistory: [
      { title: "Codeforces Round 1037 (Div. 3)", rating: 361, date: "2025-07" },
      { title: "Codeforces Round 1043 (Div. 3)", rating: 591, date: "2025-07" },
      { title: "Codeforces Round 1047 (Div. 3)", rating: 720, date: "2025-08" },
      { title: "Codeforces Round 1050 (Div. 4)", rating: 787, date: "2025-08" },
      { title: "Codeforces Round 1054 (Div. 3)", rating: 812, date: "2025-08" },
      { title: "Codeforces Round 1056 (Div. 2)", rating: 858, date: "2025-09" },
      { title: "Educational Codeforces Round 183", rating: 868, date: "2025-09" },
      { title: "Codeforces Round 1057 (Div. 2)", rating: 825, date: "2025-09" },
      { title: "Codeforces Round 1080 (Div. 3)", rating: 841, date: "2026-06" },
      { title: "Codeforces Round 1086 (Div. 2)", rating: 828, date: "2026-07" },
      { title: "Educational Codeforces Round 188", rating: 872, date: "2026-07" },
      { title: "Codeforces Round 1087 (Div. 2)", rating: 779, date: "2026-07" },
      { title: "Nebius Round 2 (Round 1088)", rating: 813, date: "2026-07" },
      { title: "Codeforces Round 1089 (Div. 2)", rating: 814, date: "2026-07" },
    ],
    lastFetchedAt: new Date()
  },
  {
    platform: "leetcode",
    handle: "MISTYCAN",
    rating: 1467,
    maxRating: 1467,
    rank: "#1,665,281",
    totalSolved: 95,
    easySolved: 76,
    mediumSolved: 19,
    hardSolved: 0,
    ratingHistory: [],
    lastFetchedAt: new Date()
  }
];
