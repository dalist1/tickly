const withPWA = require("@ducanh2912/next-pwa").default({
  enable: process.env.NODE_ENV === "development",
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);