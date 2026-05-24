import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Cursor from "@/components/cursor";
import SmoothScroll from "@/components/smooth-scroll";

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
  title: "Saeful Rohman — Computer Science / AI / Fullstack",
  description:
    "Portfolio of Saeful Rohman— Computer Science student, mobile & fullstack developer, game dev, and AI engineer building autonomous agents and automation systems.",
  openGraph: {
    title: "Saeful Rohman",
    description:
      "Computer Science student · mobile, fullstack web, game, and AI engineering. Building agents, automations and experiences.",
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
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
