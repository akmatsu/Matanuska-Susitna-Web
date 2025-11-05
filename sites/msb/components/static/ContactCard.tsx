import React from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PhoneLink } from './PhoneLink';
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
    <Card>
      <CardHeader>
        <CardTitle>{c.name}</CardTitle>
        {c.title && <Text type="subtitle">{c.title}</Text>}
      </CardHeader>
      <CardBody>
        <ul className="space-y-1">
          {c.phone && (
            <li className="flex gap-1 items-center">
              <div className="inline-flex items-center justify-center bg-primary p-1 rounded-full">
                <span className="icon-[mdi--phone] text-white size-4" />{' '}
              </div>
              <PhoneLink phoneNumber={c.phone} />
            </li>
          )}
          {c.email && (
            <li className="flex gap-1 items-center">
              <div className="inline-flex items-center justify-center bg-primary p-1 rounded-full">
                <span className="icon-[mdi--email] text-white size-4" />
              </div>
              <Link href={`mailto:${c.email}`}>{c.email}</Link>
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
      </CardBody>
    </Card>
  );
}
