import { ContactCard } from '@/components/static/ContactCard';
import { PageSection } from './PageSection';
import { ContactFieldsFragment } from '@msb/js-sdk/graphql';

export function PageContacts({
  primaryContact,
  contacts,
}: {
  primaryContact?: ContactFieldsFragment | null;
  contacts?: ContactFieldsFragment[] | null;
}) {
  if (primaryContact || !!contacts?.length)
    return (
      <PageSection title="Contacts">
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
