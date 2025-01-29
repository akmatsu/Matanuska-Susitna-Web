import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
  },
  render(args) {
    const [checked, setChecked] = React.useState(args.checked);

    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

export const NoLabel: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    checked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Checkbox',
    checked: true,
  },
};
