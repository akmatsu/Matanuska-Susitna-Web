import { getPopularSearches } from '@/utils/search/typesense';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('q') || '';
    const queries = await getPopularSearches({ query, limit: 10 });
    return NextResponse.json({ queries });
  } catch (error) {
    console.error('Failed to fetch popular searches:', error);
    return NextResponse.json({ queries: [] }, { status: 500 });
  }
}
