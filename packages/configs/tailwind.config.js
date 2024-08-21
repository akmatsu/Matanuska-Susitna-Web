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
        primary: {
          default: colors.blue['500'],
          hover: colors.blue['400'],
          active: colors.blue['300'],
        },
      },
    },
  },
  plugins: [],
};
