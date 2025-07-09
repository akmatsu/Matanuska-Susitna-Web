import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Button } from './Button';
import { ComponentProps, ReactNode } from 'react';

export function DropdownButton(props: {
  buttonProps?: ComponentProps<typeof Button>;
  label?: ReactNode;
  items?: ReactNode[];
}) {
  return (
    <Menu>
      <Button as={MenuButton} {...props.buttonProps}>
        {props.label}
      </Button>
      <MenuItems
        anchor="bottom"
        className="rounded shadow bg-white w-(--button-width)"
      >
        {props.items?.length ? (
          props.items?.map((item, index) => (
            <MenuItem key={index}>{item}</MenuItem>
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
