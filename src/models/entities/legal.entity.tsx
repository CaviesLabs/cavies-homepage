import { ReactNode } from "react";
import { LegalNoticeComponent } from "@/src/components/legal/legal-notice";
import { LegalPrivacyNotice } from "@/src/components/legal/legal-privacy";

export interface LegalChildrenMenuItem {
  title: string;
  parentSlug: string;
}

export interface LegalMenuItem {
  slug: string;
  title: string;
  children: LegalChildrenMenuItem[];
  content: ReactNode;
}

export type LegalMenu = LegalMenuItem[];

export const legalNotice: LegalMenuItem = {
  slug: "/legal-notice",
  title: "Legal Notice",
  content: LegalNoticeComponent,
  children: [
    {
      title: "Application And Scope",
      parentSlug: "/legal-notice",
    },
    {
      title: "Licence",
      parentSlug: "/legal-notice",
    },
    {
      title: "Proprietary Rights",
      parentSlug: "/legal-notice",
    },
    {
      title: "Important Disclaimers",
      parentSlug: "/legal-notice",
    },
    {
      title: "No Offer Or Solicitation",
      parentSlug: "/legal-notice",
    },
    {
      title: "Forward-Looking Statements",
      parentSlug: "/legal-notice",
    },
    {
      title: "No Advice",
      parentSlug: "/legal-notice",
    },
    {
      title: "Third-Party Content",
      parentSlug: "/legal-notice",
    },
    {
      title: "Applicable Law And Disputes Resolution",
      parentSlug: "/legal-notice",
    },
    {
      title: "Communication",
      parentSlug: "/legal-notice",
    },
    {
      title: "Miscellaneous",
      parentSlug: "/legal-notice",
    },
    {
      title: "Definitions",
      parentSlug: "/legal-notice",
    },
  ],
};

export const privacyNotice: LegalMenuItem = {
  slug: "/privacy-notice",
  title: "Privacy Notice",
  content: LegalPrivacyNotice,
  children: [
    {
      title: "What information we collect",
      parentSlug: "/legal-notice",
    },
    {
      title: "How we use and share the information",
      parentSlug: "/legal-notice",
    },
    {
      title: "How long we process your data",
      parentSlug: "/legal-notice",
    },
    {
      title: "Third-party links",
      parentSlug: "/legal-notice",
    },
    {
      title: "Your rights",
      parentSlug: "/legal-notice",
    },
    {
      title: "Children personal data",
      parentSlug: "/legal-notice",
    },
    {
      title: "Changes to this Privacy Notice",
      parentSlug: "/legal-notice",
    },
  ],
};

export const legalMenus = [legalNotice, privacyNotice];
