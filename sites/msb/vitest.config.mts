import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Resolve the tsconfig path aliases (@/..., @components/...) in tests.
  resolve: { tsconfigPaths: true },
  // tsconfig keeps JSX as-is for Next, so tests need their own JSX transform.
  oxc: { jsx: { runtime: 'automatic' } },
  test: {
    environment: 'node',
    include: ['**/*.test.{ts,tsx}'],
  },
});
