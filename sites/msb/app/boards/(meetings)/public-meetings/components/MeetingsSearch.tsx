'use client';
import { MeetingCard } from '@/components/static/MeetingCard';
import { useDebounce } from '@/hooks/useDebounce';
import { type CalendarMeeting } from '@/utils/calendarHelpers';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@matsugov/ui';
import { DateRangePicker, type DateRange } from '@matsugov/ui/Calendar';
import { TextField } from '@matsugov/ui/TextField';
import { addYears, endOfDay, endOfYear, startOfDay, subYears } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export function MeetingsSearch() {
  const params = useSearchParams();
  const [meetings, setMeetings] = useState<CalendarMeeting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(params.get('q') || '');
  const [range, setRange] = useState<DateRange | undefined>({
    from: startOfDay(new Date()),
  });

  const limit = 25;

  const getMeetings = useCallback(async () => {
    try {
      setLoading(true);

      // An empty timeMin makes the API default to today. timeMax uses the
      // end of the day so meetings on the last selected day are included.
      const params = new URLSearchParams({
        query,
        timeMin: range?.from ? startOfDay(range.from).toISOString() : '',
        timeMax: range?.to ? endOfDay(range.to).toISOString() : '',
        limit: limit.toString(),
      });

      const res = await fetch(`/api/public-meetings?${params.toString()}`, {
        method: 'GET',
      }).then((res) => res.json());

      setMeetings(res.items);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setLoading(false);
    }
  }, [range, limit, query]);

  useDebounce(getMeetings, 500);

  return (
    <>
      <form
        className="mb-4 grid grid-cols-4 gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="col-span-4 md:col-span-2">
          <TextField
            id="meetings search"
            onChange={(e) => setQuery(e.target.value)}
            label="Search Meetings"
            placeholder="Start typing to search for meetings..."
          />
        </div>
        <div className="col-span-4 md:col-span-2">
          <DateRangePicker
            id="meetings-date-range"
            label="Meeting Dates"
            value={range}
            onChange={setRange}
            placeholder="Upcoming meetings"
            calendarProps={{
              captionLayout: 'dropdown',
              startMonth: subYears(new Date(), 10),
              endMonth: endOfYear(addYears(new Date(), 1)),
            }}
          />
        </div>
      </form>
      <ul className="flex list-none flex-col gap-4 pl-0">
        {loading ? (
          Array.from({ length: limit }).map((_, index) => (
            <Card className="h-full w-full animate-pulse" key={index}>
              <div className="flex h-full flex-col sm:flex-row">
                <div className="bg-msb-base-lightest flex h-auto min-h-full items-center justify-center p-2">
                  <div className="bg-msb-base-light flex aspect-square h-full max-h-24 max-w-24 flex-col items-center justify-center gap-2 rounded-full text-white md:max-h-32 md:max-w-32"></div>
                </div>
                <div className="flex h-full w-full flex-col justify-between gap-4 text-center sm:text-left">
                  <CardHeader>
                    <CardTitle className="text-center sm:text-left">
                      <span className="bg-msb-base-light inline-block h-6 w-full rounded-full"></span>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <span className="bg-msb-base-light mb-2 inline-block h-4 w-full rounded-full"></span>
                  </CardBody>
                  <CardFooter className="justify-end">
                    <div className="bg-msb-base-light w-24 rounded px-5 py-3">
                      <div className="h-2.5"></div>
                    </div>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))
        ) : meetings.length > 0 ? (
          meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))
        ) : (
          <li className="flex w-full items-center justify-center">
            <span className="text-msb-base-dark">
              No meetings found that match your search criteria. Please try
              modifying your search terms.
            </span>
          </li>
        )}
      </ul>
    </>
  );
}
