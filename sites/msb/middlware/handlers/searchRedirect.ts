import { NextRequest, NextResponse } from 'next/server';
import { singular } from 'pluralize';

export const SEARCH_MATCHERS = [
  '/communities',
  '/departments',
  '/districts',
  '/facilities',
  '/parks',
  '/public-notices',
  '/services',
  '/trails',
  '/topics',
];

const SEARCH_SET = new Set(
  SEARCH_MATCHERS.map((m) => (m.startsWith('/') ? m.slice(1) : m)),
);

export async function handleSearchRedirect(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const type = path.split('/')[1]; // first segment

  if (!SEARCH_SET.has(type)) return; // Not our concern -> let next handler run

  const url = req.nextUrl.clone();
  url.pathname = '/search';
  url.searchParams.set('pages[refinementList][type][0]', singular(type));

  return NextResponse.redirect(url);
}
