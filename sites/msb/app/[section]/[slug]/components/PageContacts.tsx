import { Contact } from '@msb/js-sdk';
import { ContactCard } from '../../../../components/ContactCard';

export function PageContacts({
  primaryContact,
  contacts,
}: {
  primaryContact?: Contact | null;
  contacts?: Contact[] | null;
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      {primaryContact && <ContactCard contact={primaryContact} isPrimary />}
      {contacts && (
        <ul className="flex flex-col" style={{ gap: '8px' }}>
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </ul>
      )}
    </section>
  );
}
