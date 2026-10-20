// Default to the Tyler test site until Property Access goes live.
export const propertyAccessBaseUrl =
  process.env.PROPERTY_ACCESS_URL ||
  'https://matanuskasusitnaboroughakpa-test.tylerhost.net/';

/**
 * Builds a link to a parcel page on the Property Access site.
 * `parId` is the tax ID without its first character.
 */
export function propertyAccessUrl(page: 'datalet' | 'taxesdue', parId: string) {
  const url = new URL(`/datalets/${page}.aspx`, propertyAccessBaseUrl);
  url.search = new URLSearchParams({ UseSearch: 'no', pin: parId }).toString();
  return url.toString();
}
