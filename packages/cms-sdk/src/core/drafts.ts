/**
 * The parts of a signed preview link that the CMS checks. The CMS's
 * Preview button makes the link; the site's draft page copies these values
 * from its URL unchanged.
 */
export type DraftPreviewLink = {
  /** The draft id. */
  id: string;
  /** Unix timestamp, copied unchanged from the preview link. */
  expires: number;
  /** Signature, copied unchanged from the preview link. */
  signature: string;
};
