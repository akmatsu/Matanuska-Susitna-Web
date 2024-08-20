/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    // https://github.com/viclafouch/mui-color-input
    'mui-color-input',
    '@matsugov/ui',
  ],
  reactStrictMode: true,
};

export default nextConfig;
