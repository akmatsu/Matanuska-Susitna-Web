import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../../matanuska-susitna-cms/apps/cms/schema.graphql',
  documents: [
    './src/**/*.{ts,tsx,graphql}',
    '../ui/src/**/*.{ts,tsx,graphql}',
    '../../sites/**/*.{ts,tsx,graphql}',
  ],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
        gqlImport: '@apollo/client#gql',
        documentMode: 'documentNodeImportFragmentsFrom',

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
