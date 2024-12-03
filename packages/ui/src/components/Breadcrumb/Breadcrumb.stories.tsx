import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  component: Breadcrumb,

  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Label 1', url: '/' },
      { label: 'Label 2', url: '/' },
      { label: 'Label 3', url: '/' },
      { label: 'Current location', url: '/' },
    ],
  },
};
