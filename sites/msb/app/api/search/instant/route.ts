import { instantSearch } from '@/utils/search/typesense';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query || typeof query !== 'string') {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await instantSearch({ query });
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Failed to perform instant search:', error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
