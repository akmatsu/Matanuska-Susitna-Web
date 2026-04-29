import { Suspense } from 'react';
import { TaxMapTableBody } from './TaxMapTableBody';

export function TaxMapTable() {
  return (
    <Suspense fallback={<div>Loading tax maps...</div>}>
      <TaxMapTableBody />
    </Suspense>
  );
}
