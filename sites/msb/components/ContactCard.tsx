import React from 'react';
import { Card, CardBody, CardHeader } from '@trussworks/react-uswds';
import Link from 'next/link';

export function ContactCard({
  contact,
  isPrimary,
}: {
  contact: {
    phone?: string;
    name: string;
    id: string;
    email?: string;
  };
  isPrimary?: boolean;
}) {
  const headerText = isPrimary ? 'Primary Contact' : 'Secondary Contact';
  return (
    <Card>
      <CardHeader>
        <h4>{headerText}</h4>
      </CardHeader>
      <CardBody>
        <p>
          <span>{contact.name}</span>
        </p>
        <ul>
          {contact.phone && (
            <li>
              <Link href={`tel:${contact.phone}`}>{contact.phone}</Link>
            </li>
          )}
          {contact.email && (
            <li>
              <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
            </li>
          )}
        </ul>
      </CardBody>
    </Card>
  );
}
