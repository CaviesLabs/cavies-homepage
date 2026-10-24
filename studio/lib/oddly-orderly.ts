import { gameContactEmail } from "./contact";

/**
 * The game's Steam store page, e.g. "https://store.steampowered.com/app/<id>/Oddly_Orderly/".
 * Set it once the Steam page is public. Until then it is null, and the Steam
 * buttons, links and structured data stay out of the pages.
 */
export const steamUrl: string | null = null;

export const gameName = "Oddly Orderly";
export const tagline = "A place for every little thing.";

export const gamePaths = {
  game: "/games/oddly-orderly",
  press: "/games/oddly-orderly/press",
  privacy: "/games/oddly-orderly/privacy",
  support: "/games/oddly-orderly/support",
} as const;

/** Where the games section lives: the navigation's Games item and /games. */
export const gamesIndexHref = "/#games";

const media = "/games/oddly-orderly";

/** The store page's short description (22 October 2026). */
export const shortDescription =
  "A cozy, wordless tidying puzzle about two people moving in together. Sort, stack, hang and mend their things across over a hundred painted pages of one house, often in more than one tidy way. No timers, no fail states, and a magpie who keeps you company and pockets the shiny bits.";

/** The opening of the store page's About This Game. */
export const storyParagraph =
  "Two people are moving in together, and each would tidy differently. Put their things in order, page by page, through one house: keys on hooks, cups on saucers, books on shelves, snowflakes on a frosty window, ticket stubs in a scrapbook. There are no instructions to read: each page’s idea is in the things themselves.";

/** For the press kit: the two people, their things, and the magpie. */
export const pressParagraph =
  "Two people are moving in together, and Oddly Orderly tells their story through their things: the shoes by the door, the china on the dresser, the photo of the two of them on the sea wall. Each would tidy differently, so many pages hold more than one tidy way, and every one earns a rosette. A magpie shares the house. It keeps the player company, watches what they’re holding, and takes one shiny thing from every room; everything it took is waiting in its nest at the end.";

/** The store page's features, from About This Game. */
export const features = [
  {
    title: "Over a hundred pages in twenty rooms",
    body: "From the hallway to the eaves, with a day by the sea, a winter evening and a birthday party on the way.",
  },
  {
    title: "More than one tidy way",
    body: "A page earns a rosette for each tidy idea it holds: by size, by colour, in pairs, taking turns, a picture made whole. The first rosette turns the page; the rest are there to find.",
  },
  {
    title: "Four big pages",
    body: "A bookcase of twenty-four books, a kitchen dresser of twenty-seven pieces of china, a tool wall with an outline for every tool, and a dressing table of twenty-four things.",
  },
  {
    title: "No timers, no fail states, no counting",
    body: "Hints are pencil sketches, as many as you like, and any page can be skipped.",
  },
  {
    title: "A magpie",
    body: "It keeps you company, watches what you’re holding, and takes one shiny thing from every room. Everything it took is waiting at the end.",
  },
  {
    title: "A lofi theme for every room",
    body: "With soft, warm sounds for every object.",
  },
  {
    title: "Mouse, controller or keyboard",
    body: "Every action is a press, never a hold or a chord. Colour-assist marks and reduced motion are in the settings.",
  },
] as const;

export const steamPlatforms = ["Windows", "macOS", "SteamOS and Steam Deck"];

/**
 * The owner-approved note on how the art and music were made. Use it exactly
 * as written: don't add to it or reword it.
 */
export const aboutTheArt = [
  "The painted scenes and the music were made during development with generative AI tools run on our own computer, from our own drawings and prompts, then cut, fitted and arranged by us.",
  "The game does not use generative AI while it runs.",
] as const;

export type Screenshot = {
  slug: string;
  title: string;
  caption: string;
  alt: string;
  src: string;
  download: string;
  downloadBytes: number;
  width: number;
  height: number;
};

const shot = (
  number: number,
  slug: string,
  title: string,
  caption: string,
  alt: string,
  downloadBytes: number,
): Screenshot => ({
  slug,
  title,
  caption,
  alt,
  src: `${media}/screenshots/oddly-orderly-${slug}.webp`,
  download: `${media}/downloads/oddly-orderly-${String(number).padStart(2, "0")}-${slug}.jpg`,
  downloadBytes,
  width: 1920,
  height: 1080,
});

