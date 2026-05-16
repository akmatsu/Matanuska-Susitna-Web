export default function TaxProposalsCalculatorLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 p-2 text-sm text-gray-700 sm:p-6">
      <div className="mx-auto max-w-7xl">{props.children}</div>
    </div>
  );
}
