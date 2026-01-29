import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Prevents Next.js from looking for dependencies in parent directory
  turbopack: {
    root: __dirname,
  },
  // Ignore ESLint errors during build (for Docker)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build (for Docker)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
