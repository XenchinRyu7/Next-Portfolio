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
  SiHuggingface,
  SiDocker,
  SiPostgresql,
  SiNodedotjs,
  SiFigma,
  SiKubernetes,
  SiKotlin,
  SiSwift,
  SiGo,
  SiRust,
  SiGodotengine,
} from "react-icons/si";
import type { IconType } from "react-icons";

const icons: { I: IconType; label: string; color: string }[] = [
  { I: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { I: SiReact, label: "React", color: "#61dafb" },
  { I: SiTypescript, label: "TypeScript", color: "#3178c6" },
  { I: SiFlutter, label: "Flutter", color: "#02569b" },
  { I: SiUnity, label: "Unity", color: "#ffffff" },
  { I: SiGodotengine, label: "Godot", color: "#478cbf" },
  { I: SiPython, label: "Python", color: "#3776ab" },
  { I: SiHuggingface, label: "Hugging Face", color: "#ffd21e" },
  { I: SiKubernetes, label: "Kubernetes", color: "#326ce5" },
  { I: SiTailwindcss, label: "Tailwind", color: "#06b6d4" },
  { I: SiNodedotjs, label: "Node", color: "#339933" },
  { I: SiPostgresql, label: "Postgres", color: "#4169e1" },
  { I: SiDocker, label: "Docker", color: "#2496ed" },
  { I: SiFigma, label: "Figma", color: "#f24e1e" },
  { I: SiKotlin, label: "Kotlin", color: "#7f52ff" },
  { I: SiSwift, label: "Swift", color: "#f05138" },
  { I: SiGo, label: "Go", color: "#00add8" },
  { I: SiRust, label: "Rust", color: "#ea2b2b" },
];

/**
 * Full-viewport cold-open title card with a floating constellation of
 * programming icons. As the user scrolls, the two halves split apart like
 * cinema curtains and the icons drift with parallax.
 */
export default function CurtainIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 = fully closed, 1 = fully open

  // Handler Scroll untuk Tirai Curtain
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const root = rootRef.current;
      if (root) {
        const h = root.offsetHeight;
        // progress based on how much of the 320vh-tall wrapper has scrolled
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

  // Curtain splits horizontally. Each half translates X by up to 110% of its width.
  const split = progress * 110;
  // Icons drift: parallax-like, different axes per icon
  const driftY = progress * 40;
  // Welcome text fades out / shrinks as curtain opens
  const welcomeOpacity = Math.max(0, 1 - progress * 1.4);
  const welcomeScale = 1 - progress * 0.08;

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{ height: "320vh" }} // Diperpanjang agar tirai terbuka penuh secara halus
    >
      {/* Sticky container pins for the full 320vh range */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[var(--ink)] text-[var(--bone)]">
        
        {/* Constellation background (always behind curtains) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 45%, rgba(255,61,46,0.22) 0%, rgba(255,61,46,0.06) 35%, transparent 70%)",
            }}
          />
          {icons.map(({ I, label, color }, i) => {
            const ring = i % 3;
            const ringIndex = Math.floor(i / 3);
            
            // Konfigurasi Radius Orbit (Oval agar sesuai dengan aspek rasio layar lebar)
            const radiusX = ring === 0 ? 15 : ring === 1 ? 28 : 41;
            const radiusY = radiusX * 0.73; // sedikit pipih vertikal agar muat di viewport

            // Sudut awal yang diinterleave (selang-seling) agar tersebar merata
            const angle = (ringIndex * (2 * Math.PI / 6)) + (ring === 1 ? Math.PI / 6 : 0);

            // Hitung posisi koordinat X & Y di layar (%)
            const posX = 50 + radiusX * Math.cos(angle);
            const posY = 50 + radiusY * Math.sin(angle);

            const scale = ring === 0 ? 0.8 : ring === 1 ? 1.0 : 1.15;
            const depth = ring === 0 ? 0.4 : ring === 1 ? 0.7 : 1.0;

            return (
              <FloatingIcon
                key={label}
                I={I}
                label={label}
                color={color}
                position={{ x: posX, y: posY, scale, depth }}
                progress={progress}
                driftY={driftY}
              />
            );
          })}
        </div>

        {/* Grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 z-0"
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



        {/* WELCOME copy (over curtains) */}
        <div
          className="relative z-30 flex h-full flex-col items-center justify-center px-5 text-center pointer-events-none"
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
            Informatics Engineering · Mobile · Fullstack · Games · AI Engineering.
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

function FloatingIcon({
  I,
  label,
  color,
  position,
  progress,
  driftY,
}: {
  I: IconType;
  label: string;
  color: string;
  position: { x: number; y: number; scale: number; depth: number };
  progress: number;
  driftY: number;
}) {
  const [hovered, setHovered] = useState(false);
  const tx = (position.depth - 0.5) * progress * 120;
  const ty = driftY * position.depth;

  return (
    <div
      className="absolute pointer-events-auto cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(${position.scale})`,
        opacity: hovered ? 1 : 0.28 + position.depth * 0.55,
        transition: "opacity 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        zIndex: hovered ? 50 : 5,
      }}
    >
      {/* Brand Color Glow Ring */}
      <div 
        className="absolute inset-[-25px] -z-10 rounded-full opacity-0 blur-xl transition-all duration-300"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: hovered ? 0.45 : 0,
          transform: hovered ? "scale(1.2)" : "scale(1)",
          transition: "opacity 300ms ease, transform 300ms ease"
        }}
      />
      
      {/* Tooltip Label */}
      <span 
        className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--bone)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--ink)] shadow-md border border-[var(--ink)]/10"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "opacity 200ms ease, transform 200ms ease"
        }}
      >
        {label}
      </span>

      <I
        className="h-10 w-10 md:h-12 md:w-12 transition-all duration-300"
        style={{ 
          color: hovered ? color : "#f2ede2",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          filter: hovered ? `drop-shadow(0 0 8px ${color})` : "none",
          transition: "color 300ms ease, transform 300ms ease, filter 300ms ease"
        }}
        aria-hidden
      />
    </div>
  );
}
