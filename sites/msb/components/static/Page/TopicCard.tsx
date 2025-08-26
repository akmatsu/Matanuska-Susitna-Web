import React from 'react';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { Link } from '../Link';

const topicFragment = gql(`
    fragment TopicFields on Topic {
    id
    title
    slug
    description
  }
`);

export function TopicItem(props: {
  topic: FragmentType<typeof topicFragment>;
  as?: React.ElementType;
  className?: string;
}) {
  const topic = getFragmentData(topicFragment, props.topic);
  return <Link href={`/${topic.slug}`}>{topic.title}</Link>;
}
