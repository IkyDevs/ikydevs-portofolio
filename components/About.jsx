// components/About.jsx - Update bagian tertentu
"use client";
import { motion } from "framer-motion";
import { aboutSections, personalInfo } from "@/lib/constants";
import { useState, useEffect } from "react";

export default function About() {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const highlights = [
    "beautiful interfaces",
    "responsive designs",
    "clean code",
    "amazing experiences",
    "modern solutions"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-20 bg-gradient-to-b from-blue-500/30 to-black/30"
            style={{
              left: `${15 + i * 10}%`,
              top: "20%",
            }}
            animate={{
              height: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="gradient-text">About Me</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Who I Am */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400">
                Who I Am?
              </h3>

              <div className="space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm new in the development world, but I'm very passionate
                  about learning and creating amazing things with code.
                </p>

                <div className="relative inline-block">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    I specialize in creating{" "}
                    <span className="relative">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-semibold">
                        {highlights[highlightIndex]}
                      </span>
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></span>
                    </span>
                  </p>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  I love crafting beautiful, responsive websites and
                  applications that provide exceptional user experiences.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-center p-4 bg-gray-800/30 rounded-xl"
                >
                  <div className="text-2xl font-bold text-blue-400">10+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-center p-4 bg-gray-800/30 rounded-xl"
                >
                  <div className="text-2xl font-bold text-cyan-400">2+</div>
                  <div className="text-sm text-gray-400">Years</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-center p-4 bg-gray-800/30 rounded-xl"
                >
                  <div className="text-2xl font-bold text-purple-400">100%</div>
                  <div className="text-sm text-gray-400">Passion</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Expertise Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {aboutSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{section.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-blue-400 group-hover:text-cyan-400 transition-colors">
                        {section.title}
                      </h4>
                      <p className="text-gray-400">{section.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
