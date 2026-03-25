export function Field(props: {
  name: string;
  label?: string;
  hideLabel?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      {!props.hideLabel && (
        <label htmlFor={props.name} className="block text-sm font-semibold">
          {props.label || props.name}
        </label>
      )}
      {props.children}
    </div>
  );
}
