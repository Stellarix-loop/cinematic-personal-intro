import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/content/profile";
import { cinematicEase, seeded } from "./motion-utils";

type Phase = "rev" | "words" | "exit";

const ARC = 251.3; // length of the tachometer arc path (r = 80, 180°)

/**
 * Cinematic opening: tachometer revs to the redline → words streak in →
 * the alias lands in chrome → shutters open. onReveal fires as the shutters open.
 */
export function Intro({ onReveal, onFinish }: { onReveal: () => void; onFinish: () => void }) {
  const [phase, setPhase] = useState<Phase>("rev");
  const [rpm, setRpm] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const sequence = [...profile.introWords, profile.alias];

  useEffect(() => {
    if (phase !== "rev") return;
    let raf = 0;
    let timeout = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setRpm(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
      else timeout = window.setTimeout(() => setPhase("words"), 200);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "words") return;
    const isLast = wordIndex === sequence.length - 1;
    const id = setTimeout(() => (isLast ? setPhase("exit") : setWordIndex((i) => i + 1)), isLast ? 1300 : 480);
    return () => clearTimeout(id);
  }, [phase, wordIndex, sequence.length]);

  useEffect(() => {
    if (phase !== "exit") return;
    onReveal();
    const id = setTimeout(onFinish, 1200);
    return () => clearTimeout(id);
  }, [phase, onReveal, onFinish]);

  const exiting = phase === "exit";
  const word = sequence[wordIndex];
  const isAlias = wordIndex === sequence.length - 1;
  const rpmValue = Math.round(rpm * 8000);
  const redline = rpm > 0.86;

  if (!mounted) return <div className="carbon fixed inset-0 z-[100]" />;

  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-hidden" role="presentation">
      {/* Shutters */}
      <motion.div
        className="carbon absolute inset-x-0 top-0 h-1/2"
        animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      />
      <motion.div
        className="carbon absolute inset-x-0 bottom-0 h-1/2"
        animate={exiting ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
      />

      <motion.div
        className="carbon absolute inset-0 bg-transparent"
        animate={exiting ? { opacity: 0, scale: 1.04 } : { opacity: 1 }}
        transition={{ duration: 0.45, ease: cinematicEase }}
      >
        <div className="absolute inset-x-5 top-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:inset-x-10 md:top-8">
          <span>
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-redline animate-blink" />
            System check
          </span>
          <button
            type="button"
            onClick={() => setPhase("exit")}
            className="rounded-sm border border-border px-4 py-2 transition-colors hover:border-foreground hover:text-foreground"
          >
            Skip intro
          </button>
        </div>

        {phase === "rev" && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative w-[min(78vw,420px)]">
              <svg viewBox="0 0 200 110" className="w-full overflow-visible">
                {Array.from({ length: 9 }).map((_, i) => {
                  const a = Math.PI - (i / 8) * Math.PI;
                  const x1 = 100 + Math.cos(a) * 92;
                  const y1 = 100 - Math.sin(a) * 92;
                  const x2 = 100 + Math.cos(a) * 98;
                  const y2 = 100 - Math.sin(a) * 98;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={i >= 7 ? "var(--redline)" : "currentColor"}
                      strokeWidth="1.2"
                      className="text-muted-foreground"
                    />
                  );
                })}
                <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="var(--border)" strokeWidth="6" />
                <path
                  d="M20 100 A80 80 0 0 1 180 100"
                  fill="none"
                  stroke={redline ? "var(--redline)" : "var(--primary)"}
                  strokeWidth="6"
                  strokeDasharray={ARC}
                  strokeDashoffset={ARC * (1 - rpm)}
                />
              </svg>
              <div className="absolute inset-x-0 bottom-0 text-center">
                <div className="font-display text-[clamp(2.5rem,10vw,4.5rem)] font-black leading-none tabular-nums font-wide">
                  {String(rpmValue).padStart(4, "0")}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                  RPM · warming up
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 grid place-items-center px-4">
          <AnimatePresence mode="popLayout">
            {phase !== "rev" && (
              <motion.div
                key={word}
                initial={{ opacity: 0, x: 280 + seeded(wordIndex) * 200, skewX: -20, filter: "blur(18px)" }}
                animate={{ opacity: 1, x: 0, skewX: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -260, skewX: 16, filter: "blur(14px)" }}
                transition={{ duration: 0.5, ease: cinematicEase }}
                className="text-center"
              >
                <span
                  className={
                    isAlias
                      ? "font-display text-[clamp(3.5rem,17vw,14rem)] font-black uppercase leading-none font-wide text-chrome"
                      : "font-display text-[clamp(2.5rem,10vw,7rem)] font-extrabold uppercase leading-none font-wide"
                  }
                >
                  {word}
                </span>
                {isAlias && (
                  <motion.div
                    className="mx-auto mt-6 h-[3px] w-40 origin-left livery-stripe"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.25, ease: cinematicEase }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
