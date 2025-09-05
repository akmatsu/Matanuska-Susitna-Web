import { NextAuthRequest } from 'next-auth';
import { NextResponse } from 'next/server';
import { singular } from 'pluralize';

export const SEARCH_MATCHERS = [
  '/communities',
  '/assembly-districts',
  '/facilities',
  '/parks',
  '/public-notices',
  '/services',
  '/trails',
  '/topics',
  '/plans',
];

const SEARCH_SET = new Set(
  SEARCH_MATCHERS.map((m) => (m.startsWith('/') ? m.slice(1) : m)),
);

export async function handleSearchRedirect(req: NextAuthRequest) {
  const path = req.nextUrl.pathname;
  const split = path.split('/');
  const type = split[1];

  if (!SEARCH_SET.has(type) || split.length > 2) return; // Not our concern -> let next handler run

  const url = req.nextUrl.clone();
  url.pathname = '/search';
  url.searchParams.set(
    'pages[refinementList][type][0]',
    singular(type).replace('-', '_'),
  );

  return NextResponse.redirect(url);
}
