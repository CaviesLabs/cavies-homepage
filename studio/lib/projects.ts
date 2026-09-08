import { additionalProjects, collaborations } from "./additional-projects";
export { collaborations } from "./additional-projects";

export type Project = {
  kind?: "product" | "collaboration";
  slug: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  color: string;
  tags: string[];
  role: string;
  context: string;
  approach: string;
  details: string[];
  url?: string;
  imageNote: string;
  gallery?: { src: string; caption: string; width?: number; height?: number }[];
};

const existingProjects: Project[] = [
  {
    slug: "seitrace",
    name: "Seitrace",
    category: "Blockchain explorer",
    headline: "Complex data. A clearer picture.",
    description: "A readable, searchable interface to the Sei ecosystem.",
    image: "/work/seitrace.webp",
    imageWidth: 1250,
    imageHeight: 640,
    color: "#e5ebee",
    tags: ["Data-rich interfaces", "Frontend"],
    role: "Cavies Labs product development",
    context:
      "An explorer has to make an entire network understandable, from a first transaction lookup to a detailed investigation of an address or contract.",
    approach:
      "The frontend brings search, transaction details, token information, and developer-facing tools into one consistent interface. Dense data gets a clear hierarchy and familiar navigation.",
    details: [
      "Transaction and address exploration",
      "Search and structured data views",
      "Reusable interface components",
    ],
    url: "https://seitrace.com",
    imageNote:
      "Insights developer-tools page, captured from the original frontend",
    gallery: [
      {
        src: "/work/seitrace-header.webp",
        caption: "Explorer navigation and search · Original frontend",
      },
    ],
  },
  {
    slug: "captable",
    name: "Cap Table",
    category: "Strategy game",
    headline: "Serious systems. Playful character.",
    description:
      "A character-led interface for an onchain corporate-ladder game.",
    image: "/work/captable.webp",
    imageWidth: 1250,
    imageHeight: 640,
    color: "#e8eddf",
    tags: ["Product interface", "Design engineering"],
    role: "From our product portfolio",
    context:
      "A strategy game brings together hiring, progression, actions, and rewards. Cap Table gives these connected systems a recognizable world of their own.",
    approach:
      "A pixel-art cast and a playful corporate identity connect the launch experience to a dashboard of game actions. Reusable interaction patterns make the many states feel like one product.",
    details: [
      "Game interface and progression flows",
      "Brand expressed in the interface",
      "Responsive web implementation",
    ],
    imageNote: "Pre-launch homepage, captured from the original frontend",
  },
  {
    slug: "0dte",
    name: "0DTE",
    category: "Expiry-market interface",
    headline: "Bold identity. Clear decisions.",
    description: "A distinctive interface for an onchain expiry market.",
    image: "/work/0dte.webp",
    imageWidth: 1250,
    imageHeight: 640,
    color: "#fae8bc",
    tags: ["Visual identity", "Frontend"],
    role: "From our product portfolio",
    context:
      "An expiry market introduces its own decisions, from selecting a market mood to understanding bonds and settlement. The interface needs to make that product model legible.",
    approach:
      "A bold editorial visual language extends from the landing page into market selection and settlement flows. High-contrast surfaces and progressive disclosure organize the details.",
    details: [
      "Distinctive product art direction",
      "Market selection and settlement flows",
      "Responsive frontend architecture",
    ],
    imageNote: "Pre-launch homepage, captured from the original frontend",
    gallery: [
      {
        src: "/work/0dte-board.webp",
        caption:
          "Market selection and bond-ticket interface · Pre-launch frontend with placeholder states",
      },
    ],
  },
  {
    slug: "pocket",
    name: "Pocket",
    category: "Consumer finance",
    headline: "Make a complex habit feel simple.",
    description: "An approachable interface for recurring crypto purchases.",
    image: "/work/pocket.webp",
    imageWidth: 1200,
    imageHeight: 630,
    color: "#e9e4f5",
    tags: ["Product design", "Web3 integration"],
    role: "Cavies Labs product development",
    context:
      "Recurring purchases introduce schedules, assets, and wallet interactions. Pocket gives these concepts a friendly home rather than exposing all the complexity at once.",
    approach:
      "A character-led identity accompanies a focused interface for dollar-cost averaging, with clear product education and a consistent visual system.",
    details: [
      "Recurring purchase experience",
      "Wallet-connected frontend",
      "Friendly product branding",
    ],
    imageNote: "Original product brand artwork",
  },
  {
    slug: "launchreceipt",
    name: "LaunchReceipt",
    category: "Developer tools",
    headline: "Give every launch a paper trail.",
    description:
      "Token-launch provenance and protocol evidence, made readable.",
    image: "/work/launchreceipt.webp",
    imageWidth: 1265,
    imageHeight: 712,
    color: "#f1e4df",
    tags: ["Developer experience", "Product UI"],
    role: "From our product portfolio",
    context:
      "Launch research involves fragmented information about provenance, protocol behavior, and economics. LaunchReceipt gives that evidence a structured place to inspect.",
    approach:
      "A read-only scanner, detailed receipts, and creator-preflight forms organize complex launch information. Clear hierarchy makes evidence and methodology available alongside the conclusions.",
    details: [
      "Research and creator-preflight flows",
      "Evidence hierarchy and receipt details",
      "Protocol data visualization",
    ],
    imageNote: "Product interface",
    gallery: [
      {
        src: "/work/launchreceipt-home.webp",
        caption: "The scanner entry point · Public product interface",
      },
    ],
  },
  {
    slug: "pit",
    name: "Pit Finance",
    category: "Vault dashboard",
    headline: "Clarity beneath the complexity.",
    description:
      "Strategy details and wallet-connected actions in a focused vault interface.",
    image: "/work/pit.webp",
    imageWidth: 1265,
    imageHeight: 712,
    color: "#dce5f1",
    tags: ["Dashboard", "Frontend integration"],
    role: "Cavies Labs product development",
    context:
      "A vault interface needs to make strategy information, balances, and actions easy to find while preserving the detail needed to understand the product.",
    approach:
      "Overview panels, structured data, and consistent deposit and withdrawal patterns bring the workflow together. The frontend supports both high-level browsing and detailed vault exploration.",
    details: [
      "Vault discovery and overview",
      "Deposit and withdrawal interfaces",
      "Reusable dashboard components",
    ],
    imageNote: "Public vault interface, shown without a connected wallet",
  },
  {
    slug: "detourist",
    name: "Detourist",
    category: "Travel discovery",
    headline: "Find the worthwhile detour.",
    description:
      "A travel-deals experience built around a clearer sense of value.",
    image: "/work/detourist.webp",
    imageWidth: 1265,
    imageHeight: 712,
    color: "#dee7dc",
    tags: ["Consumer UX", "Product design"],
    role: "From our product portfolio",
    context:
      "Travel offers are easy to find and harder to compare. Detourist focuses on helping flexible travelers understand which opportunities fit their preferences.",
    approach:
      "Curated deal presentation, a value score, and personal preferences organize the discovery experience. The frontend extends from the public landing page into onboarding and deal details.",
    details: [
      "Consumer discovery experience",
      "Preference-based onboarding",
      "Responsive landing and product pages",
    ],
    imageNote: "Public launch landing page",
    gallery: [
      {
        src: "/work/detourist-deals.webp",
        caption:
          "Deal discovery and value comparison · Sample offers shown in the product",
      },
    ],
  },
];

const leadProjects = existingProjects.filter((p) =>
  ["seitrace", "captable", "0dte", "pit"].includes(p.slug),
);
const otherProjects = existingProjects.filter((p) => !leadProjects.includes(p));
export const projects: Project[] = [
  ...additionalProjects,
  ...leadProjects,
  ...otherProjects,
];
export const allProjects: Project[] = [...projects, ...collaborations];
export const projectNumber = (index: number) =>
  String(index + 1).padStart(2, "0");

export const emailHref =
  "mailto:tin@cavies.xyz?subject=Let%27s%20build%20something%20with%20Cavies";
export const telegramHref = "https://t.me/tincavies";
