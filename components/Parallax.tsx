// components/Parallax.tsx
"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-reactive wrapper. Transform-only (GPU), nol re-render per scroll.
 * speed positif = elemen bergerak lebih lambat dari scroll (kedalaman).
 */
export default function Parallax({
  children,
  speed = 40,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}