import { MarkdownRenderer } from '@/components/server/MarkdownRenderer';
import { DocumentLinkButton } from '@/components/static/DocumentLink';
import { PageSection } from '@/components/static/Page';
import { PhoneLink } from '@/components/static/PhoneLink';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionOfficialsInfoFragment = gql(`
  fragment ElectionsOfficialsInfo on Election {
    electionOfficialApplicationDeadline
    electionOfficialBody
    electionOfficialApplication {
      ...DocumentLink
    }
  }
`);

const ElectionOfficialContactFragment = gql(`
  fragment ElectionOfficialContact on ElectionsPage {
    boroughElectionContact {
      name
      email
      phone
    }
  }
`);

export function ElectionOfficialsInfo(props: {
  data?: FragmentType<typeof ElectionOfficialsInfoFragment> | null;
  contactData?: FragmentType<typeof ElectionOfficialContactFragment> | null;
}) {
  const data = getFragmentData(ElectionOfficialsInfoFragment, props.data);
  const contactData = getFragmentData(
    ElectionOfficialContactFragment,
    props.contactData,
  );

  const isAfterDeadline = data?.electionOfficialApplicationDeadline
    ? new Date() > new Date(data.electionOfficialApplicationDeadline)
    : false;

  if (isAfterDeadline) {
    return null;
  }

  return (
    <PageSection title="Elections Officials Wanted" headerSize="lg">
      <ProseWrapper>
        {data?.electionOfficialBody ? (
          <MarkdownRenderer>{data.electionOfficialBody}</MarkdownRenderer>
        ) : (
          <>
            <p className="font-bold">
              Are you interested in serving as an Election Official for the next
              Borough Election?
            </p>

            <DocumentLinkButton
              data={data?.electionOfficialApplication}
              color="primary"
              className="not-prose"
            />

            <p>
              The Borough Clerk&apos;s Office is always looking for dependable
              workers for our elections. If you are interested in applying to
              serve as an election worker for the upcoming election, please
              apply with the Borough Clerk&apos;s Office. You may print out the
              application from the link above.
            </p>
            <p>
              Applications are also available by contacting the{' '}
              {contactData?.boroughElectionContact?.name} at{' '}
              <PhoneLink
                phoneNumber={contactData?.boroughElectionContact?.phone}
              />
              . In order to serve, you must be a registered voter of the
              Borough. Training and compensation are provided.
            </p>
          </>
        )}
      </ProseWrapper>
    </PageSection>
  );
}
