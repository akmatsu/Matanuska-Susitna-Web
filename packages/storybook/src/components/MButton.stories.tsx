import type { Meta, StoryObj } from '@storybook/react';

import { MButton } from '../../../ui/src/components/MButton/MButton';

const meta = {
  component: MButton,
} satisfies Meta<typeof MButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};
