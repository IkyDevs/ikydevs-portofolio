// components/About.tsx
"use client";
import { motion } from "framer-motion";
import { aboutSections, projects } from "@/lib/constants";
import { useState, useEffect } from "react";
import { themeColor } from "@/lib/colors";

const theme = themeColor.pastel;
const highlights = [
  "beautiful interfaces",
  "responsive designs",
  "clean code",
  "amazing experiences",
  "modern solutions",
];

export default function About() {
  const [highlightIndex, setHighlightIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${theme.bg} ${theme.text}`}
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
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              About Me
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-1 bg-black mx-auto"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl sm:text-3xl font-black mb-6">
                Who I Am?
              </h3>

              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-neutral-700">
                  I&apos;m new in the development world, but I&apos;m very passionate
                  about learning and creating amazing things with code.
                </p>

                <div className="relative inline-block">
                  <p className="text-lg leading-relaxed text-neutral-700">
                    I specialize in creating{" "}
                    <span className={`${theme.surface}`}>
                      <span className={`text-bold`}>
                        {highlights[highlightIndex]}
                      </span>
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black"></span>
                    </span>
                  </p>
                </div>

                <p className="text-lg leading-relaxed text-neutral-700">
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
                  className={`${theme.surface} border-2 border-black p-4 text-center shadow-[3px_3px_0_#000]`}
                >
                  <div className="text-2xl font-black">{projects.length}</div>
                  <div className="text-sm">Projects</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className={`${theme.surface} border-2 border-black p-4 text-center shadow-[3px_3px_0_#000]`}
                >
                  <div className="text-2xl font-black">1</div>
                  <div className="text-sm">Years</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className={`${theme.surface} border-2 border-black p-4 text-center shadow-[3px_3px_0_#000]`}
                >
                  <div className="text-2xl font-black">100%</div>
                  <div className="text-sm">Passion</div>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT */}
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
                  className={`${theme.surface} border-4 border-black p-6 shadow-[6px_6px_0_#000] transition-all`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{section.icon}</div>
                    <div>
                      <h4 className="text-xl font-black mb-2">
                        {section.title}
                      </h4>
                      <p className="text-neutral-600">{section.description}</p>
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
