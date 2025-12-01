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
    fax
    website {
      url {
        url
        title
      }
      label
    }
  }
`);

export function ContactCard({
  contact,
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
          {c.fax && (
            <li className="flex gap-1 items-center">
              <div className="inline-flex items-center justify-center bg-primary p-1 rounded-full">
                <span className="icon-[mdi--fax] text-white size-4" />
              </div>
              <PhoneLink phoneNumber={c.fax} />
            </li>
          )}
          {c.website && c.website.url?.url && (
            <li className="flex gap-1 items-center">
              <div className="inline-flex items-center justify-center bg-primary p-1 rounded-full">
                <span className="icon-[mdi--web] text-white size-4" />
              </div>
              <Link href={c.website.url.url}>
                {c.website.label || c.website.url.title || c.website.url.url}
              </Link>
            </li>
          )}
        </ul>
      </ul>
    </Surface>
  );
}
