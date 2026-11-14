import assert from "node:assert/strict";
import test from "node:test";

const base = process.env.SITE_TEST_URL || "http://127.0.0.1:3100";
const canonicalOrigin = "https://cavies.studio";
const htmlByPath = new Map();
const request = (path, options) => fetch(new URL(path, base), options);
const attribute = (tag, name) =>
  tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const gamePages = [
  "/games/oddly-orderly",
  "/games/oddly-orderly/press",
  "/games/oddly-orderly/privacy",
  "/games/oddly-orderly/support",
];
const textOf = (html) =>
  html
    .replace(/<!--.*?-->/gs, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
const formatBytes = (bytes) =>
  bytes >= 1_000_000
    ? `${(bytes / 1_000_000).toFixed(1)} MB`
    : `${Math.round(bytes / 1000)} KB`;
const structuredGraph = (html) =>
  [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
    ),
  ].flatMap((match) => JSON.parse(match[1])["@graph"] ?? []);

await test("public sitemap retains the portfolio and includes both new pages", async () => {
  const response = await request("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, urls.length, "no duplicate sitemap URLs");
  assert.ok(urls.includes(`${canonicalOrigin}/services/business-websites`));
  assert.ok(urls.includes(`${canonicalOrigin}/contact`));
  assert.ok(urls.includes(`${canonicalOrigin}/privacy`), "/privacy in sitemap");
  for (const path of gamePages) {
    assert.ok(urls.includes(`${canonicalOrigin}${path}`), `${path} in sitemap`);
  }
  assert.ok(urls.filter((url) => url.includes("/work/")).length >= 28);
  const titles = new Set();
  const descriptions = new Set();
  for (const url of urls) {
    assert.equal(new URL(url).origin, canonicalOrigin);
    const path = new URL(url).pathname;
    const page = await request(path);
    assert.equal(page.status, 200, path);
    const html = await page.text();
    htmlByPath.set(path, html);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `${path} has a title`);
    assert.ok(!titles.has(title), `${path} has a distinct title`);
    titles.add(title);
    const descriptionTag = html.match(/<meta name="description"[^>]*>/)?.[0];
    const description = attribute(descriptionTag || "", "content");
    assert.ok(description, `${path} has a description`);
    assert.ok(
      !descriptions.has(description),
      `${path} has a distinct description`,
    );
    descriptions.add(description);
    const canonicalTag = html.match(/<link rel="canonical"[^>]*>/)?.[0];
    assert.equal(
      new URL(attribute(canonicalTag || "", "href")).href,
      new URL(url).href,
      path,
    );
    const openGraphTag = html.match(/<meta property="og:url"[^>]*>/)?.[0];
    assert.equal(
      new URL(attribute(openGraphTag || "", "content")).href,
      new URL(url).href,
      path,
    );
    assert.equal(
      (html.match(/<h1(?:\s|>)/g) || []).length,
      1,
      `${path} has one H1`,
    );
    assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), path);
    for (const json of html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
    )) {
      assert.doesNotThrow(() => JSON.parse(json[1]), `${path} JSON-LD parses`);
    }
  }
});

await test("homepage exposes both buyer journeys and keeps verification", () => {
  const html = htmlByPath.get("/");
  assert.ok(html.includes("Discuss your website"));
  assert.ok(html.includes('href="/contact"'));
  assert.ok(html.includes('href="/services/business-websites"'));
  assert.ok(html.includes('href="/work/seitrace"'));
  assert.ok(html.includes('href="/work/beigman-engineering"'));
  assert.ok(html.includes('name="google-site-verification"'));
});

