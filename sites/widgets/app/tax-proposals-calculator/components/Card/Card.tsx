import { cn } from '@matsugov/ui/lib';

export function Card(props: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn('rounded-lg border bg-white p-3 sm:p-6', props.className)}
    >
      {props.children}
    </div>
  );
}
