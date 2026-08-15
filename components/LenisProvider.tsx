// components/LenisProvider.tsx
"use client";

import Lenis from "lenis";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

let lenisInstance: Lenis | null = null;
const listeners = new Set<() => void>();

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};

const getSnapshot = () => lenisInstance;

export const useLenis = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

export default function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = instance;
    listeners.forEach((l) => l());

    let rafId: number;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisInstance = null;
      listeners.forEach((l) => l());
    };
  }, [reduced]);

  return <>{children}</>;
}