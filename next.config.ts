import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  compiler: {
    // Set removeConsole to true for the production environment
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
