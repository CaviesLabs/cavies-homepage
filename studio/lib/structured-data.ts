import { contactEmail } from "./contact";
import { absoluteUrl, homeDescription, linkedInUrl, siteName, siteUrl } from "./seo";
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
  sameAs: [linkedInUrl],
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
