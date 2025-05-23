import { GetOrgUnitQuery } from '@msb/js-sdk/graphql';

export function ContactsList({
  contacts,
}: {
  contacts: NonNullable<GetOrgUnitQuery['orgUnit']>['contacts'];
}) {
  return (
    <ul className="flex flex-col gap-4">
      {contacts?.map((contact) => (
        <li key={contact.id}>
          <div className="flex items-center gap-2">
            <h3 className="font-bold">{contact.name}</h3> |
            <p>{contact.title}</p>
          </div>
          <p>
            {contact.email && (
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            )}
            {contact.email && contact.phone && ' | '}
            {contact.phone && (
              <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
