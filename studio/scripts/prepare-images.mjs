// Resizes every raster image in public/ to the widths next.config.ts lists, as
// WebP, into public/_img/ (git-ignored). A source narrower than a width gets a
// native-size copy under that width's name, so the loader never needs to know
// the source size. Run by `npm run build:cf` before `next build`.
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const outDir = path.join(publicDir, "_img");
const widths = [32, 64, 128, 256, 384, 640, 750, 1080, 1536, 1920, 2560];
const quality = 70;

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (full === outDir) continue;
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) found.push(full);
  }
  return found;
}

await rm(outDir, { recursive: true, force: true });
const sources = await walk(publicDir);
let files = 0;
let bytes = 0;
for (const source of sources) {
  const relative = path.relative(publicDir, source).replaceAll("\\", "/");
  const base = relative.replace(/\.[a-z]+$/i, "");
  const meta = await sharp(source).metadata();
  for (const width of widths) {
    const target = path.join(outDir, `${base}-${width}.webp`);
    await mkdir(path.dirname(target), { recursive: true });
    await sharp(source)
      .resize({ width: Math.min(width, meta.width ?? width) })
      .webp({ quality, effort: 5 })
      .toFile(target);
    files += 1;
    bytes += (await stat(target)).size;
  }
}
console.log(
  `prepare-images: ${sources.length} sources, ${files} files, ${(bytes / 1e6).toFixed(1)} MB in public/_img`,
);
