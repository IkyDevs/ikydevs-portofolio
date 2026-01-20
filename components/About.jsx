// components/About.jsx
"use client";
import { motion } from "framer-motion";
import { aboutSections } from "@/lib/constants";

export default function About() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
              About Me
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
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm new in the development world, but I'm very passionate about
                learning and creating amazing things with code. I specialize in
                front-end development and love crafting beautiful, responsive
                websites and applications.
              </p>
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
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                >
                  <h4 className="text-xl font-bold mb-3 text-blue-400">
                    {section.title}
                  </h4>
                  <p className="text-gray-400">
                    {section.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
