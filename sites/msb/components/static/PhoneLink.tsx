import { ComponentProps } from 'react';
import { PhoneLink as UIPhoneLink } from '@matsugov/ui/PhoneLink';
import { Link } from './Link';

export function PhoneLink({
  phoneNumber,
  ...props
}: { phoneNumber?: string | null } & Omit<
  ComponentProps<typeof UIPhoneLink>,
  'as'
>) {
  if (!phoneNumber) {
    return null;
  }
  return <UIPhoneLink as={Link} phoneNumber={phoneNumber} {...props} />;
}
