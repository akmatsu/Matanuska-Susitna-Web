import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navItems: [
      { label: 'Services', href: '/services' },
      { label: 'Communities', href: '/communities' },
      { label: 'Government', href: '/government' },
      { label: 'Departments', href: '/departments' },
      { label: 'Property & Maps', href: '/property-and-maps' },
    ],
  },
};
