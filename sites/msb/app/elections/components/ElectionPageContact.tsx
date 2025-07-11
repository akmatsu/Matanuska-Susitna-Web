import { PageBodySection } from '@/components/static/Page/PageBodySection';
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
    <PageBodySection title="Contact Us">
      <p>
        If you have any questions, please contact the{' '}
        {data?.boroughElectionContact?.name} at:
      </p>
      <ul>
        {data?.boroughElectionContact?.email && (
          <li>Email: {data.boroughElectionContact.email}</li>
        )}
        {data?.boroughElectionContact?.phone && (
          <li>Phone: {data.boroughElectionContact.phone}</li>
        )}
      </ul>
    </PageBodySection>
  );
}
