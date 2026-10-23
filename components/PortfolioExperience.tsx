"use client";
/* eslint-disable react/jsx-no-comment-textnodes */
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const skills = [
  ["01", "Next.js", "Structured, fast web applications."],
  ["02", "React", "Interfaces that feel immediate."],
  ["03", "Tailwind CSS", "Detailed systems, built quickly."],
  ["04", "Motion", "Interaction with rhythm and purpose."],
  ["05", "Python", "Practical problem-solving."],
  ["06", "Dart + Flutter", "Cross-platform product thinking."],
];
function Magnetic({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const r = useReducedMotion();
  const [xy, set] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      className={className}
      animate={r ? {} : xy}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      onMouseMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        set({
          x: (e.clientX - b.left - b.width / 2) * 0.16,
          y: (e.clientY - b.top - b.height / 2) * 0.16,
        });
      }}
      onMouseLeave={() => set({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[150] h-1 origin-left bg-[#ff4d00]"
    />
  );
}
function Terminal() {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState(["> type HELP to begin."]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "type" | "load">("idle");
  const [lastCmd, setLastCmd] = useState("");
  const [spin, setSpin] = useState(0);
  const commands: Record<string, string> = {
    help: "commands: help · whoami · skills · experience · contact · clear",
    whoami: "Ahmad Rofiki / IkyDevs / Frontend Developer / Indonesia",
    skills: "Next.js, React, Tailwind CSS, Motion, Python, Dart, Flutter",
    experience:
      "2025–now Boddington Villas · 2024–now Villa Bali · 2021–now Dream Tech",
    contact: "ahmadrofiki6146@gmail.com",
    clear: "",
  };
  const timers = useRef<number[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const hold = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    },
    [],
  );
  useEffect(() => {
    if (phase !== "load") return;
    const id = window.setInterval(() => setSpin((s) => s + 1), 90);
    return () => window.clearInterval(id);
  }, [phase]);
  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [lines, phase, input]);
  const finish = (raw: string) => {
    const value = raw.toLowerCase().trim();
    setPhase("idle");
    if (value === "clear") {
      setLines([]);
      return;
    }
    setLines((previous) => [
      ...previous,
      commands[value] || "command not found — try HELP",
    ]);
  };
  const execute = (raw: string, typeIt = true) => {
    if (phase !== "idle" || !raw.trim()) return;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    const typed = typeIt && !reduced;
    setLastCmd(raw.trim());
    setPhase(typed ? "type" : "load");
    setInput("");
    const commit = () => setLines((previous) => [...previous, `> ${raw}`]);
    if (typed) {
      let i = 0;
      const type = () => {
        if (i < raw.length) {
          i++;
          setInput(raw.slice(0, i));
          hold(type, 45);
        } else
          hold(() => {
            commit();
            setInput("");
            setPhase("load");
            hold(() => finish(raw), 950);
          }, 300);
      };
      hold(type, 250);
    } else {
      commit();
      hold(() => finish(raw), reduced ? 150 : 950);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
      className="outline bg-[#202020] p-2 text-white shadow-[10px_10px_0_#ff4d00]"
    >
      <div className="mb-3 flex gap-2 border-b border-white/30 pb-2">
        <i className="h-3 w-3 rounded-full bg-red-500" />
        <i className="h-3 w-3 rounded-full bg-yellow-400" />
        <i className="h-3 w-3 rounded-full bg-green-500" />
        <span className="mono ml-auto text-[10px]">IKY_OS v1.0</span>
      </div>
      <div
        ref={box}
        aria-live="polite"
        className="mono min-h-40 max-h-[420px] space-y-2 overflow-y-auto p-1 text-sm"
      >
        {lines.map((line, index) => (
          <p
            key={index}
            className={line.startsWith(">") ? "text-[#ff4d00]" : ""}
          >
            {line}
          </p>
        ))}
        {phase === "load" && (
          <p className="text-[#ff4d00]">
            <span className="inline-block w-4">{"⣾⣽⣻⢿⡿⣟⣯⣷"[spin % 8]}</span>
            <span className="opacity-70">running</span> {lastCmd}{" "}
            <span className="animate-pulse">…</span>
          </p>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            execute(input, false);
          }}
          className="flex items-center"
        >
          <span className="mr-2 text-[#ff4d00]">$</span>
          <input
            aria-label="Terminal command"
            value={input}
            readOnly={phase !== "idle"}
            onChange={(event) => setInput(event.target.value)}
            placeholder={phase === "idle" ? "type HELP..." : ""}
            className="w-full bg-transparent text-base outline-none placeholder:text-white/30 md:text-sm"
            autoComplete="off"
          />
          {phase === "type" && (
            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[#ff4d00]" />
          )}
        </form>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 border-t border-white/20 pt-3">
        {["whoami", "skills", "experience", "contact", "clear"].map(
          (command) => (
            <motion.button
              key={command}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              disabled={phase !== "idle"}
              onClick={() => execute(command)}
              className="border border-white/40 px-2 py-1 mono text-[10px] transition-colors hover:bg-[#ff4d00] hover:text-[#202020] disabled:cursor-not-allowed disabled:opacity-40"
            >
              TRY: {command.toUpperCase()}
            </motion.button>
          ),
        )}
      </div>
    </motion.div>
  );
}
export default function PortfolioExperience() {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false),
    [menu, setMenu] = useState(false),
    [cursor, setCursor] = useState({ x: -50, y: -50 });
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 950);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);
  return (
    <>
      <ScrollProgress />
      {!reduced && (
        <motion.div
          className="cursor-dot"
          animate={cursor}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] flex flex-col justify-end bg-[#202020] p-6 text-[#f7f6f2]"
          >
            <p className="mono text-xs text-[#ff4d00]">
              INITIALIZING IKYDEVS.EXE
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-3 h-2 origin-left bg-[#ff4d00]"
            />
            <p className="display mt-6 text-[22vw] leading-[.7]">IKYDEVS</p>
            <button
              className="mono absolute right-6 top-6 text-xs underline"
              onClick={() => setLoaded(true)}
            >
              SKIP INTRO
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}>
        <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b-2 border-[#202020] bg-[#f7f6f2]/90 px-4 py-3 backdrop-blur md:px-8">
          <a href="#top" className="display text-2xl font-black">
            IKY<span className="orange">DEVS</span>
          </a>
          <nav className="hidden gap-5 mono text-[11px] uppercase md:flex">
            {["about", "skills", "work", "build", "play", "contact"].map(
              (x) => (
                <a className="hover:underline" href={`#${x}`} key={x}>
                  {x}
                </a>
              ),
            )}
          </nav>
          <button
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            className="sticker px-4 py-2 mono text-xs md:hidden"
          >
            {menu ? "CLOSE ×" : "MENU +"}
          </button>
        </header>
        <AnimatePresence>
          {menu && (
            <motion.nav
              initial={{ clipPath: "circle(0% at 95% 5%)" }}
              animate={{ clipPath: "circle(150% at 95% 5%)" }}
              exit={{ clipPath: "circle(0% at 95% 5%)" }}
              className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-[#ff4d00] px-6 py-20 sm:px-8"
            >
              {["about", "skills", "work", "build", "play", "contact"].map(
                (x, i) => (
                  <a
                    onClick={() => setMenu(false)}
                    href={`#${x}`}
                    key={x}
                    className="display py-1 text-[11vw] leading-[.95] hover:pl-4 sm:text-[13vw] sm:leading-[.88] [@media(max-height:520px)]:text-2xl"
                  >
                    0{i + 1} / {x.toUpperCase()}
                  </a>
                ),
              )}
            </motion.nav>
          )}
        </AnimatePresence>
        <main id="top">
          <section
            ref={hero}
            className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-16 pt-28 md:px-8"
          >
            <motion.div
              style={{ y: reduced ? 0 : y }}
              className="relative z-10 grid w-full max-w-7xl gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center"
            >
              <div>
                <span className="sticker mb-6 inline-block -rotate-12 px-3 py-2 mono text-[10px]">
                  BASED IN INDONESIA ↗
                </span>
                <p className="mono mb-5 text-xs">
                  FRONTEND DEVELOPER / CREATIVE CODER
                </p>
                <h1 className="display text-[15vw] font-black leading-[.76] md:text-[9vw] lg:text-[7vw] 2xl:text-[6vw]">
                  BUILDING
                  <br />
                  <span className="orange">DIGITAL</span>
                  <br />
                  EXPERIENCES.
                </h1>
                <p className="mt-8 max-w-md text-lg leading-relaxed">
                  Hey, I&apos;m Ahmad Rofiki — a Frontend Developer from
                  Indonesia. I build expressive web experiences and custom
                  internal software that make complex things feel simple.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Magnetic>
                    <a
                      className="outline inline-block bg-[#ff4d00] px-6 py-4 font-bold text-white"
                      href="#work"
                    >
                      SEE SELECTED WORK ↘
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      className="sticker inline-block px-6 py-4 font-bold"
                      href="mailto:ahmadrofiki6146@gmail.com"
                    >
                      LET&apos;S TALK ↗
                    </a>
                  </Magnetic>
                </div>
              </div>
              <motion.div
                whileHover={{ rotate: reduced ? 0 : 2, scale: 1.02 }}
                className="relative mx-auto w-full max-w-md"
              >
                <div className="absolute -left-5 -top-5 h-full w-full border-2 border-[#202020] bg-[#ff4d00]" />
                <div className="outline relative bg-[#f02d24] p-4">
                  <div className="outline bg-[#202020] p-4">
                    <p className="mono mb-3 text-xs text-[#ff4d00]">
                      // HELLO, WORLD
                    </p>
                    <p className="display text-6xl text-[#f7f6f2]">
                      IKY
                      <br />
                      DEVS
                    </p>
                    <div className="mt-6 h-16 border-2 border-[#ff4d00] p-2 mono text-xs text-[#f7f6f2]">
                      const idea ={" "}
                      <span className="text-[#ff4d00]">
                        &quot;make it felt&quot;
                      </span>
                      ;<br />
                      ship(idea);<span className="animate-pulse">_</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between mono text-[10px]">
                    <span>RETRO FUTURE UNIT</span>
                    <span>◉ ONLINE</span>
                  </div>
                </div>
                <span className="sticker absolute -bottom-4 -right-5 rotate-12 px-4 py-3 mono text-xs">
                  SCROLL ME ↓
                </span>
              </motion.div>
            </motion.div>
            <p className="display absolute -bottom-8 left-0 whitespace-nowrap text-[25vw] text-[#202020]/[.06]">
              IKYDEVS
            </p>
          </section>
          <section
            id="about"
            className="border-y-2 border-[#202020] bg-white px-4 py-24 md:px-8"
          >
            <Reveal className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
              <div className="relative mx-auto w-full max-w-md">
                <div className="tape -left-10 top-5" />
                <motion.div
                  whileHover={{ rotate: 1 }}
                  className="outline relative aspect-square overflow-hidden bg-[#dcdcd7]"
                >
                  <Image
                    src="/image/ikydevs.png"
                    alt="Ahmad Rofiki"
                    fill
                    sizes="(max-width:768px) 90vw, 450px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <p className="sticker absolute -bottom-4 -right-3 px-4 py-3 mono text-xs">
                  AHMAD ROFIKI / 01
                </p>
                <svg
                  className="absolute -right-16 top-0 hidden h-28 w-28 md:block"
                  viewBox="0 0 100 100"
                >
                  <path
                    className="scribble"
                    d="M5 10 C90 2 65 65 25 78 M25 78 L45 58 M25 78 L48 90"
                  />
                </svg>
              </div>
              <div>
                <p className="mono mb-4 text-xs">
                  01 / WHO&apos;S BEHIND THE SCREEN?
                </p>
                <h2 className="display text-[15vw] font-black leading-[.8] md:text-7xl">
                  HELLO,
                  <br />
                  I&apos;M <span className="orange">IKY.</span>
                </h2>
                <p className="mt-7 max-w-lg text-lg leading-relaxed">
                  I&apos;m a frontend developer who treats the browser as both a
                  workshop and a canvas. I care about clear systems, responsive
                  details, and making useful software feel delightful to use.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 mono text-xs">
                  <span className="sticker px-3 py-2">FRONTEND DEVELOPER</span>
                  <span className="sticker px-3 py-2">INDONESIA</span>
                  <span className="sticker px-3 py-2">ALWAYS LEARNING</span>
                </div>
              </div>
            </Reveal>
          </section>
          <section id="skills" className="px-4 py-24 md:px-8">
            <Reveal className="mx-auto max-w-6xl">
              <p className="mono mb-4 text-xs">
                02 / CAPABILITIES, NOT BUZZWORDS
              </p>
              <h2 className="display text-[15vw] font-black leading-[.75] md:text-8xl">
                TOOLS OF
                <br />
                THE <span className="orange">TRADE.</span>
              </h2>
              <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skills.map(([no, title, text], i) => (
                  <motion.article
                    key={title}
                    drag={reduced ? false : "x"}
                    dragConstraints={{ left: -12, right: 12 }}
                    whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }}
                    className="outline cursor-grab bg-white p-6 active:cursor-grabbing"
                  >
                    <p className="mono text-xs text-[#ff4d00]">
                      {no} / DRAG ME
                    </p>
                    <h3 className="display mt-10 text-4xl font-bold">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-xs">{text}</p>
                  </motion.article>
                ))}
              </div>
            </Reveal>
          </section>
          <section
            id="work"
            className="border-y-2 border-[#202020] bg-[#202020] px-4 py-24 text-[#f7f6f2] md:px-8"
          >
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <p className="mono mb-4 text-xs text-[#ff4d00]">
                  03 / REAL-WORLD EXPERIENCE
                </p>
                <h2 className="display text-[15vw] font-black leading-[.75] md:text-8xl">
                  WORK
                  <br />
                  <span className="text-[#ff4d00]">EXPERIENCE.</span>
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#dcdcd7]">
                  A hands-on path shaped by practical work, technical curiosity,
                  and a growing focus on digital products.
                </p>
              </Reveal>
              <div className="mt-16 border-l-2 border-[#ff4d00] pl-6 md:pl-12">
                <Reveal>
                  <article className="relative border-b border-white/25 pb-12">
                    <span className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-[#ff4d00] md:-left-[57px]" />
                    <p className="mono text-xs text-[#ff4d00]">2025 — NOW</p>
                    <h3 className="display mt-3 text-5xl font-black">
                      HOUSEKEEPING
                      <br />
                      STAFF.
                    </h3>
                    <p className="mono mt-3 text-xs">BODDINGTON VILLAS</p>
                    <p className="mt-5 max-w-xl text-lg text-[#dcdcd7]">
                      Maintaining cleanliness and order across villa premises —
                      a role that values consistency, care, and attention to the
                      small details.
                    </p>
                  </article>
                </Reveal>
                <Reveal>
                  <article className="relative border-b border-white/25 py-12">
                    <span className="absolute -left-[33px] top-14 h-4 w-4 rounded-full bg-white md:-left-[57px]" />
                    <p className="mono text-xs text-[#ff4d00]">2024 — NOW</p>
                    <h3 className="display mt-3 text-5xl font-black">
                      WALL
                      <br />
                      FINISHING.
                    </h3>
                    <p className="mono mt-3 text-xs">VILLA BALI</p>
                    <p className="mt-5 max-w-xl text-lg text-[#dcdcd7]">
                      Specializing in plastering and painting villa walls,
                      turning surface-level detail into a finish that feels
                      complete.
                    </p>
                  </article>
                </Reveal>
                <Reveal>
                  <article className="relative pt-12">
                    <span className="absolute -left-[33px] top-14 h-4 w-4 rounded-full bg-white md:-left-[57px]" />
                    <p className="mono text-xs text-[#ff4d00]">2021 — NOW</p>
                    <h3 className="display mt-3 text-5xl font-black">
                      TECHNICAL
                      <br />
                      PHONE REPAIR.
                    </h3>
                    <p className="mono mt-3 text-xs">DREAM TECH</p>
                    <p className="mt-5 max-w-xl text-lg text-[#dcdcd7]">
                      Diagnosing and repairing mobile devices through careful
                      troubleshooting and practical technical problem-solving.
                    </p>
                  </article>
                </Reveal>
              </div>
            </div>
          </section>
          <section id="build" className="px-4 py-24 md:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <p className="mono mb-4 text-xs">04 / WHAT I BUILD</p>
                <h2 className="display text-[9.5vw] font-black leading-[.78] md:text-6xl lg:text-7xl">
                  GOOD SOFTWARE.
                  <br />
                  <span className="orange">BETTER EXPERIENCES.</span>
                </h2>
              </Reveal>
              <div className="mt-14 grid gap-6 md:grid-cols-2">
                <Reveal>
                  <article className="outline min-h-80 bg-[#ff4d00] p-7">
                    <p className="mono text-xs">01 / FRONTEND EXPERIENCES</p>
                    <h3 className="display mt-12 text-5xl font-black">
                      MAKE IT
                      <br />
                      FEEL RIGHT.
                    </h3>
                    <p className="mt-5 max-w-sm">
                      Modern, responsive, expressive interfaces built with
                      visual care, animation, and maintainable architecture.
                    </p>
                  </article>
                </Reveal>
                <Reveal>
                  <article className="outline min-h-80 bg-white p-7">
                    <p className="mono text-xs">
                      02 / CUSTOM INTERNAL SOFTWARE
                    </p>
                    <h3 className="display mt-12 text-5xl font-black">
                      MAKE WORK
                      <br />
                      FLOW.
                    </h3>
                    <p className="mt-5 max-w-sm">
                      Purpose-built interfaces that simplify workflows, organize
                      operations, and improve everyday productivity.
                    </p>
                  </article>
                </Reveal>
              </div>
            </div>
          </section>
          <section
            id="play"
            className="border-y-2 border-[#202020] bg-[#ff4d00] px-4 py-24 md:px-8"
          >
            <Reveal className="mx-auto max-w-5xl">
              <p className="mono mb-4 text-xs">
                05 / A TINY CORNER OF THE INTERNET
              </p>
              <h2 className="display text-[18vw] font-black leading-[.75] md:text-8xl">
                LET&apos;S
                <br />
                PLAY.
              </h2>
              <p className="mt-6 max-w-lg text-lg">
                This is a small working terminal. Ask it about IkyDevs —
                it&apos;s a reminder that interfaces can be useful and fun at
                the same time.
              </p>
              <div className="mt-10 max-w-2xl">
                <Terminal />
              </div>
              <div className="mt-8 flex flex-wrap gap-3 mono text-xs">
                <span className="sticker px-3 py-2">TRY: WHOAMI</span>
                <span className="sticker px-3 py-2">TRY: SKILLS</span>
                <span className="sticker px-3 py-2">TRY: CONTACT</span>
              </div>
            </Reveal>
          </section>
          <section
            id="contact"
            className="relative overflow-hidden px-4 py-28 md:px-8"
          >
            <Reveal className="relative z-10 mx-auto max-w-6xl">
              <p className="mono mb-5 text-xs">
                06 / LET&apos;S MAKE SOMETHING USEFUL
              </p>
              <h2 className="display text-[12vw] font-black leading-[.74] md:text-7xl">
                HAVE AN IDEA?
                <br />
                <span className="orange">LET&apos;S BUILD IT.</span>
              </h2>
              <Magnetic className="mt-10 inline-block">
                <a
                  className="outline inline-block bg-[#202020] px-7 py-5 font-bold text-white"
                  href="mailto:ahmadrofiki6146@gmail.com"
                >
                  START A CONVERSATION ↗
                </a>
              </Magnetic>
              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 mono text-xs">
                <a
                  className="underline"
                  href="mailto:ahmadrofiki6146@gmail.com"
                >
                  EMAIL ↗
                </a>
                <a
                  className="underline"
                  href="https://github.com/IkyDevs"
                  target="_blank"
                  rel="noreferrer"
                >
                  GITHUB ↗
                </a>
                <a
                  className="underline"
                  href="https://instagram.com/rfky_ahmadz"
                  target="_blank"
                  rel="noreferrer"
                >
                  INSTAGRAM ↗
                </a>
              </div>
            </Reveal>
            <p className="display pointer-events-none absolute -bottom-4 -left-2 text-[24vw] font-black leading-none text-[#202020]/[.07]">
              IKYDEVS
            </p>
          </section>
        </main>
        <footer className="flex flex-col justify-between gap-4 border-t-2 border-[#202020] bg-white px-4 py-6 mono text-xs md:flex-row md:px-8">
          <p>DESIGNED & DEVELOPED BY AHMAD ROFIKI — IKYDEVS.</p>
          <a href="#top" className="underline">
            BACK TO THE TOP ↑
          </a>
        </footer>
      </div>
    </>
  );
}
