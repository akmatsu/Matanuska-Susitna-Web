import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@matsugov/ui', '@msb/js-sdk', '@msb/map'],
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: [
      '@msb/js-sdk',
      '@matsugov/ui',
      '@matsugov/ui/client',
      '@msb/js-sdk/components',
      '@msb/js-sdk/client',
      '@msb/js-sdk/graphql',
      '@msb/js-sdk/types',
    ],
  },
  images: {
    remotePatterns: [
      new URL('https://d1159zutbdy4l.cloudfront.net/**'),
      new URL('https://images.matsu.gov/**'),
    ],
  },
};

export default nextConfig;
