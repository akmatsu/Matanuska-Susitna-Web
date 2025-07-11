import { ContactCard } from '@/components/static/ContactCard';
import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const contactListFragment = gql(`
  fragment ContactList on Contact {
    id,
    ...ContactFields
  }
`);

export function PageContacts(props: {
  primaryContact?: FragmentType<typeof contactListFragment> | null;
  contacts?: FragmentType<typeof contactListFragment>[] | null;
}) {
  const primaryContact = getFragmentData(
    contactListFragment,
    props.primaryContact,
  );
  const contacts = getFragmentData(contactListFragment, props.contacts);
  if (primaryContact || !!contacts?.length)
    return (
      <PageSection title="Contacts" noMargins>
        {primaryContact && <ContactCard contact={primaryContact} isPrimary />}
        {contacts && (
          <ul className="flex flex-col" style={{ gap: '8px' }}>
            {contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </ul>
        )}
      </PageSection>
    );
}
