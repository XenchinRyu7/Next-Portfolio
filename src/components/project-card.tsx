import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { Project } from "@/data/projects";
import { formatTimeline } from "@/lib/project-api";

const accentMap: Record<Project["accent"], string> = {
  acid: "bg-[var(--acid)] text-[var(--ink)]",
  plum: "bg-[var(--plum)] text-[var(--bone)]",
  cobalt: "bg-[var(--cobalt)] text-[var(--bone)]",
  ink: "bg-[var(--ink)] text-[var(--bone)]",
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const accent = accentMap[project.accent];

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col overflow-hidden border border-[var(--ink)] bg-[var(--bone)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_var(--ink)]"
      aria-label={`${project.title} — open case study`}
    >
      <div
        className={clsx(
          "relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--ink)]",
          !project.images?.[0] && accent
        )}
      >
        {project.images?.[0] && (
          <Image
            src={project.images[0].url}
            alt={project.images[0].alt || `Thumbnail of project ${project.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-w-768px) 100vw, 50vw"
            priority={index < 2}
          />
        )}
        <div
          className={clsx(
            "absolute inset-0",
            project.images?.[0]
              ? "bg-[var(--ink)]/35"
              : "hatch opacity-30"
          )}
          aria-hidden
        />
        <div className="absolute left-4 top-4 font-mono text-[11px] uppercase tracking-[0.22em]">
          {String(index + 1).padStart(2, "0")} / {project.kind}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <h3 className="font-serif text-[clamp(1.8rem,4vw,3.2rem)] font-medium italic leading-[0.95]">
            {project.title}
          </h3>
          <span className="font-mono text-xs uppercase tracking-[0.2em]">
            {formatTimeline(project.startDate, project.endDate, project.status)}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <p className="text-balance text-[15px] leading-relaxed text-[var(--ink)]/80">
          {project.tagline}
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.map((s) => (
            <li
              key={s}
              className="border border-[var(--ink)]/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink)]/80"
            >
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between border-t border-[var(--rule)] pt-4 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="text-[var(--mute)]">Open case study</span>
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