await test("scope builder renders its sentence and carries choices to the contact page", () => {
  const home = htmlByPath.get("/");
  assert.ok(home.includes('id="scope"'), "scope builder is server-rendered");
  assert.ok(home.includes("a new business website"), "default sentence");
  assert.match(
    home,
    /href="\/contact\?help=website(?:&amp;|&)stage=new(?:&amp;|&)timing=soon"/,
    "default scope link without JavaScript",
  );
  assert.ok(home.includes('href="/contact?help=product"'), "plan card scope");
  const contact = htmlByPath.get("/contact");
  assert.ok(contact.includes('role="radiogroup"'), "service choices");
  assert.ok(contact.includes("Business website &amp; support"));
});

await test("work index lists every case study and is linked from every page", () => {
  const work = htmlByPath.get("/work");
  assert.ok(work, "/work is in the sitemap");
  const linked = new Set(
    [...work.matchAll(/href="\/work\/([a-z0-9-]+)"/g)].map((m) => m[1]),
  );
  assert.ok(linked.size >= 28, `links ${linked.size} case studies`);
  assert.ok(work.includes("In development"), "games keep their status");
  assert.ok(work.includes("Past product advisory"), "advisory stays separate");
  for (const path of ["/", "/contact", "/work/seitrace"]) {
    assert.ok(htmlByPath.get(path).includes('href="/work"'), path);
  }
});

await test("featured work follows the owner's order", () => {
  const work = htmlByPath.get("/work");
  // The owner's order of 11 November 2026: the four featured cases, the
  // four selected-work cards (05 to 08) and the first index entry (09).
  const ordered = [
    ...new Set(
      [...work.matchAll(/href="\/work\/([a-z0-9-]+)"/g)].map((m) => m[1]),
    ),
  ].slice(0, 9);
  assert.deepEqual(ordered, [
    "emberline",
    "beigman-engineering",
    "reai",
    "tender",
    "amoeba",
    "vpawhook",
    "tyche",
    "seitrace",
    "paperdash",
  ]);
  // The showcase server-renders a link for its selected (first) project only;
  // selected work (cards 05 to 08) and the index from 09 are plain links.
  const home = htmlByPath.get("/");
  for (const slug of [
    "emberline",
    "amoeba",
    "tyche",
    "seitrace",
    "paperdash",
  ]) {
    assert.ok(
      home.includes(`href="/work/${slug}"`),
      `${slug} linked from homepage`,
    );
  }
});

await test("new cases keep live links and honest data labels", () => {
  assert.ok(
    !htmlByPath.get("/work/paperdash").includes("paperdash.xyz"),
    "Paperdash has shut down, so it is not linked",
  );
  const expectations = {
    "/work/paperdash": [
      "Paperdash has shut down",
      "real Papertrade orders",
      "Captured while live",
    ],
    "/work/reai": [
      'href="https://reai.sg"',
      "Illustrative conversation",
      "in a trial",
    ],
    "/work/amoeba": [
      'href="https://amoeba.family"',
      "Pre-launch",
      "not deployed yet",
    ],
    "/work/tyche": ["Pre-launch preview", "no draw has run"],
    "/work/tender": [
      'href="https://tender-by-hyperflow.dev-226.workers.dev"',
      "Compute forwards · In development",
      "at an early stage",
    ],
    "/work/browser-games": ["53 games", "YouTube Playables format"],
    "/work/vpawhook": [
      'href="https://vpawhook.com"',
      "Sepolia testnet, October 2026",
      "The game has not launched",
    ],
    "/work/skew": ["Educational"],
    "/work/dexpaid": ["Pre-launch"],
    "/work/loosecoins": ["Example address"],
    "/work/emberline": [
      'href="https://emberline.cavies.studio"',
      "Synthetic sample",
      "does not by itself establish compliance",
    ],
  };
  // Labels must be visible on the page, so match the body without scripts
  // (the head's meta, Open Graph and JSON-LD descriptions do not count).
  const visibleHtml = (html) =>
    html
      .replace(/^[\s\S]*?<body[^>]*>/, "")
      .replace(/<script[\s\S]*?<\/script>/g, "");
  for (const [path, phrases] of Object.entries(expectations)) {
    const page = htmlByPath.get(path);
    assert.ok(page, `${path} is in the sitemap`);
    const html = visibleHtml(page);
    for (const phrase of phrases) {
      assert.ok(html.includes(phrase), `${path} shows ${phrase}`);
    }
  }
});

