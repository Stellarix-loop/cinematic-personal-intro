import { ArrowUp } from "lucide-react";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center md:px-10">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="hidden sm:block">Made with curiosity</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  );
}
