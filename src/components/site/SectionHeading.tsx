import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { RevealWords } from "./RevealWords";

type Props = {
  eyebrow: string;
  heading: string;
  highlight?: number[];
  more?: { to: "/about" | "/interests" | "/gallery" | "/contact"; label: string };
};

/** Editorial section opener: index label, hairline rule, expanded headline. */
export function SectionHeading({ eyebrow, heading, highlight = [], more }: Props) {
  return (
    <div>
      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="text-primary">{eyebrow}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <RevealWords
          text={heading}
          highlight={highlight}
          className="max-w-4xl font-display text-[clamp(2.25rem,6vw,4.75rem)] font-extrabold uppercase leading-[0.92] font-wide"
        />
        {more && (
          <Link
            to={more.to}
            className="group inline-flex shrink-0 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
          >
            {more.label}
            <span className="grid h-9 w-9 place-items-center rounded-sm border border-border transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
