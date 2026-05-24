export type SkillGroup = {
  label: string;
  tag: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Mobile Development",
    tag: "01",
    items: [
      "Flutter / Dart",
      "React Native",
      "Kotlin · Android",
      "Swift · iOS basics",
      "Push · Deep links · Offline sync",
    ],
  },
  {
    label: "Fullstack Web",
    tag: "02",
    items: [
      "Next.js · React",
      "Node · TypeScript · tRPC",
      "Postgres · Prisma",
      "Tailwind · Framer Motion",
      "Vercel · Docker",
    ],
  },
  {
    label: "Game Development",
    tag: "03",
    items: [
      "Unity · C#",
      "Godot · GDScript",
      "Shader basics · Juicy physics",
      "Release pipelines",
    ],
  },
  {
    label: "AI Engineering",
    tag: "04",
    items: [
      "LLM orchestration",
      "Autonomous agents · tool-use",
      "RAG · Vector DBs",
      "Prompt engineering",
      "Workflow automation (n8n / Zapier)",
    ],
  },
];

export const marqueeWords = [
  "Saeful Rohman",
  "Computer Science",
  "Mobile Dev",
  "Fullstack Dev",
  "Game Dev",
  "AI Engineer",
  "Agents × Automation",
  "Designed in Indonesia",
];
