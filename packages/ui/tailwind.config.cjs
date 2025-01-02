/** @type {import('tailwindcss').Config} */
const twConfig = require('@matsugov/tw-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [twConfig],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

