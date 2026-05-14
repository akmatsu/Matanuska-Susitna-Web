'use client';

import { TaxCalculatorForm } from './components/TaxCalculatorForm';
import { TaxCalculatorResults } from './components/TaxCalculatorResults';
import { useTaxCalculator } from './hooks/useTaxCalculator';

export default function TaxProposalsCalculatorPage() {
  const {
    // Input values
    propertyValue,
    grocerySpending,
    marijuanaSpending,
    alcoholSpending,
    salesTaxType,
    includeGravelTax,
    includeMarijuanaTax,
    includeAlcoholTax,
    showResults,

    // Setters
    setPropertyValue,
    setGrocerySpending,
    setMarijuanaSpending,
    setAlcoholSpending,
    setSalesTaxType,
    setIncludeGravelTax,
    setIncludeMarijuanaTax,
    setIncludeAlcoholTax,
    setShowResults,

    // Calculated values
    effectiveMillRate,
    taxablePropertyValue,
    propertyTax,
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
  } = useTaxCalculator();

  const formProps = {
    propertyValue,
    setPropertyValue,
    grocerySpending,
    setGrocerySpending,
    marijuanaSpending,
    setMarijuanaSpending,
    alcoholSpending,
    setAlcoholSpending,
    salesTaxType,
    setSalesTaxType,
    includeGravelTax,
    setIncludeGravelTax,
    includeMarijuanaTax,
    setIncludeMarijuanaTax,
    includeAlcoholTax,
    setIncludeAlcoholTax,
  };

  const resultsProps = {
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
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Tax Proposals Calculator
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Estimate your potential tax burden under proposed tax measures
          </p>
        </div>

        {/* Mobile Toggle View */}
        <div className="md:hidden">
          {!showResults ? (
            // FORM VIEW
            <div className="rounded-lg bg-white p-3 shadow sm:p-6">
              <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4 sm:text-xl">
                Your Information
              </h2>
              <TaxCalculatorForm
                {...formProps}
                onSubmit={() => setShowResults(true)}
              />
            </div>
          ) : (
            // RESULTS VIEW
            <div className="space-y-3 rounded-lg bg-white p-3 shadow sm:space-y-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                Estimated Tax Impact
              </h2>
              <TaxCalculatorResults
                {...resultsProps}
                onEdit={() => setShowResults(false)}
              />
            </div>
          )}
        </div>

        {/* Desktop Two-Column View */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-6">
          {/* Left Column - Form */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 sm:text-xl">
              Your Information
            </h2>
            <TaxCalculatorForm {...formProps} />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-4 rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Estimated Tax Impact
            </h2>
            <TaxCalculatorResults {...resultsProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
