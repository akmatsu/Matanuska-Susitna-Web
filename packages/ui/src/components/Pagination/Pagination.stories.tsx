import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithMultiplePages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
  },
};

export const WithManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 100,
  },
};
