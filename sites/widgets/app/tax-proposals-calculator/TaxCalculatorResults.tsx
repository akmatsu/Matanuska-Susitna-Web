'use client';

import { useState } from 'react';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

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

      {/* Monthly/Annual Toggle */}
      <div className="flex items-center gap-3 rounded-lg bg-gray-100 p-3">
        <span className="text-xs font-medium text-gray-700 sm:text-sm">
          View as:
        </span>
        <button
          onClick={() => setIsAnnual(true)}
          className={`rounded px-3 py-1 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
            isAnnual
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Annual
        </button>
        <button
          onClick={() => setIsAnnual(false)}
          className={`rounded px-3 py-1 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
            !isAnnual
              ? 'bg-blue-600 text-white'
              : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Property Tax */}
      <div className="rounded-lg bg-sky-50 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Property Tax
          </span>
          <span className="text-lg font-bold text-blue-900">
            {formatCurrency(propertyTax * scale)}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          Based on {formatCurrency(taxablePropertyValue)} taxable property value
          at {effectiveMillRate} mill rate
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
        </p>
      </div>

      {/* Goods/Services Results */}
      <div className="rounded-lg bg-gray-50 p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Goods/Services</span>
          <div className="text-right">
            <div className="text-xs text-gray-600">Before</div>
            <div className="font-bold text-gray-900">
              {formatCurrency(annualGrocerySpending * scale)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-600">After</div>
            <div className="font-bold text-gray-900">
              {formatCurrency(totalGroceryCost * scale)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span className="font-semibold">Tax Increase</span>
          <span className="text-lg font-bold">
            +{formatCurrency(groceryDifference * scale)}
          </span>
        </div>
      </div>

      {/* Marijuana Results */}
      <div className="rounded-lg bg-gray-50 p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Marijuana</span>
          <div className="text-right">
            <div className="text-xs text-gray-600">Before</div>
            <div className="font-bold text-gray-900">
              {formatCurrency(annualMarijuanaSpending * scale)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-600">After</div>
            <div className="font-bold text-gray-900">
              {formatCurrency(totalMarijuanaCost * scale)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span className="font-semibold">Tax Increase</span>
          <span className="text-lg font-bold">
            +{formatCurrency(marijuanaDifference * scale)}
          </span>
        </div>
      </div>

      {/* Alcohol Results */}
      <div className="rounded-lg bg-gray-50 p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Alcohol</span>
          <div className="text-right">
            <div className="text-xs text-gray-600">Before</div>
            <div className="font-bold text-gray-900">
              {formatCurrency(annualAlcoholSpending * scale)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-600">After</div>
            <div className="font-bold text-gray-900">
              {formatCurrency(totalAlcoholCost * scale)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span className="font-semibold">Tax Increase</span>
          <span className="text-lg font-bold">
            +{formatCurrency(alcoholDifference * scale)}
          </span>
        </div>
      </div>

      {/* Total Cost */}
      <div className="rounded-lg bg-green-50 p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">
            Total {isAnnual ? 'Annual' : 'Monthly'} Costs
          </span>
          <div className="text-right">
            <div className="text-xs text-gray-600">Before</div>
            <div className="font-bold text-gray-900">
              {formatCurrency(originalAnnualSpending * scale)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-600">After</div>
            <div className="font-bold text-gray-900">
              {formatCurrency(totalCost * scale)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span className="font-semibold">Total Difference</span>
          <span className="text-xl font-bold">
            {totalCostDifference >= 0 ? '+' : ''}
            {formatCurrency(totalCostDifference * scale)}
          </span>
        </div>
      </div>

      {onEdit && (
        <button
          onClick={onEdit}
          className="mt-4 w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 sm:mt-6 sm:px-4 sm:py-3"
        >
          Edit Scenario
        </button>
      )}
    </>
  );
}
