import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetHomePageMetaQuery,
  GetHomePageMetaQueryVariables,
  GetHomePageQuery,
  GetHomePageQueryVariables,
} from '../graphql/graphql';

export const GET_HOME_PAGE_META: TypedDocumentNode<
  GetHomePageMetaQuery,
  GetHomePageMetaQueryVariables
> = gql`
  query GetHomePageMeta {
    homePage {
      title
      description
    }
  }
`;

export const GET_HOME_PAGE: TypedDocumentNode<
  GetHomePageQuery,
  GetHomePageQueryVariables
> = gql`
  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {
    homePage {
      id
      title
      description
      heroImage
      toolbeltOne {
        id
        image
        title
        linkedItem {
          label
          item {
            __typename
            ... on Service {
              id
              title
              slug
              description
            }
            ... on Park {
              id
              title
              slug
              description
            }
            ... on Trail {
              id
              title
              slug
              description
            }
            ... on Facility {
              id
              title
              slug
              description
            }
            ... on Community {
              id
              title
              slug
              description
            }
            ... on AssemblyDistrict {
              id
              title
              slug
              description
            }
            ... on OrgUnit {
              id
              title
              slug
              description
            }
            ... on Url {
              id
              title
              description
              url
            }
          }
        }
      }
      toolbeltTwo {
        id
        image
        title
        linkedItem {
          label
          item {
            __typename
            ... on Service {
              id
              title
              slug
              description
            }
            ... on Park {
              id
              title
              slug
              description
            }
            ... on Trail {
              id
              title
              slug
              description
            }
            ... on Facility {
              id
              title
              slug
              description
            }
            ... on Community {
              id
              title
              slug
              description
            }
            ... on AssemblyDistrict {
              id
              title
              slug
              description
            }
            ... on OrgUnit {
              id
              title
              slug
              description
            }
            ... on Url {
              id
              title
              description
              url
            }
          }
        }
      }
      toolbeltThree {
        id
        image
        title
        linkedItem {
          label
          item {
            __typename
            ... on Service {
              id
              title
              slug
              description
            }
            ... on Park {
              id
              title
              slug
              description
            }
            ... on Trail {
              id
              title
              slug
              description
            }
            ... on Facility {
              id
              title
              slug
              description
            }
            ... on Community {
              id
              title
              slug
              description
            }
            ... on AssemblyDistrict {
              id
              title
              slug
              description
            }
            ... on OrgUnit {
              id
              title
              slug
              description
            }
            ... on Url {
              id
              title
              description
              url
            }
          }
          selectItem
        }
      }
      toolbeltFour {
        id
        image
        title
        linkedItem {
          label
          item {
            __typename
            ... on Service {
              id
              title
              slug
              description
            }
            ... on Park {
              id
              title
              slug
              description
            }
            ... on Trail {
              id
              title
              slug
              description
            }
            ... on Facility {
              id
              title
              slug
              description
            }
            ... on Community {
              id
              title
              slug
              description
            }
            ... on AssemblyDistrict {
              id
              title
              slug
              description
            }
            ... on OrgUnit {
              id
              title
              slug
              description
            }
            ... on Url {
              id
              title
              description
              url
            }
          }
        }
      }
      highlightOne {
        id
        image
        title
        linkedItem {
          label
          item {
            __typename
            ... on Service {
              id
              title
              slug
              description
            }
            ... on Park {
              id
              title
              slug
              description
            }
            ... on Trail {
              id
              title
              slug
              description
            }
            ... on Facility {
              id
              title
              slug
              description
            }
            ... on Community {
              id
              title
              slug
              description
            }
            ... on AssemblyDistrict {
              id
              title
              slug
              description
            }
            ... on OrgUnit {
              id
              title
              slug
              description
            }
            ... on Url {
              id
              title
              description
              url
            }
          }
        }
      }
      highlightTwo {
        id
        image
        title
        linkedItem {
          label
          item {
            __typename
            ... on Service {
              id
              title
              slug
              description
            }
            ... on Park {
              id
              title
              slug
              description
            }
            ... on Trail {
              id
              title
              slug
              description
            }
            ... on Facility {
              id
              title
              slug
              description
            }
            ... on Community {
              id
              title
              slug
              description
            }
            ... on AssemblyDistrict {
              id
              title
              slug
              description
            }
            ... on OrgUnit {
              id
              title
              slug
              description
            }
            ... on Url {
              id
              title
              description
              url
            }
          }
        }
      }
      highlightThree {
        id
        image
        title
        linkedItem {
          label
          item {
            __typename
            ... on Service {
              id
              title
              slug
              description
            }
            ... on Park {
              id
              title
              slug
              description
            }
            ... on Trail {
              id
              title
              slug
              description
            }
            ... on Facility {
              id
              title
              slug
              description
            }
            ... on Community {
              id
              title
              slug
              description
            }
            ... on AssemblyDistrict {
              id
              title
              slug
              description
            }
            ... on OrgUnit {
              id
              title
              slug
              description
            }
            ... on Url {
              id
              title
              description
              url
            }
          }
        }
      }
    }

    publicNotices(take: $take, orderBy: $orderBy) {
      id
      slug
      title
      description
      heroImage
      urgency
    }
  }
`;
