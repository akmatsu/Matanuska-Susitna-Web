import { tz } from '@date-fns/tz';
import { format } from 'date-fns';

export function DateTime({
  date,
  formatStr = 'PPp',
  fallback = 'TBD',
  className,
}: {
  date?: Date | number | string;
  formatStr?: string;
  fallback?: string;
  className?: string;
}) {
  if (!date) return <span className={className}>{fallback}</span>;

  const parsedDate = new Date(date);
  console.log('Parsed date:', parsedDate);
  if (isNaN(parsedDate.getTime())) {
    return <span className={className}>{fallback}</span>;
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
    return <span className={className}>{fallback}</span>;
  }

  return <span className={className}>{formattedDate}</span>;
}
