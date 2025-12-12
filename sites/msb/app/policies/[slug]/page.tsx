import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';
import { gql } from '@msb/js-sdk/gql';

const metaQuery = gql(`
    query GetPolicyMeta($slug: String!) {
        policy(where: { slug: $slug }) {
            title
            description
        }
    }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('policy', metaQuery, slug);
};

// const PolicyQuery = gql(`
//     query GetPolicy($slug: String!) {
//         policy(where: { slug: $slug }) {
//           ...BasePageInfo
//         }
//     }
//   `);
