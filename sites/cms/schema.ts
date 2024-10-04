import { type Lists } from '.keystone/types';
import {
  Service,
  ExternalLink,
  User,
  Alert,
  Tag,
  Process,
  Step,
  Contact,
} from './schema/models';

export const lists = {
  User,
  Service,
  ExternalLink,
  Tag,
  Alert,
  Process,
  Step,
  Contact,
} satisfies Lists;
