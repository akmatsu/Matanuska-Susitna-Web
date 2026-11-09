import type { ContentPageData } from '@/components/static/ContentPageLayout';
import type { ServiceDetail } from '@msb/cms-sdk';
import { SERVICE_INCLUDES } from './serviceIncludes';

type ServiceData = ServiceDetail<(typeof SERVICE_INCLUDES)[number]>['data'];

// Same limits the Keystone GraphQL page queries used.
const MAX_EVENTS = 4;
const MAX_PUBLIC_NOTICES = 5;

function byTitle<T extends { title: string }>(items: T[]) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

function time(value: string | null) {
  return value ? new Date(value).getTime() : 0;
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
 * Maps a REST service to the standard content page layout. It keeps the
 * sorting and limits that the Keystone GraphQL query applied.
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
    events: [...service.upcomingEvents]
      .sort((a, b) => time(b.startDate) - time(a.startDate))
      .slice(0, MAX_EVENTS),
    publicNotices: [...service.publicNotices]
      .sort((a, b) => b.urgency - a.urgency)
      .slice(0, MAX_PUBLIC_NOTICES),
    topics: byTitle(service.topics),
    services: byTitle(service.relatedServices),
    communities: byTitle(service.communities),
    orgUnits: byTitle(service.orgUnits),
    assemblyDistricts: byTitle(service.assemblyDistricts),
    plans: byTitle(service.plans),
  };
}
