'use client';

import { useState } from 'react';
import { TogglePeriod } from './TogglePeriod';
import { Button } from './Button';
import { formatCurrency } from './formatCurrency';

export interface TaxCalculatorResultsProps {
  salesTaxType: 'areawide' | 'non-areawide' | 'none';
  groceryDifference: number;
  annualMarijuanaSpending: number;
  marijuanaDifference: number;
  annualAlcoholSpending: number;
  alcoholDifference: number;
  propertyTaxDifference: number;
  totalCostDifference: number;
  includeGravelTax: boolean;
  includeMarijuanaTax: boolean;
  includeAlcoholTax: boolean;
  onEdit?: () => void;
}

export function TaxCalculatorResults({
  salesTaxType,
  groceryDifference,
  annualMarijuanaSpending,
  marijuanaDifference,
  annualAlcoholSpending,
  alcoholDifference,
  propertyTaxDifference,
  totalCostDifference,
  includeGravelTax,
  includeMarijuanaTax,
  includeAlcoholTax,
  onEdit,
}: TaxCalculatorResultsProps) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Revenue implications in millions
  const REVENUE_RATES = {
    areawide: -37, // -$37M deficit
    nonAreawide: 6.7, // +$6.7M
    gravel: 0.956, // +$0.956M
    marijuana: 3.245, // +$3.245M
    alcoholMin: 6, // +$6M (minimum)
    alcoholMax: 15, // +$15M (maximum)
  };

  // Calculate total revenue impact
  let totalRevenueImpact = 0;
  if (salesTaxType === 'areawide') {
    totalRevenueImpact += REVENUE_RATES.areawide;
  } else if (salesTaxType === 'non-areawide') {
    totalRevenueImpact += REVENUE_RATES.nonAreawide;
  }
  if (includeGravelTax) {
    totalRevenueImpact += REVENUE_RATES.gravel;
  }
  if (includeMarijuanaTax) {
    totalRevenueImpact += REVENUE_RATES.marijuana;
  }
  const alcoholRevenueAvg =
    (REVENUE_RATES.alcoholMin + REVENUE_RATES.alcoholMax) / 2;
  if (includeAlcoholTax) {
    totalRevenueImpact += alcoholRevenueAvg;
  }

  const scale = isAnnual ? 1 : 1 / 12;

  return (
    <>
      {/* Disclaimer Toggle */}
      <button
        onClick={() => setShowDisclaimer(!showDisclaimer)}
        className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-yellow-400 bg-yellow-200 p-2 text-left hover:bg-yellow-300"
      >
        <span
          className={`text-lg transition-transform ${showDisclaimer ? 'icon-[mdi--chevron-down]' : 'icon-[mdi--chevron-right]'}`}
        />
        <span className="icon-[mdi--alert-circle]" />
        <span className="text-xs font-semibold sm:text-sm">DISCLAIMER</span>
      </button>

      {/* Disclaimer Content */}
      {showDisclaimer && (
        <div className="rounded-lg border border-yellow-400 bg-yellow-200 p-3 sm:p-4">
          <p className="text-xs sm:text-sm">
            These calculations are speculative and may be incorrect. They are
            intended for informational purposes only and do not represent actual
            tax liability. Tax rates, exemptions, and calculations may vary
            based on location, individual circumstances, and other factors. For
            current property tax information, visit{' '}
            <a
              href="https://myproperty.matsugov.us"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              My Property
            </a>
            .
          </p>
        </div>
      )}

      {/* Summaries */}
      <div className="rounded-lg border border-blue-300 bg-blue-100 p-4">
        <p className="mb-3 font-semibold text-gray-900">
          Based on your selections:
        </p>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600">
            Your {isAnnual ? 'annual' : 'monthly'} tax burden will{' '}
            <span className="font-semibold text-gray-900">
              {totalCostDifference * scale > 0
                ? 'increase'
                : totalCostDifference * scale < 0
                  ? 'decrease'
                  : 'remain the same'}
            </span>
            {Math.abs(totalCostDifference * scale) > 0 && (
              <span className="font-semibold text-gray-900">
                {' '}
                by {totalCostDifference * scale >= 0 ? '+' : ''}
                {formatCurrency(totalCostDifference * scale)}
              </span>
            )}
            .
          </li>
          <li className="text-sm text-gray-600">
            The borough revenue will{' '}
            <span className="font-semibold text-gray-900">
              {totalRevenueImpact > 0
                ? 'increase'
                : totalRevenueImpact < 0
                  ? 'decrease'
                  : 'remain the same'}
            </span>
            {Math.abs(totalRevenueImpact) > 0 && (
              <span className="font-semibold text-gray-900">
                {' '}
                by {totalRevenueImpact >= 0 ? '+' : ''}$
                {Math.abs(totalRevenueImpact).toFixed(1)}M
              </span>
            )}
            .
          </li>
        </ul>
      </div>

      {/* Personal Tax Impacts */}
      <div className="rounded-lg border bg-gray-50 p-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Personal Tax Impacts
          </h3>
          <TogglePeriod isAnnual={isAnnual} onChange={setIsAnnual} />
        </div>

        <div className="space-y-3">
          {/* Property Tax */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700">
                Property Tax Change
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {propertyTaxDifference * scale > 0 ? '+' : ''}
              {formatCurrency(propertyTaxDifference * scale)}
            </span>
          </div>

          {/* Goods/Services */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700">
                Goods/Services Change
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {groceryDifference * scale >= 0 ? '+' : ''}
              {formatCurrency(groceryDifference * scale)}
            </span>
          </div>

          {/* Marijuana */}
          {!!annualMarijuanaSpending && (
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  Marijuana Change
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {marijuanaDifference * scale >= 0 ? '+' : ''}
                {formatCurrency(marijuanaDifference * scale)}
              </span>
            </div>
          )}

          {/* Alcohol */}
          {!!annualAlcoholSpending && (
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  Alcohol Change
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {alcoholDifference * scale >= 0 ? '+' : ''}
                {formatCurrency(alcoholDifference * scale)}
              </span>
            </div>
          )}

          {/* Total Cost */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex-1">
              <span className="font-semibold text-gray-900">
                Total {isAnnual ? 'Annual' : 'Monthly'} Impact
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {totalCostDifference * scale >= 0 ? '+' : ''}
              {formatCurrency(totalCostDifference * scale)}
            </span>
          </div>
        </div>
      </div>

      {/* Borough Revenue Implications */}
      <div className="rounded-lg border bg-gray-50 p-4">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Borough Revenue Implications
        </h3>
        <p className="mb-4 text-xs text-gray-600">
          <span className="font-semibold">Note:</span> These are estimated
          revenue figures. The borough budget is used to fund core operations,
          capital projects such as roads and infrastructure, and allocations to
          the school district. For more information view our{' '}
          <a
            href="https://transparency.matsugov.us/pages/financial-information"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700"
          >
            Financial Information Page
          </a>
          .
        </p>
        <div className="space-y-3">
          {/* Sales Tax Revenue */}
          {salesTaxType === 'areawide' && (
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-700">
                OR 26-032: Areawide Sales Tax
              </span>
              <span className="text-sm font-semibold text-gray-900">
                -${Math.abs(REVENUE_RATES.areawide).toFixed(1)}M
              </span>
            </div>
          )}
          {salesTaxType === 'non-areawide' && (
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-700">
                OR 26-065: Non-Areawide Sales Tax
              </span>
              <span className="text-sm font-semibold text-gray-900">
                +${REVENUE_RATES.nonAreawide.toFixed(1)}M
              </span>
            </div>
          )}

          {/* Gravel Tax Revenue */}
          {includeGravelTax && (
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-700">
                OR 26-058: Severance (Gravel) Tax
              </span>
              <span className="text-sm font-semibold text-gray-900">
                +${REVENUE_RATES.gravel.toFixed(3)}M
              </span>
            </div>
          )}

          {/* Marijuana Tax Revenue */}
          {includeMarijuanaTax && (
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-700">
                OR 26-061: Marijuana Tax
              </span>
              <span className="text-sm font-semibold text-gray-900">
                +${REVENUE_RATES.marijuana.toFixed(3)}M
              </span>
            </div>
          )}

          {/* Alcohol Tax Revenue */}
          {includeAlcoholTax && (
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <span className="text-sm text-gray-700">
                OR 26-062: Alcohol Tax
              </span>
              <span className="text-sm font-semibold text-gray-900">
                +${alcoholRevenueAvg.toFixed(1)}M{' '}
                <span className="text-xs text-gray-500">
                  (est. ${REVENUE_RATES.alcoholMin}-${REVENUE_RATES.alcoholMax}
                  M)
                </span>
              </span>
            </div>
          )}

          {/* Total Revenue Impact */}
          <div className="flex items-center justify-between pt-3">
            <span className="font-semibold text-gray-900">
              Total Revenue Impact
            </span>
            <span className="text-lg font-bold text-gray-900">
              {totalRevenueImpact >= 0 ? '+' : ''}
              {totalRevenueImpact.toFixed(1)}M
            </span>
          </div>
        </div>
      </div>

      {onEdit && (
        <Button onClick={onEdit} variant="secondary" className="mt-4 sm:mt-6">
          Edit Scenario
        </Button>
      )}
    </>
  );
}
