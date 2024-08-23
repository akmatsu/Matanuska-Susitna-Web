const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          default: colors.blue['500'],
          hover: colors.blue['400'],
          active: colors.blue['300'],
          on: '#ffffff',
        },
        secondary: {
          default: colors.cyan['500'],
          hover: colors.cyan['400'],
          active: colors.cyan['300'],
          on: '#ffffff',
        },
        warning: {
          default: colors.orange['500'],
          hover: colors.orange['400'],
          active: colors.orange['300'],
          on: '#ffffff',
        },
        danger: {
          default: colors.red['500'],
          hover: colors.red['400'],
          active: colors.red['300'],
          on: '#ffffff',
        },
        success: {
          default: colors.green['500'],
          hover: colors.green['400'],
          active: colors.green['300'],
          on: '#ffffff',
        },
        surface: {
          default: colors.slate[200],
          hover: colors.slate[300],
          active: colors.slate[400],
          on: '#000000',
        },
      },
    },
  },
  plugins: [],
};
