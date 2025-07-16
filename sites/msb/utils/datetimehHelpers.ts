export function formatDate(
  date: string,
  opts?: {
    hideTime?: boolean;
  },
) {
  return new Date(date).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: opts?.hideTime ? undefined : 'short',
  });
}

export function getYear(date?: string): number {
  if (!date) return new Date().getFullYear();

  const parsedDate = new Date(date);

  // Check if the date is valid
  if (isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid date string: ${date}`);
  }

  return parsedDate.getFullYear();
}

export function formatDateDayMonthYear(date: string) {
  return new Date(date).toLocaleString('en-US', {
    dateStyle: 'long',
  });
}

export function getDayOfWeekFromDate(date: string): string {
  const parsedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return parsedDate.toLocaleDateString('en-US', options);
}
