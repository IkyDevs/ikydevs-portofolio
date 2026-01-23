// components/IntroLoader.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { themeColor } from "@/lib/colors";

const theme = themeColor.pastel;

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
        setReady(true); // 👈 progress selesai, tunggu user
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
            {/* BRUTAL CARD */}
            <motion.div
              initial={{ y: 40, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 14,
              }}
              className={`${theme.surface} border-4 border-black shadow-[10px_10px_0_#000] p-8 mb-10`}
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
                className="text-3xl font-black mb-2"
              >
                IkyDevs Present
              </motion.h1>

              <p className="text-sm tracking-wide">Please wait</p>
            </motion.div>

            {/* PROGRESS BAR */}
            <div className="w-full h-4 border-4 border-black bg-white overflow-hidden shadow-[4px_4px_0_#000]">
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
                className={`${theme.primary} h-full origin-center`}
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
              className="mt-4 font-black text-lg"
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
                    /* IDLE ANIMATION (kalau gak di-hover) */
                    animate={{
                      y: [0, -6, 0],
                      rotate: [0, -1, 1, -1, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatDelay: 2.5, // jeda sebelum gerak lagi
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    /* HOVER */
                    whileHover={{
                      y: -6,
                      scale: 1.05,
                      rotate: 0,
                      boxShadow: "6px 6px 0 #000",
                    }}
                    /* CLICK */
                    whileTap={{
                      scale: 0.95,
                      boxShadow: "2px 2px 0 #000",
                    }}
                    className={`${theme.primary} border-4 border-black px-10 py-3 font-black text-lg shadow-[4px_4px_0_#000]`}
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
