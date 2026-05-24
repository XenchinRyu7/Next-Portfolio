"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: React.ReactNode;
  /** Positive = moves DOWN slower than page (classic parallax).
   *  Negative = moves UP faster than page.
   *  Value is px over the full scroll range inside the trigger.
   */
  speed?: number;
  scale?: number;
  className?: string;
};

/**
 * Translates its child on Y based on scroll progress through the nearest
 * positioned ancestor (trigger).
 */
export default function Parallax({
  children,
  speed = 80,
  scale,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const trigger = el.closest("[data-parallax-scope]") as HTMLElement | null;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: 0,
        y: -speed,
        ...(scale ? { scale } : {}),
        ease: "none",
        scrollTrigger: {
          trigger: trigger ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed, scale]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
