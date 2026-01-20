// app/page.js
"use client";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import BackgroundWrapper from "../components/BackgroundWrapper";

export default function Home() {
  return (
    <>
      
        <section id="home">
          <Hero />
        </section>

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
