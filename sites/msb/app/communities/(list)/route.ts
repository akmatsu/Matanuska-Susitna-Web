import { redirect } from 'next/navigation';

export async function GET() {
  return redirect(`/search?pages[refinementList][type][0]=community`);
}
