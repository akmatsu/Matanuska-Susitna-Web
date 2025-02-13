import { list, ListConfig } from '@keystone-6/core';
import {
  contacts,
  liveUrl,
  owner,
  services,
  slug,
  tags,
  timestamps,
  titleAndDescription,
} from '../fieldUtils';
import { generalItemAccess, generalOperationAccess } from '../access';
import { checkbox, relationship } from '@keystone-6/core/fields';
import { blueHarvestImage } from '../../components/customFields/blueHarvestImage';

export const OrgUnit: ListConfig<any> = list({
  access: {
    operation: generalOperationAccess,
    item: generalItemAccess,
  },
  fields: {
    heroImage: blueHarvestImage(),
    ...titleAndDescription(),
    liveUrl: liveUrl('departments'),
    slug,
    owner,
    showPage: checkbox({
      defaultValue: true,
      ui: { itemView: { fieldPosition: 'sidebar' } },
    }),
    tags: tags('orgUnits'),
    contacts: contacts('orgUnits'),
    services: services('orgUnits'),
    children: relationship({ ref: 'OrgUnit.parent', many: true }),
    parent: relationship({ ref: 'OrgUnit.children', many: false }),
    ...timestamps,
  },
});
