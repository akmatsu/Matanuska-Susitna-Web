const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(
      path.dirname(require.resolve('@matsugov/ui')),
      '**/*.{js,ts,jsx,tsx}',
    ),
    path.join(
      path.dirname(require.resolve('@matsugov/ui-editor')),
      '**/*.{js,ts,jsx,tsx}',
    ),
  ],
  presets: [require('@matsugov/configs/tailwind.config')],
};
