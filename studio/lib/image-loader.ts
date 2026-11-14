"use client";

// Pairs with scripts/prepare-images.mjs, which writes one WebP per source image
// and per width listed in next.config.ts into public/_img/ before the build.
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!src.startsWith("/") || !/\.(png|jpe?g|webp)$/i.test(src)) return src;
  return `/_img${src.replace(/\.[a-z]+$/i, "")}-${width}.webp`;
}
