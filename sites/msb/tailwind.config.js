import config from '@matsugov/ui/tailwind.config';
import path from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    path.join(
      path.dirname(require.resolve('@matsugov/ui')),
      '**/*.{js,jsx,ts,tsx}',
    ),
  ],
  plugins: [],
};
