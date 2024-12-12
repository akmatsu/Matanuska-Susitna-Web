import { CellContainer } from '@keystone-6/core/admin-ui/components';
import Link from 'next/link';
import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '@keystone-6/core/types';

import {
  FieldContainer,
  FieldLabel,
  FieldDescription,
  TextInput,
} from '@keystone-ui/fields';

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  return (
    <FieldContainer as="fieldset">
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
        Search for an image in{' '}
        <Link href="https://images.matsu.gov" target="_blank">
          Blue Harvest
        </Link>{' '}
        and paste the URL in the input below.
      </FieldDescription>
      <TextInput
        defaultValue={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {value && <img src={value} />}
    </FieldContainer>
  );
}

export const Cell: CellComponent = ({ item, field }) => {
  return (
    <CellContainer>
      <p>I AM A CELL</p>
    </CellContainer>
  );
};

export const CardValue: CardValueComponent = ({ field, item }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <p>I AM THE CARD YAYAYAY</p>
    </FieldContainer>
  );
};

export const controller = (
  config: FieldControllerConfig<{}>,
): FieldController<string | null, string> => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: null,
    deserialize: (data) => {
      const value = data[config.path];
      return typeof value === 'string' ? value : null;
    },
    serialize: (value) => ({ [config.path]: value }),
  };
};
