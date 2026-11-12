import type { ContentPageData } from '@/components/static/ContentPageLayout';
import { topPublicNotices, upcomingEvents } from '@/utils/cmsPageHelpers';
import type { TopicDetail } from '@msb/cms-sdk';
import { TOPIC_INCLUDES } from './topicIncludes';

export type TopicPageResult = TopicDetail<(typeof TOPIC_INCLUDES)[number]>;
export type TopicData = TopicPageResult['data'];

/**
 * Maps a REST topic to the standard content page layout. The CMS already
 * sorts every relation (by title, contacts by name), so the order is kept.
 */
export function toContentPageData(topic: TopicData): ContentPageData {
  return {
    id: topic.id,
    pageType: 'Topic',
    typeLabel: 'Topic',
    title: topic.title,
    description: topic.description,
    heroImage: topic.heroImage,
    hideSideNav: topic.hideSideNav,
    documents: topic.documents,
    contacts: topic.contacts,
    events: upcomingEvents(topic.upcomingEvents),
    publicNotices: topPublicNotices(topic.publicNotices),
    topics: topic.relatedTopics,
    services: topic.services,
    communities: topic.communities,
    orgUnits: topic.orgUnits,
    assemblyDistricts: topic.assemblyDistricts,
    plans: topic.plans,
  };
}
