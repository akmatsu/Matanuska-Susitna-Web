import { describe, expect, it } from 'vitest';
import { parseSpreadsheetDate, formatCalendarDate } from './boardDirectoryDates';

describe('parseSpreadsheetDate + formatCalendarDate', () => {
  it('parses a numeric Excel serial date to the correct calendar day', () => {
    // TermBegins value taken directly from BOAA 22Apr26 (1).xlsx.
    const parsed = parseSpreadsheetDate(46023);
    expect(parsed).toEqual({ year: 2026, month: 1, day: 1 });
    expect(formatCalendarDate(parsed)).toBe('1/1/26');
  });

  it('parses a literal M/D/YYYY string to the correct calendar day', () => {
    // TermEnds value taken directly from BOAA 22Apr26 (1).xlsx, entered as
    // text rather than a real Excel date. Previously this rendered as the
    // wrong day (12/30/28) once routed through timezone-aware formatting.
    const parsed = parseSpreadsheetDate('12/31/2028');
    expect(parsed).toEqual({ year: 2028, month: 12, day: 31 });
    expect(formatCalendarDate(parsed)).toBe('12/31/28');
  });

  it('parses a literal M/D/YY string with a 2-digit year', () => {
    const parsed = parseSpreadsheetDate('12/31/28');
    expect(parsed).toEqual({ year: 2028, month: 12, day: 31 });
    expect(formatCalendarDate(parsed)).toBe('12/31/28');
  });

  it('parses a literal ISO YYYY-MM-DD string', () => {
    const parsed = parseSpreadsheetDate('2028-12-31');
    expect(parsed).toEqual({ year: 2028, month: 12, day: 31 });
    expect(formatCalendarDate(parsed)).toBe('12/31/28');
  });

  it('produces the same calendar day for a number and a string representing the same date', () => {
    const fromNumber = parseSpreadsheetDate(47118);
    const fromString = parseSpreadsheetDate('12/31/2028');
    expect(fromNumber).toEqual(fromString);
  });

  it('returns null for missing or empty values', () => {
    expect(parseSpreadsheetDate(undefined)).toBeNull();
    expect(parseSpreadsheetDate('')).toBeNull();
  });

  it('returns null for unparseable or invalid dates instead of throwing', () => {
    expect(parseSpreadsheetDate('N/A')).toBeNull();
    expect(parseSpreadsheetDate('2/30/2028')).toBeNull();
    expect(formatCalendarDate(null)).toBeNull();
  });
});
