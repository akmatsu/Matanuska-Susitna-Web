'use client';
import { Button } from '@matsugov/ui';
import { TextField } from '@matsugov/ui/TextField';

export function BoardsListFilter({
  types,
  currentType,
  ...props
}: {
  types: { label: string; value: string }[];
  currentType?: string;
  onSearch: (search: string) => void;
  onTypeChange: (type?: string) => void;
}) {
  function toggleType(value: string) {
    if (currentType === value) {
      props.onTypeChange(undefined);
    } else {
      props.onTypeChange(value);
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {types.map((item) => (
          <Button
            key={item.value}
            className="text-sm"
            color="secondary"
            onClick={() => toggleType(item.value)}
            active={currentType === item.value}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="w-full">
        <TextField
          id="search-boards"
          placeholder="Search..."
          className="w-full"
          onChange={(e) => props.onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
