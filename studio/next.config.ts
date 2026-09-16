import type { NextConfig } from "next";
import path from "node:path";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: path.resolve(__dirname) },
  poweredByHeader: false,
  redirects: async () => [
    ...["www.cavies.xyz", "cavies-studio.vercel.app"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host.replaceAll(".", "\\.") }],
      destination: "https://cavies.xyz/:path*",
      permanent: true,
    })),
    { source: "/work/seispace", destination: "/#work", permanent: true },
  ],
};
export default nextConfig;
