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
  metadataBase: new URL("https://www.saefulrohman.dev"),
  title: {
    default: "Saeful Rohman — Fullstack Software Engineer / AI / Game Developer",
    template: "%s | Saeful Rohman",
  },
  description:
    "Portfolio of Saeful Rohman — a fullstack software engineer active in game development and AI engineering building autonomous agents.",
  keywords: [
    "Saeful Rohman",
    "Software Engineer",
    "Fullstack Developer",
    "AI Engineer",
    "Autonomous Agents",
    "Game Developer",
    "Next.js Portfolio",
    "Informatics Engineering",
  ],
  authors: [{ name: "Saeful Rohman", url: "https://www.saefulrohman.dev" }],
  creator: "Saeful Rohman",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Saeful Rohman — Fullstack Software Engineer",
    description:
      "A fullstack software engineer active in game development and AI engineering building autonomous agents.",
    url: "https://www.saefulrohman.dev",
    siteName: "Saeful Rohman Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saeful Rohman — Fullstack Software Engineer",
    description:
      "A fullstack software engineer active in game development and AI engineering building autonomous agents.",
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
