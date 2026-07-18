"use client";

import React, { useState, useRef } from "react";
import { FiSearch, FiAward, FiExternalLink, FiFileText, FiInbox } from "react-icons/fi";
import type { Certificate } from "@/lib/certificate-api";
import clsx from "clsx";

export default function CertificatesList({ initialItems }: { initialItems: Certificate[] }) {
  const [search, setSearch] = useState("");

  const filteredItems = initialItems.filter((cert) => {
    const terms = `${cert.title} ${cert.issuer} ${cert.credentialId ?? ""}`.toLowerCase();
    return terms.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-12">
      {/* Search Input Box */}
      <div className="relative max-w-md w-full border border-[var(--ink)] bg-[var(--bone)]">
        <span className="absolute inset-y-0 left-4 flex items-center justify-center text-[var(--mute)]">
          <FiSearch className="h-4 w-4" />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search certificates by name or issuer..."
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
            No certificates match your query.
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-4 font-mono text-[11px] uppercase tracking-wider text-[var(--ink)] underline hover:text-[var(--acid)]"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        /* Asymmetric Bento Grid of Certificates */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((cert, index) => {
            // Apply bento span rules
            const spanClass = (index % 3 === 0) ? "md:col-span-2" : "md:col-span-1";
            return (
              <InteractiveCertificateCard
                key={cert.id}
                cert={cert}
                spanClass={spanClass}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function InteractiveCertificateCard({
  cert,
  spanClass,
}: {
  cert: Certificate;
  spanClass: string;
}) {
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
      className={clsx(
        "relative flex flex-col justify-between h-[210px] bg-[var(--bone)] border border-[var(--ink)] p-6 transition-all duration-300 hover:scale-[1.01] overflow-hidden group/card",
        spanClass
      )}
      style={{
        boxShadow: hovered ? "0 12px 36px -12px rgba(0,0,0,0.15)" : "none"
      }}
    >
      {/* Laser Holographic Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(circle 140px at ${coords.x}px ${coords.y}px, rgba(173, 255, 47, 0.14) 0%, transparent 80%)`
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)]">
            Verified Issuer &bull; {cert.issuer}
          </span>
          <FiAward className="h-4.5 w-4.5 text-[var(--mute)] group-hover/card:text-[var(--acid)] transition-colors duration-300" />
        </div>

        <h3 className="mt-4 font-serif text-lg md:text-xl italic leading-tight text-[var(--ink)]">
          {cert.title}
        </h3>
      </div>

      <div className="relative z-10 flex items-end justify-between border-t border-[var(--rule)] pt-4 mt-auto">
        <div>
          <span className="block font-mono text-[8px] uppercase tracking-wider text-[var(--mute)]">
            Credential ID: {cert.credentialId ?? "N/A"}
          </span>
          <span className="font-serif text-[11px] italic text-[var(--ink)]/80">
            Issued: {cert.issueDate} {cert.expiryDate ? `— Expires: ${cert.expiryDate}` : ""}
          </span>
        </div>

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
