"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/constants";

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Technical</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon; // Get icon component
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-gradient-to-b from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-800">
                  {/* Skill Icon */}
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-lg flex items-center justify-center text-white mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Skill Info */}
                  <h3 className="text-xl font-bold mb-2">{skill.name}</h3>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>

                  {/* Percentage */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Mastery</span>
                    <span className="font-bold text-blue-400">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
