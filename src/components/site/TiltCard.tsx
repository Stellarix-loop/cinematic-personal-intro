import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 3D tilt + cursor spotlight card. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${nx * 100}%`);
        el.style.setProperty("--my", `${ny * 100}%`);
        if (e.pointerType === "mouse") {
          px.set(nx);
          py.set(ny);
        }
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className={cn("group relative overflow-hidden rounded-3xl glass", className)}
    >
      <div className="pointer-events-none absolute inset-0 spotlight opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
