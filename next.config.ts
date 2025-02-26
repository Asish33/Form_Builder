import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks in production
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors in production
  },
};

export default nextConfig;
