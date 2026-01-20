// components/Hero.jsx
"use client";
import { motion } from "framer-motion";
import { personalInfo, techStack, socialLinks, typingTexts } from "@/lib/constants";
import { useState, useEffect } from "react";
import HighlightText from "./HighlightText";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-1/4 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            ></motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              >
                <span className="block text-gray-300">Hi, I'm</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient">
                  {personalInfo.name}
                </span>
              </motion.h1>

              {/* Animated Typing Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-2"
              >
                <span className="text-xl md:text-2xl text-gray-400">I'm a</span>
                <div className="relative">
                  <div className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
                    <span className="text-xl md:text-2xl font-mono font-bold">
                      <HighlightText texts={typingTexts} />
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-300 leading-relaxed max-w-xl"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
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
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                <span>View Projects</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                <span>Contact Me</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-6"
            >
              <p className="text-gray-500 text-sm mb-4">Connect with me</p>
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
                      className={`p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 ${social.color} transition-all duration-300 group`}
                      title={social.name}
                    >
                      <Icon
                        size={20}
                        className="text-gray-300 group-hover:text-white transition-colors"
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Visual Container */}
            <div className="relative mx-auto max-w-md">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl animate-pulse"></div>

              {/* Profile Card */}
              <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
                {/* Avatar */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-lg"></div>
                    <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-700 flex items-center justify-center overflow-hidden">
                      <div >
                        <img src="public/image/1.jpeg" alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      {/* Animated Rings */}
                      <div
                        className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-spin-slow"
                        style={{ animationDuration: "10s" }}
                      ></div>
                      <div
                        className="absolute inset-4 border-2 border-cyan-500/30 rounded-full animate-spin"
                        style={{
                          animationDuration: "8s",
                          animationDirection: "reverse",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Current Focus */}
                <div className="text-center mb-8">
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    Ahmad Rofiki
                  </h3>
                  <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full">
                    <span className="text-blue-400 font-medium">
                      Next.js 14 + TypeScript
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-400">7+</div>
                    <div className="text-sm text-gray-400">Technologies</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                    <div className="text-2xl font-bold text-cyan-400">4+</div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-300 text-center">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {techStack.slice(0, 6).map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          className="flex items-center space-x-1 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50"
                        >
                          <Icon className="text-blue-400" size={16} />
                          <span className="text-sm text-gray-300">
                            {tech.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-6 -right-6 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg"
              >
                <span className="text-white font-bold">🚀</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                className="absolute -bottom-6 -left-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg"
              >
                <span className="text-white font-bold">✨</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-2">Explore my work</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
