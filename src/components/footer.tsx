import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[var(--rule)] bg-[var(--ink)] text-[var(--bone)]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)]/60">
              Let’s build something
            </p>
            <h3 className="mt-4 font-serif text-[clamp(2.5rem,6vw,5rem)] font-medium italic leading-[0.95]">
              Say hello,
              <br />
              <span className="text-[var(--acid)]">properly.</span>
            </h3>
            <Link
              href="mailto:work@saefulrohman.dev"
              className="mt-6 inline-flex items-center gap-3 border-b border-[var(--bone)] pb-1 font-mono text-sm uppercase tracking-[0.2em] transition-colors hover:text-[var(--acid)]"
            >
              work@saefulrohman.dev →
            </Link>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)]/60">
              Sitemap
            </p>
            <ul className="mt-6 space-y-3 text-lg">
              <li>
                <Link href="/" className="hover:text-[var(--acid)]">
                  Index
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--acid)]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[var(--acid)]">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--acid)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)]/60">
              Elsewhere
            </p>
            <ul className="mt-6 space-y-3 text-lg">
              <li>
                <a
                  href="https://github.com/timetravell7"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--acid)]"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--acid)]"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/saefulrdevs/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--acid)]"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href="mailto:work@saefulrohman.dev"
                  className="hover:text-[var(--acid)]"
                >
                  Email ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-[var(--bone)]/20 pt-8 md:flex-row md:items-end">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)]/60">
            © {new Date().getFullYear()} Saeful Rohman — Designed & built in Indonesia
          </p>
          <p className="font-serif text-[clamp(5rem,14vw,12rem)] leading-[0.82] italic tracking-[-0.04em] text-[var(--bone)]/10">
            saeful.
          </p>
        </div>
      </div>
    </footer>
  );
}
