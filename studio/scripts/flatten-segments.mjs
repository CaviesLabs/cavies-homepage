// Next's static export writes per-segment prefetch files in folders, for
// example contact/__next.contact/__PAGE__.txt, but its client requests
// contact/__next.contact.__PAGE__.txt. A plain static host answers the second
// with 404 (a console error on every link prefetch). This copies each
// segment file to the name the client asks for. Run on out/ after `next build`.
import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const out = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "out",
);

async function walk(dir, inSegments, copies) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_next") continue;
      const starts = entry.name.startsWith("__next.");
      await walk(
        full,
        inSegments ?? (starts ? { dir, name: entry.name } : null),
        copies,
      );
    } else if (inSegments && entry.name.endsWith(".txt")) {
      const inner = path
        .relative(path.join(inSegments.dir, inSegments.name), full)
        .split(path.sep)
        .join(".");
      copies.push([
        full,
        path.join(inSegments.dir, `${inSegments.name}.${inner}`),
      ]);
    }
  }
}

const copies = [];
await walk(out, null, copies);
for (const [from, to] of copies) await copyFile(from, to);
console.log(`flatten-segments: ${copies.length} prefetch files copied`);