await test("unreleased game cases are linked and retain their development status", () => {
  const home = htmlByPath.get("/");
  for (const slug of [
    "oddly-orderly",
    "butterpaw",
    "all-brain-no-luck",
    "browser-games",
  ]) {
    assert.ok(
      home.includes(`href="/work/${slug}"`),
      `${slug} linked from homepage`,
    );
    const page = htmlByPath.get(`/work/${slug}`);
    assert.ok(
      page?.includes("In development"),
      `${slug} is explicitly unreleased`,
    );
    assert.ok(page.includes('href="/#games"'), `${slug} returns to games`);
  }
});

await test("Oddly Orderly's page shows the game and its trailer without autoplay", () => {
  const html = htmlByPath.get("/games/oddly-orderly");
  assert.ok(html, "the game's page is in the sitemap");
  const text = textOf(html);
  assert.ok(text.includes("A place for every little thing."));
  assert.ok(text.includes("Coming soon to Steam"));
  for (const platform of ["Windows", "macOS", "SteamOS and Steam Deck"]) {
    assert.ok(text.includes(platform), platform);
  }
  for (const feature of [
    "Over a hundred pages in twenty rooms",
    "More than one tidy way",
    "Four big pages",
    "No timers, no fail states",
    "A magpie",
    "A lofi theme for every room",
    "Mouse, controller or keyboard",
  ]) {
    assert.ok(text.includes(feature), feature);
  }
  const videos = html.match(/<video[^>]*>/g) ?? [];
  assert.equal(videos.length, 1, "one trailer");
  assert.ok(/\scontrols(?:=""|\s|>)/.test(videos[0]), "trailer has controls");
  assert.ok(videos[0].includes('preload="none"'), "trailer loads on request");
  assert.match(videos[0], /poster="\/games\/oddly-orderly\/[^"]+\.webp"/);
  assert.ok(!/autoplay/i.test(videos[0]), "no autoplay");
  const screenshots = new Set(
    [
      ...html.matchAll(
        /\/games\/oddly-orderly\/screenshots\/oddly-orderly-([a-z-]+)\.webp/g,
      ),
    ].map((match) => match[1]),
  );
  assert.ok(screenshots.size >= 6 && screenshots.size <= 8, "six to eight");
  for (const showpiece of [
    "bookcase",
    "dresser",
    "tool-wall",
    "dressing-table",
  ]) {
    assert.ok(screenshots.has(showpiece), `the ${showpiece} showpiece`);
  }
  for (const path of gamePages.slice(1)) {
    assert.ok(html.includes(`href="${path}"`), `links ${path}`);
  }
  for (const [, href] of html.matchAll(/href="([^"]*steam[^"]*)"/gi)) {
    assert.match(href, /^https:\/\/store\.steampowered\.com\/app\/\d+/);
  }
  const game = structuredGraph(html).find(
    (node) => node["@type"] === "VideoGame",
  );
  assert.equal(game?.name, "Oddly Orderly", "VideoGame structured data");
  for (const invented of [
    "offers",
    "aggregateRating",
    "review",
    "datePublished",
  ]) {
    assert.ok(!(invented in game), `no ${invented}`);
  }
});

