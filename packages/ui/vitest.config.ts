import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { join, relative, basename, resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'msb-ui',
      fileName: 'msb-ui',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: { globals: { react: 'React', 'react-dom': 'ReactDOM' } },
    },
  },
  plugins: [react(), dts()],
  test: {
    environment: 'jsdom',
    resolveSnapshotPath: (path, ext) => {
      const relativePath = relative(__dirname, path);
      const fileName = basename(relativePath, ext);
      return join(__dirname, '__tests__', '__snapshots__', fileName + ext);
    },
  },
});
