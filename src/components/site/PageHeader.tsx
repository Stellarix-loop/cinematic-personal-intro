import { motion } from "motion/react";
import { FlyText } from "./FlyText";
import { cinematicEase } from "./motion-utils";

/** Large animated title used at the top of each inner page. */
export function PageHeader({ eyebrow, title, kicker }: { eyebrow: string; title: string; kicker?: string }) {
  return (
    <header className="relative pt-36 md:pt-44">
      <motion.div
        className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: cinematicEase }}
      >
        <span className="text-primary">{eyebrow}</span>
        <motion.span
          className="h-px flex-1 origin-left bg-border"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: cinematicEase }}
        />
      </motion.div>
      <h1 className="mt-6 font-display text-[clamp(2.75rem,11vw,9.5rem)] font-black uppercase leading-[0.85] font-wide">
        <FlyText text={title} chrome stagger={0.04} delay={0.1} />
      </h1>
      {kicker && (
        <motion.p
          className="mt-8 max-w-2xl font-serif text-2xl italic leading-snug text-muted-foreground md:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: cinematicEase }}
        >
          {kicker}
        </motion.p>
      )}
    </header>
  );
}
