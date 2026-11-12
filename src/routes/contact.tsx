import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/RevealWords";
import { SocialGrid } from "@/components/site/sections";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Connect — ${profile.alias}` },
      { name: "description", content: `Find ${profile.alias} on YouTube, Twitch, TikTok, X, Discord and Spotify.` },
      { property: "og:title", content: `Connect — ${profile.alias}` },
      { property: "og:description", content: `Find ${profile.alias} on YouTube, Twitch, TikTok, X, Discord and Spotify.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { contact } = profile;
  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40">
      <PageHeader eyebrow={contact.eyebrow} title="Connect" kicker={contact.blurb} />
      <Reveal className="mt-16 md:mt-24"><SocialGrid /></Reveal>
    </div>
  );
}
