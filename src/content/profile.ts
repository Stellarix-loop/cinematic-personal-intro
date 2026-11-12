import {
  Camera,
  Code2,
  Film,
  Gamepad2,
  Headphones,
  Palette,
  Plane,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * All site copy lives here. Edit freely — every page reads from this file.
 * Text in [brackets] or marked "placeholder" is meant to be replaced.
 */

export type Interest = {
  title: string;
  blurb: string;
  tags: string[];
  icon: LucideIcon;
};

export type Social = {
  label: string;
  handle: string;
  href: string;
};

export const profile = {
  name: "Mavren",
  initials: "MV",
  /** Words that cycle in the hero after "I'm a…" */
  roles: ["Creator", "Dreamer", "Builder", "Explorer"],
  /** Words that fly in during the cinematic opening */
  introWords: ["Hello", "World", "Meet"],
  tagline: "Welcome to my corner of the internet — a little about who I am and what I love.",
  location: "[Your City], Earth",
  status: "Open to new ideas",

  about: {
    eyebrow: "01 — About",
    heading: "A short story about me.",
    paragraphs: [
      "This is where your introduction goes. Share who you are, what drives you and what you're working on right now — two or three sentences is plenty.",
      "Use this second paragraph for a bit more texture: how you got here, what you're curious about, or the kind of people and projects you love to be around.",
      "Close with something personal — a habit, a philosophy, or the thing that always makes you lose track of time.",
    ],
    facts: [
      { label: "Based in", value: "[Your City]" },
      { label: "Currently", value: "[What you're focused on]" },
      { label: "Learning", value: "[Something new]" },
      { label: "Fueled by", value: "[Your favorite fuel]" },
    ],
  },

  interests: {
    eyebrow: "02 — Interests",
    heading: "Things that light me up.",
    items: [
      {
        title: "Design",
        blurb: "Shapes, color and type — noticing how good design quietly shapes the everyday.",
        tags: ["Visual", "Typography"],
        icon: Palette,
      },
      {
        title: "Music",
        blurb: "Late-night playlists, discovering new artists and the songs on permanent repeat.",
        tags: ["Playlists", "Live shows"],
        icon: Headphones,
      },
      {
        title: "Technology",
        blurb: "Tinkering with new tools and imagining what tomorrow might look like.",
        tags: ["Tools", "Future"],
        icon: Code2,
      },
      {
        title: "Film",
        blurb: "Stories told through light — from cult classics to whatever just came out.",
        tags: ["Cinema", "Stories"],
        icon: Film,
      },
      {
        title: "Photography",
        blurb: "Catching small moments and strange light wherever I happen to be.",
        tags: ["Street", "Color"],
        icon: Camera,
      },
      {
        title: "Travel",
        blurb: "New cities, new food, getting a little lost on purpose.",
        tags: ["Cities", "Food"],
        icon: Plane,
      },
      {
        title: "Gaming",
        blurb: "Worlds worth getting lost in — and the occasional competitive streak.",
        tags: ["Worlds", "Co-op"],
        icon: Gamepad2,
      },
      {
        title: "Ideas",
        blurb: "Notebooks full of half-formed plans waiting for their moment.",
        tags: ["Side projects", "Notes"],
        icon: Sparkles,
      },
    ] satisfies Interest[],
  },

  contact: {
    eyebrow: "03 — Contact",
    heading: "Let's talk.",
    blurb: "Say hi, share an idea, or just send a good song recommendation. These links are placeholders — swap in your own.",
    email: "hello@example.com",
    socials: [
      { label: "Instagram", handle: "@yourhandle", href: "#" },
      { label: "X / Twitter", handle: "@yourhandle", href: "#" },
      { label: "LinkedIn", handle: "/in/yourname", href: "#" },
      { label: "GitHub", handle: "@yourhandle", href: "#" },
    ] satisfies Social[],
  },
};
