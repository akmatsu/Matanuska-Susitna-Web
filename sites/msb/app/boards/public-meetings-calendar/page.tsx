import { Link } from '@/components/static/Link';
import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';

export default function PublicMeetingsCalendar() {
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
          src="https://www.google.com/calendar/embed?showTitle=0&mode=MONTH&height=650&wkst=1&bgcolor=%23FFFFFF&color=%238D6F47&ctz=America%2FAnchorage&
src=clerk%40matsugov.net&color=23333333&
src=matsugov.net_ovu1nmb4chppv20t71o0ihdbm8%40group.calendar.google.com&color=%236B3304&src=matsugov.net_657jgel3jsj90ktoc3upv1nl8g%40group.calendar.google.com&color=%23853104&src=matsugov.net_uc0iae00jdhsckigicilq7o59k%40group.calendar.google.com&color=%238D6F47&src=matsugov.net_l667h3678fe88nknu4ebmjjuf8%40group.calendar.google.com&color=%2328754E&
src=publicaffairs%40matsugov.net&color=%235F6B02&
src=matsugov.net_qa8ttdh9oppcalp31g4ad7gv5s%40group.calendar.google.com&color=%235229A3"
          className="w-full h-[650px] border-0"
          title="Public Meetings Calendar"
        />
      </ProseWrapper>
    </PageContainer>
  );
}
