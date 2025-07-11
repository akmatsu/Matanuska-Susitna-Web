import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { gql } from '../../../../../packages/sdk/src/graphql/gql';
import { FragmentType, getFragmentData } from '@msb/js-sdk/gql';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { formatDate, getYear } from '@/utils/datetimehHelpers';
import { Link } from '@/components/static/Link';
import { PhoneLink } from '@/components/static/PhoneLink';

const ElectionVoterInformationFragment = gql(`
  fragment ElectionVoterInformation on Election {    
    voterRegistrationDeadline
    electionDate
  }
`);

export function ElectionVoterInformation(props: {
  data?: FragmentType<typeof ElectionVoterInformationFragment> | null;
}) {
  const data = getFragmentData(ElectionVoterInformationFragment, props.data);

  return (
    <PageBodySection title="Voter Information and Resources">
      <ProseWrapper>
        <p>
          In order for your vote to be counted for any regular Borough election,
          you <span className="font-semibold">must</span> be registered 30-days
          prior to the election. Upgrades to your voter registration also fall
          under this deadline. Please register to vote or update your voter
          information prior to the deadline to be eligible to vote or have your
          vote count.
        </p>

        {data?.electionDate && data?.voterRegistrationDeadline && (
          <p className="font-bold">
            The deadline to qualify to vote in the {getYear(data.electionDate)}{' '}
            Election is {formatDate(data.voterRegistrationDeadline)}.
          </p>
        )}
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
            </li>
            <li>
              has been a resident of the Borough for 30 days immediately
              preceding the election;
            </li>
            <li>
              is registered to vote in State elections at a residence address
              within the Borough at least 30 days before the Borough election at
              which the person seeks to vote; and
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
          Contact the Borough Clerk's office at{' '}
          <PhoneLink phoneNumber="9078618683" /> for more information.
        </p>
      </ProseWrapper>
    </PageBodySection>
  );
}
