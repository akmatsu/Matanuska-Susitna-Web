import { graphql } from '@keystone-6/core';
import {
  BaseListTypeInfo,
  CommonFieldConfig,
  fieldType,
  FieldTypeFunc,
  orderDirectionEnum,
} from '@keystone-6/core/types';

type BlueHarvestImageConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo>;

export function blueHarvestImage<ListTypeInfo extends BaseListTypeInfo>({
  ...config
}: BlueHarvestImageConfig<ListTypeInfo> = {}): FieldTypeFunc<ListTypeInfo> {
  return (meta) =>
    fieldType({
      kind: 'scalar',
      mode: 'optional',
      scalar: 'String',
    })({
      ...config,
      input: {
        create: {
          arg: graphql.arg({ type: graphql.String }),
          resolve(value, context) {
            return value;
          },
        },
        update: {
          arg: graphql.arg({ type: graphql.String }),
        },
        orderBy: {
          arg: graphql.arg({ type: orderDirectionEnum }),
        },
      },
      output: graphql.field({
        type: graphql.String,
        resolve({ value }) {
          return value;
        },
      }),
      views: './customFields/blueHarvestImage/views.tsx',
      getAdminMeta() {
        return {};
      },
    });
}
