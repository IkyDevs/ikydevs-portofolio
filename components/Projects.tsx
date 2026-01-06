"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/lib/constants';
import Image from 'next/image';

const Projects = () => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured
            </span>{' '}
            <span className="text-white">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800 overflow-hidden h-full">
                {/* Project Image */}
                <div className={ `${project.image} w-full h-48 rounded-xl mb-6 relative overflow-hidden` }>
                  <Image src={project.image} alt={project.title} fill />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Floating Elements */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full"
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0]
                      }}
                      transition={{
                        duration: 2 + i,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`
                      }}
                    />
                  ))}
                </div>

                {/* Project Info */}
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800/50 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 bg-gray-800/50 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>Code</span>
                  </motion.a>

                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                </div>

                {/* Hover Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
