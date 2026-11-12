import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { cinematicEase } from "./motion-utils";

type RevealWordsProps = {
  text: string;
  className?: string;
  /** Indexes of words to paint with the spectrum gradient */
  highlight?: number[];
  delay?: number;
  as?: "h1" | "h2" | "p";
};

/** Words rise and un-blur into place when scrolled into view. */
export function RevealWords({ text, className, highlight = [], delay = 0, as = "h2" }: RevealWordsProps) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={cn("flex flex-wrap gap-x-[0.25em]", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className={cn("inline-block", highlight.includes(i) && "text-spectrum")}
            variants={{
              hidden: { y: "110%", rotate: 6, opacity: 0, filter: "blur(8px)" },
              show: { y: "0%", rotate: 0, opacity: 1, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.9, ease: cinematicEase }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Generic fade-up reveal for blocks of content. */
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
      initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1, delay, ease: cinematicEase }}
    >
      {children}
    </motion.div>
  );
}
