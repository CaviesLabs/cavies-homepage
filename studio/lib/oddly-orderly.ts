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

/** The store page's short description (GO-PUBLIC.md "Store copy"; the otters' lines agreed 27 November 2026). */
export const shortDescription =
  "A cozy, wordless tidying puzzle about two people moving in together. Sort, stack, hang and mend their things across over a hundred painted pages of one house, often in more than one tidy way. No timers, no fail states, and two sea otters: one makes a little mess, one brings things back.";

/** The opening of the store page's About This Game. */
export const storyParagraph =
  "Two people are moving in together, and each would tidy differently. Put their things in order, page by page, through one house: keys on hooks, cups on saucers, books on shelves, snowflakes on a frosty window, ticket stubs in a scrapbook. There are no instructions to read: each page’s idea is in the things themselves.";

/** For the press kit: the two people, their things, and the two otters. */
export const pressParagraph =
  "Two people are moving in together, and Oddly Orderly tells their story through their things: the shoes by the door, the china on the dresser, the photo of the two of them on the sea wall. Each would tidy differently, so many pages hold more than one tidy way, and every one earns a rosette. Two sea otters, Odd and Order, keep the player company. Odd makes a little mess and takes one shiny thing from every room; Order brings the last piece back. Everything Odd took is waiting at the end.";

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
    title: "Two sea otters, Odd and Order, keep you company",
    body: "Odd makes a little mess and takes one shiny thing from every room; Order brings the last piece back. Everything Odd took is waiting at the end.",
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
 * The approved note on how the art and music were made: the two sentences of
 * the game's docs/GO-PUBLIC.md, "AI disclosure (final wording)" (agreed 17
 * November 2026, widened 20 November). Use it exactly as written: don't add to
 * it or reword it.
 */
