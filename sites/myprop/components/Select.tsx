export function Select({
  options,
  ...props
}: {
  options?: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      name={props.name}
      id={props.id || props.name}
      {...props}
      className="group-data-error/field:border-red-500"
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
