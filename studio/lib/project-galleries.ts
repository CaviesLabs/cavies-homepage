import type { Project } from "./projects";

type GalleryImage = NonNullable<Project["gallery"]>[number];

export const projectGalleries: Record<string, GalleryImage[]> = {
  seitrace: [
    {
      src: "/work/seitrace-gallery-block.webp",
      caption: "Block details · Sample data",
      width: 1590,
      height: 1483,
    },
    {
      src: "/work/seitrace-gallery-transaction.webp",
      caption: "Transaction details · Sample data",
      width: 1590,
      height: 1483,
    },
    {
      src: "/work/seitrace-gallery-api.webp",
      caption: "Data API overview · Sample data",
      width: 1600,
      height: 1430,
    },
  ],
  pit: [
    {
      src: "/work/pit-gallery-home.webp",
      caption: "Product homepage",
      width: 1600,
      height: 1040,
    },
    {
      src: "/work/pit-gallery-vault-detail.webp",
      caption: "Vault details & deposit interface",
      width: 1585,
      height: 1431,
    },
    {
      src: "/work/pit-gallery-strategy.webp",
      caption: "Strategy configuration",
      width: 896,
      height: 587,
    },
  ],
  launchreceipt: [
    {
      src: "/work/launchreceipt-gallery-preflight.webp",
      caption: "Creator preflight · Sample inputs",
      width: 1600,
      height: 1368,
    },
    {
      src: "/work/launchreceipt-gallery-api.webp",
      caption: "Developer API reference",
      width: 1600,
      height: 1510,
    },
  ],
  detourist: [
    {
      src: "/work/detourist-gallery-onboarding.webp",
      caption: "Travel preferences · Prototype",
      width: 1600,
      height: 2441,
    },
    {
      src: "/work/detourist-gallery-value-score.webp",
      caption: "Value-score breakdown · Illustrative example",
      width: 1600,
      height: 680,
    },
  ],
  ancient8: [
    {
      src: "/work/ancient8-gallery-ecosystem.webp",
      caption: "Current infrastructure & app directory",
      width: 1600,
      height: 1575,
    },
    {
      src: "/work/ancient8-gallery-build-map.webp",
      caption: "Current ecosystem map",
      width: 1600,
      height: 1100,
    },
    {
      src: "/work/ancient8-gallery-community.webp",
      caption: "Current community page section",
      width: 1600,
      height: 840,
    },
  ],
  solscan: [
    {
      src: "/work/solscan-gallery-tokens.webp",
      caption: "Current token leaderboard",
      width: 1600,
      height: 1608,
    },
    {
      src: "/work/solscan-gallery-token-detail.webp",
      caption: "Current token overview & price chart",
      width: 1600,
      height: 1070,
    },
    {
      src: "/work/solscan-gallery-defi.webp",
      caption: "Current DeFi analytics",
      width: 1600,
      height: 834,
    },
  ],
  "0dte": [
    {
      src: "/work/0dte-gallery-timeline.webp",
      caption: "Round and settlement timeline · Pre-launch",
      width: 1585,
      height: 400,
    },
    {
      src: "/work/0dte-gallery-news.webp",
      caption: "Editorial interface · Pre-launch",
      width: 1600,
      height: 1000,
    },
  ],
  captable: [
    {
      src: "/work/captable-gallery-coinflip.webp",
      caption: "Coinflip terminal · Pre-launch",
      width: 1600,
      height: 760,
    },
    {
      src: "/work/captable-gallery-upgrade.webp",
      caption: "Upgrade flow · Pre-launch",
      width: 1600,
      height: 1060,
    },
  ],
  schlong: [
    {
      src: "/work/schlong-gallery-collectible-art.webp",
      caption: "Collectible · Original artwork",
      width: 1254,
      height: 1254,
    },
  ],
  claimhq: [
    {
      src: "/work/claimhq-gallery-features.webp",
      caption: "Feature illustrations and visual language",
      width: 1280,
      height: 550,
    },
  ],
  heavendash: [
    {
      src: "/work/heavendash-gallery-creators.webp",
      caption: "Creator discovery · Sample data",
      width: 1600,
      height: 1120,
    },
    {
      src: "/work/heavendash-gallery-creator-detail.webp",
      caption: "Creator portfolio · Sample data",
      width: 1600,
      height: 1320,
    },
  ],
  brrr: [
    {
      src: "/work/brrr-gallery-send.webp",
      caption: "Token transfer setup",
      width: 1280,
      height: 700,
    },
    {
      src: "/work/brrr-gallery-multisend.webp",
      caption: "Batch transfer setup",
      width: 1280,
      height: 820,
    },
  ],
  pocket: [
    {
      src: "/work/pocket-gallery-home.webp",
      caption: "DCA product website · Source preview",
      width: 1280,
      height: 610,
    },
    {
      src: "/work/pocket-gallery-pair.webp",
      caption: "Token selection · Sample data",
      width: 1600,
      height: 900,
    },
    {
      src: "/work/pocket-gallery-schedule.webp",
      caption: "Recurring purchase setup · Sample data",
      width: 1600,
      height: 1270,
    },
  ],
};
