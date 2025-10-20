import React from 'react';
import Link from 'next/link';
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
    <Surface className="py-2 px-4">
      <Text type="card-header" className="font-semibold">
        {c.name}
      </Text>
      <Text type="subtitle" className="-mt-2">
        {c.title}
      </Text>
      <ul>
        <ul className="flex flex-wrap gap-2 items-center">
          {c.phone && (
            <li>
              <PhoneLink phoneNumber={c.phone} icon />
            </li>
          )}
          {c.email && (
            <li>
              <Link
                href={`mailto:${c.email}`}
                className="flex size-8 rounded-full items-center justify-center bg-primary"
                aria-label={`Email ${c.email}`}
                title={`Email ${c.email}`}
              >
                <span className="icon-[mdi--email] text-white size-5" />
              </Link>
            </li>
          )}
        </ul>
      </ul>
    </Surface>
  );
}
