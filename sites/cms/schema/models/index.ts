import { type Lists } from '.keystone/types';
import { User } from './User';
import { Service } from './Service';
import { Tag } from './Tag';
import { Alert } from './Alert';
import { Contact } from './Contact';
import { Highlight } from './Highlight';
import { Document } from './Document';
import { DocumentCollection } from './DocumentCollection';
import { UserGroup } from './UserGroup';

export const lists = {
  User,
  UserGroup,
  Contact,
  Alert,
  Tag,
  Service,
  Highlight,
  Document,
  DocumentCollection,
} satisfies Lists;
