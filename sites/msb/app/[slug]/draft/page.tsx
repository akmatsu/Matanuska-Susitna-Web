import {
  DraftPreview,
  draftPreviewMetadata,
} from '@/components/server/DraftPreview';
import { getTopicDraft } from '@msb/cms-sdk';
import { TOPIC_INCLUDES } from '../topicIncludes';
import { TopicView } from '../TopicView';

export const metadata = draftPreviewMetadata('Topic');

export default async function TopicDraftPage(
  props: PageProps<'/[slug]/draft'>,
) {
  const { slug } = await props.params;

  return (
    <DraftPreview
      livePath={`/${encodeURIComponent(slug)}`}
      searchParams={await props.searchParams}
      load={(link) => getTopicDraft(link, { include: TOPIC_INCLUDES })}
    >
      {(result) => <TopicView result={result} />}
    </DraftPreview>
  );
}
