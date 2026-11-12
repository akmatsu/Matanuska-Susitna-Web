import {
  DraftPreview,
  draftPreviewMetadata,
} from '@/components/server/DraftPreview';
import { getServiceDraft } from '@msb/cms-sdk';
import { SERVICE_INCLUDES } from '../serviceIncludes';
import { ServiceView } from '../ServiceView';

export const metadata = draftPreviewMetadata('Service');

export default async function ServiceDraftPage(
  props: PageProps<'/services/[slug]/draft'>,
) {
  const { slug } = await props.params;

  return (
    <DraftPreview
      livePath={`/services/${encodeURIComponent(slug)}`}
      searchParams={await props.searchParams}
      load={(link) => getServiceDraft(link, { include: SERVICE_INCLUDES })}
    >
      {(result) => <ServiceView result={result} />}
    </DraftPreview>
  );
}
