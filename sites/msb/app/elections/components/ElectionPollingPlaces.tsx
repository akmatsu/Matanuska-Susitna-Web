import { Link } from '@/components/static/Link';
import { LinkButton } from '@/components/static/LinkButton';
import { PageBodySection } from '@/components/static/Page/PageBodySection';
import { PhoneLink } from '@/components/static/PhoneLink';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionPollingPlacesFragment = gql(`
  fragment ElectionPollingPlaces on ElectionsPage {
    stateElectionContact {
      title
      phone
    }
    
    boroughElectionContact {
      title
      phone
    }
  }
`);

export function ElectionPollingPlaces(props: {
  data?: FragmentType<typeof ElectionPollingPlacesFragment> | null;
}) {
  const data = getFragmentData(ElectionPollingPlacesFragment, props.data);

  return (
    <PageBodySection title="Polling Places & Precincts">
      <ProseWrapper>
        <p>
          The precincts and polling places for the Matanuska-Susitna Borough are
          on the Polling Places & Precincts Page. If you don&apos;t know your
          assigned polling place, you may find it online by using the{' '}
          <Link href="https://www.elections.alaska.gov/election-polls/">
            Alaska State Division of Elections Online Polling Place Locator
          </Link>
          , or contact the Alaska State Division of Elections at{' '}
          <PhoneLink phoneNumber={data?.stateElectionContact?.phone} /> (toll
          free), or the Borough Clerk&apos;s Office at{' '}
          <PhoneLink phoneNumber={data?.boroughElectionContact?.phone} />.
        </p>
        <LinkButton
          href="https://matsugov.us/maps/polling-places-and-precincts"
          className="not-prose"
          color="primary"
        >
          View Polling Places & Precincts
        </LinkButton>
      </ProseWrapper>
    </PageBodySection>
  );
}