await test("Oddly Orderly's pages keep private and third-party things out", () => {
  for (const path of gamePages) {
    const html = htmlByPath.get(path);
    assert.ok(html, `${path} is in the sitemap`);
    assert.ok(
      !html.includes("cavies.xyz"),
      `${path}: no tester build or old domain`,
    );
    assert.ok(!/next fest/i.test(html), `${path}: no unannounced plans`);
    assert.ok(!/<iframe/i.test(html), `${path}: no embeds`);
    assert.ok(
      !/<script[^>]+src="https?:/i.test(html),
      `${path}: no third-party scripts`,
    );
    assert.ok(!html.includes('href="#"'), `${path}: no placeholder links`);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${path}: ids are unique`);
  }
});

await test("the press kit has the factsheet, the approved art note and working downloads", async () => {
  const html = htmlByPath.get("/games/oddly-orderly/press");
  const text = textOf(html);
  for (const fact of [
    "Factsheet",
    "Cavies Studio (self-published)",
    "Coming soon",
    "To be announced",
    "Windows, macOS, SteamOS/Linux (Steam)",
    "English. The game is wordless apart from its menus and page names.",
    "Single-player",
    "contact@cavies.studio",
  ]) {
    assert.ok(text.includes(fact), fact);
  }
  assert.ok(
    text.includes(
      "The painted scenes and the music were made during development with generative AI tools run on our own computer, from our own drawings and prompts, then cut, fitted and arranged by us. The game does not use generative AI while it runs.",
    ),
    "the approved art note, word for word",
  );
  const downloads = [
    ...html.matchAll(
      /<a[^>]*href="(\/games\/oddly-orderly\/[^"]+)"[^>]*\sdownload=""[^>]*>(.*?)<\/a>/gs,
    ),
  ];
  const types = { jpg: "image/jpeg", png: "image/png", mp4: "video/mp4" };
  const kinds = downloads.map(([, href]) => href.split(".").pop());
  assert.ok(kinds.filter((kind) => kind === "jpg").length >= 7, "JPEGs");
  assert.ok(
    kinds.includes("png") && kinds.includes("mp4"),
    "logo, icon, trailer",
  );
  for (const [, href, inner] of downloads) {
    const response = await request(href);
    assert.equal(response.status, 200, href);
    const extension = href.split(".").pop();
    assert.equal(response.headers.get("content-type"), types[extension], href);
    const bytes = (await response.arrayBuffer()).byteLength;
    assert.ok(bytes <= 15_000_000, `${href} is at most 15 MB`);
    assert.ok(textOf(inner).includes(formatBytes(bytes)), `${href} size label`);
  }
});

await test("the privacy policy is the game's own, with an anchor per section", () => {
  const html = htmlByPath.get("/games/oddly-orderly/privacy");
  const text = textOf(html);
  assert.ok(text.includes("the privacy policy that ships with the game"));
  assert.match(text, /Effective date: [A-Z][a-z]+ \d{1,2}, \d{4}/);
  for (const id of [
    "what-the-app-stores",
    "optional-playtest-notes",
    "what-the-app-does-not-collect",
    "device-and-platform-services",
    "steam",
    "children",
    "deleting-local-data",
    "changes-to-this-policy",
    "privacy-contact",
  ]) {
    assert.ok(html.includes(`id="${id}"`), `#${id}`);
    assert.ok(html.includes(`href="#${id}"`), `#${id} is in the contents`);
  }
  assert.ok(text.includes("Oddly Orderly is published by Cavies Studio."));
  assert.ok(html.includes('href="mailto:contact@cavies.studio"'));
  assert.ok(html.includes('href="/games/oddly-orderly/support"'));
  assert.ok(!text.includes("private testing"));
});

await test("support covers contact, saves, starting over, notes, accessibility and refunds", () => {
  const text = textOf(htmlByPath.get("/games/oddly-orderly/support"));
  for (const phrase of [
    "contact@cavies.studio",
    "%APPDATA%\\Oddly Orderly\\",
    "~/Library/Application Support/Oddly Orderly/",
    "~/.local/share/Oddly Orderly/",
    "Steam Cloud",
    "Clear all rosettes",
    "Delete notes",
    "Reduced motion",
    "Colour assist patterns",
    "Refunds go through the store you bought the game from",
  ]) {
    assert.ok(text.includes(phrase), phrase);
  }
});

