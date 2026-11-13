import { ContentPageLayout } from '@/components/static/ContentPageLayout';
import {
  hasInternalActions,
  InternalActionsView,
} from '@/components/static/Page/PageActions';
import { PageListItemsView } from '@/components/static/Page/PageListItems';
import { PageParentOrgUnit } from '@/components/static/Page/PageParentOrgUnit';
import { RichContent, hasRichContent } from '@/components/server/RichContent';
import { toContentPageData, type OrgUnitPageResult } from './toContentPageData';

/**
 * Renders an org unit from the Laravel CMS. The live page and the draft
 * preview both use it, so a preview looks exactly like the published page.
 */
export function OrgUnitView({ result }: { result: OrgUnitPageResult }) {
  const { data: orgUnit, references, documentCollections } = result;

  return (
    <ContentPageLayout
      page={toContentPageData(orgUnit)}
      body={
        hasRichContent(orgUnit.content) ? (
          <RichContent
            doc={orgUnit.content}
            references={references}
            documentCollections={documentCollections}
          />
        ) : null
      }
      internalActions={<InternalActionsView actions={orgUnit.actions} />}
      hasInternalActions={hasInternalActions(orgUnit.actions)}
      rightSide={
        <>
          <PageParentOrgUnit item={orgUnit.parent} />
          <PageListItemsView
            items={orgUnit.children}
            title={orgUnit.childrenLabel}
          />
          <PageListItemsView items={orgUnit.facilities} title="Facilities" />
          <PageListItemsView items={orgUnit.parks} title="Parks" />
          <PageListItemsView items={orgUnit.trails} title="Trails" />
          <PageListItemsView items={orgUnit.boards} title="Boards" />
        </>
      }
    />
  );
}
