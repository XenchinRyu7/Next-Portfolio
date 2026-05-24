export type Project = {
  id?: string;
  slug: string;
  title: string;
  year: string;
  kind: string;
  stack: string[];
  tagline: string;
  description: string;
  role: string;
  accent: "acid" | "plum" | "cobalt" | "ink";
  problem: string;
  approach: string[];
  outcome: string[];
  links?: { label: string; href: string }[];
  status?: "completed" | "in-progress" | "planned" | string;
  startDate?: string;
  endDate?: string;
  features?: string[];
  tags?: string[];
  highlight?: boolean;
  images?: { url: string; alt?: string }[];
};

export const projects: Project[] = [
  {
    slug: "atlas-agent",
    title: "Atlas Agent",
    year: "2025",
    kind: "AI Engineering",
    stack: ["TypeScript", "LangGraph", "OpenAI", "Playwright", "Postgres"],
    tagline:
      "An autonomous research agent that browses, reads, and writes reports end-to-end.",
    description:
      "A multi-step AI agent that plans queries, drives a real browser, synthesizes sources and produces cited briefs. Tool-use + self-reflection loop with a strict eval harness.",
    role: "Architecture · Agent loop · Tooling",
    accent: "acid",
    problem:
      "Research tasks — competitive analysis, market snapshots, technical due diligence — take analysts hours and are repetitive. Existing LLM chat experiences skip the messy middle: browsing, reading, cross-referencing, and citing.",
    approach: [
      "Designed a planner/executor loop in LangGraph with explicit state transitions for plan → browse → read → synthesize → critique.",
      "Gave the agent real tools: headless Playwright browser, a reader that chunks + ranks sources, a scratchpad, and a cite-checker.",
      "Built a regression eval harness over 40+ golden tasks so every prompt or tool change gets scored automatically.",
      "Hardened with retries, token budgeting, and graceful degradation when sources are paywalled.",
    ],
    outcome: [
      "Produces fully-cited 1–2 page briefs in ~6 minutes on average.",
      "92% of outputs pass the cite-check step without human intervention.",
      "Replaced ~6 hours/week of manual research for the first design-partner team.",
    ],
    links: [
      { label: "Case study", href: "#" },
      { label: "GitHub", href: "https://github.com/timetravell7" },
    ],
  },
  {
    slug: "arcade-hoop",
    title: "Arcade Hoop",
    year: "2024",
    kind: "Game Development",
    stack: ["Unity", "C#", "Shader Graph", "Firebase"],
    tagline: "Physics-based arcade basketball with feel-good juice.",
    description:
      "A mobile arcade game built in Unity. Custom trajectory physics, swipe controls, haptics, shaders, and a tight 60fps loop. Released on Play Store.",
    role: "Gameplay · Shaders · Release",
    accent: "plum",
    problem:
      "The arcade basketball niche is crowded with lazy clones. Winning requires disproportionately good game-feel — every shot must satisfy within the first 30 seconds.",
    approach: [
      "Custom projectile physics tuned for 'forgiveness' — shots that are almost right still feel rewarding.",
      "Hand-built juice layer: screenshake, particle bursts, haptic ticks, net-swoosh audio timing.",
      "Shader-driven court transitions synced to scoring streaks.",
      "Daily-challenge system with seeded RNG so every player competes on the exact same shot sequence.",
    ],
    outcome: [
      "Locked a consistent 60fps on mid-tier Android devices.",
      "Day-1 retention > 45% in the closed beta cohort.",
      "Shipped to Play Store with a 4.5-star initial rating.",
    ],
  },
  {
    slug: "warung-pos",
    title: "Warung POS",
    year: "2024",
    kind: "Fullstack Web",
    stack: ["Next.js", "tRPC", "Postgres", "Prisma", "Tailwind"],
    tagline: "A lightning-fast POS for small Indonesian businesses.",
    description:
      "End-to-end point-of-sale platform: inventory, transactions, receipts and offline-first sync. Built for low-bandwidth environments and thumb-friendly usage.",
    role: "Fullstack · DX · Deployment",
    accent: "cobalt",
    problem:
      "Small-business owners in Indonesia juggle paper ledgers, WhatsApp and a calculator. Existing POS software is either too expensive, tablet-only, or assumes a stable connection.",
    approach: [
      "Offline-first architecture with an append-only local log and background sync.",
      "Thumb-zone UI — every frequent action reachable on one-handed Android use.",
      "Receipts print direct to cheap Bluetooth thermal printers.",
      "Type-safe server via tRPC so the mobile-web client and backend stay in lockstep.",
    ],
    outcome: [
      "Used daily in a handful of pilot warungs with zero lost transactions.",
      "Sub-200ms interaction latency even on 3G connections.",
      "Onboarding time for a new owner: under 10 minutes.",
    ],
  },
  {
    slug: "flux-mobile",
    title: "Flux Mobile",
    year: "2024",
    kind: "Mobile Development",
    stack: ["Flutter", "Dart", "Firebase", "Riverpod"],
    tagline: "A social micro-journaling app with soft, tactile motion.",
    description:
      "Cross-platform mobile app with a hand-built motion system, offline drafts, and a friendship-graph feed. Custom bottom sheets and gestures.",
    role: "Mobile engineering · Motion design",
    accent: "ink",
    problem:
      "Micro-journaling apps feel clinical. The brief was: make writing a 2-line note feel as inviting as sending a voice message — but lower-effort.",
    approach: [
      "Designed a custom motion system (spring-based transitions, gesture-driven sheets).",
      "Offline drafts with conflict-free merge when reconnecting.",
      "Feed ranking by friendship graph weight instead of raw recency.",
      "Careful haptics on every interaction — subtle by default, bigger on celebratory moments.",
    ],
    outcome: [
      "60fps gestures on devices from 2019 onwards.",
      "Average time-to-first-post dropped from 42s to 11s after the motion redesign.",
    ],
  },
  {
    slug: "lumen-automation",
    title: "Lumen Automation",
    year: "2025",
    kind: "AI Automation",
    stack: ["n8n", "Python", "FastAPI", "OpenAI", "Zapier"],
    tagline:
      "An internal automation layer that replaced 3 ops roles worth of manual work.",
    description:
      "Automation flows that ingest emails, classify intent with an LLM, act on CRM/ERP systems, and keep humans in the loop only for exceptions. Full audit trail & retries.",
    role: "Workflow design · LLM integration",
    accent: "acid",
    problem:
      "An ops team was drowning in manual email triage — sales leads, support tickets, supplier messages — all forwarded by hand to different systems.",
    approach: [
      "Triage LLM classifies incoming email intent with a small labelled training set plus few-shot.",
      "Each intent routes to a dedicated n8n workflow that writes to CRM/ERP with structured payloads.",
      "Exception queue surfaces anything the model is unsure about (confidence < 0.8) for human review.",
      "Audit trail: every action is logged with the full prompt/response pair for later inspection.",
    ],
    outcome: [
      "~120 manual forwards/day → 0 by week 3.",
      "Saved the equivalent of 3 ops roles while keeping humans in the loop for edge cases.",
    ],
  },
  {
    slug: "studio-site",
    title: "Studio Site",
    year: "2023",
    kind: "Fullstack Web",
    stack: ["Next.js", "GSAP", "Sanity"],
    tagline:
      "A design studio site with editorial typography and choreographed scroll.",
    description:
      "Content-driven agency site with a headless CMS, interactive case studies, and a reduced-motion mode.",
    role: "Design · Frontend · CMS",
    accent: "plum",
    problem:
      "The studio needed a site that could keep up with their design work — most agency sites look like templates dressed up.",
    approach: [
      "Editorial-grade typography scale with variable fonts.",
      "Per-case-study scroll choreography via GSAP ScrollTrigger.",
      "Sanity-backed CMS with a flexible blocks model so editors can rearrange sections without dev time.",
      "First-class reduced-motion mode — ALL scroll animations swap for fades.",
    ],
    outcome: [
      "Bounce rate dropped 31% vs the previous site in the first month.",
      "Editors publish new case studies without engineering involvement.",
    ],
  },
  {
    slug: "kode-studio",
    title: "Kode Studio",
    year: "2025",
    kind: "AI Engineering",
    stack: ["Next.js", "Claude", "Monaco", "WebSockets"],
    tagline:
      "A pair-programming studio where an AI agent runs right inside the editor.",
    description:
      "A Monaco-based editor with a sidecar agent that can read files, propose patches, run tests, and negotiate with the human over chat. Focus on tight latency and undo-safety.",
    role: "Product · Editor integration · Agent UX",
    accent: "cobalt",
    problem:
      "Most AI-in-editor experiences are chat windows bolted onto IDEs. Feedback loops are slow and agent changes feel scary because undo is unreliable.",
    approach: [
      "Snapshot-based edit application — every agent change is a transaction the user can accept, reject, or partial-merge.",
      "Streamed diffs rendered inline so users see proposals before they land.",
      "Agent can ask targeted questions (‘which of these 3 files do you mean?’) instead of guessing.",
    ],
    outcome: [
      "Median time from intent → first running patch: 18s.",
      "Near-zero destructive actions because every edit is reversible.",
    ],
  },
  {
    slug: "tani-tracker",
    title: "Tani Tracker",
    year: "2023",
    kind: "Mobile Development",
    stack: ["Kotlin", "Jetpack Compose", "Room", "WorkManager"],
    tagline: "Android app for small farmers to log harvests, costs and weather.",
    description:
      "A lightweight Android app built for rural use: offline-first, low-memory, and accessible on budget phones. Includes a cost calculator and simple harvest projections.",
    role: "Android engineering · UX for rural users",
    accent: "ink",
    problem:
      "Farmers in rural areas track expenses and harvests in paper notebooks — easy to lose, hard to analyze, and not useful for lenders evaluating their business.",
    approach: [
      "Offline-first Room DB with background WorkManager sync when online.",
      "UX simplified to the three most common actions: log cost, log harvest, see weekly total.",
      "Printable monthly PDF summary so owners can share with buyers or banks.",
    ],
    outcome: [
      "Runs smoothly on 2GB-RAM Android Go devices.",
      "Field-tested with a cohort of 20 farmers; kept using it beyond the pilot.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}
