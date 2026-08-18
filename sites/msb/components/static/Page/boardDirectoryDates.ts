export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

function isValidCalendarDate(year: number, month: number, day: number): boolean {
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const d = new Date(Date.UTC(year, month - 1, day));
  return (
    d.getUTCFullYear() === year &&
    d.getUTCMonth() === month - 1 &&
    d.getUTCDate() === day
  );
}

// TermBegins/TermEnds come from an uploaded spreadsheet where a given cell may
// be a genuine Excel date serial (number) or a literal typed date (string),
// independent of which field or row it's in. Parsing both representations
// into plain calendar components (rather than through `new Date(nonIsoString)`,
// which resolves in the process's local timezone) avoids the day rolling over
// when later formatted for display in a different timezone.
export function parseSpreadsheetDate(
  value: number | string | undefined,
): CalendarDate | null {
  if (value === undefined || value === null || value === '') return null;

  if (typeof value === 'number') {
    const ms = (value - 25569) * 86400 * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;
    return {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate(),
    };
  }

  const s = value.trim();

  let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
  if (m) {
    const month = Number(m[1]);
    const day = Number(m[2]);
    let year = Number(m[3]);
    if (m[3].length === 2) year += year < 70 ? 2000 : 1900;
    return isValidCalendarDate(year, month, day) ? { year, month, day } : null;
  }

  m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    return isValidCalendarDate(year, month, day) ? { year, month, day } : null;
  }

  return null;
}

// Mirrors the previous 'M/d/yy' display format.
export function formatCalendarDate(cd: CalendarDate | null): string | null {
  if (!cd) return null;
  return `${cd.month}/${cd.day}/${String(cd.year % 100).padStart(2, '0')}`;
}
