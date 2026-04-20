import { Field, FieldDescription, FieldLabel } from './Field';
import { Select } from './Select';

export function SelectField() {
  return (
    <Field>
      <FieldLabel>Label</FieldLabel>
      <Select />
      <FieldDescription>Description</FieldDescription>
    </Field>
  );
}
