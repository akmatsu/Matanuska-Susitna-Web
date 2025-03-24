import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardTitle } from '@matsugov/ui';
import { Contact } from '@msb/js-sdk';

export function ContactCard({
  contact,
  isPrimary,
}: {
  contact: Contact;
  isPrimary?: boolean;
}) {
  const headerText = isPrimary ? 'Primary Contact' : 'Secondary Contact';
  return (
    <Card>
      <CardHeader>
        <CardTitle>{headerText}</CardTitle>
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
