import {
  DraftPreview,
  draftPreviewMetadata,
} from '@/components/server/DraftPreview';
import { getOrgUnitDraft } from '@msb/cms-sdk';
import { ORG_UNIT_INCLUDES } from '../orgUnitIncludes';
import { OrgUnitView } from '../OrgUnitView';

export const metadata = draftPreviewMetadata('Org Unit');

/**
 * Shows the draft even when `showPage` is off, so editors can still check
 * it. The live page would be a 404.
 */
export default async function DepartmentDraftPage(
  props: PageProps<'/departments/[slug]/draft'>,
) {
  const { slug } = await props.params;

  return (
    <DraftPreview
      livePath={`/departments/${encodeURIComponent(slug)}`}
      searchParams={await props.searchParams}
      load={(link) => getOrgUnitDraft(link, { include: ORG_UNIT_INCLUDES })}
    >
      {(result) => <OrgUnitView result={result} />}
    </DraftPreview>
  );
}
