import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/RevealWords";
import { FavoritesCollection, NextPage } from "@/components/site/sections";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/interests")({
  head: () => ({
    meta: [
      { title: `Interests — ${profile.alias}` },
      { name: "description", content: `Anime, gaming, music and tech — the four disciplines ${profile.alias} keeps tuning.` },
      { property: "og:title", content: `Interests — ${profile.alias}` },
      { property: "og:description", content: `Anime, gaming, music and tech with ${profile.alias}.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InterestsPage,
});

function InterestsPage() {
  const { interests } = profile;
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <PageHeader eyebrow={interests.eyebrow} title="Interests" kicker={interests.heading} />
        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {interests.items.map((it, i) => (
            <Reveal key={it.id} className="grid gap-8 md:grid-cols-12 md:items-center">
              <img src={it.image} alt={it.title} loading="lazy" className={`aspect-[16/10] w-full rounded-sm object-cover md:col-span-7 ${i % 2 ? "md:order-2" : ""}`} />
              <div className="md:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">{String(i + 1).padStart(2, "0")} · {it.kicker}</p>
                <h2 className="mt-4 font-display text-5xl font-black uppercase font-wide md:text-6xl">{it.title}</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">{it.description}</p>
                <dl className="mt-8 divide-y divide-border border-y border-border">
                  {it.specs.map((s) => (
                    <div key={s.label} className="flex justify-between py-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                      <dt className="text-muted-foreground">{s.label}</dt><dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-wrap gap-2">
                  {it.tags.map((t) => <span key={t} className="rounded-sm border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <FavoritesCollection />
      <NextPage to="/gallery" label="Gallery" />
    </>
  );
}
