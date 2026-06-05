import { getPopularSearches } from '@/utils/search/typesense';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const queries = await getPopularSearches({ limit: 10 });
    return NextResponse.json({ queries });
  } catch (error) {
    console.error('Failed to fetch popular searches:', error);
    return NextResponse.json({ queries: [] }, { status: 500 });
  }
}
