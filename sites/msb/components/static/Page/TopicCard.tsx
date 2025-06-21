import React from 'react';
import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import Link from 'next/link';

const topicFragment = gql(`
    fragment TopicFields on Topic {
    id
    title
    slug
    description
  }
`);

export function TopicCard(props: {
  topic: FragmentType<typeof topicFragment>;
  as?: React.ElementType;
  className?: string;
}) {
  const topic = getFragmentData(topicFragment, props.topic);
  return (
    <LinkCard
      as={props.as}
      key={topic.slug}
      className={`${props.className}`}
      href={`/topics/${topic.slug}`}
      linkAs={Link}
    >
      <CardHeader>
        <CardTitle>{topic.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <p className="truncate">{topic.description}</p>
      </CardBody>
    </LinkCard>
  );
}
