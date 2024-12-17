import { list, ListConfig } from '@keystone-6/core';
import {
  filterByPubDates,
  generalItemAccess,
  generalOperationAccess,
} from '../access';
import {
  contacts,
  liveUrl,
  owner,
  publishable,
  services,
  slug,
  tags,
  timestamps,
  titleAndDescription,
  userGroups,
} from '../fieldUtils';
import { relationship, text } from '@keystone-6/core/fields';
import { blueHarvestImage } from '../../customFields/blueHarvestImage';

/*
TODO: Fields to add
Topics
Department(s)?
Assembly District
  District Rep (bio? contact?)
Related Legislation
Boards
Related District(s)
RSA(s)
FSA(s)
SSA(s)
SPUD(s)
*/

const pluralFieldKey = 'communities';

export const Community: ListConfig<any> = list({
  access: {
    operation: generalOperationAccess,
    item: generalItemAccess,
    filter: filterByPubDates,
  },
  graphql: {
    maxTake: 100,
  },
  fields: {
    heroImage: blueHarvestImage(),
    ...titleAndDescription(),
    ...publishable,
    liveUrl: liveUrl(pluralFieldKey),
    slug,
    owner,
    mapId: text({
      label: 'Map ID',
      ui: {
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),
    tags: tags(pluralFieldKey),
    userGroups: userGroups(pluralFieldKey),
    contacts: contacts(pluralFieldKey),
    services: services(pluralFieldKey),
    districts: relationship({
      ref: 'AssemblyDistrict',
      many: true,
      ui: {
        hideCreate: true,
        inlineConnect: true,
      },
    }),
    ...timestamps,
  },
});
