import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/RevealWords";
import { NextPage, NowTelemetry, SpecSheet, TuningBars } from "@/components/site/sections";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `Profile — ${profile.alias}` },
      { name: "description", content: `Who ${profile.alias} is: spec sheet, personality and what drives the late-night sessions.` },
      { property: "og:title", content: `Profile — ${profile.alias}` },
      { property: "og:description", content: `Who ${profile.alias} is and what drives the late-night sessions.` },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { about } = profile;
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10 md:pb-32">
        <PageHeader eyebrow={about.eyebrow} title="Profile" kicker={about.heading} />
        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <img src={about.image} alt="Graphite helmet on a studio plinth" width={1280} height={1600} className="aspect-[4/5] w-full rounded-sm object-cover" />
          </Reveal>
          <div className="space-y-12 md:col-span-7">
            <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </Reveal>
            <Reveal><SpecSheet /></Reveal>
            <Reveal><TuningBars /></Reveal>
            <Reveal className="flex flex-wrap gap-2">
              {about.traits.map((t) => (
                <span key={t} className="rounded-sm border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t}</span>
              ))}
            </Reveal>
            <Reveal><p className="font-serif text-4xl italic">“{about.quote}”</p></Reveal>
          </div>
        </div>
      </div>
      <NowTelemetry />
      <NextPage to="/interests" label="Interests" />
    </>
  );
}
