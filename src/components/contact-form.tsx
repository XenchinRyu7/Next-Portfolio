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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams();
    params.set("subject", `Project brief — ${kind}`);
    params.set(
      "body",
      `Name: ${data.get("name") ?? ""}\nCompany: ${data.get("company") ?? ""}\nKind: ${kind}\nBudget: ${data.get("budget") ?? ""}\nTimeline: ${data.get("timeline") ?? ""}\n\n${data.get("message") ?? ""}`
    );
    // Defer to let state render "sending"
    setTimeout(() => {
      window.location.href = `mailto:saefulrohmandevelopers@gmail.com?${params.toString()}`;
      setStatus("sent");
    }, 400);
  };

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
          {status === "sent" && "Handed off to mail client"}
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
