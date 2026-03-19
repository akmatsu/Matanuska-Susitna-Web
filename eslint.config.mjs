import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import gitignore from 'eslint-config-flat-gitignore';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig(
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

  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'gql.ts',
    'graphql.ts',
    'packages/sdk/src/graphql/**',
  ]),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' type
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/triple-slash-reference': 'off', // Allow triple-slash directives
      '@next/next/no-html-link-for-pages': [
        'warn',
        ['sites/msb/app', 'sites/widgets/app'],
      ],
    },
  },
);
