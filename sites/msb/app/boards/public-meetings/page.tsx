import { PageContainer } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { Link } from '@/components/static/Link';
import { MeetingsSearch } from './components/MeetingsSearch';

export default function PublicMeetingsPage() {
  return (
    <PageContainer size="sm">
      <ProseWrapper>
        <h1>Public Meetings</h1>
        <p>
          Prefer to look at a calendar?{' '}
          <Link href="/boards/public-meetings-calendar">
            View our public calendar
          </Link>
        </p>
      </ProseWrapper>
      <div className="my-4">
        <MeetingsSearch />
      </div>
      <p>
        Can't find what you're looking for? <Link href="#">Return to top</Link>{' '}
        and try using the search bar.
      </p>
    </PageContainer>
  );
}
