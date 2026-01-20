// components/Experience.jsx
"use client";
import { motion } from "framer-motion";
import { experiences } from "@/lib/constants";

export default function Experience() {
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
              Work Experience
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"
            />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${index}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900"></div>

                  {/* Year */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full font-semibold">
                      {exp.year}
                    </span>
                  </div>

                  {/* Experience Card */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700"
                    >
                      <h3 className="text-xl font-bold mb-2 text-blue-400">
                        {exp.role}
                      </h3>
                      <p className="text-gray-300 text-lg mb-3">
                        {exp.company}
                      </p>
                      <p className="text-gray-400">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
