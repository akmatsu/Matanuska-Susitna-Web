import { gql, TypedDocumentNode } from '@apollo/client';
import {
  GetHomePageMetaQuery,
  GetHomePageMetaQueryVariables,
  GetHomePageQuery,
  GetHomePageQueryVariables,
} from '../graphql/graphql';
import { HighlightFields, PublicNoticeFields } from './baseFragments';

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
  ${HighlightFields}
  ${PublicNoticeFields}

  query GetHomePage($take: Int, $orderBy: [PublicNoticeOrderByInput!]!) {
    homePage {
      id
      title
      description
      heroImage
      toolbeltOne {
        ...HighlightFields
      }
      toolbeltTwo {
        ...HighlightFields
      }
      toolbeltThree {
        ...HighlightFields
      }
      toolbeltFour {
        ...HighlightFields
      }
      highlightOne {
        ...HighlightFields
      }
      highlightTwo {
        ...HighlightFields
      }
      highlightThree {
        ...HighlightFields
      }
    }

    publicNotices(take: $take, orderBy: $orderBy) {
      ...PublicNoticeFields
    }
  }
`;
