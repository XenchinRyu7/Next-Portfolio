"use client";

import { useEffect, useState } from "react";
import CanvasCard from "./canvas-card";
import TextRevealCard from "./text-reveal-card";
import ScrollReveal from "./scroll-reveal";

/**
 * Bento Grid section containing live clock, academics stats,
 * and mouse-interactive Canvas/TextReveal sandboxes.
 */
export default function BentoGrid() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 border-t border-[var(--rule)]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <ScrollReveal>
            <p className="label text-[var(--mute)]">§ Sandbox & Info</p>
          </ScrollReveal>
          <ScrollReveal mode="words" stagger={0.06}>
            <h2 className="display-2 mt-6 text-[clamp(3rem,8vw,6rem)] leading-none">
              Interactive Space.
            </h2>
          </ScrollReveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          {/* Row 1: Bio (col-span-2) + Stats (col-span-1) */}
          <div className="md:col-span-2">
            <ScrollReveal className="h-full">
              <BioCard />
            </ScrollReveal>
          </div>
          
          <div>
            <ScrollReveal className="h-full">
              <StatsCard />
            </ScrollReveal>
          </div>

          {/* Row 2: Canvas (col-span-1) + TextReveal (col-span-1) + Clock (col-span-1) */}
          <div>
            <ScrollReveal className="h-full">
              <CanvasCard />
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal className="h-full">
              <TextRevealCard />
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal className="h-full">
              <LiveClock />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

function BioCard() {
  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[var(--ink)]/15 bg-[var(--bone)] p-6 transition-colors hover:border-[var(--ink)]">
      <div className="absolute inset-0 hatch opacity-[0.07] pointer-events-none" />
      <div>
        <span className="label text-[var(--mute)]">§ Core Focus</span>
        <h3 className="mt-4 font-serif text-2xl md:text-3xl italic leading-tight text-[var(--ink)] max-w-xl">
          Crafting intelligent systems where code meets intent.
        </h3>
      </div>
      <p className="mt-8 text-[14px] leading-relaxed text-[var(--ink)]/75 max-w-xl">
        I engineer software at the intersection of fullstack web, mobile platforms, and AI orchestration. My focus is building performant scaffolding, clean architectures, and experiences that feel natural to steer.
      </p>
    </div>
  );
}

function StatsCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-[var(--ink)]/15 bg-[var(--bone)] p-5 transition-colors hover:border-[var(--ink)]">
      <div>
        <span className="label text-[var(--mute)]">§ Academics</span>
        <h3 className="mt-3 font-serif text-xl italic leading-tight text-[var(--ink)]">
          Informatics Engineering
        </h3>
      </div>
      <div className="my-4">
        <p className="font-mono text-5xl font-bold tracking-tight text-[var(--plum)]">
          3.83
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[var(--ink)]/50">
          Cumulative GPA &middot; Cum Laude
        </p>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/60">
        Teknik Informatika Graduate
      </p>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-[var(--ink)]/15 bg-[var(--bone)] p-5 transition-colors hover:border-[var(--ink)]">
      <div>
        <span className="label text-[var(--mute)]">§ Realtime Clock</span>
        <h3 className="mt-3 font-serif text-xl italic leading-tight text-[var(--ink)]">
          Jakarta, ID
        </h3>
      </div>
      <div className="my-4">
        <p className="font-mono text-4xl font-semibold tracking-wider text-[var(--plum)]">
          {time || "00:00:00"}
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[var(--ink)]/50">
          UTC+7 &middot; Western Indonesian Time
        </p>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/60">
        Live UTC Feed
      </p>
    </div>
  );
}
