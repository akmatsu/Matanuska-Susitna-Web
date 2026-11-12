import { describe, expect, it } from 'vitest';
import { toContentPageData, type TopicData } from './toContentPageData';

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

const topic = {
  id: 'topic-1',
  title: 'Roads',
  description: 'Road things',
  heroImage: null,
  hideSideNav: false,
  documents: [],
  contacts: [],
  upcomingEvents: ['e1', 'e2', 'e3', 'e4', 'e5'].map((id) => ({ id })),
  publicNotices: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'].map((id) => ({ id })),
  relatedTopics: [summary('related')],
  services: [summary('b-service'), summary('a-service')],
  communities: [],
  orgUnits: [],
  assemblyDistricts: [],
  plans: [],
} as unknown as TopicData;

describe('toContentPageData (topics)', () => {
  it('maps a topic to the content page layout', () => {
    const page = toContentPageData(topic);

    expect(page).toMatchObject({
      id: 'topic-1',
      pageType: 'Topic',
      typeLabel: 'Topic',
      title: 'Roads',
    });
    // Related topics fill the "Related Topics" section.
    expect(page.topics?.map((t) => t.id)).toEqual(['related']);
    // The CMS order is kept, not re-sorted.
    expect(page.services?.map((s) => s.id)).toEqual(['b-service', 'a-service']);
  });

  it('shows the next 4 events and the top 5 notices', () => {
    const page = toContentPageData(topic);

    expect(page.events?.map((e) => e.id)).toEqual(['e1', 'e2', 'e3', 'e4']);
    expect(page.publicNotices).toHaveLength(5);
  });
});
