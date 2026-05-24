import clsx from "clsx";

/**
 * A spectacle display headline with a mist / reflection layer below it.
 * Inspired by StringTune's "Who It's For" hero moment.
 */
export default function MistTitle({
  children,
  className,
  reflectHeight = 0.55,
}: {
  children: React.ReactNode;
  className?: string;
  reflectHeight?: number; // fraction of text height for the mirrored copy
}) {
  return (
    <div className={clsx("relative isolate select-none", className)}>
      <div className="relative z-10">{children}</div>
      {/* Mirrored reflection */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-full overflow-hidden"
        style={{
          height: `${reflectHeight * 100}%`,
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))",
        }}
      >
        <div
          className="relative"
          style={{
            transform: "scaleY(-1)",
            transformOrigin: "top",
            filter: "blur(1.2px)",
            opacity: 0.5,
          }}
        >
          {children}
        </div>
        {/* Horizon mist line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--ink)]/30 to-transparent" />
        {/* Soft fog */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 120% at 50% 0%, rgba(242,237,226,0), rgba(242,237,226,0.85) 60%, var(--bone) 100%)",
          }}
        />
      </div>
    </div>
  );
}
