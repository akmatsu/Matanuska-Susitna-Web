import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../../cms/apps/cms/schema.graphql',
  documents: [
    './src/**/!(*.d).{ts,tsx,graphql}',
    '../ui/src/**/!(*.d).{ts,tsx,graphql}',
    '../../sites/**/!(*.d).{ts,tsx,graphql}',
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
