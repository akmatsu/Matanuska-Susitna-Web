import { cn } from '@matsugov/ui/lib';

export function Notice(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `print-preserve-colors flex items-start gap-2 border-2 border-yellow-500 bg-yellow-100 px-2 py-1 text-black`,
        props.className,
      )}
    >
      <span
        className="icon-[mdi--alert] mt-0.5 size-5 shrink-0 text-yellow-700"
        aria-hidden="true"
      />
      <div>{props.children}</div>
    </div>
  );
}
