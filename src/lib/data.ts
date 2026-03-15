export const DEVELOPER = {
  name: "Aashi Ashfak",
  role: "Python Full Stack Developer",
  tagline: "Building Scalable Web Experiences",
  location: "Kerala, India",
  email: "aashiashfak@gmail.com",
  github: "https://github.com/aashiashfak",
  linkedin: "https://linkedin.com/in/aashiashfak",
  status: "Available for Projects",
};

export interface Tech {
  name: string;
  tag: string;
  icon: string;
  color: string;
  level: number;
}

export const TECH_STACK: Tech[] = [
  { name: "React", tag: "Frontend", icon: "⚛️", color: "#61dafb", level: 90 },
  { name: "Django", tag: "Backend", icon: "🐍", color: "#092e20", level: 92 },
  { name: "PostgreSQL", tag: "Database", icon: "🐘", color: "#336791", level: 85 },
  { name: "Tailwind", tag: "Styling", icon: "🌊", color: "#38bdf8", level: 95 },
  { name: "GSAP", tag: "Animation", icon: "🎯", color: "#88ce02", level: 80 },
  { name: "Redis", tag: "Caching", icon: "🔴", color: "#dc382d", level: 78 },
  { name: "Docker", tag: "DevOps", icon: "🐳", color: "#2496ed", level: 82 },
  { name: "Next.js", tag: "Framework", icon: "▲", color: "#ffffff", level: 88 },
  { name: "Three.js", tag: "3D/WebGL", icon: "🔮", color: "#8e44ad", level: 72 },
  { name: "Python", tag: "Language", icon: "🐍", color: "#3776ab", level: 94 },
  { name: "TypeScript", tag: "Language", icon: "📘", color: "#3178c6", level: 85 },
  { name: "Celery", tag: "Task Queue", icon: "⚡", color: "#37b24d", level: 75 },
];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  github: string;
  demo?: string;
  color: string;
  accentColor: string;
  emoji: string;
  status: string;
  year: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Evento",
    subtitle: "Event Booking Platform",
    desc: "A full-featured event booking platform with real-time seat selection, payment processing, organizer dashboards, and ticketing — built for scale with Django REST and React.",
    tags: ["Django", "React", "PostgreSQL", "Redis", "Docker", "Stripe"],
    github: "https://github.com/aashiashfak",
    color: "#6c63ff",
    accentColor: "rgba(108,99,255,0.15)",
    emoji: "🎫",
    status: "SHIPPED",
    year: "2024",
  },
  {
    id: "02",
    title: "GSAP Animation Lab",
    subtitle: "Animation Experiments",
    desc: "An experimental playground exploring advanced GSAP timelines, ScrollTrigger sequences, text masking, and Three.js scenes. The foundation of this portfolio's animation system.",
    tags: ["GSAP", "React", "Three.js", "Vite", "JavaScript"],
    github: "https://github.com/aashiashfak/gsapWelcomeTutorial",
    demo: "https://gsap-welcome-tutorial.vercel.app",
    color: "#39d0d8",
    accentColor: "rgba(57,208,216,0.15)",
    emoji: "🎬",
    status: "LIVE",
    year: "2024",
  },
  {
    id: "03",
    title: "Site Management",
    subtitle: "Construction ERP",
    desc: "A comprehensive construction site management system with resource tracking, multi-role access control, scheduling, and reporting — powered by Django REST Framework.",
    tags: ["Django REST", "React", "Tailwind", "PostgreSQL", "JWT"],
    github: "https://github.com/aashiashfak",
    color: "#f59e0b",
    accentColor: "rgba(245,158,11,0.15)",
    emoji: "🏗️",
    status: "SHIPPED",
    year: "2023",
  },
  {
    id: "04",
    title: "ERP System",
    subtitle: "Enterprise Resource Planning",
    desc: "An enterprise resource planning application with inventory, HR, accounting modules — containerized with Docker and orchestrated for production with Celery task queues.",
    tags: ["Django", "Docker", "Redis", "Celery", "PostgreSQL", "React"],
    github: "https://github.com/aashiashfak",
    color: "#22c55e",
    accentColor: "rgba(34,197,94,0.15)",
    emoji: "📊",
    status: "SHIPPED",
    year: "2023",
  },
];

export interface Experience {
  year: string;
  role: string;
  org: string;
  desc: string;
  side: string;
  color: string;
}

export const EXPERIENCE: Experience[] = [
  {
    year: "2024 — Present",
    role: "Python Full Stack Developer",
    org: "Freelance & Open Source",
    desc: "Building production-grade web platforms with Django, React, and containerized infrastructure. Focused on animated UI experiences and scalable architecture.",
    side: "left",
    color: "var(--accent)",
  },
  {
    year: "2023",
    role: "Django REST API Specialist",
    org: "Backend Specialization",
    desc: "Deepened expertise in DRF, JWT auth, Celery task queues, and Redis caching for high-performance APIs handling thousands of concurrent requests.",
    side: "right",
    color: "var(--cyan)",
  },
  {
    year: "2023",
    role: "React & Animation Engineer",
    org: "Frontend Deep Dive",
    desc: "Mastered GSAP timelines, ScrollTrigger, and Three.js for immersive web experiences. Built the GSAP animation tutorial project showcased on Vercel.",
    side: "left",
    color: "var(--accent)",
  },
  {
    year: "2022 — 2023",
    role: "CS Fundamentals & First Projects",
    org: "Learning Foundation",
    desc: "Started with Python fundamentals, built first web apps, learned SQL and database design, discovered the joy of making pixels dance with code.",
    side: "right",
    color: "var(--cyan)",
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#tech" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
