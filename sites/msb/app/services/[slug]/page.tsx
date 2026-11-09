import { ContentPageLayout } from '@/components/static/ContentPageLayout';
import { PageListItemsView } from '@/components/static/Page/PageListItems';
import { RichContent, hasRichContent } from '@/components/server/RichContent';
import { NEXT_DEFAULT_REVALIDATE } from '@/configs/config';
import { getService } from '@msb/cms-sdk';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICE_INCLUDES } from './serviceIncludes';
import { toContentPageData, toServiceSideLists } from './toContentPageData';

type Props = { params: Promise<{ slug: string }> };

/**
 * Services come from the Laravel CMS REST API. Metadata and the page make
 * the same request, and Next memoizes it, so the CMS is called once.
 */
function loadService(slug: string) {
  return getService(slug, {
    include: SERVICE_INCLUDES,
    revalidate: NEXT_DEFAULT_REVALIDATE,
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await loadService(slug);
  if (!result) return {};

  return {
    title: `MSB - ${result.data.title}`,
    description: result.data.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const result = await loadService(slug);

  if (!result) {
    return notFound();
  }

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
