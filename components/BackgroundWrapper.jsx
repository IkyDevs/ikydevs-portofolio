"use client";
import { motion } from "framer-motion";

export default function BackgroundWrapper({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* floating shapes */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 w-40 h-40 bg-yellow-300 border-4 border-black rounded-xl -z-10"
      />

      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-32 right-20 w-56 h-56 bg-blue-300 border-4 border-black rounded-full -z-10"
      />

      <motion.div
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-300 border-4 border-black rounded-lg -z-10"
      />

      {children}
    </div>
  );
}
