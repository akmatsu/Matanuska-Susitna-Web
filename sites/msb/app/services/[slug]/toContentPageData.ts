import type { ContentPageData } from '@/components/static/ContentPageLayout';
import type { ServiceDetail } from '@msb/cms-sdk';
import { topPublicNotices, upcomingEvents } from '@/utils/cmsPageHelpers';
import { SERVICE_INCLUDES } from './serviceIncludes';

export type ServicePageResult = ServiceDetail<
  (typeof SERVICE_INCLUDES)[number]
>;
type ServiceData = ServicePageResult['data'];

function byTitle<T extends { title: string }>(items: T[]) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

/** The Parks, Trails, Facilities and Boards lists shown in the side column. */
export function toServiceSideLists(service: ServiceData) {
  return {
    parks: byTitle(service.parks),
    trails: byTitle(service.trails),
    facilities: byTitle(service.facilities),
    boards: byTitle(service.boards),
  };
}

/**
 * Maps a REST service to the standard content page layout.
 */
export function toContentPageData(service: ServiceData): ContentPageData {
  return {
    id: service.id,
    pageType: 'Service',
    typeLabel: 'Service',
    title: service.title,
    description: service.description,
    heroImage: service.heroImage,
    hideSideNav: service.hideSideNav,
    primaryAction: service.primaryAction,
    secondaryActions: service.secondaryActions,
    documents: service.documents,
    primaryContact: service.primaryContact,
    contacts: [...service.contacts].sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
    events: upcomingEvents(service.upcomingEvents),
    publicNotices: topPublicNotices(service.publicNotices),
    topics: byTitle(service.topics),
    services: byTitle(service.relatedServices),
    communities: byTitle(service.communities),
    orgUnits: byTitle(service.orgUnits),
    assemblyDistricts: byTitle(service.assemblyDistricts),
    plans: byTitle(service.plans),
  };
}
