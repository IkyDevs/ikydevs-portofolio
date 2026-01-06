"use client";

import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, ExternalLink, Github, Linkedin, Twitter, Mail, Star } from 'lucide-react';
import { socialLinks } from '@/lib/constants';
import Image from 'next/image';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20"
    >
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Front End Developer
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block">Hi, Im</span>
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Ahmad Rofiki
                </span>
                <motion.span
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-2 left-0 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-50"
                />
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              I create immersive digital experiences with cutting-edge
              technologies. Specializing in{" "}
              <span className="text-blue-400 font-semibold">React</span>,{" "}
              <span className="text-cyan-400 font-semibold">Next.js</span>, and{" "}
              <span className="text-purple-400 font-semibold">
                modern web animations
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold text-lg overflow-hidden"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>View Projects</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-700 rounded-lg font-semibold text-lg hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Contact Me</span>
                  <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </span>
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {[
                { value: "4", label: "Projects" },
                { value: "< 1", label: "Years Exp" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center p-4 bg-gray-900/50 rounded-xl border border-gray-800"
                >
                  <div className="text-2xl font-bold text-blue-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              animate={{ rotateY: [0, 5, 0, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="relative w-full max-w-md mx-auto"
            >
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 shadow-2xl">
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30"
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Profile Image - Option 1: Using Next.js Image */}
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="relative w-full h-full"
                    >
                      {/* Profile Image Container */}
                      <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
                        {/* Actual Image */}
                        <Image
                          src="/image/1.jpeg" // Path ke image di public folder
                          alt="IkyDevs Profile"
                          width={128}
                          height={128}
                          className="w-full h-full object-cover rounded-full"
                          priority // Load image penting pertama
                        />
                      </div>

                      {/* Animated Border */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 border-2 border-blue-500/30 rounded-full"
                      />
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Ahmad Rofiki</h3>
                    <p className="text-gray-400">Front End Developer</p>
                  </div>

                  {/* Tech Stack */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {["React", "NextJS"].map((tech) => (
                      <div
                        key={tech}
                        className="px-3 py-2 bg-gray-800/50 rounded-lg text-center text-sm"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl mb-6">
                    <div>
                      <div className="text-sm text-gray-400">
                        Current Status
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-400 font-medium">
                          Available for work
                        </span>
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/50 border border-gray-700 transition-all"
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements Around Card */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  animate={{
                    x: Math.sin(Date.now() * 0.001 + i) * 50,
                    y: Math.cos(Date.now() * 0.001 + i) * 50,
                    rotate: 360,
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    top: `${30 + i * 10}%`,
                    left: `${20 + i * 10}%`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
