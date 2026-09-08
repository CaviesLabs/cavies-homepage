import type { NextConfig } from "next";
import path from "node:path";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: path.resolve(__dirname) },
  poweredByHeader: false,
};
export default nextConfig;
