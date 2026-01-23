import BackgroundWrapper from "@/components/BackgroundWrapper";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <BackgroundWrapper>
      <Hero />
      <About />
      <Skills/>
      <Projects />
      <Experience />
      <Contact />
    </BackgroundWrapper>
  );
}
