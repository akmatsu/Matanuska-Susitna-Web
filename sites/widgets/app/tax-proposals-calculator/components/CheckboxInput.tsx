interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxInput({
  label,
  checked,
  onChange,
}: CheckboxInputProps) {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );
}
