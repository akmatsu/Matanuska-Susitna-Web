import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardTitle } from '@matsugov/ui/Card';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

export const ContactFields = gql(`
  fragment ContactFields on Contact {
    id
    name
    phone
    email
    title
  }
`);

export function ContactCard({
  contact,
  isPrimary,
}: {
  contact: FragmentType<typeof ContactFields>;
  isPrimary?: boolean;
}) {
  const c = getFragmentData(ContactFields, contact);
  const headerText = isPrimary ? 'Primary Contact' : 'Secondary Contact';
  return (
    <Card>
      <CardHeader>
        <CardTitle>{headerText}</CardTitle>
      </CardHeader>
      <CardBody>
        <p>
          <span>{c.name}</span>
        </p>
        <ul>
          {c.phone && (
            <li>
              <Link href={`tel:${c.phone}`}>{c.phone}</Link>
            </li>
          )}
          {c.email && (
            <li>
              <Link href={`mailto:${c.email}`}>{c.email}</Link>
            </li>
          )}
        </ul>
      </CardBody>
    </Card>
  );
}
