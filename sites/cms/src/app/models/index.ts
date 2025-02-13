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
import { Community } from './Community';
import { AssemblyDistrict } from './AssemblyDistrict';
import { Image } from './Image';
import { ApiKey } from './ApiKey';
import { OrgUnit } from './OrgUnit';

export const lists = {
  User,
  UserGroup,
  Contact,
  Alert,
  Tag,
  Service,
  Community,
  AssemblyDistrict,
  Highlight,
  Image,
  Document,
  DocumentCollection,
  ApiKey,
  OrgUnit,
} satisfies Lists;
