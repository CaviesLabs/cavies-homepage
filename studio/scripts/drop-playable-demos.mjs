// Copies the three demo ads into public/playable-ads/demos/<id>/index.html.
//
//   node scripts/drop-playable-demos.mjs <path to the Playables repo's dist-ad folder>
//
// For each demo it takes <dist-ad>/<game id>/generic/index.html, the `generic`
// network build of that game's demo ad (made in the Playables repo with
// `node tools/build.ts --ad --network generic <game id>`). The page's demo ids
// and the games they come from are listed below. Nothing is downloaded and
// nothing leaves this machine. A missing or odd file stops the copy before any
// file is replaced.
import { copyFile, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const demos = [
  { id: "rise-squeeze", game: "squishy-studio" },
  { id: "lantern-burst", game: "firefly-festival" },
  { id: "tide-jars", game: "tide-jars" },
];
const largest = 5 * 1024 * 1024; // the ad networks' own limit; ours run 0.2 to 1.7 MB
const target = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "playable-ads",
  "demos",
);

const source = process.argv[2];
if (!source) {
  console.error(
    "Usage: node scripts/drop-playable-demos.mjs <path to dist-ad in the Playables repo>",
  );
  process.exit(2);
}

const plan = [];
for (const { id, game } of demos) {
  const from = path.resolve(source, game, "generic", "index.html");
  let size;
  try {
    size = (await stat(from)).size;
  } catch {
    console.error(`Missing ${from}`);
    process.exit(1);
  }
  const head = (await readFile(from, "utf8")).slice(0, 400).toLowerCase();
  if (!head.includes("<!doctype html") && !head.includes("<html")) {
    console.error(`${from} does not look like an HTML file`);
    process.exit(1);
  }
  if (size > largest) {
    console.error(`${from} is ${size} bytes, over the 5 MB limit`);
    process.exit(1);
  }
  plan.push({ id, from, size, to: path.join(target, id, "index.html") });
}

for (const { id, from, size, to } of plan) {
  await copyFile(from, to);
  console.log(`${id}: ${(size / 1_000_000).toFixed(2)} MB  <-  ${from}`);
}
console.log(
  "Done. Check each demo on /playable-ads, then commit the three files.",
);
