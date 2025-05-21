import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-preserve-directives';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: './src/index.ts',
        components: './src/components/index.ts',
        queries: './src/queries/index.ts',
        client: './src/client/index.ts',
        apollo: './src/apollo.ts',
        graphql: './src/graphql',
        getBoards: './src/queries/getBoards.ts',
        getBoardsPage: './src/queries/getBoardsPage.ts',
      },

      name: 'sdk',
      fileName: 'sdk',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@apollo/client-integration-nextjs'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@apollo/client-integration-nextjs': 'ApolloClientIntegrationNextJS',
        },
      },
    },
  },
  plugins: [react(), preserveDirectives(), dts()],
});
