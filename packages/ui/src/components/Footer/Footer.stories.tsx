import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

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
