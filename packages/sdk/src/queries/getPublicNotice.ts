import { gql, TypedDocumentNode } from '@apollo/client';
import { Contact, Document, LinkedItem, WhereSlugVariables } from './baseTypes';

export interface PublicNoticeMetaData {
  title: string;
  description?: string | null;
}

export interface PublicNoticeItem {
  id: string;
  title: string;
  slug: string;
  body?: string | null;
  description?: string | null;
  heroImage?: string | null;
  contacts?: Contact[] | null;
  actions?: LinkedItem[] | null;
  documents?: Document[] | null;
  effectiveDate?: string | null;
  endDate?: string | null;
  urgency?: number | null;
}

export interface ParkData<T = any> {
  park: T;
}

export const GET_PUBLIC_NOTICE_META: TypedDocumentNode<
  ParkData<PublicNoticeMetaData>,
  WhereSlugVariables
> = gql`
  query PublicNoticeMeta($where: PublicNoticeWhereUniqueInput!) {
    publicNotice(where: $where) {
      title
      description
    }
  }
`;

export const GET_PUBLIC_NOTICE: TypedDocumentNode<
  ParkData<PublicNoticeItem>,
  WhereSlugVariables
> = gql`
  query PublicNotice($where: PublicNoticeWhereUniqueInput!) {
    publicNotice(where: $where) {
      id
      slug
      title
      heroImage
      body
      description
      effectiveDate
      endDate
      contacts {
        id
        name
        title
        email
        phone
      }
      documents {
        id
        title
        file {
          filename
          url
          filesize
        }
      }
      actions {
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
        label
      }
    }
  }
`;
