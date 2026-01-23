// components/Skills.tsx
"use client";
import { motion, Variants } from "framer-motion";
import { skills } from "@/lib/constants";
import { themeColor } from "@/lib/colors";

const theme = themeColor.pastel;

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
      className={`py-24 px-4 sm:px-6 lg:px-8 ${theme.bg} ${theme.text}`}
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Technical Expertise
          </h2>
          <div className="h-1 w-20 bg-black mx-auto" />
        </motion.div>

        {/* GRID */}
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
                /* 🔥 HOVER */
                whileHover={{
                  scale: 1,
                  y: -20,
                  boxShadow: "12px 12px 0 #000",
                }}
                /* 👆 CLICK / TAP */
                whileTap={{
                  scale: 0.95,
                  rotateZ: 0,
                  boxShadow: "4px 4px 0 #000",
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 16,
                }}
                className={`${theme.surface} border-4 border-black p-6 shadow-[6px_6px_0_#000] cursor-pointer select-none`}
              >
                {/* TOP */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* ICON */}
                    <motion.div
                      whileHover={{ rotate: 18, scale: 1.15 }}
                      whileTap={{ rotate: -10, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`p-2 border-2 border-black ${theme.secondary}`}
                    >
                      <Icon size={20} />
                    </motion.div>

                    <h3 className="text-lg font-black">{skill.name}</h3>
                  </div>

                  {/* PERCENT */}
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="font-black"
                  >
                    {skill.level}%
                  </motion.span>
                </div>

                {/* PROGRESS BAR */}
                <div className="relative h-3 bg-white border-2 border-black overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    /* hover feedback */
                    whileHover={{ filter: "brightness(1.15)" }}
                    /* click feedback */
                    whileTap={{ scaleY: 1.4 }}
                    transition={{
                      type: "spring",
                      stiffness: 90,
                      damping: 20,
                      delay: 0.3,
                    }}
                    className={`${theme.primary} h-full origin-center`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
