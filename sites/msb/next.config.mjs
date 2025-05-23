import withBundleAnalyzer from '@next/bundle-analyzer';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  transpilePackages: ['mui-color-input', '@msb/map', '@msb/js-sdk'],
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ['@msb/js-sdk', '@matsugov/ui'],
  },

  images: {
    remotePatterns: [
      new URL('https://d1159zutbdy4l.cloudfront.net/**'),
      new URL('https://images.matsu.gov/**'),
    ],
  },
};

const withPlugins = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withPlugins(nextConfig);
