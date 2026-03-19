import { tz } from '@date-fns/tz';
import { format } from 'date-fns';

export function DateTime({
  date,
  formatStr = 'PPp',
  fallback = 'TBD',
}: {
  date?: Date | number | string;
  formatStr?: string;
  fallback?: string;
}) {
  if (!date) return <>{fallback}</>;

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return <>{fallback}</>;
  }

  let formattedDate: string | null;

  try {
    formattedDate = format(parsedDate, formatStr, {
      in: tz('America/Anchorage'),
    });
  } catch {
    formattedDate = null;
  }

  if (!formattedDate) {
    return <>{fallback}</>;
  }

  return <>{formattedDate}</>;
}
