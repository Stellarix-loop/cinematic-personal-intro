import {
  BookOpen,
  Cpu,
  Gamepad2,
  Headphones,
  Hammer,
  GraduationCap,
  Tv,
  type LucideIcon,
} from "lucide-react";
import moodCity from "@/assets/mood-city.jpg";
import moodSetup from "@/assets/mood-setup.jpg";
import moodMusic from "@/assets/mood-music.jpg";
import moodTech from "@/assets/mood-tech.jpg";
import moodSky from "@/assets/mood-sky.jpg";
import moodAvatar from "@/assets/mood-avatar.jpg";
import holo from "@/assets/holo-sculpture.jpg";

/**
 * ALL site content lives here — edit freely.
 * Everything below is fictional placeholder content. Titles marked as favorites
 * are invented examples; swap them for your real picks. Links are placeholders ("#").
 */

export type Interest = {
  id: string;
  title: string;
  icon: LucideIcon;
  image: string;
  kicker: string;
  description: string;
  highlights: string[];
  tags: string[];
};

export type Favorite = {
  category: string;
  title: string;
  note: string;
  image: string;
  rating: number; // out of 5
};

export type NowItem = {
  label: string;
  title: string;
  detail: string;
  progress: number; // 0–100
  icon: LucideIcon;
};

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Social = { label: string; handle: string; href: string };

