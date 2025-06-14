import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3333/api/graphql',
  documents: ['./src/**/*.{ts,tsx,graphql}'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
        gqlImport: '@apollo/client#gql',
        documentMode: 'documentNode',
        // fragmentMasking: {
        //   unmaskFunctionName: 'getFragmentData',
        // },
        fragmentMasking: false,
      },
      config: {
        addTypename: true,
      },
    },
  },
};

export default config;
