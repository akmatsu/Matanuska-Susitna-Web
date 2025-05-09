const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  transpilePackages: ['mui-color-input', '@matsugov/ui', '@msb/js-sdk'],
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      '@matsugov/ui',
      '@matsugov/ui/map',
      '@matsugov/tw-config',
      '@msb/js-sdk',
      '@msb/js-sdk/components',
      '@msb/js-sdk/queries',
      '@msb/js-sdk/client',
      '@msb/js-sdk/apollo',
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
