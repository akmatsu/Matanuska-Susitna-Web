const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  transpilePackages: ['mui-color-input', '@matsugov/ui'],
  reactStrictMode: true,
};

export default nextConfig;
