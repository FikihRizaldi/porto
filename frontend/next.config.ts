import type { NextConfig } from "next";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
    ],
  },
  async rewrites() {
    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
      return [
        {
          source: '/api/backend/:path*',
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
        },
        {
          source: '/uploads/:path*',
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
