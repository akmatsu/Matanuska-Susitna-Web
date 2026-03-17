import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Button, ButtonProps } from './Button';
import React, { ReactNode } from 'react';
import { Checkbox } from './Checkbox';
import v from 'voca';

export function DropdownButton<T extends React.ElementType = 'a'>(props: {
  buttonProps?: ButtonProps;
  label?: ReactNode;
  checkBoxes?: boolean;
  items?: {
    label: string;
    href?: string;
    action?: () => void;
    isChecked?: boolean;
  }[];
  hideIcon?: boolean;
  linkAs?: T;
  appendTop?: ReactNode;
  appendBottom?: ReactNode;
}) {
  return (
    <Menu>
      <Button asChild {...props.buttonProps}>
        <MenuButton>
          {props.label}
          {!props.hideIcon && (
            <span className="icon-[mdi--chevron-down] ml-2 size-4" />
          )}
        </MenuButton>
      </Button>
      <MenuItems
        anchor="bottom"
        className="border-base-lighter flex min-w-(--button-width) flex-col rounded border bg-white p-2 shadow"
      >
        {props.appendTop}
        {props.items?.length ? (
          props.items?.map((item, index) => (
            <MenuItem key={index}>
              {item.action ? (
                props.checkBoxes ? (
                  <Checkbox
                    label={v.replace(v.titleCase(item.label), /_|-/g, ' ')}
                    checked={item.isChecked}
                    onChange={item.action}
                    className="cursor-pointer rounded p-2 hover:bg-blue-100 data-focus:bg-blue-100"
                  />
                ) : (
                  <button
                    onClick={item.action}
                    className="after:icon-[mdi--download] w-full rounded p-2 text-left transition-colors after:-mb-1 after:ml-1 hover:cursor-pointer data-focus:bg-blue-100"
                  >
                    {item.label}
                  </button>
                )
              ) : (
                <a
                  href={item.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="after:icon-[mdi--external-link] w-full rounded p-2 text-left text-black no-underline transition-colors after:-mb-1 after:ml-1 data-focus:bg-blue-100"
                >
                  {item.label}
                </a>
              )}
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <p className="focus text-gray-500">No items available</p>
          </MenuItem>
        )}
        {props.appendBottom}
      </MenuItems>
    </Menu>
  );
}
