import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import {
  TopicItemView,
  toTopicItemData,
  type TopicItemData,
} from './TopicCard';
import { PageSection } from './PageSection';

const topicListFragment = gql(`
  fragment TopicList on Topic {
    id
    ...TopicFields
  }
`);

export type TopicListData = TopicItemData & { id: string };

export function PageTopicsView(props: { topics?: TopicListData[] | null }) {
  const { topics } = props;
  if (!topics?.length) return null;

  return (
    <PageSection title="Related Topics">
      <ul>
        {topics.map((topic) => (
          <TopicItemView topic={topic} key={topic.id} />
        ))}
      </ul>
    </PageSection>
  );
}

type TopicListRef = FragmentType<typeof topicListFragment>;

/** Maps the Keystone GraphQL topic list fragment to view data. */
export function toTopicListData(ref: TopicListRef): TopicListData {
  const topic = getFragmentData(topicListFragment, ref);
  return { id: topic.id, ...toTopicItemData(topic) };
}

export function PageTopics(props: { topics?: TopicListRef[] | null }) {
  return <PageTopicsView topics={props.topics?.map(toTopicListData)} />;
}
