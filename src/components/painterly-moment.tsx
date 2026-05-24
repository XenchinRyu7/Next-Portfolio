import clsx from "clsx";
import Parallax from "@/components/parallax";
import ScrollReveal from "@/components/scroll-reveal";

type Variant = "horizon" | "mountain" | "orbit" | "terminal";

/**
 * Full-width cinematic "hero moment" between sections — a CSS/SVG-only
 * painterly composition meant to feel like a still frame from a film.
 */
export default function PainterlyMoment({
  variant = "horizon",
  caption,
  kicker,
  className,
}: {
  variant?: Variant;
  caption?: string;
  kicker?: string;
  className?: string;
}) {
  return (
    <section
      data-parallax-scope
      className={clsx(
        "relative w-full overflow-hidden",
        "h-[88vh] min-h-[600px]",
        className
      )}
    >
      {variant === "horizon" && <Horizon />}
      {variant === "mountain" && <Mountain />}
      {variant === "orbit" && <Orbit />}
      {variant === "terminal" && <Terminal />}

      {(kicker || caption) && (
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-24">
          <ScrollReveal mode="words" stagger={0.04}>
            {kicker && (
              <p data-split className="label text-[var(--bone)]/70">
                {kicker}
              </p>
            )}
            {caption && (
              <p
                data-split
                className="mt-3 max-w-xl font-serif text-[clamp(1.25rem,2.2vw,1.9rem)] italic leading-[1.15] text-[var(--bone)]"
              >
                {caption}
              </p>
            )}
          </ScrollReveal>
        </div>
      )}
    </section>
  );
}

function Horizon() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_110%,#ff5b3f_0%,#a42417_40%,#220805_78%,#000_100%)]" />
      {/* Sun */}
      <Parallax speed={-140} className="absolute inset-0">
        <div
          aria-hidden
          className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "min(62vw, 780px)",
            aspectRatio: "1",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle at 50% 50%, #ffd6a0 0%, #ff9054 30%, rgba(255,121,71,0.15) 70%, transparent 72%)",
            filter: "blur(0.5px)",
          }}
        />
      </Parallax>
      {/* Horizon lines */}
      <svg
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[56%] w-full"
        viewBox="0 0 1000 420"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gridFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.35" />
          </linearGradient>
          <mask id="gridMask">
            <rect width="1000" height="420" fill="url(#gridFade)" />
          </mask>
        </defs>
        <g mask="url(#gridMask)" stroke="#ffe6cc" strokeWidth="0.6">
          {Array.from({ length: 22 }).map((_, i) => {
            const y = (i / 21) ** 2.4 * 420;
            return <line key={i} x1="0" x2="1000" y1={y} y2={y} />;
          })}
          {Array.from({ length: 31 }).map((_, i) => {
            const x = 500 + (i - 15) * 80;
            return <line key={i} x1="500" x2={x} y1="0" y2="420" />;
          })}
        </g>
      </svg>
      {/* Atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,5,5,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <Noise />
    </>
  );
}

function Mountain() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f7f1e3_0%,#eadfbf_55%,#d6c59a_100%)]" />
      {/* Sun disc — slowest */}
      <Parallax speed={-60} className="absolute inset-0">
        <div
          aria-hidden
          className="absolute left-[62%] top-[28%] h-[22vw] w-[22vw] max-h-80 max-w-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #ff3d2e 0%, #c21a10 52%, rgba(194,26,16,0) 58%)",
            filter: "blur(0.4px)",
          }}
        />
      </Parallax>
      {/* Mountain silhouette layers */}
      <svg
        aria-hidden
        className="absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        style={{ height: "78%" }}
      >
        <path
          d="M0 420 L120 330 L210 390 L330 260 L430 360 L520 300 L640 390 L760 280 L870 370 L1000 320 L1000 600 L0 600 Z"
          fill="#8d7140"
          opacity="0.35"
        />
        <path
          d="M0 480 L110 400 L220 460 L340 350 L460 430 L580 370 L700 450 L820 360 L950 440 L1000 400 L1000 600 L0 600 Z"
          fill="#5c4525"
          opacity="0.7"
        />
        <path
          d="M0 540 L140 480 L260 520 L380 440 L520 500 L660 450 L800 510 L940 460 L1000 480 L1000 600 L0 600 Z"
          fill="#2b1b0b"
        />
      </svg>
      {/* Ink birds */}
      <svg
        aria-hidden
        className="absolute left-[18%] top-[34%] w-20 opacity-80"
        viewBox="0 0 80 20"
      >
        <path
          d="M2 12 Q10 2 18 12 Q26 6 34 12"
          stroke="#2b1b0b"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M40 15 Q46 8 52 15 Q58 10 64 15"
          stroke="#2b1b0b"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
      <Noise tone="dark" />
    </>
  );
}

function Orbit() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a0a0a_0%,#130b08_60%,#2a0f08_100%)]" />
      {/* Orbit rings */}
      <svg
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        width="min(120vw, 1400px)"
        height="min(120vw, 1400px)"
        viewBox="0 0 800 800"
      >
        {[160, 230, 310, 400].map((r, i) => (
          <circle
            key={i}
            cx="400"
            cy="400"
            r={r}
            fill="none"
            stroke="#ff3d2e"
            strokeWidth={i === 1 ? 1.3 : 0.5}
            opacity={0.4 - i * 0.07}
            strokeDasharray={i % 2 ? "2 6" : undefined}
          />
        ))}
        <circle cx="400" cy="400" r="30" fill="#ff3d2e" />
        <circle cx="400" cy="400" r="30" fill="#ff3d2e" opacity="0.5">
          <animate
            attributeName="r"
            values="30;60;30"
            dur="3.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Satellites */}
        <g>
          <circle cx="560" cy="400" r="6" fill="#ffd6cf">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 400 400"
              to="360 400 400"
              dur="14s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <g>
          <circle cx="170" cy="400" r="4" fill="#ffe1d9">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 400 400"
              to="-360 400 400"
              dur="22s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
      <Noise />
    </>
  );
}

function Terminal() {
  return (
    <>
      <div className="absolute inset-0 bg-[#050505]" />
      {/* Vertical rain of characters */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 600"
      >
        <defs>
          <linearGradient id="rainFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff3d2e" stopOpacity="0" />
            <stop offset="45%" stopColor="#ff3d2e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff3d2e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 28 }).map((_, i) => (
          <rect
            key={i}
            x={i * 36}
            y={(i * 73) % 600}
            width="1.5"
            height="140"
            fill="url(#rainFade)"
          >
            <animate
              attributeName="y"
              values={`-140;${600}`}
              dur={`${4 + (i % 5)}s`}
              begin={`${(i % 7) * 0.35}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </svg>
      <Noise />
    </>
  );
}

function Noise({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        mixBlendMode: tone === "dark" ? "multiply" : "overlay",
        opacity: 0.25,
      }}
    >
      <filter id="p-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#p-noise)" />
    </svg>
  );
}
