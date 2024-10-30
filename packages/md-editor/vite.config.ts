import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MdEditor',
      fileName: 'md-editor',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@keystone-6/core'],
      treeshake: 'smallest',
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [
    react(),
    dts({
      exclude: ['./node_modules', './dist', '**/*.stories.*'],
      include: ['./src'],
    }),
  ],
});
