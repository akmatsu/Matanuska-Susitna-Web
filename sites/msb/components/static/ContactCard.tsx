import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardTitle } from '@matsugov/ui/Card';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PhoneLink } from './PhoneLink';

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
    <Card>
      <CardHeader>
        <CardTitle>
          {c.name}
          {isPrimary && (
            <>
              {' '}
              <span className="text-sm font-semibold text-primary-dark italic">
                Primary Contact
              </span>
            </>
          )}
        </CardTitle>
        <p className="text-sm text-base mt-0.5">{c.title}</p>
      </CardHeader>
      <CardBody>
        <ul>
          {c.phone && (
            <li>
              <PhoneLink phoneNumber={c.phone} />
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
