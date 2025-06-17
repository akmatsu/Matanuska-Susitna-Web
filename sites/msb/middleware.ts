import { NextRequest, NextResponse } from 'next/server';
import { singular } from 'pluralize';

export const config = {
  matcher: [
    '/boards',
    '/communities',
    '/departments',
    '/districts',
    '/facilities',
    '/parks',
    '/public-notices',
    '/services',
    '/trails',
    '/topics',
  ],
};

export default function middleware(request: NextRequest) {
  const type = request.nextUrl.pathname.split('/')[1];
  const url = request.nextUrl.clone();
  url.pathname = '/search';
  url.searchParams.set('pages[refinementList][type][0]', singular(type));

  return NextResponse.redirect(url);
}
