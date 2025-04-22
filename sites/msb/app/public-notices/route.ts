import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filter: string }> },
) {
  const p = await params;
  if (p?.filter) {
    return redirect(
      `/search?pages[refinementList][type][0]=publicNotice&[refinementList][related_pages][0]=${p.filter}`,
    );
  }
  return redirect(`/search?pages[refinementList][type][0]=publicNotice`);
}
