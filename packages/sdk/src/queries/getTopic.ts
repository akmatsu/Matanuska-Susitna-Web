import { gql } from '@apollo/client';

export const GET_TOPIC = gql`
  query GetTopic($where: TopicWhereUniqueInput!) {
    topic(where: $where) {
      ...TopicPage
    }
  }
`;
