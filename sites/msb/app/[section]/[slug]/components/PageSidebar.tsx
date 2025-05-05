import { PageConfig, PageMerged, TrailItem } from '@msb/js-sdk';
import { PageMap } from './PageMap';
import { PageActions } from './PageActions';
import { PageDocuments } from './PageDocuments';
import { PageAddress } from './PageAddress';
import { PageHours } from './PageHours';
import { PageContacts } from './PageContacts';
import { PageTrailInfo } from './PageTrailInfo';
import { PageListItems } from './PageListItems';
import { PageDistricts } from './PageDistricts';
import { PageParentOrgUnit } from './PageParentOrgUnit';
import { PageChildrenOrgUnits } from './PageChildrenOrgUnits';
import { PageSection } from './PageSection';
import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui';
import Link from 'next/link';

export function PageSidebar({
  page,
  config,
  listName,
}: {
  page: PageMerged;
  config: PageConfig;
  listName: string;
}) {
  return (
    <>
      <PageMap {...config.map} itemId={page.title} />

      {page.primaryAction && <PageActions primaryAction={page.primaryAction} />}
      {page.memberName && (
        <PageSection title="Assembly Member">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle>{page.memberName}</CardTitle>
                {page.photo && (
                  <img
                    src={page.photo?.file.url}
                    className="rounded-full size-20"
                  />
                )}
              </div>
            </CardHeader>
            <CardBody>
              <p>{page.bio}</p>
              <Link href={`tel${page.phone}`}>{page.phone}</Link>
              <Link href={`mailto:${page.email}`}>{page.email}</Link>
            </CardBody>
          </Card>
        </PageSection>
      )}

      <PageDocuments documents={page.documents} />

      <PageAddress address={page.address} />
      <PageHours hours={page.hours} />

      <PageContacts
        primaryContact={page.primaryContact}
        contacts={page.contacts}
      />

      {listName === 'trail' && <PageTrailInfo trail={page as TrailItem} />}
      <PageListItems title="Trails" items={page.trails} />

      <PageListItems title="Facilities" items={page.facilities} />
      <PageDistricts items={page.districts} />
      <PageParentOrgUnit item={page.parent} />
      <PageChildrenOrgUnits items={page.children} />
    </>
  );
}
