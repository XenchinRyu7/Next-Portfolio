import type { MetadataRoute } from "next";
import { getShowcaseProjects } from "@/lib/project-api";
import { getGalleryItems } from "@/lib/gallery-api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.saefulrohman.dev";

  // Static routes
  const routes = [
    "",
    "/work",
    "/gallery",
    "/certificates",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // Dynamic project pages
    const projects = await getShowcaseProjects();
    const projectUrls = projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // Dynamic gallery pages
    const galleryItems = await getGalleryItems({ limit: 100 });
    const galleryUrls = galleryItems.map((item) => ({
      url: `${baseUrl}/gallery/${item.id}`,
      lastModified: new Date(item.updatedAt || item.createdAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...routes, ...projectUrls, ...galleryUrls];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap, returning static routes:", error);
    return routes;
  }
}
