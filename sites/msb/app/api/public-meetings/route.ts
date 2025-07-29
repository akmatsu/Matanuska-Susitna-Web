import { searchCalendarEvents } from '@/utils/calendarHelpers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const res = await searchCalendarEvents({
    query: request.nextUrl.searchParams.get('query') || '',
    limit: request.nextUrl.searchParams.get('limit')
      ? parseInt(request.nextUrl.searchParams.get('limit') as string, 10)
      : 8,
    timeMin: request.nextUrl.searchParams.get('timeMin') || undefined,
    timeMax: request.nextUrl.searchParams.get('timeMax') || undefined,
  });

  return Response.json(res);
}
