import type { MetadataRoute } from "next";
import { allProjects } from "@/lib/projects";
import { projectGalleries } from "@/lib/project-galleries";
import {
  gamePaths,
  pressAssets,
  screenshots,
  trailer,
} from "@/lib/oddly-orderly";
import { absoluteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/work") },
    { url: absoluteUrl("/services/business-websites") },
    { url: absoluteUrl("/contact") },
    ...allProjects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      images: [
        project.image,
        ...(project.gallery ?? []).map((image) => image.src),
        ...(projectGalleries[project.slug] ?? []).map((image) => image.src),
      ].map(absoluteUrl),
    })),
    {
      url: absoluteUrl(gamePaths.game),
      images: [
        pressAssets.logo.src,
        trailer.poster,
        ...screenshots.map((shot) => shot.src),
      ].map(absoluteUrl),
    },
    {
      url: absoluteUrl(gamePaths.press),
      images: [
        ...screenshots.map((shot) => shot.src),
        pressAssets.logo.src,
        pressAssets.icon.src,
        pressAssets.capsule.src,
      ].map(absoluteUrl),
    },
    { url: absoluteUrl(gamePaths.support) },
    { url: absoluteUrl(gamePaths.privacy) },
  ];
}
