import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import { getGalleryItem, getGalleryItems } from "@/lib/gallery-api";
import ProjectGallery from "@/components/project-gallery";
import MistTitle from "@/components/mist-title";

type Params = { id: string };

export async function generateStaticParams(): Promise<Params[]> {
  const items = await getGalleryItems({ limit: 100 });
  return items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const item = await getGalleryItem(params.id);
  if (!item) return { title: "Activity not found" };
  return {
    title: `${item.title} — Saeful Rohman`,
    description: item.description,
  };
}

export default async function GalleryDetailPage({ params }: { params: Params }) {
  const item = await getGalleryItem(params.id);
  if (!item) return notFound();

  const paragraphs = item.description.split("\n").filter((p) => p.trim() !== "");
  const firstParagraph = paragraphs[0] || "";
  const otherParagraphs = paragraphs.slice(1);

  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)] hover:text-[var(--ink)]"
          >
            &larr; All activities
          </Link>
          <p className="label mt-10 text-[var(--mute)]">
            § Event Captured &bull; {item.date}
          </p>
          <div className="mt-6 md:mt-10">
            <MistTitle reflectHeight={0.5}>
              <h1 className="display-1 text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.9] text-[var(--ink)]">
                {item.title}.
              </h1>
            </MistTitle>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="mx-auto mt-16 max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-8 items-start border-t border-[var(--rule)] pt-12">
          {/* Left Block: Description */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
              Overview
            </p>
            {firstParagraph && (
              <p className="font-serif text-xl md:text-2xl leading-relaxed text-[var(--ink)]/90 first-letter:float-left first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:text-[var(--acid)] first-letter:leading-[0.8] first-letter:mt-1">
                {firstParagraph}
              </p>
            )}
            {otherParagraphs.map((para, idx) => (
              <p key={idx} className="text-base md:text-lg leading-relaxed text-[var(--ink)]/75 mt-4">
                {para}
              </p>
            ))}
          </div>

          {/* Right Block: Event Metadata */}
          <div className="col-span-12 lg:col-span-4 border border-[var(--ink)] bg-[var(--bone)] p-6 shadow-sm">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)] border-b border-[var(--rule)] pb-3">
              Event Details
            </h4>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <FiCalendar className="h-4 w-4 text-[var(--mute)]" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)]">Date</p>
                  <p className="font-serif text-sm italic">{item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiClock className="h-4 w-4 text-[var(--mute)]" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)]">Imported At</p>
                  <p className="font-serif text-sm italic">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="h-4 w-4 text-[var(--mute)]" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)]">Context</p>
                  <p className="font-serif text-sm italic">Community Event</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Large Immersive Photo Grid */}
      <section className="mx-auto mt-16 max-w-[1400px] px-5 md:px-10 pb-24 md:pb-32">
        <div className="border-t border-[var(--rule)] pt-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)] mb-8">
            Captured Gallery ({item.images.length} photos)
          </p>
          <ProjectGallery images={item.images} title={item.title} />
        </div>
      </section>
    </>
  );
}
