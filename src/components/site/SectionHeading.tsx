import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { RevealWords } from "./RevealWords";

type Props = {
  eyebrow: string;
  heading: string;
  highlight?: number[];
  more?: { to: "/about" | "/interests" | "/favorites" | "/gallery" | "/contact"; label: string };
};

export function SectionHeading({ eyebrow, heading, highlight = [], more }: Props) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
        <RevealWords
          text={heading}
          highlight={highlight}
          className="mt-4 max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] md:text-6xl"
        />
      </div>
      {more && (
        <Link
          to={more.to}
          className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {more.label}
          <span className="grid h-9 w-9 place-items-center rounded-full glass transition-transform duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      )}
    </div>
  );
}
