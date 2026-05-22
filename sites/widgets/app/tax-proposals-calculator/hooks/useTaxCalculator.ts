'use client';

import { useState } from 'react';

// Tax rates constants
const TAX_RATES = {
  BOROUGH_MILL_RATE: 8.748, // borough areawide mill rate — the portion removed when OR 26-032 applies
  DEFAULT_TOTAL_MILL_RATE: 12.022, // fallback total mill rate when no property is selected
  AREAWIDE_SALES_TAX: 0.065, // 6.5%
  NON_AREAWIDE_SALES_TAX: 0.015, // 1.5%
  MARIJUANA_TAX_INCREASE: 0.05, // increase from 5% to 10% (so 5% additional)
  ALCOHOL_TAX: 0.1, // up to 10%
} as const;

export type SelectedProperty = {
  parcelId: string;
  taxId: string;
  address: string | null;
  owner: string | null;
  appraisedValue: number | null;
  taxableValue: number | null;
  millRate: number | null;
  disabledVet: number;
  senior: number;
};

export interface TaxCalculatorState {
  // Input values
  propertyValue: number;
  propertyExemptions: number;
  grocerySpending: number;
  marijuanaSpending: number;
  alcoholSpending: number;
  salesTaxType: 'areawide' | 'non-areawide' | 'none';
  nonAreawideTaxableShare: number;
  includeGravelTax: boolean;
  includeMarijuanaTax: boolean;
  includeAlcoholTax: boolean;
  showResults: boolean;

  // Setters
  setPropertyValue: (value: number) => void;
  setPropertyMillRate: (value: number | null) => void;
  setPropertyExemptions: (value: number) => void;
  setGrocerySpending: (value: number) => void;
  setMarijuanaSpending: (value: number) => void;
  setAlcoholSpending: (value: number) => void;
  setSalesTaxType: (value: 'areawide' | 'non-areawide' | 'none') => void;
  setNonAreawideTaxableShare: (value: number) => void;
  setIncludeGravelTax: (value: boolean) => void;
  setIncludeMarijuanaTax: (value: boolean) => void;
  setIncludeAlcoholTax: (value: boolean) => void;
  setShowResults: (value: boolean) => void;

  // Calculated values
  effectiveMillRate: number;
  taxablePropertyValue: number;
  propertyTax: number;
  salestaxRate: number;
  annualGrocerySpending: number;
  grocerySalesTax: number;
  totalGroceryCost: number;
  groceryDifference: number;
  annualMarijuanaSpending: number;
  marijuanaSalesTax: number;
  marijuanaSpecificTax: number;
  totalMarijuanaCost: number;
  marijuanaDifference: number;
  annualAlcoholSpending: number;
  alcoholSalesTax: number;
  alcoholSpecificTax: number;
  totalAlcoholCost: number;
  alcoholDifference: number;
  totalCost: number;
  originalPropertyTax: number;
  originalAnnualSpending: number;
  totalCostDifference: number;
  propertyTaxDifference: number;
}

