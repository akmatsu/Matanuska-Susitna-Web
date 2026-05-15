import { ReactNode } from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  helpText?: ReactNode;
  placeholder?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  helpText,
  placeholder = '0',
}: NumberInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {helpText && <p className="mb-1 text-xs text-gray-500">{helpText}</p>}
      <input
        type="number"
        min="0"
        value={value || ''}
        onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
