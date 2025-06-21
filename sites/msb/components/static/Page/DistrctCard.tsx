import { CardBody, CardHeader, CardTitle, LinkCard } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import Image from 'next/image';

const DistrictDetailFields = gql(`
  fragment DistrictDetailFields on AssemblyDistrict {
    id
    title
    slug
    description
    memberName
    photo {
      file {
        url
      }
    }
  }
`);

export function DistrictCard(props: {
  district: FragmentType<typeof DistrictDetailFields>;
}) {
  const district = getFragmentData(DistrictDetailFields, props.district);
  return (
    <LinkCard as="li" className="my-2" href={`/districts/${district.slug}`}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>{district.title}</CardTitle>
          </CardHeader>
          <CardBody>
            <div>
              <p>{district.description}</p>
            </div>
          </CardBody>
        </div>
        <div className="pr-6 relative">
          {district.photo?.file?.url && (
            <Image
              src={district.photo.file.url}
              alt={`${district.title} assembly member photo`}
              className="rounded-full size-20"
              width={80}
              height={80}
            />
          )}
        </div>
      </div>
    </LinkCard>
  );
}
