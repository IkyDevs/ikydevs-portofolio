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
import { themeColor } from "@/lib/colors";

const theme = themeColor.pastel;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");

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
        return <FaHome size={18} />;
      case "about":
        return <FaUser size={18} />;
      case "skills":
        return <FaCode size={18} />;
      case "projects":
        return <FaFolderOpen size={18} />;
      case "experience":
        return <FaBriefcase size={18} />;
      case "contact":
        return <FaEnvelope size={18} />;
      default:
        return null;
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 96; // navbar height safe
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setIsOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className={`fixed top-0 inset-x-0 z-[999] pointer-events-auto ${
          scrolled
            ? `${theme.bg} border-b-4 border-black shadow-[0_6px_0_#000]`
            : theme.bg
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-2xl font-black ${theme.text}`}
            >
              IkyDevs
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
                    className={`flex items-center gap-2 px-4 py-2 transition-all ${
                      active
                        ? `${theme.primary} border-2 border-black shadow-[3px_3px_0_#000]`
                        : `${theme.text} hover:underline`
                    }`}
                  >
                    {getNavIcon(item.name)}
                    <span className="font-medium">{item.name}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* DESKTOP SOCIAL */}
            <div className="hidden md:flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${theme.bg} p-2 border-2 border-black shadow-[3px_3px_0_#000]`}
                  >
                    <Icon size={18} className={theme.text} />
                  </motion.a>
                );
              })}
            </div>

            {/* MOBILE TOGGLE */}
            <motion.button
              onClick={() => setIsOpen((v) => !v)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`md:hidden p-2 ${theme.bg} border-2 border-black shadow-[3px_3px_0_#000]`}
            >
              {isOpen ? (
                <FaTimes className={theme.text} />
              ) : (
                <FaBars className={theme.text} />
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
              className="fixed inset-0 bg-black/60 z-[998]"
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className={`fixed top-0 right-0 h-full w-80 ${theme.bg} border-l-4 border-black z-[999]`}
            >
              <div className="p-6 border-b-4 border-black">
                <h3 className="font-black text-lg">{personalInfo.name}</h3>
                <p className="text-sm opacity-70">{personalInfo.role}</p>
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
                      className={`w-full flex items-center gap-3 px-4 py-3 ${
                        active
                          ? `${theme.primary} border-2 border-black shadow-[3px_3px_0_#000]`
                          : `${theme.text} hover:underline`
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
