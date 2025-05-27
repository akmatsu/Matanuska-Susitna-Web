import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@matsugov/ui', '@msb/js-sdk'],
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        graphql: false,
      };
    }
  },
  experimental: {
    optimizePackageImports: [
      '@matsugov/ui',
      '@matsugov/tw-config',
      '@msb/js-sdk',
      '@msb/js-sdk/components',
      '@msb/js-sdk/client',
      '@msb/js-sdk/apollo',
    ],
  },
  images: {
    remotePatterns: [new URL('https://d1159zutbdy4l.cloudfront.net/**')],
  },
};

export default nextConfig;
