"use client";

import React from "react";
import { FiDownload, FiFileText } from "react-icons/fi";

export default function CVSection() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 border-t border-[var(--rule)]">
      {/* Background glow */}
      <div 
        className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--plum) 0%, transparent 70%)"
        }}
      />
      
      <div className="grid grid-cols-12 gap-8 items-center">
        {/* Text Area */}
        <div className="col-span-12 md:col-span-6">
          <p className="label text-[var(--mute)]">§ Credentials</p>
          <h2 className="display-1 mt-6 text-[clamp(2.5rem,7vw,5.5rem)] leading-none">
            Curriculum
            <br />
            <span className="italic">Vitae.</span>
          </h2>
          <p className="mt-6 max-w-md text-balance text-[14px] leading-relaxed text-[var(--ink)]/75">
            My full professional trajectory, core stack proficiency, academic honors, and engineering accomplishments compiled in a single comprehensive PDF document.
          </p>
        </div>

        {/* Interactive Download Card */}
        <div className="col-span-12 md:col-span-6 flex justify-center md:justify-end">
          
          <div
            className="group relative w-full max-w-md flex flex-col justify-between rounded-xl border border-[var(--ink)] bg-[var(--bone)] p-6 transition-all duration-300 hover:shadow-2xl"
          >
            {/* Holographic glowing background ring */}
            <div 
              className="absolute inset-0 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60"
              style={{
                background: "radial-gradient(circle at 80% 20%, var(--plum) 0%, transparent 60%)"
              }}
            />
            
            <div className="flex justify-between items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--ink)]/10 bg-[var(--ink)]/[0.02] text-[var(--ink)]">
                <FiFileText className="h-6 w-6" />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)] px-3 py-1 rounded-full border border-[var(--ink)]/10 bg-[var(--bone)] shadow-sm">
                Primary Asset
              </span>
            </div>

            <div className="mt-12">
              <h4 className="font-serif text-2xl italic text-[var(--ink)] leading-tight">
                Curriculum Vitae
              </h4>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-[var(--ink)]/50">
                PDF &bull; 84 KB
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-[var(--ink)]/10 pt-6">
              <a
                href="/files/Saeful_Rohman_Curriculum_Vitae.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-[var(--ink)] bg-[var(--bone)] py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bone)]"
              >
                View
              </a>
              <a
                href="/files/Saeful_Rohman_Curriculum_Vitae.pdf"
                download="Saeful_Rohman_Curriculum_Vitae.pdf"
                className="flex items-center justify-center gap-2 border border-[var(--ink)] bg-[var(--ink)] py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--bone)] transition-all duration-300 hover:bg-[var(--acid)] hover:text-[var(--ink)] group-hover:-translate-y-0.5"
              >
                <FiDownload className="h-3.5 w-3.5" />
                Download
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
