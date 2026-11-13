import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { cinematicEase, seeded } from "./motion-utils";

type FlyTextProps = {
  text: string;
  start?: boolean;
  delay?: number;
  stagger?: number;
  className?: string;
  /** Paint a single continuous spectrum gradient across all letters */
  gradient?: boolean;
  seedOffset?: number;
};

/** Splits text into letters that fly in from scattered positions and settle into place. */
export function FlyText({
  text,
  start = true,
  delay = 0,
  stagger = 0.045,
  className,
  gradient = false,
  seedOffset = 0,
}: FlyTextProps) {
  const letters = Array.from(text);
  const n = letters.length;

  return (
    <span className={cn("inline-block whitespace-nowrap", className)} aria-label={text} role="text">
      {letters.map((ch, i) => {
        const s = i + seedOffset;
        const from = {
          opacity: 0,
          x: (seeded(s) - 0.5) * 520,
          y: (seeded(s + 7) - 0.5) * 360,
          rotate: (seeded(s + 13) - 0.5) * 120,
          scale: 0.3 + seeded(s + 21) * 0.6,
          filter: "blur(14px)",
        };
        return (
          <motion.span
            key={`${ch}-${i}`}
            aria-hidden
            className={cn("inline-block will-change-transform", gradient && "text-spectrum-static")}
            style={
              gradient
                ? {
                    backgroundSize: `${n * 100}% 100%`,
                    backgroundPosition: `${(i / Math.max(n - 1, 1)) * 100}% 50%`,
                  }
                : {}
            }
            initial={from}
            animate={
              start
                ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: "blur(0px)" }
                : from
            }
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: cinematicEase }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        );
      })}
    </span>
  );
}
