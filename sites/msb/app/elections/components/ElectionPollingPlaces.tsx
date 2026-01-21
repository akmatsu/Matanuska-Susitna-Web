import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { Link } from '@/components/static/Link';
import { LinkButton } from '@/components/static/LinkButton';
// import { LinkButton } from '@/components/static/LinkButton';
import { PageSection } from '@/components/static/Page';
import { ActionButton } from '@/components/static/Page/ActionButton';
import { PhoneLink } from '@/components/static/PhoneLink';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionPollingPlacesFragment = gql(`
  fragment ElectionPollingPlaces on ElectionsPage {
    pollingPlacesLink {
      ... ActionFields
    }
    pollingPlaceBody
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
    <PageSection title="Polling Places & Precincts" headerSize="lg">
      <ProseWrapper>
        {data?.pollingPlaceBody ? (
          <MarkdownRenderer>{data.pollingPlaceBody}</MarkdownRenderer>
        ) : (
          <>
            <p>
              The precincts and polling places for the Matanuska-Susitna Borough
              are on the Polling Places & Precincts Page. If you don&apos;t know
              your assigned polling place, you may find it online by using the{' '}
              <Link href="https://www.elections.alaska.gov/election-polls/">
                Alaska State Division of Elections Online Polling Place Locator
              </Link>
              , or contact the Alaska State Division of Elections at{' '}
              <PhoneLink phoneNumber={data?.stateElectionContact?.phone} />{' '}
              (toll free), or the Borough Clerk&apos;s Office at{' '}
              <PhoneLink phoneNumber={data?.boroughElectionContact?.phone} />.
            </p>
          </>
        )}
        {data?.pollingPlacesLink ? (
          <ActionButton
            action={data?.pollingPlacesLink}
            className="not-prose"
            block={false}
          />
        ) : (
          <LinkButton
            href="https://matsugov.us/maps/polling-places-and-precincts"
            className="not-prose"
            color="primary"
          >
            View Polling Places & Precincts
          </LinkButton>
        )}
      </ProseWrapper>
    </PageSection>
  );
}
