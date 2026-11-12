// Shared rules for pages that load from the Laravel CMS REST API.

/** How many upcoming events a content page shows. */
export const MAX_EVENTS = 4;
/** How many public notices a content page shows. */
export const MAX_PUBLIC_NOTICES = 5;

/**
 * The next few upcoming events. The CMS sends only upcoming events, already
 * sorted soonest first, so this keeps its order.
 */
export function upcomingEvents<T>(events: readonly T[]): T[] {
  return events.slice(0, MAX_EVENTS);
}

/**
 * The most important public notices. The CMS already sorts them by urgency
 * (highest first), then by publish date (newest first).
 */
export function topPublicNotices<T>(notices: readonly T[]): T[] {
  return notices.slice(0, MAX_PUBLIC_NOTICES);
}
