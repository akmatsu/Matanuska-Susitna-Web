import type { ServiceInclude } from '@msb/cms-sdk';

/** Every relation the services page shows. */
export const SERVICE_INCLUDES = [
  'primaryAction',
  'secondaryActions',
  'primaryContact',
  'contacts',
  'documents',
  'upcomingEvents',
  'publicNotices',
  'topics',
  'communities',
  'orgUnits',
  'assemblyDistricts',
  'relatedServices',
  'plans',
  'trails',
  'parks',
  'facilities',
  'boards',
] as const satisfies readonly ServiceInclude[];
