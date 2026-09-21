import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/og',
        destination: '/og.jpg',
      },
      {
        source: '/og-image',
        destination: '/og.jpg',
      },
      {
        source: '/og-image.jpg',
        destination: '/og.jpg',
      },
    ];
  },
};

export default nextConfig;
