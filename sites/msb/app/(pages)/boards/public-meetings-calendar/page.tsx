import { Link } from '@/components/static/Link';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';

export default function PublicMeetingsCalendar() {
  // Google Calendar environment variables (from .env)
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

  const baseUrl =
    'https://www.google.com/calendar/embed?showTitle=0&mode=MONTH&height=650&wkst=1&bgcolor=%23FFFFFF&color=%238D6F47&ctz=America%2FAnchorage';
  const srcParams = calendarSrcs
    .filter((cal) => typeof cal.src === 'string' && cal.src.length > 0)
    .map(
      (cal) =>
        `&src=${encodeURIComponent(cal.src ?? '')}&color=%23${cal.color}`,
    )
    .join('');
  const iframeSrc = `${baseUrl}${srcParams}`;

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
          className="w-full h-[650px] border-0"
          title="Public Meetings Calendar"
        />
      </ProseWrapper>
    </PageContainer>
  );
}
