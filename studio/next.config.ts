import type { NextConfig } from "next";
import path from "node:path";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: path.resolve(__dirname) },
  poweredByHeader: false,
  redirects: async () => [
    { source: "/work/seispace", destination: "/#work", permanent: true },
  ],
};
export default nextConfig;
