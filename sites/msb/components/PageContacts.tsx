import { Contact } from '@msb/js-sdk';
import { ContactCard } from './ContactCard';

export function PageContacts({
  primaryContact,
  contacts,
}: {
  primaryContact?: Contact | null;
  contacts?: Contact[] | null;
}) {
  return (
    <>
      {primaryContact && <ContactCard contact={primaryContact} isPrimary />}
      {contacts && (
        <ul className="flex flex-col" style={{ gap: '8px' }}>
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
    </>
  );
}
