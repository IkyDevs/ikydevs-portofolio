// components/About.tsx
"use client";
import { motion } from "framer-motion";
import { aboutSections, projects } from "@/lib/constants";
import { useState, useEffect } from "react";
import CountUp from "./CountUp";
import Parallax from "./Parallax";
import { themeColor } from "@/lib/colors";

const theme = themeColor.dark;

export default function About() {
  const [highlightIndex, setHighlightIndex] = useState<number>(0);
  const highlights = [
    "beautiful interfaces",
    "responsive designs",
    "clean code",
    "amazing experiences",
    "modern solutions",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <section
      id="about"
      className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${theme.bg}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-100"
            >
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Me
              </span>
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <Parallax speed={30}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-zinc-100">
                  Who I Am?
                </h3>

                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-zinc-400">
                    I&apos;m new in the development world, but I&apos;m very
                    passionate about learning and creating amazing things with
                    code.
                  </p>

                  <div className="relative inline-block">
                    <p className="text-lg leading-relaxed text-zinc-400">
                      I specialize in creating{" "}
                      <span className="text-indigo-300 font-medium glow-text">
                        {highlights[highlightIndex]}
                      </span>
                    </p>
                  </div>

                  <p className="text-lg leading-relaxed text-zinc-400">
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
                    className="glass glass-hover rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-indigo-300">
                      <CountUp to={projects.length} />
                    </div>
                    <div className="text-sm text-zinc-500">Projects</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="glass glass-hover rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-indigo-300">1</div>
                    <div className="text-sm text-zinc-500">Year Learning</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="glass glass-hover rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-indigo-300">
                      100%
                    </div>
                    <div className="text-sm text-zinc-500">Passion</div>
                  </motion.div>
                </div>
              </motion.div>
            </Parallax>

            {/* RIGHT */}
            <Parallax speed={-30}>
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
                    whileHover={{ x: 6 }}
                    className="glass glass-hover rounded-xl p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{section.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 text-zinc-100">
                          {section.title}
                        </h4>
                        <p className="text-zinc-400">{section.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Parallax>
          </div>
        </motion.div>
      </div>
    </section>
  );
}