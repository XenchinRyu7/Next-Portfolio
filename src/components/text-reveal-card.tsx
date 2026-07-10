"use client";

import { useState, useRef } from "react";

/**
 * An interactive card that uses a dynamic mouse mask (clip-path spotlight)
 * to reveal clean typography text hidden beneath a blurred binary overlay.
 */
export default function TextRevealCard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 select-none transition-colors hover:border-white/30 text-white"
    >
      {/* Dynamic flashlight glow behind */}
      <div
        className="absolute -z-10 rounded-full bg-[var(--acid)]/10 opacity-0 blur-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          width: "200px",
          height: "200px",
          left: `${mousePos.x - 100}px`,
          top: `${mousePos.y - 100}px`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="flex h-full flex-col justify-between">
        <div>
          <span className="label text-white/40">§ Cryptography</span>
          <h3 className="mt-3 font-serif text-xl italic leading-tight text-white">
            Reveal Secrets
          </h3>
        </div>

        {/* Text Reveal Arena */}
        <div className="relative mt-6 min-h-[95px] w-full flex items-center justify-center border border-white/5 bg-white/[0.01] p-4 rounded-lg">
          
          {/* Top Layer: Blurred / Encrypted text */}
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center font-mono text-[11px] leading-relaxed tracking-wider text-white/10 blur-[1.5px] transition-all duration-300">
            01000001 01010010 01000011 01001000 01001001 01010100 01000101 01000011 01010100 01010101 01010010 01000101 &middot; 01010011 01001111 01001100 01001001 01000101
          </div>

          {/* Bottom Layer: Crisp Revealed text (clipped around cursor) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#0d0d0d] border border-white/5 rounded-lg transition-all duration-75 select-none pointer-events-none"
            style={{
              clipPath: hovered
                ? `circle(70px at ${mousePos.x}px ${mousePos.y}px)`
                : `circle(0px at 0px 0px)`,
              WebkitClipPath: hovered
                ? `circle(70px at ${mousePos.x}px ${mousePos.y}px)`
                : `circle(0px at 0px 0px)`,
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--acid)] font-semibold">
              {"// ARCHITECTURE FIRST"}
            </p>
            <p className="mt-1 font-serif text-sm italic text-white">
              &ldquo;SOLID is Must&rdquo;
            </p>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-white/40">
          {hovered ? "Hovering · Revealing clean system" : "Hover to reveal principles"}
        </p>
      </div>
    </div>
  );
}
