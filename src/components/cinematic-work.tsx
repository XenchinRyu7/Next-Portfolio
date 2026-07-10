"use client";

import Link from "next/link";
import clsx from "clsx";
import type { Project } from "@/data/projects";
import { formatTimeline } from "@/lib/project-api";
import ScrollReveal from "@/components/scroll-reveal";
import Parallax from "@/components/parallax";

const accentMap: Record<Project["accent"], { bg: string; ink: string; glow: string; textAccent: string }> = {
  acid: { bg: "#050505", ink: "#fbfbfa", glow: "rgba(202, 250, 54, 0.08)", textAccent: "#cafa36" },
  plum: { bg: "#050505", ink: "#fbfbfa", glow: "rgba(255, 61, 46, 0.08)", textAccent: "#ff5247" },
  cobalt: { bg: "#050505", ink: "#fbfbfa", glow: "rgba(42, 42, 254, 0.09)", textAccent: "#5c5cff" },
  ink: { bg: "#050505", ink: "#fbfbfa", glow: "rgba(255, 255, 255, 0.06)", textAccent: "#ffffff" },
};

/**
 * Full-viewport cinematic project poster. Scroll through a series of these
 * like scenes from a film.
 */
export default function CinematicWork({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const c = accentMap[project.accent];
  const align = index % 2 === 0 ? "left" : "right";

  return (
    <Link
      href={`/work/${project.slug}`}
      data-parallax-scope
      className="group relative block min-h-[90vh] w-full overflow-hidden border-b border-white/10 bg-[#050505] text-[#fbfbfa] transition-colors duration-500 hover:bg-[#080808]"
    >
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out opacity-60 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(1000px circle at ${align === "left" ? "35%" : "65%"} 45%, ${c.glow} 0%, transparent 65%)`
        }}
      />

      {/* Grid line patterns */}
      <div className="absolute inset-0 z-0 opacity-[0.03] hatch pointer-events-none" />

      {/* Parallax elements */}
      <Parallax speed={-40} className="absolute inset-0 z-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </Parallax>

      {/* HUD top */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 md:px-10 md:pt-12">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.textAccent }} />
          Scene {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="hidden md:inline">
          {project.kind} &middot; {formatTimeline(project.startDate, project.endDate, project.status)}
        </span>
      </div>

      {/* Title cluster */}
      <div
        className={clsx(
          "relative z-10 mx-auto flex max-w-[1400px] flex-col px-5 pb-16 pt-[12vh] md:px-10 md:pb-24",
          align === "right" && "md:items-end md:text-right"
        )}
      >
        <ScrollReveal start="top 85%">
          <p className="label text-white/35">§ {project.kind}</p>
        </ScrollReveal>

        <ScrollReveal mode="words" stagger={0.05} start="top 85%">
          <h3
            className="display-1 mt-6 text-[clamp(3.25rem,11vw,9.5rem)] text-white font-bold tracking-tight transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            style={{ lineHeight: 0.9 }}
          >
            {project.title}.
          </h3>
        </ScrollReveal>

        <ScrollReveal mode="words" stagger={0.03} start="top 80%">
          <p
            data-split
            className={clsx(
              "mt-8 max-w-2xl text-balance font-serif text-[clamp(1.1rem,1.7vw,1.45rem)] italic leading-[1.25] text-white/70 transition-colors duration-500 group-hover:text-white/90",
              align === "right" && "md:ml-auto"
            )}
          >
            {project.tagline}
          </p>
        </ScrollReveal>

        {/* Stack HUD */}
        <ScrollReveal
          className={clsx(
            "mt-10 flex flex-wrap gap-2",
            align === "right" && "md:justify-end"
          )}
          stagger={0.06}
          start="top 80%"
        >
          {project.technologies.slice(0, 6).map((s) => (
            <span
              key={s}
              className="border border-white/10 bg-white/[0.02] backdrop-blur-sm px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/50 transition-colors duration-500 group-hover:border-white/20 group-hover:text-white/80"
            >
              {s}
            </span>
          ))}
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal
          className={clsx(
            "mt-16 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 transition-colors duration-500 group-hover:text-white/80",
            align === "right" && "md:justify-end"
          )}
          stagger={0.08}
          start="top 80%"
        >
          <span
            className="relative block h-px w-16 transition-[width] duration-500 group-hover:w-28"
            style={{ background: "rgba(255,255,255,0.4)" }}
          />
          <span>Enter case study</span>
          <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1.5" style={{ color: c.textAccent }}>
            ↗
          </span>
        </ScrollReveal>
      </div>
    </Link>
  );
}
