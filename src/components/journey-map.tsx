"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { journey } from "@/data/journey";

export default function JourneyMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const viewportCenter = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - viewportCenter);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });
      setActiveIdx(bestIdx);

      const sec = sectionRef.current;
      if (sec) {
        const r = sec.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const scrolled = Math.min(
          Math.max(-r.top + window.innerHeight * 0.3, 0),
          total
        );
        setProgress(total > 0 ? scrolled / total : 0);
      }
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40"
    >
      {/* heading */}
      <div className="mb-16 grid grid-cols-1 gap-6 md:mb-24 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="label text-[var(--mute)]">§ 03 · Journey Map</p>
          <h2 className="display-1 mt-4 text-[clamp(3rem,8vw,6.5rem)]">
            The level
            <br />
            <span className="not-italic">select.</span>
          </h2>
        </div>
        <p className="max-w-md text-balance font-sans text-base text-[var(--ink)]/70 md:text-lg">
          A scrolling journey — each node highlights as it reaches the center of
          your screen. High school, mahasiswa, apprenticeship, and the
          informatics engineering boss level.
        </p>
      </div>

      {/* Map container */}
      <div className="relative">
        {/* spine */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 top-0 w-px bg-[var(--rule)] md:left-1/2 left-6 -translate-x-1/2"
        />
        {/* spine progress fill */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 w-px bg-[var(--ink)] md:left-1/2 left-6 -translate-x-1/2 origin-top"
          style={{ height: `${Math.max(4, progress * 100)}%` }}
        />

        <ul className="flex flex-col gap-20 md:gap-36">
          {journey.map((stage, i) => {
            const active = i === activeIdx;
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <li key={stage.id}>
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  data-active={active}
                  className="journey-node relative grid min-h-[40vh] grid-cols-[56px_1fr] items-center gap-6 md:grid-cols-2 md:gap-0"
                >
                  {/* Node circle (mobile: left; desktop: center, shared via absolute) */}
                  <div className="col-start-1 row-start-1 flex items-center justify-center md:hidden">
                    <NodeCircle index={i} active={active} />
                  </div>

                  {/* Desktop: absolute center node */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                    <NodeCircle index={i} active={active} />
                  </div>

                  {/* Content card */}
                  <div
                    className={clsx(
                      "col-start-2 row-start-1",
                      side === "left"
                        ? "md:col-start-1 md:pr-20 md:text-right"
                        : "md:col-start-2 md:pl-20"
                    )}
                  >
                    <StageCard stage={stage} side={side} active={active} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function NodeCircle({ index, active }: { index: number; active: boolean }) {
  return (
    <div className="relative">
      <div
        className={clsx(
          "relative flex h-12 w-12 items-center justify-center rounded-full border border-[var(--ink)] font-mono text-xs transition-all duration-500",
          active
            ? "h-16 w-16 bg-[var(--acid)] text-[var(--ink)] shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
            : "bg-[var(--bone)] text-[var(--ink)]"
        )}
      >
        <span className="tracking-[0.12em]">
          {String(index + 1).padStart(2, "0")}
        </span>
        {active && <span className="pulse-ring" aria-hidden />}
      </div>
    </div>
  );
}

function StageCard({
  stage,
  side,
  active,
}: {
  stage: (typeof import("@/data/journey").journey)[number];
  side: "left" | "right";
  active: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative inline-block max-w-xl transition-all duration-500",
        active
          ? "bg-[var(--bone)]"
          : ""
      )}
    >
      {/* Connector horizontal line (desktop only) */}
      <div
        aria-hidden
        className={clsx(
          "absolute top-1/2 hidden h-px bg-[var(--rule)] md:block transition-colors duration-500",
          active && "bg-[var(--ink)]",
          side === "left"
            ? "right-[-5rem] w-20"
            : "left-[-5rem] w-20"
        )}
      />
      <div
        className={clsx(
          "relative border p-6 transition-all duration-500 md:p-8",
          active
            ? "border-[var(--ink)] bg-[var(--bone)] shadow-[12px_12px_0_0_var(--ink)]"
            : "border-[var(--rule)] bg-[var(--bone)]/60"
        )}
      >
        <div
          className={clsx(
            "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]",
            side === "left" ? "md:justify-end" : ""
          )}
        >
          <span className="chip">{stage.tag}</span>
          <span className="text-[var(--mute)]">{stage.year}</span>
        </div>
        <h3 className="mt-5 font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium italic leading-[1.02] tracking-[-0.02em]">
          {stage.title}
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--mute)]">
          {stage.place}
        </p>
        <p className="mt-5 text-balance text-[15px] leading-relaxed text-[var(--ink)]/80 md:text-base">
          {stage.description}
        </p>
        <ul
          className={clsx(
            "mt-6 flex flex-wrap gap-2",
            side === "left" ? "md:justify-end" : ""
          )}
        >
          {stage.highlights.map((h) => (
            <li
              key={h}
              className="border border-[var(--ink)]/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
            >
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
