import type { OrgUnitInclude } from '@msb/cms-sdk';

/** Every relation the org unit page shows. The draft preview uses the same list. */
export const ORG_UNIT_INCLUDES = [
  'actions',
  'contacts',
  'documents',
  'upcomingEvents',
  'publicNotices',
  'parent',
  'children',
  'topics',
  'services',
  'communities',
  'assemblyDistricts',
  'plans',
  'boards',
  'trails',
  'parks',
  'facilities',
] as const satisfies readonly OrgUnitInclude[];
