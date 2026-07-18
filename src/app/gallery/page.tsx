import React from "react";
import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/gallery-api";
import GalleryList from "@/components/gallery-list";

export const metadata: Metadata = {
  title: "Gallery — Saeful Rohman",
  description: "Chronicles of my speaking engagements, developer workshops, AI research milestones, and tech activities.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems({ limit: 100 });
  
  // Sort from oldest to newest (ascending order)
  const sortedItems = [...items].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="label text-[var(--mute)]">§ Activity Log</p>
          <h1 className="display-1 mt-6 text-[clamp(3rem,11vw,9rem)]">
            Moments &
            <br />
            <span className="not-italic">captured.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-balance text-lg leading-relaxed text-[var(--ink)]/75 md:text-xl">
            A chronicle of my developer community activities, workshops, key speaking events, hackathons, and experimental lab sessions.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 md:px-10">
        <GalleryList initialItems={sortedItems} />
      </section>
    </>
  );
}
