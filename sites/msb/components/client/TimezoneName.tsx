'use client';

import { tzName, TZNameFormat } from '@date-fns/tz';

export function TimezoneName({
  format = 'longGeneric',
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  date = new Date(),
}: {
  format?: TZNameFormat;
  timezone?: string;
  date?: Date;
}) {
  const name = tzName(timezone, date, format);
  return <>{name}</>;
}
