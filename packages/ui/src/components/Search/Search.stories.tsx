import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search';

const meta = {
  title: 'Components/Search',
  component: Search,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
