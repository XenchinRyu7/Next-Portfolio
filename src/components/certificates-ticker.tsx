"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FiAward, FiExternalLink, FiFileText } from "react-icons/fi";
import type { Certificate } from "@/lib/certificate-api";

export default function CertificatesTicker({ certificates }: { certificates: Certificate[] }) {
  if (!certificates || certificates.length === 0) return null;

  // Duplicate items to ensure a seamless infinite scroll loop
  const repeatedItems = Array.from({ length: 5 }).flatMap(() => certificates);

  return (
    <section className="relative overflow-hidden py-24 md:py-32 border-t border-[var(--rule)]">
      {/* Inline styles for keyframe marquee animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-marquee-infinite {
          animation: marquee 30s linear infinite;
        }
      `}} />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="label text-[var(--mute)]">§ Certified Credentials</p>
            <h2 className="display-2 mt-4 text-[clamp(2rem,6vw,4.5rem)] leading-[0.95]">
              Validated <br />
              <span className="font-serif italic font-normal text-[var(--ink)]">professional expertise.</span>
            </h2>
          </div>
          <Link
            href="/certificates"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] border border-[var(--ink)] bg-[var(--bone)] px-6 py-3.5 hover:bg-[var(--ink)] hover:text-[var(--bone)] transition-colors self-start md:self-end"
          >
            Explore Credentials Desk &rarr;
          </Link>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden border-t border-b border-[var(--rule)] bg-[var(--bone)] py-10">
        {/* Soft shadow gradients overlaying sides */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bone)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bone)] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max gap-6 animate-marquee-infinite hover:[animation-play-state:paused]">
          {repeatedItems.map((cert, index) => (
            <CertificateCard key={`${cert.id}-${index}`} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificateCard({ cert }: { cert: Certificate }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col justify-between w-[300px] md:w-[350px] h-[190px] md:h-[210px] bg-[var(--bone)] border border-[var(--ink)] p-6 transition-all duration-300 hover:scale-[1.01] cursor-pointer overflow-hidden group/card"
      style={{
        boxShadow: hovered ? "0 10px 30px -10px rgba(0,0,0,0.15)" : "none"
      }}
    >
      {/* Holographic Glowing Spot */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(circle 120px at ${coords.x}px ${coords.y}px, rgba(173, 255, 47, 0.12) 0%, transparent 80%)`
        }}
      />

      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)]">
            {cert.issuer}
          </span>
          <FiAward className="h-4 w-4 text-[var(--mute)] group-hover/card:text-[var(--acid)] transition-colors duration-300" />
        </div>

        {/* Title */}
        <h3 className="mt-4 font-serif text-base md:text-lg italic leading-tight text-[var(--ink)] group-hover/card:text-[var(--ink)] transition-colors">
          {cert.title}
        </h3>
      </div>

      {/* Footer Row */}
      <div className="relative z-10 flex items-end justify-between border-t border-[var(--rule)] pt-4 mt-auto">
        <div>
          <span className="block font-mono text-[8px] uppercase tracking-wider text-[var(--mute)]">
            Issued / Expiry
          </span>
          <span className="font-serif text-[11px] italic text-[var(--ink)]/80">
            {cert.issueDate} {cert.expiryDate ? `— ${cert.expiryDate}` : ""}
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 font-mono text-[9px] tracking-wider uppercase">
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[var(--acid)] transition-colors"
            >
              Verify <FiExternalLink className="h-3 w-3" />
            </a>
          )}
          <a
            href={cert.file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[var(--acid)] transition-colors"
          >
            PDF <FiFileText className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
