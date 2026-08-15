// components/Skills.tsx
"use client";
import { motion, Variants } from "framer-motion";
import { skills } from "@/lib/constants";
import Parallax from "./Parallax";
import { themeColor } from "@/lib/colors";

const theme = themeColor.dark;

/* STAGGER CONTAINER */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* CARD ENTER */
const item: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: -10,
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className={`py-24 px-4 sm:px-6 lg:px-8 ${theme.bg}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-100">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400"
          >
            02 / Skills
          </motion.p>
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Expertise
            </span>
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full" />
        </motion.div>

        {/* GRID */}
        <Parallax speed={20}>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill) => {
              const Icon = skill.icon;

              return (
                <motion.div
                  key={skill.name}
                  variants={item}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 0 60px -15px rgba(99,102,241,0.6)",
                    borderColor: "rgba(129,140,248,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 16,
                  }}
                  className="glass glass-hover rounded-xl p-6"
                >
                  {/* TOP */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {/* ICON */}
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        whileTap={{ rotate: -8, scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`${theme.accentSoft} rounded-lg p-2.5`}
                      >
                        <Icon size={20} />
                      </motion.div>

                      <h3 className="text-lg font-semibold text-zinc-100">
                        {skill.name}
                      </h3>
                    </div>

                    {/* PERCENT */}
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-indigo-300 font-semibold"
                    >
                      {skill.level}%
                    </motion.span>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      whileHover={{ filter: "brightness(1.3)" }}
                      whileTap={{ scaleY: 1.4 }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 20,
                        delay: 0.3,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 origin-left"
                      style={{ boxShadow: "0 0 20px rgba(99,102,241,0.5)" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
}