"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { FiHome, FiBriefcase, FiImage, FiAward, FiUser, FiMail, FiTerminal } from "react-icons/fi";
import type { IconType } from "react-icons";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

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

export default function Dock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(Infinity);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const baseSize = isMobile ? 32 : 40;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 pointer-events-none max-w-[95vw] w-fit flex justify-center">
      <motion.div
        ref={containerRef}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          setHoveredIdx(null);
        }}
        className="pointer-events-auto flex flex-wrap md:flex-nowrap items-center justify-center md:items-end gap-2 md:gap-3 rounded-2xl border border-[var(--ink)]/10 bg-[var(--bone)]/70 px-3 py-2 md:px-4 md:py-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 w-fit max-w-[90vw]"
        style={{ height: isMobile ? "auto" : "64px" }}
      >
        {items.map((item, idx) => (
          <DockIcon
            key={item.label}
            item={item}
            idx={idx}
            mouseX={mouseX}
            hoveredIdx={hoveredIdx}
            setHoveredIdx={setHoveredIdx}
            isMobile={isMobile}
            baseSize={baseSize}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({
  item,
  idx,
  mouseX,
  hoveredIdx,
  setHoveredIdx,
  isMobile,
  baseSize,
}: {
  item: DockItem;
  idx: number;
  mouseX: MotionValue<number>;
  hoveredIdx: number | null;
  setHoveredIdx: (idx: number | null) => void;
  isMobile: boolean;
  baseSize: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distance, [-150, 0, 150], [baseSize, baseSize * 1.45, baseSize]);
  const size = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });

  const marginTransform = useTransform(distance, [-150, 0, 150], [0, 8, 0]);
  const marginBottom = useSpring(marginTransform, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  });

  const Icon = item.icon;
  const isExternal = item.href.startsWith("http");
  const isActive = pathname === item.href;
  const isTerminal = item.href === "#terminal";

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

  const innerContent = (
    <>
      {tooltip}
      <Icon style={{ width: "20px", height: "20px" }} />
    </>
  );

  const contentClass = clsx(
    "relative flex items-center justify-center rounded-xl border transition-colors duration-200 pointer-events-auto cursor-pointer",
    isActive
      ? "bg-[var(--ink)] border-[var(--ink)] text-[var(--bone)]"
      : "bg-[var(--bone)] border-[var(--ink)]/15 text-[var(--ink)]/75 hover:bg-[var(--acid)] hover:border-[var(--ink)]"
  );

  if (isTerminal) {
    return (
      <motion.div
        ref={ref}
        onMouseEnter={() => setHoveredIdx(idx)}
        style={{
          width: size,
          height: size,
          marginBottom: isMobile ? 0 : marginBottom,
        }}
        className="flex items-end justify-center"
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("open-terminal"));
          }}
          className={clsx(contentClass, "w-full h-full")}
        >
          {innerContent}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHoveredIdx(idx)}
      style={{
        width: size,
        height: size,
        marginBottom: isMobile ? 0 : marginBottom,
      }}
      className="flex items-end justify-center"
    >
      <Link
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={clsx(contentClass, "w-full h-full")}
      >
        {innerContent}
      </Link>
    </motion.div>
  );
}
