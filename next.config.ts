import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  },
  reactStrictMode: true,
  images: {
    domains: ['img.clerk.com', 'res.cloudinary.com', 'cloudinary.com'], // Allow Clerk image URLs
  },
};

export default nextConfig;