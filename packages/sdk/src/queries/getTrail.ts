import { gql, TypedDocumentNode } from '@apollo/client';
import {
  Address,
  Contact,
  PageListItem,
  PublicNoticeWhere,
  TakeVariable,
  WhereSlugVariables,
} from './baseTypes';

export interface TrailMeta {
  title: string;
  description: string;
}

export interface TrailItem {
  id: string;
  title: string;
  slug: string;
  body?: string | null;
  description?: string | null;
  heroImage?: string | null;

  groomed?: boolean | null;
  open?: boolean | null;
  spring?: boolean | null;
  summer?: boolean | null;
  winter?: boolean | null;
  address?: Address | null;
  contacts?: Contact[] | null;
  park?: PageListItem | null;
  services?: PageListItem[] | null;
  difficulty?: string | null;
  elevationChange?: number | null;
  fall?: boolean | null;
  length?: boolean | null;

  // Uses
  atv?: boolean | null;
  biking?: boolean | null;
  crossCountrySkiing?: boolean | null;
  dirtBiking?: boolean | null;
  dogWalking?: boolean | null;
  frisbeeGolf?: boolean | null;
  hiking?: boolean | null;
  horsebackRiding?: boolean | null;
  mushing?: boolean | null;
  running?: boolean | null;
  snowMachining?: boolean | null;
  snowshoeing?: boolean | null;
}

export interface TrialData<T = any> {
  trail: T;
}

export const GET_TRAIL_META_QUERY: TypedDocumentNode<
  TrialData<TrailMeta>,
  WhereSlugVariables
> = gql`
  query TrailPark($where: TrailWhereUniqueInput!) {
    trail(where: $where) {
      title
      description
    }
  }
`;

export const GET_TRAIL_QUERY: TypedDocumentNode<
  TrialData<TrailItem>,
  WhereSlugVariables & PublicNoticeWhere & TakeVariable
> = gql`
  query Trail(
    $where: TrailWhereUniqueInput!
    $publicNoticesWhere2: PublicNoticeWhereInput!
    $take: Int
    $orderBy: [PublicNoticeOrderByInput!]!
  ) {
    trail(where: $where) {
      id
      title
      body
      heroImage
      description
      length
      atv
      biking
      crossCountrySkiing
      difficulty
      dirtBiking
      dogWalking
      elevationChange
      fall
      frisbeeGolf
      groomed
      hiking
      horsebackRiding
      mushing
      open
      running
      snowMachining
      snowshoeing
      spring
      summer
      winter
      park {
        id
        slug
        title
        description
      }
      contacts {
        id
        name
        title
        phone
        email
      }
      address {
        id
        title
        lineOne
        lineTwo
        state
        city
        zip
      }
      services {
        id
        title
        slug
        description
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
