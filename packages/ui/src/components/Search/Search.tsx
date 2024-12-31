import { Field, Input, Label } from '@headlessui/react';
import { Button } from '../Button';

export interface SearchProps {
  name?: string;
  id?: string;
  className?: string;
  useIcon?: boolean;
  placeholder?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  defaultValue?: string;
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
      <Field className="flex items-center w-full shadow">
        <Label className="sr-only" htmlFor={id}>
          Search
        </Label>
        <Input
          className="border border-base rounded-l h-10 px-2 focus:outline-none focus:ring-4 focus:ring-blue-40v w-full"
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        <Button
          type="submit"
          className="rounded-l-none h-10 flex items-center justify-center"
        >
          {useIcon ? (
            <span className="iconify mdi--search size-6"></span>
          ) : (
            'Search'
          )}
        </Button>
      </Field>
    </form>
  );
}
