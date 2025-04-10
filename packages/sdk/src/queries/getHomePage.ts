import { gql, TypedDocumentNode } from '@apollo/client';
import { Highlight, PageListItem } from './baseTypes';

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

export const GET_HOME_PAGE_META: TypedDocumentNode<HomePageData<HomePageMeta>> =
  gql`
    query getHomePageMeta {
      homePage {
        title
        description
      }
    }
  `;

export const GET_HOME_PAGE: TypedDocumentNode<HomePageData<HomePageItem>> = gql`
  query getHomePage {
    homePage {
      id
      title
      heroImage
      description
      toolbeltOne {
        id
        image
        title
        linkedItem {
          label
          selectItem
        }
      }
      toolbeltTwo {
        id
        image
        title
        linkedItem {
          label
          selectItem
        }
      }
      toolbeltThree {
        id
        image
        title
        linkedItem {
          label
          selectItem
        }
      }
      toolbeltFour {
        id
        image
        title
        linkedItem {
          label
          selectItem
        }
      }
      highlightOne {
        id
        image
        title
        linkedItem {
          label
          selectItem
        }
      }
      highlightTwo {
        id
        image
        title
        linkedItem {
          label
          selectItem
        }
      }
      highlightThree {
        id
        image
        title
        linkedItem {
          label
          selectItem
        }
      }
    }
    publicNotices {
      id
      slug
      title
      description
      heroImage
    }
  }
`;
