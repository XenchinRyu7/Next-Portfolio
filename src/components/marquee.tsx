import clsx from "clsx";

export default function Marquee({
  items,
  className,
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={clsx("marquee rule-top rule-bottom py-6", className)}>
      <div
        className="marquee-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-serif text-[clamp(2rem,6vw,5.5rem)] italic leading-none"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--ink)]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
