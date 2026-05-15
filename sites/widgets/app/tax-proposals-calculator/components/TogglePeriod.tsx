import { Button } from './Button';

interface TogglePeriodProps {
  isAnnual: boolean;
  onChange: (isAnnual: boolean) => void;
  label?: string;
}

export function TogglePeriod({
  isAnnual,
  onChange,
  label = 'View as:',
}: TogglePeriodProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-gray-700 sm:text-sm">
        {label}
      </span>
      <Button
        isActive={isAnnual}
        onClick={() => onChange(true)}
        className="px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
      >
        Annual
      </Button>
      <Button
        isActive={!isAnnual}
        onClick={() => onChange(false)}
        className="px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
      >
        Monthly
      </Button>
    </div>
  );
}
