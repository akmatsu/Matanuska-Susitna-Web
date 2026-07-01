import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const parm = searchParams.get('parm');
  redirect(`/search?mode=sub&query=${parm}`);
}
