import clsx from "clsx";

type Principle = { title: string; body: string; x: number; y: number };

const principles: Principle[] = [
  {
    title: "Modular Systems",
    body: "Small pieces, clear seams. Every feature a module you can rip out and replace without the house falling in.",
    x: 18,
    y: 22,
  },
  {
    title: "Velocity with Craft",
    body: "Ship weekly. Polish monthly. Delete quarterly. Speed is a discipline, not an excuse.",
    x: 62,
    y: 14,
  },
  {
    title: "Autonomy by Default",
    body: "Automate your next repetition. If you did it twice, write it. If you did it thrice, ship it to someone else.",
    x: 35,
    y: 52,
  },
  {
    title: "Designer's Hands",
    body: "Type, space, motion, sound. An engineer who can't see beauty will build ugly things fast.",
    x: 80,
    y: 58,
  },
  {
    title: "Own the Loop",
    body: "Metrics → hypothesis → experiment → ship → repeat. Portfolio pieces without a feedback loop are school projects.",
    x: 24,
    y: 82,
  },
  {
    title: "Agents, not Apps",
    body: "The next decade of software writes itself. I build the scaffolding that lets it.",
    x: 68,
    y: 86,
  },
];

/**
 * A StringTune-style "Principles" section — labelled nodes scattered across
 * a large canvas, connected by hand-drawn diagonals.
 */
export default function PrinciplesWeb() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-20">
          <div>
            <p className="label text-[var(--mute)]">§ Operating Principles</p>
            <h2 className="display-1 mt-6 text-[clamp(3rem,9vw,7.5rem)]">
              Principles.
            </h2>
          </div>
          <p className="hidden max-w-sm text-balance font-sans text-[15px] leading-relaxed text-[var(--ink)]/80 md:block">
            Six rules I write software against. They are the north-star for
            every project on this site.
          </p>
        </div>

        {/* Canvas */}
        <div className="relative aspect-[16/10] w-full md:aspect-[16/8]">
          {/* Diagonal lines */}
          <svg
            aria-hidden
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <g stroke="var(--ink)" strokeWidth="0.12" opacity="0.35">
              {principles.map((p, i) => {
                const next = principles[(i + 1) % principles.length];
                return (
                  <line
                    key={i}
                    x1={p.x}
                    y1={p.y}
                    x2={next.x}
                    y2={next.y}
                    strokeDasharray="0.6 0.8"
                  />
                );
              })}
            </g>
          </svg>

          {principles.map((p, i) => (
            <PrincipleNode key={i} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrincipleNode({ p, index }: { p: Principle; index: number }) {
  const side = p.x > 50 ? "right" : "left";
  return (
    <div
      className={clsx("absolute w-[min(320px,46vw)]")}
      style={{ left: `${p.x}%`, top: `${p.y}%` }}
    >
      <div
        className={clsx(
          "relative",
          side === "right" ? "-translate-x-full pr-6" : "pl-6"
        )}
      >
        {/* Dot */}
        <span
          className={clsx(
            "absolute top-2 block h-2.5 w-2.5 rounded-full bg-[var(--plum)] ring-4 ring-[var(--bone)]",
            side === "right" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
          )}
        />
        <p
          className={clsx(
            "mb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]",
            side === "right" && "text-right"
          )}
        >
          / {String(index + 1).padStart(2, "0")}
        </p>
        <h3
          className={clsx(
            "font-serif text-[clamp(1.1rem,1.8vw,1.6rem)] italic leading-tight",
            side === "right" && "text-right"
          )}
        >
          {p.title}
        </h3>
        <p
          className={clsx(
            "mt-2 text-[13px] leading-relaxed text-[var(--ink)]/70",
            side === "right" && "text-right"
          )}
        >
          {p.body}
        </p>
      </div>
    </div>
  );
}
