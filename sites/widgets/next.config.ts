import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@matsugov/ui'],
  reactStrictMode: true,
};

export default nextConfig;
