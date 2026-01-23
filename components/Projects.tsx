// components/Projects.tsx
"use client";
import { motion } from "framer-motion";
import { projects } from "@/lib/constants";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { themeColor } from "@/lib/colors";

const theme = themeColor.pastel;

export default function Projects() {
  return (
    <section
      id="projects"
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
              Featured Projects
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-1 bg-black mx-auto"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-neutral-600 mt-6 max-w-2xl mx-auto"
            >
              Here are some of my recent projects that showcase my skills and
              experience
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`${theme.surface} group relative overflow-hidden border-4 border-black shadow-[8px_8px_0_#000] transition-all`}
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden border-b-4 border-black">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white border-2 border-black text-xs font-bold">
                      {project.tags[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black">{project.title}</h3>

                    <div className="flex gap-2">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-white border-2 border-black shadow-[3px_3px_0_#000]"
                          title="View on GitHub"
                        >
                          <FaGithub size={18} />
                        </motion.a>
                      )}

                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`${theme.primary} border-2 border-black shadow-[3px_3px_0_#000] p-2`}
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <p className="text-neutral-600 mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: tagIndex * 0.05 }}
                        className="px-3 py-1.5 bg-white border-2 border-black text-sm font-medium"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/IkyDevs"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${theme.surface} inline-flex items-center px-8 py-3 border-4 border-black shadow-[4px_4px_0_#000] font-bold transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none`}
            >
              <FaGithub className="mr-2" />
              <span>View More on GitHub</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
