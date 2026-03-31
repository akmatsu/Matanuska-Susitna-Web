import { NextConfig } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = {
  basePath,
  reactStrictMode: true,
  cacheComponents: true,

  experimental: {
    optimizePackageImports: ['@matsugov/ui', '@matsugov/ui/client'],
  },

  images: {
    remotePatterns: [
      new URL('https://d1159zutbdy4l.cloudfront.net/**'),
      new URL('https://images.matsu.gov/**'),
      new URL('https://msb-cms-documents.s3.us-west-2.amazonaws.com/**'),
      new URL('https://picsum.photos/**'),
      new URL('https://services.arcgis.com/**'),
      new URL('https://loremflickr.com/**'),
      ...(process.env.NODE_ENV === 'development'
        ? [new URL('http://localhost:3333/**')]
        : []),
    ],
  },
};

export default nextConfig;
