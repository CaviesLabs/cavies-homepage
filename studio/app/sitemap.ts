import type { MetadataRoute } from "next";
import { allProjects } from "@/lib/projects";
import { projectGalleries } from "@/lib/project-galleries";
import { absoluteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    ...allProjects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      images: [
        project.image,
        ...(project.gallery ?? []).map((image) => image.src),
        ...(projectGalleries[project.slug] ?? []).map((image) => image.src),
      ].map(absoluteUrl),
    })),
  ];
}
