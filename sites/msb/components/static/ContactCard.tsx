import React from 'react';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PhoneLink } from './PhoneLink';
import { Text } from '@matsugov/ui/Text';
import type { Contact, ExternalLink } from '@msb/cms-sdk';

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

/** The contact fields the card shows. Shaped like the CMS REST API's Contact. */
export type ContactCardData = Pick<
  Contact,
  'name' | 'title' | 'phone' | 'email' | 'fax'
> & {
  website?: Pick<ExternalLink, 'label' | 'url' | 'title'> | null;
};

export function ContactCardView({
  contact: c,
}: {
  contact: ContactCardData;
  isPrimary?: boolean;
}) {
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
              <PhoneLink phoneNumber={c.phone} className="truncate" />
            </li>
          )}
          {c.email && (
            <li className="flex gap-1 items-center">
              <div className="inline-flex items-center justify-center bg-primary p-1 rounded-full">
                <span className="icon-[mdi--email] text-white size-4" />
              </div>
              <Link href={`mailto:${c.email}`} className="truncate">
                {c.email}
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
          {c.website?.url && (
            <li className="flex gap-1 items-center">
              <div className="inline-flex items-center justify-center bg-primary p-1 rounded-full">
                <span className="icon-[mdi--web] text-white size-4" />
              </div>
              <Link href={c.website.url}>
                {c.website.label || c.website.title || c.website.url}
              </Link>
            </li>
          )}
        </ul>
      </CardBody>
    </Card>
  );
}

/** Maps the Keystone GraphQL contact fragment to the card's data shape. */
export function toContactCardData(
  contact: FragmentType<typeof ContactFields>,
): ContactCardData {
  const c = getFragmentData(ContactFields, contact);
  return {
    name: c.name ?? '',
    title: c.title ?? null,
    phone: c.phone ?? null,
    email: c.email ?? null,
    fax: c.fax ?? null,
    website: c.website
      ? {
          label: c.website.label ?? '',
          url: c.website.url?.url ?? null,
          title: c.website.url?.title ?? null,
        }
      : null,
  };
}

export function ContactCard({
  contact,
  isPrimary,
}: {
  contact: FragmentType<typeof ContactFields>;
  isPrimary?: boolean;
}) {
  return (
    <ContactCardView
      contact={toContactCardData(contact)}
      isPrimary={isPrimary}
    />
  );
}
