"use client";

import { useState } from "react";
import clsx from "clsx";

type Status = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [kind, setKind] = useState<string>("Fullstack");

  const options = [
    "Mobile",
    "Fullstack",
    "Game",
    "AI / Agent",
    "Automation",
    "Other",
  ];

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const company = data.get("company") as string;
    const budget = data.get("budget") as string;
    const timeline = data.get("timeline") as string;
    const message = data.get("message") as string;

    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (web3formsKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `New Portfolio Brief from ${name || "Visitor"}`,
            from_name: name || "Portfolio Contact",
            name,
            company,
            kind,
            budget,
            timeline,
            message,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus("sent");
          form.reset();
          return;
        }
      } catch (err) {
        console.error("Web3Forms error, falling back to mailto", err);
      }
    }

    // Fallback if key is missing or request fails
    const params = new URLSearchParams();
    params.set("subject", `Project brief — ${kind}`);
    params.set(
      "body",
      `Name: ${name || ""}\nCompany: ${company || ""}\nKind: ${kind}\nBudget: ${budget || ""}\nTimeline: ${timeline || ""}\n\n${message || ""}`
    );

    window.location.href = `mailto:saefulrohmandevelopers@gmail.com?${params.toString()}`;
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center border border-[var(--ink)] bg-[var(--bone)] p-12 text-center min-h-[400px]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--ink)] bg-[var(--acid)] text-[var(--ink)]">
          <svg
            className="h-8 w-8 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-8 font-serif text-3xl italic text-[var(--ink)]">
          Message Dispatched.
        </h3>
        <p className="mt-4 max-w-sm text-balance text-[14px] leading-relaxed text-[var(--ink)]/75">
          Your brief has been successfully routed. I usually reply within 24 hours. Let&apos;s build something alive.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center gap-2 border border-[var(--ink)] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--bone)]"
        >
          Send another brief
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-[var(--ink)] bg-[var(--bone)] p-6 md:p-8"
    >
      <div className="flex items-center justify-between border-b border-[var(--ink)] pb-4">
        <span className="chip">Brief</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
          {status === "idle" && "Ready"}
          {status === "sending" && "Dispatching…"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your full name" required />
        <Field label="Company" name="company" placeholder="Optional" />
      </div>

      <div>
        <label className="label text-[var(--mute)]">Project kind</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              type="button"
              key={o}
              onClick={() => setKind(o)}
              className={clsx(
                "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors",
                kind === o
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bone)]"
                  : "border-[var(--ink)] bg-[var(--bone)] hover:bg-[var(--ink)] hover:text-[var(--bone)]"
              )}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Budget" name="budget" placeholder="e.g. $5k — $20k" />
        <Field label="Timeline" name="timeline" placeholder="e.g. Q3 2026" />
      </div>

      <div className="mt-6">
        <label className="label text-[var(--mute)]">The brief</label>
        <textarea
          name="message"
          rows={6}
          required
          placeholder="What are you building? What’s the stretch goal? Anything weird and specific is great."
          className="mt-3 block w-full resize-none border border-[var(--ink)] bg-[var(--bone)] p-4 font-sans text-base outline-none placeholder:text-[var(--mute)] focus:bg-[var(--acid)]/20"
        />
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[var(--rule)] pt-6 md:flex-row md:items-center">
        <p className="max-w-md font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--mute)]">
          Submitting opens your email client with a prefilled message.
        </p>
        <button
          type="submit"
          className="inline-flex items-center gap-3 border border-[var(--ink)] bg-[var(--ink)] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)] transition-colors hover:bg-[var(--acid)] hover:text-[var(--ink)]"
        >
          {status === "sending" ? "Dispatching…" : "Send the brief →"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label text-[var(--mute)]" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        required={required}
        className="mt-3 block w-full border-b border-[var(--ink)] bg-transparent py-2 font-sans text-lg outline-none placeholder:text-[var(--mute)] focus:border-[var(--plum)]"
      />
    </div>
  );
}
