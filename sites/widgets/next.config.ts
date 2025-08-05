import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@matsugov/ui', '@msb/js-sdk', '@msb/map'],
  reactStrictMode: true,
  env: {
    AUTH_MICROSOFT_ENTRA_ID_ID: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
    AUTH_MICROSOFT_ENTRA_ID_SECRET: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
    AUTH_MICROSOFT_ENTRA_ID_TENANT_ID:
      process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
    AUTH_MICROSOFT_ENTRA_ID_ISSUER: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    AUTH_URL: process.env.AUTH_URL,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
  },

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
      new URL('https://msb-cms-documents.s3.us-west-2.amazonaws.com/**'),
    ],
  },
};

export default nextConfig;
