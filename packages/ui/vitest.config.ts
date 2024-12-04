import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { join, relative, basename } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    resolveSnapshotPath: (path, ext) => {
      const relativePath = relative(__dirname, path);
      const fileName = basename(relativePath, ext);
      return join(__dirname, '__tests__', '__snapshots__', fileName + ext);
    },
  },
});
