// components/Hero.jsx
"use client";
import { motion } from "framer-motion";
import { personalInfo, techStack, socialLinks } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
          >
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6"
          >
            {personalInfo.role}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
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
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 transition-all duration-300"
                  title={social.name}
                >
                  <Icon size={22} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <a
              href="#projects"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </a>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-20"
          >
            <p className="text-gray-500 text-sm mb-6">TECH STACK</p>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700"
                  >
                    <Icon className="text-blue-400" size={18} />
                    <span className="text-sm">{tech.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
