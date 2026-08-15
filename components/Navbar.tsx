// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks, navItems, personalInfo } from "@/lib/constants";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaCode,
  FaFolderOpen,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";
import { useLenis } from "./LenisProvider";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "home":
        return <FaHome size={16} />;
      case "about":
        return <FaUser size={16} />;
      case "skills":
        return <FaCode size={16} />;
      case "projects":
        return <FaFolderOpen size={16} />;
      case "experience":
        return <FaBriefcase size={16} />;
      case "contact":
        return <FaEnvelope size={16} />;
      default:
        return null;
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    if (lenis) {
      lenis.scrollTo(element, { offset: -96 });
    } else {
      const offset = 96; // navbar height safe
      const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className={`fixed top-0 inset-x-0 z-[999] ${
          scrolled
            ? "bg-[#09090b]/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl font-bold tracking-tight text-zinc-100"
            >
              Iky<span className="text-indigo-400">Devs</span>
            </motion.div>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      active
                        ? "bg-indigo-500/15 text-indigo-300 border border-indigo-400/30"
                        : "text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    {getNavIcon(item.name)}
                    <span className="text-sm font-medium">{item.name}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* DESKTOP SOCIAL */}
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="glass glass-hover rounded-lg p-2 text-zinc-300"
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>

            {/* MOBILE TOGGLE */}
            <motion.button
              onClick={() => setIsOpen((v) => !v)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              className="glass md:hidden rounded-lg p-2 text-zinc-200"
            >
              {isOpen ? (
                <FaTimes size={18} />
              ) : (
                <FaBars size={18} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[998]"
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed top-0 right-0 h-full w-80 bg-[#0c0c10] border-l border-white/10 z-[999]"
            >
              <div className="p-6 border-b border-white/10">
                <h3 className="font-bold text-lg text-zinc-100">
                  {personalInfo.name}
                </h3>
                <p className="text-sm text-zinc-400">{personalInfo.role}</p>
              </div>

              <div className="p-6 space-y-2">
                {navItems.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        active
                          ? "bg-indigo-500/15 text-indigo-300 border border-indigo-400/30"
                          : "text-zinc-400 hover:text-zinc-100"
                      }`}
                    >
                      {getNavIcon(item.name)}
                      <span>{item.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;