const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  transpilePackages: ['mui-color-input', '@msb/js-sdk', '@msb/cms-sdk'],
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
      './components/server',
      './components/client',
      './components',
    ],
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
        ? [
            new URL('http://localhost:3333/**'),
            // Images uploaded to a local Laravel CMS.
            new URL('http://localhost:8000/**'),
          ]
        : []),
    ],
  },
};

export default nextConfig;
