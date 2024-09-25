import { type Lists } from '.keystone/types';
import { Service, ExternalLink, User, Alert, Tag } from './schema/models';

export const lists = {
  User,
  Service,
  ExternalLink,
  Tag,
  Alert,
} satisfies Lists;
