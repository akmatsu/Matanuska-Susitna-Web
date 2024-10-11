import { useSearchParams } from 'next/navigation';

export function usePageParam() {
  const params = useSearchParams();
  const pageParam = params.get('page');
  const search = params.get('search');
  const page = pageParam ? parseInt(pageParam) : 1;

  return { page, search };
}
