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
import { TextField } from '@matsugov/ui/TextField';
import { format } from 'date-fns';
import { useState } from 'react';

export function MeetingsSearch() {
  const [meetings, setMeetings] = useState<CalendarMeeting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(25);
  const [timeMin, setTimeMin] = useState<string>(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [timeMax, setTimeMax] = useState<string>('');

  async function getMeetings(query: string) {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        query,
        timeMin,
        timeMax,
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
  }

  useDebounce(() => getMeetings(query), 500, [query, timeMin, timeMax, limit]);

  return (
    <>
      <form className="grid grid-cols-4 gap-4 mb-4">
        <div className="col-span-4 md:col-span-2">
          <TextField
            id="meetings search"
            onChange={(e) => setQuery(e.target.value)}
            label="Search Meetings"
            placeholder="Start typing to search for meetings..."
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <TextField
            id="min-start"
            type="date"
            value={timeMin}
            onChange={(e) => setTimeMin(e.target.value)}
            label="Min Date"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <TextField
            id="max-start"
            type="date"
            onChange={(e) => setTimeMax(e.target.value)}
            label="Max Date"
          />
        </div>
      </form>
      <ul className="grid grid-cols-1 gap-4 list-none pl-0">
        {loading ? (
          Array.from({ length: limit }).map((_, index) => (
            <Card className="animate-pulse h-full" key={index}>
              <div className="flex flex-col sm:flex-row h-full">
                <div className="bg-base-lightest p-2 flex justify-center items-center h-full">
                  <div className="bg-base-light aspect-square h-full max-h-24 max-w-24 md:max-h-32 md:max-w-32 flex flex-col justify-center items-center text-white gap-2 rounded-full"></div>
                </div>
                <div className="flex flex-col justify-between gap-4 w-full text-center sm:text-left h-full">
                  <CardHeader>
                    <CardTitle className="text-center sm:text-left">
                      <span className="inline-block w-full bg-base-light h-6 rounded-full"></span>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <span className="inline-block w-full bg-base-light h-4 rounded-full mb-2"></span>
                  </CardBody>
                  <CardFooter className="justify-end">
                    <div className="bg-base-light rounded px-5 py-3 w-24">
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
          <li className="w-full flex justify-center items-center">
            <span className="text-base-dark">
              No meetings found that match your search criteria. Please try
              modifying your search terms.
            </span>
          </li>
        )}
      </ul>
    </>
  );
}
