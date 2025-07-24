import { ComponentProps } from 'react';
import { AddressLink as UIAddressLink } from '@matsugov/ui/AddressLink';
import { ClientLink } from './ClientLink';

export function AddressLink({
  address,
  ...props
}: Omit<ComponentProps<typeof UIAddressLink>, 'address' | 'as'> & {
  address: string | null | undefined;
}) {
  if (!address) {
    return null;
  }

  return <UIAddressLink as={ClientLink} {...props} address={address} />;
}
