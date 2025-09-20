// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ✅ Allow modern formats (for your own hosted assets like /public/helmet.png)
    formats: ['image/avif', 'image/webp'],

    // ✅ Keep responsive sizes lean (good for hero/feature images)
    deviceSizes: [320, 640, 1080],

    // ✅ Optimize for tiny fixed assets (like team logos at 42×42)
    imageSizes: [42, 96],

    // ✅ Define allowed external image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.espn.com',
        pathname: '/**',
      },
    ],

    // ✅ Don’t re-optimize ESPN images
    // You’re already requesting combiner URLs with ?w= & h= params
    unoptimized: true,
  },
};

module.exports = nextConfig;
