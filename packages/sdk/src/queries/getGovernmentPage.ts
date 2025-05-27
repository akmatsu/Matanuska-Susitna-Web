import { gql } from '@apollo/client';

export const GET_GOVERNMENT_PAG = gql`
  query GetGovernmentPage {
    assemblyDistricts {
      id
      slug
      title
      description
      memberName
      photo {
        file {
          url
        }
      }
    }
  }
`;
