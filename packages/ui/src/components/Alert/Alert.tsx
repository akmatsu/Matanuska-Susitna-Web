import { ReactNode } from 'react';
import clsx from 'clsx';

export function Alert({
  title,
  type = 'info',
  children,
  hideIcon = false,
  slim = false,
}: {
  title?: string;
  type?: 'info' | 'warning' | 'success' | 'error' | 'emergency';
  children?: ReactNode;
  hideIcon?: boolean;
  slim?: boolean;
}) {
  return (
    <div
      className={clsx('border-l-8', {
        'border-info bg-info-lighter': type === 'info',
        'border-warning bg-warning-lighter': type === 'warning',
        'border-success bg-success-lighter': type === 'success',
        'border-error bg-error-lighter': type === 'error',
        'border-emergency bg-emergency text-white': type === 'emergency',
      })}
    >
      <div className={clsx('flex', { 'px-5 py-4': !slim, 'px-5 py-2': slim })}>
        {!hideIcon && (
          <span
            className={clsx('iconify mr-2', {
              'size-8': !!title,
              'size-6': !title,
              '-mt-1': !!title,
              'icon-[mdi--information]': type === 'info',
              'icon-[mdi--alert]': type === 'warning',
              'icon-[mdi--check-circle]': type === 'success',
              'icon-[mdi--alert-circle]': type === 'error',
              'icon-[mdi--alert-octagon]': type === 'emergency',
            })}
          ></span>
        )}
        <div>
          {title && (
            <h4 className="mb-2 text-xl leading-none font-bold">{title}</h4>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
