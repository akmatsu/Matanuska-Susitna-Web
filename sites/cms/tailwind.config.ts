import { Config } from 'tailwindcss/types/config';
import msbConfig from '@msb/tw-config';

const config: Config = {
  content: [
    './components/**/*.{js,jsx,ts,tsx}',
    './customFields/**/*.{js,jsx,ts,tsx}',
  ],
  blocklist: [],
  presets: [msbConfig],
  theme: {
    extend: {},
  },
};

export default config;
