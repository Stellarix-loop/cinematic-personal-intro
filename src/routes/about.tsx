import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import sculpture from "@/assets/holo-sculpture.jpg";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal, RevealWords } from "@/components/site/RevealWords";
import { TiltCard } from "@/components/site/TiltCard";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${profile.name}` },
      { name: "description", content: `Get to know ${profile.name}: background, focus and what drives me.` },
      { property: "og:title", content: `About — ${profile.name}` },
      { property: "og:description", content: `Get to know ${profile.name}: background, focus and what drives me.` },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { about } = profile;
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40">
      <PageHeader eyebrow={about.eyebrow} title="About" kicker={about.heading} />

      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-[5fr_7fr] md:gap-20">
        <div ref={imgRef} className="relative">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-spectrum">
              <motion.img
                src={sculpture}
                alt="Abstract iridescent sculpture in pink, purple, blue and red light"
                width={1280}
                height={1600}
                loading="lazy"
                style={{ y, rotate, scale: 1.2 }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground">
                <span>Portrait — placeholder</span>
                <span>{profile.initials}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-8 text-lg leading-relaxed text-muted-foreground md:text-2xl md:leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={i === 0 ? "text-foreground" : undefined}>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {about.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08}>
                <TiltCard className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{f.label}</p>
                  <p className="mt-3 font-display text-xl font-semibold">{f.value}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-20">
            <RevealWords
              text="Curious by default. Always building something."
              highlight={[2, 3]}
              className="font-display text-3xl font-black uppercase leading-[0.95] md:text-5xl"
            />
            <Reveal delay={0.2}>
              <Button asChild variant="neon" size="xl" className="mt-10">
                <Link to="/interests">
                  See what I love <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
