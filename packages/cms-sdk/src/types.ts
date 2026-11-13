import type { components } from './generated/sites';
import type { TipTapDoc } from './tiptap';

type Schemas = components['schemas'];

/**
 * A service. `content` is typed with the hand-written TipTap node union
 * instead of the spec's generic node.
 */
export type Service = Omit<Schemas['ServiceResource'], 'content'> & {
  content: TipTapDoc | null;
};

/**
 * A topic. `content` is typed with the hand-written TipTap node union
 * instead of the spec's generic node.
 */
export type Topic = Omit<Schemas['TopicResource'], 'content'> & {
  content: TipTapDoc | null;
};

/**
 * An org unit (a department, office or division). `content` is typed with
 * the hand-written TipTap node union instead of the spec's generic node.
 */
export type OrgUnit = Omit<Schemas['OrgUnitResource'], 'content'> & {
  content: TipTapDoc | null;
};

/** What kind of org unit it is. Null when it isn't set in the CMS. */
export type OrgUnitType = NonNullable<OrgUnit['unitType']>;

export type Contact = Schemas['ContactResource'];
/** Named CmsDocument so it doesn't clash with the DOM `Document` type. */
export type CmsDocument = Schemas['DocumentResource'];
export type DocumentCollection = Schemas['DocumentCollectionResource'];
export type ExternalLink = Schemas['ExternalLinkResource'];
/** A link to another CMS record. `target` is null when it's missing or unpublished. */
export type InternalLink = Schemas['InternalLinkResource'];
export type PageSummary = Schemas['PageSummaryResource'];
export type EventSummary = Schemas['EventSummaryResource'];
export type PublicNoticeSummary = Schemas['PublicNoticeSummaryResource'];
export type Tag = Schemas['TagResource'];
