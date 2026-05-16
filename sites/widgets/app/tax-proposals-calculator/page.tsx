import { Calculator } from './components/Calculator';
import { PageHeader } from './components/PageHeader';

export const metadata = {
  title: 'MSB - Tax Proposals Calculator',
  description:
    "Estimate your potential tax burden and impacts to the Borough's revenue under proposed tax measures",
};

export default function TaxProposalsCalculatorPage() {
  return (
    <main>
      <PageHeader
        title="Tax Proposals Calculator"
        description="Estimate your potential tax burden under proposed tax measures"
      />
      <Calculator />
    </main>
  );
}
