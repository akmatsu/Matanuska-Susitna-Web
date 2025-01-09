import clsx from 'clsx';

export function TwoColumnLayout(props: {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  leftCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rightCols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16;
}) {
  return (
    <div
      className={clsx('grid grid-cols-12', {
        'gap-0': !props.gap,
        'gap-1': props.gap === 1,
        'gap-2': props.gap === 2,
        'gap-3': props.gap === 3,
        'gap-4': props.gap === 4,
        'gap-5': props.gap === 5,
        'gap-6': props.gap === 6,
        'gap-7': props.gap === 7,
        'gap-8': props.gap === 8,
        'gap-9': props.gap === 9,
        'gap-10': props.gap === 10,
        'gap-11': props.gap === 11,
        'gap-12': props.gap === 12,
        'gap-13': props.gap === 13,
        'gap-14': props.gap === 14,
        'gap-15': props.gap === 15,
        'gap-16': props.gap === 16,
      })}
    >
      <div
        className={clsx('col-span-12', {
          'md:col-span-12': props.leftCols === 12,
          'md:col-span-11': props.leftCols === 11,
          'md:col-span-10': props.leftCols === 10,
          'md:col-span-9': props.leftCols === 9,
          'md:col-span-8': !props.leftCols || props.leftCols === 8,
          'md:col-span-7': props.leftCols === 7,
          'md:col-span-6': props.leftCols === 6,
          'md:col-span-5': props.leftCols === 5,
          'md:col-span-4': props.leftCols === 4,
          'md:col-span-3': props.leftCols === 3,
          'md:col-span-2': props.leftCols === 2,
          'md:col-span-1': props.leftCols === 1,
        })}
      >
        {props.leftColumn}
      </div>
      <div
        className={clsx('col-span-12', {
          'md:col-span-12': props.rightCols === 12,
          'md:col-span-11': props.rightCols === 11,
          'md:col-span-10': props.rightCols === 10,
          'md:col-span-9': props.rightCols === 9,
          'md:col-span-8': props.rightCols === 8,
          'md:col-span-7': props.rightCols === 7,
          'md:col-span-6': props.rightCols === 6,
          'md:col-span-5': props.rightCols === 5,
          'md:col-span-4': !props.rightCols || props.rightCols === 4,
          'md:col-span-3': props.rightCols === 3,
          'md:col-span-2': props.rightCols === 2,
          'md:col-span-1': props.rightCols === 1,
        })}
      >
        {props.rightColumn}
      </div>
    </div>
  );
}
