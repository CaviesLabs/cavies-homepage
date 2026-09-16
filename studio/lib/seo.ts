import type { Metadata } from "next";

export const siteUrl = "https://cavies.xyz";
export const siteName = "Cavies Studio";
export const linkedInUrl = "https://www.linkedin.com/company/caviesstudio/";
export const homeTitle = "Cavies Studio | Website Design & Frontend Engineering";
export const homeDescription =
  "Website design and frontend engineering for startups and businesses in Australia and worldwide. Monthly plans shaped around your scope and budget.";
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).href;

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  isHome?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  isHome = false,
  image = {
    url: "/brand/social-card.png",
    width: 1200,
    height: 630,
    alt: "Cavies Studio — website design and frontend engineering for businesses",
  },
}: PageMetadataInput): Metadata {
  const fullTitle = isHome ? title : `${title} | ${siteName}`;
  const socialImage = { ...image, url: absoluteUrl(image.url) };
  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName,
      url: absoluteUrl(path),
      title: fullTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
}
