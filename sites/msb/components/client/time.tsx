'use client';
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

  try {
    return <>{format(new Date(date), formatStr)}</>;
  } catch {
    return <>{fallback}</>;
  }
}
