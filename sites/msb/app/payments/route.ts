import { redirect } from 'next/navigation';

export function GET(request: Request) {
  redirect('https://matsugov.us/payments');
}
