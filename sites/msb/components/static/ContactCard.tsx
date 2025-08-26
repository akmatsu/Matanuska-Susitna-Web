import React from 'react';
import Link from 'next/link';
import { Card, CardTitle } from '@matsugov/ui/Card';
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
      <div>
        <div className="bg-primary-dark p-4">
          <CardTitle className="text-white">
            {c.name}
            {isPrimary && (
              <>
                {' '}
                <span className="text-sm font-semibold text-base-lighter italic">
                  Primary Contact
                </span>
              </>
            )}
          </CardTitle>
        </div>
        <div className="p-4">
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
        </div>
      </div>
    </Card>
  );
}
