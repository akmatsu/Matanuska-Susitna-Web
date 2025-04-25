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
