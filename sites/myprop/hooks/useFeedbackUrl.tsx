import { usePathname, useSearchParams } from 'next/navigation';

export function useFeedbackUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return `https://survey123.arcgis.com/share/b36071e746fc4dd490331a207d1678c9?field:url=https://myproperty.matsu.gov${pathname}?${searchParams.toString()}`;
}
