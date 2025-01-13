import { gql, TypedDocumentNode } from '@apollo/client';

export interface GetCommunitiesItem {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export interface GetCommunitiesData {
  communities: GetCommunitiesItem[];
  communitiesCount: number;
}

export interface GetCommunitiesVariables {
  take: number;
  skip: number;
  where: {
    OR?: [
      {
        title?: {
          contains?: string | null;
          mode?: 'insensitive' | 'default' | null;
        };
      },
      {
        description?: {
          contains?: string | null;
          mode?: 'insensitive' | 'default' | null;
        };
      },
    ];
  };
}

export const GET_COMMUNITIES_QUERY: TypedDocumentNode<
  GetCommunitiesData,
  GetCommunitiesVariables
> = gql`
  query GetCommunities($take: Int, $skip: Int!, $where: CommunityWhereInput!) {
    communities(take: $take, skip: $skip, where: $where) {
      id
      title
      slug
      description
    }
    communitiesCount(where: $where)
  }
`;
