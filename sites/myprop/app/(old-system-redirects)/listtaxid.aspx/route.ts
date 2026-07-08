import { redirect } from 'next/navigation';

export function GET() {
  redirect('/?mode=tax');
}
