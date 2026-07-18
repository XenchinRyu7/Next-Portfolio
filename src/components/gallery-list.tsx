"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiSearch, FiCalendar, FiInbox } from "react-icons/fi";
import type { GalleryItem } from "@/lib/gallery-api";
import ProjectGallery from "@/components/project-gallery";

export default function GalleryList({ initialItems }: { initialItems: GalleryItem[] }) {
  const [search, setSearch] = useState("");

  const filteredItems = initialItems.filter((item) => {
    const terms = `${item.title} ${item.description} ${item.date}`.toLowerCase();
    return terms.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-12">
      {/* Search Input */}
      <div className="relative max-w-md w-full border border-[var(--ink)] bg-[var(--bone)]">
        <span className="absolute inset-y-0 left-4 flex items-center justify-center text-[var(--mute)]">
          <FiSearch className="h-4 w-4" />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activities or speaking gigs..."
          className="w-full bg-transparent py-4 pl-12 pr-4 font-mono text-[11px] uppercase tracking-wider text-[var(--ink)] outline-none placeholder:text-[var(--mute)]/60"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute inset-y-0 right-4 flex items-center justify-center font-mono text-[10px] text-[var(--mute)] hover:text-[var(--ink)]"
          >
            CLEAR
          </button>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-[var(--rule)] bg-[var(--bone)] text-center">
          <FiInbox className="h-10 w-10 text-[var(--mute)] mb-4" />
          <p className="font-serif text-lg italic text-[var(--ink)]/70">
            No activities match your query.
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-4 font-mono text-[11px] uppercase tracking-wider text-[var(--ink)] underline hover:text-[var(--acid)]"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="relative border-l border-[var(--rule)] ml-2 md:ml-4 pl-6 md:pl-10 space-y-16 py-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline marker */}
              <span className="absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--ink)] bg-[var(--bone)] transition-colors duration-300 group-hover:bg-[var(--acid)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
              </span>

              <div className="grid grid-cols-12 gap-6 items-start">
                {/* Text Description Block */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-[var(--mute)]">
                    <FiCalendar className="h-3.5 w-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl italic leading-tight text-[var(--ink)] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-relaxed text-[var(--ink)]/80">
                    {item.description}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/gallery/${item.id}`}
                      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] border border-[var(--ink)] bg-[var(--bone)] px-4 py-2 hover:bg-[var(--ink)] hover:text-[var(--bone)] transition-colors"
                    >
                      View Event Details &rarr;
                    </Link>
                  </div>
                </div>

                {/* Interactive Dynamic Image Grid (using ProjectGallery!) */}
                <div className="col-span-12 lg:col-span-8">
                  <ProjectGallery images={item.images} title={item.title} maxImages={4} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
