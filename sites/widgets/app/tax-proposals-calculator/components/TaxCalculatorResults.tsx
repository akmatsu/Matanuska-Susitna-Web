'use client';

import { useState } from 'react';
import { TogglePeriod } from './TogglePeriod';
import { Button } from './Button';
import { ResultCard } from './ResultCard';
import { formatCurrency } from './formatCurrency';

export interface TaxCalculatorResultsProps {
  propertyTax: number;
  taxablePropertyValue: number;
  effectiveMillRate: number;
  salesTaxType: 'areawide' | 'non-areawide' | 'none';
  annualGrocerySpending: number;
  totalGroceryCost: number;
  groceryDifference: number;
  annualMarijuanaSpending: number;
  totalMarijuanaCost: number;
  marijuanaDifference: number;
  annualAlcoholSpending: number;
  totalAlcoholCost: number;
  alcoholDifference: number;
  totalCost: number;
  originalAnnualSpending: number;
  totalCostDifference: number;
  includeGravelTax: boolean;
  includeMarijuanaTax: boolean;
  includeAlcoholTax: boolean;
  onEdit?: () => void;
}

export function TaxCalculatorResults({
  propertyTax,
  taxablePropertyValue,
  effectiveMillRate,
  salesTaxType,
  annualGrocerySpending,
  totalGroceryCost,
  groceryDifference,
  annualMarijuanaSpending,
  totalMarijuanaCost,
  marijuanaDifference,
  annualAlcoholSpending,
  totalAlcoholCost,
  alcoholDifference,
  totalCost,
  originalAnnualSpending,
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
  const alcoholRevenueAvg = (REVENUE_RATES.alcoholMin + REVENUE_RATES.alcoholMax) / 2;
  if (includeAlcoholTax) {
    totalRevenueImpact += alcoholRevenueAvg;
  }

  const scale = isAnnual ? 1 : 1 / 12;

  return (
    <>
      {/* Disclaimer Toggle */}
      <button
        onClick={() => setShowDisclaimer(!showDisclaimer)}
        className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-yellow-200 p-2 text-left hover:bg-yellow-300"
      >
        <span
          className={`text-lg transition-transform ${showDisclaimer ? 'icon-[mdi--chevron-down]' : 'icon-[mdi--chevron-right]'}`}
        />
        <span className="icon-[mdi--alert-circle]" />
        <span className="text-xs font-semibold sm:text-sm">DISCLAIMER</span>
      </button>

      {/* Disclaimer Content */}
      {showDisclaimer && (
        <div className="rounded-lg bg-yellow-100 p-3 sm:p-4">
          <p className="text-xs sm:text-sm">
            These calculations are speculative and may be incorrect. They are
            intended for informational purposes only and do not represent actual
            tax liability. Tax rates, exemptions, and calculations may vary
            based on location, individual circumstances, and other factors. For
            current property tax information, visit{' '}
            <a
              href="https://myproperty.matsugov.us/mydetail.aspx?pID=88571"
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

      <TogglePeriod isAnnual={isAnnual} onChange={setIsAnnual} />

      {/* Property Tax */}
      <ResultCard
        title="Property Tax"
        bgColor="bg-sky-50"
        displayValue={propertyTax * scale}
        displayValueColor="text-blue-900"
        subtitle={
          <>
            Based on {formatCurrency(taxablePropertyValue)} taxable property
            value at {effectiveMillRate} mill rate
            {salesTaxType === 'areawide' && (
              <span className="mt-1 block">
                (0 mill rate with OR 26-032 Areawide Sales Tax)
              </span>
            )}
            {salesTaxType === 'non-areawide' && (
              <span className="mt-1 block">
                ($75,000 property value exemption applied with OR 26-065)
              </span>
            )}
          </>
        }
      />

      {/* Goods/Services Results */}
      <ResultCard
        title="Goods/Services"
        bgColor="bg-gray-50"
        beforeAmount={annualGrocerySpending * scale}
        afterAmount={totalGroceryCost * scale}
        difference={groceryDifference * scale}
      />

      {/* Marijuana Results */}
      <ResultCard
        title="Marijuana"
        bgColor="bg-gray-50"
        beforeAmount={annualMarijuanaSpending * scale}
        afterAmount={totalMarijuanaCost * scale}
        difference={marijuanaDifference * scale}
      />

      {/* Alcohol Results */}
      <ResultCard
        title="Alcohol"
        bgColor="bg-gray-50"
        beforeAmount={annualAlcoholSpending * scale}
        afterAmount={totalAlcoholCost * scale}
        difference={alcoholDifference * scale}
      />

      {/* Total Cost */}
      <ResultCard
        title={`Total ${isAnnual ? 'Annual' : 'Monthly'} Costs`}
        bgColor="bg-green-50"
        beforeAmount={originalAnnualSpending * scale}
        afterAmount={totalCost * scale}
        difference={totalCostDifference * scale}
        differenceLabel="Total Difference"
      />

      {/* Borough Revenue Implications */}
      <div className="rounded-lg bg-purple-50 p-4">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Borough Revenue Implications
        </h3>
        <p className="mb-4 text-xs text-gray-600">
          <span className="font-semibold">Note:</span> These are estimated revenue figures. The borough budget is used to fund core operations, capital projects such as roads and infrastructure, and allocations to the school district.
        </p>
        <div className="space-y-3">
          {/* Sales Tax Revenue */}
          {salesTaxType === 'areawide' && (
            <div className="flex items-center justify-between border-b border-purple-200 pb-3">
              <span className="text-sm text-gray-700">
                OR 26-032: Areawide Sales Tax
              </span>
              <span className="text-sm font-semibold text-red-600">
                -${Math.abs(REVENUE_RATES.areawide).toFixed(1)}M
              </span>
            </div>
          )}
          {salesTaxType === 'non-areawide' && (
            <div className="flex items-center justify-between border-b border-purple-200 pb-3">
              <span className="text-sm text-gray-700">
                OR 26-065: Non-Areawide Sales Tax
              </span>
              <span className="text-sm font-semibold text-green-600">
                +${REVENUE_RATES.nonAreawide.toFixed(1)}M
              </span>
            </div>
          )}

          {/* Gravel Tax Revenue */}
          {includeGravelTax && (
            <div className="flex items-center justify-between border-b border-purple-200 pb-3">
              <span className="text-sm text-gray-700">
                OR 26-058: Severance (Gravel) Tax
              </span>
              <span className="text-sm font-semibold text-green-600">
                +${REVENUE_RATES.gravel.toFixed(3)}M
              </span>
            </div>
          )}

          {/* Marijuana Tax Revenue */}
          {includeMarijuanaTax && (
            <div className="flex items-center justify-between border-b border-purple-200 pb-3">
              <span className="text-sm text-gray-700">
                OR 26-061: Marijuana Tax
              </span>
              <span className="text-sm font-semibold text-green-600">
                +${REVENUE_RATES.marijuana.toFixed(3)}M
              </span>
            </div>
          )}

          {/* Alcohol Tax Revenue */}
          {includeAlcoholTax && (
            <div className="flex items-center justify-between border-b border-purple-200 pb-3">
              <span className="text-sm text-gray-700">
                OR 26-062: Alcohol Tax
              </span>
              <span className="text-sm font-semibold text-green-600">
                +${alcoholRevenueAvg.toFixed(1)}M <span className="text-xs text-gray-500">(est. ${REVENUE_RATES.alcoholMin}-${REVENUE_RATES.alcoholMax}M)</span>
              </span>
            </div>
          )}

          {/* Total Revenue Impact */}
          <div className="flex items-center justify-between pt-3">
            <span className="font-semibold text-gray-900">Total Revenue Impact</span>
            <span className={`text-lg font-bold ${totalRevenueImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalRevenueImpact >= 0 ? '+' : ''}{totalRevenueImpact.toFixed(1)}M
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
