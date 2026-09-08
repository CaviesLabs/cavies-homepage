import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://cavies.xyz", priority: 1 },
    ...projects.map((project) => ({
      url: `https://cavies.xyz/work/${project.slug}`,
      priority: 0.7,
    })),
  ];
}
