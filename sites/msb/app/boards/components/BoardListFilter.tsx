'use client';
import { LinkButton } from '@/components/static/LinkButton';

export function BoardsListFilter({
  types,
}: {
  types: { label: string; value: string }[];
}) {
  return (
    <div className="flex justify-center items-center gap-4 flex-wrap mt-4">
      {types.map((item) => (
        <LinkButton
          key={item.value}
          href={`?type=${item.value}`}
          className="text-sm"
          color="secondary"
          scroll={false}
        >
          {item.label}
        </LinkButton>
      ))}
      <LinkButton
        color="secondary"
        href={`search?${types
          .map(
            (item, index) =>
              `pages[refinementList][type][${index}]=${item.label.toLowerCase()}`,
          )
          .join('&')}`}
      >
        Search
      </LinkButton>
    </div>
  );
}
