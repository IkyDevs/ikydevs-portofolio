// lib/constants.js
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaCloud,
  FaLock,
  FaGlobe,
  FaMobileAlt,
  FaTerminal,
  FaCode,
  FaInstagram,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiGraphql,
} from "react-icons/si";

import { FaDartLang, FaFlutter } from "react-icons/fa6";

// Social Links dengan React Icons
export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/IkyDevs",
    icon: FaGithub,
  },
  {
    name: "Email",
    url: "mailto:ahmadrofiki6146@gmail.com",
    icon: FaEnvelope,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/rfky_ahmadz/",
    icon: FaInstagram,
  },
];

// Skills Data dengan React Icons
export const skills = [
  {
    name: "Next.js",
    level: 70,
    color: "from-blue-500 to-cyan-500",
    icon: SiNextdotjs,
  },
  {
    name: "React",
    level: 70,
    color: "from-cyan-500 to-blue-500",
    icon: FaReact,
  },
  {
    name: "Tailwind CSS",
    level: 70,
    color: "from-teal-500 to-emerald-500",
    icon: SiTailwindcss,
  },
  {
    name: "Framer Motion",
    level: 40,
    color: "from-purple-500 to-pink-500",
    icon: SiFramer,
  },
  {
    name: "Python",
    level: 80,
    color: "from-yellow-500 to-orange-500",
    icon: FaPython,
  },
  {
    name: "dart",
    level: 70,
    color: "from-yellow-500 to-orange-500",
    icon: FaDartLang,
  },
  {
    name: "Flutter",
    level: 90,
    color: "from-yellow-500 to-orange-500",
    icon: FaFlutter,
  },
];

// Projects Data
export const projects = [
  {
    title: "Boddington Villa Landing Page",
    description: "Landing Page For Promotion Villa In Bali",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/Ahmad-Rofiki/Boddington-villas-nextjs",
    live: "https://boddington-villas.vercel.app",
    image: "/image/project/1.png",
  },
  {
    title: "Dream Store Landing Page",
    description:
      "Landing Page For Promotion E-commerce Store for my small business",
    tags: ["Next.js", "Javascript", "Tailwind", "Framer Motion"],
    github: "https://github.com/Ahmad-Rofiki/dream-store",
    live: "https://dreams-store.vercel.app",
    image: "/image/project/2.png",
  },
  {
    title: "Old Personal Portfolio Website",
    description:
      "My old personal portfolio website to showcase my projects and skills",
    tags: ["Next.js", "Javascript", "Tailwind", "Framer Motion"],
    github: "https://github.com/Ahmad-Rofiki/ahmad-rofiki-portfolio",
    live: "https://ahmad-rofiki.vercel.app/",
    image: "/image/project/3.png",
  },
  {
    title: "DIGITAL MEDICAL RECORD SYSTEM",
    description:
      "Digital Medical Record System for my small business to manage patient data and medical records, still in development, but you can test the system",
    tags: ["Next.js", "Javascript", "Tailwind", "Framer Motion"],
    github: "https://github.com/IkyDevs/mdr-ui",
    live: "https://ikydevs-mdr-ui.vercel.app/",
    image: "/image/project/4.png",
  },
];

// Experience Data
export const experiences = [
  {
    year: "2025 - Now",
    role: "House Keeping - Staff",
    company: "Boddington Villas",
    description: "Maintaining cleanliness and order in villa premises",
  },
  {
    year: "2024 - now",
    role: "Wall Finishing",
    company: "Villa Bali",
    description: "Specialized in plastering and painting villa walls",
  },
  {
    year: "2021 - now",
    role: "Technical Phone repair",
    company: "Dream Tech",
    description: "Specialized in repairing and troubleshooting mobile devices",
  },
];

// Tech Stack untuk Hero Section
export const techStack = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: FaReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Python", icon: FaPython },
  { name: "Dart", icon: FaDartLang },
  { name: "Flutter", icon: FaFlutter },
];

// Personal Info
export const personalInfo = {
  name: "Ahmad Rofiki",
  role: "Frontend Developer",
  bio: "I'm new in the development world, but I'm very passionate about learning and creating amazing things with code. I specialize in front-end development and love crafting beautiful, responsive websites and applications.",
  email: "ahmadrofiki6146@gmail.com",
  location: "Indonesia",
};

// About Sections
export const aboutSections = [
  {
    title: "Clean Code",
    description:
      "Writing maintainable and scalable code following best practices",
  },
  {
    title: "UI/UX Design",
    description:
      "Creating beautiful interfaces with exceptional user experience",
  },
  {
    title: "Performance",
    description: "Optimizing applications for speed and efficiency",
  },
];

// Contact Info
export const contactInfo = {
  title: "Let's Build Together",
  description:
    "Have a project in mind? Let's discuss how we can create something amazing.",
  cta: "Contact Me",
};
