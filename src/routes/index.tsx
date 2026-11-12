import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FlyText } from "@/components/site/FlyText";
import { Intro } from "@/components/site/Intro";
import { cinematicEase } from "@/components/site/motion-utils";
import { AboutTeaser, ContactBand, FavoritesCollection, InterestsShowcase, Moodboard, NowTelemetry } from "@/components/site/sections";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.alias} — Personal Hub` },
      { name: "description", content: `${profile.alias}: sim racing, anime, music and tech. Profile, favorites, gallery and socials.` },
      { property: "og:title", content: `${profile.alias} — Personal Hub` },
      { property: "og:description", content: `${profile.alias}: sim racing, anime, music and tech.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

let introPlayed = false;

function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (introPlayed || sessionStorage.getItem("bl4z3-intro")) {
      setShowIntro(false);
      setRevealed(true);
    }
  }, []);
  const onReveal = useCallback(() => setRevealed(true), []);
  const onFinish = useCallback(() => {
    introPlayed = true;
    sessionStorage.setItem("bl4z3-intro", "1");
    setShowIntro(false);
  }, []);

  return (
    <>
      {showIntro && <Intro onReveal={onReveal} onFinish={onFinish} />}
      <Hero start={revealed} />
      <Marquee />
      <AboutTeaser />
      <InterestsShowcase />
      <FavoritesCollection />
      <NowTelemetry />
      <Moodboard limit={6} />
      <ContactBand />
    </>
  );
}

function Hero({ start }: { start: boolean }) {
  const { scrollY } = useScroll();
  const carY = useTransform(scrollY, [0, 800], [0, 120]);
  const carScale = useTransform(scrollY, [0, 800], [1, 1.08]);
  return (
    <section className="studio relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0 hairline-grid" aria-hidden />
      <motion.img
        src={profile.heroImage}
        alt="Silver grand touring coupe in a pale studio"
        width={1920}
        height={1088}
        style={{ y: carY, scale: carScale }}
        className="absolute inset-x-0 bottom-0 h-[62%] w-full object-cover object-bottom md:h-[72%]"
        initial={{ opacity: 0, x: 80 }}
        animate={start ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
        transition={{ duration: 1.4, ease: cinematicEase }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" aria-hidden />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 md:px-10 md:pt-36">
        <motion.div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground" initial={{ opacity: 0 }} animate={start ? { opacity: 1 } : {}} transition={{ duration: 0.8 }}>
          <span><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary animate-blink" />{profile.status}</span>
          <span>{profile.edition}</span>
        </motion.div>
        <h1 className="mt-5 font-display text-[clamp(4rem,19vw,16rem)] font-black uppercase leading-[0.82] font-wide">
          <FlyText text={profile.alias} start={start} chrome stagger={0.06} delay={0.15} />
        </h1>
        <motion.div className="mt-6 grid gap-6 md:grid-cols-2 md:items-end" initial={{ opacity: 0, y: 20 }} animate={start ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.7, ease: cinematicEase }}>
          <p className="max-w-md font-serif text-2xl italic leading-snug md:text-3xl">{profile.tagline}</p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild variant="racing" size="xl"><Link to="/about">Enter profile <ArrowRight /></Link></Button>
            <Button asChild variant="line" size="xl"><Link to="/contact">Socials</Link></Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...profile.roles, ...profile.roles];
  return (
    <div className="carbon overflow-hidden border-y border-border py-5">
      <div className="flex w-max animate-marquee gap-10">
        {[...row, ...row].map((r, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-extrabold uppercase font-wide md:text-4xl">
            {r}<span className="h-[3px] w-10 livery-stripe" />
          </span>
        ))}
      </div>
    </div>
  );
}
