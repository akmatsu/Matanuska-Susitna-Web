import { type Lists } from '.keystone/types';
import { User } from './User';
import { Service } from './Service';
import { Tag } from './Tag';
import { Alert } from './Alert';
import { Process } from './Process';
import { Step } from './Step';
import { Contact } from './Contact';
import { Highlight } from './Highlight';
import { Document } from './Document';
import { DocumentCollection } from './DocumentCollection';

export const lists = {
  User,
  Service,
  Tag,
  Alert,
  Process,
  Step,
  Contact,
  Highlight,
  Document,
  DocumentCollection,
} satisfies Lists;
