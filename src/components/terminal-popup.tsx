"use client";

import { useEffect, useRef, useState } from "react";
import { FiX, FiTerminal } from "react-icons/fi";

type LogLine = {
  text: string;
  type: "input" | "output" | "system";
};

/**
 * A retro glassmorphic Terminal Popup component triggered when
 * the terminal icon is clicked in the floating dock.
 */
export default function TerminalPopup() {
  const [open, setOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [logs, setLogs] = useState<LogLine[]>([
    { text: "Initializing Saeful Rohman Terminal v1.0.3...", type: "system" },
    { text: "Type 'help' to list available commands.", type: "system" },
  ]);
  const logEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-terminal", handleOpen);
    return () => window.removeEventListener("open-terminal", handleOpen);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  if (!open) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLogs = [...logs, { text: `saefulrohman@portfolio:~$ ${cmd}`, type: "input" as const }];

    if (trimmed === "") {
      setLogs(newLogs);
      return;
    }

    let output = "";
    switch (trimmed) {
      case "help":
        output = "Available commands:\n  about     - Brief bio of Saeful Rohman\n  stats     - Academic details & GPA\n  projects  - Selected project list\n  clear     - Clear terminal logs\n  exit      - Close terminal window";
        break;
      case "about":
        output = "Saeful Rohman — Informatics Engineering Graduate.\nSpecialist in fullstack web, mobile app development, game design, and AI autonomous agent pipelines.";
        break;
      case "stats":
        output = "Degree: Bachelor of Informatics Engineering\nGPA: 3.83 / 4.00 (Cum Laude)\nLocation: Jakarta, Indonesia";
        break;
      case "projects":
        output = "Recent Projects:\n  - FE-ONE AI (Autonomous Agent System)\n  - Atlas Agent (Browser Navigation Automator)\n  - Arcade Hoop (Unity mobile game)";
        break;
      case "clear":
        setLogs([]);
        return;
      case "exit":
        setOpen(false);
        return;
      default:
        output = `Command not found: '${trimmed}'. Type 'help' for options.`;
    }

    setLogs([...newLogs, { text: output, type: "output" }]);
  };

  return (
    <div 
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="flex h-[420px] w-full max-w-2xl flex-col border border-[var(--ink)] bg-[#0c0a0a] shadow-2xl rounded-lg overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-[#161212] px-4 py-2 border-b border-[var(--ink)]/30">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#f24e1e] cursor-pointer" onClick={() => setOpen(false)} />
            <span className="h-3 w-3 rounded-full bg-[#ffd21e]" />
            <span className="h-3 w-3 rounded-full bg-[#88ce02]" />
            <span className="ml-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--bone)]/50">
              <FiTerminal /> bash - saefulrohman@terminal
            </span>
          </div>
          <button onClick={() => setOpen(false)} className="text-[var(--bone)]/60 hover:text-[var(--bone)]">
            <FiX className="h-4 w-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex-1 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed text-[#2cfc03] space-y-2 cursor-text bg-black/95"
        >
          {logs.map((log, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {log.type === "system" && <span className="text-[#a0a0a0]">{log.text}</span>}
              {log.type === "input" && <span className="text-[var(--bone)]">{log.text}</span>}
              {log.type === "output" && <span className="text-[#2cfc03]">{log.text}</span>}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Terminal Input Footer */}
        <div className="flex items-center gap-2 bg-[#161212]/50 border-t border-[var(--ink)]/20 px-4 py-2">
          <span className="font-mono text-[12px] text-[var(--bone)]">saefulrohman@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(inputVal);
                setInputVal("");
              }
            }}
            className="flex-1 bg-transparent font-mono text-[12px] text-[#2cfc03] focus:outline-none"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
