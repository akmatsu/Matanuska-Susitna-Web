import { CmsApiError, type DraftPreviewLink } from '@msb/cms-sdk';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

type SearchParams = Record<string, string | string[] | undefined>;

/** Metadata for a draft preview page. Drafts must never be indexed. */
export function draftPreviewMetadata(typeLabel: string): Metadata {
  return {
    title: `${typeLabel} Draft`,
    description: `Preview draft of a ${typeLabel.toLowerCase()} page`,
    robots: {
      index: false,
      follow: false,
    },
    // The preview link's signature is in the URL. Don't send it to other
    // sites in the Referer header when someone clicks a link on the page.
    referrer: 'no-referrer',
  };
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Preview of an unpublished draft from the Laravel CMS. Editors open it
 * with the CMS's Preview button, which makes a signed link that expires:
 * `<live page path>/draft?id=...&expires=...&signature=...`. This passes
 * those values to the CMS unchanged, and the CMS checks them.
 *
 * - No `id`: redirects to the live page.
 * - Invalid or expired link: shows a message.
 * - The draft is gone (usually because it was published): redirects to the
 *   live page.
 */
export async function DraftPreview<T>(props: {
  /** The live page's path. Its parts must already be URL-encoded. */
  livePath: string;
  searchParams: SearchParams;
  load: (link: DraftPreviewLink) => Promise<T | null>;
  children: (result: T) => ReactNode;
}) {
  const id = first(props.searchParams.id);
  const expires = first(props.searchParams.expires);
  const signature = first(props.searchParams.signature);

  if (!id) redirect(props.livePath);
  // `expires` must be passed on exactly as signed, so only plain digits
  // are accepted.
  if (!expires || !/^\d+$/.test(expires) || !signature) {
    return <InvalidPreviewLink />;
  }

  let result: T | null;
  try {
    result = await props.load({ id, expires: Number(expires), signature });
  } catch (error) {
    if (error instanceof CmsApiError && error.status === 403) {
      return <InvalidPreviewLink />;
    }
    throw error;
  }

  if (!result) redirect(props.livePath);

  return props.children(result);
}

function InvalidPreviewLink() {
  return (
    <section className="prose mx-auto max-w-6xl px-4 py-16">
      <h1>Preview link not valid</h1>
      <p>
        This preview link is invalid or has expired. Open Preview again from the
        CMS.
      </p>
    </section>
  );
}
