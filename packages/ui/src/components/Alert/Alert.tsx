import clsx from 'clsx';
import { AlertProps } from './types';

export function Alert({ status = 'info', role: r, ...props }: AlertProps) {
  const role = r
    ? r
    : status === 'danger' || status === 'emergency'
      ? 'alert'
      : 'status';

  return (
    <div
      role={role}
      className={clsx('container border-l-8 ', {
        'bg-cyan-5 border-l-cyan-30v': status === 'info',
        'bg-yellow-5 border-l-gold-20v': status === 'warning',
        'bg-green-cool-5 border-l-green-cool-40v': status === 'success',
        'bg-red-warm-10 border-l-red-warm-50v': status === 'danger',
        'bg-red-warm-60v border-l-red-warm-60v text-white':
          status === 'emergency',
      })}
    >
      <div className="py-4 pl-12 pr-4 desktop:px-16 relative max-w-5xl mx-auto">
        <div className="absolute left-2 desktop:left-6 top-3">
          <span
            className={clsx('size-8', {
              'icon-[bi--info-circle-fill]': status === 'info',
              'icon-[bi--check-circle-fill]': status === 'success',
              'icon-[bi--exclamation-triangle-fill]': status === 'warning',
              'icon-[bi--exclamation-circle-fill]':
                status === 'danger' || status === 'emergency',
            })}
          ></span>
        </div>
        <h4 className="text-2xl font-bold mb-2 leading-none">{props.title}</h4>
        <p className="leading-normal">{props.message}</p>
      </div>
    </div>
  );
}
