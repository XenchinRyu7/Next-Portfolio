import Link from "next/link";
import JourneyMap from "@/components/journey-map";
import MistTitle from "@/components/mist-title";
import PainterlyMoment from "@/components/painterly-moment";
import PrinciplesWeb from "@/components/principles-web";
import CinematicWork from "@/components/cinematic-work";
import BentoGrid from "@/components/bento-grid";
import CurtainIntro from "@/components/curtain-intro";
import ScrollReveal from "@/components/scroll-reveal";
import Parallax from "@/components/parallax";
import CVSection from "@/components/cv-section";
import GalleryTeaser from "@/components/gallery-teaser";
import CertificatesTicker from "@/components/certificates-ticker";
import { getShowcaseProjects } from "@/lib/project-api";
import { getGalleryItems } from "@/lib/gallery-api";
import { getCertificates } from "@/lib/certificate-api";

export default async function Home() {
  const [projects, allGalleryItems, certificates] = await Promise.all([
    getShowcaseProjects(),
    getGalleryItems({ limit: 100 }),
    getCertificates(),
  ]);

  let highlightItems = allGalleryItems.filter((item) => item.highlight === true);
  if (highlightItems.length === 0) {
    highlightItems = allGalleryItems;
  }
  const sortedHighlights = [...highlightItems].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* ═══════════════ SCENE -1 · THE CURTAIN ═══════════════ */}
      <CurtainIntro />

      {/* ═══════════════ SCENE 00 · COLD OPEN ═══════════════ */}
      <section
        data-parallax-scope
        className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      >
        {/* Background: horizon gradient + topographic lines */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, var(--bone) 0%, #f6efde 55%, #efe4c8 100%)",
          }}
        />
        <Parallax speed={-60} className="absolute inset-x-0 bottom-[-10%] top-[30%] -z-10">
          <TopoLines className="absolute inset-0 opacity-[0.18]" />
        </Parallax>

        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 md:px-10">
          <div className="flex items-center justify-between pt-32 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink)]/60 md:pt-40">
            <span className="flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--plum)] opacity-60" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-[var(--plum)]" />
              </span>
              REC · scene 00 / cold open
            </span>
            <span className="hidden md:inline">Jakarta · UTC+7 · 2026 edition</span>
          </div>

          <div className="mt-12 md:mt-20">
            <ScrollReveal mode="words" stagger={0.06} start="top 95%">
              <MistTitle reflectHeight={0.6}>
                <h1 className="display-1 text-[clamp(4rem,17vw,16rem)] leading-[0.82]">
                  Saeful Rohman.
                </h1>
              </MistTitle>
            </ScrollReveal>
          </div>

          <div className="mt-20 grid grid-cols-12 gap-6 md:mt-32">
            <ScrollReveal className="col-span-12 md:col-span-7" stagger={0.1}>
              <p className="max-w-2xl text-balance font-serif text-[clamp(1.1rem,1.6vw,1.4rem)] italic leading-[1.4] text-[var(--ink)]/80">
                Informatics Engineering graduate (GPA 3.83). I build at the intersection of{" "}
                <span className="not-italic font-medium">mobile</span>,{" "}
                <span className="not-italic font-medium">fullstack web</span>,{" "}
                <span className="not-italic font-medium">games</span>, and{" "}
                <span className="not-italic font-medium">AI engineering</span>
                &nbsp;— autonomous agents, automations, and interfaces that move
                the way they should.
              </p>
            </ScrollReveal>

            <ScrollReveal
              className="col-span-12 flex flex-col gap-4 md:col-span-5 md:items-end md:justify-end md:text-right"
              stagger={0.1}
            >
              <p className="label text-[var(--mute)]">Now playing</p>
              <p className="font-serif text-xl italic md:text-2xl">
                Shipping agents & fullstack platforms.
              </p>
              <div className="mt-3 flex gap-2 md:justify-end">
                <Link
                  href="#journey"
                  className="inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--ink)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)] transition-transform hover:-translate-y-0.5"
                >
                  Begin the scroll ↓
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 border border-[var(--ink)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bone)]"
                >
                  See the work
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll cue + timecode */}
        <div className="relative mx-auto flex w-full max-w-[1400px] items-end justify-between px-5 pb-10 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink)]/60 md:px-10 md:pb-14">
          <span>TC · 00:00:01:03</span>
          <div className="flex flex-col items-center gap-2">
            <span>scroll</span>
            <span className="h-14 w-px animate-pulse bg-[var(--ink)]/40" />
          </div>
          <span>Lens · 35mm</span>
        </div>
      </section>

      {/* ═══════════════ SCENE 01 · MANIFESTO ═══════════════ */}
      <section className="relative overflow-hidden py-32 md:py-48">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <ScrollReveal>
            <p className="label text-[var(--mute)]">§ 01 · Manifesto</p>
          </ScrollReveal>
          <ScrollReveal mode="words" stagger={0.08} start="top 85%">
            <h2 className="display-1 mt-8 text-[clamp(4.5rem,17vw,18rem)] leading-[0.82] tracking-[-0.04em]">
              Code with clarity.
            </h2>
          </ScrollReveal>
          <div className="mt-16 grid grid-cols-12 gap-8 md:mt-24">
            <ScrollReveal className="col-span-12 md:col-span-7">
              <p className="max-w-2xl font-serif text-[clamp(1.25rem,2vw,1.75rem)] italic leading-[1.25]">
                &ldquo;Any fool can write code a machine understands. Good
                programmers write code humans understand.&rdquo;
              </p>
            </ScrollReveal>
            <ScrollReveal className="col-span-12 md:col-span-5 md:pl-10" stagger={0.1}>
              <p className="text-[15px] leading-relaxed text-[var(--ink)]/75">
                Every project on this site is an attempt to honour that. Small
                systems. Clear seams. Motion where it earns it. Silence where it
                doesn&apos;t.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink)]/75">
                I don&apos;t build <em>apps</em>. I build small worlds where
                humans and machines can meet and get something done together.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ HERO MOMENT · ORBIT ═══════════════ */}
      <PainterlyMoment
        variant="orbit"
        kicker="§ Cutscene · 01"
        caption="At the centre — a runtime. Around it — satellites of intent. Agents, automations, and the humans who steer them."
      />

      {/* ═══════════════ SCENE 02 · WHO IT'S FOR ═══════════════ */}
      <section className="relative overflow-hidden py-32 md:py-44">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-12 flex items-center justify-between md:mb-16">
            <ScrollReveal>
              <p className="label text-[var(--mute)]">§ 02 · Who it&apos;s for</p>
            </ScrollReveal>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)] md:inline">
              Direct. Welcoming. Respectful.
            </p>
          </div>
          <ScrollReveal mode="words" stagger={0.07} start="top 85%">
            <MistTitle reflectHeight={0.5}>
              <h2 className="display-2 text-[clamp(4rem,15vw,14rem)] leading-[0.88] tracking-[-0.03em]">
                Who it&apos;s for.
              </h2>
            </MistTitle>
          </ScrollReveal>

          <div className="mt-24 grid grid-cols-1 gap-px border-y border-[var(--rule)] bg-[var(--rule)] md:grid-cols-3">
            <AudienceCard
              label="Founders"
              body="Who need a builder who moves like a team — design, ship, learn, repeat."
              delay={0}
            />
            <AudienceCard
              label="Teams"
              body="Who want agents that actually work in production, not slideware."
              delay={0.12}
            />
            <AudienceCard
              label="Students"
              body="Who treat code like craft and want a peer, not a tutor."
              delay={0.24}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ HERO MOMENT · MOUNTAIN ═══════════════ */}
      <PainterlyMoment
        variant="mountain"
        kicker="§ Cutscene · 02"
        caption="From a small island to a quiet studio — the path had fewer straight lines than you&apos;d expect."
      />

      {/* ═══════════════ SCENE 03 · JOURNEY ═══════════════ */}
      <JourneyMap />

      {/* ═══════════════ SCENE 04 · PRINCIPLES ═══════════════ */}
      <PrinciplesWeb />
      <BentoGrid />

      {/* ═══════════════ HERO MOMENT · HORIZON ═══════════════ */}
      <PainterlyMoment
        variant="horizon"
        kicker="§ Cutscene · 03"
        caption="Beyond the singularity, the old rules of programming dissolve. I architect the entangled nodes and superposed agents that redefine how humans and machines collide."
      />

      {/* ═══════════════ SCENE 05 · WORK POSTERS ═══════════════ */}
      <section id="work" className="relative">
        <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-40">
          <ScrollReveal>
            <p className="label text-[var(--mute)]">§ 05 · Selected work</p>
          </ScrollReveal>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <ScrollReveal mode="words" stagger={0.06}>
              <h2 className="display-1 text-[clamp(3rem,9vw,7.5rem)]">
                The reel.
              </h2>
            </ScrollReveal>
            <Link
              href="/work"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)] hover:text-[var(--ink)]"
            >
              All projects →
            </Link>
          </div>
        </div>
        <div>
          {projects.slice(0, 4).map((p, i) => (
            <CinematicWork
              key={p.slug}
              project={p}
              index={i}
              total={Math.min(4, projects.length)}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════ HERO MOMENT · TERMINAL ═══════════════ */}
      <PainterlyMoment
        variant="terminal"
        kicker="§ End credits"
        caption="Roll credits. (Your project starts in the next scene.)"
      />

      <GalleryTeaser items={sortedHighlights} />

      <CertificatesTicker certificates={certificates} />

      <CVSection />

      {/* ═══════════════ SCENE 06 · CTA ═══════════════ */}
      <section className="relative mx-auto max-w-[1400px] px-5 py-32 md:px-10 md:py-48">
        <ScrollReveal mode="words" stagger={0.07}>
          <MistTitle reflectHeight={0.45}>
            <h2 className="display-1 text-[clamp(3.5rem,12vw,11rem)] leading-[0.88]">
              Let&apos;s build something alive.
            </h2>
          </MistTitle>
        </ScrollReveal>
        <div className="mt-20 grid grid-cols-12 gap-6">
          <ScrollReveal className="col-span-12 md:col-span-6">
            <p className="max-w-xl text-[15px] leading-relaxed text-[var(--ink)]/75">
              Contract, full-time, collaboration, teaching. If it&apos;s code,
              design, agents, or games — I&apos;m interested. Quiet inbox, fast
              reply.
            </p>
          </ScrollReveal>
          <ScrollReveal
            className="col-span-12 flex flex-wrap gap-3 md:col-span-6 md:justify-end"
            stagger={0.12}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--ink)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)]"
            >
              Start the conversation →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-[var(--ink)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em]"
            >
              Read the long version
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function AudienceCard({
  label,
  body,
  delay,
}: {
  label: string;
  body: string;
  delay: number;
}) {
  return (
    <ScrollReveal mode="block" delay={delay}>
      <div className="bg-[var(--bone)] p-8 md:p-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
          / {label}
        </p>
        <p className="mt-6 font-serif text-[clamp(1.25rem,2vw,1.5rem)] italic leading-[1.2]">
          {body}
        </p>
      </div>
    </ScrollReveal>
  );
}

function TopoLines({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
    >
      <g fill="none" stroke="var(--ink)" strokeWidth="0.6">
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M 0 ${420 - i * 14} Q 250 ${
              380 - i * 14 - (i % 2 ? 20 : 0)
            } 500 ${400 - i * 14} T 1000 ${410 - i * 14}`}
          />
        ))}
      </g>
    </svg>
  );
}
