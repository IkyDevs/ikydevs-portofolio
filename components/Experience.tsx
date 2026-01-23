// components/Experience.tsx
"use client";
import { motion, Variants } from "framer-motion";
import { experiences } from "@/lib/constants";
import { themeColor } from "@/lib/colors";

const theme = themeColor.pastel;

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
      className={`py-24 px-4 sm:px-6 lg:px-8 relative ${theme.bg} ${theme.text}`}
    >
      {/* background lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-24 bg-black/20"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Work Experience
          </h2>
          <div className="h-1 w-20 bg-black mx-auto" />
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* center line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-black" />

          <div className="space-y-14">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={`${exp.company}-${index}`}
                  custom={isLeft ? -1 : 1}
                  variants={item}
                  className={`relative flex ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  } items-center`}
                >
                  {/* dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-black border-4 border-white z-10" />

                  {/* year */}
                  <div
                    className={`w-1/2 ${isLeft ? "pr-12 text-right" : "pl-12"}`}
                  >
                    <span className="inline-block px-4 py-2 border-2 border-black font-bold shadow-[3px_3px_0_#000] bg-white">
                      {exp.year}
                    </span>
                  </div>

                  {/* card */}
                  <div className={`w-1/2 ${isLeft ? "pl-12" : "pr-12"}`}>
                    <motion.div
                      whileHover={{
                        y: -10,
                        boxShadow: "10px 10px 0 #000",
                      }}
                      whileTap={{
                        scale: 0.97,
                        boxShadow: "4px 4px 0 #000",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 18,
                      }}
                      className={`${theme.surface} border-4 border-black p-6 shadow-[6px_6px_0_#000]`}
                    >
                      <h3 className="text-xl font-black mb-1">{exp.role}</h3>
                      <p className="text-lg mb-3">{exp.company}</p>
                      <p className="text-neutral-600">{exp.description}</p>
                    </motion.div>
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
