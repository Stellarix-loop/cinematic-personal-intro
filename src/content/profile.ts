import { Code2, Disc3, Film, Gamepad2, Gauge, Headphones, Wrench, type LucideIcon } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import tunnel from "@/assets/gallery-tunnel.jpg";
import rig from "@/assets/gallery-rig.jpg";
import headphones from "@/assets/gallery-headphones.jpg";
import tokyo from "@/assets/gallery-tokyo.jpg";
import detail from "@/assets/gallery-detail.jpg";
import keyboard from "@/assets/gallery-keyboard.jpg";
import helmet from "@/assets/gallery-helmet.jpg";

/**
 * ALL site content lives here — edit freely.
 * Bio text, favorites and "currently" items are placeholders: swap in your real picks.
 * Social links below are the real public profiles.
 */

export type Interest = {
  id: string;
  code: string;
  title: string;
  icon: LucideIcon;
  image: string;
  kicker: string;
  description: string;
  specs: { label: string; value: string }[];
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
  plate: string;
  width: number;
  height: number;
};

export type Social = { label: string; handle: string; href: string; cta: string };

export const profile = {
  alias: "BL4Z3",
  monogram: "B4",
  heroImage: heroCar,
  introWords: ["Ignition", "Telemetry", "Online"],
  roles: ["Sim racer", "Anime watcher", "Music curator", "Tech tinkerer"],
  tagline: "A personal hub tuned for late nights — racing lines, anime, sound and code.",
  status: "Online",
  edition: "Personal Hub · Edition 01",

  about: {
    eyebrow: "01 — Profile",
    heading: "The driver behind the alias.",
    image: helmet,
    paragraphs: [
      "I go by BL4Z3. This is my personal hub — part garage, part listening room, part archive of the stories and games that stuck with me.",
      "Most nights you'll find me chasing a cleaner lap, deep in a series, building a playlist for the drive home, or tinkering with something on my desk that doesn't strictly need improving.",
      "This text is a placeholder. Swap it for your own story whenever you're ready.",
    ],
    specs: [
      { label: "Designation", value: "BL4Z3" },
      { label: "Class", value: "Creator / Gamer" },
      { label: "Base", value: "Online" },
      { label: "Peak hours", value: "22:00 — 03:00" },
      { label: "Fuel", value: "Playlists & coffee" },
      { label: "Mode", value: "Always tuning" },
    ],
    tuning: [
      { label: "Focus", value: 92 },
      { label: "Curiosity", value: 96 },
      { label: "Late-night output", value: 98 },
      { label: "Patience in traffic", value: 34 },
    ],
    traits: ["Night driver", "Detail obsessed", "Quietly competitive", "Playlist architect", "Always learning"],
    quote: "Smooth is fast. Fast is smooth.",
  },

  interests: {
    eyebrow: "02 — Disciplines",
    heading: "Four disciplines, one garage.",
    items: [
      {
        id: "anime",
        code: "AN",
        title: "Anime",
        icon: Film,
        image: tokyo,
        kicker: "Stories with craft",
        description:
          "Character-driven drama, grounded sci-fi and series with real direction — the kind of shows where every frame is composed with intent.",
        specs: [
          { label: "Genre", value: "Sci-fi / Drama" },
          { label: "Format", value: "Seasonal + classics" },
          { label: "Watching for", value: "Direction & score" },
        ],
        tags: ["Sci-fi", "Seinen", "Psychological", "Soundtracks"],
      },
      {
        id: "gaming",
        code: "GM",
        title: "Gaming",
        icon: Gamepad2,
        image: rig,
        kicker: "Racing lines & long campaigns",
        description:
          "Sim racing on a wheel and pedals, competitive sessions with friends and the occasional story game worth a slow, careful playthrough.",
        specs: [
          { label: "Main", value: "Sim racing" },
          { label: "Setup", value: "Wheel & pedals" },
          { label: "Style", value: "Clean & consistent" },
        ],
        tags: ["Sim racing", "Time trials", "Co-op", "Story games"],
      },
      {
        id: "music",
        code: "MS",
        title: "Music",
        icon: Headphones,
        image: headphones,
        kicker: "Always something playing",
        description:
          "Electronic, alt-R&B and late-night drive music. Playlists are built like setups: tuned for a mood, a road and a time of day.",
        specs: [
          { label: "Sound", value: "Electronic / R&B" },
          { label: "Context", value: "Night drives" },
          { label: "Format", value: "Curated playlists" },
        ],
        tags: ["Electronic", "Alt-R&B", "Phonk", "Ambient"],
      },
      {
        id: "tech",
        code: "TC",
        title: "Tech",
        icon: Code2,
        image: keyboard,
        kicker: "Tuning the setup",
        description:
          "Desk setups, keyboards, streaming gear and small web projects. Interested in how things are made, then how to make them a little better.",
        specs: [
          { label: "Focus", value: "Setups & streaming" },
          { label: "Builds", value: "Web projects" },
          { label: "Weakness", value: "New hardware" },
        ],
        tags: ["Hardware", "Streaming", "Web", "Keyboards"],
      },
    ] satisfies Interest[],
  },

  favorites: {
    eyebrow: "03 — Collection",
    heading: "The collection.",
    note: "Placeholder picks — swap in your real favorites.",
    items: [
      { category: "Series", title: "Night Circuit", note: "Placeholder · the one I rewatch every year.", image: tokyo, rating: 5 },
      { category: "Game", title: "Endurance Line", note: "Placeholder · hundreds of laps, still learning.", image: rig, rating: 5 },
      { category: "Album", title: "Low Frequency Drive", note: "Placeholder · built for the motorway at 2am.", image: headphones, rating: 4 },
      { category: "Machine", title: "Silver Coupé", note: "Placeholder · the dream car on the wall.", image: detail, rating: 5 },
      { category: "Setup", title: "Graphite Desk", note: "Placeholder · forever being tuned.", image: keyboard, rating: 4 },
      { category: "Place", title: "The Long Tunnel", note: "Placeholder · favourite stretch of road.", image: tunnel, rating: 5 },
    ] satisfies Favorite[],
  },

  now: {
    eyebrow: "04 — Live",
    heading: "Live telemetry.",
    items: [
      { label: "Watching", title: "A new season", detail: "Episode 7 of 12", progress: 58, icon: Film },
      { label: "Racing", title: "Time trial league", detail: "Chasing 0.3s", progress: 74, icon: Gauge },
      { label: "Listening", title: "Night drive playlist", detail: "On repeat", progress: 100, icon: Disc3 },
      { label: "Building", title: "This website", detail: "Always tweaking", progress: 86, icon: Wrench },
    ] satisfies NowItem[],
  },

  gallery: {
    eyebrow: "05 — Gallery",
    heading: "Visual moodboard.",
    items: [
      { src: heroCar, alt: "Silver coupe in a pale grey studio", caption: "Studio session", plate: "01", width: 1920, height: 1088 },
      { src: tunnel, alt: "Light trails in a night tunnel", caption: "Long exposure", plate: "02", width: 1280, height: 1600 },
      { src: rig, alt: "Racing simulator cockpit in a dark room", caption: "The cockpit", plate: "03", width: 1600, height: 1072 },
      { src: helmet, alt: "Matte graphite helmet with a blue stripe", caption: "Race kit", plate: "04", width: 1280, height: 1600 },
      { src: tokyo, alt: "Quiet Tokyo street after rain", caption: "After the rain", plate: "05", width: 1280, height: 1600 },
      { src: detail, alt: "Close-up of a silver car headlight", caption: "Lines & light", plate: "06", width: 1600, height: 1072 },
      { src: headphones, alt: "Studio headphones on brushed aluminum", caption: "Listening room", plate: "07", width: 1280, height: 1280 },
      { src: keyboard, alt: "Keyboard and laptop on a graphite desk", caption: "The desk", plate: "08", width: 1600, height: 1072 },
    ] satisfies GalleryItem[],
  },

  contact: {
    eyebrow: "06 — Connect",
    heading: "Find me on the grid.",
    blurb: "Clips, streams, playlists and late-night chats. Pick a channel.",
    socials: [
      { label: "YouTube", handle: "@lightsyncc", href: "https://youtube.com/@lightsyncc", cta: "Watch videos" },
      { label: "Twitch", handle: "lightsyncc", href: "https://www.twitch.tv/lightsyncc", cta: "Catch a stream" },
      { label: "TikTok", handle: "Short clips", href: "https://vm.tiktok.com/ZS9f9RnpKH3Pf-BjlOW/", cta: "Watch clips" },
      { label: "X", handle: "@LIGHTSYNCC", href: "https://x.com/LIGHTSYNCC", cta: "Follow" },
      { label: "Discord", handle: "Add me", href: "https://discord.com/users/1432325408367443999", cta: "Say hi" },
      { label: "Spotify", handle: "Playlists", href: "https://open.spotify.com/user/31xrdrxtsj2egf3ifzcnigdol3dm", cta: "Listen" },
    ] satisfies Social[],
  },
};
