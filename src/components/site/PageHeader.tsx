import { motion } from "motion/react";
import { FlyText } from "./FlyText";
import { cinematicEase } from "./motion-utils";

/** Large animated title used at the top of each inner page. */
export function PageHeader({ eyebrow, title, kicker }: { eyebrow: string; title: string; kicker?: string }) {
  return (
    <header className="relative pt-36 md:pt-44">
      <motion.p
        className="font-mono text-xs uppercase tracking-[0.35em] text-primary"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: cinematicEase }}
      >
        {eyebrow}
      </motion.p>
      <h1
        className="glitch mt-4 font-display text-[clamp(3.25rem,13vw,11rem)] font-black uppercase leading-[0.85]"
        data-text={title}
      >
        <FlyText text={title} gradient stagger={0.05} delay={0.1} />
      </h1>
      {kicker && (
        <motion.p
          className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.6, ease: cinematicEase }}
        >
          {kicker}
        </motion.p>
      )}
    </header>
  );
}
