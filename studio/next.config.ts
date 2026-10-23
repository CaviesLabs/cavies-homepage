import type { NextConfig } from "next";
import path from "node:path";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: path.resolve(__dirname) },
  poweredByHeader: false,
  redirects: async () => [
    ...[
      "www.cavies.studio",
      "cavies.xyz",
      "www.cavies.xyz",
      "cavies-studio.vercel.app",
    ].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host.replaceAll(".", "\\.") }],
      destination: "https://cavies.studio/:path*",
      permanent: true,
    })),
    { source: "/work/seispace", destination: "/#work", permanent: true },
    // The games live in the homepage's games section (the navigation's Games
    // item). Temporary, so a games index can take /games later.
    { source: "/games", destination: "/#games", permanent: false },
  ],
};
export default nextConfig;
