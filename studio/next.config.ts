import type { NextConfig } from "next";
import path from "node:path";

// Static export, served as Cloudflare Worker static assets (see wrangler.jsonc).
// Redirects and headers live in public/_redirects and public/_headers because
// a static export cannot carry next.config redirects or headers. Images are
// resized at build time (scripts/prepare-images.mjs) and addressed by
// lib/image-loader.ts, using exactly the widths listed here.
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  turbopack: { root: path.resolve(__dirname) },
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 750, 1080, 1536, 1920, 2560],
    imageSizes: [32, 64, 128, 256, 384],
  },
};
export default nextConfig;
