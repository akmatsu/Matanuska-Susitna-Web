import clsx from 'clsx';

export function Tooltip({
  children,
  content,
  className,
  anchor = 'top',
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  anchor?: 'top' | 'bottom' | 'left' | 'right';
}) {
  return (
    <span className="relative inline-block group">
      {children}
      <div
        className={clsx(
          // base styles
          'w-max max-w-3xs scale-0 opacity-0  bg-gray-900 text-white text-sm px-3 py-1 rounded shadow-md',

          // tooltip positioning
          'absolute',
          {
            'left-1/2 -translate-x-1/2':
              anchor === 'top' || anchor === 'bottom',
          },
          {
            'top-1/2 -translate-y-1/2': anchor === 'left' || anchor === 'right',
          },
          { 'bottom-full mb-2': anchor === 'top' },
          { 'top-full mt-2': anchor === 'bottom' },
          { 'right-full mr-2': anchor === 'left' },
          { 'left-full ml-2': anchor === 'right' },

          // hover behavior
          'group-hover:scale-100 group-hover:opacity-100 transition transform',
          className,
        )}
      >
        {content}
      </div>
    </span>
  );
}
