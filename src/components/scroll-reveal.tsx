"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: React.ReactNode;
  className?: string;
  /** "words" = split headline into words that lift in; "block" = clip-path reveal; "fade" = y-translate + opacity */
  mode?: "words" | "block" | "fade";
  stagger?: number;
  delay?: number;
  /** "0 bottom" etc — see ScrollTrigger docs */
  start?: string;
};

/**
 * Scroll-linked reveal primitive. Wraps children and plays an animation
 * the first time the element enters the viewport.
 */
export default function ScrollReveal({
  children,
  className,
  mode = "fade",
  stagger = 0.05,
  delay = 0,
  start = "top 80%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(el, { clearProps: "all" });
      return;
    }

    let ctx: gsap.Context | undefined;

    if (mode === "words") {
      // Split each direct text node child into word-spans. We use inline-block
      // (NOT overflow:hidden) so italic serifs with horizontal overhang aren't
      // clipped. The reveal effect reads as a staggered rise-in via y + opacity.
      const headings = el.querySelectorAll("h1, h2, h3, p[data-split]");
      headings.forEach((h) => {
        if (h.getAttribute("data-split-done") === "1") return;
        const txt = h.textContent ?? "";
        h.textContent = "";
        txt.split(/(\s+)/).forEach((word) => {
          if (!word.trim()) {
            h.appendChild(document.createTextNode(word));
            return;
          }
          const span = document.createElement("span");
          span.className = "sr-word-inner";
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
          span.textContent = word;
          h.appendChild(span);
        });
        h.setAttribute("data-split-done", "1");
      });

      ctx = gsap.context(() => {
        gsap.from(el.querySelectorAll(".sr-word-inner"), {
          y: "1.15em",
          rotate: 2,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      }, el);
    } else if (mode === "block") {
      ctx = gsap.context(() => {
        gsap.from(el, {
          clipPath: "inset(100% 0 0 0)",
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      }, el);
    } else {
      const targets = el.children.length > 0 ? el.children : [el];
      ctx = gsap.context(() => {
        gsap.from(targets, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      }, el);
    }

    return () => ctx?.revert();
  }, [mode, stagger, delay, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
