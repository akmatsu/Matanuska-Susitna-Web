import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'text-field',
  },
};

export const NotRounded: Story = {
  args: {
    id: 'text-field',
    rounded: 'none',
  },
};

export const PillRounded: Story = {
  args: {
    id: 'text-field',
    rounded: 'pill',
  },
};

export const LeftRounded: Story = {
  args: {
    id: 'text-field',
    rounded: 'left',
  },
};

export const NoShadow: Story = {
  args: {
    id: 'text-field',
    shadow: false,
  },
};

export const WithLabel: Story = {
  args: {
    id: 'text-field',
    label: 'Text Field',
  },
};

export const withHiddenLabel: Story = {
  args: {
    id: 'text-field',
    label: 'Text Field',
    showLabel: false,
  },
};

export const WithPlaceholder: Story = {
  args: {
    id: 'text-field',
    placeholder: 'Enter text here...',
  },
};

export const WithDefaultValue: Story = {
  args: {
    id: 'text-field',
    defaultValue: 'Default value',
  },
};

export const LeftRoundedWithLabel: Story = {
  args: {
    id: 'text-field',
    rounded: 'left',
    label: 'Text Field',
  },
};

export const RightRoundedWithLabel: Story = {
  args: {
    id: 'text-field',
    rounded: 'right',
    label: 'Text Field',
  },
};
