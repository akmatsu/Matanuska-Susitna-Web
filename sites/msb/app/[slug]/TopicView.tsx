import { ContentPageLayout } from '@/components/static/ContentPageLayout';
import {
  hasInternalActions,
  InternalActionsView,
} from '@/components/static/Page/PageActions';
import { PageListItemsView } from '@/components/static/Page/PageListItems';
import { RichContent, hasRichContent } from '@/components/server/RichContent';
import { toContentPageData, type TopicPageResult } from './toContentPageData';

/**
 * Renders a topic from the Laravel CMS. The live page and the draft preview
 * both use it, so a preview looks exactly like the published page.
 */
export function TopicView({ result }: { result: TopicPageResult }) {
  const { data: topic, references, documentCollections } = result;

  return (
    <ContentPageLayout
      page={toContentPageData(topic)}
      body={
        hasRichContent(topic.content) ? (
          <RichContent
            doc={topic.content}
            references={references}
            documentCollections={documentCollections}
          />
        ) : null
      }
      internalActions={<InternalActionsView actions={topic.actions} />}
      hasInternalActions={hasInternalActions(topic.actions)}
      rightSide={
        <>
          <PageListItemsView items={topic.facilities} title="Facilities" />
          <PageListItemsView items={topic.trails} title="Trails" />
          <PageListItemsView items={topic.parks} title="Parks" />
        </>
      }
    >
      <PageListItemsView items={topic.boards} title="Boards" />
    </ContentPageLayout>
  );
}
