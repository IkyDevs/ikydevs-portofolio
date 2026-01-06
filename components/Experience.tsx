"use client";

import { motion } from 'framer-motion';
import { experiences } from '@/lib/constants';

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Work</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}
              style={{
                marginLeft: index % 2 === 0 ? '0' : '50%',
                marginRight: index % 2 === 0 ? '50%' : '0'
              }}
            >
              {/* Timeline Dot */}
              <div className="absolute top-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform -translate-y-1/2"
                style={{
                  left: index % 2 === 0 ? 'calc(100% - 20px)' : '5px'
                }}
              />

              {/* Content */}
              <div className={`bg-gradient-to-b from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-800 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`} style={{ maxWidth: '400px' }}>
                <div className="text-sm text-blue-400 font-semibold mb-2">{exp.year}</div>
                <h3 className="text-xl font-bold mb-2">{exp.role}</h3>
                <div className="text-gray-300 mb-3">{exp.company}</div>
                <p className="text-gray-400">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
