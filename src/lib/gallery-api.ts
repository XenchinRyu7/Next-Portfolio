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

const DEFAULT_API_BASE_URL = "https://api.saefulrohman.dev";

function getApiBaseUrl() {
  return (
    process.env.PORTFOLIO_API_URL ??
    process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ??
    DEFAULT_API_BASE_URL
  ).replace(/\/$/, "");
}

const fallbackGallery: GalleryItem[] = [];

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
