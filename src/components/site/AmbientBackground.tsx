import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

/** Fixed, site-wide atmosphere: drifting neon light, grid, scanline, film grain, cursor glow. */
export function AmbientBackground() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 90, damping: 22 });
  const sy = useSpring(y, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-[25%] -top-[25%] h-[75vmax] w-[75vmax] rounded-full blob-purple animate-drift-a" />
      <div className="absolute -right-[30%] top-[5%] h-[65vmax] w-[65vmax] rounded-full blob-pink opacity-80 animate-drift-b" />
      <div className="absolute -bottom-[35%] left-[15%] h-[65vmax] w-[65vmax] rounded-full blob-blue opacity-70 animate-drift-c" />
      <div className="absolute -bottom-[15%] -right-[15%] h-[45vmax] w-[45vmax] rounded-full blob-red opacity-60 animate-drift-a" />
      <div className="absolute inset-0 grid-lines" />
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute -left-[320px] -top-[320px] hidden h-[640px] w-[640px] rounded-full cursor-glow md:block"
      />
      <div className="absolute inset-x-0 top-0 h-48 scanline animate-scan" />
      <div className="absolute inset-0 vignette" />
      <div className="absolute inset-0 grain" />
    </div>
  );
}
