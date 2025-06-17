import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3333/api/graphql',
  documents: [
    './src/**/*.{ts,tsx,graphql}',
    '../ui/src/**/*.{ts,tsx,graphql}',
    '../../sites/**/*.{ts,tsx,graphql}',
  ],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/': {
      preset: 'client-preset',
      presetConfig: {
        gqlTagName: 'gql',
        gqlImport: '@apollo/client#gql',
        documentMode: 'documentNode',

        fragmentMasking: {
          unmaskFunctionName: 'getFragmentData',
        },
      },
      config: {
        addTypename: true,
      },
    },
  },
};

export default config;
