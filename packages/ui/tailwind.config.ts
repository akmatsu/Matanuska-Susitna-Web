import msbConfig from '@msb/tw-config';
import { Config } from 'tailwindcss/types/config';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [msbConfig],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
