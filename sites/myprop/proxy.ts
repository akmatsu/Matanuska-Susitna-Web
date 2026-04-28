import { NextRequest } from 'next/server';
import { middlewareSearchParams } from './middlware/middlewareSearchParams';

export async function proxy(req: NextRequest) {
  return middlewareSearchParams(req);
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};
