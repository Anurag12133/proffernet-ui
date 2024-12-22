import type { NextConfig } from "next";

module.exports = {
  images: {
    domains: [
      "images.unsplash.com",
      "assets.aceternity.com",
      "pbs.twimg.com",
      "aceternity.com",
      "api.microlink.io",
      "127.0.0.1",
    ],
  },

  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_SECRET_KEY: process.env.GITHUB_SECRET_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
