// components/Experience.tsx
"use client";
import { motion, Variants } from "framer-motion";
import { experiences } from "@/lib/constants";
import Parallax from "./Parallax";
import { themeColor } from "@/lib/colors";

const theme = themeColor.dark;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: (dir: number) => ({
    opacity: 0,
    x: dir * 60,
  }),
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
    },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className={`py-24 px-4 sm:px-6 lg:px-8 relative ${theme.bg}`}
    >
      {/* floating glow lines */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-24 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"
            style={{ left: `${15 + i * 10}%`, top: "20%" }}
            animate={{ height: ["0%", "100%", "0%"] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-100">
            Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Experience
            </span>
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* line: left on mobile, center on md+ */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 to-violet-500 md:-translate-x-1/2 opacity-40" />

          <div className="space-y-14">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={`${exp.company}-${index}`}
                  custom={isLeft ? -1 : 1}
                  variants={item}
                  className="relative pl-14 md:pl-0 md:flex md:items-center md:justify-between"
                >
                  {/* dot */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-1 md:top-1/2 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_16px_rgba(99,102,241,0.9)] z-10" />

                  {/* year */}
                  <div
                    className={`mb-2 md:mb-0 ${
                      isLeft
                        ? "md:order-1 md:w-1/2 md:pr-12 md:text-right"
                        : "md:order-2 md:w-1/2 md:pl-12"
                    }`}
                  >
                    <span className={`${theme.accentSoft} inline-block rounded-full px-4 py-1.5 text-sm font-medium`}>
                      {exp.year}
                    </span>
                  </div>

                  {/* card */}
                  <div
                    className={`${
                      isLeft
                        ? "md:order-2 md:w-1/2 md:pl-12"
                        : "md:order-1 md:w-1/2 md:pr-12"
                    }`}
                  >
                    <Parallax speed={isLeft ? 20 : -20}>
                      <motion.div
                        whileHover={{ y: -6, boxShadow: "0 0 60px -15px rgba(99,102,241,0.6)" }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 18,
                        }}
                        className="glass glass-hover rounded-xl p-6"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{exp.icon}</span>
                          <h3 className="text-xl font-bold text-zinc-100">
                            {exp.role}
                          </h3>
                        </div>
                        <p className="text-indigo-300 font-medium mb-2">
                          {exp.company}
                        </p>
                        <p className="text-zinc-400 text-sm">
                          {exp.description}
                        </p>
                      </motion.div>
                    </Parallax>
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