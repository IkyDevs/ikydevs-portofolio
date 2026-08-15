// components/BackgroundWrapper.jsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import Parallax from "./Parallax";

export default function BackgroundWrapper({ children }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090b]">
      {/* grid overlay */}
      <div className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      {/* indigo/violet glow orbs - blur statis, gerak transform-only */}
      <Parallax speed={60} className="absolute -top-40 -left-40 w-[600px] h-[600px] -z-10">
        <motion.div
          animate={reduced ? { opacity: 0.25 } : { opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="w-full h-full rounded-full bg-indigo-600/30 blur-3xl"
        />
      </Parallax>

      <Parallax speed={-80} className="absolute top-1/3 -right-40 w-[500px] h-[500px] -z-10">
        <motion.div
          animate={reduced ? { opacity: 0.2 } : { opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="w-full h-full rounded-full bg-violet-600/25 blur-3xl"
        />
      </Parallax>

      <Parallax speed={40} className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] -z-10">
        <motion.div
          animate={reduced ? { opacity: 0.15 } : { opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 14, repeat: Infinity, delay: 4 }}
          className="w-full h-full rounded-full bg-blue-600/20 blur-3xl"
        />
      </Parallax>

      {children}
    </div>
  );
}