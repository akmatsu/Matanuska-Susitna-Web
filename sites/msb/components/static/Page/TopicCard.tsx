import React from 'react';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import type { PageSummary } from '@msb/cms-sdk';
import { Link } from '../Link';

const topicFragment = gql(`
    fragment TopicFields on Topic {
    id
    title
    slug
    description
  }
`);

export type TopicItemData = Pick<PageSummary, 'title' | 'path'>;

export function TopicItemView(props: { topic: TopicItemData }) {
  const { topic } = props;
  if (!topic.path) return null;

  return (
    <li>
      <Link href={topic.path}>{topic.title}</Link>
    </li>
  );
}

/** Maps the Keystone GraphQL topic fragment to view data. */
export function toTopicItemData(
  ref: FragmentType<typeof topicFragment>,
): TopicItemData {
  const topic = getFragmentData(topicFragment, ref);
  return { title: topic.title ?? '', path: `/${topic.slug}` };
}

export function TopicItem(props: {
  topic: FragmentType<typeof topicFragment>;
  className?: string;
}) {
  return <TopicItemView topic={toTopicItemData(props.topic)} />;
}
