import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",               // IMPORTANT
  trailingSlash: true,            // Important for Azure routing
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
