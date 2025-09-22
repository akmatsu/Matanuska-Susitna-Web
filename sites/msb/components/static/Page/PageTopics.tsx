import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { TopicItem } from './TopicCard';
import { PageSection } from './PageSection';

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
  if (!topics?.length) return null;

  return (
    <PageSection title="Related Topics">
      <ul>
        {topics.map((topic) => (
          <TopicItem topic={topic} key={topic.id} className="my-2" />
        ))}
      </ul>
    </PageSection>
  );
}
