import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Sanity CDN images globally
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Configure image qualities to include 85
    qualities: [75, 85, 100],
    // Disable Next.js image optimization for external images
    // Sanity CDN already provides optimized images via URL builder (width/height params)
    // This prevents private IP resolution errors when Next.js tries to optimize external images
    unoptimized: true,
  },
};

export default nextConfig;
