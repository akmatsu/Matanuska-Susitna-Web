import { list, ListConfig } from '@keystone-6/core';
import {
  filterByPubDates,
  generalItemAccess,
  generalOperationAccess,
} from '../access';
import {
  contacts,
  owner,
  publishable,
  services,
  slug,
  tags,
  timestamps,
  titleAndDescription,
  userGroups,
} from '../fieldUtils';
import { customText } from '../../customFields/Markdown';
import { text } from '@keystone-6/core/fields';
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
    ...titleAndDescription(),
    ...publishable,
    slug,
    owner,
    mapId: text({
      label: 'Map ID',
      ui: {
        description:
          'You can create a custom map view in ArcGIS online and paste the ID here',
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),
    heroImage: blueHarvestImage(),
    body: customText(),
    tags: tags(pluralFieldKey),
    userGroups: userGroups(pluralFieldKey),
    contacts: contacts(pluralFieldKey),
    services: services(pluralFieldKey),
    ...timestamps,
  },
});
