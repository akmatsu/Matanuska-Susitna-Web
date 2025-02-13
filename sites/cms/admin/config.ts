import { AdminConfig } from '@keystone-6/core/types';
import { CustomNavigation } from '../src/components/CustomNavigation';
import { CustomLogo } from '../src/components/CustomLogo';

export const components: AdminConfig['components'] = {
  Logo: CustomLogo,
  Navigation: CustomNavigation,
};
