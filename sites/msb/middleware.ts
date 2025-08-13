import { NextRequest, NextResponse } from 'next/server';
import { handleSearchRedirect } from './middlware/handlers/searchRedirect';

export const config = {
  // Order does not matter in matchers.
  // NOTE: Must be an inline literal for Next.js static analysis. Do not reference imported identifiers.
  matcher: [
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

// Order matters in middleware, as they will be executed in the order listed
const handlers = [handleSearchRedirect];

export default async function middleware(req: NextRequest) {
  for (const h of handlers) {
    const res = await h(req);
    if (res) return res; // If a handler returns a response, stop processing
  }

  return NextResponse.next();
}
