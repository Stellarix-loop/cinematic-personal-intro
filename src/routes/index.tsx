import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import sculpture from "@/assets/holo-sculpture.jpg";
import { Button } from "@/components/ui/button";
import { FlyText } from "@/components/site/FlyText";
import { Intro } from "@/components/site/Intro";
import { Magnetic } from "@/components/site/Magnetic";
import { Reveal, RevealWords } from "@/components/site/RevealWords";
import { cinematicEase } from "@/components/site/motion-utils";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — Hello, World` },
      { name: "description", content: `Hi, I'm ${profile.name}. ${profile.tagline}` },
      { property: "og:title", content: `${profile.name} — Hello, World` },
      { property: "og:description", content: `Hi, I'm ${profile.name}. ${profile.tagline}` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const INTRO_KEY = "intro-seen";

function Index() {
  const [showIntro, setShowIntro] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem(INTRO_KEY)) {
      setShowIntro(false);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  const reveal = useCallback(() => {
    setReady(true);
    sessionStorage.setItem(INTRO_KEY, "1");
  }, []);
  const finish = useCallback(() => setShowIntro(false), []);
  const replay = () => {
    window.scrollTo({ top: 0 });
    setReady(false);
    setShowIntro(true);
  };

  return (
    <>
      {showIntro && <Intro onReveal={reveal} onFinish={finish} />}
      <Hero ready={ready} onReplay={replay} />
      <Marquee />
      <Chapters />
    </>
  );
}

function Hero({ ready, onReplay }: { ready: boolean; onReplay: () => void }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const imgX = useTransform(smx, (v) => v * 40);
  const imgY = useTransform(smy, (v) => v * 30);
  const textX = useTransform(smx, (v) => v * -14);
  const textY = useTransform(smy, (v) => v * -10);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(10px)" },
    animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(10px)" },
    transition: { duration: 1, delay, ease: cinematicEase },
  });

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-20 pt-28 md:px-10"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {/* Floating sculpture */}
      <div className="pointer-events-none absolute -right-[30%] top-1/2 w-[110vw] max-w-[760px] -translate-y-1/2 sm:-right-[12%] sm:w-[70vw] lg:right-[2%] lg:w-[46vw]">
        <motion.div style={{ x: imgX, y: imgY }}>
          <motion.img
            src={sculpture}
            alt=""
            width={1280}
            height={1600}
            className="w-full animate-float mask-fade"
            initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
            animate={ready ? { opacity: 0.85, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.7, rotate: -20 }}
            transition={{ duration: 2, ease: cinematicEase }}
          />
        </motion.div>
      </div>

      <motion.div className="relative mx-auto w-full max-w-7xl" style={{ x: textX, y: textY }}>
        <motion.div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
          {...fade(0.1)}
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {profile.status}
          </span>
          <span>{profile.location}</span>
        </motion.div>

        <motion.p className="mt-8 font-display text-xl font-semibold md:text-3xl" {...fade(0.2)}>
          Hi there, I'm
        </motion.p>

        <h1
          data-text={profile.name}
          data-live={ready}
          className="glitch -ml-[0.04em] font-display text-[clamp(3.6rem,14.5vw,15rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]"
        >
          <FlyText text={profile.name} start={ready} gradient delay={0.25} stagger={0.06} />
        </h1>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <motion.p className="font-display text-2xl font-semibold md:text-4xl" {...fade(0.9)}>
            <span className="text-muted-foreground">a </span>
            <RoleRotator start={ready} />
          </motion.p>
          <motion.p className="max-w-md text-base text-muted-foreground md:text-lg" {...fade(1.05)}>
            {profile.tagline}
          </motion.p>
        </div>

        <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...fade(1.2)}>
          <Magnetic>
            <Button asChild variant="neon" size="xl">
              <Link to="/about">
                Get to know me <ArrowRight />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild variant="glass" size="xl">
              <Link to="/contact">Say hello</Link>
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-6 mx-auto flex max-w-7xl items-center justify-between px-5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:px-10"
        {...fade(1.4)}
      >
        <span className="flex items-center gap-3">
          <span className="relative h-10 w-px overflow-hidden bg-border">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-spectrum"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          Scroll
        </span>
        <button
          type="button"
          onClick={onReplay}
          className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180" />
          Replay intro
        </button>
      </motion.div>
    </section>
  );
}

function RoleRotator({ start }: { start: boolean }) {
  const [i, setI] = useState(0);
  const roles = profile.roles;
  useEffect(() => {
    if (!start) return;
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, [start, roles.length]);

  return (
    <span className="relative inline-flex overflow-hidden pb-1 align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[i]}
          className="glitch text-spectrum"
          data-text={roles[i]}
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: cinematicEase }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Marquee() {
  const items = profile.interests.items.map((it) => it.title);
  const row = [...items, ...items];
  return (
    <section aria-label="Interests" className="relative py-16 md:py-24">
      <div className="-rotate-2 scale-105 overflow-hidden bg-spectrum-animated py-4 md:py-6">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {row.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-display text-3xl font-black uppercase text-primary-foreground md:text-5xl"
            >
              {t} <span aria-hidden>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const chapters = [
  { to: "/about", n: "01", title: "About", text: "Who I am, where I'm from, what I'm up to." },
  { to: "/interests", n: "02", title: "Interests", text: "The things I can't stop thinking about." },
  { to: "/contact", n: "03", title: "Contact", text: "The best ways to reach me." },
] as const;

function Chapters() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">Index</p>
      <RevealWords
        text="Three ways to get to know me."
        highlight={[4, 5]}
        className="mt-4 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] md:text-7xl"
      />
      <ul className="mt-14 border-t border-border">
        {chapters.map((c, i) => (
          <li key={c.to} className="border-b border-border">
            <Reveal delay={i * 0.08}>
              <Link
                to={c.to}
                className="group relative flex items-center gap-5 overflow-hidden py-7 md:gap-10 md:py-10"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-spectrum opacity-15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                <span className="relative font-mono text-xs text-muted-foreground">{c.n}</span>
                <span className="relative flex-1">
                  <span className="block font-display text-4xl font-black uppercase transition-transform duration-500 group-hover:translate-x-3 md:text-7xl">
                    {c.title}
                  </span>
                  <span className="mt-2 block text-sm text-muted-foreground md:text-base">{c.text}</span>
                </span>
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full glass transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground md:h-16 md:w-16">
                  <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
