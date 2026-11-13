import type { ContentPageData } from '@/components/static/ContentPageLayout';
import { topPublicNotices, upcomingEvents } from '@/utils/cmsPageHelpers';
import type { OrgUnitDetail } from '@msb/cms-sdk';
import { ORG_UNIT_INCLUDES } from './orgUnitIncludes';

export type OrgUnitPageResult = OrgUnitDetail<
  (typeof ORG_UNIT_INCLUDES)[number]
>;
export type OrgUnitData = OrgUnitPageResult['data'];

/**
 * Maps a REST org unit to the standard content page layout. The CMS already
 * sorts every relation (by title, contacts by name), so the order is kept.
 */
export function toContentPageData(orgUnit: OrgUnitData): ContentPageData {
  return {
    id: orgUnit.id,
    // Same values Keystone pages used, so page-view tracking and the label
    // above the title don't change.
    pageType: 'OrgUnit',
    typeLabel: 'Org Unit',
    title: orgUnit.title,
    description: orgUnit.description,
    heroImage: orgUnit.heroImage,
    hideSideNav: orgUnit.hideSideNav,
    documents: orgUnit.documents,
    contacts: orgUnit.contacts,
    events: upcomingEvents(orgUnit.upcomingEvents),
    publicNotices: topPublicNotices(orgUnit.publicNotices),
    topics: orgUnit.topics,
    services: orgUnit.services,
    communities: orgUnit.communities,
    assemblyDistricts: orgUnit.assemblyDistricts,
    plans: orgUnit.plans,
  };
}
