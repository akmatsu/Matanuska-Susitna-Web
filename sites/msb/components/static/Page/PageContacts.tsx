import { ContactCard } from '@/components/static/ContactCard';
import { PageSection } from './PageSection';
import { PageMerged } from '@msb/js-sdk/types';

export function PageContacts({
  primaryContact,
  contacts,
}: {
  primaryContact?: PageMerged['primaryContact'] | null;
  contacts?: PageMerged['contacts'] | null;
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
