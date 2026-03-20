import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui';
import { PageSection } from './Page';
import Link from 'next/link';
import Image from 'next/image';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PhoneLink } from './PhoneLink';
import { DateTime } from '../client/DateTime';

const AssemblyMemberInfoFragment = gql(`
  fragment AssemblyMemberInfo on AssemblyDistrict {
    title
    memberName
    phone
    email
    bio
    photo {
      file {
        url
      }
    }
    termStart
    termEnd
  }
`);

export function AssemblyMemberInfo(props: {
  page: FragmentType<typeof AssemblyMemberInfoFragment>;
}) {
  const page = getFragmentData(AssemblyMemberInfoFragment, props.page);
  return (
    <PageSection title="Assembly Member">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>{page.memberName}</CardTitle>
            {page.photo?.file?.url && (
              <Image
                src={page.photo.file.url}
                className="size-20 rounded-full"
                alt={page.memberName || `Assembly Member of ${page.title}`}
                width={80}
                height={80}
              />
            )}
          </div>
        </CardHeader>
        <CardBody>
          <p>{page.bio}</p>
          <p>{page.phone && <PhoneLink phoneNumber={page.phone} />}</p>
          <Link href={`mailto:${page.email}`}>{page.email}</Link>
          <p>
            <span className="font-semibold">Term</span>:{' '}
            <DateTime date={page.termStart} formatStr="MMM yyyy" /> -{' '}
            <DateTime date={page.termEnd} formatStr="MMM yyyy" />
          </p>
        </CardBody>
      </Card>
    </PageSection>
  );
}
