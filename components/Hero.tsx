// components/Hero.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  personalInfo,
  techStack,
  socialLinks,
  typingTexts,
  projects,
} from "@/lib/constants";
import HighlightText from "./HighlightText";
import Magnetic from "./Magnetic";
import CountUp from "./CountUp";
import { useLenis } from "./LenisProvider";
import { themeColor } from "@/lib/colors";

const theme = themeColor.dark;

const nameChars = personalInfo.name.split("");

export default function Hero() {
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);

  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -96 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className={`min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden ${theme.bg}`}
    >
      {/* radial glow top */}
      <motion.div
        style={{ opacity: reduced ? 1 : glowOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(99,102,241,0.15),transparent)]"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Title */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 text-sm font-medium text-indigo-300"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                Frontend Developer
              </motion.p>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              >
                <span className="block text-zinc-400 text-2xl md:text-3xl font-semibold mb-2">
                  Hi, I&apos;m
                </span>
                <span className="block glow-text">
                  {nameChars.map((char, index) => (
                    <motion.span
                      key={index}
                      className="inline-block whitespace-pre"
                      initial={{ opacity: 0, y: 40, rotateX: 90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                        delay: 0.35 + 0.05 * index,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              {/* Typing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-2"
              >
                <span className="text-xl md:text-2xl text-zinc-400">I&apos;m a</span>
                <div className="glass glass-hover rounded-lg px-5 py-2.5">
                  <span className="text-xl md:text-2xl font-mono font-semibold">
                    <HighlightText texts={typingTexts} />
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-zinc-400 leading-relaxed max-w-xl"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Magnetic>
                <motion.a
                  href="#projects"
                  onClick={scrollToSection("projects")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`${theme.accent} inline-block rounded-lg px-8 py-3.5 font-semibold uppercase tracking-wider text-sm shadow-[0_0_40px_-10px_rgba(99,102,241,0.8)] transition-shadow hover:shadow-[0_0_60px_-10px_rgba(99,102,241,1)]`}
                >
                  View Projects →
                </motion.a>
              </Magnetic>

              <Magnetic>
                <motion.a
                  href="#contact"
                  onClick={scrollToSection("contact")}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`glass glass-hover inline-block rounded-lg px-8 py-3.5 font-semibold uppercase tracking-wider text-sm text-zinc-100`}
                >
                  Contact Me
                </motion.a>
              </Magnetic>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-6"
            >
              <p className="text-zinc-500 text-sm mb-4">Connect with me</p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass glass-hover rounded-lg p-3 text-zinc-300"
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT - 3D card, reaktif scroll */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
            style={{
              rotateX: reduced ? 0 : cardRotateX,
              y: reduced ? 0 : cardY,
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="relative mx-auto max-w-md">
              <div className="glass rounded-2xl p-8 shadow-[0_0_120px_-30px_rgba(99,102,241,0.6)]">
                {/* Avatar */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-white/15">
                    <Image
                      src="/image/1.jpeg"
                      alt="Ahmad Rofiki"
                      fill
                      priority
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="text-center mb-8">
                  <h3 className="text-lg font-bold mb-3 text-zinc-100">
                    Ahmad Rofiki
                  </h3>
                  <div
                    className={`${theme.accentSoft} inline-block rounded-full px-4 py-1.5 text-sm font-medium`}
                  >
                    Front End Developer
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="glass rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-300">
                      <CountUp to={projects.length} />
                    </div>
                    <div className="text-sm text-zinc-500">Projects</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-300">
                      <CountUp to={techStack.length} />
                    </div>
                    <div className="text-sm text-zinc-500">Technologies</div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-zinc-400 text-center uppercase tracking-widest">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {techStack.map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + index * 0.1 }}
                          className="glass glass-hover rounded-lg px-3 py-2 flex items-center gap-1.5 text-zinc-300"
                        >
                          <Icon size={16} className={tech.color} />
                          <span className="text-sm font-medium">
                            {tech.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}