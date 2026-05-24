"use client";

import { useEffect, useRef, useState } from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiUnity,
  SiPython,
  SiTailwindcss,
  SiOpenai,
  SiDocker,
  SiPostgresql,
  SiNodedotjs,
  SiFigma,
  SiGreensock,
  SiKotlin,
  SiSwift,
  SiGo,
  SiRust,
  SiGodotengine,
} from "react-icons/si";
import type { IconType } from "react-icons";

const icons: { I: IconType; label: string }[] = [
  { I: SiNextdotjs, label: "Next.js" },
  { I: SiReact, label: "React" },
  { I: SiTypescript, label: "TypeScript" },
  { I: SiFlutter, label: "Flutter" },
  { I: SiUnity, label: "Unity" },
  { I: SiGodotengine, label: "Godot" },
  { I: SiPython, label: "Python" },
  { I: SiOpenai, label: "OpenAI" },
  { I: SiGreensock, label: "GSAP" },
  { I: SiTailwindcss, label: "Tailwind" },
  { I: SiNodedotjs, label: "Node" },
  { I: SiPostgresql, label: "Postgres" },
  { I: SiDocker, label: "Docker" },
  { I: SiFigma, label: "Figma" },
  { I: SiKotlin, label: "Kotlin" },
  { I: SiSwift, label: "Swift" },
  { I: SiGo, label: "Go" },
  { I: SiRust, label: "Rust" },
];

// Deterministic pseudo-random positions so SSR/CSR match.
const positions = Array.from({ length: icons.length }).map((_, i) => {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  const t = Math.sin(i * 78.233 + 1) * 43758.5453;
  return {
    x: ((s - Math.floor(s)) * 86) + 7, // 7..93 vw
    y: ((t - Math.floor(t)) * 72) + 14, // 14..86 vh
    scale: 0.6 + ((Math.sin(i * 3.17) + 1) / 2) * 0.9,
    depth: 0.2 + ((Math.cos(i * 1.71) + 1) / 2) * 0.8,
  };
});

/**
 * Full-viewport cold-open title card with a floating constellation of
 * programming icons. As the user scrolls, the two halves split apart like
 * cinema curtains and the icons drift with parallax.
 */
export default function CurtainIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 = fully closed, 1 = fully open

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const root = rootRef.current;
      if (root) {
        const h = root.offsetHeight;
        // progress based on how much of the 200vh-tall wrapper has scrolled
        const p = Math.max(0, Math.min(1, window.scrollY / (h - window.innerHeight)));
        setProgress(p);
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

  // Curtain splits horizontally. Each half translates X by up to 55%.
  const split = progress * 55;
  // Icons drift: parallax-like, different axes per icon
  const driftY = progress * 40;
  // Welcome text fades out / shrinks as curtain opens
  const welcomeOpacity = Math.max(0, 1 - progress * 1.4);
  const welcomeScale = 1 - progress * 0.08;

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{ height: "220vh" }}
    >
      {/* Sticky container pins for the full 220vh range */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[var(--ink)] text-[var(--bone)]">
        {/* Constellation background (always behind curtains) */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 45%, rgba(255,61,46,0.22) 0%, rgba(255,61,46,0.06) 35%, transparent 70%)",
            }}
          />
          {icons.map(({ I, label }, i) => {
            const p = positions[i];
            const tx = (p.depth - 0.5) * progress * 120;
            const ty = driftY * p.depth;
            return (
              <div
                key={label}
                className="absolute"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: `translate(${tx}px, ${ty}px) scale(${p.scale})`,
                  opacity: 0.28 + p.depth * 0.55,
                  transition: "opacity 400ms ease",
                  willChange: "transform",
                }}
              >
                <I
                  className="h-10 w-10 md:h-14 md:w-14"
                  style={{ color: "#f2ede2" }}
                  aria-hidden
                />
              </div>
            );
          })}
        </div>

        {/* Grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(242,237,226,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,237,226,0.08) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* LEFT CURTAIN */}
        <div
          className="absolute left-0 top-0 z-10 h-full w-1/2 overflow-hidden"
          style={{
            transform: `translateX(-${split}%)`,
            transition: "transform 120ms linear",
            willChange: "transform",
            background:
              "linear-gradient(125deg, #0a0a0a 0%, #161212 60%, #2a0f08 100%)",
            boxShadow: "20px 0 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* curtain folds */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(255,61,46,0.06) 0, rgba(255,61,46,0.06) 2px, transparent 2px, transparent 36px)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-[120px]"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,0,0,0.55))",
            }}
          />
        </div>

        {/* RIGHT CURTAIN */}
        <div
          className="absolute right-0 top-0 z-10 h-full w-1/2 overflow-hidden"
          style={{
            transform: `translateX(${split}%)`,
            transition: "transform 120ms linear",
            willChange: "transform",
            background:
              "linear-gradient(55deg, #0a0a0a 0%, #161212 60%, #2a0f08 100%)",
            boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(255,61,46,0.06) 0, rgba(255,61,46,0.06) 2px, transparent 2px, transparent 36px)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[120px]"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(0,0,0,0.55))",
            }}
          />
        </div>

        {/* Centre split seam (thin glowing line) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-20 h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,61,46,0.8), transparent)",
            opacity: Math.min(1, progress * 3),
          }}
        />

        {/* WELCOME copy (over curtains) */}
        <div
          className="relative z-30 flex h-full flex-col items-center justify-center px-5 text-center"
          style={{
            opacity: welcomeOpacity,
            transform: `scale(${welcomeScale})`,
            transition: "transform 120ms linear, opacity 120ms linear",
          }}
        >
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--bone)]/70">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--plum)] opacity-80" />
              <span className="relative inline-block h-2 w-2 rounded-full bg-[var(--plum)]" />
            </span>
            <span>Now entering · a portfolio film</span>
            <span className="hidden md:inline">· presented in 35mm</span>
          </div>

          <h1 className="mt-10 font-serif text-[clamp(2rem,4.2vw,3.4rem)] font-light italic leading-[1.05] text-[var(--bone)]/85">
            Welcome to the world of
          </h1>
          <p
            className="mt-4 font-serif text-[clamp(3.5rem,10vw,9rem)] italic leading-[0.9] tracking-[-0.03em] text-[var(--bone)]"
          >
            Saeful Rohman.
          </p>
          <p className="mt-10 max-w-xl text-balance font-sans text-[13px] leading-relaxed text-[var(--bone)]/65 md:text-[15px]">
            Computer Science · Mobile · Fullstack · Games · AI Engineering.
            Scroll to open.
          </p>

          {/* Scroll pill */}
          <div className="mt-16 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--bone)]/60">
            <span>scroll</span>
            <span className="relative block h-10 w-[1.5px] overflow-hidden bg-[var(--bone)]/20">
              <span
                className="absolute inset-x-0 top-0 h-3 bg-[var(--plum)]"
                style={{
                  animation: "curtain-scroll 1.6s ease-in-out infinite",
                }}
              />
            </span>
            <span>to open</span>
          </div>
        </div>

        {/* "AS THE CURTAINS OPEN" subtitle (appears as it opens) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-12 z-30 flex justify-center text-center"
          style={{
            opacity: Math.max(0, Math.min(1, (progress - 0.25) * 2.2)),
            transform: `translateY(${(1 - progress) * 16}px)`,
            transition: "opacity 160ms linear, transform 160ms linear",
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--bone)]/75 md:text-[11px]">
            · fade in · act I · the cold open ·
          </p>
        </div>
      </div>
    </div>
  );
}
