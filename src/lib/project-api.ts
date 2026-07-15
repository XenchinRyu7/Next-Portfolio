import { projects as localProjects, type Project } from "@/data/projects";

type ApiResponse<T> = {
  status: "success" | "fail" | "error";
  data: T;
};

type ApiProject = {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  tagline?: string;
  kind?: string;
  accent?: string;
  problem?: string;
  approach?: string[];
  outcome?: string[];
  technologies?: string[];
  role?: string;
  status?: "completed" | "in-progress" | "planned" | string;
  startDate?: string;
  endDate?: string;
  features?: string[];
  links?: { label: string; href: string }[] | Record<string, string | null | undefined>;
  images?: { url: string; alt?: string }[];
  tags?: string[];
  highlight?: boolean;
};

const DEFAULT_API_BASE_URL = "https://api.saefulrohman.dev";
const accents: Project["accent"][] = ["acid", "cobalt", "plum", "ink"];

export async function getShowcaseProjects(): Promise<Project[]> {
  const apiProjects = await fetchProjectsFromApi();

  if (apiProjects.length === 0) {
    return localProjects;
  }

  return mergeBackendWithLocal(apiProjects);
}

export async function getShowcaseProject(
  slug: string
): Promise<Project | undefined> {
  const projects = await getShowcaseProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getAdjacentShowcaseProjects(slug: string): Promise<{
  prev: Project | null;
  next: Project | null;
}> {
  const projects = await getShowcaseProjects();
  const i = projects.findIndex((project) => project.slug === slug);

  if (i === -1) return { prev: null, next: null };

  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}

async function fetchProjectsFromApi(): Promise<ApiProject[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/projects?limit=100`, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) return [];

    const json = (await response.json()) as ApiResponse<ApiProject[]>;

    if (json.status !== "success" || !Array.isArray(json.data)) {
      return [];
    }

    return json.data;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

function mergeBackendWithLocal(apiProjects: ApiProject[]) {
  const localBySlug = new Map(
    localProjects.map((project) => [project.slug, project])
  );

  const backendProjects = apiProjects.map((apiProject, index) =>
    mapApiProject(apiProject, localBySlug.get(apiProject.slug ?? ""), index)
  );

  const backendSlugs = new Set(backendProjects.map((project) => project.slug));
  const localOnlyProjects = localProjects.filter(
    (project) => !backendSlugs.has(project.slug)
  );

  return [...backendProjects, ...localOnlyProjects];
}

function mapApiProject(
  apiProject: ApiProject,
  localProject: Project | undefined,
  index: number
): Project {
  const slug =
    apiProject.slug ??
    localProject?.slug ??
    slugify(apiProject.title ?? "project-showcase");
  const technologies =
    apiProject.technologies && apiProject.technologies.length > 0
      ? apiProject.technologies
      : localProject?.technologies ?? [];
  const features = apiProject.features ?? localProject?.features ?? [];
  const description =
    apiProject.description ??
    localProject?.description ??
    apiProject.shortDescription ??
    "";

  return {
    ...localProject,
    id: apiProject.id ?? localProject?.id,
    slug,
    title: apiProject.title ?? localProject?.title ?? "Untitled Project",
    kind: apiProject.kind ?? localProject?.kind ?? inferKind(apiProject),
    technologies,
    tagline:
      apiProject.tagline ??
      localProject?.tagline ??
      apiProject.shortDescription ??
      description ??
      "Project showcase.",
    shortDescription:
      apiProject.shortDescription ??
      localProject?.shortDescription ??
      description ??
      "",
    description,
    role: apiProject.role ?? localProject?.role ?? "Developer",
    accent:
      normalizeAccent(apiProject.accent) ??
      localProject?.accent ??
      accents[index % accents.length],
    problem:
      apiProject.problem ??
      localProject?.problem ??
      description ??
      "Project context is still being expanded.",
    approach:
      normalizeList(apiProject.approach) ??
      localProject?.approach ??
      (features.length > 0 ? features : technologies.map((item) => `Built with ${item}.`)),
    outcome:
      normalizeList(apiProject.outcome) ??
      localProject?.outcome ??
      [
        statusToOutcome(apiProject.status),
        "Case study details are still being expanded.",
      ],
    links: mapLinks(apiProject.links) ?? localProject?.links,
    status: apiProject.status ?? localProject?.status,
    startDate: apiProject.startDate ?? localProject?.startDate,
    endDate: apiProject.endDate ?? localProject?.endDate,
    features,
    tags: apiProject.tags ?? localProject?.tags,
    highlight: apiProject.highlight ?? localProject?.highlight,
    images: apiProject.images ?? localProject?.images,
  };
}

function getApiBaseUrl() {
  const isDev = process.env.NODE_ENV === "development";
  const defaultUrl = isDev ? "http://localhost:3001" : DEFAULT_API_BASE_URL;
  return (
    process.env.PORTFOLIO_API_URL ??
    process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ??
    defaultUrl
  ).replace(/\/$/, "");
}

function inferKind(apiProject: ApiProject): Project["kind"] {
  const terms = [
    ...(apiProject.tags ?? []),
    ...(apiProject.technologies ?? []),
    apiProject.title,
    apiProject.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/\b(ai|rag|openai|model|machine learning|python)\b/.test(terms)) {
    return "AI Engineering";
  }

  if (/\b(mobile|android|kotlin|flutter|dart|firebase)\b/.test(terms)) {
    return "Mobile Development";
  }

  if (/\b(game|unity|godot)\b/.test(terms)) {
    return "Game Development";
  }

  return "Fullstack Web";
}

export function formatTimeline(startDate?: string, endDate?: string, status?: string) {
  if (!startDate && !endDate) return "Timeline pending";

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  if (startDate && endDate) {
    return `${formatDate(startDate)} — ${formatDate(endDate)}`;
  }
  if (startDate) {
    if (status === "in-progress") {
      return `${formatDate(startDate)} — Present`;
    }
    return `Started ${formatDate(startDate)}`;
  }
  if (endDate) {
    return `Finished ${formatDate(endDate)}`;
  }
  return "Timeline pending";
}

function mapLinks(links?: ApiProject["links"]) {
  if (!links) return undefined;

  if (Array.isArray(links)) {
    return links;
  }

  const record = links as Record<string, string | null | undefined>;
  const mapped = Object.entries(record)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([label, href]) => ({ label: humanize(label), href }));

  return mapped.length > 0 ? mapped : undefined;
}

function normalizeAccent(accent?: string): Project["accent"] | undefined {
  if (accent === "acid" || accent === "plum" || accent === "cobalt" || accent === "ink") {
    return accent;
  }

  return undefined;
}

function normalizeList(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return value ? [value] : undefined;
}

function humanize(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function statusToOutcome(status?: ApiProject["status"]) {
  if (status === "completed") return "Completed and ready to showcase.";
  if (status === "in-progress") return "Currently in progress.";
  if (status === "planned") return "Planned for a future iteration.";
  return "Project status is still being expanded.";
}