await test("the case study counts pages, names the showpieces and links the game", () => {
  const casePage = htmlByPath.get("/work/oddly-orderly");
  const text = textOf(casePage);
  assert.ok(text.includes("over a hundred pages"));
  assert.ok(!/100 levels/.test(text));
  assert.ok(text.includes("Four showpieces"));
  assert.ok(casePage.includes('href="/games/oddly-orderly"'));
  assert.ok(htmlByPath.get("/").includes('href="/games/oddly-orderly"'));
});

await test("/games goes to the games section", async () => {
  const response = await request("/games", { redirect: "manual" });
  assert.equal(response.status, 302);
  const location = new URL(response.headers.get("location"), base);
  assert.equal(`${location.pathname}${location.hash}`, "/#games");
});

await test("service and Beigman pages expose real scope and useful links in HTML", () => {
  const service = htmlByPath.get("/services/business-websites");
  assert.ok(service.includes("Australia"));
  assert.ok(service.includes('href="/work/beigman-engineering"'));
  assert.ok(service.includes('href="/contact"'));
  assert.ok(service.includes("<details"), "FAQs work without JavaScript");
  const casePage = htmlByPath.get("/work/beigman-engineering");
  assert.ok(casePage.toLowerCase().includes("ongoing maintenance"));
  assert.ok(casePage.includes("SEO support"));
  assert.ok(casePage.includes('href="/services/business-websites"'));
});

await test("contact route renders honest email and Telegram fallbacks without JavaScript", () => {
  const html = htmlByPath.get("/contact");
  assert.ok(html.includes("tin@cavies.studio"));
  assert.ok(html.includes("mailto:tin@cavies.studio"));
  assert.ok(html.includes("https://t.me/tincavies"));
  assert.ok(html.includes("<noscript"));
});

await test("missing routes are real noindex 404s", async () => {
  const response = await request("/this-page-does-not-exist");
  assert.equal(response.status, 404);
  assert.ok((await response.text()).includes('content="noindex"'));
});

await test("robots retains the canonical sitemap", async () => {
  const response = await request("/robots.txt");
  assert.equal(response.status, 200);
  assert.ok((await response.text()).includes(`${canonicalOrigin}/sitemap.xml`));
});

await test("canonical host redirects preserve path and query", async () => {
  // The hosts are handled by the redirect Worker (redirect/worker.js), not the site.
  const { default: redirect } = await import("../redirect/worker.js");
  for (const host of ["www.cavies.studio", "cavies.xyz", "www.cavies.xyz"]) {
    const response = redirect.fetch(
      new Request(`https://${host}/services/business-websites?source=test`),
    );
    assert.equal(response.status, 308);
    assert.equal(
      response.headers.get("location"),
      `${canonicalOrigin}/services/business-websites?source=test`,
    );
  }
});

await test("every response carries the three security headers; hashed assets are immutable", async () => {
  for (const path of [
    "/",
    "/contact",
    "/this-page-does-not-exist",
    "/robots.txt",
  ]) {
    const response = await request(path);
    assert.equal(
      response.headers.get("x-content-type-options"),
      "nosniff",
      path,
    );
    assert.equal(response.headers.get("x-frame-options"), "DENY", path);
    assert.equal(
      response.headers.get("referrer-policy"),
      "strict-origin-when-cross-origin",
      path,
    );
    await response.arrayBuffer();
  }
  const html = htmlByPath.get("/");
  const asset = html.match(/\/_next\/static\/[^"]+\.js/)?.[0];
  assert.ok(asset, "a hashed script is linked");
  const response = await request(asset);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control"), /immutable/);
  await response.arrayBuffer();
});

await test("the enquiry endpoint is the Worker's: GET is refused, unknown API paths are 404", async () => {
  const get = await request("/api/enquiry");
  assert.equal(get.status, 405);
  const other = await request("/api/other");
  assert.equal(other.status, 404);
});
