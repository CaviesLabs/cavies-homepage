import type { Project } from "./projects";

export const additionalProjects: Project[] = [
  {
    slug: "chat",
    name: "Chat",
    category: "Creator platform",
    headline: "Creator support, clearly connected.",
    description:
      "A creator-support platform connecting token launches with Kick and Twitch streamers.",
    image: "/work/chat-flow.webp",
    imageWidth: 1600,
    imageHeight: 900,
    color: "#c3f75a",
    tags: ["Product interface", "Brand identity"],
    role: "From our product portfolio",
    context:
      "Chat, at usechat.live, brings token creation and streamer support into a shared product experience.",
    approach:
      "Chat pairs a bold identity with a guided token-launch form, an animated fee-flow explanation, and concise product documentation. These original interfaces are shown as local previews with live data disconnected.",
    details: [
      "Guided token-launch interface",
      "Creator-fee flow visualization",
      "Product branding and documentation",
    ],
    url: "https://usechat.live/",
    imageNote: "Local interface preview · Live data disconnected",
  },
  {
    slug: "chirp",
    name: "Chirp",
    category: "Payments app",
    headline: "A payment starts with a little sound.",
    description:
      "A payment interface for sharing requests and unsigned drafts between nearby phones by sound.",
    image: "/work/chirp-home.webp",
    imageWidth: 1585,
    imageHeight: 995,
    color: "#e9e5d9",
    tags: ["Product design", "Responsive frontend"],
    role: "From our product portfolio",
    context:
      "Chirp, at justchirp.xyz, brings sound-based payment requests and offline drafts into a mobile-first Solana payment experience.",
    approach:
      "A restrained identity and clear Send and Receive flows make an unfamiliar interaction easy to follow. The illustrated walkthrough explains each step, including the sender reconnecting and approving before an offline draft becomes a payment.",
    details: [
      "Send and Receive payment flows",
      "Mobile-first app navigation",
      "Interactive onboarding walkthrough",
    ],
    url: "https://justchirp.xyz/",
    imageNote: "Product website · Signed-out view",
  },
  {
    slug: "beigman-engineering",
    name: "Beigman Engineering",
    category: "Business website",
    headline: "Technical expertise, clearly presented.",
    description:
      "A service-led website for a Melbourne fire engineering consultancy.",
    image: "/work/beigman-engineering-home.webp",
    imageWidth: 1585,
    imageHeight: 1050,
    color: "#e9e1d6",
    tags: ["Website design", "Frontend development"],
    role: "Website design & frontend development",
    context:
      "Beigman Engineering helps architects, developers, and building surveyors understand fire engineering requirements. Its website brings services, project experience, and enquiries together.",
    approach:
      "Architectural imagery, interactive service diagrams, and a sector-based project browser make technical expertise easier to explore. A visual roadmap explains the process from concept to construction.",
    details: [
      "Service and project discovery",
      "Interactive roadmap and diagrams",
      "Responsive website implementation",
    ],
    url: "https://beigman.com.au/",
    imageNote: "Business website",
  },
  {
    slug: "reply-guy",
    name: "Reply Guy",
    category: "Community rewards",
    headline: "A community around conversation.",
    description:
      "Reply rounds, community rankings, and reward reporting in one interface.",
    image: "/work/replyguy-home.webp",
    imageWidth: 1585,
    imageHeight: 849,
    color: "#dfeaa9",
    tags: ["Product interface", "Data visualization"],
    role: "From our product portfolio",
    context:
      "Reply Guy connects community submissions, voting, and reward reporting. These captures preserve the original product interface from its repository history.",
    approach:
      "A playful identity connects the arena, community leaderboard, activity charts, and reward-flow explanation. The original Reply Guy frontend is shown here with labeled sample data.",
    details: [
      "Round discovery and participation",
      "Leaderboards and activity reporting",
      "Reward-flow visualization",
    ],
    imageNote: "Original interface · Sample data",
  },
  {
    slug: "claimhq",
    name: "ClaimHQ",
    category: "Airdrop & rewards",
    headline: "A clearer path from eligible to claimed.",
    description:
      "A branded experience for airdrop claims and token distribution.",
    image: "/work/claimhq.webp",
    imageWidth: 1440,
    imageHeight: 870,
    color: "#15283b",
    tags: ["Product branding", "Frontend"],
    role: "Cavies Labs product development",
    context:
      "A reward claim is a short journey with important steps: connecting a wallet, checking eligibility, and understanding what can be collected. ClaimHQ brings that journey together with the distribution tools a project team needs.",
    approach:
      "A distinct visual identity and animated product walkthroughs explain both sides of the experience. Claiming and bulk distribution use a clear sequence of steps, illustrated states, and consistent calls to action.",
    details: [
      "Wallet and eligibility journeys",
      "Reward-claim and distribution flows",
      "Product branding and motion",
    ],
    imageNote: "Product website",
    gallery: [
      {
        src: "/work/claimhq-distribution.webp",
        caption: "Bulk distribution workflow",
        width: 1430,
        height: 1092,
      },
      {
        src: "/work/claimhq-claim-flow.webp",
        caption: "Reward-claiming workflow",
        width: 1430,
        height: 1092,
      },
    ],
  },
  {
    slug: "schlong",
    name: "Schlong",
    category: "Onchain game",
    headline: "A game with a personality of its own.",
    description:
      "A pixel-art game world with collectible shops and resource management.",
    image: "/work/schlong.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    color: "#9f3435",
    tags: ["Game interface", "Interaction design"],
    role: "From our product portfolio",
    context:
      "Schlong turns resource management, collectibles, and progression into a game world. The interface needs to carry its deliberately playful identity while keeping the player’s actions and status understandable.",
    approach:
      "Responsive room scenes, sound controls, and resource panels make the interface part of the world. The collectible shop brings artwork, attributes, and progression requirements together, while wallet-aware states explain what is available to the player.",
    details: [
      "Pixel-art game interface",
      "Collectible shop and progression",
      "Wallet-aware resource panels",
    ],
    imageNote: "Public testnet",
    gallery: [
      {
        src: "/work/schlong-shop.webp",
        caption: "Collectible shop · Testnet",
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    slug: "heavendash",
    name: "HeavenDash",
    category: "Protocol analytics",
    headline: "Revenue data, made readable.",
    description:
      "Token rankings, fee splits, and liquidity in a focused analytics interface.",
    image: "/work/heavendash.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    color: "#eedb8c",
    tags: ["Data visualization", "Dashboard design"],
    role: "Cavies Labs product development",
    context:
      "HeavenDash brings the Heaven ecosystem’s pool data into one place. Token prices, fees, volume, liquidity, and creator economics need a common structure before they become easy to compare.",
    approach:
      "Filterable token rankings, fee breakdowns, and charts for volume, liquidity, and pool activity.",
    details: [
      "Filterable token rankings",
      "Fee and liquidity dashboards",
      "Protocol charts and distributions",
    ],
    imageNote: "Dashboard · Sample data",
    gallery: [
      {
        src: "/work/heavendash-analytics.webp",
        caption: "Protocol analytics · Sample data",
        width: 1592,
        height: 995,
      },
    ],
  },
  {
    slug: "brrr",
    name: "brrr",
    category: "Cross-chain workspace",
    headline: "Complex operations. Clear next steps.",
    description: "Swaps, bridges, and token utilities in one Sei workspace.",
    image: "/work/brrr.webp",
    imageWidth: 1280,
    imageHeight: 860,
    color: "#d9e2f2",
    tags: ["Financial interfaces", "Frontend integration"],
    role: "Cavies Labs product development",
    context:
      "Moving between trading, swapping, bridging, and token tools can fragment a workflow. brrr gives these related activities a shared workspace for the Sei ecosystem.",
    approach:
      "A consistent navigation system connects protocol selection, swap and bridge panels, and token utilities. Wallet-aware states keep actions clear, while a three-stage USDC migration flow breaks a complex cross-chain operation into understandable steps.",
    details: [
      "Protocol selection and bridge UI",
      "Token migration workflows",
      "Wallet-aware interactions",
    ],
    imageNote: "Bridge interface",
    gallery: [
      {
        src: "/work/brrr-migration.webp",
        caption: "USDC migration workflow",
        width: 540,
        height: 660,
      },
    ],
  },
];

export const collaborations: Project[] = [
  {
    slug: "ancient8",
    name: "Ancient8",
    category: "Gaming ecosystem",
    kind: "collaboration",
    headline: "Alongside the next wave of gaming.",
    description:
      "Past product advisory and collaboration with the Ancient8 team.",
    image: "/work/ancient8.webp",
    imageWidth: 1600,
    imageHeight: 1146,
    color: "#dbea93",
    tags: ["Product advisory", "Collaboration"],
    role: "Past product advisors and collaborators",
    context:
      "The Cavies team supported Ancient8 as product advisors and collaborators during its earlier journey. That relationship is part of the product experience we bring to the studio today.",
    approach:
      "Ancient8’s current website presents its gaming ecosystem, infrastructure, and developer resources. These screenshots show the organization today, providing context for our past advisory and collaboration work.",
    details: ["Product advisory", "Product collaboration"],
    url: "https://ancient8.gg/",
    imageNote: "Current website",
    gallery: [
      {
        src: "/work/ancient8-games.webp",
        caption: "Current games directory",
        width: 1600,
        height: 838,
      },
    ],
  },
  {
    slug: "solscan",
    name: "Solscan",
    category: "Blockchain explorer",
    kind: "collaboration",
    headline: "Experience in a world of onchain data.",
    description:
      "Past product advisory and collaboration with the Solscan team.",
    image: "/work/solscan.webp",
    imageWidth: 1600,
    imageHeight: 1146,
    color: "#dfeaf2",
    tags: ["Product advisory", "Collaboration"],
    role: "Past product advisors and collaborators",
    context:
      "Our team worked with Solscan as product advisors and collaborators. It is part of our experience working alongside teams making complex blockchain products useful to a broad audience.",
    approach:
      "The current Solscan website brings together Solana network activity, transaction and account search, and explorer data. These screenshots show the organization today, providing context for our past advisory and collaboration work.",
    details: ["Product advisory", "Product collaboration"],
    url: "https://solscan.io/",
    imageNote: "Current website",
  },
];
