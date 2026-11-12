import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="carbon relative z-10">
      <div className="h-[3px] livery-stripe" />
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="font-display text-[clamp(3rem,12vw,8rem)] font-black uppercase leading-none font-wide text-chrome">
            {profile.alias}
          </p>
          <ul className="grid grid-cols-3 gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em]">
            {profile.contact.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {profile.alias} · {profile.edition}
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
