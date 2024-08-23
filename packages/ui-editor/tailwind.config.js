const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  contents: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    path.join(
      path.dirname(require.resolve('@matsugov/ui')),
      '**/*.{js,ts,jsx,tsx}',
    ),
  ],
  presets: [require('@matsugov/configs/tailwind.config')],
};
