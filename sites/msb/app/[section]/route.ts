import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { singular } from 'pluralize';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> },
) {
  const { section } = await params;
  return redirect(
    `/search?pages[refinementList][type][0]=${singular(section)}`,
  );
}
