import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const pID = queryParams.get('pID');

  redirect(`/parcels/${pID}`);
}
