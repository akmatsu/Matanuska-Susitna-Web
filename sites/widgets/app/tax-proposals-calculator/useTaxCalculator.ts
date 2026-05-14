'use client';

import { useState } from 'react';

// Tax rates constants
const TAX_RATES = {
  BASE_MILL_RATE: 12.022, // property tax mill rate
  AREAWIDE_SALES_TAX: 0.065, // 6.5%
  NON_AREAWIDE_SALES_TAX: 0.015, // 1.5%
  MARIJUANA_TAX_INCREASE: 0.05, // increase from 5% to 10% (so 5% additional)
  ALCOHOL_TAX: 0.1, // up to 10%
} as const;

export interface TaxCalculatorState {
  // Input values
  propertyValue: number;
  grocerySpending: number;
  marijuanaSpending: number;
  alcoholSpending: number;
  salesTaxType: 'areawide' | 'non-areawide' | 'none';
  includeGravelTax: boolean;
  includeMarijuanaTax: boolean;
  includeAlcoholTax: boolean;
  showResults: boolean;

  // Setters
  setPropertyValue: (value: number) => void;
  setGrocerySpending: (value: number) => void;
  setMarijuanaSpending: (value: number) => void;
  setAlcoholSpending: (value: number) => void;
  setSalesTaxType: (value: 'areawide' | 'non-areawide' | 'none') => void;
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
}

export function useTaxCalculator(): TaxCalculatorState {
  // Input state
  const [propertyValue, setPropertyValue] = useState<number>(0);
  const [grocerySpending, setGrocerySpending] = useState<number>(0);
  const [marijuanaSpending, setMarijuanaSpending] = useState<number>(0);
  const [alcoholSpending, setAlcoholSpending] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);

  // Tax selections
  const [salesTaxType, setSalesTaxType] = useState<
    'areawide' | 'non-areawide' | 'none'
  >('none');
  const [includeGravelTax, setIncludeGravelTax] = useState(false);
  const [includeMarijuanaTax, setIncludeMarijuanaTax] = useState(false);
  const [includeAlcoholTax, setIncludeAlcoholTax] = useState(false);

  // Determine mill rate based on areawide sales tax selection
  const effectiveMillRate =
    salesTaxType === 'areawide' ? 0 : TAX_RATES.BASE_MILL_RATE;

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
    salestaxRate = TAX_RATES.AREAWIDE_SALES_TAX;
  } else if (salesTaxType === 'non-areawide') {
    salestaxRate = TAX_RATES.NON_AREAWIDE_SALES_TAX;
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

  // Calculate original annual spending and total difference
  // Original spending includes current property tax at base mill rate (12.022)
  const originalPropertyTax = propertyValue * (TAX_RATES.BASE_MILL_RATE / 1000);
  const originalAnnualSpending =
    originalPropertyTax +
    annualGrocerySpending +
    annualMarijuanaSpending +
    annualAlcoholSpending;
  const totalCostDifference = totalCost - originalAnnualSpending;

  return {
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
  };
}
