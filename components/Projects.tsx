// components/Projects.tsx
"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/constants";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Parallax from "./Parallax";
import { themeColor } from "@/lib/colors";

const theme = themeColor.dark;

type Project = (typeof projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glow = useMotionValue(0);

  const sRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const sRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const sGlow = useSpring(glow, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * 8);
    rotateY.set(px * 8);
    glow.set(1);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    glow.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        rotateX: sRotateX,
        rotateY: sRotateY,
        transformPerspective: 1000,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass glass-hover group relative overflow-hidden rounded-2xl"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* glow overlay */}
        <motion.div
          style={{ opacity: sGlow }}
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 to-violet-500/40 mix-blend-overlay pointer-events-none"
        />

        {/* dark gradient bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent" />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span className="glass rounded-full px-3 py-1 text-xs font-medium text-indigo-300">
            {project.tags[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-zinc-100">{project.title}</h3>

          <div className="flex gap-2">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="glass rounded-lg p-2 text-zinc-300 transition-colors hover:text-indigo-300"
                title="View on GitHub"
                aria-label={`${project.title} on GitHub`}
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
                className="glass rounded-lg p-2 text-zinc-300 transition-colors hover:text-indigo-300"
                title="Live Demo"
                aria-label={`${project.title} live demo`}
              >
                <FaExternalLinkAlt size={18} />
              </motion.a>
            )}
          </div>
        </div>

        <p className="text-zinc-400 mb-5 line-clamp-2 text-sm">
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
              className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-zinc-400"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
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
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400"
            >
              03 / Projects
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-100"
            >
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Projects
              </span>
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 mt-6 max-w-2xl mx-auto"
            >
              Here are some of my recent projects that showcase my skills and
              experience
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
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
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="glass glass-hover inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm text-zinc-100"
            >
              <FaGithub />
              <span>View More on GitHub</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* depth layer - parallax */}
        <Parallax speed={15} className="pointer-events-none absolute -bottom-20 -right-20 -z-10 w-[400px] h-[400px]">
          <div className="w-full h-full rounded-full bg-indigo-600/10 blur-3xl" />
        </Parallax>
      </div>
    </section>
  );
}