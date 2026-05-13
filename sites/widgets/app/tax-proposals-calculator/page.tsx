'use client';

import { useState } from 'react';

export default function TaxProposalsCalculatorPage() {
  const [propertyValue, setPropertyValue] = useState<number>(0);
  const [grocerySpending, setGrocerySpending] = useState<number>(0);
  const [marijuanaSpending, setMarijuanaSpending] = useState<number>(0);
  const [alcoholSpending, setAlcoholSpending] = useState<number>(0);

  // Tax selections
  const [salesTaxType, setSalesTaxType] = useState<
    'areawide' | 'non-areawide' | 'none'
  >('none');
  const [includeGravelTax, setIncludeGravelTax] = useState(false);
  const [includeMarijuanaTax, setIncludeMarijuanaTax] = useState(false);
  const [includeAlcoholTax, setIncludeAlcoholTax] = useState(false);

  // Tax rates from CSV
  const BASE_MILL_RATE = 12.022; // property tax mill rate
  const AREAWIDE_SALES_TAX = 0.065; // 6.5%
  const NON_AREAWIDE_SALES_TAX = 0.015; // 1.5%
  const MARIJUANA_TAX_INCREASE = 0.05; // increase from 5% to 10% (so 5% additional)
  const ALCOHOL_TAX = 0.1; // up to 10%

  // Determine mill rate based on areawide sales tax selection
  const effectiveMillRate = salesTaxType === 'areawide' ? 0 : BASE_MILL_RATE;

  // Apply property value exemption for non-areawide sales tax (OR 26-065)
  const taxablePropertyValue =
    salesTaxType === 'non-areawide' ? propertyValue - 75000 : propertyValue;

  // Calculate property tax
  const propertyTax = Math.max(
    0,
    taxablePropertyValue * (effectiveMillRate / 1000),
  );

  // Determine applicable sales tax rate
  let salestaxRate = 0;
  if (salesTaxType === 'areawide') {
    salestaxRate = AREAWIDE_SALES_TAX;
  } else if (salesTaxType === 'non-areawide') {
    salestaxRate = NON_AREAWIDE_SALES_TAX;
  }

  // Calculate grocery tax
  const grocerySalesTax = grocerySpending * salestaxRate;
  const totalGroceryCost = grocerySpending + grocerySalesTax;
  const groceryDifference = totalGroceryCost - grocerySpending;

  // Calculate marijuana tax (sales tax + marijuana specific tax)
  const marijuanaSalesTax = marijuanaSpending * salestaxRate;
  const marijuanaSpecificTax = includeMarijuanaTax
    ? marijuanaSpending * MARIJUANA_TAX_INCREASE
    : 0;
  const totalMarijuanaCost =
    marijuanaSpending + marijuanaSalesTax + marijuanaSpecificTax;
  const marijuanaDifference = totalMarijuanaCost - marijuanaSpending;

  // Calculate alcohol tax (sales tax + alcohol specific tax)
  const alcoholSalesTax = alcoholSpending * salestaxRate;
  const alcoholSpecificTax = includeAlcoholTax
    ? alcoholSpending * ALCOHOL_TAX
    : 0;
  const totalAlcoholCost =
    alcoholSpending + alcoholSalesTax + alcoholSpecificTax;
  const alcoholDifference = totalAlcoholCost - alcoholSpending;

  // Gravel tax (just a placeholder - no spending amount provided)
  const gravelTax = includeGravelTax
    ? 'Gravel tax applies at $0.25 per ton of gravel extraction'
    : null;

  // Calculate total cost
  const totalCost =
    propertyTax + totalGroceryCost + totalMarijuanaCost + totalAlcoholCost;

  // Calculate original annual spending and total difference
  // Original spending includes current property tax at base mill rate (12.022)
  const originalPropertyTax = propertyValue * (BASE_MILL_RATE / 1000);
  const originalAnnualSpending =
    originalPropertyTax + grocerySpending + marijuanaSpending + alcoholSpending;
  const totalCostDifference = totalCost - originalAnnualSpending;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tax Proposals Calculator
          </h1>
          <p className="mt-2 text-gray-600">
            Estimate your potential tax burden under proposed tax measures
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-6 rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Information
            </h2>

            {/* Property Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Property Value ($)
              </label>
              <input
                type="number"
                value={propertyValue || ''}
                onChange={(e) =>
                  setPropertyValue(parseFloat(e.target.value) || 0)
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            {/* Grocery Spending */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Annual Grocery Spending ($)
              </label>
              <input
                type="number"
                value={grocerySpending || ''}
                onChange={(e) =>
                  setGrocerySpending(parseFloat(e.target.value) || 0)
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            {/* Marijuana Spending */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Annual Marijuana Spending ($)
              </label>
              <input
                type="number"
                value={marijuanaSpending || ''}
                onChange={(e) =>
                  setMarijuanaSpending(parseFloat(e.target.value) || 0)
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            {/* Alcohol Spending */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Annual Alcohol Spending ($)
              </label>
              <input
                type="number"
                value={alcoholSpending || ''}
                onChange={(e) =>
                  setAlcoholSpending(parseFloat(e.target.value) || 0)
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            {/* Tax Selections */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Proposed Taxes
              </h3>

              {/* Sales Tax Selection (Mutually Exclusive) */}
              <fieldset className="mb-6">
                <legend className="mb-3 text-sm font-medium text-gray-700">
                  Sales Tax (Select One)
                </legend>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="salesTax"
                      value="none"
                      checked={salesTaxType === 'none'}
                      onChange={() => setSalesTaxType('none')}
                      className="h-4 w-4 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      No Additional Sales Tax
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="salesTax"
                      value="areawide"
                      checked={salesTaxType === 'areawide'}
                      onChange={() => setSalesTaxType('areawide')}
                      className="h-4 w-4 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      OR 26-032: Areawide Sales Tax (6.5%, Mill rate: 0)
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="salesTax"
                      value="non-areawide"
                      checked={salesTaxType === 'non-areawide'}
                      onChange={() => setSalesTaxType('non-areawide')}
                      className="h-4 w-4 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      OR 26-065: Non-Areawide Sales Tax (1.5%, $75,000 property
                      value exemption)
                    </span>
                  </label>
                </div>
              </fieldset>

              {/* Optional Taxes */}
              <fieldset className="space-y-3">
                <legend className="mb-3 text-sm font-medium text-gray-700">
                  Additional Taxes (Select Any)
                </legend>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeGravelTax}
                    onChange={(e) => setIncludeGravelTax(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    OR 26-058: Severance (Gravel) Tax ($0.25/ton)
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeMarijuanaTax}
                    onChange={(e) => setIncludeMarijuanaTax(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    OR 26-061: Marijuana Tax (5% increase from 5% to 10%)
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeAlcoholTax}
                    onChange={(e) => setIncludeAlcoholTax(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    OR 26-062: Alcohol Tax (up to 10%)
                  </span>
                </label>
              </fieldset>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4 rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-900">
              Estimated Tax Impact
            </h2>

            {/* Property Tax */}
            <div className="rounded-lg bg-blue-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Property Tax
                </span>
                <span className="text-lg font-bold text-blue-900">
                  {formatCurrency(propertyTax)}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-600">
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
              </p>
            </div>

            {/* Grocery Results */}
            <div className="rounded-lg bg-gray-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Groceries
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(totalGroceryCost)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">Original Amount</span>
                <span className="text-gray-700">
                  {formatCurrency(grocerySpending)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-red-600">
                <span>Tax Increase</span>
                <span>+{formatCurrency(groceryDifference)}</span>
              </div>
            </div>

            {/* Marijuana Results */}
            <div className="rounded-lg bg-gray-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Marijuana
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(totalMarijuanaCost)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">Original Amount</span>
                <span className="text-gray-700">
                  {formatCurrency(marijuanaSpending)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-red-600">
                <span>Tax Increase</span>
                <span>+{formatCurrency(marijuanaDifference)}</span>
              </div>
            </div>

            {/* Alcohol Results */}
            <div className="rounded-lg bg-gray-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Alcohol
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(totalAlcoholCost)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">Original Amount</span>
                <span className="text-gray-700">
                  {formatCurrency(alcoholSpending)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-red-600">
                <span>Tax Increase</span>
                <span>+{formatCurrency(alcoholDifference)}</span>
              </div>
            </div>

            {/* Gravel Tax Note */}
            {gravelTax && (
              <div className="rounded-lg bg-yellow-100 p-4 text-sm text-yellow-800">
                {gravelTax}
              </div>
            )}

            {/* Total Cost */}
            <div className="rounded-lg bg-green-100 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  Total Annual Costs
                </span>
                <span className="text-2xl font-bold text-green-900">
                  {formatCurrency(totalCost)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">Current Annual Tax Burden</span>
                <span className="text-gray-700">
                  {formatCurrency(originalAnnualSpending)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-red-600">
                <span>Difference with Proposed Taxes</span>
                <span>+{formatCurrency(totalCostDifference)}</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="border-t border-gray-200 pt-4">
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-xs font-semibold text-amber-900">
                  ⚠️ DISCLAIMER
                </p>
                <p className="mt-2 text-xs text-amber-800">
                  These calculations are speculative and may be incorrect. They
                  are intended for informational purposes only and do not
                  represent actual tax liability. Tax rates, exemptions, and
                  calculations may vary based on location, individual
                  circumstances, and other factors. For current property tax
                  information, visit{' '}
                  <a
                    href="https://myproperty.matsugov.us/mydetail.aspx?pID=88571"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-amber-900"
                  >
                    My Property
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
