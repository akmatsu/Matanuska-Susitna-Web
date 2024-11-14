import { type Lists } from '.keystone/types';
import { User } from './User';
import { Service } from './Service';
import { Tag } from './Tag';
import { Alert } from './Alert';

import { Contact } from './Contact';
import { Highlight } from './Highlight';
import { Document } from './Document';
import { DocumentCollection } from './DocumentCollection';

export const lists = {
  User,
  Service,
  Tag,
  Alert,
  Contact,
  Highlight,
  Document,
  DocumentCollection,
} satisfies Lists;
