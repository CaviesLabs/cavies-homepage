import type { Project } from "./projects";

type GalleryImage = NonNullable<Project["gallery"]>[number];

export const projectGalleries: Record<string, GalleryImage[]> = {
  paperdash: [
    {
      src: "/work/paperdash-house-stats.webp",
      caption: "Protocol liquidity and open interest · Live data",
      width: 1920,
      height: 1476,
    },
    {
      src: "/work/paperdash-payout-calculator.webp",
      caption: "Payout calculator · Estimate",
      width: 1920,
      height: 1179,
    },
    {
      src: "/work/paperdash-arcade-table.webp",
      caption: "Arcade wheel table · Signed-out view",
      width: 1920,
      height: 1483,
    },
  ],
  reai: [
    {
      src: "/work/reai-how-it-works.webp",
      caption: "Setup in four steps · Illustrative",
      width: 1920,
      height: 1380,
    },
    {
      src: "/work/reai-handover.webp",
      caption: "Handover to the agent · Illustrative conversation",
      width: 1920,
      height: 1619,
    },
    {
      src: "/work/reai-assistant-chat.webp",
      caption: "Managing listings by chat · Illustrative conversation",
      width: 1920,
      height: 1176,
    },
  ],
  vpawhook: [
    {
      src: "/work/vpawhook-race-formats.webp",
      caption: "Race formats and pet progression · Pre-launch",
      width: 1920,
      height: 1463,
    },
    {
      src: "/work/vpawhook-race-replay.webp",
      caption: "Race replay · Sepolia testnet",
      width: 1920,
      height: 1811,
    },
    {
      src: "/work/vpawhook-wardrobe.webp",
      caption: "Pet wardrobe · Art preview",
      width: 1920,
      height: 1784,
    },
  ],
  skew: [
    {
      src: "/work/skew-composer-mobile.webp",
      caption: "Outcome composer on a phone · Live market data",
      width: 820,
      height: 1775,
    },
    {
      src: "/work/skew-history-mobile.webp",
      caption: "Index price history · Live market data",
      width: 820,
      height: 1775,
    },
    {
      src: "/work/skew-learn-mobile.webp",
      caption: "Options basics · Educational",
      width: 820,
      height: 1775,
    },
  ],
  loosecoins: [
    {
      src: "/work/loosecoins-evidence.webp",
      caption: "Evidence and source details · Example address",
      width: 1920,
      height: 1200,
    },
  ],
  dexpaid: [
    {
      src: "/work/dexpaid-fee-routes.webp",
      caption: "Fee routes and selection policy · Pre-launch",
      width: 1920,
      height: 1519,
    },
  ],
  emberline: [
    {
      src: "/work/emberline-draft-package.webp",
      caption: "Draft evidence package · Synthetic sample",
      width: 1920,
      height: 1325,
    },
  ],
  chat: [
    {
      src: "/work/chat-launch.webp",
      caption: "Token-launch form · Local preview, live data disconnected",
      width: 1585,
      height: 1469,
    },
    {
      src: "/work/chat-docs.webp",
      caption: "Product documentation · Local preview",
      width: 1600,
      height: 1520,
    },
    {
      src: "/work/chat-brand.webp",
      caption: "Original brand artwork",
      width: 1280,
      height: 427,
    },
  ],
  chirp: [
    {
      src: "/work/chirp-walkthrough.webp",
      caption: "Interactive payment walkthrough · Illustration",
      width: 1585,
      height: 1250,
    },
    {
      src: "/work/chirp-app.webp",
      caption: "App home and offline-mode entry · Signed-out view",
      width: 1600,
      height: 1230,
    },
    {
      src: "/work/chirp-receive.webp",
      caption: "Mobile payment-request form · Signed-out view",
      width: 860,
      height: 2300,
    },
  ],
  "beigman-engineering": [
    {
      src: "/work/beigman-engineering-projects.webp",
      caption: "Project portfolio",
      width: 1600,
      height: 1320,
    },
    {
      src: "/work/beigman-engineering-roadmap.webp",
      caption: "Interactive engineering roadmap",
      width: 1600,
      height: 1320,
    },
    {
      src: "/work/beigman-engineering-solutions.webp",
      caption: "Performance-solutions explorer",
      width: 1600,
      height: 1320,
    },
  ],
  "reply-guy": [
    {
      src: "/work/replyguy-stats.webp",
      caption: "Activity analytics · Sample data",
      width: 1585,
      height: 1293,
    },
    {
      src: "/work/replyguy-leaderboard.webp",
      caption: "Community leaderboard · Sample data",
      width: 1585,
      height: 1207,
    },
    {
      src: "/work/replyguy-cash-flow.webp",
      caption: "Reward-flow explanation · Sample data",
      width: 1600,
      height: 1140,
    },
  ],
  seitrace: [
    {
      src: "/work/seitrace-archive-block.webp",
      caption: "Block details · Sample data",
      width: 1600,
      height: 1183,
    },
    {
      src: "/work/seitrace-archive-transaction.webp",
      caption: "Transaction details · Sample data",
      width: 1600,
      height: 1222,
    },
    {
      src: "/work/seitrace-archive-account.webp",
      caption: "Account details · Sample data",
      width: 1600,
      height: 1478,
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
