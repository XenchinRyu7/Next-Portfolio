"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import type { GalleryItem } from "@/lib/gallery-api";

export default function GalleryTeaser({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // If no items, do not render
  if (!items || items.length === 0) return null;

  // We only show up to 3 latest items in the home page teaser
  const teaserItems = items.slice(0, 3);
  const activeItem = teaserItems[activeIndex] || teaserItems[0];

  return (
    <section className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 border-t border-[var(--rule)]">
      {/* Subtle background glow */}
      <div 
        className="absolute left-1/4 top-1/2 -translate-y-1/2 -z-10 h-96 w-96 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--cobalt) 0%, transparent 70%)"
        }}
      />

      <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="label text-[var(--mute)]">§ Chronicles</p>
          <h2 className="display-1 mt-6 text-[clamp(2.5rem,7vw,5.5rem)] leading-none">
            Moments &
            <br />
            <span className="italic">Milestones.</span>
          </h2>
        </div>
        <p className="max-w-md text-balance text-sm leading-relaxed text-[var(--ink)]/75">
          Speaking engagements, workshop training, and key events captured in the field of engineering, software architecture, and AI development.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Cinematic Viewport of Highlighted Event */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[var(--ink)] bg-[var(--ink)] shadow-md">
            {/* Ambient blurring layer for premium crossfade */}
            {teaserItems.map((item, idx) => (
              <div
                key={`img-${item.id}`}
                className={clsx(
                  "absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out",
                  idx === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-[1.03] pointer-events-none"
                )}
                style={{ backgroundImage: `url(${item.images?.[0]?.url})` }}
                aria-hidden={idx !== activeIndex}
              />
            ))}
            
            {/* Bottom info glass overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 text-white backdrop-blur-[2px]">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-white/60">
                <FiCalendar className="h-3 w-3" />
                <span>{activeItem.date}</span>
              </div>
              <h4 className="mt-2 font-serif text-xl italic md:text-2xl text-white">
                {activeItem.title}
              </h4>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline/Selector List */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="flex flex-col divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {teaserItems.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={clsx(
                    "group relative cursor-pointer py-6 transition-all duration-300 flex items-start gap-4 select-none",
                    isSelected ? "pl-4" : "pl-0"
                  )}
                >
                  {/* Highlight bar indicators */}
                  <span
                    className={clsx(
                      "absolute left-0 top-0 bottom-0 w-1 bg-[var(--acid)] transition-transform duration-300 origin-left",
                      isSelected ? "scale-x-100" : "scale-x-0"
                    )}
                  />

                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--mute)] mt-1">
                    /0{idx + 1}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className={clsx(
                          "font-serif text-lg md:text-xl transition-all duration-300",
                          isSelected ? "italic text-[var(--ink)]" : "text-[var(--ink)]/50 group-hover:text-[var(--ink)]"
                        )}
                      >
                        {item.title}
                      </h3>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)] bg-[var(--bone)] px-2 py-0.5 rounded border border-[var(--ink)]/10">
                        {item.date}
                      </span>
                    </div>
                    <p
                      className={clsx(
                        "mt-2 text-[13px] leading-relaxed transition-all duration-300",
                        isSelected ? "text-[var(--ink)]/80" : "text-[var(--ink)]/35 group-hover:text-[var(--ink)]/60 line-clamp-1"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-end justify-end mt-4">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 border border-[var(--ink)] bg-[var(--ink)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)] transition-all duration-300 hover:bg-[var(--acid)] hover:text-[var(--ink)] group"
            >
              Explore Full Gallery
              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
