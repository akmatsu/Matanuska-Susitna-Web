import { ProcessList } from '@matsugov/ui/ProcessList';
import { ReactNode } from 'react';

export function Process({ children }: { children: ReactNode }) {
  return <ProcessList>{children}</ProcessList>;
}
