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
  onEdit,
}: TaxCalculatorResultsProps) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const scale = isAnnual ? 1 : 1 / 12;

  return (
    <>
      {/* Disclaimer Toggle */}
      <button
        onClick={() => setShowDisclaimer(!showDisclaimer)}
        className="flex w-full items-center gap-2 rounded-lg bg-yellow-200 p-2 text-left hover:bg-yellow-300"
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

      {onEdit && (
        <Button onClick={onEdit} variant="secondary" className="mt-4 sm:mt-6">
          Edit Scenario
        </Button>
      )}
    </>
  );
}