export const profile = {
  /** Public alias. `aliasPlain` is used where special characters may not render. */
  alias: "NØVΛ",
  aliasPlain: "NOVA",
  monogram: "N",
  introWords: ["Signal", "Found", "Hello"],
  roles: ["anime soul", "pixel wanderer", "night-owl coder", "playlist curator"],
  tagline:
    "A little corner of the internet for everything I love — stories, games, sound and code.",
  status: "Online · vibing",
  location: "Somewhere online",

  about: {
    eyebrow: "01 — About",
    heading: "The person behind the alias.",
    avatar: moodAvatar,
    paragraphs: [
      "Hey, I'm NØVΛ — a quiet observer of neon skylines and loud playlists. This is my personal hub: part diary, part moodboard, part museum of things I can't stop talking about.",
      "I'm happiest somewhere between a late-night anime binge, a co-op session with friends, and tinkering with a side project that probably doesn't need to exist (but definitely should).",
      "Everything here is a work in progress — just like me. Replace this text with your own story whenever you're ready.",
    ],
    traits: [
      "Night owl",
      "Endlessly curious",
      "Lowkey competitive",
      "Chronic playlist maker",
      "Detail nerd",
      "Soft-spoken, loud taste",
    ],
    stats: [
      { label: "Curiosity", value: 94 },
      { label: "Creativity", value: 88 },
      { label: "Night-owl level", value: 97 },
      { label: "Patience in ranked", value: 41 },
    ],
    quote: "Stay curious. Stay weird. Stay kind.",
  },

  interests: {
    eyebrow: "02 — Interests",
    heading: "Four worlds I live in.",
    items: [
      {
        id: "anime",
        title: "Anime",
        icon: Tv,
        image: moodCity,
        kicker: "Stories in motion",
        description:
          "Slice-of-life comfort shows, sprawling sci-fi epics and the occasional series that ruins me emotionally for a week.",
        highlights: ["Seasonal watchlist", "Soundtrack collector", "Studio art-style nerd"],
        tags: ["Sci-fi", "Slice of life", "Mecha", "Lofi vibes"],
      },
      {
        id: "gaming",
        title: "Gaming",
        icon: Gamepad2,
        image: moodSetup,
        kicker: "Worlds worth getting lost in",
        description:
          "Open worlds, cozy sims and late-night co-op with friends. Equal parts explorer and try-hard.",
        highlights: ["Co-op enjoyer", "Photo-mode addict", "Side-quest completionist"],
        tags: ["RPG", "Co-op", "Indie", "Rhythm"],
      },
      {
        id: "music",
        title: "Music",
        icon: Headphones,
        image: moodMusic,
        kicker: "Always something playing",
        description:
          "Synthwave, city pop, J-rock and anything with a bassline that hits at 2am. Playlists for every mood.",
        highlights: ["Vinyl curious", "Playlist architect", "Concert hopper"],
        tags: ["Synthwave", "City pop", "J-rock", "Lofi"],
      },
      {
        id: "tech",
        title: "Tech",
        icon: Cpu,
        image: moodTech,
        kicker: "Tinkering after midnight",
        description:
          "Building little web experiments, customizing setups and reading about the future way past bedtime.",
        highlights: ["Web experiments", "Custom keyboards", "Desk setup tuning"],
        tags: ["Web", "Hardware", "Creative code", "AI"],
      },
    ] satisfies Interest[],
  },

  favorites: {
    eyebrow: "03 — Favorites",
    heading: "The hall of fame.",
    note: "Placeholder picks — every title here is fictional. Swap in your real favorites.",
    items: [
      { category: "Anime", title: "Starlight Requiem", note: "The finale still lives rent-free in my head.", image: moodSky, rating: 5 },
      { category: "Game", title: "Circuit Ronin", note: "300 hours and still finding secrets.", image: moodSetup, rating: 5 },
      { category: "Album", title: "Midnight Frequency", note: "The perfect late-night drive soundtrack.", image: moodMusic, rating: 4 },
      { category: "City", title: "Neon District 9", note: "A place that only exists in my dreams.", image: moodCity, rating: 5 },
      { category: "Gadget", title: "Prism Keyboard", note: "Clicky, colorful, unnecessary. Perfect.", image: moodTech, rating: 4 },
      { category: "Art", title: "Chrome Bloom", note: "The piece that inspired this whole site.", image: holo, rating: 5 },
    ] satisfies Favorite[],
  },

  now: {
    eyebrow: "04 — Currently",
    heading: "What I'm into right now.",
    items: [
      { label: "Watching", title: "Starlight Requiem S2", detail: "Episode 7 of 12", progress: 58, icon: Tv },
      { label: "Playing", title: "Circuit Ronin", detail: "Chapter 4 · side quests", progress: 72, icon: Gamepad2 },
      { label: "Listening", title: "Midnight Frequency", detail: "On repeat this week", progress: 100, icon: Headphones },
      { label: "Building", title: "This website", detail: "Always tweaking something", progress: 85, icon: Hammer },
      { label: "Reading", title: "A sci-fi novel", detail: "Chapter 12 of 30", progress: 40, icon: BookOpen },
      { label: "Learning", title: "Creative coding", detail: "Shaders & motion", progress: 30, icon: GraduationCap },
    ] satisfies NowItem[],
  },

  gallery: {
    eyebrow: "05 — Moodboard",
    heading: "A visual diary.",
    items: [
      { src: moodAvatar, alt: "Silhouette with neon headphones overlooking a city", caption: "Rooftop thoughts", width: 1024, height: 1280 },
      { src: moodSetup, alt: "Neon-lit gaming desk setup", caption: "The battle station", width: 1280, height: 1024 },
      { src: moodSky, alt: "Anime-style dusk sky with crescent moon", caption: "Dusk o'clock", width: 1024, height: 1024 },
      { src: moodCity, alt: "Rainy neon city street at night", caption: "Rain & neon", width: 1024, height: 1280 },
      { src: moodMusic, alt: "Vinyl record and headphones under neon light", caption: "Side B", width: 1024, height: 1024 },
      { src: moodTech, alt: "Glowing circuit board with holographic code", caption: "3am builds", width: 1280, height: 1024 },
      { src: holo, alt: "Iridescent chrome sculpture", caption: "Chrome bloom", width: 1280, height: 1600 },
    ] satisfies GalleryItem[],
  },

  contact: {
    eyebrow: "06 — Contact",
    heading: "Come say hi.",
    blurb:
      "Want to swap recommendations, team up in a game or just say hello? These are placeholder links — replace them with your own.",
    email: "hello@example.com",
    socials: [
      { label: "Discord", handle: "nova#0000", href: "#" },
      { label: "Instagram", handle: "@your.handle", href: "#" },
      { label: "X / Twitter", handle: "@your_handle", href: "#" },
      { label: "Twitch", handle: "/your-channel", href: "#" },
      { label: "GitHub", handle: "@your-handle", href: "#" },
      { label: "Spotify", handle: "Your playlists", href: "#" },
    ] satisfies Social[],
  },
};
