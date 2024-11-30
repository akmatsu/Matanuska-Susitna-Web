import type { Meta, StoryObj } from '@storybook/react';
import { Links } from './Links';

const meta = {
  title: 'Example/Links',
  component: Links,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Links>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
