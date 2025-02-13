import { list, ListConfig } from '@keystone-6/core';
import { generalOperationAccess } from '../access';
import { tags, titleAndDescription } from '../fieldUtils';
import { image } from '@keystone-6/core/fields';
import { appConfig } from '../../configs/appConfig';

export const Image: ListConfig<any> = list({
  access: {
    operation: generalOperationAccess,
  },
  graphql: {
    maxTake: 100,
  },
  fields: {
    ...titleAndDescription(),
    tags: tags('images'),
    file: image({
      storage: appConfig.nodeEnv === 'production' ? 's3Images' : 'localImages',
    }),
  },
});
