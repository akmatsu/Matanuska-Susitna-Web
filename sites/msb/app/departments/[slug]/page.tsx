import { NEXT_DEFAULT_REVALIDATE } from '@/configs/config';
import { getOrgUnit } from '@msb/cms-sdk';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ORG_UNIT_INCLUDES } from './orgUnitIncludes';
import { OrgUnitView } from './OrgUnitView';

type Props = { params: Promise<{ slug: string }> };

/**
 * Org units (departments, offices and divisions) come from the Laravel CMS
 * REST API. Metadata and the page make the same request, and Next memoizes
 * it, so the CMS is called once.
 *
 * An org unit with `showPage` turned off exists only as a link target in
 * the CMS, so it has no page here.
 */
async function loadOrgUnit(slug: string) {
  const result = await getOrgUnit(slug, {
    include: ORG_UNIT_INCLUDES,
    revalidate: NEXT_DEFAULT_REVALIDATE,
  });
  return result?.data.showPage ? result : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await loadOrgUnit(slug);
  if (!result) return {};

  return {
    title: `MSB - ${result.data.title}`,
    description: result.data.description,
  };
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const result = await loadOrgUnit(slug);

  if (!result) {
    return notFound();
  }

  return <OrgUnitView result={result} />;
}
