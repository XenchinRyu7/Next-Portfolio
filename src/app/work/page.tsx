import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/project-card";
import { getShowcaseProjects } from "@/lib/project-api";

export const metadata: Metadata = {
  title: "Work — Saeful Rohman",
  description:
    "Selected projects across mobile, fullstack web, game development, and AI engineering.",
};

export default async function WorkPage() {
  const projects = await getShowcaseProjects();
  const byKind = projects.reduce<Record<string, typeof projects>>((acc, p) => {
    acc[p.kind] = acc[p.kind] ?? [];
    acc[p.kind].push(p);
    return acc;
  }, {});
  const kinds = Object.keys(byKind);

  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="label text-[var(--mute)]">§ Selected work</p>
          <h1 className="display-1 mt-6 text-[clamp(3rem,11vw,9rem)]">
            Things I
            <br />
            <span className="not-italic">shipped.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-balance text-lg leading-relaxed text-[var(--ink)]/75 md:text-xl">
            A rotating set of projects from across my disciplines — mobile
            apps, fullstack platforms, a couple of games, and more recently,
            autonomous AI agents. Case studies on request.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-center gap-2 rule-top rule-bottom py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
          <span>Categories:</span>
          {kinds.map((k) => (
            <Link
              key={k}
              href={`#${slug(k)}`}
              className="border border-[var(--ink)]/40 px-2.5 py-1 text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bone)]"
            >
              {k}
            </Link>
          ))}
        </div>
      </section>

      {kinds.map((kind, idx) => (
        <section
          key={kind}
          id={slug(kind)}
          className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24"
        >
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="display-1 text-[clamp(2rem,5vw,3.5rem)]">
              {String(idx + 1).padStart(2, "0")} — {kind}
            </h2>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)] md:block">
              {byKind[kind].length} project{byKind[kind].length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {byKind[kind].map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-12 gap-6 border-t border-[var(--rule)] pt-10">
          <div className="col-span-12 md:col-span-7">
            <p className="label text-[var(--mute)]">§ Next</p>
            <h2 className="display-1 mt-4 text-[clamp(2.5rem,7vw,5rem)]">
              Have a brief,
              <br />
              <span className="not-italic">not a demo?</span>
            </h2>
          </div>
          <div className="col-span-12 flex items-end md:col-span-5 md:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-[var(--ink)] bg-[var(--ink)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)]"
            >
              Send a brief →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
