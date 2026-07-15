import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import CVSection from "@/components/cv-section";

export const metadata: Metadata = {
  title: "Contact — Saeful Rohman",
  description:
    "Get in touch with Saeful Rohman for collaborations, projects, or conversations about mobile, fullstack, games and AI.",
};

const channels = [
  { k: "Email", v: "work@saefulrohman.dev", href: "mailto:work@saefulrohman.dev" },
  { k: "GitHub", v: "@XenchinRyu7", href: "https://github.com/XenchinRyu7" },
  { k: "LinkedIn", v: "saeful-rohman", href: "https://www.linkedin.com/in/saeful-rohman" },
  { k: "Location", v: "Indonesia · UTC+7", href: "" },
];

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="label text-[var(--mute)]">§ Contact</p>
          <h1 className="display-1 mt-6 text-[clamp(3rem,11vw,9rem)]">
            Let’s make
            <br />
            something
            <br />
            <span className="not-italic">real.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-balance text-lg leading-relaxed text-[var(--ink)]/75 md:text-xl">
            Send a short brief — what you’re making, when you need it, and any
            links. I’ll reply within 48 hours with a clear yes, no, or a
            thoughtful counter-proposal.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-[1400px] grid-cols-12 gap-6 px-5 md:px-10">
        <div className="col-span-12 md:col-span-5">
          <div className="border border-[var(--ink)] bg-[var(--bone)]">
            <div className="flex items-center justify-between border-b border-[var(--ink)] px-6 py-4">
              <span className="chip bg-[var(--bone)]">Direct channels</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
                v1.0
              </span>
            </div>
            <dl className="divide-y divide-[var(--rule)]">
              {channels.map((c) => (
                <div
                  key={c.k}
                  className="flex items-center justify-between gap-4 px-6 py-5"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
                    {c.k}
                  </dt>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="font-serif text-lg italic underline-offset-4 hover:underline"
                    >
                      {c.v}
                    </a>
                  ) : (
                    <dd className="font-serif text-lg italic">{c.v}</dd>
                  )}
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 border border-[var(--ink)] bg-[var(--acid)] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]">
              Availability
            </p>
            <p className="mt-3 font-serif text-2xl italic leading-tight">
              Accepting 1–2 new build partnerships this quarter.
            </p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 md:pl-10">
          <ContactForm />
        </div>
      </section>

      <div className="mt-16 md:mt-24">
        <CVSection />
      </div>
    </>
  );
}
