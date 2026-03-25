import { Field } from './Field';

export function Select({
  options,
  label,
  ...props
}: {
  options: { value: string; label: string }[];
  label: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Field name={props.name || 'Select'} label={label}>
      <select name={props.name} id={props.id || props.name} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
