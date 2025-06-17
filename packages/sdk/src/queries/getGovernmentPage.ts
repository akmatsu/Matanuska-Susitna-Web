import { gql } from '@apollo/client';
import { ImageFields } from './baseFragments';

export const GET_GOVERNMENT_PAG = gql`
  ${ImageFields}

  query GetGovernmentPage {
    assemblyDistricts {
      id
      slug
      title
      description
      memberName
      photo {
        ...ImageFields
      }
    }
  }
`;
