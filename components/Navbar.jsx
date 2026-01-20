// components/Navbar.jsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks, navItems } from "@/lib/constants";
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
import { personalInfo } from "../lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map icons for each nav item
  const getNavIcon = (name) => {
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-lg py-3 shadow-xl shadow-black/20"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with Animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold gradient-text tracking-tight"
              >
                IkyDevs
              </motion.span>
            </motion.div>

            {/* Desktop Navigation with Hover Effects */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400"
                          : "text-gray-300 hover:text-blue-400"
                      }`}
                    >
                      <span
                        className={`transition-transform duration-300 ${
                          isActive ? "scale-110" : "scale-100"
                        }`}
                      >
                        {getNavIcon(item.name)}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </button>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.1,
                      y: -3,
                      rotate: [0, 10, -10, 0],
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`p-2 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm ${social.color} transition-all duration-300 group`}
                    title={social.name}
                  >
                    <Icon
                      size={18}
                      className="text-gray-300 group-hover:text-white transition-colors"
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6 text-gray-300" />
              ) : (
                <FaBars className="w-6 h-6 text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Progress Indicator */}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl z-50 md:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <span className="text-white font-bold">AR</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">
                        {personalInfo.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {personalInfo.role}
                      </p>
                    </div>
                  </motion.div>

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-gray-800"
                  >
                    <FaTimes className="w-5 h-5 text-gray-300" />
                  </motion.button>
                </div>

                {/* Mobile Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex justify-center space-x-4"
                >
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 rounded-full bg-gray-800/50 ${social.color} transition-all duration-300`}
                        title={social.name}
                      >
                        <Icon size={20} className="text-gray-300" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="p-6 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-3 w-full p-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400"
                          : "text-gray-300 hover:bg-gray-800/50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                            : "bg-gray-800"
                        }`}
                      >
                        {getNavIcon(item.name)}
                      </div>
                      <span className="font-medium">{item.name}</span>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Mobile CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-4 text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-xl font-medium shadow-lg shadow-blue-500/25"
                >
                  Download CV
                </motion.a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
