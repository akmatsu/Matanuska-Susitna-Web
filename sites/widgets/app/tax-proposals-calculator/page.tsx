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

  // Convert monthly spending to annual
  const annualGrocerySpending = grocerySpending * 12;
  const annualMarijuanaSpending = marijuanaSpending * 12;
  const annualAlcoholSpending = alcoholSpending * 12;

  // Calculate grocery tax
  const grocerySalesTax = annualGrocerySpending * salestaxRate;
  const totalGroceryCost = annualGrocerySpending + grocerySalesTax;
  const groceryDifference = totalGroceryCost - annualGrocerySpending;

  // Calculate marijuana tax (sales tax + marijuana specific tax)
  const marijuanaSalesTax = annualMarijuanaSpending * salestaxRate;
  const marijuanaSpecificTax = includeMarijuanaTax
    ? annualMarijuanaSpending * MARIJUANA_TAX_INCREASE
    : 0;
  const totalMarijuanaCost =
    annualMarijuanaSpending + marijuanaSalesTax + marijuanaSpecificTax;
  const marijuanaDifference = totalMarijuanaCost - annualMarijuanaSpending;

  // Calculate alcohol tax (sales tax + alcohol specific tax)
  const alcoholSalesTax = annualAlcoholSpending * salestaxRate;
  const alcoholSpecificTax = includeAlcoholTax
    ? annualAlcoholSpending * ALCOHOL_TAX
    : 0;
  const totalAlcoholCost =
    annualAlcoholSpending + alcoholSalesTax + alcoholSpecificTax;
  const alcoholDifference = totalAlcoholCost - annualAlcoholSpending;

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
    originalPropertyTax +
    annualGrocerySpending +
    annualMarijuanaSpending +
    annualAlcoholSpending;
  const totalCostDifference = totalCost - originalAnnualSpending;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Tax Proposals Calculator
          </h1>
          <p className="mt-2 text-gray-600">
            Estimate your potential tax burden under proposed tax measures
          </p>
        </div>

        {/* Main Content */}
        <div>
          <div className="mb-4 rounded-lg bg-yellow-50 p-4">
            <p className="text-xs font-semibold">⚠️ DISCLAIMER</p>
            <p className="mt-2 text-xs">
              These calculations are speculative and may be incorrect. They are
              intended for informational purposes only and do not represent
              actual tax liability. Tax rates, exemptions, and calculations may
              vary based on location, individual circumstances, and other
              factors. For current property tax information, visit{' '}
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
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <div className="space-y-4 rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Information
              </h2>

              {/* Assessed Property Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assessed Property Value ($)
                </label>
                <p className="mb-1 text-xs text-gray-500">
                  Leave blank if you don&apos;t own property
                </p>
                <input
                  type="number"
                  min="0"
                  value={propertyValue || ''}
                  onChange={(e) =>
                    setPropertyValue(
                      Math.max(0, parseFloat(e.target.value) || 0),
                    )
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="0"
                />
              </div>

              {/* Grocery Spending */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Grocery Spending ($)
                </label>
                <input
                  type="number"
                  min="0"
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
                  Monthly Marijuana Spending ($)
                </label>
                <input
                  type="number"
                  min="0"
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
                  Monthly Alcohol Spending ($)
                </label>
                <input
                  type="number"
                  min="0"
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
                        OR 26-065: Non-Areawide Sales Tax (1.5%, $75,000
                        property value exemption)
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
              <div className="rounded-lg bg-sky-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Property Tax
                  </span>
                  <span className="text-lg font-bold text-blue-900">
                    {formatCurrency(propertyTax)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Based on {formatCurrency(taxablePropertyValue)} taxable
                  property value at {effectiveMillRate} mill rate
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
                <p className="mt-3 text-xs text-blue-800">
                  ⚠️ These property tax calculations are speculative and may be
                  incorrect. For current property tax information, visit{' '}
                  <a
                    href="https://myproperty.matsugov.us/mydetail.aspx?pID=88571"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline hover:text-blue-900"
                  >
                    My Property
                  </a>
                  .
                </p>
              </div>

              {/* Grocery Results */}
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">Groceries</span>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">Before</div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(annualGrocerySpending)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">After</div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(totalGroceryCost)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span className="font-semibold">Tax Increase</span>
                  <span className="text-lg font-bold">
                    +{formatCurrency(groceryDifference)}
                  </span>
                </div>
              </div>

              {/* Marijuana Results */}
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">Marijuana</span>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">Before</div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(annualMarijuanaSpending)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">After</div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(totalMarijuanaCost)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span className="font-semibold">Tax Increase</span>
                  <span className="text-lg font-bold">
                    +{formatCurrency(marijuanaDifference)}
                  </span>
                </div>
              </div>

              {/* Alcohol Results */}
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">Alcohol</span>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">Before</div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(annualAlcoholSpending)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">After</div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(totalAlcoholCost)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span className="font-semibold">Tax Increase</span>
                  <span className="text-lg font-bold">
                    +{formatCurrency(alcoholDifference)}
                  </span>
                </div>
              </div>

              {/* Total Cost */}
              <div className="rounded-lg bg-green-50 p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    Total Annual Costs
                  </span>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">Before</div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(originalAnnualSpending)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">After</div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(totalCost)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span className="font-semibold">Total Difference</span>
                  <span className="text-xl font-bold">
                    {totalCostDifference >= 0 ? '+' : ''}
                    {formatCurrency(totalCostDifference)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Disclaimer */}
        </div>
      </div>
    </div>
  );
}
