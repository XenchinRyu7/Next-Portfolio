export type Project = {
  id?: string;
  slug: string;
  title: string;
  kind: string;
  technologies: string[];
  tagline: string;
  shortDescription: string;
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

export const projects: Project[] = [];

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
