import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Prevents Next.js from looking for dependencies in parent directory
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
