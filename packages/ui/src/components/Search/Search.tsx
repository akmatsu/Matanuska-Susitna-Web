import { Button } from '../Button';
import { TextField } from '../TextField';
import clsx from 'clsx';

export interface SearchProps {
  name?: string;
  id?: string;
  className?: string;
  useIcon?: boolean;
  placeholder?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  defaultValue?: string;
  big?: boolean;
}

export function Search({
  name = 'search',
  id = 'search field',
  className,
  useIcon = false,
  placeholder = 'Search...',
  onSubmit,
  defaultValue,
}: SearchProps) {
  return (
    <form role="search" className={className} onSubmit={onSubmit}>
      <div className="flex items-center w-full shadow-md">
        <TextField
          label="Search"
          showLabel={false}
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          rounded="left"
          fill={true}
          shadow={false}
        />
        <Button
          type="submit"
          className={clsx({ 'h-10': !useIcon, 'size-10': useIcon })}
          rounded="right"
          shadow={false}
          icon={useIcon}
        >
          {useIcon ? (
            <span className="iconify mdi--search size-6"></span>
          ) : (
            'Search'
          )}
        </Button>
      </div>
    </form>
  );
}
