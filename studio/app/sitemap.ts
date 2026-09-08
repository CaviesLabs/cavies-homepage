import type { MetadataRoute } from "next";
import { allProjects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://cavies.xyz", priority: 1 },
    ...allProjects.map((project) => ({
      url: `https://cavies.xyz/work/${project.slug}`,
      priority: 0.7,
    })),
  ];
}
