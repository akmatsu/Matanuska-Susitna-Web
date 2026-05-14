import { formatCurrency } from './formatCurrency';

interface ResultCardProps {
  title: string;
  bgColor?: string;
  beforeAmount?: number;
  afterAmount?: number;
  difference?: number;
  differenceLabel?: string;
  subtitle?: React.ReactNode;
  displayValue?: number;
  displayValueColor?: string;
}

export function ResultCard({
  title,
  bgColor = 'bg-gray-50',
  beforeAmount,
  afterAmount,
  difference,
  differenceLabel = 'Tax Increase',
  subtitle,
  displayValue,
  displayValueColor = 'text-blue-900',
}: ResultCardProps) {
  const hasBeforeAfter =
    beforeAmount !== undefined && afterAmount !== undefined;

  return (
    <div className={`rounded-lg ${bgColor} p-3 sm:p-4`}>
      {/* Header Section */}
      {hasBeforeAfter ? (
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">{title}</span>
          <div className="text-right">
            <div className="text-xs text-gray-600">Before</div>
            <div className="font-bold text-gray-900">
              {formatCurrency(beforeAmount)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-600">After</div>
            <div className="font-bold text-gray-900">
              {formatCurrency(afterAmount)}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{title}</span>
          {displayValue !== undefined && (
            <span className={`text-lg font-bold ${displayValueColor}`}>
              {formatCurrency(displayValue)}
            </span>
          )}
        </div>
      )}

      {/* Subtitle */}
      {subtitle && <p className="mt-1 text-xs text-gray-600">{subtitle}</p>}

      {/* Difference Row */}
      {difference !== undefined && (
        <div
          className={`flex items-center justify-between ${hasBeforeAfter ? 'text-gray-700' : ''}`}
        >
          <span
            className={`font-semibold ${hasBeforeAfter ? '' : 'text-gray-700'}`}
          >
            {differenceLabel}
          </span>
          <span
            className={`font-bold ${hasBeforeAfter ? 'text-lg' : 'text-xl'}`}
          >
            {difference >= 0 ? '+' : ''}
            {formatCurrency(difference)}
          </span>
        </div>
      )}
    </div>
  );
}
