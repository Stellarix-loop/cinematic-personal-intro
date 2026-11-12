import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Moodboard, NextPage } from "@/components/site/sections";
import { profile } from "@/content/profile";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Gallery — ${profile.alias}` },
      { name: "description", content: `${profile.alias}'s visual moodboard: machines, night streets, the cockpit and the listening room.` },
      { property: "og:title", content: `Gallery — ${profile.alias}` },
      { property: "og:description", content: `${profile.alias}'s visual moodboard.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <PageHeader eyebrow={profile.gallery.eyebrow} title="Gallery" kicker={profile.gallery.heading} />
      </div>
      <Moodboard heading={false} />
      <NextPage to="/contact" label="Connect" />
    </>
  );
}
