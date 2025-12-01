import { NextResponse } from 'next/server';
import { handleSearchRedirect } from './middleware/handlers/searchRedirect';
import { handleCmsRedirects } from './middleware/handlers/cmsRedirects';
import { auth } from '@/auth';

export const config = {
  // Order does not matter in matchers.
  // NOTE: Must be an inline literal for Next.js static analysis. Do not reference imported identifiers.
  matcher: [
    '/assembly-districts',
    '/facilities',
    '/parks',
    '/public-notices',
    '/services',
    '/trails',
    '/topics',
    '/plans',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};

// Order matters in middleware, as they will be executed in the order listed
const handlers = [handleSearchRedirect, handleCmsRedirects];

export default auth(async (req) => {
  if (
    !req.auth &&
    process.env.DEPLOY_ENV === 'stage' &&
    process.env.NODE_ENV === 'production'
  )
    return NextResponse.redirect(
      new URL(
        '/api/auth/signin?callbackUrl=' + encodeURIComponent(req.url),
        req.url,
      ),
    );

  for (const h of handlers) {
    const res = await h(req);
    if (res) return res; // If a handler returns a response, stop processing
  }

  // Non-blocking PATCH request to page view tracker
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    // Fire and forget, do not await
    fetch(`${apiUrl}/api/page-views`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: req.nextUrl.pathname,
        userAgent: req.headers.get('user-agent'),
      }),
    }).catch(() => {}); // Ignore errors
  }

  return NextResponse.next();
});
