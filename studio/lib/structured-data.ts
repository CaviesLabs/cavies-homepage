import { contactEmail } from "./contact";
import {
  absoluteUrl,
  homeDescription,
  linkedInUrl,
  siteName,
  siteUrl,
  xUrl,
} from "./seo";
import type { Project } from "./projects";

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

export const organization = {
  "@type": "Organization",
  "@id": organizationId,
  name: siteName,
  alternateName: "Cavies",
  url: `${siteUrl}/`,
  description:
    "Website and product design, frontend engineering, integration, and scoped security audits for startups and businesses in Australia and worldwide.",
  email: contactEmail,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/brand/organization-logo.png"),
    width: 512,
    height: 512,
  },
  sameAs: [linkedInUrl, xUrl],
};

export function homeStructuredData(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteName,
        alternateName: "Cavies",
        url: `${siteUrl}/`,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: `${siteName} — Website design and frontend engineering`,
        description: homeDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/brand/social-card.png"),
        },
        mainEntity: {
          "@type": "ItemList",
          name: "Cavies Studio portfolio",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.name,
            url: absoluteUrl(`/work/${project.slug}`),
          })),
        },
      },
    ],
  };
}

export function workStructuredData(projects: Project[], description: string) {
  const url = absoluteUrl("/work");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteName,
            item: `${siteUrl}/`,
          },
          { "@type": "ListItem", position: 2, name: "Work", item: url },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `Work — ${siteName}`,
        description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        publisher: { "@id": organizationId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          name: "Cavies Studio case studies",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.name,
            url: absoluteUrl(`/work/${project.slug}`),
          })),
        },
      },
    ],
  };
}

type GameImage = {
  src: string;
  caption: string;
  width: number;
  height: number;
};

type VideoGameInput = {
  path: string;
  name: string;
  pageTitle: string;
  description: string;
  images: GameImage[];
  trailer: {
    name: string;
    description: string;
    contentUrl: string;
    thumbnailUrl: string;
    duration: string;
    uploadDate: string;
  };
  genre: string[];
  platforms: string[];
  /** The store page, once there is one; never invented. */
  storeUrl: string | null;
};

/**
 * A game's own page: its breadcrumb, the page, and the game as a VideoGame.
 * No offers, prices, ratings or release dates are stated: only what the page shows.
 */
export function videoGameStructuredData(game: VideoGameInput) {
  const url = absoluteUrl(game.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteName,
            item: `${siteUrl}/`,
          },
          { "@type": "ListItem", position: 2, name: game.name, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: game.pageTitle,
        description: game.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        publisher: { "@id": organizationId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#game` },
      },
      {
        "@type": "VideoGame",
        "@id": `${url}#game`,
        name: game.name,
        url,
        description: game.description,
        inLanguage: "en",
        genre: game.genre,
        gamePlatform: game.platforms,
        operatingSystem: game.platforms.join(", "),
        applicationCategory: "Game",
        playMode: "https://schema.org/SinglePlayer",
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
        image: game.images.map((image) => ({
          "@type": "ImageObject",
          contentUrl: absoluteUrl(image.src),
          caption: `${game.name} — ${image.caption}`,
          width: image.width,
          height: image.height,
        })),
        trailer: {
          "@type": "VideoObject",
          name: game.trailer.name,
          description: game.trailer.description,
          contentUrl: absoluteUrl(game.trailer.contentUrl),
          thumbnailUrl: absoluteUrl(game.trailer.thumbnailUrl),
          duration: game.trailer.duration,
          uploadDate: game.trailer.uploadDate,
        },
        ...(game.storeUrl ? { sameAs: [game.storeUrl] } : {}),
      },
    ],
  };
}

/** A page that belongs to a game's page, such as its press kit or support. */
export function gameSubpageStructuredData(page: {
  path: string;
  name: string;
  description: string;
  game: { name: string; path: string };
}) {
  const url = absoluteUrl(page.path);
  const gameUrl = absoluteUrl(page.game.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteName,
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.game.name,
            item: gameUrl,
          },
          { "@type": "ListItem", position: 3, name: page.name, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${page.game.name} ${page.name.toLowerCase()} — ${siteName}`,
        description: page.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        publisher: { "@id": organizationId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        about: { "@id": `${gameUrl}#game` },
      },
    ],
  };
}

export function caseStructuredData(
  project: Project,
  description: string,
  gallery: NonNullable<Project["gallery"]>,
) {
  const url = absoluteUrl(`/work/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteName,
            item: `${siteUrl}/`,
          },
          { "@type": "ListItem", position: 2, name: project.name, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${project.name} — ${siteName}`,
        description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        publisher: { "@id": organizationId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: absoluteUrl(project.image),
          caption: `${project.name} — ${project.imageNote}`,
          width: project.imageWidth,
          height: project.imageHeight,
        },
        image: gallery.map((image) => ({
          "@type": "ImageObject",
          contentUrl: absoluteUrl(image.src),
          caption: `${project.name} — ${image.caption}`,
          width: image.width,
          height: image.height,
        })),
      },
    ],
  };
}
