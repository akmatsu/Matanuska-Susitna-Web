import { ContentPageLayout } from '@/components/static/ContentPageLayout';
import { PageListItemsView } from '@/components/static/Page/PageListItems';
import { RichContent, hasRichContent } from '@/components/server/RichContent';
import {
  toContentPageData,
  toServiceSideLists,
  type ServicePageResult,
} from './toContentPageData';

/**
 * Renders a service from the Laravel CMS. The live page and the draft
 * preview both use it, so a preview looks exactly like the published page.
 */
export function ServiceView({ result }: { result: ServicePageResult }) {
  const { data: service, references, documentCollections } = result;
  const sideLists = toServiceSideLists(service);

  return (
    <ContentPageLayout
      page={toContentPageData(service)}
      body={
        hasRichContent(service.content) ? (
          <RichContent
            doc={service.content}
            references={references}
            documentCollections={documentCollections}
          />
        ) : null
      }
      rightSide={
        <>
          <PageListItemsView items={sideLists.parks} title="Parks" />
          <PageListItemsView items={sideLists.trails} title="Trails" />
          <PageListItemsView items={sideLists.facilities} title="Facilities" />
          <PageListItemsView items={sideLists.boards} title="Boards" />
        </>
      }
    />
  );
}
