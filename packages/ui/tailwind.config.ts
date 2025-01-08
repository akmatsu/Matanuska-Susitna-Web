import { type Config } from 'tailwindcss';
import twConfig from '@matsugov/tw-config';

const config: Config = {
  presets: [twConfig],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
