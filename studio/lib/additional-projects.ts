import type { Project } from "./projects";

export const additionalProjects: Project[] = [
  {
    slug: "paperdash",
    name: "Paperdash",
    category: "Trading interface",
    headline: "Origami tables. Real positions.",
    description:
      "An independent web app, Telegram bot, and origami arcade for Papertrade. Paperdash has shut down.",
    image: "/work/paperdash-arcade-table.webp",
    imageWidth: 1920,
    imageHeight: 1483,
    color: "#f8e6f0",
    tags: ["Trading interfaces", "Game interface"],
    role: "From our product portfolio",
    context:
      "Papertrade is an onchain protocol for high-leverage BTC and ETH positions margined in USDC. Its fees, price impact, liquidation, and payout rules are hard to read from raw protocol data before placing an order.",
    approach:
      "Paperdash brought live prices, protocol statistics, and clearly labeled payout estimates together with a one-screen trading terminal, a Telegram bot, and an origami-themed arcade. Each arcade table stated the position it would open, and the terminal, the bot, and every arcade round placed real Papertrade orders. Paperdash has since shut down; these images were captured from the live site in October 2026.",
    details: [
      "Origami arcade tables on real positions",
      "Live market and protocol analytics",
      "One-screen trading terminal",
      "Telegram bot and nine languages",
    ],
    imageNote: "Arcade wheel table · Captured while live",
  },
  {
    slug: "reai",
    name: "Reai",
    category: "AI property assistant",
    headline: "Quick to reply. Quick to hand over.",
    description:
      "A WhatsApp assistant that answers Singapore property agents’ enquiries from their own listings.",
    image: "/work/reai-home.webp",
    imageWidth: 1920,
    imageHeight: 1200,
    color: "#f6d3c4",
    tags: ["AI product", "Product design"],
    role: "From our product portfolio",
    context:
      "Property agents get the same WhatsApp questions at all hours, and a slow reply can lose a lead. Each agent who signs up gets an AI assistant on their own work number that answers using only that agent’s listings, rules, and official sources. Reai is in a trial at reai.sg.",
    approach:
      "Clients keep messaging the agent’s usual number. Agents work with Reai’s central AI on its own company number: lead summaries, viewing times to approve, questions handed over with a suggested reply, and changes previewed before the agent confirms them. A web workspace holds listings, clients, and settings, and a shadow mode drafts replies beside the agent’s own before anything is sent. Reai is in a trial at reai.sg.",
    details: [
      "An assistant on each agent’s own number",
      "A central AI on Reai’s company number",
      "Answers grounded in the agent’s listings",
      "Agent-approved viewings and handovers",
    ],
    url: "https://reai.sg",
    liveLink: { href: "https://reai.sg", label: "Visit reai.sg" },
    imageNote: "Product website · Illustrative conversation",
  },
  {
    slug: "tender",
    name: "Tender",
    category: "AI inference marketplace",
    headline: "AI compute, priced in the open.",
    description:
      "A marketplace where buyers name their price for AI inference, with a public order book and a price index.",
    image: "/work/tender-home-headline.webp",
    imageWidth: 1920,
    imageHeight: 920,
    color: "#e3c6cd",
    tags: ["Trading interfaces", "API development"],
    role: "Product and website design, frontend & API development for HyperFlow",
    context:
      "Tender is HyperFlow’s market for AI inference. A buyer picks a model, an amount, and the price they will pay per million output tokens, and the order rests in a public book until one of HyperFlow’s sellers fills it. Buyers need a reference price to check before they bid.",
    approach:
      "Cavies designed and built the four-page site and the service behind it. The Trade page puts a model’s reference price and its history beside an order panel and the open book, and Compute ETF tracks ten models as one basket against their list prices, as a reference level and not a fund. The API computes the index from public market prices, keeps the book, and records each step of an order. Tender is at an early stage: orders are filled by hand and paid in USDC on the Elysium network, and compute forwards are in development.",
    details: [
      "Order book with buyer-set prices",
      "Reference price index for each model",
      "Compute basket and market statistics",
      "Index, order, and gateway API",
    ],
    url: "https://tender-by-hyperflow.vercel.app",
    liveLink: {
      href: "https://tender-by-hyperflow.vercel.app",
      label: "Visit Tender",
    },
    imageNote: "Landing page · Live site",
  },
  {
    slug: "amoeba",
    name: "Amoeba",
    category: "Token and Uniswap v4 hook",
    headline: "One pool, drawn as a living cell.",
    description:
      "A token on Elysium whose Uniswap v4 hook is shown as an organism under a microscope, one arm for each thing the hook does.",
    image: "/work/amoeba-home.webp",
    imageWidth: 1920,
    imageHeight: 1200,
    color: "#c4ecea",
    tags: ["Web3 integration", "Design engineering"],
    role: "From our product portfolio",
    context:
      "AMOEBA is one token and one Uniswap v4 pool on Elysium. Its hook is designed to take a share of each trade and route it to a treasury vault and a buyback-and-burn reserve, with a liquidity share built in and switched off, and the launch liquidity is designed to sit in a locker that can only add to it. Rules like these usually live in contract code and long documents. Amoeba is pre-launch: the token and pool are not deployed yet.",
    approach:
      "The home page is the organism itself, drawn live in WebGL. Each arm is one program of the hook, solid when it runs from launch and dashed when it is built in but off, and opening an arm moves the camera to it and shows that program’s card. Behind the map sit the same programs as a plain list, the published rules that set the organism’s state, and a list of what can and cannot change. Amoeba is pre-launch: the token and pool are not deployed yet, so the site’s counters are empty and contract addresses read “at launch”.",
    details: [
      "Live WebGL map of the hook’s programs",
      "Fee-routing cards with status badges",
      "Published rules for the organism’s state",
      "What can and cannot change, in plain words",
    ],
    url: "https://amoeba.family",
    liveLink: { href: "https://amoeba.family", label: "Visit amoeba.family" },
    imageNote: "Home page · Pre-launch",
  },
  {
    slug: "tyche",
    name: "Tyche",
    category: "Trading terminal",
    headline: "One terminal. One daily pot.",
    description:
      "A pre-launch trading terminal for tokens launched on Elysium, where a share of each trade’s fee is designed to feed one daily pot.",
    image: "/work/tyche-home-pot.webp",
    imageWidth: 1920,
    imageHeight: 1200,
    color: "#ffe9a8",
    tags: ["Trading interfaces", "Design engineering"],
    role: "From our product portfolio",
    context:
      "Tokens on Elysium launch on launchpads, each into its own Uniswap v4 pool. Tyche is designed to route buys and sells into those pools and to send a small fee on each routed trade into one pot of HYPE, which a daily draw pays to a single wallet. That puts a market, a fee, and a draw on the same screen, and each has to say plainly what belongs to Tyche and what belongs to the venue. Tyche is pre-launch: its contracts are not deployed, trading is closed, and no draw has run.",
    approach:
      "The identity is a pachinko parlour. The home screen is a cabinet with an LED readout of the day’s pot and a countdown to the draw, and the screens where money moves stay calm. A token page pairs a candle chart with a trade panel that lists the venue’s fee and Tyche’s fee on separate lines, and the draw page sets out, step by step, how a public randomness round is designed to pick one ticket. Night and daylight themes are two designed palettes on one set of design tokens. The images come from a pre-launch preview build, so the pot is empty and no draw has run.",
    details: [
      "Pachinko cabinet for the pot and countdown",
      "Token pages with charts and a trade panel",
      "Venue and Tyche fees on separate lines",
      "Draw steps set out in plain words",
    ],
    imageNote: "Daily pot · Pre-launch preview",
  },
  {
    slug: "vpawhook",
    name: "vPawHook",
    category: "Onchain clan game",
    headline: "Pixel pets. Onchain races.",
    description:
      "A pixel-art clan racing game on Ethereum, built around an upgradeable Uniswap v4 hook.",
    image: "/work/vpawhook-fee-routing.webp",
    imageWidth: 1920,
    imageHeight: 1571,
    color: "#ecf0cc",
    tags: ["Game interface", "Design engineering"],
    role: "From our product portfolio",
    context:
      "vPawHook ties a pet-racing game to one Uniswap v4 pool. Clans share a pet and burn or lock tokens during timed races, while pool fees are designed to fund prizes, so game rules, token actions, and claims all need to stay easy to follow.",
    approach:
      "A pixel-art world, wardrobe, and clan pages carry the identity. A hook explainer shows where each swap fee goes, race formats are set out before each event, and an input-by-input replay shows how a pet earned its result. The game has not launched: the pool has not opened and nothing can be traded yet. vpawhook.com is open for clan pre-registration, and the race replay shown here comes from an earlier Sepolia test site.",
    details: [
      "Fee-routing hook explainer",
      "Race formats and pet progression",
      "Input-by-input race replay",
      "Pet wardrobe and pixel-art identity",
    ],
    url: "https://vpawhook.com",
    liveLink: { href: "https://vpawhook.com", label: "Visit vpawhook.com" },
    imageNote: "Hook and fee routing · Pre-launch",
  },
  {
    slug: "skew",
    name: "Skew",
    category: "Options trading app",
    headline: "Complex contracts. One plain sentence.",
    description:
      "A mobile-first options app that turns a plain-language market view into a listed contract.",
    image: "/work/skew-discover.webp",
    imageWidth: 1920,
    imageHeight: 1200,
    color: "#e8f0cf",
    tags: ["Mobile product design", "Trading interfaces"],
    role: "From our product portfolio",
    context:
      "Options pack strikes, expiries, premiums, and settlement rules into one decision, and onchain venues add wallets, networks, and funding steps. Skew was designed to make that decision readable on a phone without hiding the risk.",
    approach:
      "A sentence composer matches a view such as “I think ETH finishes higher” to listed calls and puts on Derive and Hypercall, then shows the current ask, maximum loss, break-even, and an at-expiry payoff chart before any order review. Each order or transfer has its own review and is signed in the user’s own wallet, and clearly labeled educational examples stay separate from live markets. The images show the final release running locally with live public market data.",
    details: [
      "Plain-language outcome composer",
      "At-expiry payoff and price-history charts",
      "Wallet-signed order and transfer reviews",
      "Labeled educational examples",
    ],
    imageNote: "Discover · Live market data",
  },
  {
    slug: "loosecoins",
    name: "Loosecoins",
    category: "Wallet checker",
    headline: "Paste an address. See what was left behind.",
    description:
      "A read-only check of public sources for forgotten balances on EVM and Solana addresses.",
    image: "/work/loosecoins-results.webp",
    imageWidth: 1920,
    imageHeight: 1200,
    color: "#f5ebd2",
    tags: ["Data-rich interfaces", "Web3 integration"],
    role: "From our product portfolio",
    context:
      "Leftover crypto sits where wallet apps don’t look: old contract balances, unclaimed staking withdrawals, stalled bridge transfers, and rent held by empty Solana token accounts.",
    approach:
      "Loosecoins checks the public sources that match a pasted address and labels each finding ready, waiting, blocked, or to check, with a link to its source. Historical snapshots never count toward ready totals, and an unreachable source shows as unavailable rather than empty.",
    details: [
      "EVM and Solana checks, no wallet connection",
      "Ready, waiting, blocked, and to-check states",
      "Evidence and source links",
    ],
    imageNote: "Scan results · Example address",
  },
  {
    slug: "dexpaid",
    name: "DexPaid",
    category: "Token launchpad",
    headline: "Know where the creator fees go.",
    description:
      "A Solana launchpad that routes creator fees to token marketing and buybacks, with a public ledger.",
    image: "/work/dexpaid-discover.webp",
    imageWidth: 1920,
    imageHeight: 1035,
    color: "#e4e3f7",
    tags: ["Product interface", "Web3 integration"],
    role: "From our product portfolio",
    context:
      "Fee-funded promotion and buybacks are easy to promise and hard to check. DexPaid fixes each fee route at launch and reports marketing, buyback, and operating funds separately.",
    approach:
      "Creators sign in with a Solana wallet and save a draft, and each launch is prepared as a single transaction that locks in its fee route for the creator to sign. Owner-approved spending is reserved against a budget and verified onchain before it reaches a double-entry ledger. The release stayed in a gated pre-launch state, with every financial action paused.",
    details: [
      "Wallet sign-in and private drafts",
      "Launches with locked fee routing",
      "Double-entry ledger with separate funds",
      "Owner review and payment checks",
    ],
    imageNote: "Discover · Pre-launch",
  },
  {
    slug: "emberline",
    name: "Emberline",
    category: "Fire engineering calculators",
    headline: "Calculations that show their working.",
    description:
      "Free fire engineering calculators that show every step, and a local pilot for drafting the evidence around them.",
    image: "/work/emberline-parallel-calculator.webp",
    imageWidth: 1920,
    imageHeight: 1200,
    color: "#f5efe3",
    tags: ["Engineering calculators", "Data visualization"],
    role: "From our product portfolio",
    context:
      "Radiant heat between buildings and time equivalence are routine fire engineering calculations, and whoever reviews them needs to see how each number was reached. Emberline is our own product for that work: free calculators on the web, and a local pilot for preparing the evidence around them.",
    approach:
      "Three calculators run in the browser: radiant heat from openings facing a wall, radiant heat on a wall at 90 degrees, and time equivalence to EN 1991-1-2 Annex F and the IFEG. Each shows its inputs, a heat map or chart, every step of the working, and a table and sentence ready for a report, and a validation page runs the site’s checks live. They are for checking and preliminary design: a result does not by itself establish compliance with the National Construction Code, and the engineer responsible for the design must review the inputs, the method and the results. The local drafting pilot turns Bluebeam markup exports into an opening register that an engineer reviews and approves before anything reaches a draft report. It does not apply building-code rules or make engineering judgments, and is shown with its built-in synthetic sample.",
    details: [
      "Three calculators with the working shown",
      "Heat maps, charts and report-ready wording",
      "Validation page with live checks",
      "Local drafting pilot with engineer review",
    ],
    url: "https://emberline.cavies.studio",
    liveLink: {
      href: "https://emberline.cavies.studio",
      label: "Visit emberline.cavies.studio",
    },
    imageNote: "Radiant heat calculator · Example values",
  },
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
      "Website design, development and ongoing support for a Melbourne fire engineering consultancy.",
    image: "/work/beigman-engineering-home.webp",
    imageWidth: 1585,
    imageHeight: 1050,
    color: "#e9e1d6",
    tags: ["Website design & build", "Ongoing maintenance", "SEO support"],
    role: "Website design, frontend development, ongoing maintenance & SEO support",
    context:
      "Beigman Engineering helps architects, developers, and building surveyors understand fire engineering requirements. Its website brings services, project experience, and enquiries together.",
    approach:
      "Architectural imagery, interactive service diagrams, and a sector-based project browser make technical expertise easier to explore. A visual roadmap explains the process from concept to construction.",
    details: [
      "Service and project discovery",
      "Interactive roadmap and diagrams",
      "Responsive website implementation",
      "Ongoing maintenance and SEO support",
    ],
    story: [
      {
        heading: "A website for a specialist business.",
        body: "Beigman Engineering is a Melbourne fire engineering consultancy working with architects, developers and building surveyors. Its website needs to explain specialist services, present relevant project experience and give visitors a clear way to make an enquiry. Cavies designed and built the website around those needs.",
      },
      {
        heading: "Make the services easier to explore.",
        body: "Architectural imagery gives the work context, while interactive service diagrams help visitors explore technical information. A sector-based project browser brings the consultancy’s experience together, and a visual engineering roadmap explains the process from concept to construction. The responsive frontend connects these parts into one business website.",
      },
      {
        heading: "Support beyond the build.",
        body: "Cavies’ work with Beigman continues through ongoing website maintenance and SEO support. The engagement brings the initial design and development together with continued attention to the site after launch, rather than treating delivery as the end of the project.",
      },
    ],
    relatedService: {
      href: "/services/business-websites",
      label: "Explore our business website service",
    },
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
