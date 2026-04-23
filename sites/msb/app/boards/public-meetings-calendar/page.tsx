import { Link } from '@/components/static/Link';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';

export default function PublicMeetingsCalendar() {
  // Pull calendar IDs from env so the embed can combine multiple calendars.
  const calendarSrcs = [
    {
      src: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_MAIN_ID,
      color: '8D6F47', // default color for main calendar
    },
    {
      src: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ASSEMBLY_ID,
      color: '23333333', // default color for assembly calendar
    },
    {
      src: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_PLANNING_ID,
      color: '5229A3', // default color for planning calendar
    },
    {
      src: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_COMMUNITY_ID,
      color: '28754E', // default color for community calendar
    },
  ];

  // Start with the base embed URL and set fixed view options via query params.
  const calendarUrl = new URL('https://www.google.com/calendar/embed');
  const baseParams = [
    ['showTitle', '0'],
    ['mode', 'AGENDA'],
    ['height', '650'],
    ['wkst', '1'],
    ['bgcolor', '#FFFFFF'],
    ['color', '#8D6F47'],
    ['ctz', 'America/Anchorage'],
    ['showTabs', '0'],
    ['showPrint', '0'],
  ];

  // Only keep calendars that have an ID, and ensure colors are properly formatted.
  const calendarParams = calendarSrcs
    .filter((cal): cal is { src: string; color: string } => !!cal.src)
    .flatMap((cal) => [
      ['src', cal.src],
      ['color', `#${cal.color.replace(/^#/, '')}`],
    ]);

  // Build the full query string once so the URL is encoded safely.
  const params = new URLSearchParams([...baseParams, ...calendarParams]);
  calendarUrl.search = params.toString();

  // Final iframe URL for the embed.
  const iframeSrc = calendarUrl.toString();

  return (
    <PageContainer size="sm">
      <ProseWrapper>
        <h1>Public Meetings Calendar</h1>
        <p>
          Prefer to look at a searchable list?{' '}
          <Link href="/boards/public-meetings">
            View our public meetings list
          </Link>
        </p>
        <iframe
          src={iframeSrc}
          className="h-[650px] w-full border-0"
          title="Public Meetings Calendar"
        />
      </ProseWrapper>
    </PageContainer>
  );
}
