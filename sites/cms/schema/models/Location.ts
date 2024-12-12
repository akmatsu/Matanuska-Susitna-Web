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

/*
TODO: Fields to add
Hero Image
Map Location (What's the difference form Address?)
Topics
Address?
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

const pluralFieldKey = 'locations'

export const Location: ListConfig<any> = list({
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
    body: customText(),
    tags: tags(pluralFieldKey),
    userGroups: userGroups(pluralFieldKey),
    contacts: contacts(pluralFieldKey),
    services: services(pluralFieldKey)
    ...timestamps,
  },
});
