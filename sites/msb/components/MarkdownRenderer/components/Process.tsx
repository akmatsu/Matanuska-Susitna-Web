import { ReactNode } from 'react';

export function Process({ children }: { children: ReactNode }) {
  return <ol className="usa-process-list">{children}</ol>;
}
