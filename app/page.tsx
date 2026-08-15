"use client"

import BackgroundWrapper from "@/components/BackgroundWrapper";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <BackgroundWrapper>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Marquee />
      <Contact />
    </BackgroundWrapper>
  );
}