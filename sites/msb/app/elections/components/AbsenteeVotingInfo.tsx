import { Link } from '@/components/static/Link';
import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { ProseWrapper } from '@/components/static/ProseWrapper';

export function AbsenteeVotingInfo(props: {}) {
  return (
    <PageBodySection title="Early/Absentee Voting Information">
      <ProseWrapper>
        <p>
          Any registered voter of the Borough may apply for a ballot to be
          mailed to them by submitting an Absentee By-Mail Ballot Application
          not later than seven days prior to Election Day.
        </p>
        <p>
          Please note: The Borough's absentee by-mail application is separate
          from that of the Alaska State Division of Elections and the cities of
          Houston, Palmer, and Wasilla.
        </p>
        <blockquote className="bg-green-100 border-l-green-500 rounded not-italic">
          <h3 className="mt-0">
            Things applicants need to know about the process
          </h3>
          <ul>
            <li>
              Apply early to receive your Borough ballot in a timely manner
            </li>
            <li>Carefully complete ALL sections of the application</li>
            <li>Omissions or errors may cause a delay in ballot mailing</li>
            <li>
              Application MUST contain the applicant's signature; no one else
              may sign for you!
            </li>
          </ul>
        </blockquote>
      </ProseWrapper>
    </PageBodySection>
  );
}
