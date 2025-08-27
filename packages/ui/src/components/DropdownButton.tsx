import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Button, ButtonProps } from './Button';
import React, { ReactNode } from 'react';

export function DropdownButton<T extends React.ElementType = 'a'>(props: {
  buttonProps?: ButtonProps;
  label?: ReactNode;
  items?: { label: string; href?: string; action?: () => void }[];
  hideIcon?: boolean;
  linkAs?: T;
}) {
  return (
    <Menu>
      <Button as={MenuButton} {...props.buttonProps}>
        {props.label}
        {!props.hideIcon && (
          <span className="icon-[mdi--chevron-down] size-4 ml-2" />
        )}
      </Button>
      <MenuItems
        anchor="bottom"
        className="rounded border border-base-lighter shadow bg-white min-w-(--button-width) p-2 flex flex-col"
      >
        {props.items?.length ? (
          props.items?.map((item, index) => (
            <MenuItem key={index}>
              {item.action ? (
                <button
                  onClick={item.action}
                  className="w-full text-left after:icon-[mdi--download] after:ml-1 after:-mb-1 p-2 hover:cursor-pointer transition-colors data-focus:bg-blue-100 rounded"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black p-2 w-full text-left no-underline after:icon-[mdi--external-link] after:ml-1 after:-mb-1 transition-colors  data-focus:bg-blue-100 rounded"
                >
                  {item.label}
                </a>
              )}
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <p className="text-gray-500 focus">No items available</p>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
}
