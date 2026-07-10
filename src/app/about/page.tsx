import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Marquee from "@/components/marquee";
import { FiDownload, FiFileText } from "react-icons/fi";
import { skillGroups, marqueeWords } from "@/data/skills";

export const metadata: Metadata = {
  title: "About — Saeful Rohman",
  description:
    "A closer look at Saeful Rohman — Informatics Engineering graduate (GPA 3.83), mobile and fullstack developer, game developer, and AI engineer building autonomous agents.",
};

const philosophy = [
  {
    k: "01",
    t: "Craft is a product feature.",
    d: "Polish, motion and typography aren’t decoration — they’re the reason users trust and stay.",
  },
  {
    k: "02",
    t: "Agents over screens.",
    d: "The next decade of software is autonomous. I build systems that plan and act, not just show data.",
  },
  {
    k: "03",
    t: "Ship, then ship again.",
    d: "Small, focused increments beat big bangs. Velocity is a discipline.",
  },
  {
    k: "04",
    t: "Learn loudly.",
    d: "Curiosity compounds. Mobile, web, games and AI all feed each other.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="label text-[var(--mute)]">§ About</p>
          <h1 className="display-1 mt-6 text-[clamp(3rem,11vw,9rem)]">
            Designer,
            <br />
            engineer,
            <br />
            <span className="not-italic">
              agent-
              <span className="italic">wrangler</span>.
            </span>
          </h1>
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-[1400px] grid-cols-12 gap-6 px-5 md:px-10">
        <div className="col-span-12 md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--ink)] bg-[var(--bone)] group">
            <Image
              src="/img/profile_picture.jpeg"
              alt="Saeful Rohman"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-w-768px) 100vw, 40vw"
              priority
            />
            <div className="absolute left-3 top-3 chip bg-[var(--bone)] z-10">
              SRA · 002
            </div>
          </div>

          <dl className="mt-8 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            <Row k="Name" v="Saeful Rohman" />
            <Row k="Role" v="Informatics Graduate · Fullstack · AI" />
            <Row k="Based" v="Indonesia · remote-friendly" />
            <Row k="Spoken" v="Bahasa · English" />
            <Row k="Email" v="saefulrohmandevelopers@gmail.com" />
          </dl>
        </div>

        <div className="col-span-12 md:col-span-7 md:pl-10">
          <div className="space-y-6 text-[16px] leading-relaxed text-[var(--ink)]/85 md:text-[17px]">
            <p>
              I’m an Informatics Engineering graduate (GPA 3.83) and generalist engineer from
              Indonesia. I started building for the web in high school, graduated from my undergraduate program in 2026, and now spend most of my time
              between fullstack platforms and AI engineering.
            </p>
            <p>
              My sweet spot is the seam between <strong>great interfaces</strong>{" "}
              and <strong>intelligent backends</strong>. I like when a UI feels
              like it’s reading your mind — usually because there’s an agent or
              a carefully tuned automation doing real work under the hood.
            </p>
            <p>
              Outside of client work and studies, I build small games, reverse-
              engineer design details I like, and run little automation
              experiments to see how much of my own life I can delegate.
            </p>
          </div>

          <div className="mt-14">
            <p className="label text-[var(--mute)]">Operating principles</p>
            <ul className="mt-6 grid grid-cols-1 gap-px border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
              {philosophy.map((p) => (
                <li
                  key={p.k}
                  className="flex flex-col gap-2 bg-[var(--bone)] p-6"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
                    / {p.k}
                  </span>
                  <h3 className="font-serif text-xl italic md:text-2xl">
                    {p.t}
                  </h3>
                  <p className="text-sm text-[var(--ink)]/75">{p.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[1400px] px-5 md:px-10">
        <h2 className="display-1 text-[clamp(2.25rem,6vw,4.5rem)]">
          What I actually
          <br />
          <span className="not-italic">know how to do.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {skillGroups.map((g) => (
            <div
              key={g.label}
              className="relative border border-[var(--ink)] bg-[var(--bone)] p-6 md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="chip">/ {g.tag}</span>
                <span className="font-serif text-xl italic">{g.label}</span>
              </div>
              <ul className="mt-6 flex flex-col gap-3 font-mono text-sm">
                {g.items.map((i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between border-b border-dashed border-[var(--rule)] pb-2 last:border-0"
                  >
                    <span>{i}</span>
                    <span className="text-[var(--mute)]">◆</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-28">
        <Marquee items={marqueeWords} reverse />
      </div>

      <CVSection />

      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <p className="label text-[var(--mute)]">§ Next</p>
            <h2 className="display-1 mt-4 text-[clamp(2.5rem,7vw,5rem)]">
              Want the
              <br />
              <span className="not-italic">receipts?</span>
            </h2>
          </div>
          <div className="col-span-12 flex flex-col justify-end gap-4 md:col-span-5 md:items-end">
            <p className="max-w-md text-[var(--ink)]/75 md:text-right">
              Head to the work page for project case studies — or jump straight
              to contact if you already know what you want.
            </p>
            <div className="flex gap-3">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--ink)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)]"
              >
                See the work →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[var(--ink)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
        {k}
      </dt>
      <dd className="font-serif text-base italic md:text-lg">{v}</dd>
    </div>
  );
}

function CVSection() {
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

        {/* Interactive Download Card (inspired by 21st.dev high-end developer style) */}
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
