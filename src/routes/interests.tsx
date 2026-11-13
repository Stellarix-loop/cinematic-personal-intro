import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/RevealWords";
import { TiltCard } from "@/components/site/TiltCard";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/interests")({
  head: () => ({
    meta: [
      { title: `Interests — ${profile.name}` },
      { name: "description", content: `The passions, hobbies and ideas that keep ${profile.name} curious.` },
      { property: "og:title", content: `Interests — ${profile.name}` },
      { property: "og:description", content: `The passions, hobbies and ideas that keep ${profile.name} curious.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InterestsPage,
});

function InterestsPage() {
  const { interests } = profile;
  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40">
      <PageHeader eyebrow={interests.eyebrow} title="Interests" kicker={interests.heading} />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
        {interests.items.map((it, i) => {
          const Icon = it.icon;
          return (
            <Reveal key={it.title} delay={(i % 4) * 0.08}>
              <TiltCard className="flex h-full min-h-72 flex-col p-7">
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-spectrum-animated text-primary-foreground shadow-neon transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-10 font-display text-2xl font-black uppercase transition-colors group-hover:text-primary">
                  {it.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[2rem] border-spectrum p-8 md:flex-row md:items-center md:p-12">
        <p className="font-display text-2xl font-black uppercase md:text-4xl">
          Share any of these? <span className="text-spectrum">Let's connect.</span>
        </p>
        <Button asChild variant="neon" size="xl">
          <Link to="/contact">
            Get in touch <ArrowRight />
          </Link>
        </Button>
      </Reveal>
    </div>
  );
}
