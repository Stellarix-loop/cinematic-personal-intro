import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";
import { Reveal } from "./RevealWords";
import { SectionHeading } from "./SectionHeading";
import { cinematicEase } from "./motion-utils";

const wrap = "mx-auto max-w-7xl px-5 md:px-10";

export function SpecSheet() {
  const { about } = profile;
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
      {about.specs.map((s) => (
        <div key={s.label} className="bg-card p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.label}</p>
          <p className="mt-2 font-display text-lg font-extrabold uppercase font-wide">{s.value}</p>
        </div>
      ))}
    </div>
  );
}

export function TuningBars() {
  return (
    <ul className="space-y-5">
      {profile.about.tuning.map((t, i) => (
        <li key={t.label}>
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
            <span className="text-muted-foreground">{t.label}</span>
            <span>{t.value}</span>
          </div>
          <div className="mt-2 h-[3px] bg-border">
            <motion.div
              className={cn("h-full origin-left", t.value < 50 ? "bg-redline" : "bg-primary")}
              style={{ width: `${t.value}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: cinematicEase }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function AboutTeaser() {
  const { about } = profile;
  return (
    <section className={cn(wrap, "py-24 md:py-36")}>
      <SectionHeading eyebrow={about.eyebrow} heading={about.heading} highlight={[3]} more={{ to: "/about", label: "Full profile" }} />
      <div className="mt-14 grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <img src={about.image} alt="Graphite helmet on a studio plinth" loading="lazy" width={1280} height={1600} className="aspect-[4/5] w-full rounded-sm object-cover" />
        </Reveal>
        <div className="space-y-10 md:col-span-7">
          <Reveal>
            <p className="font-serif text-3xl italic leading-snug md:text-4xl">“{about.quote}”</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{about.paragraphs[0]}</p>
          </Reveal>
          <Reveal delay={0.1}><SpecSheet /></Reveal>
        </div>
      </div>
    </section>
  );
}

export function InterestsShowcase() {
  const { interests } = profile;
  const [active, setActive] = useState(0);
  const it = interests.items[active];
  return (
    <section className="carbon py-24 md:py-36">
      <div className={wrap}>
        <SectionHeading eyebrow={interests.eyebrow} heading={interests.heading} highlight={[2]} more={{ to: "/interests", label: "All interests" }} />
        <div className="mt-12 flex gap-2 overflow-x-auto no-scrollbar" role="tablist">
          {interests.items.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 rounded-sm border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                i === active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {x.code} · {x.title}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={it.id}
            className="mt-8 grid gap-8 md:grid-cols-12"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: cinematicEase }}
          >
            <img src={it.image} alt={it.title} loading="lazy" className="aspect-[16/10] w-full rounded-sm object-cover md:col-span-7" />
            <div className="flex flex-col justify-between gap-8 md:col-span-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">{it.kicker}</p>
                <h3 className="mt-4 font-display text-5xl font-black uppercase font-wide">{it.title}</h3>
                <p className="mt-5 leading-relaxed text-muted-foreground">{it.description}</p>
              </div>
              <dl className="divide-y divide-border border-y border-border">
                {it.specs.map((s) => (
                  <div key={s.label} className="flex justify-between py-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function FavoritesCollection() {
  const { favorites } = profile;
  return (
    <section className={cn(wrap, "py-24 md:py-36")}>
      <SectionHeading eyebrow={favorites.eyebrow} heading={favorites.heading} highlight={[1]} />
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{favorites.note}</p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.items.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.08}>
            <article className="group panel overflow-hidden rounded-sm">
              <div className="relative overflow-hidden">
                <img src={f.image} alt={f.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-sm bg-background/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                  {String(i + 1).padStart(2, "0")} · {f.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-extrabold uppercase font-wide">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.note}</p>
                <div className="mt-4 flex gap-1" aria-label={`${f.rating} of 5`}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span key={k} className={cn("h-1 flex-1", k < f.rating ? "bg-primary" : "bg-border")} />
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function NowTelemetry() {
  const { now } = profile;
  return (
    <section className="carbon py-24 md:py-32">
      <div className={wrap}>
        <SectionHeading eyebrow={now.eyebrow} heading={now.heading} highlight={[1]} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {now.items.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.label} className="bg-background p-6">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {n.label}
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-8 font-display text-xl font-extrabold uppercase font-wide">{n.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{n.detail}</p>
                <div className="mt-6 h-[3px] bg-border">
                  <motion.div className="h-full origin-left bg-primary" style={{ width: `${n.progress}%` }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: cinematicEase }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Moodboard({ limit, heading = true }: { limit?: number; heading?: boolean }) {
  const { gallery } = profile;
  const items = limit ? gallery.items.slice(0, limit) : gallery.items;
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : items[open];
  return (
    <section className={cn(wrap, heading ? "py-24 md:py-36" : "pb-28 pt-16")}>
      {heading && <SectionHeading eyebrow={gallery.eyebrow} heading={gallery.heading} highlight={[1]} more={{ to: "/gallery", label: "Full gallery" }} />}
      <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((g, i) => (
          <Reveal key={g.plate} className="mb-5 break-inside-avoid" delay={(i % 3) * 0.06}>
            <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-sm text-left">
              <img src={g.src} alt={g.alt} loading="lazy" width={g.width} height={g.height} className="w-full transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 flex justify-between bg-foreground/70 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-background opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <span>Plate {g.plate}</span>
                <span>{g.caption}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {current && (
              <motion.div className="carbon fixed inset-0 z-[90] flex flex-col items-center justify-center p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
                <button type="button" aria-label="Close" className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-sm border border-border"><X className="h-5 w-5" /></button>
                <motion.img key={current.plate} src={current.src} alt={current.alt} className="max-h-[80vh] max-w-full rounded-sm object-contain" initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: cinematicEase }} />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Plate {current.plate} · {current.caption}</p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

export function SocialGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {profile.contact.socials.map((s, i) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="group relative flex min-h-44 flex-col justify-between bg-card p-6 transition-colors hover:bg-primary hover:text-primary-foreground">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">
            <span>{String(i + 1).padStart(2, "0")} · {s.handle}</span>
            <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
          </div>
          <div>
            <p className="font-display text-3xl font-black uppercase font-wide">{s.label}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">{s.cta}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export function ContactBand() {
  const { contact } = profile;
  return (
    <section className={cn(wrap, "py-24 md:py-36")}>
      <SectionHeading eyebrow={contact.eyebrow} heading={contact.heading} highlight={[4]} more={{ to: "/contact", label: "Connect" }} />
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">{contact.blurb}</p>
      <div className="mt-12"><SocialGrid /></div>
    </section>
  );
}

export function NextPage({ to, label }: { to: "/about" | "/interests" | "/gallery" | "/contact"; label: string }) {
  return (
    <Link to={to} className="group carbon block">
      <div className={cn(wrap, "flex items-center justify-between py-16 md:py-24")}>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Next lap</p>
          <p className="mt-3 font-display text-[clamp(2.25rem,8vw,6rem)] font-black uppercase leading-none font-wide text-chrome">{label}</p>
        </div>
        <ArrowUpRight className="h-12 w-12 transition-transform duration-500 group-hover:rotate-45 md:h-20 md:w-20" />
      </div>
    </Link>
  );
}
