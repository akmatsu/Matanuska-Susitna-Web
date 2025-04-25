import { Contact } from '@msb/js-sdk';
import { ContactCard } from '../../../../components/ContactCard';
import { PageSection } from './PageSection';

export function PageContacts({
  primaryContact,
  contacts,
}: {
  primaryContact?: Contact | null;
  contacts?: Contact[] | null;
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
