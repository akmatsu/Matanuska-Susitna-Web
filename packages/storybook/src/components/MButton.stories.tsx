import type { Meta, StoryObj } from '@storybook/react';

import { MButton } from '@matsugov/ui';

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
