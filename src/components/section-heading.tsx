import clsx from "clsx";
import Link from "next/link";

export default function SectionHeading({
  tag,
  title,
  children,
  link,
  linkLabel,
  className,
}: {
  tag: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  link?: string;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-end gap-6 md:grid-cols-[1fr_auto]",
        className
      )}
    >
      <div>
        <p className="label text-[var(--mute)]">{tag}</p>
        <h2 className="display-1 mt-4 text-[clamp(2.75rem,8vw,6rem)]">
          {title}
        </h2>
      </div>
      {children && (
        <p className="max-w-md text-balance font-sans text-base text-[var(--ink)]/70 md:text-lg">
          {children}
        </p>
      )}
      {link && (
        <Link
          href={link}
          className="group inline-flex w-fit items-center gap-3 border-b border-[var(--ink)] pb-1 font-mono text-xs uppercase tracking-[0.22em]"
        >
          {linkLabel ?? "See all"}
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
