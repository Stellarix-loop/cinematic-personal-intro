import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { cinematicEase } from "./motion-utils";

const links = [
  { to: "/", label: "Home", n: "00" },
  { to: "/about", label: "About", n: "01" },
  { to: "/interests", label: "Interests", n: "02" },
  { to: "/contact", label: "Contact", n: "03" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-border bg-background/70 py-3 backdrop-blur-xl" : "py-5 md:py-7",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          <Link to="/" className="group flex items-center gap-3" aria-label="Home">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-spectrum-animated font-display text-xs font-bold text-primary-foreground shadow-neon">
              {profile.initials}
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-foreground sm:block">
              {profile.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full p-1.5 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                className="group relative rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-primary/40 bg-primary/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </>
                )}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-full glass md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background/95 px-6 backdrop-blur-xl md:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: cinematicEase }}
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: cinematicEase }}
                >
                  <Link
                    to={l.to}
                    activeOptions={{ exact: true }}
                    className="flex items-baseline gap-4 py-2 font-display text-[clamp(2.25rem,11vw,3rem)] font-bold uppercase"
                    activeProps={{ className: "text-spectrum" }}
                    inactiveProps={{ className: "text-foreground" }}
                  >
                    <span className="font-mono text-xs text-muted-foreground">{l.n}</span>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
