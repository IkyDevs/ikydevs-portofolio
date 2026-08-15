// components/IntroLoader.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { themeColor } from "@/lib/colors";

const theme = themeColor.dark;

interface IntroLoaderProps {
  onFinish?: () => void;
}

export default function IntroLoader({ onFinish }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setReady(true);
      }

      setProgress(current);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setDone(true);
    setTimeout(() => {
      onFinish?.();
    }, 500);
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${theme.bg}`}
        >
          <div className="w-full max-w-md px-6 text-center">
            {/* CARD */}
            <motion.div
              initial={{ y: 40, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 14,
              }}
              className="glass rounded-2xl p-8 mb-10 shadow-[0_0_120px_-30px_rgba(99,102,241,0.6)]"
            >
              {/* TITLE */}
              <motion.h1
                animate={{
                  x: [0, -1, 1, -1, 1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  duration: 0.4,
                }}
                className="text-3xl font-bold tracking-tight mb-2 text-zinc-100"
              >
                Iky<span className="text-indigo-400">Devs</span> Present
              </motion.h1>

              <p className="text-sm tracking-widest text-zinc-500 uppercase">
                Please wait
              </p>
            </motion.div>

            {/* PROGRESS BAR */}
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                animate={
                  progress === 100
                    ? {
                        width: "100%",
                        scaleY: [1, 1.4, 1],
                      }
                    : {
                        width: `${progress}%`,
                      }
                }
                transition={
                  progress === 100
                    ? {
                        duration: 0.4,
                        ease: "easeOut",
                      }
                    : {
                        duration: 0.25,
                        ease: "easeOut",
                      }
                }
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 origin-left"
                style={{ boxShadow: "0 0 20px rgba(99,102,241,0.6)" }}
              />
            </div>

            {/* PERCENT */}
            <motion.div
              key={progress}
              initial={{ opacity: 0, y: 10 }}
              animate={
                progress === 100
                  ? {
                      opacity: 1,
                      y: [0, -8, 0],
                      scale: [1, 1.2, 1],
                    }
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className="mt-4 font-bold text-lg text-indigo-300"
            >
              {progress}%
            </motion.div>

            {/* START BUTTON */}
            <AnimatePresence>
              {ready && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8"
                >
                  <motion.button
                    onClick={handleStart}
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatDelay: 2.5,
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      y: -4,
                      scale: 1.03,
                      boxShadow: "0 0 60px -10px rgba(99,102,241,0.9)",
                    }}
                    whileTap={{ scale: 0.96 }}
                    className={`${theme.accent} rounded-xl px-10 py-3.5 font-bold text-lg shadow-[0_0_40px_-10px_rgba(99,102,241,0.8)]`}
                  >
                    MULAI
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}