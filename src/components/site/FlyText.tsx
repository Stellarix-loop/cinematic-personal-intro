import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { cinematicEase, seeded } from "./motion-utils";

type FlyTextProps = {
  text: string;
  start?: boolean;
  delay?: number;
  stagger?: number;
  className?: string;
  /** Paint letters with the polished chrome gradient */
  chrome?: boolean;
  seedOffset?: number;
};

/** Letters streak in from the right with motion blur, like a car crossing the frame. */
export function FlyText({
  text,
  start = true,
  delay = 0,
  stagger = 0.045,
  className,
  chrome = false,
  seedOffset = 0,
}: FlyTextProps) {
  const letters = Array.from(text);
  return (
    <span className={cn("inline-block whitespace-nowrap", className)} aria-label={text} role="text">
      {letters.map((ch, i) => {
        const from = {
          opacity: 0,
          x: 160 + seeded(i + seedOffset) * 120,
          skewX: -24,
          filter: "blur(12px)",
        };
        return (
          <motion.span
            key={`${ch}-${i}`}
            aria-hidden
            className={cn("inline-block will-change-transform", chrome && "text-chrome")}
            initial={from}
            animate={start ? { opacity: 1, x: 0, skewX: 0, filter: "blur(0px)" } : from}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: cinematicEase }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        );
      })}
    </span>
  );
}
