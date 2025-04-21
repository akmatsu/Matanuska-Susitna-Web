import { gql, TypedDocumentNode } from '@apollo/client';
import { Highlight, PageListItem, TakeVariable } from './baseTypes';

export interface HomePageMeta {
  title: string;
  description?: string | null;
}

export interface HomePageItem {
  id: string;
  title: string;
  description?: string | null;
  heroImage?: string | null;
  toolbeltOne?: Highlight | null;
  toolbeltTwo?: Highlight | null;
  toolbeltThree?: Highlight | null;
  toolbeltFour?: Highlight | null;
  highlightOne?: Highlight | null;
  highlightTwo?: Highlight | null;
  highlightThree?: Highlight | null;
}

export interface HomePageData<T = any> {
  homePage: T;
  publicNotices?: (PageListItem & { heroImage?: string | null })[];
}

export const GET_HOME_PAGE_META: TypedDocumentNode<
  HomePageData<HomePageMeta>,
  TakeVariable
> = gql`
  query getHomePageMeta {
    homePage {
      title
      description
    }
  }
`;

export const GET_HOME_PAGE: TypedDocumentNode<
  HomePageData<HomePageItem>,
  TakeVariable & { orderBy: { urgency: 'desc' | 'asc' }[] }
> = gql`
  query HomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {
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
