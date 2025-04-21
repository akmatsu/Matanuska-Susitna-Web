import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
  Address,
  Contact,
  Hour,
  PageListItem,
  PublicNoticeWhere,
  TakeVariable,
  WhereSlugVariables,
} from './baseTypes';

export interface FacilityMeta {
  title: string;
  description: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  slug: string;
  body?: string | null;
  description?: string | null;
  heroImage?: string | null;
  park?: PageListItem | null;
  services?: PageListItem[] | null;
  address?: Address | null;
  contacts?: Contact[] | null;
  hours?: Hour[] | null;
}

export interface GetFacilityData<T = any> {
  facility: T;
}

export const GET_FACILITY_META: TypedDocumentNode<
  GetFacilityData<FacilityMeta>,
  WhereSlugVariables
> = gql`
  query FacilityMeta($where: FacilityWhereUniqueInput!) {
    facility(where: $where) {
      title
      description
    }
  }
`;

export const GET_FACILITY_QUERY: TypedDocumentNode<
  GetFacilityData<FacilityItem>,
  WhereSlugVariables & PublicNoticeWhere & TakeVariable
> = gql`
  query Facility(
    $where: FacilityWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    facility(where: $where) {
      id
      slug
      title
      liveUrl
      heroImage
      park {
        id
        title
        description
        slug
      }
      services {
        id
        title
        description
        slug
      }
      description
      body
      address {
        title
        lineOne
        lineTwo
        city
        state
        zip
      }
      contacts {
        id
        name
        email
        phone
        title
      }
      hours {
        day
        open
        close
      }
    }
    publicNotices(where: $publicNoticesWhere2, take: $take, orderBy: $orderBy) {
      id
      slug
      title
      description
      heroImage
      urgency
    }
  }
`;
