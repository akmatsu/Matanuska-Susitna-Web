import { graphql } from '@keystone-6/core';
import {
  BaseListTypeInfo,
  CommonFieldConfig,
  fieldType,
  FieldTypeFunc,
} from '@keystone-6/core/types';

type LinkFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & {
    isIndex?: boolean | 'unique';
  };


const LinkOrderDirectionEnum = graphql.enum({
  name: 'LinkOrderDirection',
  values: graphql.enumValues(['asc', 'desc']),
});

export function linkField<ListTypeInfo extends BaseListTypeInfo>({
  isIndex,
  ...config
}: LinkFieldConfig<ListTypeInfo> = {}): FieldTypeFunc<ListTypeInfo> {
  return (meta) =>
    fieldType({
      kind: 'scalar',
      mode: 'optional',
      scalar: 'String',
      index: isIndex === true ? 'index' : isIndex || undefined,
    })({
      ...config,
      input: {
        create: {
          arg: graphql.arg({ type: graphql.String }),
          resolve(value, context) {
            return value;
          },
        },
        update: { arg: graphql.arg({ type: graphql.String }) },
        orderBy: { arg: graphql.arg({ type: LinkOrderDirectionEnum }) },
      },
      output: graphql.field({
        type: graphql.String,
        resolve({ value }) {
          return value;
        },
      }),
      views: './customFields/link/views.tsx',
      getAdminMeta() {
        return {};
      },
    });
}
