"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FiHome, FiBriefcase, FiImage, FiAward, FiUser, FiMail, FiTerminal } from "react-icons/fi";
import type { IconType } from "react-icons";

type DockItem = {
  icon: IconType;
  label: string;
  href: string;
};

const items: DockItem[] = [
  { icon: FiHome, label: "Home", href: "/" },
  { icon: FiBriefcase, label: "Work", href: "/work" },
  { icon: FiImage, label: "Gallery", href: "/gallery" },
  { icon: FiAward, label: "Credentials", href: "/certificates" },
  { icon: FiUser, label: "About", href: "/about" },
  { icon: FiMail, label: "Contact", href: "/contact" },
  { icon: FiTerminal, label: "Terminal", href: "#terminal" },
];

/**
 * A macOS-inspired bottom dock menu with smooth cursor-proximity magnification scale.
 */
export default function Dock() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scales, setScales] = useState<number[]>(new Array(items.length).fill(1));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const baseSize = isMobile ? 32 : 40;

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    const newScales = children.map((child) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const dist = Math.abs(e.clientX - childCenter);

      if (dist < 150) {
        const factor = 1 - dist / 150;
        return 1 + factor * 0.45; // Max scale 1.45
      }
      return 1;
    });

    setScales(newScales);
  };

  const handleMouseLeave = () => {
    setScales(new Array(items.length).fill(1));
    setHoveredIdx(null);
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 pointer-events-none max-w-[95vw] w-fit flex justify-center">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto flex flex-wrap md:flex-nowrap items-center justify-center md:items-end gap-2 md:gap-3 rounded-2xl border border-[var(--ink)]/10 bg-[var(--bone)]/70 px-3 py-2 md:px-4 md:py-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 w-fit max-w-[90vw]"
        style={{ height: isMobile ? "auto" : "64px" }}
      >
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isExternal = item.href.startsWith("http");
          const isActive = pathname === item.href;
          const scale = scales[idx] || 1;
          const isTerminal = item.href === "#terminal";

          const commonProps = {
            onMouseEnter: () => setHoveredIdx(idx),
            className: clsx(
              "relative flex items-center justify-center rounded-xl border transition-all duration-100 pointer-events-auto cursor-pointer",
              isActive
                ? "bg-[var(--ink)] border-[var(--ink)] text-[var(--bone)]"
                : "bg-[var(--bone)] border-[var(--ink)]/15 text-[var(--ink)]/75 hover:bg-[var(--acid)] hover:border-[var(--ink)]"
            ),
            style: {
              width: `${baseSize * scale}px`,
              height: `${baseSize * scale}px`,
              marginBottom: isMobile ? "0px" : `${(scale - 1) * 8}px`,
            },
          };

          const tooltip = (
            <span
              className={clsx(
                "absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-[var(--ink)]/10 bg-[var(--bone)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--ink)] shadow-md transition-all duration-200 pointer-events-none",
                hoveredIdx === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              {item.label}
            </span>
          );

          if (isTerminal) {
            return (
              <button
                key={item.label}
                {...commonProps}
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("open-terminal"));
                }}
              >
                {tooltip}
                <Icon style={{ width: "20px", height: "20px" }} />
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              {...commonProps}
              href={item.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {tooltip}
              <Icon style={{ width: "20px", height: "20px" }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
