"use client"

import BackgroundWrapper from "@/components/BackgroundWrapper";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useState } from "react";
import IntroLoader from "@/components/IntroLoader";

export default function Page() {

  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <IntroLoader onFinish={() => setLoaded(true)} />}
      {loaded && (
        <BackgroundWrapper>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </BackgroundWrapper>
      )}
    </>
  );
}
