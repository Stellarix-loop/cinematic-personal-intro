import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/content/profile";
import { cinematicEase, seeded } from "./motion-utils";

type Phase = "count" | "words" | "exit";

/**
 * Cinematic opening: boot counter → words fly in one by one → name glitches in →
 * the screen splits open. Calls onReveal as the curtain starts lifting, onFinish when gone.
 */
export function Intro({ onReveal, onFinish }: { onReveal: () => void; onFinish: () => void }) {
  const [phase, setPhase] = useState<Phase>("count");
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const sequence = [...profile.introWords, profile.name];

  // Boot counter
  useEffect(() => {
    if (phase !== "count") return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1300;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setPhase("words"), 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Word sequence
  useEffect(() => {
    if (phase !== "words") return;
    const isLast = wordIndex === sequence.length - 1;
    const id = setTimeout(
      () => (isLast ? setPhase("exit") : setWordIndex((i) => i + 1)),
      isLast ? 1300 : 520,
    );
    return () => clearTimeout(id);
  }, [phase, wordIndex, sequence.length]);

  // Exit
  useEffect(() => {
    if (phase !== "exit") return;
    onReveal();
    const id = setTimeout(onFinish, 1200);
    return () => clearTimeout(id);
  }, [phase, onReveal, onFinish]);

  const skip = () => setPhase("exit");
  const exiting = phase === "exit";
  const word = sequence[wordIndex];
  const isName = wordIndex === sequence.length - 1;
  const dir = seeded(wordIndex + 3);
  const fromX = (dir - 0.5) * 900;
  const fromY = (seeded(wordIndex + 9) - 0.5) * 500;

  // Portal to <body> so page transforms/filters can't trap the fixed overlay.
  if (!mounted) return <div className="fixed inset-0 z-[100] bg-background" />;

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-hidden" role="presentation">
      {/* Split curtain */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-background"
        animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
        animate={exiting ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      />
      <motion.div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-spectrum shadow-neon"
        initial={{ scaleX: 0 }}
        animate={exiting ? { scaleX: 1, opacity: [1, 1, 0] } : { scaleX: count / 100 }}
        transition={exiting ? { duration: 0.6 } : { duration: 0.1 }}
      />

      {/* Cinematic letterbox bars */}
      <motion.div
        className="absolute inset-x-0 top-0 bg-black"
        initial={{ height: "0vh" }}
        animate={{ height: exiting ? "0vh" : "11vh" }}
        transition={{ duration: exiting ? 0.9 : 1.2, ease: cinematicEase, delay: exiting ? 0.1 : 0 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-black"
        initial={{ height: "0vh" }}
        animate={{ height: exiting ? "0vh" : "11vh" }}
        transition={{ duration: exiting ? 0.9 : 1.2, ease: cinematicEase, delay: exiting ? 0.1 : 0 }}
      />

      <motion.div
        className="absolute inset-0"
        animate={exiting ? { opacity: 0, scale: 1.08, filter: "blur(12px)" } : { opacity: 1 }}
        transition={{ duration: 0.5, ease: cinematicEase }}
      >
        <div className="absolute left-5 top-6 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground md:left-10 md:top-8">
          ◉ Sys / Init — Transmission
        </div>
        <button
          type="button"
          onClick={skip}
          className="absolute right-5 top-5 rounded-full glass px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground md:right-10 md:top-7"
        >
          Skip intro
        </button>

        {phase === "count" && (
          <div className="absolute bottom-6 right-5 font-display text-[clamp(4rem,18vw,12rem)] font-black leading-none tabular-nums text-outline md:bottom-8 md:right-10">
            {String(count).padStart(3, "0")}
          </div>
        )}
        {phase === "count" && (
          <div className="absolute bottom-8 left-5 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground md:left-10">
            Loading experience
          </div>
        )}

        <div className="absolute inset-0 grid place-items-center px-4">
          <AnimatePresence mode="popLayout">
            {phase !== "count" && (
              <motion.div
                key={word}
                initial={{ opacity: 0, x: fromX, y: fromY, scale: 2.2, rotate: (dir - 0.5) * 30, filter: "blur(24px)" }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.6, filter: "blur(16px)", y: -40 }}
                transition={{ duration: 0.55, ease: cinematicEase }}
                className="text-center"
              >
                <span
                  data-text={word}
                  className={
                    isName
                      ? "glitch font-display text-[clamp(3.5rem,16vw,14rem)] font-black uppercase leading-none"
                      : "font-display text-[clamp(3rem,12vw,9rem)] font-black uppercase leading-none text-foreground"
                  }
                >
                  <span className={isName ? "text-spectrum" : undefined}>{word}</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {phase === "words" && isName && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 38%, color-mix(in oklab, var(--neon-blue) 28%, transparent) 50%, transparent 62%)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.4, delay: 0.35, ease: cinematicEase }}
          />
        )}
      </motion.div>
    </div>,
    document.body,
  );
}
