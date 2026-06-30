import { NextRequest, NextResponse } from 'next/server';
import { propertyApiCall } from '@msb/property-sdk';
import type { ApiResponseBody } from '@/app/search/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query') ?? '';
  const mode = searchParams.get('mode') ?? '';
  const page = searchParams.get('page') ?? '1';

  if (!query || !mode) {
    return NextResponse.json(
      { error: 'Missing query or mode parameter' },
      { status: 400 },
    );
  }

  if (query.length > 500) {
    return NextResponse.json(
      {
        error: 'Query parameter is too long. Maximum length is 500 characters.',
      },
      { status: 414 },
    );
  }

  try {
    const data = await propertyApiCall<ApiResponseBody>('/search', {
      query,
      mode,
      page,
    });

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch search results';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
