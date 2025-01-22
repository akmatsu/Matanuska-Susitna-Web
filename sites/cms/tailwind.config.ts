import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './admin/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './customFields/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  plugins: [],
};

export default config;
