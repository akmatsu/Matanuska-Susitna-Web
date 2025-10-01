import { PageSection } from '@/components/static/Page';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { EmailLink, PhoneLink } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const ElectionContactFragment = gql(`
  fragment ElectionContact on ElectionsPage {
    boroughElectionContact {
      name
      phone
      email
    }
  }
`);

export function ElectionPageContact(props: {
  data?: FragmentType<typeof ElectionContactFragment> | null;
}) {
  const data = getFragmentData(ElectionContactFragment, props.data);
  return (
    <PageSection title="Contact Us" headerSize="lg">
      <ProseWrapper>
        <p>
          If you have any questions, please contact the{' '}
          {data?.boroughElectionContact?.name} at:
        </p>
        <ul>
          {data?.boroughElectionContact?.email && (
            <li>
              Email: <EmailLink email={data.boroughElectionContact.email} />
            </li>
          )}
          {data?.boroughElectionContact?.phone && (
            <li>
              Phone:{' '}
              <PhoneLink phoneNumber={data.boroughElectionContact.phone} />
            </li>
          )}
        </ul>
      </ProseWrapper>
    </PageSection>
  );
}
