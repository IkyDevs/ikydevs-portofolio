"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export default function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduced) {
      el.textContent = String(to);
      return;
    }

    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest: number) => {
        el.textContent = String(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, to, reduced]);

  return <span ref={ref}>{to}</span>;
}