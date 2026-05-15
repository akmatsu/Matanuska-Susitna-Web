'use client';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioInputProps {
  legend: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export function RadioInput({
  legend,
  options,
  value,
  onChange,
  name,
}: RadioInputProps) {
  return (
    <fieldset className="mb-6">
      <legend className="mb-3 text-sm font-medium text-gray-700">
        {legend}
      </legend>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={value === option.value}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  onChange(option.value);
                }
              }}
              className="h-4 w-4 cursor-pointer border-gray-300 accent-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span className="ml-2 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
