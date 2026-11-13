import { describe, expect, it } from 'vitest';
import { toContentPageData, type OrgUnitData } from './toContentPageData';

function summary(id: string) {
  return {
    id,
    type: 'service',
    title: id,
    slug: id,
    description: '',
    path: `/${id}`,
  };
}

const orgUnit = {
  id: 'org-1',
  title: 'Planning',
  description: 'Planning things',
  heroImage: null,
  hideSideNav: false,
  documents: [],
  contacts: [],
  upcomingEvents: ['e1', 'e2', 'e3', 'e4', 'e5'].map((id) => ({ id })),
  publicNotices: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'].map((id) => ({ id })),
  topics: [summary('roads')],
  services: [summary('b-service'), summary('a-service')],
  communities: [],
  assemblyDistricts: [],
  plans: [],
} as unknown as OrgUnitData;

describe('toContentPageData (org units)', () => {
  it('maps an org unit to the content page layout', () => {
    const page = toContentPageData(orgUnit);

    expect(page).toMatchObject({
      id: 'org-1',
      pageType: 'OrgUnit',
      typeLabel: 'Org Unit',
      title: 'Planning',
    });
    expect(page.topics?.map((t) => t.id)).toEqual(['roads']);
    // The CMS order is kept, not re-sorted.
    expect(page.services?.map((s) => s.id)).toEqual(['b-service', 'a-service']);
  });

  it('shows the next 4 events and the top 5 notices', () => {
    const page = toContentPageData(orgUnit);

    expect(page.events?.map((e) => e.id)).toEqual(['e1', 'e2', 'e3', 'e4']);
    expect(page.publicNotices).toHaveLength(5);
  });
});
