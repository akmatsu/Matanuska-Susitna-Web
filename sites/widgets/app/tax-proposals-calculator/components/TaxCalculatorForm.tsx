import { NumberInput } from './NumberInput';
import { CheckboxInput } from './CheckboxInput';
import { RadioInput } from './RadioInput';
import { Button } from './Button';

interface TaxCalculatorFormProps {
  propertyValue: number;
  setPropertyValue: (v: number) => void;
  grocerySpending: number;
  setGrocerySpending: (v: number) => void;
  marijuanaSpending: number;
  setMarijuanaSpending: (v: number) => void;
  alcoholSpending: number;
  setAlcoholSpending: (v: number) => void;
  salesTaxType: 'areawide' | 'non-areawide' | 'none';
  setSalesTaxType: (v: 'areawide' | 'non-areawide' | 'none') => void;
  includeGravelTax: boolean;
  setIncludeGravelTax: (v: boolean) => void;
  includeMarijuanaTax: boolean;
  setIncludeMarijuanaTax: (v: boolean) => void;
  includeAlcoholTax: boolean;
  setIncludeAlcoholTax: (v: boolean) => void;
  onSubmit?: () => void;
}

export function TaxCalculatorForm({
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
  onSubmit,
}: TaxCalculatorFormProps) {
  return (
    <>
      <div className="space-y-4">
        {/* Assessed Property Value */}
        <NumberInput
          label="Assessed Property Value ($)"
          value={propertyValue}
          onChange={setPropertyValue}
          helpText={
            <>
              Leave blank if you don&apos;t own property. Find your assessed value on{' '}
              <a
                href="https://myproperty.matsugov.us/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-700"
              >
                MyProperty
              </a>
              .
            </>
          }
          placeholder="0"
        />

        {/* Goods/Services Spending */}
        <NumberInput
          label="Monthly spending on goods/services in the borough (including online orders, restaurants, and grocers) ($)"
          value={grocerySpending}
          onChange={setGrocerySpending}
          placeholder="0"
        />

        {/* Marijuana Spending */}
        <NumberInput
          label="Monthly Marijuana Spending ($)"
          value={marijuanaSpending}
          onChange={setMarijuanaSpending}
          placeholder="0"
        />

        {/* Alcohol Spending */}
        <NumberInput
          label="Monthly Alcohol Spending ($)"
          value={alcoholSpending}
          onChange={setAlcoholSpending}
          placeholder="0"
        />

        {/* Tax Selections */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Proposed Taxes
          </h3>

          {/* Sales Tax Selection (Mutually Exclusive) */}
          <RadioInput
            legend="Sales Tax (Select One)"
            name="salesTax"
            value={salesTaxType}
            onChange={(value) =>
              setSalesTaxType(value as 'areawide' | 'non-areawide' | 'none')
            }
            options={[
              {
                value: 'none',
                label: 'No Additional Sales Tax',
              },
              {
                value: 'areawide',
                label: 'OR 26-032: Areawide Sales Tax (6.5%, Mill rate: 0)',
              },
              {
                value: 'non-areawide',
                label:
                  'OR 26-065: Non-Areawide Sales Tax (1.5%, $75,000 property value exemption)',
              },
            ]}
          />

          {/* Optional Taxes */}
          <fieldset className="space-y-3">
            <legend className="mb-3 text-sm font-medium text-gray-700">
              Additional Taxes (Select Any)
            </legend>

            <CheckboxInput
              label="OR 26-058: Severance (Gravel) Tax ($0.25/ton)"
              checked={includeGravelTax}
              onChange={setIncludeGravelTax}
            />

            <CheckboxInput
              label="OR 26-061: Marijuana Tax (5% increase from 5% to 10%)"
              checked={includeMarijuanaTax}
              onChange={setIncludeMarijuanaTax}
            />

            <CheckboxInput
              label="OR 26-062: Alcohol Tax (up to 10%)"
              checked={includeAlcoholTax}
              onChange={setIncludeAlcoholTax}
            />
          </fieldset>
        </div>
      </div>

      {onSubmit && (
        <Button onClick={onSubmit} variant="primary" className="mt-4 sm:mt-6">
          Calculate Tax Impact
        </Button>
      )}
    </>
  );
}
