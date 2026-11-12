import { describe, expect, it } from 'vitest';
import { topPublicNotices, upcomingEvents } from './cmsPageHelpers';

describe('upcomingEvents', () => {
  it('keeps the soonest-first order from the CMS and takes the next 4', () => {
    const events = ['jan', 'feb', 'mar', 'apr', 'may'];
    expect(upcomingEvents(events)).toEqual(['jan', 'feb', 'mar', 'apr']);
  });
});

describe('topPublicNotices', () => {
  it('keeps the CMS order and takes the first 5', () => {
    const notices = [1, 2, 3, 4, 5, 6];
    expect(topPublicNotices(notices)).toEqual([1, 2, 3, 4, 5]);
  });
});
