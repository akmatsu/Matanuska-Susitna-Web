'use client';

import { useState } from 'react';
import { TaxCalculatorForm } from './TaxCalculatorForm';
import { TaxCalculatorResults } from './TaxCalculatorResults';
import { useTaxCalculator } from '../hooks/useTaxCalculator';
import type { SelectedProperty } from '../hooks/useTaxCalculator';
import { Card } from './Card/Card';
import { CardHeading } from './Card/CardHeading';

export const metadata = {
  title: 'MSB - Tax Proposals Calculator',
  description:
    "Estimate your potential tax burden and impacts to the Borough's revenue under proposed tax measures",
};

export function Calculator() {
  const [selectedProperties, setSelectedProperties] = useState<
    SelectedProperty[]
  >([]);

  const {
    // Input values
    propertyValue,
    grocerySpending,
    marijuanaSpending,
    alcoholSpending,
    salesTaxType,
    nonAreawideTaxableShare,
    includeGravelTax,
    includeMarijuanaTax,
    includeAlcoholTax,
    showResults,

    // Setters
    setGrocerySpending,
    setMarijuanaSpending,
    setAlcoholSpending,
    setSalesTaxType,
    setNonAreawideTaxableShare,
    setIncludeGravelTax,
    setIncludeMarijuanaTax,
    setIncludeAlcoholTax,
    setShowResults,

    // Calculated values
    groceryDifference,
    annualGrocerySpending,
    annualMarijuanaSpending,
    marijuanaDifference,
    annualAlcoholSpending,
    alcoholDifference,
    propertyTax,
    originalPropertyTax,
    propertyTaxDifference,
    totalCostDifference,
  } = useTaxCalculator(selectedProperties);

  const handleReset = () => {
    setSelectedProperties([]);
    setGrocerySpending(0);
    setMarijuanaSpending(0);
    setAlcoholSpending(0);
    setSalesTaxType('none');
    setNonAreawideTaxableShare(100);
    setIncludeGravelTax(false);
    setIncludeMarijuanaTax(false);
    setIncludeAlcoholTax(false);
    setShowResults(false);
  };

  const formProps = {
    selectedProperties,
    onPropertiesChange: setSelectedProperties,
    grocerySpending,
    setGrocerySpending,
    marijuanaSpending,
    setMarijuanaSpending,
    alcoholSpending,
    setAlcoholSpending,
    salesTaxType,
    setSalesTaxType,
    nonAreawideTaxableShare,
    setNonAreawideTaxableShare,
    includeGravelTax,
    setIncludeGravelTax,
    includeMarijuanaTax,
    setIncludeMarijuanaTax,
    includeAlcoholTax,
    setIncludeAlcoholTax,
  };

  const resultsProps = {
    salesTaxType,
    nonAreawideTaxableShare,
    annualGrocerySpending,
    groceryDifference,
    annualMarijuanaSpending,
    marijuanaDifference,
    annualAlcoholSpending,
    alcoholDifference,
    propertyTax,
    originalPropertyTax,
    propertyTaxDifference,
    totalCostDifference,
    includeGravelTax,
    includeMarijuanaTax,
    includeAlcoholTax,
  };

  return (
    <>
      {/* Mobile Toggle View */}
      <div className="md:hidden">
        {!showResults ? (
          // FORM VIEW
          <Card>
            <CardHeading className="mb-3 sm:mb-4">Your Information</CardHeading>
            <TaxCalculatorForm
              {...formProps}
              onReset={handleReset}
              onSubmit={() => setShowResults(true)}
            />
          </Card>
        ) : (
          // RESULTS VIEW
          <Card className="space-y-3 sm:space-y-4">
            <CardHeading>Estimated Tax Impact</CardHeading>
            <TaxCalculatorResults
              {...resultsProps}
              onEdit={() => setShowResults(false)}
            />
          </Card>
        )}
      </div>

      {/* Desktop Two-Column View */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-6">
        {/* Left Column - Form */}
        <Card>
          <CardHeading className="mb-4">Your Information</CardHeading>
          <TaxCalculatorForm {...formProps} onReset={handleReset} />
        </Card>

        {/* Right Column - Results */}
        <Card className="space-y-3 sm:space-y-4">
          <CardHeading>Estimated Tax Impact</CardHeading>
          <TaxCalculatorResults {...resultsProps} />
        </Card>
      </div>
    </>
  );
}
