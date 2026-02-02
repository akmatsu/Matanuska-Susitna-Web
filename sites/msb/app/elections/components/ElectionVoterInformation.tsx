import { gql } from '../../../../../packages/sdk/src/graphql/gql';
import { FragmentType, getFragmentData } from '@msb/js-sdk/gql';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { Link } from '@/components/static/Link';
import { PhoneLink } from '@/components/static/PhoneLink';
import { DateTime } from '@/components/client/DateTime';
import { PageSection } from '@/components/static/Page';
import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';

const ElectionVoterInformationFragment = gql(`
  fragment ElectionVoterInformation on Election {    
    voterRegistrationDeadline
    electionDate
    voterInfoBody
  }
`);

export function ElectionVoterInformation(props: {
  data?: FragmentType<typeof ElectionVoterInformationFragment> | null;
}) {
  const data = getFragmentData(ElectionVoterInformationFragment, props.data);

  return (
    <PageSection title="Voter Information and Resources" headerSize="lg">
      <ProseWrapper>
        {data?.voterInfoBody ? (
          <MarkdownRenderer>{data.voterInfoBody}</MarkdownRenderer>
        ) : (
          <>
            <p>
              You <strong>must</strong> be registered to vote in the Borough
              30-days prior to an election. Updates to your voter registration
              also fall under this deadline. Please register to vote or update
              your voter information prior to the deadline to be eligible to
              vote.
            </p>

            {data?.electionDate && data?.voterRegistrationDeadline && (
              <p className="font-bold">
                The deadline to qualify to vote in the{' '}
                <DateTime date={data.electionDate} formatStr="yyyy" /> Election
                is{' '}
                <DateTime
                  date={data.voterRegistrationDeadline}
                  formatStr="PPP"
                />
                .
              </p>
            )}
            <p>
              You can update or register to vote online or print a Voter
              Registration Application from the Alaska State Division of
              Elections at{' '}
              <a href="https://www.elections.alaska.gov">
                www.elections.alaska.gov
              </a>{' '}
              or you may register to vote at Alaska State Division of Elections
              office or the Borough Clerk&apos;s office. Voter registration
              applications are also available at the City Clerk&apos;s Offices
              in Houston, Palmer, and Wasilla.
            </p>
            <blockquote className="bg-green-100 border-l-green-500 rounded not-italic">
              <h3 className="mt-0">Voter Qualifications</h3>
              <p className="before:content-none after:content-none">
                A person may vote in a Borough election only if the person:
              </p>
              <ul>
                <li>
                  is qualified to vote under{' '}
                  <Link href="https://www.akleg.gov/basis/statutes.asp#15.05.010">
                    AS 15.05.010
                  </Link>
                  ;
                </li>
                <li>
                  has been a resident of the Borough for 30 days immediately
                  preceding the election;
                </li>
                <li>
                  is registered to vote in State elections at a residence
                  address within the Borough at least 30 days before the Borough
                  election at which the person seeks to vote; and
                </li>
                <li>
                  is not disqualified under{' '}
                  <Link href="https://ltgov.alaska.gov/information/alaskas-constitution/">
                    Article V of the State Constitution.
                  </Link>
                </li>
              </ul>
            </blockquote>
            <p>
              Contact the Borough Clerk&apos;s office at{' '}
              <PhoneLink phoneNumber="9078618683" /> for more information.
            </p>
          </>
        )}
      </ProseWrapper>
    </PageSection>
  );
}
