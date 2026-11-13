import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/Magnetic";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/RevealWords";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${profile.name}` },
      { name: "description", content: `Say hello to ${profile.name} — email and social links.` },
      { property: "og:title", content: `Contact — ${profile.name}` },
      { property: "og:description", content: `Say hello to ${profile.name} — email and social links.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
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
    <div className="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40">
      <PageHeader eyebrow={contact.eyebrow} title="Contact" kicker={contact.blurb} />

      <Reveal className="mt-16 md:mt-24">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">Drop a line</p>
        <button
          type="button"
          onClick={copy}
          className="group mt-4 flex w-full items-center justify-between gap-4 border-b border-border pb-6 text-left"
          aria-label={`Copy ${contact.email}`}
        >
          <span className="break-all font-display text-[clamp(1.75rem,6.5vw,5.5rem)] font-black leading-none transition-colors duration-500 group-hover:text-spectrum">
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

      <div className="mt-24">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">Elsewhere</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {contact.socials.map((s, i) => (
            <li key={s.label}>
              <Reveal delay={i * 0.08}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group relative flex items-center justify-between overflow-hidden rounded-3xl glass p-6 transition-colors hover:border-primary/50 md:p-8"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-spectrum opacity-15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                  <span className="relative">
                    <span className="block font-display text-2xl font-black uppercase md:text-3xl">{s.label}</span>
                    <span className="mt-1 block font-mono text-xs text-muted-foreground">{s.handle}</span>
                  </span>
                  <ArrowUpRight className="relative h-7 w-7 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
