import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { FlatCompat } from '@eslint/eslintrc';
import gitignore from 'eslint-config-flat-gitignore';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  gitignore({
    files: ['.gitignore'],
    strict: false,
  }),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },

  // TypeScript specific rules
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' type
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/triple-slash-reference': 'off', // Allow triple-slash directives
    },
  },

  // React specific rules
  {
    ...pluginReact.configs.flat.recommended,
    files: ['**/*.{js,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    },
  },

  ...compat
    .config({
      extends: ['next'],
      settings: {
        next: {
          rootDir: 'sites/*',
        },
      },
    })
    .map((config) => ({
      ...config,
      files: ['sites/**/**/*.{js,jsx,ts,tsx}'],
    })),
);
