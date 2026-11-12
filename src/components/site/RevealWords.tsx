import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { cinematicEase } from "./motion-utils";

type RevealWordsProps = {
  text: string;
  className?: string;
  /** Indexes of words set in the editorial serif accent */
  highlight?: number[];
  delay?: number;
  as?: "h1" | "h2" | "p";
};

/** Words rise into place when scrolled into view. */
export function RevealWords({ text, className, highlight = [], delay = 0, as = "h2" }: RevealWordsProps) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={cn("flex flex-wrap gap-x-[0.25em]", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em]">
          <motion.span
            className={cn(
              "inline-block",
              highlight.includes(i) && "font-serif font-normal normal-case italic tracking-normal text-primary",
            )}
            variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
            transition={{ duration: 0.9, ease: cinematicEase }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade-up reveal for blocks of content. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: cinematicEase }}
    >
      {children}
    </motion.div>
  );
}
