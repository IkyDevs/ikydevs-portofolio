// components/Hero.tsx
"use client";
import { motion } from "framer-motion";
import {
  personalInfo,
  techStack,
  socialLinks,
  typingTexts,
  projects,
} from "@/lib/constants";
import { useState, useEffect } from "react";
import HighlightText from "./HighlightText";
import { themeColor } from "@/lib/colors";

const theme = themeColor.pastel;

export default function Hero() {
  return (
    <section
      id="home"
      className={`min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden ${theme.bg} ${theme.text}`}
    >
      {/* Background */}
      <div className={`absolute inset-0 ${theme.bg}`}></div>

      {/* Floating Elements */}
      <div
        className={`absolute top-1/4 left-10 w-64 h-64 ${theme.secondary}/20 rounded-full blur-3xl animate-float`}
      />
      <div
        className={`absolute bottom-1/4 right-10 w-80 h-80 ${theme.primary}/20 rounded-full blur-3xl animate-float`}
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 mt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black"
              >
                <span className="block text-neutral-600">Hi, I'm</span>
                <span className="block">{personalInfo.name}</span>
              </motion.h1>

              {/* Typing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-2"
              >
                <span className="text-xl md:text-2xl text-neutral-600">
                  I'm a
                </span>
                <div className="px-4 py-2 bg-white border-2 border-black shadow-[4px_4px_0_#000]">
                  <span className="text-xl md:text-2xl font-mono font-bold">
                    <HighlightText texts={typingTexts} />
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-neutral-700 leading-relaxed max-w-xl"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${theme.primary} border-4 border-black px-8 py-3 font-bold uppercase shadow-[4px_4px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
              >
                View Projects →
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${theme.surface} border-4 border-black px-8 py-3 font-bold uppercase shadow-[4px_4px_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-6"
            >
              <p className="text-neutral-500 text-sm mb-4">Connect with me</p>
              <div className="flex space-x-4">
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
                      className={`${theme.bg} p-3 border-2 border-black shadow-[3px_3px_0_#000] transition-all`}
                    >
                      <Icon size={20} className={theme.text} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              <div
                className={`${theme.surface} border-4 border-black shadow-[8px_8px_0_#000] p-8`}
              >
                {/* Avatar */}
                <div className="flex justify-center mb-8">
                  <div className="w-40 h-40 rounded-full border-4 border-black overflow-hidden">
                    <img
                      src="/image/1.jpeg"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="text-center mb-8">
                  <h3 className="text-lg font-black mb-2">Ahmad Rofiki</h3>
                  <div
                    className={`${theme.secondary} inline-block px-4 py-2 border-2 border-black font-bold`}
                  >
                  Front ENd Developer
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div
                    className={`${theme.surface} border-2 border-black p-4 text-center`}
                  >
                    <div className="text-2xl font-black">{ projects.length}</div>
                    <div className="text-sm">Project</div>
                  </div>
                  <div
                    className={`${theme.surface} border-2 border-black p-4 text-center`}
                  >
                    <div className="text-2xl font-black">{ techStack.length}</div>
                    <div className="text-sm">Technology Learning</div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-4">
                  <h4 className="text-lg font-black text-center">Tech Stack</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {techStack.map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          className={`${theme.surface} border-2 border-black px-3 py-2 flex items-center gap-1`}
                        >
                          <Icon size={16} />
                          <span className="text-sm font-medium">
                            {tech.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-neutral-500 text-sm mb-2">
              Explore my work
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ↓
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
