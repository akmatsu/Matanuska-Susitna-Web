/*
 * The CMS does not sanitize rich text on save, so every URL from `content`
 * is checked here before it reaches an href or src.
 */

/** A same-site path like "/services/x". Rejects "//host", which is another site. */
function isRootRelative(value: string) {
  return value.startsWith('/') && !value.startsWith('//');
}

function protocolOf(value: string) {
  try {
    return new URL(value).protocol;
  } catch {
    return null;
  }
}

const LINK_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/** Returns the href if it is safe to link to, otherwise null. */
export function safeLinkHref(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const href = value.trim();
  if (isRootRelative(href) || href.startsWith('#')) return href;
  const protocol = protocolOf(href);
  return protocol && LINK_PROTOCOLS.has(protocol) ? href : null;
}

/** Returns the src if it is a safe image source, otherwise null. */
export function safeImageSrc(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const src = value.trim();
  if (isRootRelative(src)) return src;
  const protocol = protocolOf(src);
  return protocol === 'http:' || protocol === 'https:' ? src : null;
}

/** Iframes must load over https. Any host is allowed. */
export function safeIframeSrc(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const src = value.trim();
  return protocolOf(src) === 'https:' ? src : null;
}

/**
 * Browser features an embed may ask for. Anything else in the iframe's
 * `allow` attribute (camera, microphone, geolocation, ...) is removed.
 */
const IFRAME_FEATURES = new Set([
  'fullscreen',
  'autoplay',
  'encrypted-media',
  'picture-in-picture',
  'clipboard-write',
]);

export function safeIframeAllow(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const allowed = value
    .split(';')
    .map((part) => part.trim())
    .filter((part) => IFRAME_FEATURES.has(part.split(/\s+/)[0]));
  return allowed.length ? allowed.join('; ') : undefined;
}

/** Iframe width/height may arrive as "600" or 600. */
export function safeSize(value: unknown): string | number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && /^\d+(\.\d+)?(%|px)?$/.test(value.trim())) {
    return value.trim();
  }
  return undefined;
}
