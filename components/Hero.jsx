// components/Hero.jsx
"use client";
import { motion } from "framer-motion";
import { personalInfo, techStack, socialLinks } from "@/lib/constants";
import { useState, useEffect } from "react";

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Frontend Developer",
    "Next.js Enthusiast",
    "React Enthusiast",
    "Tailwind Enthusiast",
    "Problem Solver"
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      const current = texts[textIndex];

      if (!isDeleting) {
        // Typing
        if (currentText.length < current.length) {
          setCurrentText(current.substring(0, currentText.length + 1));
        } else {
          // Pause at full text
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(current.substring(0, currentText.length - 1));
        } else {
          // Move to next text
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, textIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >


          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <span className="text-2xl text-gray-400">Hi there! 👋 I'm</span>
          </motion.div>

          {/* Name with Gradient */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Animated Typing Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center">
              <div className="relative">
                {/* Background Blur */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl rounded-full"></div>

                {/* Typing Container */}
                <div className="relative px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
                  <span className="text-xl md:text-2xl font-mono">
                    <span className="text-gray-300">I'm a </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">
                      {currentText}
                    </span>
                    <span className="inline-block w-1 h-6 ml-1 bg-cyan-400 animate-pulse align-middle"></span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center space-x-6 mb-12"
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
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 ${social.color} transition-all duration-300 group`}
                  title={social.name}
                >
                  <Icon size={22} className="text-gray-300 group-hover:text-white transition-colors" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-500/25"
            >
              <span>View Projects</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-full font-semibold text-lg transition-all duration-300"
            >
              <span>Get In Touch</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <p className="text-gray-500 text-sm mb-8 tracking-widest uppercase">TECH STACK</p>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    <Icon className={`${tech.color} group-hover:scale-110 transition-transform`} size={18} />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-500 text-sm mb-2">Scroll down</span>
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
