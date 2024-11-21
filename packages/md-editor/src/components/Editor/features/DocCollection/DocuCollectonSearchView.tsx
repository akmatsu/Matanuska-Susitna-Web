import React, { useEffect, useRef, useState } from 'react';
import { tooltipFactory, TooltipProvider } from '@milkdown/kit/plugin/tooltip';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useInstance } from '@milkdown/react';
import { NodeSelection } from '@milkdown/kit/prose/state';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo';

export function DocCollectionSearchView() {
  const content = useRef<HTMLDivElement>();
  const tooltipProvider = useRef<TooltipProvider>();
  const { view, prevState } = usePluginViewContext();
  const [loading] = useInstance();
  const input = useRef<HTMLInputElement>();

  const [search, setSearch] = useState<string>();
  const [selectedCollection, setSelectedCollection] = useState<{
    title: string;
    id: string;
  }>();
  const {
    data,
    loading: searchLoading,
    refetch,
  } = useQuery(
    gql`
      query DocumentCollections($where: DocumentCollectionWhereInput!) {
        documentCollections(where: $where) {
          id
          title
        }
      }
    `,
    {
      variables: {
        where: {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              tags: {
                some: {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
            },
          ],
        },
      },
    },
  );

  let timeout: NodeJS.Timeout;
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  }

  useEffect(() => {
    const div = content.current;
    if (loading || !div) {
      return;
    }

    tooltipProvider.current = new TooltipProvider({
      content: div,
      shouldShow(view) {
        const { selection } = view.state;
        const { empty } = selection;

        const isNotDocCollection = !(
          selection instanceof NodeSelection &&
          selection.node.type.name === 'doc-collection' &&
          selection.node.attrs
        );

        const activeElement = (view.dom.getRootNode() as ShadowRoot | Document)
          .activeElement;
        const isTooltipChildren = div.contains(activeElement);

        const notHasFocus = !view.hasFocus() && !isTooltipChildren;

        const isReadonly = !view.editable;

        if (notHasFocus || isNotDocCollection || empty || isReadonly)
          return false;

        return true;
      },
    });

    tooltipProvider.current.onShow = () => {
      setTimeout(() => {
        input.current?.focus();
      }, 20);
    };

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [loading]);

  useEffect(() => {
    refetch();
  }, [search]);

  useEffect(() => {
    if (selectedCollection?.id) {
      const selection = view.state.selection as NodeSelection;
      const tr = view.state.tr;

      view.dispatch(
        tr.setNodeAttribute(selection.anchor, 'id', selectedCollection.id),
      );
    }
  }, [selectedCollection]);

  useEffect(() => {
    tooltipProvider.current?.update(view, prevState);
  });

  return (
    <div className="absolute card data-[show=false]:hidden" ref={content}>
      <Combobox
        value={selectedCollection}
        onChange={(value) => setSelectedCollection(value)}
        onClose={() => setSearch('')}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none  py-1.5 pr-8 pl-3 text-sm/6',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
            )}
            displayValue={(collection?: { title: string; id: string }) =>
              collection?.title
            }
            placeholder="Search Collections..."
            onChange={handleSearch}
            ref={input}
          />
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--input-width)] rounded-xl border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible card',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
          )}
        >
          {searchLoading ? (
            <span>Loading...</span>
          ) : (
            data?.documentCollections?.map((collection) => (
              <ComboboxOption
                key={collection.id}
                value={collection}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-blue-300"
              >
                <div className="text-sm/6">{collection.title}</div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
