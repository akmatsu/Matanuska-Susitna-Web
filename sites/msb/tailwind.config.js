/** @type {import('tailwindcss').Config} */
const twConfig = require('@matsugov/tw-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [twConfig],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@matsugov/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
