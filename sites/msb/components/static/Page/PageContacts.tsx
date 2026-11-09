import {
  ContactCardView,
  toContactCardData,
  type ContactCardData,
} from '@/components/static/ContactCard';
import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const contactListFragment = gql(`
  fragment ContactList on Contact {
    id,
    ...ContactFields
  }
`);

export type ContactListData = ContactCardData & { id: string };

export function PageContactsView(props: {
  primaryContact?: ContactListData | null;
  contacts?: ContactListData[] | null;
  className?: string;
}) {
  const { primaryContact, contacts } = props;
  if (primaryContact || !!contacts?.length)
    return (
      <PageSection title="Contact" className={props.className}>
        <ul className="flex flex-col gap-4 mb-4">
          {primaryContact && (
            <ContactCardView contact={primaryContact} isPrimary />
          )}
          {contacts &&
            contacts.map((contact) => (
              <ContactCardView key={contact.id} contact={contact} />
            ))}
        </ul>
      </PageSection>
    );
}

type ContactListRef = FragmentType<typeof contactListFragment>;

/** Maps the Keystone GraphQL contact list fragment to view data. */
export function toContactListData(ref: ContactListRef): ContactListData {
  const contact = getFragmentData(contactListFragment, ref);
  return { id: contact.id, ...toContactCardData(contact) };
}

export function PageContacts(props: {
  primaryContact?: ContactListRef | null;
  contacts?: ContactListRef[] | null;
  className?: string;
}) {
  return (
    <PageContactsView
      primaryContact={
        props.primaryContact ? toContactListData(props.primaryContact) : null
      }
      contacts={props.contacts?.map(toContactListData) ?? null}
      className={props.className}
    />
  );
}
