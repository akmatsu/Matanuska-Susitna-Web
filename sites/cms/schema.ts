import { type Lists } from '.keystone/types';
import {
  Service,
  ExternalLink,
  User,
  Alert,
  Tag,
  Process,
  Step,
} from './schema/models';

export const lists = {
  User,
  Service,
  ExternalLink,
  Tag,
  Alert,
  Process,
  Step,
} satisfies Lists;
