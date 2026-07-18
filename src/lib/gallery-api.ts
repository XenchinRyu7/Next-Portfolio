export type GalleryImage = {
  url: string;
  alt?: string;
  path?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  date: string; // e.g. "2025-11"
  images: GalleryImage[];
  createdAt: string;
  updatedAt: string;
  highlight?: boolean;
};

type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
  code: number;
  timestamp: string;
};

const DEFAULT_API_BASE_URL = "https://saefulrdevs-portfolio-api.vercel.app";

function getApiBaseUrl() {
  const isDev = process.env.NODE_ENV === "development";
  const defaultUrl = isDev ? "http://localhost:3001" : DEFAULT_API_BASE_URL;
  return (
    process.env.PORTFOLIO_API_URL ??
    process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ??
    defaultUrl
  ).replace(/\/$/, "");
}

// Fallback data if backend returns empty or is offline
const fallbackGallery: GalleryItem[] = [
  {
    id: "fb-1",
    title: "Speaker at DevFest Jakarta 2025",
    description: "Menjadi pembicara di sesi Web & Frontend track membahas performa Next.js 15 dan React Compiler di hadapan ratusan developer.",
    date: "2025-11",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop",
        alt: "Speaking at DevFest Jakarta 2025 on Next.js 15"
      },
      {
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1470&auto=format&fit=crop",
        alt: "Q&A session with attendees at DevFest"
      }
    ],
    createdAt: "2026-07-19T03:22:15.000Z",
    updatedAt: "2026-07-19T03:22:15.000Z",
    highlight: true
  },
  {
    id: "fb-2",
    title: "Trainer at Modern React Workshop 2025",
    description: "Mengadakan pelatihan intensif hands-on workshop mengenai State Management, Server Actions, dan performa rendering React modern.",
    date: "2025-08",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
        alt: "Mentoring engineers on React architectures"
      }
    ],
    createdAt: "2026-07-19T03:22:15.000Z",
    updatedAt: "2026-07-19T03:22:15.000Z",
    highlight: true
  },
  {
    id: "fb-3",
    title: "Winner at AI Agent Hackathon 2026",
    description: "Memenangkan juara pertama dalam merancang autonomous agent swarm yang mampu melakukan debugging kode otomatis secara real-time.",
    date: "2026-02",
    images: [
      {
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop",
        alt: "Presenting the autonomous agent prototype"
      }
    ],
    createdAt: "2026-07-19T03:22:15.000Z",
    updatedAt: "2026-07-19T03:22:15.000Z",
    highlight: true
  }
];

export async function getGalleryItems(params?: {
  q?: string;
  page?: number;
  limit?: number;
}): Promise<GalleryItem[]> {
  const q = params?.q ?? "";
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const url = new URL(`${getApiBaseUrl()}/api/gallery`);
    if (q) url.searchParams.append("q", q);
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    const response = await fetch(url.toString(), {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn("Backend API response not OK, using fallback gallery data.");
      return filterLocalGallery(fallbackGallery, q);
    }

    const json = (await response.json()) as ApiResponse<GalleryItem[]>;

    if (json.status !== "success" || !Array.isArray(json.data) || json.data.length === 0) {
      return filterLocalGallery(fallbackGallery, q);
    }

    return json.data;
  } catch (error) {
    console.error("Failed to fetch gallery items, using fallback data:", error);
    return filterLocalGallery(fallbackGallery, q);
  } finally {
    clearTimeout(timeout);
  }
}

function filterLocalGallery(items: GalleryItem[], query: string): GalleryItem[] {
  if (!query) return items;
  const lowercaseQuery = query.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery)
  );
}

export async function getGalleryItem(id: string): Promise<GalleryItem | undefined> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/gallery/${id}`, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (response.ok) {
      const json = (await response.json()) as ApiResponse<GalleryItem>;
      if (json.status === "success" && json.data) {
        return json.data;
      }
    }
  } catch (error) {
    console.warn(`Direct fetch for gallery item ${id} failed, falling back to scanning list:`, error);
  } finally {
    clearTimeout(timeout);
  }

  const allItems = await getGalleryItems({ limit: 100 });
  return allItems.find((item) => item.id === id);
}
