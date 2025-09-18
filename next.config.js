// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'a.espncdn.com', // ESPN logos
      'cdn.espn.com',  // sometimes ESPN uses this too
    ],
  },
};

module.exports = nextConfig;
