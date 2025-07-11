import { ComponentProps } from 'react';
import { Link } from './Link';

export function CodeLink({
  code,
  ...props
}: {
  /** Example XX.XX.XX or XX.XX */
  code: string;
} & Omit<ComponentProps<typeof Link>, 'href'>) {
  const parts = code.split('.');
  const title = parts[0].length === 2 ? parts[0] : `0${parts[0]}`;
  const chapter = parts[1]
    ? parts[1].length === 2
      ? parts[1]
      : `0${parts[1]}`
    : undefined;

  return (
    <Link
      href={`https://www.codepublishing.com/AK/MatanuskaSusitnaBorough/#!/MatanuskaSusitnaBorough${title}/MatanuskaSusitnaBorough${title}${chapter || ''}.html#${code}`}
      {...props}
    />
  );
}
