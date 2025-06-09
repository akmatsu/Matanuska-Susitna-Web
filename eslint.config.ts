import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import * as reactHooks from 'eslint-plugin-react-hooks';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_models', 'dist', 'build'],
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
    },
  },

  // React specific rules
  {
    ...pluginReact.configs.flat.recommended,
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
    },
  },

  ...compat.config({
    extends: ['next'],
  }),
);
