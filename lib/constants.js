// lib/constants.js
import {
  FaGithub,
  FaEnvelope,
  FaInstagram,
  FaReact,
  FaPython,
} from "react-icons/fa";

import { SiNextdotjs, SiTailwindcss, SiFramer } from "react-icons/si";

import { FaDartLang, FaFlutter } from "react-icons/fa6";

// Social Links
export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/IkyDevs",
    icon: FaGithub,
    color: "hover:bg-gray-700",
  },
  {
    name: "Email",
    url: "mailto:ahmadrofiki6146@gmail.com",
    icon: FaEnvelope,
    color: "hover:bg-red-500",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/rfky_ahmadz/",
    icon: FaInstagram,
    color: "hover:bg-pink-500",
  },
];

// Skills Data dengan gradient yang lebih menarik
export const skills = [
  {
    name: "Next.js",
    level: 70,
    color: "from-blue-500 via-cyan-500 to-blue-600",
    icon: SiNextdotjs,
  },
  {
    name: "React",
    level: 70,
    color: "from-cyan-400 to-blue-500",
    icon: FaReact,
  },
  {
    name: "Tailwind CSS",
    level: 70,
    color: "from-teal-400 to-emerald-500",
    icon: SiTailwindcss,
  },
  {
    name: "Framer Motion",
    level: 40,
    color: "from-purple-400 to-pink-500",
    icon: SiFramer,
  },
  {
    name: "Python",
    level: 80,
    color: "from-yellow-400 to-orange-500",
    icon: FaPython,
  },
  {
    name: "Dart",
    level: 70,
    color: "from-blue-400 to-indigo-500",
    icon: FaDartLang,
  },
  {
    name: "Flutter",
    level: 90,
    color: "from-blue-300 to-cyan-400",
    icon: FaFlutter,
  },
];

// Projects Data - Tambahkan warna untuk setiap project
export const projects = [
  {
    title: "Boddington Villa Landing Page",
    description: "Landing Page For Promotion Villa In Bali",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/IkyDevs",
    live: "https://boddington-villas.vercel.app",
    image: "/image/project/1.png",
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    title: "Dream Store Landing Page",
    description:
      "Landing Page For Promotion E-commerce Store for my small business",
    tags: ["Next.js", "Javascript", "Tailwind", "Framer Motion"],
    github: "https://github.com/IkyDevs",
    live: "https://dreams-store.vercel.app",
    image: "/image/project/2.png",
    accentColor: "from-purple-500 to-pink-500",
  },
  {
    title: "Old Personal Portfolio Website",
    description:
      "My old personal portfolio website to showcase my projects and skills",
    tags: ["Next.js", "Javascript", "Tailwind", "Framer Motion"],
    github: "https://github.com/IkyDevs",
    live: "https://ahmad-rofiki.vercel.app/",
    image: "/image/project/3.png",
    accentColor: "from-green-500 to-teal-500",
  },
  {
    title: "DIGITAL MEDICAL RECORD SYSTEM",
    description:
      "Digital Medical Record System for my small business to manage patient data and medical records, still in development, but you can test the system",
    tags: ["Next.js", "Javascript", "Tailwind", "Framer Motion"],
    github: "https://github.com/IkyDevs",
    live: "https://ikydevs-mdr-ui.vercel.app/",
    image: "/image/project/4.png",
    accentColor: "from-red-500 to-orange-500",
  },
  {
    title: "Cafe Landing Page",
    description:
      "Landing Page For Promotion Cafe, special theme request from my wife",
    tags: ["Next.js", "Javascript", "Tailwind", "Framer Motion"],
    github: "https://github.com/IkyDevs",
    live: "https://tiyaz-cafe.vercel.app/",
    image: "/image/project/5.png",
    accentColor: "from-red-500 to-orange-500",
  },
  {
    title: "Jokes xixixi",
    description: "i made for jokes only, just for fun,",
    tags: ["Next.js", "typescript", "Tailwind", "Framer Motion"],
    github: "https://github.com/IkyDevs",
    live: "https://ikydevs-jokes.vercel.app/",
    image: "/image/project/6.png",
    accentColor: "from-red-500 to-orange-500",
  },
  {
    title: "Dream Weather",
    description: "i made weather web",
    tags: ["Next.js", "typescript", "Tailwind", "Framer Motion"],
    github: "https://github.com/IkyDevs",
    live: "https://ikydevs-weather.vercel.app/",
    image: "/image/project/7.png",
    accentColor: "from-red-500 to-orange-500",
  },
];

// Experience Data
export const experiences = [
  {
    year: "2025 - Now",
    role: "House Keeping - Staff",
    company: "Boddington Villas",
    description: "Maintaining cleanliness and order in villa premises",
    icon: "🧹",
  },
  {
    year: "2024 - now",
    role: "Wall Finishing",
    company: "Villa Bali",
    description: "Specialized in plastering and painting villa walls",
    icon: "🎨",
  },
  {
    year: "2021 - now",
    role: "Technical Phone repair",
    company: "Dream Tech",
    description: "Specialized in repairing and troubleshooting mobile devices",
    icon: "🔧",
  },
];

// Tech Stack untuk Hero Section
export const techStack = [
  { name: "Next.js", icon: SiNextdotjs, color: "text-gray-300" },
  { name: "React", icon: FaReact, color: "text-cyan-400" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-teal-400" },
  { name: "Framer Motion", icon: SiFramer, color: "text-purple-400" },
  { name: "Python", icon: FaPython, color: "text-yellow-400" },
  { name: "Dart", icon: FaDartLang, color: "text-blue-400" },
  { name: "Flutter", icon: FaFlutter, color: "text-cyan-300" },
];

// Personal Info
export const typingTexts = [
  "developer who learns daily",
  "developer in progress",
  "junior with big ambition",
  "problem solver (eventually)",
  "student of the web",
];

// Atau tambahkan di personalInfo
export const personalInfo = {
  name: "Ahmad Rofiki",
  role: "Frontend Developer",
  bio: "I'm new in the development world, but I'm very passionate about learning and creating amazing things with code. I specialize in front-end development and love crafting beautiful, responsive websites and applications.",
  email: "ahmadrofiki6146@gmail.com",
  location: "Indonesia",
  shortBio: "Passionate frontend developer creating amazing web experiences",
};

// About Sections
export const aboutSections = [
  {
    title: "Clean Code",
    description:
      "Writing maintainable and scalable code following best practices",
    icon: "💻",
  },
  {
    title: "UI/UX Design",
    description:
      "Creating beautiful interfaces with exceptional user experience",
    icon: "🎨",
  },
  {
    title: "Performance",
    description: "Optimizing applications for speed and efficiency",
    icon: "⚡",
  },
];

// Contact Info
// lib/constants.js
export const contactInfo = {
  title: "Let's Build Together",
  description:
    "Have a project in mind? Let's discuss how we can create something amazing. Fill out the form below and I'll get back to you within 24 hours.",
  cta: "Contact Me",
  email: "ahmadrofiki6146@gmail.com",
  responseTime: "Within 24 Hours",
  availability: "Open for Projects",
};

// Navigation Items
export const navItems = [
  { id: "home", name: "Home" },
  { id: "about", name: "About" },
  { id: "skills", name: "Skills" },
  { id: "projects", name: "Projects" },
  { id: "experience", name: "Experience" },
  { id: "contact", name: "Contact" },
];
