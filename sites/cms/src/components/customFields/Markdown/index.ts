import {
  type BaseListTypeInfo,
  fieldType,
  type FieldTypeFunc,
  type CommonFieldConfig,
} from '@keystone-6/core/types';
import { graphql } from '@keystone-6/core';

type TextFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & {
    isIndexed?: boolean | 'unique';
  };

type NestedMyStringFilterType = graphql.InputObjectType<{
  equals: graphql.Arg<typeof graphql.String>;
  in: graphql.Arg<graphql.ListType<graphql.NonNullType<typeof graphql.String>>>;
  notIn: graphql.Arg<
    graphql.ListType<graphql.NonNullType<typeof graphql.String>>
  >;
  lt: graphql.Arg<typeof graphql.String>;
  lte: graphql.Arg<typeof graphql.String>;
  gt: graphql.Arg<typeof graphql.String>;
  gte: graphql.Arg<typeof graphql.String>;
  contains: graphql.Arg<typeof graphql.String>;
  startsWith: graphql.Arg<typeof graphql.String>;
  endsWith: graphql.Arg<typeof graphql.String>;
  not: graphql.Arg<NestedMyStringFilterType>;
}>;

const NestedMyStringFilter: NestedMyStringFilterType = graphql.inputObject({
  name: 'NestedMyStringFilter',
  fields: () => ({
    equals: graphql.arg({ type: graphql.String }),
    in: graphql.arg({ type: graphql.list(graphql.nonNull(graphql.String)) }),
    notIn: graphql.arg({ type: graphql.list(graphql.nonNull(graphql.String)) }),
    lt: graphql.arg({ type: graphql.String }),
    lte: graphql.arg({ type: graphql.String }),
    gt: graphql.arg({ type: graphql.String }),
    gte: graphql.arg({ type: graphql.String }),
    contains: graphql.arg({ type: graphql.String }),
    startsWith: graphql.arg({ type: graphql.String }),
    endsWith: graphql.arg({ type: graphql.String }),
    not: graphql.arg({ type: NestedMyStringFilter }),
  }),
});

const MyQueryMode = graphql.enum({
  name: 'MyQueryMode',
  values: graphql.enumValues(['default', 'insensitive']),
});

const MyStringFilter = graphql.inputObject({
  name: 'MyStringFilter',
  fields: () => ({
    equals: graphql.arg({ type: graphql.String }),
    in: graphql.arg({ type: graphql.list(graphql.nonNull(graphql.String)) }),
    notIn: graphql.arg({ type: graphql.list(graphql.nonNull(graphql.String)) }),
    lt: graphql.arg({ type: graphql.String }),
    lte: graphql.arg({ type: graphql.String }),
    gt: graphql.arg({ type: graphql.String }),
    gte: graphql.arg({ type: graphql.String }),
    contains: graphql.arg({ type: graphql.String }),
    startsWith: graphql.arg({ type: graphql.String }),
    endsWith: graphql.arg({ type: graphql.String }),
    mode: graphql.arg({ type: MyQueryMode }),
    not: graphql.arg({ type: NestedMyStringFilter }),
  }),
});

type CommonFilter<T> = {
  equals?: T | null;
  in?: readonly T[] | null;
  notIn?: readonly T[] | null;
  lt?: T | null;
  lte?: T | null;
  gt?: T | null;
  gte?: T | null;
  contains?: T | null;
  startsWith?: T | null;
  endsWith?: T | null;
  not?: CommonFilter<T> | null;
};

type EntriesAssumingNoExtraProps<T> = {
  [Key in keyof T]-?: [Key, T[Key]];
}[keyof T][];

const objectEntriesButAssumeNoExtraProperties: <T>(
  obj: T,
) => EntriesAssumingNoExtraProps<T> = Object.entries as any;

function internalResolveFilter(
  entries: EntriesAssumingNoExtraProps<CommonFilter<any>>,
  mode: 'default' | 'insensitive' | undefined,
): object {
  const entry = entries.shift();
  if (entry === undefined) return {};
  const [key, val] = entry;
  if (val == null) {
    return {
      AND: [{ [key]: val }, internalResolveFilter(entries, mode)],
    };
  }
  switch (key) {
    case 'equals':
    case 'lt':
    case 'lte':
    case 'gt':
    case 'gte':
    case 'in':
    case 'contains':
    case 'startsWith':
    case 'endsWith': {
      return {
        AND: [
          { [key]: val, mode },
          { not: null },
          internalResolveFilter(entries, mode),
        ],
      };
    }

    case 'notIn': {
      return {
        AND: [
          {
            NOT: [
              internalResolveFilter(
                objectEntriesButAssumeNoExtraProperties({ in: val }),
                mode,
              ),
            ],
          },
          internalResolveFilter(entries, mode),
        ],
      };
    }
    case 'not': {
      return {
        AND: [
          {
            NOT: [
              internalResolveFilter(
                objectEntriesButAssumeNoExtraProperties(val),
                mode,
              ),
            ],
          },
          internalResolveFilter(entries, mode),
        ],
      };
    }
  }
}

function resolveString(
  val:
    | (CommonFilter<string> & { mode?: 'default' | 'insensitive' | null })
    | null,
) {
  if (val === null) return null;
  const { mode, ...value } = val;
  return internalResolveFilter(
    objectEntriesButAssumeNoExtraProperties(value),
    mode ?? undefined,
  );
}

const MyOrderDirectionEnum = graphql.enum({
  name: 'MyOrderDirection',
  values: graphql.enumValues(['asc', 'desc']),
});

export function customText<ListTypeInfo extends BaseListTypeInfo>({
  isIndexed,
  ...config
}: TextFieldConfig<ListTypeInfo> = {}): FieldTypeFunc<ListTypeInfo> {
  return (meta) =>
    fieldType({
      kind: 'scalar',
      mode: 'optional',
      scalar: 'String',
      index: isIndexed === true ? 'index' : isIndexed || undefined,
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
        orderBy: { arg: graphql.arg({ type: MyOrderDirectionEnum }) },
        where: {
          arg: graphql.arg({
            type: MyStringFilter,
          }),
          resolve: resolveString,
        },
      },
      output: graphql.field({
        type: graphql.String,
        resolve({ value, item }, args, context, info) {
          return value;
        },
      }),
      views: './src/components/customFields/Markdown/views.tsx',
      getAdminMeta() {
        return {};
      },
    });
}
