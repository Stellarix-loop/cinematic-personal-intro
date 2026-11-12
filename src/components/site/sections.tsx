import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Copy, Mail, Star, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { profile, type GalleryItem } from "@/content/profile";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./RevealWords";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";
import { cinematicEase } from "./motion-utils";

const wrap = "relative mx-auto max-w-7xl px-5 md:px-10";

/* ------------------------------ ABOUT ------------------------------ */

export function AboutTeaser() {
  const { about } = profile;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className={cn(wrap, "py-24 md:py-36")}>
      <SectionHeading eyebrow={about.eyebrow} heading={about.heading} highlight={[3, 4]} more={{ to: "/about", label: "Full story" }} />
      <div className="mt-14 grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
        <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-spectrum">
          <motion.img
            src={about.avatar}
            alt="Silhouette with glowing headphones looking over a neon city"
            width={1024}
            height={1280}
            loading="lazy"
            style={{ y, scale: 1.25 }}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-4 top-4 rounded-full glass px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em]">
            Avatar · placeholder
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">{about.paragraphs[0]}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {about.traits.map((t, i) => (
                <motion.span
                  key={t}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className={cn(
                    "cursor-default rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                    i % 3 === 0
                      ? "border-neon-pink/50 text-neon-pink"
                      : i % 3 === 1
                        ? "border-neon-blue/50 text-neon-blue"
                        : "border-neon-purple/50 text-neon-purple",
                  )}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <StatBars className="mt-12" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function StatBars({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-5", className)}>
      {profile.about.stats.map((s, i) => (
        <div key={s.label}>
          <div className="flex justify-between font-mono text-xs uppercase tracking-[0.2em]">
            <span className="text-muted-foreground">{s.label}</span>
            <span className="text-foreground">{s.value}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-spectrum-animated"
              initial={{ width: 0 }}
              whileInView={{ width: `${s.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: i * 0.12, ease: cinematicEase }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------- INTERESTS ---------------------------- */

export function InterestsSection({ withHeading = true }: { withHeading?: boolean }) {
  const { interests } = profile;
  const [active, setActive] = useState(0);
  const it = interests.items[active];
  const Icon = it.icon;

  return (
    <section className={cn(wrap, "py-24 md:py-36")}>
      {withHeading && (
        <SectionHeading eyebrow={interests.eyebrow} heading={interests.heading} highlight={[0, 1]} more={{ to: "/interests", label: "Deep dive" }} />
      )}

      <div role="tablist" aria-label="Interests" className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-2">
        {interests.items.map((x, i) => {
          const XIcon = x.icon;
          const on = i === active;
          return (
            <button
              key={x.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={cn(
                "relative flex shrink-0 items-center gap-2.5 rounded-full px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors",
                on ? "text-primary-foreground" : "glass text-muted-foreground hover:text-foreground",
              )}
            >
              {on && (
                <motion.span
                  layoutId="interest-pill"
                  className="absolute inset-0 rounded-full bg-spectrum-animated shadow-neon"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <XIcon className="relative h-4 w-4" />
              <span className="relative">{x.title}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mt-8 overflow-hidden rounded-[2rem] glass">
        <AnimatePresence mode="wait">
          <motion.div
            key={it.id}
            className="grid md:grid-cols-2"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 0.45, ease: cinematicEase }}
          >
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[460px]">
              <motion.img
                src={it.image}
                alt={`${it.title} mood`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: cinematicEase }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-background/70" />
            </div>
            <div className="flex flex-col justify-center p-7 md:p-12">
              <motion.span
                className="grid h-14 w-14 place-items-center rounded-2xl bg-spectrum-animated text-primary-foreground shadow-neon"
                initial={{ rotate: -30, scale: 0.6 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: cinematicEase }}
              >
                <Icon className="h-6 w-6" />
              </motion.span>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-primary">{it.kicker}</p>
              <h3 className="mt-3 font-display text-4xl font-black uppercase md:text-6xl">{it.title}</h3>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{it.description}</p>
              <ul className="mt-7 space-y-2.5">
                {it.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    className="flex items-center gap-3 text-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: cinematicEase }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-neon" />
                    {h}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-2">
                {it.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------------------------- FAVORITES ---------------------------- */

export function FavoritesSection({ layout = "carousel" }: { layout?: "carousel" | "grid" }) {
  const { favorites } = profile;
  const track = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  const cards = favorites.items.map((f, i) => (
    <Reveal key={f.title} delay={layout === "grid" ? (i % 3) * 0.08 : 0} className={layout === "carousel" ? "w-[78vw] shrink-0 snap-start sm:w-[360px]" : ""}>
      <TiltCard className="h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={f.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]">
            {f.category}
          </span>
          <span className="absolute right-4 top-4 font-mono text-xs text-foreground">{String(i + 1).padStart(2, "0")}</span>
        </div>
        <div className="p-6">
          <h3 className="font-display text-2xl font-black uppercase leading-tight transition-colors group-hover:text-primary">{f.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{f.note}</p>
          <div className="mt-4 flex gap-1" aria-label={`${f.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} className={cn("h-4 w-4", s < f.rating ? "fill-primary text-primary" : "text-muted-foreground/40")} />
            ))}
          </div>
        </div>
      </TiltCard>
    </Reveal>
  ));

  return (
    <section className="relative py-24 md:py-36">
      <div className={wrap}>
        <SectionHeading eyebrow={favorites.eyebrow} heading={favorites.heading} highlight={[2, 3]} more={layout === "carousel" ? { to: "/favorites", label: "All favorites" } : undefined} />
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{favorites.note}</p>
      </div>

      {layout === "carousel" ? (
        <>
          <div ref={track} className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 md:scroll-px-10 md:px-10 xl:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
            {cards}
          </div>
          <div className={cn(wrap, "mt-4 flex gap-3")}>
            <button type="button" aria-label="Previous" onClick={() => scrollBy(-1)} className="grid h-12 w-12 place-items-center rounded-full glass transition-colors hover:bg-primary hover:text-primary-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next" onClick={() => scrollBy(1)} className="grid h-12 w-12 place-items-center rounded-full glass transition-colors hover:bg-primary hover:text-primary-foreground">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </>
      ) : (
        <div className={cn(wrap, "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3")}>{cards}</div>
      )}
    </section>
  );
}

/* ------------------------------- NOW ------------------------------- */

export function NowSection() {
  const { now } = profile;
  return (
    <section className={cn(wrap, "py-24 md:py-36")}>
      <SectionHeading eyebrow={now.eyebrow} heading={now.heading} highlight={[2, 3]} />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {now.items.map((n, i) => {
          const Icon = n.icon;
          return (
            <Reveal key={n.label} delay={(i % 3) * 0.08}>
              <TiltCard className="p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-ring" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    {n.label}
                  </span>
                  <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h3 className="mt-6 font-display text-xl font-black uppercase leading-tight">{n.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{n.detail}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-spectrum"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${n.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.3, delay: 0.2 + i * 0.06, ease: cinematicEase }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{n.progress}%</span>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ----------------------------- GALLERY ----------------------------- */

export function GallerySection({ limit, withHeading = true }: { limit?: number; withHeading?: boolean }) {
  const { gallery } = profile;
  const items = limit ? gallery.items.slice(0, limit) : gallery.items;
  const [open, setOpen] = useState<GalleryItem | null>(null);

  return (
    <section className={cn(wrap, "py-24 md:py-36")}>
      {withHeading && (
        <SectionHeading eyebrow={gallery.eyebrow} heading={gallery.heading} highlight={[1, 2]} more={limit ? { to: "/gallery", label: "Full moodboard" } : undefined} />
      )}
      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((g, i) => (
          <Reveal key={g.caption} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(g)}
              className="group relative block w-full overflow-hidden rounded-3xl border border-glass-border text-left"
              aria-label={`Open ${g.caption}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                width={g.width}
                height={g.height}
                loading="lazy"
                className="w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center justify-between p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-display text-lg font-black uppercase">{g.caption}</span>
                <ArrowUpRight className="h-5 w-5 text-primary" />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-background/90 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.caption}
          >
            <motion.figure
              className="relative max-h-[88vh] max-w-5xl"
              initial={{ scale: 0.85, y: 30, filter: "blur(10px)" }}
              animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: cinematicEase }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={open.src} alt={open.alt} className="max-h-[80vh] w-auto rounded-3xl shadow-neon" />
              <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{open.caption}</figcaption>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute -right-2 -top-2 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-neon md:-right-5 md:-top-5"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ----------------------------- CONTACT ----------------------------- */

export function ContactSection({ withHeading = true }: { withHeading?: boolean }) {
  const { contact } = profile;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn't copy — please copy it manually");
    }
  };

  return (
    <section className={cn(wrap, "py-24 md:py-36")}>
      {withHeading && <SectionHeading eyebrow={contact.eyebrow} heading={contact.heading} highlight={[1, 2]} />}
      {withHeading && <p className="mt-6 max-w-xl text-lg text-muted-foreground">{contact.blurb}</p>}

      <Reveal className="mt-12 overflow-hidden rounded-[2rem] border-spectrum p-6 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">Drop a line</p>
        <button type="button" onClick={copy} className="group mt-4 flex w-full items-center justify-between gap-4 text-left" aria-label={`Copy ${contact.email}`}>
          <span className="break-all font-display text-[clamp(1.6rem,6vw,5rem)] font-black leading-none transition-colors duration-500 group-hover:text-spectrum">
            {contact.email}
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full glass transition-all group-hover:bg-primary group-hover:text-primary-foreground md:h-16 md:w-16">
            <Copy className="h-5 w-5" />
          </span>
        </button>
        <div className="mt-8">
          <Magnetic>
            <Button asChild variant="neon" size="xl">
              <a href={`mailto:${contact.email}`}>
                <Mail /> Send an email
              </a>
            </Button>
          </Magnetic>
        </div>
      </Reveal>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contact.socials.map((s, i) => (
          <li key={s.label}>
            <Reveal delay={(i % 3) * 0.08}>
              <a
                href={s.href}
                onClick={(e) => {
                  if (s.href === "#") {
                    e.preventDefault();
                    toast(`${s.label} link is a placeholder`, { description: "Add your real link in the content file." });
                  }
                }}
                className="group relative flex items-center justify-between overflow-hidden rounded-3xl glass p-6 transition-colors hover:border-primary/50"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-spectrum opacity-15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <span className="relative">
                  <span className="block font-display text-xl font-black uppercase md:text-2xl">{s.label}</span>
                  <span className="mt-1 block font-mono text-xs text-muted-foreground">{s.handle}</span>
                </span>
                <ArrowUpRight className="relative h-6 w-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------ CTA ------------------------------- */

export function NextPage({ to, label }: { to: "/about" | "/interests" | "/favorites" | "/gallery" | "/contact"; label: string }) {
  return (
    <div className={cn(wrap, "pb-28")}>
      <Link to={to} className="group flex items-center justify-between gap-6 border-y border-border py-10">
        <span>
          <span className="block font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Next</span>
          <span className="mt-2 block font-display text-4xl font-black uppercase transition-transform duration-500 group-hover:translate-x-3 md:text-7xl">
            {label}
          </span>
        </span>
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-spectrum-animated text-primary-foreground shadow-neon transition-transform duration-500 group-hover:rotate-45 md:h-20 md:w-20">
          <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8" />
        </span>
      </Link>
    </div>
  );
}
