import type { TopicInclude } from '@msb/cms-sdk';

/** Every relation the topic page shows. The draft preview uses the same list. */
export const TOPIC_INCLUDES = [
  'actions',
  'contacts',
  'documents',
  'upcomingEvents',
  'publicNotices',
  'relatedTopics',
  'services',
  'communities',
  'orgUnits',
  'assemblyDistricts',
  'plans',
  'boards',
  'trails',
  'parks',
  'facilities',
] as const satisfies readonly TopicInclude[];
