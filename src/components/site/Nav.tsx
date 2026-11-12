import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { cinematicEase } from "./motion-utils";

const links = [
  { to: "/", label: "Home", n: "00" },
  { to: "/about", label: "Profile", n: "01" },
  { to: "/interests", label: "Interests", n: "02" },
  { to: "/gallery", label: "Gallery", n: "03" },
  { to: "/contact", label: "Connect", n: "04" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setMounted(true), []);
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

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="carbon fixed inset-0 z-40 flex flex-col justify-between px-6 pb-10 pt-28 md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: cinematicEase }}
        >
          <ul className="divide-y divide-border border-y border-border">
            {links.map((l, i) => (
              <motion.li
                key={l.to}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: cinematicEase }}
              >
                <Link
                  to={l.to}
                  activeOptions={{ exact: true }}
                  className="flex items-baseline justify-between py-4 font-display text-[clamp(1.75rem,9vw,2.5rem)] font-extrabold uppercase font-wide"
                  activeProps={{ className: "text-primary" }}
                  inactiveProps={{ className: "text-foreground" }}
                >
                  {l.label}
                  <span className="font-mono text-xs font-normal text-muted-foreground">{l.n}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {profile.alias} · {profile.edition}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          open && "carbon",
          scrolled && !open ? "border-b border-border bg-background/80 py-3 backdrop-blur-xl" : "py-5 md:py-6",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.alias} home`}>
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-sm bg-foreground font-display text-[11px] font-black text-background font-wide">
              {profile.monogram}
              <span className="absolute inset-x-0 bottom-0 h-[3px] livery-stripe" />
            </span>
            <span className="font-display text-sm font-extrabold uppercase tracking-[0.12em] font-wide">
              {profile.alias}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                className="group relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
              >
                {({ isActive }) => (
                  <>
                    <span className="mr-2 text-[10px] text-primary/70">{l.n}</span>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-[2px] bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-sm border border-border md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>
      {mounted && createPortal(menu, document.body)}
    </>
  );
}
