import React from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PhoneLink } from './PhoneLink';
import { Surface } from './Surface';
import { Text } from '@matsugov/ui/Text';

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
  return (
    <Surface className="p-4">
      <Text type="card-header">{c.name}</Text>
      <Text type="subtitle" className="-mt-2">
        {c.title}
      </Text>
      <ul>
        <ul>
          {c.phone && (
            <li className="truncate">
              <PhoneLink phoneNumber={c.phone} />
            </li>
          )}
          {c.email && (
            <li className="truncate">
              <Link href={`mailto:${c.email}`} className="truncate">
                {c.email}
              </Link>
            </li>
          )}
        </ul>
      </ul>
    </Surface>
  );
}
