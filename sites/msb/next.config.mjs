// const sassOptions = require('./scripts/sassOptions.cjs');
import sassOptions from './scripts/sassOptions.mjs';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
// const appSassOptions = sassOptions(basePath);

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  transpilePackages: [
    // https://github.com/viclafouch/mui-color-input
    'mui-color-input',
    // '@matsugov/ui',
    '@trussworks/react-uswds',
  ],
  reactStrictMode: true,
  // sassOptions: appSassOptions,
};

export default nextConfig;