export const aboutTheArt = [
  "The art, the music and some of the sound effects were made with generative AI tools during development, then reviewed, edited and arranged by us.",
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

/**
 * The store page's eighteen screenshots, in the store's order (the game's
 * docs/GO-PUBLIC.md, "Screenshots"; accepted by Meow on 27 November 2026).
 * The game page shows the first eight; the press kit all eighteen.
 */
const allScreenshots: Screenshot[] = [
  shot(
    1,
    "keys",
    "Keys by the door",
    "Odd among the heaped keys as the page opens.",
    "Odd, the tan sea otter, looking over the edge of a hallway bench with keys heaped either side of it, below a wooden board of six round key tags over six brass hooks; the page’s name, “Keys by the door”, is in the corner",
    528486,
  ),
  shot(
    2,
    "snowman",
    "The snowman",
    "A winter evening, and the scarf going round his neck.",
    "A snowman in a snowy garden at night with a top hat, dark eyes, a carrot nose and a smile of stones, a striped scarf being carried towards his neck and two red buttons still loose",
    343497,
  ),
  shot(
    3,
    "cutlery",
    "A drawer of their own",
    "Order with the last spoon.",
    "Order, the grey sea otter, rising at the edge of a wooden cutlery tray and holding a spoon upright against its chest; the tray holds three forks, three knives, two spoons and three teaspoons partly behind Order, and a green cloth lies below it",
    487290,
  ),
  shot(
    4,
    "cake",
    "The cake, put back",
    "A slice carried to its gap.",
    "A round cake of cream and berries on a white plate with its slices out of place, one slice being carried back to its gap and two more waiting beside the plate",
    437286,
  ),
  shot(
    5,
    "xylophone",
    "A scale to play",
    "The rainbow’s bars, one carried in.",
    "A rainbow xylophone with its purple to green bars in place, a red bar being carried in, yellow and orange bars waiting below it and a red-headed mallet lying to the left",
    387742,
  ),
  shot(
    6,
    "mail",
    "Mail for two",
    "Odd with the mail’s key.",
    "Odd, the tan sea otter, looking up from the floor in front of a low wooden table with a small brass key at its chin; three wooden letter racks stand on the table, with letters in two of them and more letters lying beside them",
    513525,
  ),
  shot(
    7,
    "glitter",
    "The glitter balls",
    "A ball being turned.",
    "A line of eight mirror balls hanging from a string of bunting against a warm brown wall, with small glowing shapes (diamonds, stars, hearts and moons) round them",
    415916,
  ),
  shot(
    8,
    "leaves",
    "Fallen leaves",
    "The rake mid-stroke.",
    "Seen from above: autumn leaves, conkers, acorns and pine cones on a green mat, a rake mid-stroke drawing some of them together, an empty three-part wooden tray at the top and a green wheelbarrow at the right",
    553808,
  ),
  shot(
    9,
    "flowers",
    "Flowers in vases",
    "The vase carried with its daisies in it.",
    "A window onto a garden in four panes, a vase of daisies being carried along its sill beside a vase of roses, and vases of sunflowers and lupins standing on the floor below",
    504619,
  ),
  shot(
    10,
    "coats",
    "Coats on the pegs",
    "Order by the bench, a coat carried to its peg.",
    "Order, the grey sea otter, lying on the floor under a wooden bench in a hallway, below a peg rail hung with coats, a jacket, a scarf, hats and a bag, with a blue coat on a hanger being carried towards the empty pegs at the right and an orange jacket and a striped scarf still loose above the bench",
    458542,
  ),
  shot(
    11,
    "game-night",
    "Game night tower",
    "Odd by the game tower, a game carried.",
    "A tall stack of colourful game boxes on a low wooden table, a dark green box being carried to its place, and Odd’s face peeking up from the bottom left corner of the picture",
    370551,
  ),
  shot(
    12,
    "under-stairs",
    "The cupboard under the stairs",
    "The door open, a bag carried.",
    "A cupboard under a staircase with its door open, showing an ironing board, a ladder, a mop and bucket and a vacuum, a spotted bag being carried in, and an umbrella stand and a pair of wellies at the foot of the stairs",
    413794,
  ),
  shot(
    13,
    "chocolates",
    "The box of chocolates",
    "A dark chocolate carried to its gap.",
    "A box of sixteen chocolates in paper cases, arranged in rows by topping, with the bottom row still open, a dark chocolate being carried towards it and two more chocolates waiting beside the box",
    513924,
  ),
  shot(
    14,
    "jars",
    "Labels forward",
    "A jar turned, its label coming round.",
    "Eight jars with gingham lids and fruit labels on two wooden shelves, strawberry, blueberry and kiwi among them, one jar on the lower shelf being turned so its label faces the room",
    483698,
  ),
  shot(
    15,
    "bookcase",
    "The bookcase",
    "A showpiece: a book carried.",
    "A wooden bookcase of three shelves of colourful books, two books lying on the floor and a third being carried towards its shelf",
    465690,
  ),
  shot(
    16,
    "tool-wall",
    "The tool wall",
    "A showpiece: a tool carried to its outline.",
    "A pegboard above a shed workbench with saws, hammers, a mallet, screwdrivers, chisels and spanners hung in their places, three plier outlines still empty, a wooden toolbox at the bottom right and a pair of pliers being carried towards the outlines",
    677697,
  ),
  shot(
    17,
    "spines",
    "The picture on the spines",
    "A spine coming in at the shelf’s right end.",
    "A wooden wall shelf where upright book spines painted with a birch wood stand side by side to make one picture with a fox on a path, and three more spines waiting at the right, one of them being carried in",
    484603,
  ),
  shot(
    18,
    "photo-mended",
    "The photo, mended",
    "The two of them on the sea wall, the last piece going in.",
    "A torn photo of two people sitting on a sea wall at sunset, in a wooden frame on a wooden table, its last piece being carried into place",
    514024,
  ),
];

/** The game page's screenshots: the store's first eight. */
export const screenshots: Screenshot[] = allScreenshots.slice(0, 8);

/** The press kit's: all eighteen. */
export const pressScreenshots: Screenshot[] = allScreenshots;

export const trailer = {
  src: `${media}/oddly-orderly-trailer.mp4`,
  poster: `${media}/oddly-orderly-trailer-poster.webp`,
  width: 1920,
  height: 1080,
  bytes: 14033943,
  /** ISO 8601 duration of the 52.4-second cut accepted on 27 November 2026. */
  duration: "PT52.4S",
  durationLabel: "52 seconds",
  /** The day this cut was added to the site, for its structured data. */
  uploadDate: "2026-11-27",
  title: "Oddly Orderly trailer",
  description:
    "Twelve pages of play, from the keys by the door to the candles on the mantel, with the game’s music and sounds and no speech.",
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
    downloadBytes: 57899,
    width: 256,
    height: 256,
    alt: "The app icon: Odd, the tan sea otter, standing beside Order, the grey one, upside down, on a cream ground",
  },
  capsule: {
    title: "Main capsule",
    note: "JPEG",
    src: `${media}/oddly-orderly-capsule.webp`,
    download: `${media}/downloads/oddly-orderly-capsule.jpg`,
    downloadBytes: 191259,
    width: 1232,
    height: 706,
    alt: "Oddly Orderly key art: Odd, the tan sea otter, standing beside Order, the grey one, upside down, with the wordmark beside them and a wooden shelf of books, a photo, a jar of jam, mugs and a rosemary plant below it",
  },
} as const;

/** The pages' sharing image: the end card, the two otters beside the wordmark and the shelf of the two people's things. */
export const socialImage = {
  url: `${media}/oddly-orderly-social.jpg`,
  width: 1920,
  height: 1080,
  alt: "Oddly Orderly: Odd, the tan sea otter, standing beside Order, the grey one, upside down, with the wordmark beside them and a shelf of the two people’s things below",
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
