"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed left-0 right-0 top-0 z-40 transition-[background,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-[var(--rule)] bg-[color:var(--bone)]/85 backdrop-blur"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:gap-6 md:px-10">
        <Link href="/" className="group flex min-w-0 items-center gap-3 justify-self-start">
          <span className="flex h-9 w-9 items-center justify-center border border-[var(--ink)] bg-[var(--ink)] font-serif text-[var(--bone)] italic">
            S
          </span>
          <span className="label hidden max-w-[18rem] truncate xl:block text-white">
            Saeful Rohman / Portfolio ’26
          </span>
        </Link>

        {/* Desktop links removed - navigated via bottom Dock */}
        <div />

        <div className="flex items-center gap-3 justify-self-end">
          <Link
            href="/contact"
            className="group flex items-center gap-2 border border-[var(--ink)] bg-[var(--acid)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            <span className="block h-1.5 w-1.5 rounded-full bg-[var(--ink)] animate-pulse" />
            Available for work
          </Link>
        </div>
      </div>
    </header>
  );
}
