import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Cursor from "@/components/cursor";
import SmoothScroll from "@/components/smooth-scroll";
import Dock from "@/components/dock";
import TerminalPopup from "@/components/terminal-popup";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saeful Rohman — Informatics Engineering / AI / Fullstack",
  description:
    "Portfolio of Saeful Rohman— Informatics Engineering graduate (GPA 3.83), mobile & fullstack developer, game dev, and AI engineer building autonomous agents and automation systems.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Saeful Rohman",
    description:
      "Informatics Engineering graduate (GPA 3.83) · mobile, fullstack web, game, and AI engineering. Building agents, automations and experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="antialiased selection:bg-[var(--ink)] selection:text-[var(--acid)]">
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main className="relative pb-24 md:pb-32">{children}</main>
        <Footer />
        <Dock />
        <TerminalPopup />
      </body>
    </html>
  );
}
