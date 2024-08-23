const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  contents: ['**/*.{js, ts, jsx, tsx}'],
  presets: [require('@matsugov/configs/tailwind.config')],
};
