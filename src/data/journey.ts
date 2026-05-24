export type JourneyStage = {
  id: string;
  year: string;
  tag: string;
  title: string;
  place: string;
  description: string;
  highlights: string[];
};

export const journey: JourneyStage[] = [
  {
    id: "high-school",
    year: "2019 — 2022",
    tag: "Level 01 · Origin",
    title: "High School",
    place: "SMA · Computer & Informatics track",
    description:
      "Started the journey self-teaching HTML, CSS, JavaScript and Android basics. Hackathon club nights, discovering version control, falling in love with the moment code starts talking back.",
    highlights: [
      "First Android app",
      "Self-taught JS & Git",
      "Built school info-system",
    ],
  },
  {
    id: "mahasiswa",
    year: "2022 — Present",
    tag: "Level 02 · Expansion",
    title: "Mahasiswa — Informatics Engineering",
    place: "Computer Science / Teknik Informatika",
    description:
      "Formal grounding in algorithms, systems, networking and software engineering. Started shipping real products: mobile apps, fullstack platforms, and small games built in Unity/Godot.",
    highlights: [
      "Data Structures · Algorithms · DB",
      "Fullstack capstone projects",
      "Studio collabs",
    ],
  },
  {
    id: "apprenticeship",
    year: "2024",
    tag: "Level 03 · Apprenticeship",
    title: "Apprenticeship / Magang",
    place: "Industry placement — Software Engineering",
    description:
      "Worked inside a real engineering team shipping production software. Code reviews, CI/CD, design handoffs, shipping incremental value, and learning how startups actually run.",
    highlights: [
      "Production deploys",
      "Agile · Scrum",
      "Cross-functional handoffs",
    ],
  },
  {
    id: "ai-engineer",
    year: "2024 — Now",
    tag: "Level 04 · AI Engineering",
    title: "AI Engineer & Automation Builder",
    place: "Agents · LLM pipelines · Automation",
    description:
      "Building autonomous AI agents, retrieval systems, and orchestration flows — glueing LLMs to tools, browsers and business logic. Automations that quietly replace whole workflows.",
    highlights: [
      "AI agent orchestration",
      "RAG / tool-use",
      "Workflow automation",
    ],
  },
  {
    id: "mastery",
    year: "The Boss Level",
    tag: "Level 05 · Ongoing",
    title: "Shipping at the Intersection",
    place: "Mobile · Fullstack · Game · AI",
    description:
      "Operating at the intersection of product, engineering and AI. Designing systems end-to-end — from the DB schema and the API, to the screen, the motion, and the model prompt.",
    highlights: [
      "Systems thinking",
      "Design × engineering",
      "Velocity without drama",
    ],
  },
];