export function useTaxCalculator(
  selectedProperties: SelectedProperty[] = [],
): TaxCalculatorState {
  // Input state
  const [grocerySpending, setGrocerySpending] = useState<number>(0);
  const [marijuanaSpending, setMarijuanaSpending] = useState<number>(0);
  const [alcoholSpending, setAlcoholSpending] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);

  // Tax selections
  const [salesTaxType, setSalesTaxType] = useState<
    'areawide' | 'non-areawide' | 'none'
  >('none');
  const [nonAreawideTaxableShare, setNonAreawideTaxableShare] =
    useState<number>(100);
  const [includeGravelTax, setIncludeGravelTax] = useState(false);
  const [includeMarijuanaTax, setIncludeMarijuanaTax] = useState(false);
  const [includeAlcoholTax, setIncludeAlcoholTax] = useState(false);

  // Aggregate values from selected properties
  const propertyValue = selectedProperties.reduce(
    (sum, p) => sum + (p.taxableValue ?? 0),
    0,
  );
  const propertyExemptions = 0;

  // Check if any selected property has disabled vet or senior exemption
  const hasPropertyExemption = selectedProperties.some(
    (p) => p.disabledVet > 0 || p.senior > 0,
  );

  // Determine effective sales tax type: if property has exemption, don't apply areawide
  const effectiveSalesTaxType =
    hasPropertyExemption && salesTaxType === 'areawide' ? 'none' : salesTaxType;

  // Calculate per-property taxes and sum them
  // selectedSalesTaxType: original user selection (used for mill rate reduction)
  // effectiveSalesTaxType: may be modified for sales tax if exemptions present (used for $75k exemption)
  const calculatePropertyTax = (
    value: number,
    millRate: number | null,
    selectedSalesTaxType: 'areawide' | 'non-areawide' | 'none',
  ): number => {
    const rate = millRate ?? TAX_RATES.DEFAULT_TOTAL_MILL_RATE;
    let effectiveMillRate = rate;

    // Apply OR 26-032: remove borough mill rate for areawide (based on original selection)
    // This applies even if sales tax is skipped due to exemption
    if (selectedSalesTaxType === 'areawide') {
      effectiveMillRate = Math.max(0, rate - TAX_RATES.BOROUGH_MILL_RATE);
    }

    // Apply OR 26-065: additional $75k exemption for non-areawide (based on effective selection)
    let taxableValue = value;
    if (effectiveSalesTaxType === 'non-areawide') {
      taxableValue = Math.max(0, value - 75000);
    }

    return Math.max(0, taxableValue * (effectiveMillRate / 1000));
  };

  // Calculate property tax as sum of per-property taxes
  let propertyTax = 0;
  let originalPropertyTax = 0;

  if (selectedProperties.length > 0) {
    selectedProperties.forEach((prop) => {
      if (prop.taxableValue !== null && prop.millRate !== null) {
        const value = prop.taxableValue;
        const rate = prop.millRate;

        // Tax with effective mill rate (considering OR 26-032)
        propertyTax += calculatePropertyTax(value, rate, salesTaxType);

        // Original tax at full mill rate (for comparison)
        originalPropertyTax += value * (rate / 1000);
      }
    });
  }

  // Determine applicable sales tax rate (use effective type, not selected type)
  let salestaxRate = 0;
  if (effectiveSalesTaxType === 'areawide') {
    salestaxRate = TAX_RATES.AREAWIDE_SALES_TAX;
  } else if (effectiveSalesTaxType === 'non-areawide') {
    const normalizedShare = Math.min(100, Math.max(0, nonAreawideTaxableShare));
    salestaxRate = TAX_RATES.NON_AREAWIDE_SALES_TAX * (normalizedShare / 100);
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
    ? annualMarijuanaSpending * TAX_RATES.MARIJUANA_TAX_INCREASE
    : 0;
  const totalMarijuanaCost =
    annualMarijuanaSpending + marijuanaSalesTax + marijuanaSpecificTax;
  const marijuanaDifference = totalMarijuanaCost - annualMarijuanaSpending;

  // Calculate alcohol tax (sales tax + alcohol specific tax)
  const alcoholSalesTax = annualAlcoholSpending * salestaxRate;
  const alcoholSpecificTax = includeAlcoholTax
    ? annualAlcoholSpending * TAX_RATES.ALCOHOL_TAX
    : 0;
  const totalAlcoholCost =
    annualAlcoholSpending + alcoholSalesTax + alcoholSpecificTax;
  const alcoholDifference = totalAlcoholCost - annualAlcoholSpending;

  // Calculate total cost
  const totalCost =
    propertyTax + totalGroceryCost + totalMarijuanaCost + totalAlcoholCost;

  const originalAnnualSpending =
    originalPropertyTax +
    annualGrocerySpending +
    annualMarijuanaSpending +
    annualAlcoholSpending;
  const totalCostDifference = totalCost - originalAnnualSpending;

  const propertyTaxDifference = propertyTax - originalPropertyTax;

  return {
    // Input values
    propertyValue,
    propertyExemptions,
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
    setPropertyValue: () => {}, // No-op: values derived from selectedProperties
    setPropertyMillRate: () => {}, // No-op: values derived from selectedProperties
    setPropertyExemptions: () => {}, // No-op: values derived from selectedProperties
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
    effectiveMillRate: 0, // No longer used in per-property calculations
    taxablePropertyValue: propertyValue,
    propertyTax,
    salestaxRate,
    annualGrocerySpending,
    grocerySalesTax,
    totalGroceryCost,
    groceryDifference,
    annualMarijuanaSpending,
    marijuanaSalesTax,
    marijuanaSpecificTax,
    totalMarijuanaCost,
    marijuanaDifference,
    annualAlcoholSpending,
    alcoholSalesTax,
    alcoholSpecificTax,
    totalAlcoholCost,
    alcoholDifference,
    totalCost,
    originalPropertyTax,
    originalAnnualSpending,
    totalCostDifference,
    propertyTaxDifference,
  };
}
