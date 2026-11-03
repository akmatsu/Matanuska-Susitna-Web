import { ParcelDetails } from '@/app/(backend)/api/v1/parcels/mockParcels';
import { propertyApiCall } from '@msb/property-sdk';
import { Metadata } from 'next';
import { PropertyAccessMoved } from '@/components/PropertyAccessMoved';
import { propertyAccessUrl } from '@/utils/propertyAccess';

export const metadata: Metadata = {
  title: 'MyProperty - Parcel Details',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MyParcelDetailPage(
  props: PageProps<'/parcels/[pid]'>,
) {
  const { pid } = await props.params;

  const { data } = await propertyApiCall<{ data: ParcelDetails }>(
    `/detail/${encodeURIComponent(pid)}`,
  );

  // Property Access identifies parcels by PARID, which is the tax ID without its first character.
  const parId = data.TAX_ID;

  return (
    <PropertyAccessMoved
      href={parId ? propertyAccessUrl('datalet', parId) : undefined}
    />
  );
}
