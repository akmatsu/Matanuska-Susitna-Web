import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { TopicCard } from './TopicCard';

const topicListFragment = gql(`
  fragment TopicList on Topic {
    id
    ...TopicFields
  }
`);

export function PageTopics(props: {
  topics?: FragmentType<typeof topicListFragment>[] | null;
}) {
  const topics = getFragmentData(topicListFragment, props.topics);
  if (topics?.length) {
    return (
      <ul>
        {topics.map((topic) => (
          <TopicCard topic={topic} key={topic.id} className="my-2" as="li" />
        ))}
      </ul>
    );
  }
  return null;
}