/** Store screenshots of 22 October 2026, the four showpieces first among them. */
export const screenshots: Screenshot[] = [
  shot(
    1,
    "bookcase",
    "The bookcase",
    "The living room’s showpiece: a colour to each column, the last books on their way.",
    "A living-room bookcase whose books stand in columns by colour, with a hand carrying one of the last books and the magpie perched on the mantelpiece",
    531306,
  ),
  shot(
    2,
    "tool-wall",
    "The tool wall",
    "The shed’s shadow board: an outline for every tool, the last pliers going home.",
    "A pegboard in the shed with saws, hammers, screwdrivers, chisels and spanners hung in their places, the magpie on top, and the last pliers on their way",
    692755,
  ),
  shot(
    3,
    "teddies",
    "The teddy bears’ picnic",
    "A cup, a plate and a spoon for each bear, by size.",
    "Six teddy bears of different sizes along a red checked picnic cloth, each with a cup, a plate and a spoon, the last pieces coming from a basket",
    591257,
  ),
  shot(
    4,
    "dresser",
    "The dresser",
    "The kitchen’s china in three sets, the last bowl going up.",
    "A wooden kitchen dresser with pink, white and blue plates, jugs and bowls in three sets, a blue bowl being lifted onto its shelf and the magpie on top",
    568880,
  ),
  shot(
    5,
    "snowman",
    "The snowman",
    "A winter evening, and the scarf going round his neck.",
    "A snowman in a snowy garden at dusk, with a top hat, coal eyes and a carrot nose, and a striped scarf being wrapped round his neck",
    505252,
  ),
  shot(
    6,
    "dressing-table",
    "The dressing table",
    "A row for each kind, and the magpie on the mirror.",
    "A dressing table with rows of nail varnish, lipsticks and pots of colour, a yellow pot being carried to its row, and the magpie perched on a round mirror",
    562153,
  ),
  shot(
    7,
    "photo-mended",
    "The photo, mended",
    "The two of them on the sea wall, the last piece going in.",
    "A torn photo of two people sitting on a sea wall at sunset, in a frame on a wooden table, its last piece being carried into place",
    664498,
  ),
  shot(
    8,
    "nest",
    "The magpie’s nest",
    "The last page, up in the eaves: the treasures going back.",
    "The magpie in its nest on a shelf under the eaves, beside a green board where the small shiny things it took go back onto their outlines",
    553560,
  ),
];

export const trailer = {
  src: `${media}/oddly-orderly-trailer.mp4`,
  poster: `${media}/oddly-orderly-trailer-poster.webp`,
  width: 1920,
  height: 1080,
  bytes: 13470871,
  /** ISO 8601 duration of the 61-second cut. */
  duration: "PT1M1S",
  durationLabel: "1 minute",
  /** The day the trailer was added to the site, for its structured data. */
  uploadDate: "2026-10-23",
  title: "Oddly Orderly trailer",
  description:
    "A minute of play across thirteen pages, from the tool wall to the magpie’s nest, with the game’s music and sounds and no speech.",
};

export const pressAssets = {
  logo: {
    title: "Wordmark",
    note: "Transparent PNG",
    src: `${media}/oddly-orderly-logo.webp`,
    download: `${media}/downloads/oddly-orderly-logo.png`,
    downloadBytes: 189055,
    width: 1280,
    height: 232,
    alt: "The Oddly Orderly wordmark: “Oddly” in coral and “Orderly” in teal over a thin mustard line",
  },
  icon: {
    title: "App icon",
    note: "PNG",
    src: `${media}/oddly-orderly-icon.webp`,
    download: `${media}/downloads/oddly-orderly-icon.png`,
    downloadBytes: 77891,
    width: 256,
    height: 256,
    alt: "The app icon: the magpie peeking in from the edge",
  },
  capsule: {
    title: "Main capsule",
    note: "JPEG",
    src: `${media}/oddly-orderly-capsule.webp`,
    download: `${media}/downloads/oddly-orderly-capsule.jpg`,
    downloadBytes: 196985,
    width: 1232,
    height: 706,
    alt: "Oddly Orderly key art: the wordmark above a wooden shelf of books, a photo, a jar of jam, mugs and a rosemary plant, with the magpie at the end",
  },
} as const;

/** The pages' sharing image: the wordmark over the still life of the two people's things. */
export const socialImage = {
  url: `${media}/oddly-orderly-social.jpg`,
  width: 1920,
  height: 1080,
  alt: "Oddly Orderly: the wordmark above a shelf of the two people’s things, with the magpie at the end",
};

export const factsheet = {
  developer: "Cavies Studio",
  publisher: "Cavies Studio (self-published)",
  release: "Coming soon",
  price: "To be announced",
  platforms: "Windows, macOS, SteamOS/Linux (Steam)",
  languages:
    "English. The game is wordless apart from its menus and page names.",
  players: "Single-player",
  contact: gameContactEmail,
};

export const formatBytes = (bytes: number) =>
  bytes >= 1_000_000
    ? `${(bytes / 1_000_000).toFixed(1)} MB`
    : `${Math.round(bytes / 1000)} KB`;
