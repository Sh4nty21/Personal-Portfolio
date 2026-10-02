import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: new URL("/", base).href, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, base).href,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
