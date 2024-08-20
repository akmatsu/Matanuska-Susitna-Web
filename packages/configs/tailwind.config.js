const path = require('path');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{tsx,ts,jsx,js}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx',
    path.join(
      path.dirname(require.resolve('@matsugov/ui')),
      '**/*.{js,ts,jsx,tsx}',
    ),
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue['500'],
      },
    },
  },
  plugins: [],
};
