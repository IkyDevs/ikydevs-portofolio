// components/Skills.jsx
"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/constants";

export default function Skills() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
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
              Technical Expertise
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"
            />
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color}`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                    </div>
                    <span className="text-blue-400 font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
